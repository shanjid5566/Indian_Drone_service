import React, { useState } from 'react';
import { FaFingerprint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SocialLogin from '../login/SocialLogin';
import ImformatinSection from './ImformatinSection';

export default function SignUpFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    latitude: '',
    longitude: '',
    serviceRadius: '',
    industry: 'Mapping & Surveying',
    subCategories: [],
    profileImage: null
  });
  const [code, setCode] = useState('');

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center py-5 px-3">
      
      {/* STEP 1 */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-lg md:p-12 p-6 w-full md:max-w-md">
          <h1 className="text-3xl font-bold text-center mb-2">Sign Up</h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Hi! Welcome back, you've been missed
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={handleNext}
              className="flex-1 bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition"
            >
              Next
            </button>
           
          </div>

          <SocialLogin />
          <div className="text-center text-sm">
            <span className="text-gray-600">I have an account? </span>
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-lg md:p-12 p-6 w-full md:max-w-md">
         
            <h1 className=" text-xl md:text-3xl font-bold text-center mb-4">Confirm Your Gmail</h1>
            <p className="text-center text-gray-600 text-sm mb-4">
              We have sent a code in an Email message to ex***@gmail.com. Enter your code.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                placeholder="123456"
              />
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleNext}
                className="flex-1 bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition"
              >
                Next
              </button>
             
            </div>

            <SocialLogin />

            <div className="text-center text-sm">
              <span className="text-gray-600">I have an account? </span>
              <Link to="/login" className="text-green-600 font-medium hover:underline">
                Sign in
              </Link>
            </div>
          
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <ImformatinSection
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
}
