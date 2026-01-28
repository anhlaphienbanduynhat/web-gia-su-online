
export enum UserRole {
  PARENT = 'PARENT',
  TUTOR = 'TUTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface TutorProfile {
  id: string;
  userId: string;
  name: string;
  subjects: string[];
  hourlyRate: number;
  experience: string;
  rating: number;
  bio: string;
  location: string;
  avatar: string;
}

export interface JobPost {
  id: string;
  parentId: string;
  parentName: string;
  subject: string;
  grade: string;
  budget: number;
  description: string;
  location: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
