import { Request, Response } from 'express';
import Role from '../models/RoleModel';
import { IRole } from '../interfaces/RoleInterface';
import sequelize from '../config/sequelize';

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

export const getUserRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    
    const [roles] = await sequelize.query(`
      SELECT r.* 
      FROM roles r
      INNER JOIN user_roles ur ON r.role_id = ur.role_id
      WHERE ur.user_id = ?
    `, {
      replacements: [user_id]
    });
    
    res.json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error('Error al obtener roles del usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los roles del usuario'
    });
  }
};

export const updateUserRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    const { roles } = req.body;  // Esperamos un array de role_ids

    // Primero eliminar roles existentes
    await sequelize.query('DELETE FROM user_roles WHERE user_id = ?', {
      replacements: [user_id]
    });

    // Luego insertar los nuevos roles
    if (roles && roles.length > 0) {
      const values = roles.map((role_id: number) => [user_id, role_id]);
      await sequelize.query('INSERT INTO user_roles (user_id, role_id) VALUES ?', {
        replacements: [values]
      });
    }

    res.json({
      success: true,
      message: 'Roles actualizados correctamente'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar los roles'
    });
  }
};