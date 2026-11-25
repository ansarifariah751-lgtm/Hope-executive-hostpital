import React from 'react';
import { Star, ShieldCheck, MapPin, ExternalLink, Quote, CheckCircle2 } from 'lucide-react';
import { PATIENT_REVIEWS, HOSPITAL_INFO } from '../data/hospitalData';

export const TrustAndReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#F4F8FB] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1769AA] uppercase tracking-wider">
              <span>Patient Experience & Verified Feedback</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Google Maps Verified</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Grounded in Patient Trust & Cleanliness
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We uphold strict ethical standards. All patient reviews displayed below are documented, verified Google Maps submissions from patients and visitors to HOPE Executive Hospital in Faisalabad.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 shrink-0">
            <div className="text-center pr-5 border-r border-slate-200">
              <div className="text-3xl font-extrabold text-[#10243A]">{HOSPITAL_INFO.googleRating}</div>
              <div className="flex items-center gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(HOSPITAL_INFO.googleRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">21 Google Reviews</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#10243A]">Verified Hospital Profile</div>
              <div className="text-xs text-slate-600">Amin Town, Kashmir Rd</div>
              <a
                href={HOSPITAL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#1769AA] hover:underline pt-0.5"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Real Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATIENT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{review.date}</span>
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-1 -left-2 -z-0 opacity-80" />
                  <p className="text-sm text-slate-700 relative z-10 font-medium italic leading-relaxed pt-1">
                    "{review.text}"
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#10243A]">{review.author}</div>
                  {review.badge && (
                    <div className="text-[11px] text-slate-500">{review.badge}</div>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Pillars Strip */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#10243A]">Zero Fabricated Claims</h4>
              <p className="text-xs text-slate-600 mt-1">
                We present only authenticated ratings, verified on-premise practices, and real facility details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#26A69A] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#10243A]">Patient-Centered Care</h4>
              <p className="text-xs text-slate-600 mt-1">
                Private consultation suites designed for attentive physician listening without rush or overcrowding.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#1769AA] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#10243A]">Accessible Community Care</h4>
              <p className="text-xs text-slate-600 mt-1">
                Located on Kashmir Road in Amin Town, Faisalabad with 24-hour admission availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
