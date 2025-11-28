import React, { useState } from 'react';
import { Link, Navigate, useLocation} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff, Fingerprint } from 'lucide-react';
import { formatErrorMessage } from '../../utils/helpers';
import SocialLogin from './SocialLogin';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { user, login } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  // Redirect if already logged in
 if (user) {
  const from = location.state?.from?.pathname || '/dashboard';
  return <Navigate to={from} replace />;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F4F4F4]">
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-4 p-2 sm:p-5">

        {/* Login Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 lg:p-12 w-full max-w-md">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1A202C] text-center mb-2">Sign In</h1>
          <p className="text-center text-[#32415A] text-sm mb-4 sm:mb-6">
            Hi! Welcome back, you've been missed
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3 sm:mb-5">
              <label className="block text-[#1A202C] text-sm font-medium mb-1 sm:mb-2">{t('auth.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-3 sm:px-4 border bg-white text-[#32415A] border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="example@gmail.com"
                required
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className="mb-3 sm:mb-6">
              <label className="block text-sm font-medium mb-1 sm:mb-2">{t('auth.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-3 sm:px-4 border bg-white text-[#32415A] border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-4 sm:mb-6">
              <Link to="forget-password" className="text-green-600 text-sm hover:underline">Forgot password?</Link>
            </div>

            {/* Login Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 sm:py-3 rounded font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('auth.signingIn') : t('auth.signIn')}
              </button>
            </div>
          </form>

          {/* Social */}
          <SocialLogin />

          {/* Sign Up */}
          <div className="text-center mb-4 sm:mb-8">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-sm text-green-600 font-medium hover:underline">Sign up</Link>
          </div>
        </div>

        {/* Demo Accounts Card */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l mt-4 lg:mt-0">
          <p className="text-sm font-semibold text-gray-700 mb-3 sm:mb-4 text-center">{t('auth.demoAccounts')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
            <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
              <p className="font-semibold text-blue-800">{t('roles.admin')}</p>
              <p className="text-blue-600">admin@example.com</p>
            </div>
            <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
              <p className="font-semibold text-green-800">{t('roles.marketing')}</p>
              <p className="text-green-600">marketing@example.com</p>
            </div>
            <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
              <p className="font-semibold text-purple-800">{t('roles.employee')}</p>
              <p className="text-purple-600">employee@example.com</p>
            </div>
            <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
              <p className="font-semibold text-orange-800">{t('roles.fieldAgent')}</p>
              <p className="text-orange-600">fieldagent@example.com</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500 text-center">
            <span className="font-medium">Password:</span> {t('auth.passwordHint')}
          </p>
          <p className="mt-1 text-xs text-gray-400 text-center">{t('auth.demoAccountsNote')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;






