import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa6";
const SocialLogin = () => {
    return (
        <>
            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500">Or sign in with</span>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                {/* Google */}
                <button className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition">
                    <FcGoogle className='w-5 h-5' />
                </button>
                {/* Twitter */}
                <button className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition">
                    <FaFacebookF className='w-5 h-5' />
                </button>
                {/* Facebook */}
                <button className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition">
                    <FaApple className='w-5 h-5' />
                </button>
            </div>
        </>
    )
}

export default SocialLogin
