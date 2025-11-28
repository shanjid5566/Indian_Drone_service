import React from 'react';
import PropTypes from 'prop-types';

export const Button = React.memo(
  ({
    children,
    className = '',
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    ...props
  }) => {
    const baseClasses =
      'font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const variantClasses = {
      primary:
        '!text-white !bg-indigo-600 hover:!bg-indigo-700 focus:ring-indigo-500 [&]:!text-white',
      secondary:
        'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400',
      blackText:
        'text-black bg-white hover:bg-gray-50 focus:ring-gray-400 border border-gray-300',
    };
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-5 py-2 text-base',
      large: 'px-8 py-3 text-lg',
    };
    const widthClass = fullWidth ? 'w-full flex justify-center' : '';
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'blackText']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
};
