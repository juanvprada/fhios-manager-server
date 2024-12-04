export interface IUser {
    user_id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    created_at?: Date;
    updated_at?: Date;
    last_login?: Date;
    status: 'active' | 'inactive' | 'suspended';
  }