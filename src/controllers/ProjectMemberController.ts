import { Request, Response } from 'express';
import ProjectMember from '../models/ProjectMemberModel';
import { IProjectMember } from '../interfaces/ProjectMemberInterface';

// Asignar un miembro a un proyecto
export const addProjectMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectMember: IProjectMember = req.body;
    const newProjectMember = await ProjectMember.create(projectMember);
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
