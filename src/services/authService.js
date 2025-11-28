import { USER_ROLES } from '../constants/roles';

// Static user credentials
const STATIC_USERS = {
  'admin@example.com': {
    email: 'admin@example.com',
    password: '12345',
    role: USER_ROLES['admin@example.com'],
  },
  'marketing@example.com': {
    email: 'marketing@example.com',
    password: '12345',
    role: USER_ROLES['marketing@example.com'],
  },
  'employee@example.com': {
    email: 'employee@example.com',
    password: '12345',
    role: USER_ROLES['employee@example.com'],
  },
  'fieldagent@example.com': {
    email: 'fieldagent@example.com',
    password: '12345',
    role: USER_ROLES['fieldagent@example.com'],
  },
};

// Local storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

/**
 * Handles all authentication-related interactions with static data,
 * simulating the Firebase API structure for easy API integration later.
 */
export const authService = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        const user = STATIC_USERS[email];

        if (!user) {
          reject(new Error('User not found'));
          return;
        }

        if (user.password !== password) {
          reject(new Error('Invalid password'));
          return;
        }

        // Create a mock token (in real API, this will come from server)
        const token = btoa(
          JSON.stringify({
            email: user.email,
            role: user.role,
            exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          })
        );

        // Store auth data
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(
          AUTH_USER_KEY,
          JSON.stringify({
            email: user.email,
            role: user.role,
            uid: `static_${user.email.split('@')[0]}`,
          })
        );

        resolve({
          user: {
            email: user.email,
            role: user.role,
            uid: `static_${user.email.split('@')[0]}`,
          },
        });
      }, 1000); // 1 second delay to simulate network
    });
  },

  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        resolve();
      }, 500);
    });
  },

  onAuthStateChange: (callback) => {
    // Check if user is already logged in
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(AUTH_USER_KEY);

    if (token && userData) {
      try {
        const tokenData = JSON.parse(atob(token));
        const user = JSON.parse(userData);

        // Check if token is expired
        if (tokenData.exp > Date.now()) {
          callback(user);
        } else {
          // Token expired, logout
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
          callback(null);
        }
      } catch {
        // Invalid token, logout
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        callback(null);
      }
    } else {
      callback(null);
    }

    // Return a cleanup function (for Firebase compatibility)
    return () => {};
  },

  // Helper function to decode token (for future API integration)
  decodeToken: (token) => {
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  },

  // Get current token (for future API calls)
  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
};
