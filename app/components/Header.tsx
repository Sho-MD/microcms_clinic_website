import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            せき専門外来
          </Link>
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
      </nav>
    </header>
  );
}

