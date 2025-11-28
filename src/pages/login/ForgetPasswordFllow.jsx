import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

const handleBack = () => {
  if (step > 1) {
    setStep(step - 1);
  } else {

    navigate('/login');
  }
};

  const handleUpdatePassword = () => {
  
    alert('Password Updated!');
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-5 px-2">
      {/* Step 1: Forgot Password - Email */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-lg md:p-12 p-6 w-full md:max-w-md">
          <h1 className="text-3xl font-bold text-center mb-4">
            Forgot Your Password?
          </h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Enter your email address. We will send a message with a code to reset your password.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              placeholder="example@gmail.com"
            />
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition mb-3"
          >
            Next
          </button>

          <button
            onClick={handleBack}
            className="w-full bg-white text-green-600 py-3 rounded font-medium border border-green-600 hover:bg-gray-50 transition"
          >
            Back
          </button>
        </div>
      )}

      {/* Step 2: Confirm Gmail - Code Verification */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-lg md:p-12 p-6 w-full md:max-w-md ">
          
            <h1 className="text-xl md:text-3xl  font-bold text-center mb-2">
              Confirm Your Gmail
            </h1>
            <p className="text-center text-gray-600 text-sm mb-4">
              We have sent a code in an Email message to ex***@grmaol.co TO confirm your account. Enter your code.
            </p>

            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                placeholder="123456"
              />
            </div>

            <div className="text-right mb-6">
              <a href="#" className="text-green-600 text-sm hover:underline">
                Resend
              </a>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition mb-3"
            >
              Verify
            </button>

            <button
              onClick={handleBack}
              className="w-full bg-white text-green-600 py-3 rounded font-medium border border-green-600 hover:bg-gray-50 transition"
            >
              Back
            </button>
          
        </div>
      )}

      {/* Step 3: Create New Password */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow-lg md:p-12 p-6 w-full md:max-w-md">
          <h1 className="text-xl md:text-3xl font-bold text-center mb-4">
            Create New Password
          </h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Enter your new password below to reset your account password.
          </p>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              placeholder="********"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Confirm password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              placeholder="********"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">
              Show password
            </label>
          </div>

          <button
            onClick={handleUpdatePassword}
            className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition mb-3"
          >
            Update Password
          </button>

          <button
            onClick={handleBack}
            className="w-full bg-white text-green-600 py-3 rounded font-medium border border-green-600 hover:bg-gray-50 transition"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}






