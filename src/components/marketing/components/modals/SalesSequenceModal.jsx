// SalesSequenceModal.jsx
// Ei file ta alada save korun

import React, { useState } from "react";
import { FaTimes, FaPause, FaCheck, FaClock } from "react-icons/fa";

const SalesSequenceModal = ({ isOpen, onClose, sequenceData }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [steps, setSteps] = useState(
    sequenceData?.steps || [
      {
        id: 1,
        day: 1,
        title: "Welcome email sent",
        status: "completed",
      },
      {
        id: 2,
        day: 3,
        title: "Follow-up email with resources",
        status: "completed",
      },
      {
        id: 3,
        day: 5,
        title: "Personal introduction call",
        status: "pending",
      },
      {
        id: 4,
        day: 7,
        title: "Product demo invitation",
        status: "pending",
      },
      {
        id: 5,
        day: 10,
        title: "Special offer SMS",
        status: "pending",
      },
    ]
  );

  const completedSteps = steps.filter(
    (step) => step.status === "completed"
  ).length;
  const totalSteps = steps.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  const handleMarkComplete = (id) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, status: "completed" } : step
      )
    );
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-3 border-gray-200">
          <div className="flex-1">
            <h2 className="sm:text-base md:text-lg lg:text-2xl  font-semibold text-[#2C2C2C] mb-1">
              {sequenceData?.title || "Sales Sequence - AgriTech Solution"}
            </h2>
            <p className="text-sm text-[#2C2C2C]">
              {completedSteps} of {totalSteps} steps completed
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Pause Button */}
          <div className="flex justify-end">
            <button
              onClick={handlePause}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg mb-6 transition-colors  ${
                isPaused
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              <FaPause className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isPaused ? "Paused" : "Pause"}
              </span>
            </button>
          </div>

          {/* Progress Section */}
          <div className="mb-6 bg-[#F9FAFC] p-3 rounded-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#002244]">
                Progress
              </span>
              <span className="text-sm font-semibold text-[#002244]">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-[#F9FAFC] rounded-full h-2.5 overflow-hidden ">
              <div
                className="bg-[#9FF625] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border transition-all ${
                  step.status === "completed"
                    ? "bg-[#EAF6EC] border-green-200"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-[#f3f0e5] border-2 border-gray-300 text-[#28A844]"
                  }`}
                >
                  {step.status === "completed" ? (
                    <FaCheck className="w-4 h-4" />
                  ) : (
                    <FaClock className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row items-center md:gap-4 sm:gap-2">
                    <span className="text-sm md:text-base font-semibold text-[#002244]">
                      Day {step.day}
                    </span>
                    <span className="text-sm text-black truncate">
                      {step.title}
                    </span>
                  </div>
                </div>

                {/* Status/Action */}
                <div className="flex-shrink-0">
                  {step.status === "completed" ? (
                    <span className="text-xs sm:text-sm font-medium text-green-600">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMarkComplete(step.id)}
                      disabled={isPaused}
                      className={`text-xs sm:text-sm font-medium px-3 py-1 rounded transition-colors whitespace-nowrap ${
                        isPaused
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-yellow-700 bg-[#FFF9E6]"
                      }`}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSequenceModal;
