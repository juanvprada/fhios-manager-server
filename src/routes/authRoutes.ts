import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthMiddleware } from '../middleware/auth';
import User from '../models/UserModel';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Ruta protegida de ejemplo


router.get('/profile', AuthMiddleware, async (req: any, res: any) => {
  try {
    // Agregamos logs para debug
    console.log('User ID from request:', req.user.userId);
    console.log('Complete request user object:', req.user);

    const user = await User.findByPk(req.user.userId);
    console.log('User from database:', user);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        name: `${user.first_name} ${user.last_name}`,
        createdAt: user.created_at,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Error in profile route:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el perfil del usuario'
    });
  }
});
router.put('/change-password', AuthMiddleware, async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    // Validaciones básicas
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere la contraseña actual y la nueva contraseña'
      });
    }

    // Validar longitud mínima de la nueva contraseña
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'La nueva contraseña debe tener al menos 6 caracteres'
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    // Verificar la contraseña actual
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'La contraseña actual es incorrecta'
      });
    }

    // Actualizar la contraseña
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      success: false,
      error: 'Error al cambiar la contraseña'
    });
  }
});


export default router;
