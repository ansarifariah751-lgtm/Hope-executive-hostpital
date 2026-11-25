import React, { useState } from 'react';
import { ShieldCheck, Sparkles, HeartPulse, Building2, Eye } from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'clinical' | 'aesthetics' | 'nutrition'>('all');

  const facilityHighlights = [
    {
      id: 'f-1',
      title: 'Executive Reception & Patient Lounge',
      category: 'clinical',
      description: 'Spacious, luminous entrance and private reception desks designed for unhurried patient intake, organized admissions, and tranquil waiting.',
      image: '/src/assets/images/hope_hospital_facility_1793187539022.jpg',
      badge: 'Main Facility',
      tag: 'Neat & Clean Environment',
    },
    {
      id: 'f-2',
      title: 'Professional Aesthetics & Laser Suite',
      category: 'aesthetics',
      description: 'Dedicated treatment room equipped with medical-grade aesthetic lasers, diagnostic dermatoscopes, and clinical skincare stations. Open until 10:00 PM.',
      image: '/src/assets/images/aesthetics_skin_care_1793187539417.jpg',
      badge: 'Specialized Suite',
      tag: '5.0★ Rating on Premise',
    },
    {
      id: 'f-3',
      title: 'Clinical Nutrition & Counseling Room',
      category: 'nutrition',
      description: 'Private metabolic evaluation office for Dietitian Ubaid ur Rehman. Features bio-impedance composition tools, therapeutic meal planning desks, and lifestyle consultation.',
      image: '/src/assets/images/nutrition_dietetics_desk_1793187539355.jpg',
      badge: 'Specialized Suite',
      tag: '4.8★ Practice',
    },
  ];

  const filtered = facilityHighlights.filter((f) => {
    if (activeTab === 'all') return true;
    return f.category === activeTab;
  });

  return (
    <section id="facilities" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1769AA] uppercase tracking-wider">
              <span>Hospital Environment & Infrastructure</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>C Block Amin Town</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              A Neat, Dignified Clinical Environment
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Patients consistently highlight our clean, hygienic spaces and swift medical attention. We maintain strict sanitization standards across all emergency bays, consultation rooms, and specialized clinics.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-[#10243A] shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-[#10243A]'
              }`}
            >
              All Suites
            </button>
            <button
              onClick={() => setActiveTab('clinical')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'clinical'
                  ? 'bg-white text-[#10243A] shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-[#10243A]'
              }`}
            >
              Reception & Lounge
            </button>
            <button
              onClick={() => setActiveTab('aesthetics')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'aesthetics'
                  ? 'bg-white text-[#10243A] shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-[#10243A]'
              }`}
            >
              Aesthetics Clinic
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'nutrition'
                  ? 'bg-white text-[#10243A] shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-[#10243A]'
              }`}
            >
              Nutrition Desk
            </button>
          </div>
        </div>

        {/* Facility Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-[#F4F8FB] rounded-2xl border border-slate-200 overflow-hidden hover:border-[#1769AA]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{item.tag}</span>
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-slate-900/80 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-[#10243A] group-hover:text-[#1769AA] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-[#1769AA]">
                  <span>High Hygiene Standards</span>
                  <Building2 className="w-4 h-4 text-slate-400 group-hover:text-[#1769AA] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
