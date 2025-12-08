
export interface User {
  id: string;
  username: string;
  email?: string;
  [key: string]: any;
}

export interface AuthService {
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<User>;
}
