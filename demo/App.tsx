
import React, { useEffect } from 'react';
import { 
    AuthProvider, 
    LoginForm, 
    useAuth, 
    TopBar, 
    MenuItem, 
    SnackbarProvider, 
    useSnackbar 
} from '../lib';
import { login, logout, checkAuth } from './services/authService';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { LoaderCircle, CheckCircle, AlertTriangle } from 'lucide-react';

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
  const { showSnackbar } = useSnackbar();

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
        
        <div className="flex flex-col gap-3">
            <button 
                onClick={() => showSnackbar('Operazione completata con successo!', 'success')}
                className="px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
                Test Notifica Successo
            </button>
            <button 
                onClick={() => showSnackbar('Ecco un messaggio informativo per l\'utente.', 'info')}
                className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
                Test Notifica Info
            </button>
            <button 
                onClick={() => showSnackbar('Si è verificato un errore imprevisto.', 'error')}
                className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
                Test Notifica Errore
            </button>
        </div>
      </div>
    );
  }

  return <LoginWrapper />;
};

// Wrapper for LoginForm to handle side effects like Snackbars
const LoginWrapper: React.FC = () => {
    const { login } = useAuth();
    const { showSnackbar } = useSnackbar();

    // We intercept the original login to add snackbar logic
    // Note: Since LoginForm calls auth.login internally, we can either:
    // 1. Pass a custom onSubmit to LoginForm if supported (it's not currently)
    // 2. Modify LoginForm to use Snackbar (invasive)
    // 3. Just use the standard LoginForm and rely on the UI error state it provides, 
    //    but here I'll add a manual trigger for demonstration if we were building a custom form
    //    OR better, since LoginForm is self contained, let's just leave it self-contained for the demo
    //    and show the snackbar elsewhere.
    
    // However, to satisfy the user request "visualizzazione di messaggi... successo o errore",
    // let's wrap the auth context's login function for this demo level.
    
    // For this demo structure, the LoginForm uses the context directly. 
    // To show snackbar on Login failure without modifying the lib's LoginForm, 
    // we would need to wrap the AuthProvider's service.
    
    return <LoginForm />;
};

const AppLayout: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, user, logout } = useAuth();
    const { showSnackbar } = useSnackbar();

    const handleLogout = async () => {
        await logout();
        showSnackbar('Logout effettuato con successo', 'info');
    };

    const menuItems: MenuItem[] = [
        { label: 'Dashboard', action: () => showSnackbar('Navigazione Dashboard...', 'info') },
        { label: 'Impostazioni', action: () => showSnackbar('Impostazioni salvate!', 'success') },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
            <TopBar 
                title="Login Library Demo"
                isAuthenticated={isAuthenticated}
                user={user}
                currentTheme={theme}
                onToggleTheme={toggleTheme}
                onLogout={handleLogout}
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

// We wrap the service to inject Snackbar logic for the Demo
const createServiceWithSnackbar = (showSnackbar: (msg: string, type: 'success' | 'error' | 'info') => void) => ({
    ...authServiceAdapter,
    login: async (u: string, p: string) => {
        try {
            const user = await authServiceAdapter.login(u, p);
            showSnackbar(`Bentornato, ${user.username}!`, 'success');
            return user;
        } catch (e: any) {
            showSnackbar(e.message || 'Errore durante il login', 'error');
            throw e;
        }
    }
});

const AppWithProviders: React.FC = () => {
    const { showSnackbar } = useSnackbar();
    // Memoize the service to avoid re-renders of AuthProvider
    const enhancedService = React.useMemo(() => createServiceWithSnackbar(showSnackbar), [showSnackbar]);

    return (
        <AuthProvider authService={enhancedService}>
            <AppLayout />
        </AuthProvider>
    );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
        <SnackbarProvider>
            <AppWithProviders />
        </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
