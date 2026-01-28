'use client';

import { motion } from 'framer-motion';
import { Award, Users, Globe, Trophy } from 'lucide-react';

export default function About() {
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
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden">
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
                HOW WE GOT STARTED<br />IN THIS BUSINESS
              </h2>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base">
                FEDERICO DEVESA IS A WORLD-CLASS BOXING COACH AND COMPETITOR WITH YEARS OF EXPERIENCE IN THE RING AND AS A MENTOR. HIS TECHNIQUE-DRIVEN APPROACH HAS HELPED HUNDREDS OF ATHLETES REFINE THEIR CRAFT, FROM FUNDAMENTAL FOOTWORK TO ADVANCED COUNTER-PUNCHING STRATEGIES.
              </p>
              <p className="text-base">
                THE 2026 EUROPEAN TOUR IS BORN FROM A PASSION TO SPREAD "REAL BOXING FOR EVERYONE". BY BRINGING PROFESSIONAL-LEVEL MASTERCLASSES TO ACADEMIES ACROSS THE CONTINENT, FEDERICO AIMS TO ELEVATE THE STANDARD OF BOXING TRAINING AND BUILD A GLOBAL COMMUNITY OF DISCIPLINED FIGHTERS.
              </p>
            </div>

            {/* Sign Up Button */}
            <div className="pt-4">
              <a
                href="#booking"
                className="inline-block bg-fd-red text-white px-10 py-3 font-bold uppercase text-sm tracking-wider hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                SIGN UP
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
