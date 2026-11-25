import React from 'react';
import { X, CheckCircle2, Clock, Phone, ArrowRight, Shield } from 'lucide-react';
import { HospitalService } from '../types/hospital';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface ServiceDetailModalProps {
  service: HospitalService | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1769AA]">{service.number}</span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{service.department}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Hero / Image if present */}
        {service.featuredImage && (
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
            <img
              src={service.featuredImage}
              alt={service.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <h3 id="service-modal-title" className="text-xl sm:text-2xl font-bold">
                {service.name}
              </h3>
              {service.leadSpecialist && (
                <p className="text-xs text-white/90 font-medium mt-0.5">
                  Led by: {service.leadSpecialist}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          {!service.featuredImage && (
            <div>
              <h3 id="service-modal-title" className="text-2xl font-bold text-[#10243A]">
                {service.name}
              </h3>
              {service.leadSpecialist && (
                <p className="text-xs text-[#1769AA] font-semibold mt-1">
                  Led by: {service.leadSpecialist}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Clinical Scope & Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Key Clinical Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Department Capabilities & Amenities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#26A69A] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Treatments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Common Conditions & Therapeutic Programs
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.commonTreatments.map((treatment, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-slate-700 bg-slate-100 rounded-md px-3 py-1.5 border border-slate-200/60"
                >
                  {treatment}
                </span>
              ))}
            </div>
          </div>

          {/* Consultation Schedule & Verified note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Clock className="w-4 h-4 text-[#1769AA]" />
              <span className="font-semibold">Clinic Availability:</span>
              <span>{service.hours}</span>
            </div>
            {service.isVerifiedOnPremise && (
              <div className="flex items-center gap-2 text-xs text-emerald-700">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Verified On-Premise Practice at Kashmir Rd, Amin Town</span>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBookService(service.name);
              }}
              className="w-full sm:flex-1 py-3 px-5 text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Book Appointment for This Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${HOSPITAL_INFO.phone}`}
              className="w-full sm:w-auto py-3 px-4 text-sm font-semibold text-[#10243A] bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#26A69A]" />
              <span>Direct Call</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
