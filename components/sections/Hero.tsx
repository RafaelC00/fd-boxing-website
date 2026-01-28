'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero({ dict }: { dict: any }) {
  if (!dict) return null;

  return (
    <section id="home" className="bg-fd-black flex lg:max-h-[400px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-24 flex flex-col items-center justify-between min-h-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
              {dict.title.split(' ')[0]} <br />
              <span className="text-fd-red">{dict.title.split(' ')[1]}</span>
            </h1>
            <p className="text-white text-xl md:text-2xl font-bold mb-8 uppercase tracking-widest bg-fd-red inline-block px-4 py-1">
              {dict.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#booking"
                className="bg-fd-red text-white px-8 py-4 rounded-lg font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-all duration-200 shadow-xl hover:shadow-fd-red/20"
              >
                {dict.description}
              </a>
            </div>
          </motion.div>
          <div className="hidden lg:block">
            <Image
              src="/images/federico-devesa.png"
              alt="Federico Devesa"
              width={500}
              height={500}
              className="w-full h-auto max-w-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
