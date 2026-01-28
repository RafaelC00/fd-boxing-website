'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
  { id: 1, category: 'seminar', alt: 'Seminar in Barcelona' },
  { id: 2, category: 'training', alt: 'Training session' },
  { id: 3, category: 'event', alt: 'Boxing event' },
  { id: 4, category: 'seminar', alt: 'Seminar in Paris' },
  { id: 5, category: 'training', alt: 'Advanced techniques' },
  { id: 6, category: 'event', alt: 'Championship bout' },
  { id: 7, category: 'seminar', alt: 'Workshop in Rome' },
  { id: 8, category: 'training', alt: 'Padwork session' },
];

export default function Gallery({ dict }: { dict: any }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!dict) return null;

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase text-fd-black mb-6">
            <span className="text-fd-red">{dict.title}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto uppercase font-medium">
            {dict.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="aspect-square bg-linear-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 text-sm font-medium text-center px-4">
                  {image.alt}
                </p>
              </div>
              <div className="absolute inset-0 bg-fd-red opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-fd-red transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-fd-red transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <div className="max-w-4xl w-full aspect-video bg-linear-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg">
                {galleryImages.find(img => img.id === selectedImage)?.alt}
              </p>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6 uppercase tracking-widest text-sm font-bold">
            Follow us on Instagram for daily updates and behind-the-scenes content
          </p>
          <a
            href="https://instagram.com/fd.boxing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fd-red text-white px-8 py-3 rounded-lg font-bold tracking-widest hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            @FD.BOXING
          </a>
        </motion.div>
      </div>
    </section>
  );
}
