'use client';

import { motion } from 'framer-motion';

export default function About({ dict }: { dict: any }) {
  if (!dict) return null;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Training Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-4/3 bg-linear-to-br from-gray-300 to-gray-400 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="text-center text-gray-600">
                <p className="text-xl font-semibold mb-2">Training Photo Here</p>
                <p className="text-sm">Place photo of Federico training students</p>
                <p className="text-xs mt-4">Format: 800x600px (landscape)</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Title with Red Border */}
            <div className="border-l-4 border-fd-red pl-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-fd-black leading-tight">
                {dict.title}
              </h2>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base uppercase font-medium">
                {dict.p1}
              </p>
              <p className="text-base uppercase font-medium">
                {dict.p2}
              </p>
            </div>

            {/* Sign Up Button */}
            <div className="pt-4">
              <a
                href="#booking"
                className="inline-block bg-fd-red text-white px-10 py-3 font-bold uppercase text-sm tracking-widest hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {dict.cta}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
