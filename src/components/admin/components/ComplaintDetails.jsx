import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { Header } from '../../common/Header';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/data/complaints.json');
        const allComplaints = response.data.complaints || [];
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
    // Check if we came from dashboard
    if (location.state?.from === 'dashboard') {
      navigate('/admin');
    } else {
      // Otherwise go back to complaints page
      navigate('/admin/complaints');
    }
  };

  const handleGiveFeedback = () => {
    navigate(`/admin/complaint-feedback/${id}`, {
      state: { from: location.state?.from || 'complaints' },
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
          <div className='w-full'>
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Subject
              </label>
              <input
                type='text'
                value={complaint.subject}
                readOnly
                className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none'
              />
            </div>

            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Description
              </label>
              <textarea
                value={complaint.description}
                readOnly
                rows={8}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none resize-none'
              />
              <div className='text-right text-xs text-gray-500 mt-1'>
                0/2000
              </div>
            </div>

            <div className='mb-8'>
              <div className='grid grid-cols-3 gap-4'>
                {complaint.images &&
                  complaint.images.map((image, index) => (
                    <div
                      key={index}
                      className='aspect-video bg-blue-900 rounded-lg overflow-hidden flex items-center justify-center text-white text-xs'
                    >
                      <div className='text-center p-4'>
                        <div className='mb-2'>FATAL ERROR</div>
                        <div className='text-[10px]'>
                          An error has occurred. To continue:
                          <br />
                          Press Enter to return to Windows, or
                          <br />
                          Press CTRL+ALT+DEL to restart your computer. If you do
                          this,
                          <br />
                          you will lose any unsaved information in all open
                          applications.
                          <br />
                          <br />
                          Error: 0E : 016F : BFF9B3D4
                          <br />
                          <br />
                          Press any key to continue _
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <button
              onClick={handleGiveFeedback}
              className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
            >
              Give feedback
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintDetails;
