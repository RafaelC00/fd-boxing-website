'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle, Clock, Users } from 'lucide-react';
import { TourDate } from '@/types';

interface TourCalendarProps {
  tourDates: TourDate[];
  dict: any;
}

const StatusBadge = ({ status, dict }: { status: TourDate['status'], dict: any }) => {
  const badges = {
    confirmed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Confirmed' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: dict.comingSoon },
    available: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Users, label: dict.bookDate },
  };

  const badge = badges[status];
  const Icon = badge.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
      <Icon size={16} />
      {badge.label}
    </span>
  );
};

export default function TourCalendar({ tourDates, dict }: TourCalendarProps) {
  if (!dict) return null;

  const formatDate = (date: string, endDate?: string) => {
    const start = new Date(date);
    const startFormatted = start.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    if (endDate) {
      const end = new Date(endDate);
      const endFormatted = end.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
      });
      return `${startFormatted} - ${endFormatted}`;
    }

    return startFormatted;
  };

  return (
    <section id="tour" className="py-10 bg-white flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 w-full flex flex-col items-center justify-between min-h-[120px]"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-fd-black mb-4 uppercase">
            {dict.title.split(' / ')[0]} / <span className="text-fd-red">{dict.title.split(' / ')[1]}</span>
          </h2>
          <div className="w-100 h-1 bg-fd-red mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto uppercase font-medium">
            {dict.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {tourDates.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-fd-red"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-fd-red" size={20} />
                    <h3 className="text-2xl font-bold text-fd-black">
                      {tour.city}, {tour.country}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Calendar size={18} />
                    <p className="text-lg">{formatDate(tour.date, tour.endDate)}</p>
                  </div>
                </div>
                <StatusBadge status={tour.status} dict={dict} />
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">{dict.venue}:</span> {tour.venue}
                </p>
                {tour.spotsAvailable && (
                  <p className="text-gray-700">
                    <span className="font-semibold">{dict.spots}:</span> {tour.spotsAvailable}
                  </p>
                )}
                {tour.description && (
                  <p className="text-gray-600 italic">{tour.description}</p>
                )}
              </div>

              {tour.status === 'available' && (
                <a
                  href="#booking"
                  className="inline-block w-full text-center bg-fd-red text-white px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-widest hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {dict.bookDate}
                </a>
              )}

              {tour.status === 'confirmed' && tour.spotsAvailable && tour.spotsAvailable > 0 && (
                <a
                  href="#booking"
                  className="inline-block w-full text-center bg-fd-black text-white px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-widest hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {dict.register}
                </a>
              )}

              {tour.status === 'pending' && (
                <div className="text-center text-gray-500 italic py-2">
                  {dict.comingSoon}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center rounded-lg shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-fd-black mb-4 uppercase">
            {dict.notListedTitle}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto uppercase font-medium">
            {dict.notListedDesc}
          </p>
          <a
            href="#booking"
            className="inline-block bg-fd-red text-white px-8 py-4 rounded-lg font-bold uppercase text-sm tracking-widest hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {dict.bookDate}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
