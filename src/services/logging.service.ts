import winston from 'winston';
import { ActivityLog } from '../models/activity-log.model';
import { Metrics } from '../utils/metrics';

export class LoggingService {
  private static logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: 'fhios-manager' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });

  static async logActivity(data: any) {
    try {
      // Registrar en base de datos
      await ActivityLog.create(data);

      // Registrar en archivo de log
      this.logger.info('Activity logged', {
        ...data,
        timestamp: new Date().toISOString(),
      });

      // Actualizar métricas
      Metrics.incrementCounter(`activity_${data.action_type}`);
      Metrics.incrementCounter(`entity_${data.entity_type}`);

    } catch (error) {
      this.logger.error('Error logging activity', {
        error,
        data,
        timestamp: new Date().toISOString(),
      });
    }
  }

  static async queryActivityLogs(filters: any) {
    const where: any = {};

    if (filters.userId) where.user_id = filters.userId;
    if (filters.actionType) where.action_type = filters.actionType;
    if (filters.entityType) where.entity_type = filters.entityType;
    if (filters.dateRange) {
      where.created_at = {
        [Op.between]: [filters.dateRange.start, filters.dateRange.end],
      };
    }

    return ActivityLog.findAll({
      where,
      order: [['created_at', 'DESC']],
      limit: filters.limit || 100,
      offset: filters.offset || 0,
    });
  }
}