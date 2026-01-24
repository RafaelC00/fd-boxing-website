import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fd-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex-1">
            <div className="text-2xl font-bold mb-4 font-[family-name:var(--font-geist-mono)]">
              <span className="text-fd-red">FD</span>
              <span className="text-white">-BOXING</span>
            </div>
            <p className="text-gray-400 mb-4">
              Real Boxing For Everyone
            </p>
            <p className="text-gray-400 text-sm">
              Professional boxing training and seminars across Europe
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 md:text-center">
            <h3 className="text-lg font-semibold mb-4 font-[family-name:var(--font-geist-mono)]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-fd-red transition-colors">
                  About Federico
                </Link>
              </li>
              <li>
                <Link href="#tour" className="text-gray-400 hover:text-fd-red transition-colors">
                  European Tour
                </Link>
              </li>
              <li>
                <Link href="#booking" className="text-gray-400 hover:text-fd-red transition-colors">
                  Book a Seminar
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-400 hover:text-fd-red transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="flex-1 md:text-right">
            <h3 className="text-lg font-semibold mb-4 font-[family-name:var(--font-geist-mono)]">Connect</h3>
            <div className="flex md:justify-end space-x-4 mb-4">
              <a
                href="https://instagram.com/fd.boxing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fd-red transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com/fdboxing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fd-red transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://youtube.com/@fdboxing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fd-red transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a
                href="mailto:info@fdboxing.com"
                className="text-gray-400 hover:text-fd-red transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              @FD.BOXING<br />
              #BetterBoxing
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} FD-Boxing. All rights reserved. | Real Boxing For Everyone</p>
        </div>
      </div>
    </footer>
  );
}
