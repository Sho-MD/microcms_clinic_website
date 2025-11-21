'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={closeMenu}
          >
            <span className="text-xl md:text-2xl font-bold text-secondary tracking-tight group-hover:text-primary transition-colors">
              せき専門外来
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-secondary hover:text-primary focus:outline-none transition-colors"
            aria-label="メニューを開く"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            {[
              { label: 'ホーム', href: '/' },
              { label: '当院について', href: '/about' },
              { label: '診療内容', href: '/treatment' },
              { label: '検査・設備', href: '/examination' },
              { label: '医師紹介', href: '/doctor' },
              { label: 'アクセス', href: '/access' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-secondary hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/access"
                className="inline-block px-5 py-2 bg-primary text-white text-sm font-bold rounded-full shadow-md hover:bg-primary-dark transition-all transform hover:-translate-y-0.5"
              >
                予約・お問い合わせ
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <ul className="flex flex-col space-y-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-border">
            {[
              { label: 'ホーム', href: '/' },
              { label: '当院について', href: '/about' },
              { label: '診療内容', href: '/treatment' },
              { label: '検査・設備', href: '/examination' },
              { label: '医師紹介', href: '/doctor' },
              { label: 'アクセス', href: '/access' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-secondary hover:bg-background-soft hover:text-primary rounded-xl transition-colors font-medium"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
