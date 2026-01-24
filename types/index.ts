export interface TourDate {
  id: string;
  city: string;
  country: string;
  date: string;
  endDate?: string;
  venue: string;
  status: 'confirmed' | 'pending' | 'available';
  spotsAvailable?: number;
  description?: string;
}

export interface BookingFormData {
  academyName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  preferredDates: string;
  numberOfParticipants: number;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  academy?: string;
  photo?: string;
  quote: string;
  rating: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: 'seminar' | 'training' | 'event';
}
