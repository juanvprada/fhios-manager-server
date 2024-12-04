export interface IProject {
    project_id: number;
    project_name: string;
    description?: string;
    methodology: 'Scrum' | 'Kanban' | 'Waterfall';
    start_date: Date;
    end_date?: Date;
    status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
    created_by?: number;
    created_at?: Date;
    updated_at?: Date;
  }
  