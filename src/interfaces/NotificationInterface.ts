export interface INotification {
    notification_id: number;
    user_id?: number;
    title: string;
    message: string;
    type: 'task_assigned' | 'project_update' | 'deadline_reminder' | 'mention';
    reference_id?: number;
    read_status?: boolean;
    created_at?: Date;
  }
  