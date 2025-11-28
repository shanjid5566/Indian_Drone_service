import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="xl:min-h-screen bg-gray-50 py-10 lg:py-20 px-4">
      <div className="max-w-7xl w-11/12 mx-auto md:bg-white rounded-lg lg:shadow-sm p-2 lg:p-8 md:p-12">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
          {t('contact2.form.header')}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6 mb-2 lg:mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                {t('contact2.form.firstName')}<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('contact2.form.firstNamePlaceholder')}
                required
                className="w-full px-4 py-1.5 lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                {t('contact2.form.lastName')}<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t('contact2.form.lastNamePlaceholder')}
                required
                className="w-full px-4  py-1.5 lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6 mb-2 lg:mb-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                {t('contact2.form.phone')}<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('contact2.form.phonePlaceholder')}
                required
                className="w-full px-4 py-1.5 lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                {t('contact2.form.email')}<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact2.form.emailPlaceholder')}
                required
                className="w-full px-4 py-1.5 lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="mb-2 lg:mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
              {t('contact2.form.subject')}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={t('contact2.form.subjectPlaceholder')}
              className="w-full px-4  py-1.5 lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Message */}
          <div className="mb-4 lg:mb-8">
            <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
              {t('contact2.form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact2.form.messagePlaceholder')}
              rows="6"
              className="w-full px-4 py-1.5 lg:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium sm:px-8 px-4 py-1 sm:py-3 rounded-md transition-colors duration-200"
          >
            {t('contact2.form.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
