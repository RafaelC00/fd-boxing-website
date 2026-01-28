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
  try {
    const { data, error } = await supabase
      .from('tour_dates')
      .select('*')
      .order('date', { ascending: true });

    if (error || !data || data.length === 0) {
      console.log('Using mock data for tour calendar');
      return [
        { id: '1', city: 'Rome', country: 'Italy', date: '2026-05-15', venue: 'Available', status: 'available' },
        { id: '2', city: 'Milan', country: 'Italy', date: '2026-05-18', venue: 'Available', status: 'available' },
        { id: '3', city: 'Madrid', country: 'Spain', date: '2026-06-05', venue: 'Available', status: 'available' },
        { id: '4', city: 'Barcelona', country: 'Spain', date: '2026-06-08', venue: 'Available', status: 'available' },
        { id: '5', city: 'Valencia', country: 'Spain', date: '2026-06-11', venue: 'Available', status: 'available' },
      ];
    }

    return data.map((item) => ({
      id: item.id,
      city: item.city,
      country: item.country,
      date: item.date,
      endDate: item.end_date || undefined,
      venue: item.venue,
      status: item.status as any,
      spotsAvailable: item.spots_available || undefined,
      description: item.description || undefined,
    }));
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const tourDates = await getTourDates();

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <TourCalendar tourDates={tourDates} />
      <Gallery />
      <Testimonials />
      <BookingForm />
      <VideoBackground />
    </main>
  );
}
