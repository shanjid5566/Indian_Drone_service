import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook for consuming the AuthContext.
 * @throws Will throw an error if used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
