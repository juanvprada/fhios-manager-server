import { Project, ProjectMember } from '../models/project.model';
import { User } from '../models/user.model';
import { AppError } from '../utils/error';
import { sequelize } from '../config/database';
import { Transaction } from 'sequelize';

export class ProjectService {
  static async createProject(projectData: any, userId: number) {
    const transaction: Transaction = await sequelize.transaction();

    try {
      const project = await Project.create(
        {
          ...projectData,
          created_by: userId,
        },
        { transaction }
      );

      if (projectData.members) {
        await ProjectMember.bulkCreate(
          projectData.members.map((member: any) => ({
            project_id: project.project_id,
            user_id: member.user_id,
            role_id: member.role_id,
          })),
          { transaction }
        );
      }

      await transaction.commit();
      return this.getProjectById(project.project_id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async getProjectById(projectId: number) {
    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: User,
          as: 'members',
          through: { attributes: ['role_id'] },
          attributes: ['user_id', 'first_name', 'last_name', 'email'],
        },
        {
          model: User,
          as: 'creator',
          attributes: ['user_id', 'first_name', 'last_name', 'email'],
        },
      ],
    });

    if (!project) {
      throw new AppError(404, 'Project not found');
    }

    return project;
  }

  static async updateProject(projectId: number, projectData: any, userId: number) {
    const transaction = await sequelize.transaction();

    try {
      const project = await Project.findByPk(projectId);
      if (!project) {
        throw new AppError(404, 'Project not found');
      }

      await project.update(projectData, { transaction });

      if (projectData.members) {
        await ProjectMember.destroy({
          where: { project_id: projectId },
          transaction,
        });

        await ProjectMember.bulkCreate(
          projectData.members.map((member: any) => ({
            project_id: projectId,
            user_id: member.user_id,
            role_id: member.role_id,
          })),
          { transaction }
        );
      }

      await transaction.commit();
      return this.getProjectById(projectId);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async getProjectMetrics(projectId: number) {
    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: Task,
          attributes: [
            'status',
            [sequelize.fn('COUNT', sequelize.col('status')), 'count'],
          ],
          group: ['status'],
        },
        {
          model: TimeEntry,
          attributes: [
            [sequelize.fn('SUM', sequelize.col('hours_logged')), 'total_hours'],
          ],
        },
      ],
    });

    if (!project) {
      throw new AppError(404, 'Project not found');
    }

    return project;
  }
}