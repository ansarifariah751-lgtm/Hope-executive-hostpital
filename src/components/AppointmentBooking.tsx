import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileCheck,
  Building,
  RotateCcw,
} from 'lucide-react';
import { HOSPITAL_SERVICES, HOSPITAL_DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { Doctor } from '../types/hospital';

interface AppointmentBookingProps {
  initialDepartment?: string;
  initialDoctorId?: string;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  initialDepartment,
  initialDoctorId,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    initialDepartment || HOSPITAL_SERVICES[0].name
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctorId || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [urgency, setUrgency] = useState<'routine' | 'priority'>('routine');
  const [notes, setNotes] = useState<string>('');

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    referenceCode: string;
    department: string;
    doctorName: string;
    date: string;
    timeSlot: string;
    patientName: string;
  } | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync props if changed externally
  useEffect(() => {
    if (initialDepartment) {
      setSelectedDepartment(initialDepartment);
    }
  }, [initialDepartment]);

  useEffect(() => {
    if (initialDoctorId) {
      setSelectedDoctorId(initialDoctorId);
      const doc = HOSPITAL_DOCTORS.find((d) => d.id === initialDoctorId);
      if (doc) {
        setSelectedDepartment(doc.specialty);
      }
    }
  }, [initialDoctorId]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    setSelectedSlot('10:30 AM (Morning Clinic)');
  }, []);

  const timeSlots = [
    '09:30 AM (Morning Clinic)',
    '10:30 AM (Morning Clinic)',
    '11:45 AM (Midday Clinic)',
    '02:30 PM (Afternoon Clinic)',
    '04:00 PM (Afternoon Clinic)',
    '06:30 PM (Evening Executive Clinic)',
    '08:00 PM (Night Aesthetic / Consult)',
  ];

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!selectedDepartment) newErrors.department = 'Please select a hospital department.';
    } else if (currentStep === 3) {
      if (!selectedDate) newErrors.date = 'Please pick a consultation date.';
      if (!selectedSlot) newErrors.slot = 'Please select a preferred consultation time.';
    } else if (currentStep === 4) {
      if (!patientName.trim()) newErrors.patientName = 'Patient full name is required.';
      if (!patientPhone.trim() || patientPhone.trim().length < 8) {
        newErrors.patientPhone = 'Please provide a valid contact phone number.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const docObj = HOSPITAL_DOCTORS.find((d) => d.id === selectedDoctorId);
    const doctorDisplayName = docObj ? docObj.name : 'First Available Executive Consultant';

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          department: selectedDepartment,
          doctor: doctorDisplayName,
          date: selectedDate,
          timeSlot: selectedSlot,
          patientName,
          patientPhone,
          patientEmail,
          urgency,
          notes,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setConfirmedBooking({
          referenceCode: data.referenceCode,
          department: selectedDepartment,
          doctorName: doctorDisplayName,
          date: selectedDate,
          timeSlot: selectedSlot,
          patientName,
        });
      } else {
        setSubmitError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      // Offline / fallback mock confirmation
      const fallbackRef = `HEH-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedBooking({
        referenceCode: fallbackRef,
        department: selectedDepartment,
        doctorName: doctorDisplayName,
        date: selectedDate,
        timeSlot: selectedSlot,
        patientName,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setCurrentStep(1);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setNotes('');
  };

  return (
    <section id="appointments" className="py-20 lg:py-28 bg-[#F4F8FB] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1769AA] uppercase tracking-wider">
            <span>Online Inquiries</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Interactive Demonstration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Appointment Request Interface
          </h2>
          <p className="text-sm text-slate-600">
            Request a private consultation with our specialists in Clinical Nutrition, Aesthetics, or Executive General Medicine.
          </p>
        </div>

        {/* Multi-Step Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Transparent Demonstration Disclaimer Banner */}
          <div className="bg-blue-50/90 border-b border-blue-100 px-6 py-2.5 flex items-center justify-between text-xs text-[#1769AA]">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-[10px] bg-white border border-blue-200 px-2 py-0.5 rounded">
                Interactive Demo
              </span>
              <span>Availability slots and submission are simulated for HOPE Executive Hospital.</span>
            </div>
            <span className="hidden sm:inline text-slate-500">24/7 Desk: {HOSPITAL_INFO.displayPhone}</span>
          </div>

          {/* Stepper Indicator */}
          {!confirmedBooking && (
            <div className="px-6 sm:px-10 pt-8 pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
                {[
                  { step: 1, title: 'Department' },
                  { step: 2, title: 'Specialist' },
                  { step: 3, title: 'Date & Time' },
                  { step: 4, title: 'Patient Info' },
                  { step: 5, title: 'Review' },
                ].map((s) => (
                  <div key={s.step} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        currentStep === s.step
                          ? 'bg-[#1769AA] text-white ring-4 ring-blue-100'
                          : currentStep > s.step
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-500'
                      }`}
                    >
                      {currentStep > s.step ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                    </div>
                    <span className="text-[11px] font-medium text-slate-600 mt-1.5 hidden sm:block">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Content Area */}
          <div className="p-6 sm:p-10">
            {confirmedBooking ? (
              /* Step 6: Confirmation Screen */
              <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <FileCheck className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                    Reference ID: {confirmedBooking.referenceCode}
                  </div>
                  <h3 className="text-2xl font-bold text-[#10243A]">
                    Appointment Request Logged
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-slate-800">{confirmedBooking.patientName}</span>. Your request has been recorded in the demonstration portal.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-[#F4F8FB] border border-slate-200 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3">
                  <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Department</span>
                    <span className="font-semibold text-[#10243A] text-right">{confirmedBooking.department}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Specialist</span>
                    <span className="font-semibold text-[#1769AA] text-right">{confirmedBooking.doctorName}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Scheduled Date</span>
                    <span className="font-semibold text-[#10243A]">{confirmedBooking.date}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Selected Slot</span>
                    <span className="font-semibold text-[#10243A]">{confirmedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-slate-500">Hospital Location</span>
                    <span className="font-semibold text-slate-700 text-right">Kashmir Rd, C Block Amin Town</span>
                  </div>
                </div>

                {/* Production Notice */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Next Production Step:</span> In live hospital deployment, this webhook will dispatch directly to HOPE Executive Hospital's central HMS/EHR desk and send an SMS confirmation to the patient's phone.
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Create Another Request</span>
                  </button>
                  <a
                    href={`tel:${HOSPITAL_INFO.phone}`}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Desk to Confirm ({HOSPITAL_INFO.displayPhone})</span>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {/* STEP 1: Select Department */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#10243A]">Select Clinical Department</h3>
                      <p className="text-xs text-slate-500">Choose the medical discipline for your consultation.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {HOSPITAL_SERVICES.map((serv) => (
                        <div
                          key={serv.id}
                          onClick={() => setSelectedDepartment(serv.name)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedDepartment === serv.name
                              ? 'border-[#1769AA] bg-blue-50/50 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-[#1769AA]">{serv.number}</span>
                            {selectedDepartment === serv.name && (
                              <CheckCircle2 className="w-4 h-4 text-[#1769AA]" />
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-[#10243A] mt-2">{serv.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{serv.shortDescription}</p>
                        </div>
                      ))}
                    </div>
                    {errors.department && (
                      <p className="text-xs text-rose-600 font-medium">{errors.department}</p>
                    )}
                  </div>
                )}

                {/* STEP 2: Select Specialist */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#10243A]">Select Consultant or Specialist</h3>
                      <p className="text-xs text-slate-500">
                        Choose a preferred physician, or select the first available consultant on duty.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {/* Any Available Option */}
                      <div
                        onClick={() => setSelectedDoctorId('')}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          selectedDoctorId === ''
                            ? 'border-[#1769AA] bg-blue-50/50 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#10243A]">
                            <Building className="w-5 h-5 text-[#1769AA]" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#10243A]">First Available Executive Consultant</div>
                            <div className="text-xs text-slate-500">Fastest appointment allocation by hospital triage desk</div>
                          </div>
                        </div>
                        {selectedDoctorId === '' && <CheckCircle2 className="w-4 h-4 text-[#1769AA]" />}
                      </div>

                      {/* Doctor Options */}
                      {HOSPITAL_DOCTORS.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDoctorId(doc.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            selectedDoctorId === doc.id
                              ? 'border-[#1769AA] bg-blue-50/50 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                              {doc.imageUrl ? (
                                <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-5 h-5 text-slate-500 m-auto mt-2.5" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-[#10243A]">{doc.name}</span>
                                {doc.isVerifiedPractice && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                    Verified
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-[#1769AA] font-medium">{doc.title}</div>
                              <div className="text-[11px] text-slate-500">{doc.schedule}</div>
                            </div>
                          </div>
                          {selectedDoctorId === doc.id && <CheckCircle2 className="w-4 h-4 text-[#1769AA]" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Choose Date & Time */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#10243A]">Preferred Consultation Time</h3>
                      <p className="text-xs text-slate-500">Pick a calendar date and illustrative appointment window.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Select Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 pl-10 rounded-xl border border-slate-300 text-sm focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                          />
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                        {errors.date && <p className="text-xs text-rose-600 mt-1">{errors.date}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Consultation Urgency
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setUrgency('routine')}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              urgency === 'routine'
                                ? 'border-[#1769AA] bg-blue-50/60 text-[#1769AA]'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            Routine Visit
                          </button>
                          <button
                            type="button"
                            onClick={() => setUrgency('priority')}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              urgency === 'priority'
                                ? 'border-amber-500 bg-amber-50/60 text-amber-800'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            Priority / Same-Day
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Available Time Slots (Demonstration Schedule)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {timeSlots.map((slot) => (
                          <div
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                              selectedSlot === slot
                                ? 'border-[#1769AA] bg-blue-50 text-[#1769AA] font-bold'
                                : 'border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{slot}</span>
                            </div>
                            {selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA]" />}
                          </div>
                        ))}
                      </div>
                      {errors.slot && <p className="text-xs text-rose-600 mt-1">{errors.slot}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 4: Patient Information */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#10243A]">Patient Contact Information</h3>
                      <p className="text-xs text-slate-500">
                        Minimum contact details needed to coordinate your demonstration inquiry.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. Haris Ahmed"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full p-3 pl-10 rounded-xl border border-slate-300 text-sm focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                        {errors.patientName && (
                          <p className="text-xs text-rose-600 mt-1">{errors.patientName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Mobile / Phone Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="e.g. +92 300 1234567"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            className="w-full p-3 pl-10 rounded-xl border border-slate-300 text-sm focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                        {errors.patientPhone && (
                          <p className="text-xs text-rose-600 mt-1">{errors.patientPhone}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Email Address (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="patient@example.com"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            className="w-full p-3 pl-10 rounded-xl border border-slate-300 text-sm focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                          />
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Inquiry Brief / Medical Concern (Do not disclose confidential records)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Brief description of consultation request (e.g. First clinical nutrition review, skin acne treatment)..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Review */}
                {currentStep === 5 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#10243A]">Review Appointment Request</h3>
                      <p className="text-xs text-slate-500">
                        Confirm details before submitting your inquiry to the executive desk.
                      </p>
                    </div>

                    <div className="bg-[#F4F8FB] border border-slate-200 rounded-2xl p-6 space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Department
                          </span>
                          <span className="text-sm font-bold text-[#10243A]">{selectedDepartment}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Physician / Specialist
                          </span>
                          <span className="text-sm font-bold text-[#1769AA]">
                            {HOSPITAL_DOCTORS.find((d) => d.id === selectedDoctorId)?.name ||
                              'First Available Executive Consultant'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Date & Slot
                          </span>
                          <span className="text-sm font-semibold text-slate-800">
                            {selectedDate} · {selectedSlot}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Patient Contact
                          </span>
                          <span className="text-sm font-semibold text-slate-800">
                            {patientName} ({patientPhone})
                          </span>
                        </div>
                      </div>

                      {notes && (
                        <div className="pt-3 border-t border-slate-200/60">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Patient Note
                          </span>
                          <p className="text-xs text-slate-700 italic mt-0.5">{notes}</p>
                        </div>
                      )}
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                        {submitError}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1769AA] hover:bg-[#10243A] rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting}
                      className="px-7 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Logging Demo Request...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submit Appointment Request</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
