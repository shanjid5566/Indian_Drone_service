import CForm from '../Components/Form/CForm';
import SmoothScroll from '../../components/utility/SmoothScroll';
// import banner from "/assets/images/aboutBanner.jpg";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <SmoothScroll>
      <div>
        {/* Banner */}
        <div
          style={{
            backgroundImage: `url(${'/assets/images/aboutBanner.jpg'})`,
          }}
          className='relative h-[270px] bg-cover bg-center flex items-center justify-center'
        >
          <div className='absolute bg-gradient-to-l from-[#00C805] to-[#006202] inset-0'></div>
          <div className='lg:hidden absolute bg-gray-600/50 inset-0'></div>
          <div className='z-10 w-11/12 lg:w-10/12 xl:max-w-7xl mx-auto'>
            <div className='text-white max-w-2xl'>
              <h1 className='leading-relaxed text-left text-3xl sm:text-4xl md:text-5xl font-bold mt-4 sm:mt-0'>
                {t('contact.header')}
              </h1>
              <p className='text-white text-base sm:text-lg md:text-xl py-3'>
                {t('contact.subheader')}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <CForm />
      </div>
    </SmoothScroll>
  );
};

export default Contact;
