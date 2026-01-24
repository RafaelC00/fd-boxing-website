'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dumbbell, Timer, HeartPulse } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="bg-fd-black flex lg:max-h-[400px] ">
      <div className="justify-center w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row min-h-[400px] ">
        <div className="m-2 min-h-[240px] lg:w-[50%] p-4 relative flex items-center justify-center">
          {/* Left Side - Text Content */}
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-4">
              <span className="text-fd-red block">FEDERICO</span>
              <span className="text-fd-red block">DEVESA</span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight">
              EUROPA TOUR<br />2026
            </h2>
          </div>
        </div>

        <div className="m-2 lg:w-[50%] p-4 relative flex items-center justify-center">
          {/* Right Side - Image */}
          <Image
            src="/images/federico-devesa.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="w-full h-auto max-w-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
