'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#tour', label: 'European Tour' },
    { href: '#about', label: 'About' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#booking', label: 'Contact' },
  ];

  return (
    <header
      className={`relative top-0 left-0 right-0 z-50 w-full h-30 flex items-center justify-center transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full py-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.jpg" alt="Logo" width={140} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`font-[family-name:var(--font-geist-mono)] text-white text-lg p-2.5 rounded-md transition-all duration-200 whitespace-nowrap ${activeLink === link.href
                  ? 'bg-fd-red hover:bg-red-700'
                  : 'bg-gray-800 hover:bg-gray-700'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Button (Desktop) & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Link
              href="#booking"
              className="bg-fd-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-fd-red transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-fd-red transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#booking"
                className="bg-fd-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
