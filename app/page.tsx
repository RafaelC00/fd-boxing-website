import Hero from '@/components/sections/Hero';
import VideoBackground from '@/components/sections/VideoBackground';
import About from '@/components/sections/About';
import TourCalendar from '@/components/sections/TourCalendar';
import BookingForm from '@/components/sections/BookingForm';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TourCalendar />
      <BookingForm />
      <VideoBackground />
    </main>
  );
}
