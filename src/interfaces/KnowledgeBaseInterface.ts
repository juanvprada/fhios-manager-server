export interface IKnowledgeBase {
    kt_id: number;
    project_id?: number;
    title: string;
    content: string;
    created_by?: number;
    created_at?: Date;
    updated_at?: Date;
  }
  