import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Menu, X, ChevronRight } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface HeaderProps {
  onOpenBooking: (department?: string, doctorId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top verified hospital utility strip */}
      <div className="bg-[#10243A] text-white/90 text-xs py-2 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#26A69A]" />
              <span>{HOSPITAL_INFO.street}, {HOSPITAL_INFO.city}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <Clock className="w-3.5 h-3.5 text-[#26A69A]" />
              <span>Emergency Services Open 24/7</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60">Verified Hospital Desk:</span>
            <a
              href={`tel:${HOSPITAL_INFO.phone}`}
              className="inline-flex items-center gap-1.5 font-semibold text-[#26A69A] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{HOSPITAL_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation complying with Top Bar Contract */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-slate-200/80'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-[#10243A] font-extrabold tracking-tight text-xl shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#1769AA] flex items-center justify-center text-white shadow-sm group-hover:bg-[#10243A] transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 10.5h-5.5V5a1.5 1.5 0 0 0-3 0v5.5H5a1.5 1.5 0 0 0 0 3h5.5V19a1.5 1.5 0 0 0 3 0v-5.5H19a1.5 1.5 0 0 0 0-3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="leading-tight text-lg text-[#10243A] font-bold">HOPE Executive</span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#1769AA] -mt-0.5">Hospital</span>
            </div>
          </a>

          {/* Zone 2: 4–6 clean single-line text navigation links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#1769AA] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1769AA] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${HOSPITAL_INFO.phone}`}
              className="hidden sm:inline-flex md:hidden items-center gap-1.5 text-xs font-semibold text-[#1769AA] bg-blue-50 px-3 py-2 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] rounded-lg transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              Book an Appointment
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-5 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 text-slate-800 font-medium text-base border-b border-slate-100 hover:text-[#1769AA]"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>
          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-[#1769AA] rounded-lg shadow-sm"
            >
              Book an Appointment
            </button>
            <a
              href={`tel:${HOSPITAL_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-semibold text-[#10243A] bg-[#F4F8FB] border border-slate-200 rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#26A69A]" />
              <span>Call 24/7 Helpline ({HOSPITAL_INFO.displayPhone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
