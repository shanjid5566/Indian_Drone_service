import React from 'react';
import { useParams, Link } from 'react-router-dom';

const UserManagementDetails = () => {
  const { userId } = useParams();

  return (
    <div className='p-8 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>
        User Management Details
      </h1>
      <p className='text-lg text-gray-600 mb-6'>
        Displaying details for user with ID:
        <span className='font-semibold text-indigo-600 ml-2'>{userId}</span>
      </p>
      <p className='text-gray-500 mb-6'>
        (This is a placeholder page. Full implementation will be done later.)
      </p>
      <Link
        to='/admin/users'
        className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
      >
        &larr; Back to User Management List
      </Link>
    </div>
  );
};

export default UserManagementDetails;
