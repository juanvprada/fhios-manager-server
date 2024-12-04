import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/UserRoute';
import sequelize from './config/sequelize';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected..Server is running'))
  .catch(err => console.log('Error: ' + err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
