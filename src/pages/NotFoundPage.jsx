import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center flex-grow text-center'>
      <h1 className='text-6xl font-extrabold text-black animate animate-pulse'>404</h1>
      <h2 className='text-3xl font-bold text-gray-800 mt-4'>Page Not Found</h2>
      <p className='text-lg px-3 text-gray-600 mt-2'>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to='/'
        className='mt-8 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700'
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
