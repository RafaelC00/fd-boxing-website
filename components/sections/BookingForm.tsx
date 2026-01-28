'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const bookingSchema = z.object({
  academyName: z.string().min(2, 'Academy name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  preferredDates: z.string().min(5, 'Please provide preferred dates'),
  numberOfParticipants: z.coerce.number().min(5, 'Minimum 5 participants required'),
  message: z.string().min(20, 'Please provide more details (minimum 20 characters)'),
});

interface BookingFormData {
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

type BookingFormSchema = BookingFormData;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function BookingForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingSchema) as any,
  });

  const onSubmit = async (data: BookingFormSchema) => {
    setFormStatus('submitting');

    try {
      // TODO: Replace with actual Supabase integration
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section id="booking" className="py-24 bg-fd-red">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-white text-sm uppercase tracking-wider mb-2">Request a Seminar</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">
            Book a <span className="text-fd-black">Seminar</span>
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Bring world-class boxing training to your academy. Fill out the form below
            and we'll get back to you within 24 hours to discuss availability and details.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-2xl p-10 md:p-16"
          >
            {formStatus === 'success' && (
              <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Booking Request Submitted!</h3>
                  <p className="text-green-700">We'll contact you within 24 hours to confirm details.</p>
                </div>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Submission Failed</h3>
                  <p className="text-red-700">Please try again or contact us directly at info@fdboxing.com</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Academy Information Section */}
              <div>
                <h3 className="text-xl font-bold text-fd-black mb-6 pb-3 border-b-2 border-gray-200">
                  Academy Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Academy Name */}
                  <div>
                    <label htmlFor="academyName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Academy/Gym Name *
                    </label>
                    <input
                      {...register('academyName')}
                      type="text"
                      id="academyName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all"
                      placeholder="Elite Boxing Academy"
                    />
                    {errors.academyName && (
                      <p className="mt-1 text-sm text-red-600">{errors.academyName.message}</p>
                    )}
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      {...register('contactName')}
                      type="text"
                      id="contactName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all"
                      placeholder="John Smith"
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h3 className="text-xl font-bold text-fd-black mb-6 pb-3 border-b-2 border-gray-200">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all"
                      placeholder="contact@academy.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all"
                      placeholder="+34 600 123 456"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location & Event Details Section */}
              <div>
                <h3 className="text-xl font-bold text-fd-black mb-6 pb-3 border-b-2 border-gray-200">
                  Location & Event Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      {...register('city')}
                      type="text"
                      id="city"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all"
                      placeholder="Barcelona"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      {...register('country')}
                      type="text"
                      id="country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all"
                      placeholder="Spain"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                    )}
                  </div>

                  {/* Preferred Dates */}
                  <div>
                    <label htmlFor="preferredDates" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Dates *
                    </label>
                    <input
                      {...register('preferredDates')}
                      type="text"
                      id="preferredDates"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all"
                      placeholder="March 15-16, 2026"
                    />
                    {errors.preferredDates && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredDates.message}</p>
                    )}
                  </div>

                  {/* Number of Participants */}
                  <div>
                    <label htmlFor="numberOfParticipants" className="block text-sm font-semibold text-gray-700 mb-2">
                      Expected Participants *
                    </label>
                    <input
                      {...register('numberOfParticipants')}
                      type="number"
                      id="numberOfParticipants"
                      min="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all"
                      placeholder="20"
                    />
                    {errors.numberOfParticipants && (
                      <p className="mt-1 text-sm text-red-600">{errors.numberOfParticipants.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <h3 className="text-xl font-bold text-fd-black mb-6 pb-3 border-b-2 border-gray-200">
                  Additional Information
                </h3>
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Information *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your academy, training level of participants, specific topics you'd like to cover, facilities available, etc."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 border-t-2 border-gray-200">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="bg-fd-red text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Booking Request
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                * Required fields. We respect your privacy and will never share your information.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
