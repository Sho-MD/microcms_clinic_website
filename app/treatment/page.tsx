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

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <p className="text-sm leading-relaxed text-slate-600 mb-8">
                当院では、せきに関わる様々な疾患を専門的に診療しております。
                <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 underline">
                  ラジオロジークリニック扇町
                </Link>
                併設の強みを活かし、X線・CT検査とリアルタイム読影により、
                迅速かつ正確な診断を行い、最適な治療をご提案いたします。
              </p>

              <div className="space-y-12">
                {/* NTM Section (Expanded) */}
                <div id="ntm" className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
                  <div className="bg-sky-50 p-6 md:p-8 border-b border-sky-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      非結核性抗酸菌症（NTM）
                    </h2>
                    <p className="text-slate-700 leading-relaxed">
                      結核菌以外の「抗酸菌」という細菌による感染症です。近年、中高年の女性を中心に患者数が増加しています。
                      人から人へは感染しませんが、進行すると肺の機能が低下するため、適切な診断と治療が必要です。
                    </p>
                  </div>

                  <div className="p-6 md:p-8 space-y-8">
                    {/* Diagnosis */}
                    <section>
                      <h3 className="text-xl font-bold text-sky-700 mb-4 flex items-center">
                        <span className="bg-sky-100 p-2 rounded-lg mr-3">🔬</span>
                        診断について
                      </h3>
                      <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                        <p className="text-slate-700 mb-4">
                          診断には<strong>「菌の証明」</strong>が最も重要です。CT検査で特徴的な影があっても、どの菌によるものかを特定しなければ適切な治療薬を選べないからです。
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 items-center">
                          <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex items-start">
                              <span className="text-sky-500 mr-2 font-bold">1.</span>
                              <span><strong>喀痰検査</strong>：まずは痰を出していただき、菌がいるか調べます。</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-sky-500 mr-2 font-bold">2.</span>
                              <span><strong>胃液採取・気管支鏡</strong>：痰が出せない場合は、胃液を採取したり、連携病院（北野病院など）にて気管支鏡検査を行い、検体を採取します。</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-sky-500 mr-2 font-bold">3.</span>
                              <span><strong>菌の同定</strong>：MAC菌、カンサシ菌など、菌の種類によって治療方針が異なるため、正確に種類を特定します。</span>
                            </li>
                          </ul>
                          <div className="relative h-48 rounded-xl overflow-hidden border border-slate-200">
                            <img src="/images/ntm_diagnosis.png" alt="診断の流れ" className="object-cover w-full h-full" />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Treatment */}
                    <section>
                      <h3 className="text-xl font-bold text-sky-700 mb-4 flex items-center">
                        <span className="bg-sky-100 p-2 rounded-lg mr-3">💊</span>
                        治療について
                      </h3>
                      <div className="space-y-6">
                        <p className="text-slate-700">
                          日本の最新ガイドラインに基づき、以下の3剤を併用する標準治療を行います。
                          治療期間は長期にわたりますが、根気強く続けることが完治への近道です。
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                            <span className="block text-xs text-slate-500 mb-1">リファンピシン</span>
                            <strong className="text-lg text-slate-800">RFP</strong>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                            <span className="block text-xs text-slate-500 mb-1">エタンブトール</span>
                            <strong className="text-lg text-slate-800">EB</strong>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                            <span className="block text-xs text-slate-500 mb-1">クラリスロマイシン/アジスロマイシン</span>
                            <strong className="text-lg text-slate-800">CAM / AZM</strong>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6">
                          <h4 className="font-bold text-slate-800 mb-4">治療のスケジュール</h4>
                          <div className="mb-6 relative h-40 md:h-48 rounded-xl overflow-hidden border border-slate-200 bg-white">
                            <img src="/images/ntm_timeline.png" alt="治療タイムライン" className="object-contain w-full h-full" />
                          </div>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start">
                              <span className="text-sky-600 mr-2">•</span>
                              <span>治療開始後、<strong>3ヶ月〜半年ごと</strong>に胸部X線やCT、喀痰検査を行い、効果を判定します。</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-sky-600 mr-2">•</span>
                              <span>痰から菌が出なくなる（陰性化）を確認してから、さらに<strong>最低1年間</strong>は内服を継続します。</span>
                            </li>
                          </ul>
                        </div>

                        {/* Side Effects Toggle */}
                        <details className="group bg-orange-50 rounded-xl border border-orange-100">
                          <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-orange-800">
                            <span>⚠️ 知っておいていただきたい副作用</span>
                            <span className="transition group-open:rotate-180">▼</span>
                          </summary>
                          <div className="p-4 pt-0 text-sm text-slate-700 space-y-3 border-t border-orange-100 mt-2">
                            <p>お薬を安全に続けていただくために、以下の症状に注意してください。</p>
                            <dl className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                              <dt className="font-bold text-orange-700">RFP</dt>
                              <dd>尿や汗がオレンジ色になることがありますが、心配ありません。肝機能障害が出ることがあります。</dd>
                              <dt className="font-bold text-orange-700">EB</dt>
                              <dd>視力低下や色が見えにくくなる（視神経炎）ことがあります。定期的な眼科受診をお勧めします。</dd>
                              <dt className="font-bold text-orange-700">CAM/AZM</dt>
                              <dd>胃のむかつきや下痢などの消化器症状が出ることがあります。</dd>
                            </dl>
                            <p className="text-xs text-slate-500 mt-2">※気になる症状が出た場合は、すぐにご相談ください。</p>
                          </div>
                        </details>
                      </div>
                    </section>
                  </div>
                </div>

                {/* Other Diseases (Grid Layout) */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
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
                      items: null
                    },
                    {
                      title: 'アトピー性咳嗽',
                      description: 'アレルギー反応による咳で、アトピー素因のある方に多く見られます。アレルギー検査により原因を特定し、適切な治療を行います。',
                      items: null
                    },
                    {
                      title: '感染後咳嗽',
                      description: '風邪などの感染症の後に残る咳です。通常は時間とともに改善しますが、長期間続く場合は、適切な治療が必要です。',
                      items: null
                    },
                    {
                      title: '逆流性食道炎',
                      description: '胃酸の逆流により、食道が刺激され、咳が起こることがあります。胃酸を抑える薬などにより、改善することが多いです。',
                      items: null
                    },
                  ].map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition">
                      <h2 className="text-lg font-bold text-slate-900 mb-3">
                        {item.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      {item.items && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
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
