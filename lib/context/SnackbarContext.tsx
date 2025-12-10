
import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react';
import { Snackbar, SnackbarType } from '../components/Snackbar';

interface SnackbarContextType {
  showSnackbar: (message: string, type: SnackbarType) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('info');

  const hideSnackbar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const showSnackbar = useCallback((msg: string, t: SnackbarType = 'info') => {
    setMessage(msg);
    setType(t);
    setIsOpen(true);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  }, []);

  return (
    <SnackbarContext value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        message={message}
        type={type}
        isOpen={isOpen}
        onClose={hideSnackbar}
      />
    </SnackbarContext>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
