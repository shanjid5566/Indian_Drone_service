import React, { useState } from 'react';

// --- Reusable Components ---

const TextInput = ({ placeholder, isRequired = false }) => (
  <input
    className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
    placeholder={placeholder + (isRequired ? '*' : '')}
  />
);

const SelectInput = ({ options = [] }) => (
  <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-700">
    {options.map((opt, idx) => (
      <option key={idx}>{opt}</option>
    ))}
  </select>
);

const ModalWrapper = ({
  title,
  children,
  hasBackButton,
  onBack,
  onNext,
  nextButtonText,
  nextButtonClass = 'bg-green-500 hover:bg-green-600',
}) => (
  <div className="bg-white rounded-lg w-full max-w-lg mx-4 overflow-hidden shadow-2xl transform transition-all duration-300 scale-100">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
    <div>{children}</div>
    <div className="p-4 border-t border-gray-200 flex justify-end items-center">
      {hasBackButton && (
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 font-semibold py-2 px-4 rounded text-sm mr-auto"
        >
          Back
        </button>
      )}
      <button
        onClick={onNext}
        className={`${nextButtonClass} text-white font-semibold py-2 px-6 rounded text-sm`}
      >
        {nextButtonText}
      </button>
    </div>
  </div>
);

// --- Step Components ---

const Step1 = ({ nextStep }) => (
  <ModalWrapper title="Step 1: Customer Info" onNext={nextStep} nextButtonText="Next">
    <div className="p-6 h-96 overflow-y-auto space-y-3">
      <TextInput placeholder="First name" />
      <TextInput placeholder="Last name" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" /> m               
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <TextInput placeholder="Customer ID" />
      <div className="h-60 bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm rounded-md p-4">
        Scrollable Customer Info Fields
      </div>
    </div>
  </ModalWrapper>
);

const Step3 = ({ nextStep, prevStep }) => (
  <ModalWrapper
    title="Step 3: License & Plan"
    hasBackButton
    onBack={prevStep}
    onNext={nextStep}
    nextButtonText="Next"
  >
    <div className="p-6 space-y-4">
      <SelectInput options={['Plan*']} />
      <TextInput placeholder="Price" isRequired />
      <SelectInput options={['Period*']} />

      <div className="w-full p-2 border border-yellow-400 rounded text-sm bg-yellow-100 text-yellow-800 flex items-center">
        <span className="mr-2 text-lg">💡</span> Upgrading License
      </div>
    </div>
  </ModalWrapper>
);

const Step4 = ({ closeFlow, prevStep }) => (
  <ModalWrapper
    title="Step 4: Services"
    hasBackButton
    onBack={prevStep}
    onNext={closeFlow}
    nextButtonText="Create Customer"
  >
    <div className="p-6 h-80 overflow-y-auto space-y-3">
      <div className="text-sm font-medium mb-2 text-gray-700">Services Available</div>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-500"
        >
          Service {idx + 1} availability
        </div>
      ))}
    </div>
  </ModalWrapper>
);

// --- Main Multi-Step Modal ---

const MultiStepRegistrationModal = ({ isOpen, closeModal }) => {
  const [step, setStep] = useState(1);

  const closeFlow = () => {
    setStep(1); // reset
    closeModal();
  };

  const nextStep = () => setStep((prev) => (prev === 1 ? 3 : 4));
  const prevStep = () => setStep((prev) => (prev === 3 ? 1 : 3));

  if (!isOpen) return null;

  const stepComponents = {
    1: <Step1 nextStep={nextStep} />,
    3: <Step3 nextStep={nextStep} prevStep={prevStep} />,
    4: <Step4 closeFlow={closeFlow} prevStep={prevStep} />,
  };

  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center z-50">
      {stepComponents[step]}
    </div>
  );
};

export default MultiStepRegistrationModal;
