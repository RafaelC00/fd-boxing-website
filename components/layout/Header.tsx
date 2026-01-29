'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';

import { getDictionary } from '@/src/i18n/get-dictionary';

export default function Header({ lang }: { lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('');
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sectionList = [
        'tour',
        'about',
        'gallery',
        'testimonials',
        'booking'
      ];
      for (const section of sectionList.reverse()) {
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

  const navLinks = dict ? [
    { href: '#tour', label: dict.nav.tour },
    { href: '#about', label: dict.nav.about },
    { href: '#booking', label: dict.nav.contact },
  ] : [];

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
    window.location.href = newPath;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full py-2 lg:py-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={140}
            height={100}
            className="w-24 h-auto lg:w-[140px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`font-(family-name:--font-geist-mono) text-white text-lg p-2.5 rounded-md transition-all duration-200 whitespace-nowrap ${activeLink === link.href
                  ? 'bg-fd-red hover:bg-red-700'
                  : 'bg-gray-800 hover:bg-gray-700'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Button (Desktop) & Language Switcher */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-fd-red text-fd-red font-bold hover:bg-fd-red hover:text-white transition-all duration-200 uppercase text-xs tracking-widest"
          >
            <Globe size={18} />
            {lang === 'en' ? 'ESP' : 'ENG'}
          </button>

          <div className="hidden lg:block">
            <Link
              href="#booking"
              className="bg-fd-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              {dict?.common.bookNow || 'Book Now'}
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-4 border-t border-gray-100 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-fd-red transition-colors duration-200 font-bold text-lg py-2 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#booking"
              className="bg-fd-red text-white px-6 py-4 rounded-lg font-bold text-center mt-4 shadow-lg active:scale-95 transition-transform"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict?.common.bookNow || 'Book Now'}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
