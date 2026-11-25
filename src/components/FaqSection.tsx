import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { HOSPITAL_FAQS, HOSPITAL_INFO } from '../data/hospitalData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1769AA] uppercase tracking-wider">
            <span>Patient Guidance & Inquiries</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>HOPE Executive Hospital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Clear, transparent answers about our emergency intake, clinical nutrition desk, aesthetic clinic, and hospital procedures.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {HOSPITAL_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-[#F4F8FB]/40 hover:bg-[#F4F8FB]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#10243A] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1769AA] border-[#1769AA]/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1769AA] text-white flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#10243A]">Have a specific medical inquiry?</div>
              <div className="text-xs text-slate-600">Our hospital reception desk is available around the clock.</div>
            </div>
          </div>
          <a
            href={`tel:${HOSPITAL_INFO.phone}`}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call +92 313 7115700</span>
          </a>
        </div>
      </div>
    </section>
  );
};
