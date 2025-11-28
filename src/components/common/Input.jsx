import React from 'react';
import PropTypes from 'prop-types';

export const Input = React.memo(({ label, id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div>
      <label
        htmlFor={inputId}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1'>
        <input
          id={inputId}
          name={inputId}
          className='w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
};
