import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineX, HiOutlineArrowLeft } from 'react-icons/hi';

const AssignJobModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNumber: '',
    email: '',
    orderId: '',
    city: '',
    postalCode: '',
    street: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assigning job:', formData);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-neutral-950/80 transition-opacity'
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className='flex min-h-full items-center justify-center p-20'>
        <div className='relative bg-white rounded-2xl shadow-2xl overflow-hidden'>
          {/* Content Wrapper */}
          <div className='w-[690px] inline-flex flex-col justify-start items-center gap-20 p-20'>
            {/* Header */}
            <div className='self-stretch h-12 inline-flex justify-between items-center'>
              <button
                onClick={onClose}
                className='flex justify-start items-center gap-3'
                type='button'
              >
                <div className='w-6 h-6 relative overflow-hidden'>
                  <HiOutlineArrowLeft className='w-5 h-3.5 absolute left-[2.91px] top-[4.50px] text-neutral-800' />
                </div>
              </button>
              <h2 className='text-2xl font-semibold font-["Poppins"] leading-9 text-neutral-950'>
                {t('dashboard.admin.assignJob.title')}
              </h2>
              <button
                onClick={onClose}
                className='p-3 bg-gray-100 rounded-[46px] flex justify-start items-center gap-2.5'
                type='button'
              >
                <div className='w-6 h-6 relative overflow-hidden'>
                  <HiOutlineX className='w-3.5 h-3.5 absolute left-[5px] top-[5px] text-neutral-950' />
                </div>
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className='w-[504px] flex flex-col justify-start items-end gap-12'
            >
              <div className='self-stretch flex flex-col justify-start items-start gap-6'>
                {/* Client Full Name */}
                <div className='self-stretch h-24 flex flex-col justify-start items-start gap-4'>
                  <div className='self-stretch justify-start'>
                    <span className='text-neutral-800 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.assignJob.clientName')}
                    </span>
                    <span className='text-rose-600 text-base font-medium font-["Poppins"] leading-normal'>
                      *
                    </span>
                  </div>
                  <div className='self-stretch h-14 p-5 bg-green-50 rounded-lg inline-flex justify-start items-center gap-2.5'>
                    <input
                      type='text'
                      name='clientName'
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder={t(
                        'dashboard.admin.assignJob.clientNamePlaceholder'
                      )}
                      className='w-full bg-transparent text-neutral-500 text-xs font-normal font-["Lato"] leading-none outline-none placeholder:text-neutral-500'
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className='self-stretch h-24 flex flex-col justify-start items-start gap-4'>
                  <div className='self-stretch justify-start'>
                    <span className='text-neutral-800 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.assignJob.phoneNumber')}
                    </span>
                    <span className='text-rose-600 text-base font-medium font-["Poppins"] leading-normal'>
                      *
                    </span>
                  </div>
                  <div className='self-stretch h-14 p-5 bg-green-50 rounded-lg inline-flex justify-start items-center gap-2.5'>
                    <input
                      type='tel'
                      name='phoneNumber'
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder='franco.rossi@mototo.com'
                      className='w-full bg-transparent text-neutral-500 text-xs font-normal font-["Lato"] leading-none outline-none placeholder:text-neutral-500'
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className='self-stretch h-24 flex flex-col justify-start items-start gap-4'>
                  <div className='self-stretch justify-start'>
                    <span className='text-neutral-800 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.assignJob.email')}
                    </span>
                    <span className='text-rose-600 text-base font-medium font-["Poppins"] leading-normal'>
                      *
                    </span>
                  </div>
                  <div className='self-stretch h-14 p-5 bg-green-50 rounded-lg inline-flex justify-start items-center gap-2.5'>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='franco.rossi@mototo.com'
                      className='w-full bg-transparent text-neutral-500 text-xs font-normal font-["Lato"] leading-none outline-none placeholder:text-neutral-500'
                      required
                    />
                  </div>
                </div>

                {/* Order ID */}
                <div className='self-stretch h-24 flex flex-col justify-start items-start gap-4'>
                  <div className='self-stretch justify-start'>
                    <span className='text-neutral-800 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.assignJob.orderId')}
                    </span>
                    <span className='text-rose-600 text-base font-medium font-["Poppins"] leading-normal'>
                      *
                    </span>
                  </div>
                  <div className='self-stretch h-14 p-5 bg-green-50 rounded-lg inline-flex justify-start items-center gap-2.5'>
                    <input
                      type='text'
                      name='orderId'
                      value={formData.orderId}
                      onChange={handleChange}
                      placeholder='#054512246514'
                      className='w-full bg-transparent text-neutral-500 text-xs font-normal font-["Lato"] leading-none outline-none placeholder:text-neutral-500'
                      required
                    />
                  </div>
                </div>

                {/* City */}
                <div className='self-stretch h-24 flex flex-col justify-start items-start gap-4'>
                  <div className='self-stretch justify-start'>
                    <span className='text-neutral-800 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.assignJob.city')}
                    </span>
                    <span className='text-rose-600 text-base font-medium font-["Poppins"] leading-normal'>
                      *
                    </span>
                  </div>
                  <div className='self-stretch h-14 p-5 bg-green-50 rounded-lg inline-flex justify-start items-center gap-2.5'>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                      placeholder='Mumbai'
                      className='w-full bg-transparent text-neutral-500 text-xs font-normal font-["Lato"] leading-none outline-none placeholder:text-neutral-500'
                      required
                    />
                  </div>
                </div>

                {/* Postal Code */}
                <div className='self-stretch h-24 flex flex-col justify-start items-start gap-4'>
                  <div className='self-stretch justify-start'>
                    <span className='text-neutral-800 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.assignJob.postalCode')}
                    </span>
                    <span className='text-rose-600 text-base font-medium font-["Poppins"] leading-normal'>
                      *
                    </span>
                  </div>
                  <div className='self-stretch h-14 p-5 bg-green-50 rounded-lg inline-flex justify-start items-center gap-2.5'>
                    <input
                      type='text'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder='400020'
                      className='w-full bg-transparent text-neutral-500 text-xs font-normal font-["Lato"] leading-none outline-none placeholder:text-neutral-500'
                      required
                    />
                  </div>
                </div>

                {/* Street */}
                <div className='self-stretch h-24 flex flex-col justify-start items-start gap-4'>
                  <div className='self-stretch justify-start'>
                    <span className='text-neutral-800 text-base font-medium font-["Poppins"] leading-normal'>
                      {t('dashboard.admin.assignJob.street')}
                    </span>
                    <span className='text-rose-600 text-base font-medium font-["Poppins"] leading-normal'>
                      *
                    </span>
                  </div>
                  <div className='self-stretch p-5 bg-green-50 rounded-lg inline-flex justify-start items-center gap-2.5'>
                    <textarea
                      name='street'
                      value={formData.street}
                      onChange={handleChange}
                      placeholder='Marine Drive, Netaji Subhash Chandra Bose Road, Churchgate, South Mumbai'
                      rows='2'
                      className='w-full bg-transparent text-neutral-500 text-xs font-normal font-["Lato"] leading-none outline-none resize-none placeholder:text-neutral-500'
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='self-stretch px-2.5 py-3 bg-green-500 rounded inline-flex justify-center items-center gap-2.5'
              >
                <div className='text-white text-base font-medium font-["Poppins"] leading-normal'>
                  {t('dashboard.admin.assignJob.assignButton')}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignJobModal;
