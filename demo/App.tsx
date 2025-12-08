
import React from 'react';
import { AuthProvider, LoginForm, useAuth } from '../lib';
import { login, logout, checkAuth } from './services/authService';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { LoaderCircle, LogOut, CheckCircle } from 'lucide-react';

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
  const { isAuthenticated, user, isLoading, logout } = useAuth();

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
        <button
          onClick={() => logout()}
          className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    );
  }

  return <LoginForm />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
         <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm z-10">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Login Library Demo</h1>
            <ThemeToggle />
         </header>
         
         <main className="flex-grow flex items-center justify-center p-4">
             <AuthProvider authService={authServiceAdapter}>
                <DemoContent />
             </AuthProvider>
         </main>

         <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Usa <strong>admin</strong> / <strong>password</strong> per testare.</p>
         </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
