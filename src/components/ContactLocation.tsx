import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  Navigation,
  ShieldAlert,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const ContactLocation: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim() || !inquiryMessage.trim()) {
      setError('Please provide your name, phone number, and inquiry message.');
      return;
    }

    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F4F8FB] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1769AA] uppercase tracking-wider">
            <span>Hospital Contact & Navigation</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Amin Town, Faisalabad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Reach HOPE Executive Hospital
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Conveniently situated on Kashmir Road, C Block Amin Town, Faisalabad. Our triage and reception teams are available 24/7 for patient inquiries and admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Verified Location & Operating Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-6">
              {/* Emergency Banner */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                    24/7 Emergency & Acute Helpline
                  </h3>
                  <a
                    href={`tel:${HOSPITAL_INFO.phone}`}
                    className="text-base font-extrabold text-rose-700 hover:text-rose-900 block mt-0.5"
                  >
                    {HOSPITAL_INFO.displayPhone}
                  </a>
                  <p className="text-[11px] text-rose-600 mt-1">
                    Direct line to our on-duty emergency medical officers.
                  </p>
                </div>
              </div>

              {/* Verified Contact Details List */}
              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#1769AA] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Hospital Location & Plus Code
                    </span>
                    <span className="text-sm font-semibold text-[#10243A] leading-snug block">
                      {HOSPITAL_INFO.street}, {HOSPITAL_INFO.city}, Pakistan
                    </span>
                    <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                      Plus Code: {HOSPITAL_INFO.plusCode}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#26A69A] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Operating Hours
                    </span>
                    <span className="text-sm font-semibold text-[#10243A] block">
                      Open 24 Hours Daily
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Aesthetics Clinic: Daily till 10:00 PM
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#1769AA] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Telephone & WhatsApp Inquiries
                    </span>
                    <a
                      href={`tel:${HOSPITAL_INFO.phone}`}
                      className="text-sm font-bold text-[#1769AA] hover:underline"
                    >
                      {HOSPITAL_INFO.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Administrative Email
                    </span>
                    <span className="text-sm text-slate-700">
                      {HOSPITAL_INFO.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-2">
                <a
                  href={HOSPITAL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview & Direct Message Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Map Frame Card */}
            <div className="bg-white rounded-3xl p-2 sm:p-3 border border-slate-200 shadow-sm overflow-hidden">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <iframe
                  title="HOPE Executive Hospital Map Location"
                  src="https://maps.google.com/maps?q=31.428,73.109&hl=en&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>Kashmir Rd, C Block Amin Town, Faisalabad</span>
                </div>
              </div>
            </div>

            {/* Direct Message Inquiry Box */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-[#10243A]">Send an Online Inquiry</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Have questions about specialist consultation fees, diagnostic timings, or health packages?
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Inquiry Received</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you. Your message has been logged for our patient liaison team. For urgent clinical assistance, call our 24/7 line directly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryMessage('');
                    }}
                    className="mt-2 text-xs font-semibold text-emerald-800 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Hammadul Hassan"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +92 313 7115700"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Inquiry Message *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please let us know your question or service of interest..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-rose-600 font-medium">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-5 text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] disabled:opacity-50 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Hospital Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
