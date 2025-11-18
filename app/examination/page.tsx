import Link from 'next/link';

export default function ExaminationPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Examination</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              検査について
            </h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                長引く咳（せき）の検査について
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                当院では、ラジオロジークリニック併設の強みを活かし、以下のような検査を行います。
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: '胸部X線検査',
                    description: '胸部のX線検査は、肺や気管支の状態を確認するために行われます。被ばく量は極めて少なく、妊婦や小児でも安全に撮影が可能です。',
                    note: '被ばく量の目安：胸部X線撮影の放射線量は約0.1mSvで、これは自然界で1日に受ける放射線量とほぼ同じです。',
                  },
                  {
                    title: 'CT検査',
                    description: 'より詳細な画像診断が必要な場合、CT検査を実施します。当院ではラジオロジークリニックに併設されているため、すぐにCT検査が可能です。CT検査により、X線では見つけにくい小さな病変や、より詳細な肺の状態を確認できます。非結核性抗酸菌症などの診断において、CT検査は非常に有用です。',
                  },
                  {
                    title: '肺機能検査（スパイロメーター）',
                    description: '気道の狭窄や閉塞の有無を確認する検査で、喘息やCOPDの診断に役立ちます。息を吸ったり吐いたりする際の肺の機能を測定します。',
                  },
                  {
                    title: '呼気一酸化窒素濃度検査',
                    description: '呼気に含まれる一酸化窒素の濃度を測定し、気道の炎症（喘息）の有無を確認します。非侵襲的な検査で、患者様への負担が少ない検査です。',
                  },
                  {
                    title: 'アレルギー検査',
                    description: 'アレルギー反応が咳の原因であるかを調べるために行われることがあります。血液検査により、様々なアレルゲンに対する反応を確認します。',
                  },
                ].map((item, index) => (
                  <div key={index} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    {item.note && (
                      <div className="rounded-xl border border-slate-100 bg-sky-50 p-4">
                        <p className="text-xs text-slate-600">
                          <strong className="text-slate-900">{item.note}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="rounded-2xl border border-slate-100 bg-sky-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    リアルタイム読影
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    当院の最大の特徴は、<strong className="text-slate-900">放射線科専門医がリアルタイムで画像を読影する</strong>ことです。
                  </p>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2 font-semibold">✓</span>
                      <span>検査後すぐに結果をお伝えできます</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2 font-semibold">✓</span>
                      <span>迅速な診断により、早期治療が可能です</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2 font-semibold">✓</span>
                      <span>呼吸器内科専門医と放射線科専門医が連携し、より正確な診断を行います</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                長引く咳（せき）の治療について
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-sky-50 p-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  長引く咳（せき）の<strong className="text-slate-900">治療の基本は咳（せき）が起こる原因をつきとめること</strong>です。
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  咳を引き起こす原因は複数あることもあり、患者様に合わせた個別化医療が重要となります。
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  当院では、X線・CT検査とリアルタイム読影により、迅速かつ正確な診断を行い、
                  その診断に基づいて、最適な治療をご提案いたします。
                </p>
              </div>
            </section>

            <div className="text-center pt-8 space-x-4">
              <Link 
                href="/about" 
                className="rounded-full bg-sky-600 px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 inline-block"
              >
                せき専門外来について詳しく見る
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
