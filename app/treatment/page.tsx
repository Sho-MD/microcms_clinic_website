import Link from 'next/link';

export default function TreatmentPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
          診療内容
        </h1>

        <section className="mb-12">
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            当院では、せきに関わる様々な疾患を専門的に診療しております。
            ラジオロジークリニック併設の強みを活かし、X線・CT検査とリアルタイム読影により、
            迅速かつ正確な診断を行い、最適な治療をご提案いたします。
          </p>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                非結核性抗酸菌症
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                結核菌以外の抗酸菌による感染症です。長引く咳や痰、全身倦怠感、微熱などの症状が現れます。
                特に中高年の女性に多く見られる疾患です。
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-bold text-blue-900 mb-2">当院での診断・治療</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• CT検査により、特徴的な画像所見を確認</li>
                  <li>• リアルタイム読影により、迅速な診断が可能</li>
                  <li>• 適切な抗菌薬による治療</li>
                  <li>• 定期的な経過観察と画像検査</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                喘息
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                気道の慢性的な炎症により、咳や喘鳴、呼吸困難が起こる疾患です。
                アレルギーや環境因子が関与することが多く、適切な診断と治療により、症状をコントロールし、日常生活を快適に過ごせます。
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-bold text-blue-900 mb-2">当院での診断・治療</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• 肺機能検査（スパイロメーター）による診断</li>
                  <li>• 呼気一酸化窒素濃度検査による気道炎症の評価</li>
                  <li>• 吸入ステロイド薬などの適切な治療</li>
                  <li>• 患者様に合わせた個別化医療</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                COPD（慢性閉塞性肺疾患）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                主に喫煙が原因で、肺の機能が低下する疾患です。長引く咳や息切れが特徴的です。
                早期発見と適切な治療により、進行を抑えることができます。
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-bold text-blue-900 mb-2">当院での診断・治療</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• 肺機能検査による診断</li>
                  <li>• CT検査による肺の状態の詳細な評価</li>
                  <li>• 禁煙指導と薬物療法</li>
                  <li>• リハビリテーションのご提案</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                咳喘息
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                喘息の一種ですが、喘鳴や呼吸困難を伴わず、咳だけが続く疾患です。
                夜間や早朝に咳がひどくなることが多く、適切な治療により改善します。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                アトピー性咳嗽
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                アレルギー反応による咳で、アトピー素因のある方に多く見られます。
                アレルギー検査により原因を特定し、適切な治療を行います。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                感染後咳嗽
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                風邪などの感染症の後に残る咳です。通常は時間とともに改善しますが、
                長期間続く場合は、適切な治療が必要です。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                逆流性食道炎
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                胃酸の逆流により、食道が刺激され、咳が起こることがあります。
                胃酸を抑える薬などにより、改善することが多いです。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            当院の診療方針
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当院では、患者様お一人お一人の症状や状態に合わせた個別化医療を行っております。
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-900 mr-2 font-bold">✓</span>
              <span>ラジオロジークリニック併設の強みを活かした迅速な診断</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-900 mr-2 font-bold">✓</span>
              <span>呼吸器内科専門医による専門的な診療</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-900 mr-2 font-bold">✓</span>
              <span>患者様に分かりやすい説明と、最適な治療のご提案</span>
            </li>
          </ul>
        </section>

        <div className="text-center mt-12 space-x-4">
          <Link 
            href="/examination" 
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition inline-block"
          >
            検査について詳しく見る
          </Link>
          <Link 
            href="/" 
            className="bg-white text-blue-900 border-2 border-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

