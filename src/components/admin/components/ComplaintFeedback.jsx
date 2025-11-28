import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { Header } from '../../common/Header';

const ComplaintFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [response, setResponse] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/admin/data/complaints.json');
        const allComplaints = res.data.complaints || [];
        const found = allComplaints.find((c) => c.id === parseInt(id));
        setComplaint(found);
      } catch (error) {
        console.error('Error fetching complaint details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintDetails();
  }, [id]);

  const handleBack = () => {
    navigate(`/admin/complaint-details/${id}`, {
      state: { from: location.state?.from },
    });
  };

  const handleSend = () => {
    console.log('Response submitted for complaint', id, ':', response);
    navigate(`/admin/complaint-details/${id}`, {
      state: { from: location.state?.from },
    });
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-500'>Complaint not found</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='w-full min-h-screen bg-[#FAFFFD] p-6 md:p-10 lg:p-12'>
        <div className='max-w-7xl mx-auto'>
          {/* Back Button */}
          <div className='mb-8'>
            <button
              onClick={handleBack}
              className='flex items-center gap-3 text-gray-800 hover:text-black cursor-pointer'
            >
              <IoArrowBack className='w-6 h-6' />
            </button>
          </div>

          {/* Main Content */}
          <div className='w-full flex flex-col gap-10'>
            {/* Top Section - Ticket Description and Details */}
            <div className='w-full flex gap-6'>
              {/* Ticket Description */}
              <div className='flex-1 p-6 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col gap-5'>
                <div className="text-gray-900 text-xl font-semibold font-['Poppins'] leading-7">
                  Ticket description
                </div>
                <div className="text-gray-600 text-sm font-normal font-['Lato'] leading-relaxed whitespace-pre-line">
                  {complaint.description}
                </div>
              </div>

              {/* Ticket Details */}
              <div className='flex-1 p-6 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col gap-5'>
                <div className="text-gray-900 text-xl font-semibold font-['Poppins'] leading-7">
                  Ticket details
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-2'>
                    <div className="text-gray-700 text-sm font-semibold font-['Poppins'] leading-tight min-w-[120px]">
                      ID:
                    </div>
                    <div className="text-gray-600 text-sm font-normal font-['Lato'] leading-tight">
                      {complaint.ticketId}
                    </div>
                  </div>
                  <div className='flex items-start gap-2'>
                    <div className="text-gray-700 text-sm font-semibold font-['Poppins'] leading-tight min-w-[120px]">
                      Subject:
                    </div>
                    <div className="flex-1 text-gray-600 text-sm font-normal font-['Lato'] leading-tight">
                      {complaint.subject}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className="text-gray-700 text-sm font-semibold font-['Poppins'] leading-tight min-w-[120px]">
                      Requester type:
                    </div>
                    <div className="flex-1 text-gray-600 text-sm font-normal font-['Lato'] leading-tight">
                      Customer account
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className="text-gray-700 text-sm font-semibold font-['Poppins'] leading-tight min-w-[120px]">
                      Created on:
                    </div>
                    <div className='flex-1'>
                      <span className="text-gray-600 text-sm font-normal font-['Lato'] leading-tight">
                        Sep 06, 2025{' '}
                      </span>
                      <span className="text-gray-400 text-xs font-normal font-['Lato'] leading-none">
                        20:44:58
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className="text-gray-700 text-sm font-semibold font-['Poppins'] leading-tight min-w-[120px]">
                      Contact:
                    </div>
                    <div className="flex-1 text-gray-600 text-sm font-normal font-['Lato'] leading-tight">
                      example@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className='w-full p-6 bg-white rounded-lg border border-zinc-100 flex flex-col gap-5'>
              <div className='py-3 border-b border-neutral-300'>
                <div className="text-neutral-800 text-2xl font-semibold font-['Poppins'] leading-9">
                  Chat
                </div>
              </div>
              <div className='flex flex-col gap-7'>
                <div className='flex items-center gap-4'>
                  <div className="text-black text-sm font-normal font-['Lato'] leading-snug">
                    Update Aug 09, 2025
                  </div>
                  <div className="text-black text-sm font-normal font-['Lato'] leading-snug">
                    13:32:49
                  </div>
                </div>
                <div className='flex flex-col gap-6'>
                  {/* Chat Message 1 */}
                  <div className='flex gap-3'>
                    <div className='w-10 h-10 rounded-full bg-gray-300 flex-shrink-0' />
                    <div className='flex-1 flex flex-col gap-6'>
                      <div className='flex flex-col gap-1'>
                        <div className="text-neutral-800 text-base font-medium font-['Poppins'] leading-normal">
                          Admin
                        </div>
                        <div className="text-neutral-600 text-[10px] font-normal font-['Lato'] leading-none">
                          Aug 09, 2025
                        </div>
                      </div>
                      <div className='px-6 py-3 bg-[#F3F4F6] rounded-lg'>
                        <div className="text-neutral-600 text-base font-normal font-['Lato'] leading-normal">
                          Thanks for sharing.
                          <br />
                          We have shared you full root access to the server.
                          <br />
                          Hope you issue is resolved now..
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Message 2 */}
                  <div className='flex gap-3'>
                    <div className='w-10 h-10 rounded-full bg-gray-300 flex-shrink-0' />
                    <div className='flex-1 flex flex-col gap-6'>
                      <div className='flex flex-col gap-1'>
                        <div className="text-neutral-800 text-base font-medium font-['Poppins'] leading-normal">
                          Admin
                        </div>
                        <div className="text-neutral-600 text-[10px] font-normal font-['Lato'] leading-none">
                          Aug 09, 2025
                        </div>
                      </div>
                      <div className='px-6 py-3 bg-[#F3F4F6] rounded-lg'>
                        <div className="text-neutral-600 text-base font-normal font-['Lato'] leading-normal">
                          Thanks for sharing.
                          <br />
                          We have shared you full root access to the server.
                          <br />
                          Hope you issue is resolved now..
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Respond Section */}
            <div className='w-full flex flex-col gap-4'>
              <div className="text-neutral-800 text-2xl font-medium font-['Poppins'] leading-9">
                Respond
              </div>
              <div className='h-36 p-5 bg-[#E8EBF0] rounded-xl'>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder='Write your response'
                  className="w-full h-full bg-transparent text-gray-700 text-sm font-normal font-['Lato'] leading-normal focus:outline-none resize-none placeholder:text-gray-500"
                />
              </div>
              <button
                onClick={handleSend}
                className='w-full px-2.5 py-3 bg-green-600 rounded-lg flex justify-center items-center hover:bg-green-700 transition-colors'
              >
                <div className="text-white text-base font-medium font-['Poppins'] leading-normal">
                  Send
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintFeedback;
