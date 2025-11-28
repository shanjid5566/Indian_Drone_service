import React from 'react';
import { useTranslation } from 'react-i18next';
// import cardimage from "./assets/images/aboutcard.png"
// import cardimage1 from "./assets/images/aboutcard1.png"
// import cardimage2 from "./assets/images/aboutcard2.jpg"
// import cardimage3 from "/assets/images/aboutcard3.jpg"

export default function CompleteSections() {
  const { t } = useTranslation();

  const team = [
    {
      nameKey: 'team.arun.name',
      roleKey: 'team.arun.role',
      descriptionKey: 'team.arun.description',
      image: "/assets/images/aboutcard3.jpg"
    },
    {
      nameKey: 'team.priya.name',
      roleKey: 'team.priya.role',
      descriptionKey: 'team.priya.description',
      image: "./assets/images/aboutcard1.png"
    },
    {
      nameKey: 'team.meena.name',
      roleKey: 'team.meena.role',
      descriptionKey: 'team.meena.description',
      image: "./assets/images/aboutcard2.jpg"
    },
    {
      nameKey: 'team.rajeev.name',
      roleKey: 'team.rajeev.role',
      descriptionKey: 'team.rajeev.description',
      image: "./assets/images/aboutcard.png"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Meet Our Team Section */}
      <div className="lg:py-16 py-5 px-4 lg:px-8 bg-gray-50">
        <div className="w-full lg:w-10/12 xl:max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-center text-gray-900 mb-3">
            {t('team.header')}
          </h2>
          <p className="text-center text-gray-600 mb-5 lg:mb-12 text-xs lg:text-[16px] max-w-3xl mx-auto">
            {t('team.subheader')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={t(member.nameKey)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg lg:text-2xl font-bold text-gray-950 mb-1">
                    {t(member.nameKey)}
                  </h3>
                  <p className="text-xs font-medium text-sky-600 mb-2">
                    {t(member.roleKey)}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {t(member.descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
