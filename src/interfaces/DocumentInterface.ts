export interface IDocument {
    document_id?: number;
    project_id?: number;
    task_id?: number;
    title: string;
    file_path: string;
    file_type?: string;
    uploaded_by?: number;
    created_at?: Date;
    updated_at?: Date;
  }
  