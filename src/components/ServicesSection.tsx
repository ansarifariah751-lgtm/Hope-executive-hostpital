import React, { useState } from 'react';
import {
  Apple,
  Sparkles,
  HeartPulse,
  Stethoscope,
  Baby,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { HOSPITAL_SERVICES } from '../data/hospitalData';
import { HospitalService } from '../types/hospital';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [selectedService, setSelectedService] = useState<HospitalService | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Salad':
        return <Apple className="w-5 h-5 text-[#26A69A]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#1769AA]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-[#1769AA]" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-amber-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-600" />;
      default:
        return <Stethoscope className="w-5 h-5 text-[#1769AA]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F4F8FB] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1769AA] uppercase tracking-wider">
            <span>Specialized Clinical Departments</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Amin Town, Faisalabad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Comprehensive Medical & Executive Care
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From our verified on-premise practices in Clinical Nutrition and Professional Aesthetics to our continuous 24/7 Emergency triage, our multidisciplinary team provides personalized medical attention.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOSPITAL_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group bg-white rounded-2xl p-7 border border-slate-200 hover:border-[#1769AA]/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Top Row: Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F4F8FB] border border-slate-200/80 flex items-center justify-center group-hover:bg-blue-50/80 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#1769AA] transition-colors">
                    {service.number}
                  </span>
                </div>

                <div className="text-xs font-medium text-[#1769AA] uppercase tracking-wider mb-1">
                  {service.department}
                </div>

                <h3 className="text-lg font-bold text-[#10243A] group-hover:text-[#1769AA] transition-colors leading-snug">
                  {service.name}
                </h3>

                {service.leadSpecialist && (
                  <div className="text-xs font-semibold text-slate-700 mt-1 mb-2.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#26A69A]" />
                    <span>{service.leadSpecialist}</span>
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Key highlights bullet preview */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  {service.keyFeatures.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-500">
                      <CheckCircle2 className="w-3 h-3 text-[#26A69A] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-6 pt-3 flex items-center justify-between text-xs font-semibold text-[#1769AA] group-hover:text-[#10243A] transition-colors">
                <span>View Full Details & Schedule</span>
                <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#1769AA] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(serviceName) => {
          setSelectedService(null);
          onSelectServiceForBooking(serviceName);
        }}
      />
    </section>
  );
};
