import { Request, Response } from 'express';
import Role from '../models/RoleModel';
import { IRole } from '../interfaces/RoleInterface';

// Crear un nuevo rol
export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const role: IRole = req.body;
    const newRole = await Role.create(role);
    res.status(201).json(newRole);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todos los roles
export const getRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener un rol por ID
export const getRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const role = await Role.findByPk(req.params.role_id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar un rol
export const updateRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Role.update(req.body, {
      where: { role_id: req.params.role_id }
    });
    if (updated) {
      const updatedRole = await Role.findByPk(req.params.role_id);
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar un rol
export const deleteRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Role.destroy({
      where: { role_id: req.params.role_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
