import Hero from '@/components/sections/Hero';
import VideoBackground from '@/components/sections/VideoBackground';
import About from '@/components/sections/About';
import TourCalendar from '@/components/sections/TourCalendar';
import BookingForm from '@/components/sections/BookingForm';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';

import { supabase } from '@/lib/supabase';
import { TourDate } from '@/types';

export const revalidate = 0; // Force revalidate on every request for dynamic tour dates
// CI/CD Test: 2026-01-27T21:28
async function getTourDates(): Promise<TourDate[]> {
  const { data, error } = await supabase
    .from('tour_dates')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching tour dates:', error);
    return [];
  }

  // Transform snake_case DB fields to camelCase TS types
  return (data || []).map((item) => ({
    id: item.id,
    city: item.city,
    country: item.country,
    date: item.date,
    endDate: item.end_date || undefined,
    venue: item.venue,
    status: item.status,
    spotsAvailable: item.spots_available || undefined,
    description: item.description || undefined,
  }));
}

export default async function Home() {
  const tourDates = await getTourDates();

  return (
    <main className="min-h-screen">
      <Hero />
      <TourCalendar tourDates={tourDates} />
      <BookingForm />
      <VideoBackground />
    </main>
  );
}
