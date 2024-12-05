import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Ruta protegida de ejemplo
router.get('/profile', AuthMiddleware, (req, res) => {
  res.json({ message: 'Welcome to your profile!' });
});

export default router;
