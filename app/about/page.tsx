import { fetchClinicInfo } from '../../microcms';
import Link from 'next/link';

export default async function AboutPage() {
  const clinicInfo = await fetchClinicInfo();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
          せき専門外来について
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            長引く咳（せき）について
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              咳（せき）は、ウイルス・細菌・ほこりなどの異物や、肺にたまった痰（たん）を排出するための、体の自然な防御反応です。
              そのため、特に原因がなければ、咳（せき）が長期間続くことは通常ありません。一般的なかぜであれば、熱が下がるのと同時に咳（せき）も徐々に治まっていきます。
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              しかし、咳（せき）が2週間以上続く場合は、かぜ以外の疾患が原因となっている可能性があります。
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            長引く咳（せき）を放置せず、早めに医療機関を受診して、適切な診断と治療を受けることが大切です。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            こんな症状はございませんか？
          </h2>
          <div className="bg-white border-l-4 border-blue-900 p-6 rounded">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-900 mr-2">•</span>
                <span>天候や気温の変化で咳（せき）が悪化する</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2">•</span>
                <span>夜間から朝方にかけて咳（せき）がひどくなる</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2">•</span>
                <span>冷たい空気を吸い込むと咳き込む</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2">•</span>
                <span>長く話すと咳（せき）が出やすい</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2">•</span>
                <span>一度咳（せき）が出始めると、なかなか止まらない</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2">•</span>
                <span>タバコの煙を吸うと咳（せき）が出る</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2">•</span>
                <span>緊張すると咳（せき）が出ることがある</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2">•</span>
                <span>軽い運動でも咳（せき）が出る</span>
              </li>
            </ul>
          </div>
          <p className="text-gray-700 mt-6 leading-relaxed">
            咳（せき）は体力だけでなく、心にも負担をかけるつらい症状です。
            だからこそ、早めに専門機関への受診をオススメしております。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            長引く咳（せき）の原因
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            長期間続く咳（せき）には、さまざまな原因が考えられます。
            代表的なものには以下のような病気があります。
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="font-bold text-blue-900 mb-2">非結核性抗酸菌症</h3>
              <p className="text-gray-700 text-sm">結核菌以外の抗酸菌による感染症</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="font-bold text-blue-900 mb-2">気管支喘息</h3>
              <p className="text-gray-700 text-sm">慢性的な気道の炎症による咳（せき）</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="font-bold text-blue-900 mb-2">咳喘息</h3>
              <p className="text-gray-700 text-sm">喘息でも気道症状をともなわないもの</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="font-bold text-blue-900 mb-2">COPD</h3>
              <p className="text-gray-700 text-sm">慢性閉塞性肺疾患（喫煙などが原因）</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="font-bold text-blue-900 mb-2">アトピー性咳嗽</h3>
              <p className="text-gray-700 text-sm">アレルギー反応による咳</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="font-bold text-blue-900 mb-2">感染後咳嗽</h3>
              <p className="text-gray-700 text-sm">感染症の後に残る咳</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="font-bold text-blue-900 mb-2">逆流性食道炎</h3>
              <p className="text-gray-700 text-sm">胃酸の逆流による咳</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="font-bold text-blue-900 mb-2">その他</h3>
              <p className="text-gray-700 text-sm">肺炎、肺がんなど</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            当院の特徴
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              ラジオロジークリニック併設の強み
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              当院はラジオロジークリニックの一区画として併設されているため、以下のような特徴があります。
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-900 mr-2 font-bold">✓</span>
                <span>X線やCT検査をすぐに実施できる</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2 font-bold">✓</span>
                <span>放射線科専門医がリアルタイムで読影を行うため、迅速な診断が可能</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-900 mr-2 font-bold">✓</span>
                <span>呼吸器内科専門医と放射線科専門医の連携により、より正確な診断が可能</span>
              </li>
            </ul>
          </div>
        </section>

        <div className="text-center mt-12">
          <Link 
            href="/examination" 
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition inline-block"
          >
            検査について詳しく見る →
          </Link>
        </div>
      </div>
    </main>
  );
}

