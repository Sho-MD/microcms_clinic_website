'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-900" onClick={closeMenu}>
            せき専門外来
          </Link>
          
          {/* ハンバーガーメニューボタン（モバイルのみ表示） */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-900 focus:outline-none"
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

          {/* デスクトップメニュー */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-900 transition">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 hover:text-blue-900 transition">
                せき専門外来について
              </Link>
            </li>
            <li>
              <Link href="/treatment" className="text-gray-700 hover:text-blue-900 transition">
                診療内容
              </Link>
            </li>
            <li>
              <Link href="/examination" className="text-gray-700 hover:text-blue-900 transition">
                検査について
              </Link>
            </li>
            <li>
              <Link href="/doctor" className="text-gray-700 hover:text-blue-900 transition">
                医師紹介
              </Link>
            </li>
            <li>
              <Link href="/access" className="text-gray-700 hover:text-blue-900 transition">
                アクセス
              </Link>
            </li>
          </ul>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <ul className="flex flex-col space-y-3 pt-4">
              <li>
                <Link 
                  href="/" 
                  className="block text-gray-700 hover:text-blue-900 transition py-2"
                  onClick={closeMenu}
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block text-gray-700 hover:text-blue-900 transition py-2"
                  onClick={closeMenu}
                >
                  せき専門外来について
                </Link>
              </li>
              <li>
                <Link 
                  href="/treatment" 
                  className="block text-gray-700 hover:text-blue-900 transition py-2"
                  onClick={closeMenu}
                >
                  診療内容
                </Link>
              </li>
              <li>
                <Link 
                  href="/examination" 
                  className="block text-gray-700 hover:text-blue-900 transition py-2"
                  onClick={closeMenu}
                >
                  検査について
                </Link>
              </li>
              <li>
                <Link 
                  href="/doctor" 
                  className="block text-gray-700 hover:text-blue-900 transition py-2"
                  onClick={closeMenu}
                >
                  医師紹介
                </Link>
              </li>
              <li>
                <Link 
                  href="/access" 
                  className="block text-gray-700 hover:text-blue-900 transition py-2"
                  onClick={closeMenu}
                >
                  アクセス
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
