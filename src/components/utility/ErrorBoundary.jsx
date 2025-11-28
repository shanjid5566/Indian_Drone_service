import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center h-screen text-center p-4'>
          <h1 className='text-3xl font-bold text-red-500'>
            Something went wrong.
          </h1>
          <p className='text-lg text-gray-600 mt-2'>
            We've been notified and are looking into the issue. Please try
            refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
