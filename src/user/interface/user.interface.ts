import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  data: { token: string; user: User };
}
