
export interface User {
  id: string;
  username: string;
  email?: string;
}

const MOCK_DELAY = 800;

export const login = async (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        const user = {
            id: 'mock-user-123',
            username: 'admin',
            email: 'admin@example.com'
        };
        // Simulate session
        localStorage.setItem('mock_auth_token', 'valid-token');
        resolve(user);
      } else {
        reject(new Error('Credenziali non valide. Usa admin/password.'));
      }
    }, MOCK_DELAY);
  });
};

export const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.removeItem('mock_auth_token');
            resolve();
        }, 500);
    });
};

export const checkAuth = async (): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const token = localStorage.getItem('mock_auth_token');
        if (token) {
            resolve({
                id: 'mock-user-123',
                username: 'admin',
                email: 'admin@example.com'
            });
        } else {
            reject(new Error('Not authenticated'));
        }
    }, 300);
  });
};
