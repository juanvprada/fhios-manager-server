export interface ITimeEntry {
    entry_id: number;
    task_id?: number;
    user_id?: number;
    hours_logged: number;
    work_date: Date;
    description?: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at?: Date;
    updated_at?: Date;
    approved_by?: number;
    approved_at?: Date;
  }
  