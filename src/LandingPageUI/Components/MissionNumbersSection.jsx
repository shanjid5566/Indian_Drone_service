import { Shield, Lightbulb, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MissionValues() {
  const { t } = useTranslation();

  const coreValues = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      titleKey: "mission.safetyFirst.title",
      descriptionKey: "mission.safetyFirst.description",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-green-600" />,
      titleKey: "mission.innovation.title",
      descriptionKey: "mission.innovation.description",
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      titleKey: "mission.customerFocus.title",
      descriptionKey: "mission.customerFocus.description",
    }
  ];

  return (
    <div className="bg-gray-50 py-5 lg:py-16 px-4">
      <div className="lg:w-10/12 xl:max-w-7xl mx-auto">
        {/* Mission Section */}
        <div className="bg-yellow-50 rounded-lg px-8 py-5 lg:py-12 mb-5 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6">
            {t("mission.header")}
          </h2>
          <p className="text-center text-gray-700 text-xs sm:text-lg leading-relaxed max-w-4xl mx-auto">
            {t("mission.description")}
          </p>
        </div>

        {/* Core Values Section */}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-3 lg:mb-12">
            {t("mission.coreValuesHeader")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center lg:w-16 lg:h-16 bg-green-50 rounded-full mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t(value.titleKey)}
                </h3>
                <p className="text-gray-600 md:text-sm lg:text-xl text-xs leading-relaxed">
                  {t(value.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
