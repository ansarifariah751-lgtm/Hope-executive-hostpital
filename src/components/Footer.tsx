import React from 'react';
import { Phone, MapPin, Clock, Mail, ShieldCheck, HeartPulse } from 'lucide-react';
import { HOSPITAL_INFO, HOSPITAL_SERVICES } from '../data/hospitalData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#10243A] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Hospital Brand & Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1769AA] flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 10.5h-5.5V5a1.5 1.5 0 0 0-3 0v5.5H5a1.5 1.5 0 0 0 0 3h5.5V19a1.5 1.5 0 0 0 3 0v-5.5H19a1.5 1.5 0 0 0 0-3z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">HOPE Executive Hospital</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              A private medical facility situated in C Block Amin Town, Faisalabad. Delivering personalized executive care, specialized Clinical Nutrition with Dietitian Ubaid ur Rehman, Professional Aesthetics, and continuous 24/7 emergency response.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2 text-[#26A69A]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold">Verified 4.4★ on Google Maps (21 Patient Reviews)</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Plus Code: {HOSPITAL_INFO.plusCode} · Kashmir Rd, Faisalabad
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Facility</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Clinical Services</a></li>
              <li><a href="#doctors" className="hover:text-white transition-colors">Medical Faculty</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors">Hospital Environment</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Patient Reviews</a></li>
              <li><a href="#appointments" className="hover:text-white transition-colors">Book Appointment</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact & Directions</a></li>
            </ul>
          </div>

          {/* Col 3: Key Departments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Specialized Clinics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {HOSPITAL_SERVICES.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Contacts & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Verified Information
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#26A69A] shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.street}, {HOSPITAL_INFO.city}, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#26A69A] shrink-0" />
                <span>Emergency: 24 Hours / 7 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#26A69A] shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.phone}`} className="hover:text-white font-semibold">
                  {HOSPITAL_INFO.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{HOSPITAL_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-white block mb-0.5">Urgent Admissions:</span>
                Triage and inpatient admission desk available 24/7 at Kashmir Rd.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} HOPE Executive Hospital. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Healthcare Service</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Patient Rights Charter</span>
          </div>
        </div>

        {/* Development & Verification Disclosure */}
        <div className="mt-6 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-400 max-w-2xl mx-auto">
          Demonstration prototype built for HOPE Executive Hospital. All medical claims, schedules, and clinical rosters are configured with verified Google Maps profile data and structured for integration with hospital management systems.
        </div>
      </div>
    </footer>
  );
};
