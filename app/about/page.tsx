import { fetchClinicInfo } from '../../microcms';
import Link from 'next/link';

const pickString = (record: Record<string, unknown>, keys: string[], fallback = '') => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return fallback;
};

export default async function AboutPage() {
  const clinicInfo = await fetchClinicInfo();

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">About</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              せき専門外来について
            </h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                長引く咳（せき）について
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-sky-50 p-6 mb-6">
                <p className="text-sm leading-relaxed text-slate-600 mb-4">
                  咳（せき）は、ウイルス・細菌・ほこりなどの異物や、肺にたまった痰（たん）を排出するための、体の自然な防御反応です。
                  そのため、特に原因がなければ、咳（せき）が長期間続くことは通常ありません。一般的なかぜであれば、熱が下がるのと同時に咳（せき）も徐々に治まっていきます。
                </p>
                <p className="text-sm leading-relaxed text-slate-900 font-semibold">
                  しかし、咳（せき）が2週間以上続く場合は、かぜ以外の疾患が原因となっている可能性があります。
                </p>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                長引く咳（せき）を放置せず、早めに医療機関を受診して、適切な診断と治療を受けることが大切です。
              </p>
            </section>

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                こんな症状はございませんか？
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-white p-6">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>天候や気温の変化で咳（せき）が悪化する</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>夜間から朝方にかけて咳（せき）がひどくなる</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>冷たい空気を吸い込むと咳き込む</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>長く話すと咳（せき）が出やすい</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>一度咳（せき）が出始めると、なかなか止まらない</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>タバコの煙を吸うと咳（せき）が出る</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>緊張すると咳（せき）が出ることがある</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2">•</span>
                    <span>軽い運動でも咳（せき）が出る</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-slate-600 mt-6 leading-relaxed">
                咳（せき）は体力だけでなく、心にも負担をかけるつらい症状です。
                だからこそ、早めに専門機関への受診をオススメしております。
              </p>
            </section>

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                長引く咳（せき）の原因
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                長期間続く咳（せき）には、さまざまな原因が考えられます。
                代表的なものには以下のような病気があります。
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: '非結核性抗酸菌症', desc: '結核菌以外の抗酸菌による感染症' },
                  { title: '気管支喘息', desc: '慢性的な気道の炎症による咳（せき）' },
                  { title: '咳喘息', desc: '喘息でも気道症状をともなわないもの' },
                  { title: 'COPD', desc: '慢性閉塞性肺疾患（喫煙などが原因）' },
                  { title: 'アトピー性咳嗽', desc: 'アレルギー反応による咳' },
                  { title: '感染後咳嗽', desc: '感染症の後に残る咳' },
                  { title: '逆流性食道炎', desc: '胃酸の逆流による咳' },
                  { title: 'その他', desc: '肺炎、肺がんなど' },
                ].map((item, index) => (
                  <div key={index} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                当院の特徴
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-sky-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700">
                    ラジオロジークリニック扇町
                  </Link>
                  併設の強み
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  当院は
                  <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 underline">
                    ラジオロジークリニック扇町
                  </Link>
                  の一区画として併設されているため、以下のような特徴があります。
                </p>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2 font-semibold">✓</span>
                    <span>X線やCT検査をすぐに実施できる</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2 font-semibold">✓</span>
                    <span>放射線科専門医がリアルタイムで読影を行うため、迅速な診断が可能</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sky-600 mr-2 font-semibold">✓</span>
                    <span>呼吸器内科専門医と放射線科専門医の連携により、より正確な診断が可能</span>
                  </li>
                </ul>
              </div>
            </section>

            <div className="text-center pt-8">
              <Link 
                href="/examination" 
                className="rounded-full bg-sky-600 px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 inline-block"
              >
                検査について詳しく見る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
