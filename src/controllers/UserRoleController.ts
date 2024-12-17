import { Request, Response } from 'express';
import UserRole from '../models/UserRoleModel';
import Role from '../models/RoleModel';
import { IUserRole } from '../interfaces/UserRoleInterface';

// Crear una nueva asignación de rol para un usuario
export const assignRoleToUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Verificar si el usuario ya tiene un rol asignado
    const existingRole = await UserRole.findOne({
      where: { user_id: req.body.user_id }
    });

    if (existingRole) {
      // Actualizar el rol existente
      await UserRole.update(
        { role_id: req.body.role_id },
        { where: { user_id: req.body.user_id } }
      );

      const updatedRole = await UserRole.findOne({
        where: { user_id: req.body.user_id },
        include: [{
          model: Role,
          attributes: ['role_name']
        }]
      });

      res.status(200).json(updatedRole);
    } else {
      // Crear nueva asignación
      const userRole: IUserRole = req.body;
      const newUserRole = await UserRole.create(userRole);

      const roleWithName = await UserRole.findOne({
        where: { user_id: newUserRole.user_id },
        include: [{
          model: Role,
          attributes: ['role_name']
        }]
      });

      res.status(201).json(roleWithName);
    }
  } catch (err) {
    console.error('Error in assignRoleToUser:', err);
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todas las asignaciones de roles de usuarios
export const getUserRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRoles = await UserRole.findAll({
      include: [{
        model: Role,
        attributes: ['role_name']
      }]
    });

    // Formatear la respuesta
    const formattedUserRoles = userRoles.map(userRole => {
      const data = userRole.toJSON();
      return {
        user_id: data.user_id,
        role_id: data.role_id,
        role_name: data.Role?.role_name || 'admin',
        assigned_at: data.assigned_at
      };
    });

    res.status(200).json(formattedUserRoles);
  } catch (err) {
    console.error('Error in getUserRoles:', err);
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar una asignación de rol para un usuario
export const deleteUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, role_id } = req.params;

    // Verificar si es el último rol de administrador
    const roleToDelete = await UserRole.findOne({
      where: { user_id, role_id },
      include: [{
        model: Role,
        attributes: ['role_name']
      }]
    });

    if (roleToDelete?.Role?.role_name === 'admin') {
      const adminCount = await UserRole.count({
        include: [{
          model: Role,
          where: { role_name: 'admin' }
        }]
      });

      if (adminCount <= 1) {
        res.status(400).json({
          message: 'No se puede eliminar el último administrador'
        });
        return;
      }
    }

    const deleted = await UserRole.destroy({
      where: { user_id, role_id }
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Asignación de rol no encontrada' });
    }
  } catch (err) {
    console.error('Error in deleteUserRole:', err);
    res.status(500).json({ message: (err as Error).message });
  }
};
