import { GoPeople } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { BsShieldCheck } from "react-icons/bs";
import { TbSchool } from 'react-icons/tb';
import { FaArrowTrendUp } from "react-icons/fa6";


// StatsCards.jsx
// Responsive 4-card stats section using Tailwind CSS v4
// Drop this file into your React project (e.g. src/components/StatsCards.jsx)
// Usage: <StatsCards />

const cards = [
  {
    id: 1,
    icon: (
      <GoPeople size={36} />
    ),
    value: "1000+",
    titleKey: "landingstats.satisfiedClients",
  },
  {
    id: 2,
    icon: (
      <BsShieldCheck size={36}/>
    ),
    value: "1000+",
    titleKey: "landingstats.projectsCompleted",
  },
  {
    id: 3,
    icon: (
      <TbSchool size={36} />
    ),
    value: "15+",
    titleKey: "landingstats.industryCertifications",
  },
  {
    id: 4,
    icon: (
      <FaArrowTrendUp size={36} />
    ),
    value: "99%",
    titleKey: "landingstats.clientSatisfaction",
  },
];

export default function Statistics() {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-50 section-padding">
      <div className=" section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        
        
        lg:gap-6  gap-2">
          {cards.map((c) => (
            <div
              key={c.id}
              className=" rounded-xl p-6  flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <div className="inline-flex font-normal items-center justify-center xl:w-20  xl:h-20 w-14 h-14 rounded-lg bg-[#E6EBF1] text-[#353F38]">
                  {c.icon}
                </div>
              </div>

              <div className="lg:text-2xl xl:text-3xl text-xl font-bold text-[#00264D]">{c.value}</div>
              <div className="mt-3 line-clamp-1 text-sm text-slate-600">{t(c.titleKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
