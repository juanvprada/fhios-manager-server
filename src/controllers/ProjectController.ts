import { Request, Response } from 'express';
import Project from '../models/ProjectModel';
import { IProject } from '../interfaces/ProjectInterface';

// Crear un nuevo proyecto
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project: IProject = req.body;
    const newProject = await Project.create(project);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todos los proyectos
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener un proyecto por ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByPk(req.params.project_id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar un proyecto
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { project_id: req.params.project_id }
    });
    if (updated) {
      const updatedProject = await Project.findByPk(req.params.project_id);
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar un proyecto
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Project.destroy({
      where: { project_id: req.params.project_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
