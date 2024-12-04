import { Request, Response } from 'express';
import UserRole from '../models/UserRoleModel';
import { IUserRole } from '../interfaces/UserRoleInterface';

// Crear una nueva asignación de rol para un usuario
export const assignRoleToUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRole: IUserRole = req.body;
    const newUserRole = await UserRole.create(userRole);
    res.status(201).json(newUserRole);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todas las asignaciones de roles de usuarios
export const getUserRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRoles = await UserRole.findAll();
    res.status(200).json(userRoles);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar una asignación de rol para un usuario
export const deleteUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, role_id } = req.params;
    const deleted = await UserRole.destroy({
      where: { user_id, role_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Asignación de rol no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
