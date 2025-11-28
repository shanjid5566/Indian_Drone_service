import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

const ComplaintDetailsModal = ({ complaint, onClose, isOpen }) => {
  if (!isOpen || !complaint) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black/70 bg-opacity-50 transition-opacity'
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className='relative min-h-screen flex items-start justify-center p-4'>
        <div className='relative bg-white w-full max-w-[1065px] mt-16 mb-16 rounded-lg shadow-xl'>
          {/* Back Button */}
          <div className='absolute left-8 top-8'>
            <button
              onClick={onClose}
              className='w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors'
            >
              <IoArrowBack className='w-6 h-6 text-neutral-800' />
            </button>
          </div>

          {/* Modal Body */}
          <div className='px-16 py-12'>
            <div className='flex flex-col gap-6'>
              {/* Subject Section */}
              <div className='flex flex-col gap-4'>
                <div className="text-White-950 text-xl font-medium font-['Poppins']">
                  Subject
                </div>
                <div className='h-14 p-5 bg-Dark-Gray-50 rounded-xl border border-White-500 flex items-center'>
                  <div className="text-neutral-500 text-base font-normal font-['Lato'] leading-normal">
                    {complaint.subject}
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className='flex flex-col gap-4'>
                <div className="text-White-950 text-xl font-medium font-['Poppins']">
                  Description
                </div>
                <div className='p-5 bg-Dark-Gray-50 rounded-xl border border-White-500'>
                  <div className="text-neutral-500 text-base font-normal font-['Lato'] leading-normal whitespace-pre-line">
                    {complaint.description}
                  </div>
                </div>
                <div className="text-right text-neutral-800 text-xs font-normal font-['Plus_Jakarta_Sans'] leading-none">
                  0/2000
                </div>
              </div>

              {/* Images Section */}
              <div className='flex flex-col gap-10'>
                <div className='flex gap-6'>
                  {complaint.images &&
                    complaint.images.map((image, index) => (
                      <div
                        key={index}
                        className='w-80 h-64 rounded-lg bg-blue-900 flex items-center justify-center overflow-hidden'
                      >
                        <div className='text-white text-xs text-center p-4'>
                          {/* Placeholder for blue screen image */}
                          <div className='font-mono text-xs'>
                            STOP: 0X000000BE (0XF7D40388, 0X00000001,
                            0XF79F2000, 0X00000000)
                            <br />
                            <br />
                            *** DRIVER_IRQL_NOT_LESS_OR_EQUAL
                            <br />
                            <br />
                            If this is the first time you've seen this Stop
                            error screen,
                            <br />
                            restart your computer. If you do this:
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Give Feedback Button */}
                <button className='px-6 py-3 bg-Lime-Green-500-Raw rounded inline-flex justify-center items-center gap-2.5 self-start'>
                  <span className="text-white text-base font-medium font-['Poppins'] leading-normal">
                    Give feedback
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
