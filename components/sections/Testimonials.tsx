'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Martinez',
    role: 'Head Coach',
    academy: 'Elite Boxing Barcelona',
    quote: 'Federico brought incredible energy and expertise to our academy. Our fighters improved their technique significantly in just two days. His teaching methodology is second to none.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sophie Dubois',
    role: 'Professional Boxer',
    academy: 'Paris Fight Club',
    quote: 'Training with Federico was a game-changer for my career. His attention to detail and ability to break down complex techniques made everything click. Highly recommend his seminars!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Marco Rossi',
    role: 'Academy Owner',
    academy: 'Roma Boxing Center',
    quote: 'We have hosted many seminars, but Federico stands out. Professional, passionate, and incredibly knowledgeable. Our members are already asking when he will return!',
    rating: 5,
  },
  {
    id: '4',
    name: 'Lisa Schmidt',
    role: 'Amateur Boxer',
    academy: 'Berlin Boxing Academy',
    quote: 'As a beginner, I was nervous about attending, but Federico made everyone feel welcome regardless of skill level. His "Real Boxing For Everyone" motto is absolutely true!',
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={i < rating ? 'fill-fd-red text-fd-red' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};

export default function Testimonials({ dict }: { dict: any }) {
  if (!dict) return null;

  return (
    <section id="testimonials" className="py-24 bg-fd-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-fd-red text-sm uppercase tracking-widest font-bold mb-2">@FD.BOXING</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">
            {dict.title.split(' ')[0]} {dict.title.split(' ')[1]} <span className="text-fd-red">{dict.title.split(' ')[2]}</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto uppercase font-medium">
            {dict.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-2xl p-10 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-fd-red opacity-20">
                <Quote size={48} />
              </div>

              <StarRating rating={testimonial.rating} />

              <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10 italic">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-gray-200 pt-6">
                <p className="font-bold text-fd-black text-lg uppercase">{testimonial.name}</p>
                <p className="text-gray-600 uppercase text-sm font-medium">{testimonial.role}</p>
                {testimonial.academy && (
                  <p className="text-fd-red font-bold uppercase text-sm">{testimonial.academy}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white text-lg mb-8 uppercase font-medium">
            {dict.cta.replace('Book Your Seminar Today', '')}
          </p>
          <a
            href="#booking"
            className="inline-block bg-fd-red text-white px-12 py-4 font-bold uppercase text-sm tracking-widest hover:bg-red-700 transition-all duration-200 shadow-2xl hover:shadow-xl"
          >
            {dict.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
