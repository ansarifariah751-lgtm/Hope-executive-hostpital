import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { DoctorsSection } from './components/DoctorsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AppointmentBooking } from './components/AppointmentBooking';
import { TrustAndReviews } from './components/TrustAndReviews';
import { FaqSection } from './components/FaqSection';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { Doctor } from './types/hospital';

export default function App() {
  const [bookingDepartment, setBookingDepartment] = useState<string | undefined>(undefined);
  const [bookingDoctorId, setBookingDoctorId] = useState<string | undefined>(undefined);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (department?: string, doctorId?: string) => {
    if (department) setBookingDepartment(department);
    if (doctorId) setBookingDoctorId(doctorId);
    scrollToSection('appointments');
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    setBookingDepartment(serviceName);
    scrollToSection('appointments');
  };

  const handleSelectDoctorForBooking = (doctor: Doctor) => {
    setBookingDoctorId(doctor.id);
    setBookingDepartment(doctor.department);
    scrollToSection('appointments');
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB] text-[#10243A] flex flex-col font-sans selection:bg-[#1769AA]/15 selection:text-[#10243A]">
      {/* Top Header Navigation */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => scrollToSection('appointments')}
          onExploreServices={() => scrollToSection('services')}
        />

        {/* 2. Clinical Services & Specialized Clinics */}
        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 3. Doctors & Medical Specialists */}
        <DoctorsSection onSelectDoctorForBooking={handleSelectDoctorForBooking} />

        {/* 4. Facilities & Hospital Environment */}
        <FacilitiesSection />

        {/* 5. Appointment Request Interface */}
        <AppointmentBooking
          initialDepartment={bookingDepartment}
          initialDoctorId={bookingDoctorId}
        />

        {/* 6. Patient Trust & Verified Reviews */}
        <TrustAndReviews />

        {/* 7. Frequently Asked Questions */}
        <FaqSection />

        {/* 8. Verified Contact & Location */}
        <ContactLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Patient Assistant */}
      <AiAssistant />
    </div>
  );
}
