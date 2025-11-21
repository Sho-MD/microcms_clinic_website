import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Clinic Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 tracking-wide">せき専門外来</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-slate-600 underline-offset-4 hover:decoration-primary">
                ラジオロジークリニック扇町
              </Link>
              {' '}併設<br />
              呼吸器内科専門医による<br />
              せき専門外来
            </p>
            <div className="flex gap-4">
              {/* Social icons could go here */}
            </div>
          </div>

          {/* Services Links - FIXED */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-200">診療内容</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link href="/treatment" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  非結核性抗酸菌症
                </Link>
              </li>
              <li>
                <Link href="/treatment" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  喘息（ぜんそく）
                </Link>
              </li>
              <li>
                <Link href="/treatment" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  COPD（慢性閉塞性肺疾患）
                </Link>
              </li>
              <li>
                <Link href="/treatment" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  その他せきに関わる疾患
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-200">クイックリンク</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link href="/doctor" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  医師紹介
                </Link>
              </li>
              <li>
                <Link href="/access" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  アクセス
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  お知らせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              &copy; せき専門外来
            </Link>
            <span className="hidden md:inline">|</span>
            <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              &copy; 2014 ラジオロジークリニック扇町
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

