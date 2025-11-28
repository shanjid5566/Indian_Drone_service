// src/components/automation/AutomationModal.jsx
import { MdClose } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AutomationModal = ({
  isOpen,
  onClose,
  automationSettings = [],
  onToggle,
  onDelete,
  onAddRule,
}) => {
  const { t } = useTranslation();
  // Avoid calling `t` in default props (it's undefined during parameter initialization)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[70vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between  md:py-4 px-6 md:px-8  border-gray-200">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-5">
              {t("dashboard.marketing.AutomationModal.IfLeadIsHot")}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              {t("dashboard.marketing.AutomationModal.ThreeOfFourRulesActive")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close automation modal"
          >
            <MdClose size={20} />
          </button>
        </div>
        {console.log(automationSettings)}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          <div className="space-y-3">
            {automationSettings.map((setting) => (
              <div
                key={setting.id}
                className="bg-gray-50 rounded-lg p-3 md:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">
                      {t(
                        "dashboard.marketing.AutomationModal.AutomationSettings"
                      )}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {t(
                        "dashboard.marketing.AutomationModal.ThreeOfFourRulesActive"
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!setting.enabled}
                        onChange={() => onToggle && onToggle(setting.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                    <span className="text-xs md:text-sm text-gray-500 min-w-[60px]">
                      {setting.enabled
                        ? t("dashboard.marketing.AutomationModal.Enabled")
                        : t("dashboard.marketing.AutomationModal.Disabled")}
                    </span>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete && onDelete(setting.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Delete rule"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {automationSettings.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-6">
                No automation rules
              </div>
            )}
          </div>

          {/* Add new rule */}
          <button
            onClick={() => onAddRule && onAddRule()}
            className="w-full mt-4 py-3 text-gray-700 font-medium text-sm md:text-base flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            <FaPlus size={14} className="text-gray-600" />
            Add new automation rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationModal;
