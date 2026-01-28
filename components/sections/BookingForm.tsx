'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const createBookingSchema = (dict: any) => z.object({
  academyName: z.string().min(2, dict.fields.academyName),
  contactName: z.string().min(2, dict.fields.contactPerson),
  email: z.string().email(dict.fields.email),
  phone: z.string().min(10, dict.fields.phone),
  city: z.string().min(2, dict.fields.city),
  country: z.string().min(2, dict.fields.country),
  preferredDates: z.string().min(5, dict.fields.preferredDates),
  numberOfParticipants: z.coerce.number().min(5, dict.fields.expectedParticipants),
  message: z.string().min(10, dict.fields.message),
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

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function BookingForm({ dict }: { dict: any }) {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(createBookingSchema(dict)) as any,
  });

  if (!dict) return null;

  const onSubmit = async (data: BookingFormData) => {
    setFormStatus('submitting');

    try {
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
          <p className="text-white text-sm uppercase tracking-widest font-bold mb-2">{dict.title.split(' ')[0]}</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">
            {dict.title.split(' ')[0]} <span className="text-fd-black">{dict.title.split(' ')[1]} {dict.title.split(' ')[2]}</span>
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto uppercase font-medium">
            {dict.description}
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
                  <h3 className="font-bold text-green-800 mb-1 uppercase tracking-tight">{dict.success}</h3>
                  <p className="text-green-700 uppercase text-sm font-medium">{dict.successDesc}</p>
                </div>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-red-800 mb-1 uppercase tracking-tight">{dict.error}</h3>
                  <p className="text-red-700 uppercase text-sm font-medium">{dict.errorDesc}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Academy Information Section */}
              <div>
                <h3 className="text-xl font-bold text-fd-black mb-6 pb-3 border-b-2 border-gray-200 uppercase tracking-widest">
                  {dict.sections.academy}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Academy Name */}
                  <div>
                    <label htmlFor="academyName" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      {dict.fields.academyName}
                    </label>
                    <input
                      {...register('academyName')}
                      type="text"
                      id="academyName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all uppercase placeholder:normal-case font-medium"
                      placeholder={dict.placeholders.academyName}
                    />
                    {errors.academyName && (
                      <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.academyName.message}</p>
                    )}
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      {dict.fields.contactPerson}
                    </label>
                    <input
                      {...register('contactName')}
                      type="text"
                      id="contactName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all uppercase placeholder:normal-case font-medium"
                      placeholder={dict.placeholders.contactPerson}
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.contactName.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h3 className="text-xl font-bold text-fd-black mb-6 pb-3 border-b-2 border-gray-200 uppercase tracking-widest">
                  {dict.sections.contact}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      {dict.fields.email}
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all uppercase placeholder:normal-case font-medium"
                      placeholder={dict.placeholders.email}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      {dict.fields.phone}
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all uppercase placeholder:normal-case font-medium"
                      placeholder={dict.placeholders.phone}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location & Event Details Section */}
              <div>
                <h3 className="text-xl font-bold text-fd-black mb-6 pb-3 border-b-2 border-gray-200 uppercase tracking-widest">
                  {dict.sections.location}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      {dict.fields.city}
                    </label>
                    <input
                      {...register('city')}
                      type="text"
                      id="city"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all uppercase placeholder:normal-case font-medium"
                      placeholder={dict.placeholders.city}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.city.message}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      {dict.fields.country}
                    </label>
                    <input
                      {...register('country')}
                      type="text"
                      id="country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all uppercase placeholder:normal-case font-medium"
                      placeholder={dict.placeholders.country}
                    />
                    {errors.country && (
                      <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.country.message}</p>
                    )}
                  </div>

                  {/* Preferred Dates */}
                  <div>
                    <label htmlFor="preferredDates" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      {dict.fields.preferredDates}
                    </label>
                    <input
                      {...register('preferredDates')}
                      type="text"
                      id="preferredDates"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all uppercase placeholder:normal-case font-medium"
                      placeholder={dict.placeholders.preferredDates}
                    />
                    {errors.preferredDates && (
                      <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.preferredDates.message}</p>
                    )}
                  </div>

                  {/* Number of Participants */}
                  <div>
                    <label htmlFor="numberOfParticipants" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      {dict.fields.expectedParticipants}
                    </label>
                    <input
                      {...register('numberOfParticipants')}
                      type="number"
                      id="numberOfParticipants"
                      min="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all font-medium"
                      placeholder="20"
                    />
                    {errors.numberOfParticipants && (
                      <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.numberOfParticipants.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <h3 className="text-xl font-bold text-fd-black mb-6 pb-3 border-b-2 border-gray-200 uppercase tracking-widest">
                  {dict.sections.additional}
                </h3>
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                    {dict.fields.message}
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fd-red focus:border-transparent transition-all resize-none font-medium uppercase placeholder:normal-case"
                    placeholder={dict.placeholders.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs font-bold text-red-600 uppercase">{errors.message.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 border-t-2 border-gray-200">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="bg-fd-red text-white px-10 py-4 rounded-lg font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-all duration-200 shadow-xl hover:shadow-fd-red/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {dict.submitting}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {dict.submit}
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs font-bold text-gray-500 mt-4 uppercase tracking-widest">
                * {dict.loading === 'Cargando...' ? 'Campos obligatorios. Respetamos su privacidad y nunca compartiremos su información.' : 'Required fields. We respect your privacy and will never share your information.'}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
