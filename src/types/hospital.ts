export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  department: string;
  qualification: string;
  experience?: string;
  rating?: number;
  reviewsCount?: number;
  isVerifiedPractice: boolean;
  isDemoPlaceholder?: boolean;
  schedule: string;
  bio: string;
  focusAreas: string[];
  imageUrl?: string;
}

export interface HospitalService {
  id: string;
  number: string;
  name: string;
  department: string;
  leadSpecialist?: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  keyFeatures: string[];
  commonTreatments: string[];
  hours: string;
  featuredImage?: string;
  isVerifiedOnPremise: boolean;
}

export interface PatientReview {
  id: string;
  author: string;
  badge?: string;
  rating: number;
  text: string;
  date: string;
  source: string;
}

export interface AppointmentInquiry {
  department: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  reason?: string;
  urgency: 'routine' | 'priority' | 'emergency';
}
