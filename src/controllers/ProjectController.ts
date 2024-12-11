import { Request, Response } from 'express';
import Project from '../models/ProjectModel';
import { IProject } from '../interfaces/ProjectInterface';

// Crear un nuevo proyecto
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Datos recibidos en createProject:', req.body);
    const { selectedUsers, assignedUsers, created_by, ...projectData } = req.body;

    // Usar selectedUsers o assignedUsers, lo que exista
    const users = selectedUsers || assignedUsers || [];
    console.log('Usuarios a asignar:', users);

    // Crear el proyecto con los usuarios en la descripción
    const description = `${projectData.description || ''}\n<!--ASSIGNED_USERS:${users.join('|')}-->`;

    const newProject = await Project.create({
      ...projectData,
      description,
      created_by
    });

    console.log('Proyecto creado:', newProject);

    // Devolver el proyecto con los usuarios
    const response = {
      ...newProject.toJSON(),
      assignedUsers: users
    };

    console.log('Respuesta a enviar:', response);
    res.status(201).json(response);
  } catch (err) {
    console.error('Error al crear proyecto:', err);
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
    console.log('Buscando proyecto con ID:', req.params.project_id);
    const project = await Project.findByPk(req.params.project_id);

    if (project) {
      console.log('Proyecto encontrado:', project);

      // Extraer usuarios de la descripción
      const description = project.description || '';
      const match = description.match(/<!--ASSIGNED_USERS:(.*?)-->/);
      const users = match ? match[1].split('|') : [];
      const cleanDescription = description.replace(/<!--ASSIGNED_USERS:.*?-->/, '').trim();

      console.log('Usuarios extraídos:', users);

      const response = {
        ...project.toJSON(),
        description: cleanDescription,
        assignedUsers: users
      };

      console.log('Respuesta a enviar:', response);
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (err) {
    console.error('Error al obtener proyecto:', err);
    res.status(500).json({ message: (err as Error).message });
  }
};
// Actualizar un proyecto
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assignedUsers, ...projectData } = req.body;

    // Guardar usuarios en la descripción
    const userMetadata = assignedUsers ? `<!--ASSIGNED_USERS:${assignedUsers.join('|')}-->` : '';
    const description = `${projectData.description || ''}${userMetadata}`;

    const [updated] = await Project.update(
      { ...projectData, description },
      { where: { project_id: req.params.project_id } }
    );

    if (updated) {
      const updatedProject = await Project.findByPk(req.params.project_id);
      if (updatedProject) {
        // Preparar respuesta con usuarios
        const response = {
          ...updatedProject.toJSON(),
          description: projectData.description,
          assignedUsers: assignedUsers || []
        };
        res.status(200).json(response);
      }
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
