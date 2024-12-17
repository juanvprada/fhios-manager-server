import Project from './ProjectModel';
import Task from './TaskModel';
import sequelize from '../config/sequelize';

// Definir las relaciones
export const setupAssociations = () => {
    // Un proyecto tiene muchas tareas
    Project.hasMany(Task, {
        foreignKey: 'project_id',
        as: 'tasks',
        onDelete: 'CASCADE'
    });

    // Una tarea pertenece a un proyecto
    Task.belongsTo(Project, {
        foreignKey: 'project_id',
        as: 'project'
    });
};

// Inicializar la base de datos
export const initializeDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        
        setupAssociations();
        
        await sequelize.sync({ force: false });
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
};