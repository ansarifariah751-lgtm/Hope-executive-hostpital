import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Clock, Star, MapPin } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F4F8FB] via-white to-[#F4F8FB]">
      {/* Subtle geometric ambient line graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1769AA]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#26A69A]/5 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hospital Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Zero-pill clean unboxed metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1769AA] tracking-wide">
              <span>Private Medical Facility</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>C Block Amin Town, Faisalabad</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-[#26A69A]">Open 24/7</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#10243A] leading-[1.12] tracking-tight text-balance">
              Executive Medical Excellence, Compassionate Patient Care.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              HOPE Executive Hospital delivers personalized private healthcare in Faisalabad. From 24/7 emergency response to specialized Clinical Nutrition with Dietitian Ubaid ur Rehman and our advanced Aesthetics Clinic, experience medicine centered around your dignity.
            </p>

            {/* CTAs and Direct Emergency Helpline */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 text-sm font-semibold text-[#10243A] bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-sm hover:border-slate-300 flex items-center justify-center"
              >
                Explore Our Services
              </button>
            </div>

            {/* Verified Emergency Contact Card */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">24/7 Emergency & Triage</div>
                  <a
                    href={`tel:${HOSPITAL_INFO.phone}`}
                    className="text-sm font-bold text-[#10243A] hover:text-[#1769AA] transition-colors"
                  >
                    {HOSPITAL_INFO.displayPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Google Rating</div>
                  <div className="text-sm font-bold text-[#10243A]">
                    {HOSPITAL_INFO.googleRating} / 5.0 <span className="text-xs font-normal text-slate-500">({HOSPITAL_INFO.googleReviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Healthcare Clinical Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-100 aspect-[4/3] lg:aspect-[5/4] group">
              <img
                src="/src/assets/images/hope_hospital_hero_1793187537033.jpg"
                alt="Senior physician conducting an executive medical consultation at HOPE Executive Hospital"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10243A]/80 via-transparent to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#26A69A]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Private Clinical Consultation Suites</span>
                </div>
                <p className="text-xs text-white/90 mt-1">
                  Unhurried, attentive medical assessments in a clean, hygienic private environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Core Facts Row below Hero Split */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1769AA] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#10243A]">Open 24 Hours</h2>
              <p className="text-xs text-slate-600 mt-0.5">Continuous emergency triage, admissions, and nursing care.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#26A69A] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#10243A]">Clinical Nutrition Desk</h2>
              <p className="text-xs text-slate-600 mt-0.5">Dietitian Ubaid ur Rehman (4.8★ rating, on-premise consultations).</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-[#1769AA] shrink-0">
              <Star className="w-5 h-5 text-[#1769AA]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#10243A]">Aesthetics & Skin Clinic</h2>
              <p className="text-xs text-slate-600 mt-0.5">Medical-grade dermatology & skin rejuvenation open till 10 PM.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#10243A]">Kashmir Rd, Amin Town</h2>
              <p className="text-xs text-slate-600 mt-0.5">Central Faisalabad accessibility with patient parking.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
