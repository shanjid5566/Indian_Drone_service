import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBullhorn,
  FaRetweet,
  FaUserFriends,
  FaShare,
  FaChevronDown,
  FaAngleLeft,
  FaCamera,
  FaSms,
} from "react-icons/fa";
import { IoClose, IoMail, IoNotificationsOutline } from "react-icons/io5";

export default function CampaignModal({ onClose }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [campaignType, setCampaignType] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetedAudience, setTargetedAudience] = useState("");
  const [campaignImages, setCampaignImages] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  console.log(campaignType);

  const objectives = [
    {
      icon: <FaBullhorn className="w-5 h-5 text-black" />,
      title: t("dashboard.marketing.CampaignModal.step_1.BrandAwareness"),
      description: t(
        "dashboard.marketing.CampaignModal.step_1.BrandAwarenessDescription"
      ),
    },
    {
      icon: <FaUserFriends className="w-5 h-5 text-black" />,
      title: t("dashboard.marketing.CampaignModal.step_1.CustomerAcquisition"),
      description: t(
        "dashboard.marketing.CampaignModal.step_1.CustomerAcquisitionDescription"
      ),
    },
    {
      icon: <FaRetweet className="w-5 h-5 text-black" />,
      title: t("dashboard.marketing.CampaignModal.step_1.Retargeting"),

      description: t(
        "dashboard.marketing.CampaignModal.step_1.RetargetingDescription"
      ),
    },
    {
      icon: <FaShare className="w-5 h-5 text-black" />,
      title: t("dashboard.marketing.CampaignModal.step_1.ReferralProgram"),
      description: t(
        "dashboard.marketing.CampaignModal.step_1.ReferralProgramDescription"
      ),
    },
  ];

  const goals = [
    {
      id: "signups",
      label: t("dashboard.marketing.CampaignModal.step_2.Signups"),
    },
    {
      id: "bookings",
      label: t("dashboard.marketing.CampaignModal.step_2.Bookings"),
    },
    {
      id: "downloads",
      label: t("dashboard.marketing.CampaignModal.step_2.Downloads"),
    },
    {
      id: "engagement",
      label: t("dashboard.marketing.CampaignModal.step_2.Engagement"),
    },
  ];
  const toggleChannel = (channel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
    setError("");
  };
  const handleNext = () => {
    // Step 1 Validation
    if (step === 1) {
      if (!campaignType) {
        setError("⚠️ Please select a Campaign Type.");
        return;
      }
      if (!selectedSegment) {
        setError("⚠️ Please select a target segment.");
        return;
      }
    }

    // Step 2 Validation
    if (step === 2) {
      if (!selectedGoal && !budget) {
        setError("⚠️ Please select a goal and enter budget.");
        return;
      } else if (!selectedGoal) {
        setError("⚠️ Please select a goal.");
        return;
      } else if (!budget) {
        setError("⚠️ Please enter budget.");
        return;
      }
    }

    // Step 3 Validation
    if (step === 3) {
      if (!campaignTitle.trim()) {
        setError("⚠️ Please enter campaign title.");
        return;
      }
      if (!description.trim()) {
        setError("⚠️ Please enter campaign description.");
        return;
      }
      if (!targetedAudience) {
        setError("⚠️ Please select targeted audience.");
        return;
      }
      if (!campaignImages[0] || !campaignImages[1]) {
        setError("⚠️ Please upload both images.");
        return;
      }
    }

    setError("");
    setStep((prev) => prev + 1); // Move to next modal
  };
  const handleLaunchCampaign = () => {
    if (selectedChannels.length === 0) {
      setError("⚠️ Please select at least one marketing channel.");
      return;
    }
    console.log("Campaign Launched!");
    handleClose();
  };
  const handlePrevious = () => setStep((prev) => prev - 1);
  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <>
      {step === 1 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl animate-fadeIn p-1">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <h2 className="text-base md:text-lg lg:text-2xl font-semibold text-black">
                {t(
                  "dashboard.marketing.CampaignModal.step_1.CreateNewCampaign"
                )}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFC107] rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span>
                  {t("dashboard.marketing.CampaignModal.step_1.Step")} 1 of 4
                </span>
                <span>
                  {t(
                    "dashboard.marketing.CampaignModal.step_1.Progress25Percent"
                  )}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold mb-4 text-base md:text-lg">
                {t("dashboard.marketing.CampaignModal.step_1.SetCampaignType")}
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {objectives.map((obj, i) => (
                  <button
                    key={i}
                    onClick={() => setCampaignType(obj.title)}
                    className={`flex flex-col items-start p-3 rounded-lg  hover:bg-blue-50 transition text-left
                        ${
                          campaignType === obj.title
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-[#E2E8F0] hover:border-blue-300"
                        }
                        `}
                  >
                    {obj.icon}
                    <h4 className="font-medium text-sm mt-2">{obj.title}</h4>
                    <p className="text-xs text-gray-700">{obj.description}</p>
                  </button>
                ))}
              </div>

              {/* Target Segment */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t(
                    "dashboard.marketing.CampaignModal.step_1.DefineTargetSegment"
                  )}
                </label>
                <div className="relative">
                  <select
                    value={selectedSegment}
                    onChange={(e) => setSelectedSegment(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm appearance-none"
                  >
                    <option value="">
                      {t(
                        "dashboard.marketing.CampaignModal.step_1.SelectTargetSegment"
                      )}
                    </option>
                    <option value="Customers">
                      {t("dashboard.marketing.CampaignModal.step_1.Operator")}
                    </option>
                    <option value="Operator">
                      {t("dashboard.marketing.CampaignModal.step_1.Customers")}
                    </option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ">
                    <FaChevronDown />
                  </div>
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-4 rounded-b-lg">
              <button
                onClick={handleNext}
                className="px-6 py-2 text-sm font-medium text-white bg-[#FFC107] rounded-lg hover:bg-yellow-500"
              >
                {t("dashboard.marketing.Next")}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* strp 2 */}
      {step === 2 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-base md:text-lg lg:text-2xl font-semibold">
                {t(
                  "dashboard.marketing.CampaignModal.step_1.DefineTargetSegment"
                )}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-4 pt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFC107] rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>
                  {t("dashboard.marketing.CampaignModal.step_1.Step")} 2 of 4
                </span>
                <span className="text-base">50%</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-base md:text-lg mb-4">
                {t("dashboard.marketing.CampaignModal.step_2.SetCampaignGoals")}
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedGoal === goal.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-[#E2E8F0] hover:border-blue-300"
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("dashboard.marketing.CampaignModal.step_2.CampaignBudget")}
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder={t(
                    "dashboard.marketing.CampaignModal.step_2.EnterBudgetAmount"
                  )}
                  className="w-full px-3 py-2 border rounded-lg text-sm "
                />
              </div>
              {/* Error message */}
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            {/* Footer */}
            <div className="flex justify-between p-4  rounded-b-lg">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex justify-center items-center gap-1"
              >
                <FaAngleLeft /> <span>{t("dashboard.marketing.Previous")}</span>
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500"
              >
                {t("dashboard.marketing.Next")}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Step 3 */}
      {step === 3 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-base md:text-lg lg:text-2xl font-semibold">
                {t(
                  "dashboard.marketing.CampaignModal.step_1.CreateNewCampaign"
                )}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-4 pt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFC107] rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>
                  {t("dashboard.marketing.CampaignModal.step_1.Step")} 3 of 4
                </span>
                <span className="text-base lg:text-lg">75%</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Campaign Title */}
              <h3 className="font-semibold text-base md:text-lg mb-2">
                {t("dashboard.marketing.CampaignModal.step_3.CampaignTitle")}
              </h3>
              <input
                type="text"
                value={campaignTitle}
                onChange={(e) => {
                  setCampaignTitle(e.target.value);
                  setError("");
                }}
                placeholder={t(
                  "dashboard.marketing.CampaignModal.step_3.EnterCampaignTitle"
                )}
                className="w-full px-3 py-2 border rounded-lg text-sm mb-2 bg-[#FAFAFA]"
              />
              {error.includes("title") && (
                <p className="text-red-600 text-sm mb-2">{error}</p>
              )}

              {/* Description */}
              <h3 className="font-semibold text-base md:text-lg mb-2">
                {t("dashboard.marketing.CampaignModal.step_3.Description")}
              </h3>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError("");
                }}
                placeholder={t(
                  "dashboard.marketing.CampaignModal.step_3.EnterCampaignDetails"
                )}
                rows="4"
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mb-2 bg-[#FAFAFA]"
              ></textarea>
              {error.includes("description") && (
                <p className="text-red-600 text-sm mb-2">{error}</p>
              )}

              {/* Target Audience */}
              <h3 className="font-semibold text-base md:text-lg mb-2">
                {t("dashboard.marketing.CampaignModal.step_3.TargetedAudience")}
              </h3>
              <div className="relative mb-2">
                <select
                  value={targetedAudience}
                  onChange={(e) => {
                    setTargetedAudience(e.target.value);
                    setError("");
                  }}
                  className="w-full px-3 py-2 border rounded-lg text-sm appearance-none"
                >
                  <option value="">
                    {t(
                      "dashboard.marketing.CampaignModal.step_3.SelectTargetSegment"
                    )}
                  </option>
                  <option value="Customers">
                    {t("dashboard.marketing.CampaignModal.step_1.Operator")}
                  </option>
                  <option value="Operator">
                    {t("dashboard.marketing.CampaignModal.step_1.Customers")}
                  </option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <FaChevronDown />
                </div>
              </div>
              {error.includes("audience") && (
                <p className="text-red-600 text-sm mb-2">{error}</p>
              )}

              {/* File Upload */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((num) => (
                  <div
                    key={num}
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-400 cursor-pointer transition relative bg-[#FAFAFA]"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const newFile = e.target.files[0];
                          setCampaignImages((prev) => [...prev, newFile]);
                          setError("");
                        }
                      }}
                      className="hidden"
                      id={`upload${num}`}
                    />
                    <label
                      htmlFor={`upload${num}`}
                      className="cursor-pointer text-center"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <FaCamera />
                      </div>
                      <p className="text-xs text-gray-600">
                        {t(
                          "dashboard.marketing.CampaignModal.step_3.UploadCampaignImages"
                        )}
                      </p>
                    </label>
                    {campaignImages[num - 1] && (
                      <p className="text-xs text-gray-700 mt-2 truncate w-full text-center px-2">
                        {campaignImages[num - 1].name}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* ✅ Image error */}
              {error === "⚠️ Please upload both images." && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between p-4 rounded-b-lg">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex justify-center items-center gap-1"
              >
                <FaAngleLeft /> <span>{t("dashboard.marketing.Previous")}</span>
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500"
              >
                {t("dashboard.marketing.Confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Step 4 */}
      {step === 4 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-base md:text-lg lg:text-2xl font-semibold">
                {t(
                  "dashboard.marketing.CampaignModal.step_1.CreateNewCampaign"
                )}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-4 pt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFC107] rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>
                  {t("dashboard.marketing.CampaignModal.step_1.Step")} 4 of 4
                </span>
                <span className="text-base lg:text-lg">100%</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-base md:text-lg mb-4">
                {t(
                  "dashboard.marketing.CampaignModal.step_4.ChooseMarketingChannels"
                )}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {/* Email */}
                <button
                  onClick={() => toggleChannel("email")}
                  className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
                    selectedChannels.includes("email")
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <IoMail className="w-6 h-6" />
                  <span className="text-sm font-medium">
                    {t("dashboard.marketing.CampaignModal.step_4.Email")}
                  </span>
                </button>

                {/* SMS */}
                <button
                  onClick={() => toggleChannel("sms")}
                  className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
                    selectedChannels.includes("sms")
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FaSms className="w-6 h-6" />
                  <span className="text-sm font-medium">
                    {t("dashboard.marketing.CampaignModal.step_4.SMS")}
                  </span>
                </button>

                {/* Push Notification */}
                <button
                  onClick={() => toggleChannel("push")}
                  className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
                    selectedChannels.includes("push")
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <IoNotificationsOutline className="w-6 h-6" />
                  <span className="text-sm font-medium">
                    {t(
                      "dashboard.marketing.CampaignModal.step_4.PushNotification"
                    )}
                  </span>
                </button>

                {/* Social Media */}
                <button
                  onClick={() => toggleChannel("social")}
                  className={`flex items-center gap-3 p-4 border rounded-lg transition-colors ${
                    selectedChannels.includes("social")
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FaShare className="w-6 h-6" />
                  <span className="text-sm font-medium">
                    {t("dashboard.marketing.CampaignModal.step_4.SocialMedia")}
                  </span>
                </button>
              </div>

              {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
            </div>

            {/* Footer */}
            <div className="flex justify-between p-4 rounded-b-lg">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex justify-center items-center gap-1"
              >
                <FaAngleLeft />{" "}
                <span>
                  {t("dashboard.marketing.Previous")}
                </span>
              </button>
              <button
                onClick={handleLaunchCampaign}
                className="px-6 py-2 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 flex items-center gap-2"
              >
                <span>{t("dashboard.marketing.LaunchCampaign")}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
