import Link from 'next/link';

export default function TreatmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Treatment</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              診療内容
            </h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <p className="text-sm leading-relaxed text-slate-600 mb-8">
                当院では、せきに関わる様々な疾患を専門的に診療しております。
                <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 underline">
                  ラジオロジークリニック扇町
                </Link>
                併設の強みを活かし、X線・CT検査とリアルタイム読影により、
                迅速かつ正確な診断を行い、最適な治療をご提案いたします。
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: '非結核性抗酸菌症',
                    description: '結核菌以外の抗酸菌による感染症です。長引く咳や痰、全身倦怠感、微熱などの症状が現れます。特に中高年の女性に多く見られる疾患です。',
                    items: [
                      'CT検査により、特徴的な画像所見を確認',
                      'リアルタイム読影により、迅速な診断が可能',
                      '適切な抗菌薬による治療',
                      '定期的な経過観察と画像検査',
                    ],
                  },
                  {
                    title: '喘息',
                    description: '気道の慢性的な炎症により、咳や喘鳴、呼吸困難が起こる疾患です。アレルギーや環境因子が関与することが多く、適切な診断と治療により、症状をコントロールし、日常生活を快適に過ごせます。',
                    items: [
                      '肺機能検査（スパイロメーター）による診断',
                      '呼気一酸化窒素濃度検査による気道炎症の評価',
                      '吸入ステロイド薬などの適切な治療',
                      '患者様に合わせた個別化医療',
                    ],
                  },
                  {
                    title: 'COPD（慢性閉塞性肺疾患）',
                    description: '主に喫煙が原因で、肺の機能が低下する疾患です。長引く咳や息切れが特徴的です。早期発見と適切な治療により、進行を抑えることができます。',
                    items: [
                      '肺機能検査による診断',
                      'CT検査による肺の状態の詳細な評価',
                      '禁煙指導と薬物療法',
                      'リハビリテーションのご提案',
                    ],
                  },
                  {
                    title: '咳喘息',
                    description: '喘息の一種ですが、喘鳴や呼吸困難を伴わず、咳だけが続く疾患です。夜間や早朝に咳がひどくなることが多く、適切な治療により改善します。',
                  },
                  {
                    title: 'アトピー性咳嗽',
                    description: 'アレルギー反応による咳で、アトピー素因のある方に多く見られます。アレルギー検査により原因を特定し、適切な治療を行います。',
                  },
                  {
                    title: '感染後咳嗽',
                    description: '風邪などの感染症の後に残る咳です。通常は時間とともに改善しますが、長期間続く場合は、適切な治療が必要です。',
                  },
                  {
                    title: '逆流性食道炎',
                    description: '胃酸の逆流により、食道が刺激され、咳が起こることがあります。胃酸を抑える薬などにより、改善することが多いです。',
                  },
                ].map((item, index) => (
                  <div key={index} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    {item.items && (
                      <div className="rounded-xl border border-slate-100 bg-sky-50 p-4">
                        <h3 className="text-xs font-semibold text-slate-900 mb-2">当院での診断・治療</h3>
                        <ul className="space-y-2 text-xs text-slate-600">
                          {item.items.map((listItem, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-sky-600 mr-2">•</span>
                              <span>{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                当院の診療方針
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-sky-50 p-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  当院では、患者様お一人お一人の症状や状態に合わせた個別化医療を行っております。
                </p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2 font-semibold">✓</span>
                    <span>
                      <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 underline">
                        ラジオロジークリニック扇町
                      </Link>
                      併設の強みを活かした迅速な診断
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2 font-semibold">✓</span>
                    <span>呼吸器内科専門医による専門的な診療</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2 font-semibold">✓</span>
                    <span>患者様に分かりやすい説明と、最適な治療のご提案</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-8 space-x-4">
              <Link 
                href="/examination" 
                className="rounded-full bg-sky-600 px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 inline-block"
              >
                検査について詳しく見る
              </Link>
              <Link 
                href="/" 
                className="rounded-full border border-sky-200 px-7 py-3 text-center text-sm font-semibold text-sky-700 transition hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:ring-offset-2 inline-block"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
