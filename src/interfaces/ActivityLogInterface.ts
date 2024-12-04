export interface IActivityLog {
    log_id: number;
    user_id: number;
    action_type: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout';
    entity_type: string;
    entity_id?: number;
    description: string;
    ip_address?: string;
    user_agent?: string;
    created_at?: Date;
  }
  