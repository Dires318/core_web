export interface User {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;

}

export type RegisterFormData = {
  email: string;
  password: string;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateProfileData {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
} 