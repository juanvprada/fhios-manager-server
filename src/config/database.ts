import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { UserRole } from '../models/UserRole';
import { Project } from '../models/Project';
import { ProjectMember } from '../models/ProjectMember';
import { Task } from '../models/Task';
import { TimeEntry } from '../models/TimeEntry';
import { Document } from '../models/Document';
import { KnowledgeBase } from '../models/KnowledgeBase';
import { Notification } from '../models/Notification';
import { ActivityLog } from '../models/ActivityLog';

dotenv.config()

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [User, Role, UserRole, Project, ProjectMember, Task, TimeEntry, Document, KnowledgeBase, Notification, ActivityLog],
  logging: false, // Desactiva el log de las consultas
});
