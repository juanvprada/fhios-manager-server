import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.config';

interface WebSocketConnection extends WebSocket {
  userId?: number;
}

export class WebSocketService {
  private wss: WebSocketServer;
  private connections: Map<number, WebSocketConnection[]> = new Map();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server });
    this.initialize();
  }

  private initialize() {
    this.wss.on('connection', async (ws: WebSocketConnection, request) => {
      try {
        const token = this.extractToken(request.url);
        const decoded = jwt.verify(token, config.JWT_SECRET) as any;
        ws.userId = decoded.id;

        this.addConnection(ws);

        ws.on('close', () => {
          this.removeConnection(ws);
        });

        ws.on('error', () => {
          this.removeConnection(ws);
        });
      } catch (error) {
        ws.close();
      }
    });
  }

  private addConnection(ws: WebSocketConnection) {
    if (!ws.userId) return;

    const userConnections = this.connections.get(ws.userId) || [];
    userConnections.push(ws);
    this.connections.set(ws.userId, userConnections);
  }

  private removeConnection(ws: WebSocketConnection) {
    if (!ws.userId) return;

    const userConnections = this.connections.get(ws.userId) || [];
    const updatedConnections = userConnections.filter(conn => conn !== ws);
    
    if (updatedConnections.length > 0) {
      this.connections.set(ws.userId, updatedConnections);
    } else {
      this.connections.delete(ws.userId);
    }
  }

  public sendToUser(userId: number, data: any) {
    const userConnections = this.connections.get(userId);
    if (!userConnections) return;

    const message = JSON.stringify(data);
    userConnections.forEach(connection => {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(message);
      }
    });
  }

  public broadcastToProject(projectId: number, data: any) {
    // Implementar lógica para enviar a todos los miembros del proyecto
  }
}