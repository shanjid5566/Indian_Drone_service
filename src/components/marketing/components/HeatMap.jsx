import { useTranslation } from 'react-i18next';
import MapChart from './MapChart';

const HeatMap = () => {
  const { t } = useTranslation();
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="font-semibold text-3xl text-gray-900 mb-7">{t('heatmap.title')}</h1>

          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-[16px] text-gray-700">{t('heatmap.high')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-[16px] text-gray-700">{t('heatmap.medium')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-[16px] text-gray-700">{t('heatmap.low')}</span>
            </div>
          </div>

          {/* India Map SVG */}
          <div className="w-full h-auto flex items-center justify-center">
            <MapChart/>
          </div>
        </div>
    );
};

export default HeatMap;