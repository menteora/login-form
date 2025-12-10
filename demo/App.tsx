
import React from 'react';
import { AuthProvider, LoginForm, useAuth, TopBar, MenuItem } from '../lib';
import { login, logout, checkAuth } from './services/authService';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { LoaderCircle, CheckCircle } from 'lucide-react';

// Adapter to match the library interface with our existing service
const authServiceAdapter = {
  login: async (u: string, p: string) => {
     return await login(u, p);
  },
  logout: async () => {
     await logout();
  },
  checkAuth: async () => {
     return await checkAuth();
  }
};

const DemoContent: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <LoaderCircle className="animate-spin h-12 w-12 text-blue-500" />
        </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl text-center max-w-md w-full animate-fade-in transition-colors duration-200">
        <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Autenticazione Riuscita!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Benvenuto nella demo, <span className="font-semibold text-blue-500">{user?.username}</span>.
        </p>
        <p className="text-sm text-gray-500">Usa il menu in alto per navigare o fare logout.</p>
      </div>
    );
  }

  return <LoginForm />;
};

// Layout component handles the structure now that it has access to auth context
const AppLayout: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, user, logout } = useAuth();

    const menuItems: MenuItem[] = [
        { label: 'Dashboard', action: () => alert('Navigazione a Dashboard...') },
        { label: 'Impostazioni', action: () => alert('Apertura Impostazioni...') },
        { label: 'Profilo', action: () => alert('Visualizza Profilo...') },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
            <TopBar 
                title="Login Library Demo"
                isAuthenticated={isAuthenticated}
                user={user}
                currentTheme={theme}
                onToggleTheme={toggleTheme}
                onLogout={logout}
                menuItems={menuItems}
            />
            
            <main className="flex-grow flex items-center justify-center p-4">
                <DemoContent />
            </main>

            <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
               {!isAuthenticated && <p>Usa <strong>admin</strong> / <strong>password</strong> per testare.</p>}
               {isAuthenticated && <p>Sessione attiva per {user?.username}</p>}
            </footer>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
        <AuthProvider authService={authServiceAdapter}>
            <AppLayout />
        </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
