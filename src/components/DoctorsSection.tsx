import React, { useState } from 'react';
import { Star, Clock, Calendar, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { HOSPITAL_DOCTORS } from '../data/hospitalData';
import { Doctor } from '../types/hospital';
import { DoctorDetailModal } from './DoctorDetailModal';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctor: Doctor) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onSelectDoctorForBooking,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [activeDoctorModal, setActiveDoctorModal] = useState<Doctor | null>(null);

  const departments = [
    { id: 'all', label: 'All Specialists' },
    { id: 'nutrition', label: 'Clinical Nutrition' },
    { id: 'aesthetics', label: 'Aesthetics & Dermatology' },
    { id: 'internal', label: 'Executive Medicine' },
    { id: 'pediatrics', label: 'Pediatrics' },
  ];

  const filteredDoctors = HOSPITAL_DOCTORS.filter((doc) => {
    if (selectedDepartment === 'all') return true;
    if (selectedDepartment === 'nutrition') return doc.department.includes('Nutrition');
    if (selectedDepartment === 'aesthetics') return doc.department.includes('Aesthetics');
    if (selectedDepartment === 'internal') return doc.department.includes('Internal') || doc.department.includes('Executive');
    if (selectedDepartment === 'pediatrics') return doc.department.includes('Pediatrics');
    return true;
  });

  return (
    <section id="doctors" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1769AA] uppercase tracking-wider">
              <span>Medical Faculty & Practitioners</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Kashmir Rd, Faisalabad</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Consult With Our Specialists
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              HOPE Executive Hospital hosts verified clinical practices including Clinical Nutrition by Dietitian Ubaid ur Rehman and our dedicated Professional Aesthetics & Skin Care clinic, alongside our executive medical staff.
            </p>
          </div>

          {/* Interactive filter tabs / segmented controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 self-start md:self-auto">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedDepartment === dept.id
                    ? 'bg-white text-[#10243A] shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-[#10243A]'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-[#F4F8FB] rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#1769AA]/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Doctor Image / Portrait Slot */}
                <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                  {doctor.imageUrl ? (
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#10243A] text-white">
                      <UserCheck className="w-12 h-12 opacity-40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Rating / Verified Tag on top of image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {doctor.isVerifiedPractice ? (
                      <span className="text-[10px] font-bold text-white bg-emerald-600/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Practice
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-800 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
                        Demo Faculty Roster
                      </span>
                    )}

                    {doctor.rating && (
                      <span className="text-[11px] font-bold text-white bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {doctor.rating}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white">
                    <span className="text-[11px] font-medium text-[#26A69A] block uppercase tracking-wider">
                      {doctor.specialty}
                    </span>
                  </div>
                </div>

                {/* Doctor Content */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-bold text-[#10243A] group-hover:text-[#1769AA] transition-colors leading-tight">
                    {doctor.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#1769AA]">
                    {doctor.title}
                  </p>

                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {doctor.qualification}
                  </p>

                  <div className="pt-2 border-t border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-[#1769AA] shrink-0" />
                      <span className="truncate">{doctor.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveDoctorModal(doctor)}
                  className="py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onSelectDoctorForBooking(doctor)}
                  className="py-2 px-3 text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DoctorDetailModal
        doctor={activeDoctorModal}
        onClose={() => setActiveDoctorModal(null)}
        onBookWithDoctor={(doc) => {
          setActiveDoctorModal(null);
          onSelectDoctorForBooking(doc);
        }}
      />
    </section>
  );
};
