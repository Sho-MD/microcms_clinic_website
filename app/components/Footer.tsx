import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">せき専門外来</h3>
            <p className="text-gray-400">
                  <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-200 underline">
                    ラジオロジークリニック扇町
                  </Link>
                  併設<br />
              呼吸器内科専門医による<br />
              せき専門外来
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">診療内容</h4>
            <ul className="space-y-2 text-gray-400">
              <li>非結核性抗酸菌症</li>
              <li>喘息</li>
              <li>COPD</li>
              <li>その他せきに関わる疾患</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">リンク</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/doctor" className="hover:text-white transition">
                  医師紹介
                </Link>
              </li>
              <li>
                <Link href="/access" className="hover:text-white transition">
                  アクセス
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            <Link href="/" className="hover:text-white transition">
              &copy; せき専門外来
            </Link>
            {' / '}
            <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              &copy; 2014 ラジオロジークリニック扇町
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

