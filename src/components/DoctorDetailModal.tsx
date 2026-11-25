import React from 'react';
import { X, Star, Calendar, CheckCircle, Clock, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { Doctor } from '../types/hospital';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookWithDoctor: (doctor: Doctor) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  onClose,
  onBookWithDoctor,
}) => {
  if (!doctor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#1769AA] uppercase tracking-wider">{doctor.department}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Identity Header */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-[#10243A] text-white flex items-center justify-center font-bold text-2xl shrink-0">
                {doctor.name.charAt(0)}
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {doctor.isVerifiedPractice ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified On-Premise Practice
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    Illustrative Demo Faculty (Pending Approval)
                  </span>
                )}
              </div>

              <h3 id="doctor-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#10243A]">
                {doctor.name}
              </h3>
              <p className="text-sm font-semibold text-[#1769AA]">{doctor.title}</p>
              <p className="text-xs text-slate-500">{doctor.qualification}</p>

              {doctor.rating && (
                <div className="flex items-center gap-1 text-xs text-slate-700 pt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{doctor.rating}</span>
                  {doctor.reviewsCount && (
                    <span className="text-slate-500">({doctor.reviewsCount} Google Reviews)</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Biography */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Clinical Background & Philosophy
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          {/* Clinical Focus Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Areas of Clinical Specialization
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctor.focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-[#26A69A] shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule card */}
          <div className="p-4 rounded-xl bg-[#F4F8FB] border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-800">
              <Clock className="w-4 h-4 text-[#1769AA]" />
              <span className="font-semibold">Consultation Hours:</span>
              <span>{doctor.schedule}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Calendar className="w-4 h-4 text-[#26A69A]" />
              <span>Prior appointment booking strongly recommended to minimize wait times.</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBookWithDoctor(doctor);
              }}
              className="w-full sm:flex-1 py-3 px-5 text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Book Consultation with {doctor.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${HOSPITAL_INFO.phone}`}
              className="w-full sm:w-auto py-3 px-4 text-sm font-semibold text-[#10243A] bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#26A69A]" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
