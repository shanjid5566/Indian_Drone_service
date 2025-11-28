import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';

const NotAuthorizedPage = () => {
  const { logout } = useAuth();
  return (
    <div className='flex flex-col items-center justify-center flex-grow text-center'>
      <h1 className='text-4xl font-bold text-red-500 mb-4'>Access Denied</h1>
      <p className='text-lg text-gray-600 mb-8'>
        Your account is not authorized to access this content.
      </p>
      <Button onClick={logout} variant='secondary'>
        Return to Login
      </Button>
    </div>
  );
};

export default NotAuthorizedPage;
