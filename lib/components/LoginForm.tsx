
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoaderCircle } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLocalLoading(true);
    try {
      await auth.login(username, password);
    } catch (err: any) {
      setError(err.message || 'Accesso fallito. Controlla le tue credenziali.');
    } finally {
      setLocalLoading(false);
    }
  };

  const isLoading = auth.isLoading || localLoading;

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Bentornato
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Accedi per continuare
          </p>
        </div>
        
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg" role="alert">
            <span className="font-medium">Errore:</span> {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Nome utente"
            />
            <label
              htmlFor="username"
              className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Nome utente
            </label>
          </div>

          <div className="relative">
             <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800 transition-colors"
            >
              {isLoading ? <LoaderCircle className="animate-spin h-5 w-5" /> : 'Accedi'}
            </button>
          </div>
        </form>
    </div>
  );
};
