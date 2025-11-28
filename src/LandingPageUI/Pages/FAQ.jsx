import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { questionKey: 'faq.q1', answerKey: 'faq.a1' },
    { questionKey: 'faq.q2', answerKey: 'faq.a2' },
    { questionKey: 'faq.q3', answerKey: 'faq.a3' },
    { questionKey: 'faq.q4', answerKey: 'faq.a4' },
    { questionKey: 'faq.q5', answerKey: 'faq.a5' },
    { questionKey: 'faq.q6', answerKey: 'faq.a6' },
    { questionKey: 'faq.q7', answerKey: 'faq.a7' },
    { questionKey: 'faq.q8', answerKey: 'faq.a8' },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="section-padding bg-gray-50 mb-0">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {t('faq.header')}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2 lg:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border-2 border-green-500 overflow-hidden transition-all duration-300"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-3 lg:p-5 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-sm lg:text-lg text-gray-900 pr-4">
                  {t(faq.questionKey)}
                </span>
                <span className="flex-shrink-0 lg:w-10 lg:h-10 h-7 w-7 flex items-center justify-center bg-green-600 text-white rounded text-sm lg:text-xl font-light">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 pt-0 text-gray-600 text-sm md:text-base">
                  {t(faq.answerKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
