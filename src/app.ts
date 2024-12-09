import express, { Application } from 'express';
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

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

// sequelize.authenticate()
//   .then(() => console.log('Database connected..Server is running'))
//   .catch(err => console.log('Error: ' + err));
const startServer = async () => {
  try {

    await initializeDB();
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
