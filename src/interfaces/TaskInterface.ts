export interface ITask {
    task_id: number;
    project_id?: number;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'blocked';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    estimated_hours?: number;
    start_date?: Date;
    due_date?: Date;
    created_by?: number;
    assigned_to?: number;
    created_at?: Date;
    updated_at?: Date;
  }
  