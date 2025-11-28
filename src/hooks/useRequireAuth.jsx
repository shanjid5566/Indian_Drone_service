import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const useRequireAuth = (Component, allowedRoles) => {
  const ProtectedComponent = (props) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
      return (
        <div className='flex items-center justify-center min-h-[60vh]'>
          <LoadingSpinner size='large' />
        </div>
      );
    }

    if (!user) {
      return <Navigate to='/login' state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to='/unauthorized' replace />;
    }

    return <Component {...props} />;
  };

  ProtectedComponent.propTypes = {
    // You can add any additional props your protected component might need here
  };

  return ProtectedComponent;
};
