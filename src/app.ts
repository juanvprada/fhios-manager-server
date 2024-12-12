import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/UserRoute';
import roleRoutes from './routes/RoleRoute';
import userRoleRoutes from './routes/UserRoleRoute';
import projectRoutes from './routes/ProjectRoute';
import projectMemberRoutes from './routes/ProjectMemberRoute';
import taskRoutes from './routes/TaskRoute';
import timeEntryRoutes from './routes/TimeEntryRoute';
import documentRoutes from './routes/DocumentRoute';
import knowledgeBaseRoutes from './routes/KnowledgeBaseRoute';
import notificationRoutes from './routes/NotificationRoute';
import activityLogRoutes from './routes/ActivityLogRoute';
import sequelize from './config/sequelize';
import authRoutes from './routes/authRoutes';
import { initializeDB } from './models/Associations';
import { s3Client } from './config/s3.config';

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
});
// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado a Socket.IO');
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado de Socket.IO');
  });
});

// Exportar función para emitir notificaciones
export const emitNotification = (userId: number, notification: any) => {
  io.emit(`notification:${userId}`, notification);
};

// Configuración de CORS con opciones específicas
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Aumentar el límite de payload para archivos
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware para verificar la conexión S3 al inicio
const verifyS3Connection = async () => {
  try {
    await s3Client.config.credentials();
    console.log('Conexión exitosa con AWS S3');
  } catch (error) {
    console.error('Error al conectar con AWS S3:', error);
    throw error;
  }
};

// Rutas API
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', userRoleRoutes);
app.use('/api', projectRoutes);
app.use('/api', projectMemberRoutes);
app.use('/api', taskRoutes);
app.use('/api', timeEntryRoutes);
app.use('/api', documentRoutes);
app.use('/api', knowledgeBaseRoutes);
app.use('/api', notificationRoutes);
app.use('/api', activityLogRoutes);
app.use('/api/auth', authRoutes);

// Manejo de errores global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const startServer = async () => {
  try {
    // Verificar conexión con S3
    await verifyS3Connection();
    
    // Inicializar la base de datos
    await initializeDB();
    
    if (process.env.NODE_ENV !== 'test') {
      httpServer.listen(port, () => { 
        console.log(`Servidor corriendo en http://localhost:${port}`);
        console.log('Ambiente:', process.env.NODE_ENV || 'development');
        console.log('Socket.IO iniciado y escuchando conexiones');
      });
    }
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export { app, httpServer };
