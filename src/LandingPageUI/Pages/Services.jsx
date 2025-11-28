// import Banner from "/assets/images/serviceBanner.jpg";
import { ArrowRight, Sprout, HardHat, Zap, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SmoothScroll from '../../components/utility/SmoothScroll';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Sprout,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      titleKey: 'services.agriculture.title',
      descriptionKey: 'services.agriculture.description',
      featuresKeys: [
        'services.agriculture.features.cropMonitoring',
        'services.agriculture.features.precisionSpraying',
        'services.agriculture.features.irrigationMapping',
        'services.agriculture.features.yieldPrediction',
      ],
    },
    {
      icon: HardHat,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      titleKey: 'services.construction.title',
      descriptionKey: 'services.construction.description',
      featuresKeys: [
        'services.construction.features.siteMapping',
        'services.construction.features.progressTracking',
        'services.construction.features.volumetricCalc',
        'services.construction.features.safetyAudits',
      ],
    },
    {
      icon: Zap,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      titleKey: 'services.energy.title',
      descriptionKey: 'services.energy.description',
      featuresKeys: [
        'services.energy.features.thermalImaging',
        'services.energy.features.assetInspection',
        'services.energy.features.vegetationMgmt',
        'services.energy.features.faultDetection',
      ],
    },
    {
      icon: Shield,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      titleKey: 'services.publicSafety.title',
      descriptionKey: 'services.publicSafety.description',
      featuresKeys: [
        'services.publicSafety.features.emergency',
        'services.publicSafety.features.disaster',
        'services.publicSafety.features.surveillance',
        'services.publicSafety.features.trafficMonitoring',
      ],
    },
  ];

  return (
    <SmoothScroll>
      <div>
        {/* Banner */}
        <div
          id='services'
          className='relative h-[372px] flex items-center justify-center bg-center bg-cover px-4 sm:px-6 md:px-8'
          style={{
            backgroundImage: `url(${'/assets/images/serviceBanner.jpg'})`,
          }}
        >
          <div className='absolute bg-gradient-to-r from-[#06422c]/70 via-[#013522cd]/60 to-[#035a3ab8]/35 inset-0'></div>
          <div className='z-10 w-full lg:w-10/12 xl:max-w-7xl mx-auto '>
            <div className='text-white max-w-2xl'>
              <h1 className='leading-relaxed text-left text-3xl sm:text-4xl md:text-5xl font-bold mt-4 sm:mt-0'>
                {t('services.header')}
              </h1>
              <p className='text-white text-base sm:text-lg md:text-xl py-3'>
                {t('services.subheader')}
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className='bg-white lg:pt-30 pt-9 py-4 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10'>
          <div className='xl:max-w-7xl  lg:w-10/12 w-full mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6'>
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className='bg-sky-50 rounded-2xl lg:p-8 p-5 shadow-sm hover:shadow-md transition-shadow'
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <Icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className='text-lg md:text-2xl font-bold text-gray-900 mb-2'>
                      {t(service.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className='md:text-xl text-gray-600 mb-4'>
                      {t(service.descriptionKey)}
                    </p>

                    {/* Features List */}
                    <ul className='space-y-2 mb-6 text-xs md:text-lg'>
                      {service.featuresKeys.map((featureKey, idx) => (
                        <li
                          key={idx}
                          className='flex items-center gap-2 text-[16px] text-gray-700'
                        >
                          <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
                          {t(featureKey)}
                        </li>
                      ))}
                    </ul>

                    {/* Buttons */}
                    <div className='flex items-center justify-between gap-4'>
                      <button className='bg-green-500 hover:bg-green-600 text-white px-3 sm:px-6 py-2.5 btn border-none text-xs btn-sm sm:btn-md md:rounded-sm font-medium sm:text-sm transition-colors'>
                        {t('services.bookService')}
                      </button>
                      <button className='flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-xs lg:text-sm transition-colors'>
                        {t('services.learnMore')}
                        <ArrowRight className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Services;
