export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  googleId?: string;
  name: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  password?: string;
  googleId?: string;
  name: string;
  avatar?: string;
}

export interface UpdateUserData {
  name?: string;
  avatar?: string;
  isEmailVerified?: boolean;
}