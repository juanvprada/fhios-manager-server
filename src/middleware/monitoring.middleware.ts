import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '../services/logging.service';
import { Metrics } from '../utils/metrics';

export const monitorRequest = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Incrementar contador de requests
  Metrics.incrementCounter('http_requests_total');

  // Capturar response original
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - startTime;
    
    // Registrar duración
    Metrics.observeHistogram('http_request_duration_ms', duration);

    // Registrar error si aplica
    if (res.statusCode >= 400) {
      Metrics.incrementCounter('http_request_errors_total');
    }

    // Registrar actividad
    LoggingService.logActivity({
      user_id: req.user?.id || null,
      action_type: req.method,
      entity_type: req.baseUrl.split('/').pop(),
      description: `${req.method} ${req.originalUrl}`,
      ip_address: req.ip,
      user_agent: req.get('user-agent'),
      status_code: res.statusCode,
      duration,
    });

    return originalSend.apply(res, arguments);
  };

  next();
};