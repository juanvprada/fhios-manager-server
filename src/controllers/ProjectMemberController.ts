import { Request, Response } from 'express';
import ProjectMember from '../models/ProjectMemberModel';
import { IProjectMember } from '../interfaces/ProjectMemberInterface';
import { emitNotification } from '../app';
import Notification from '../models/NotificationModel';
import Project from '../models/ProjectModel';

// Asignar un miembro a un proyecto
export const addProjectMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectMember: IProjectMember = req.body;
    const newProjectMember = await ProjectMember.create(projectMember);

    // Obtener información del proyecto
    const project = await Project.findByPk(projectMember.project_id);

    if (project) {
      // Crear notificación para el nuevo miembro
      const notification = await Notification.create({
        user_id: projectMember.user_id,
        title: 'Nuevo Proyecto Asignado',
        message: `Se te ha añadido al proyecto: ${project.project_name}`,
        type: 'project_update',
        reference_id: project.project_id,
        read_status: false
      });

      // Emitir la notificación
      emitNotification(projectMember.user_id, notification);
      console.log(`Notificación enviada al usuario ${projectMember.user_id}`);
    }

    res.status(201).json(newProjectMember);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todos los miembros de un proyecto
export const getProjectMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectMembers = await ProjectMember.findAll({
      where: { project_id: req.params.project_id }
    });
    res.status(200).json(projectMembers);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar un miembro de un proyecto
export const removeProjectMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { project_id, user_id } = req.params;
    const deleted = await ProjectMember.destroy({
      where: { project_id, user_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Miembro del proyecto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
