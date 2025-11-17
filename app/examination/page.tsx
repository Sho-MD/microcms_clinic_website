import Link from 'next/link';

export default function ExaminationPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
          検査について
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            長引く咳（せき）の検査について
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            当院では、ラジオロジークリニック併設の強みを活かし、以下のような検査を行います。
          </p>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                胸部X線検査
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                胸部のX線検査は、肺や気管支の状態を確認するために行われます。被ばく量は極めて少なく、妊婦や小児でも安全に撮影が可能です。
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>被ばく量の目安</strong>：胸部X線撮影の放射線量は約0.1mSvで、これは自然界で1日に受ける放射線量とほぼ同じです。
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                CT検査
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                より詳細な画像診断が必要な場合、CT検査を実施します。当院ではラジオロジークリニックに併設されているため、すぐにCT検査が可能です。
              </p>
              <p className="text-gray-700 leading-relaxed">
                CT検査により、X線では見つけにくい小さな病変や、より詳細な肺の状態を確認できます。
                非結核性抗酸菌症などの診断において、CT検査は非常に有用です。
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                リアルタイム読影
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                当院の最大の特徴は、<strong>放射線科専門医がリアルタイムで画像を読影する</strong>ことです。
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2 font-bold">✓</span>
                  <span>検査後すぐに結果をお伝えできます</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2 font-bold">✓</span>
                  <span>迅速な診断により、早期治療が可能です</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 mr-2 font-bold">✓</span>
                  <span>呼吸器内科専門医と放射線科専門医が連携し、より正確な診断を行います</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                肺機能検査（スパイロメーター）
              </h3>
              <p className="text-gray-700 leading-relaxed">
                気道の狭窄や閉塞の有無を確認する検査で、喘息やCOPDの診断に役立ちます。
                息を吸ったり吐いたりする際の肺の機能を測定します。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                呼気一酸化窒素濃度検査
              </h3>
              <p className="text-gray-700 leading-relaxed">
                呼気に含まれる一酸化窒素の濃度を測定し、気道の炎症（喘息）の有無を確認します。
                非侵襲的な検査で、患者様への負担が少ない検査です。
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-900">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                アレルギー検査
              </h3>
              <p className="text-gray-700 leading-relaxed">
                アレルギー反応が咳の原因であるかを調べるために行われることがあります。
                血液検査により、様々なアレルゲンに対する反応を確認します。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            長引く咳（せき）の治療について
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed mb-4">
              長引く咳（せき）の<strong>治療の基本は咳（せき）が起こる原因をつきとめること</strong>です。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              咳を引き起こす原因は複数あることもあり、患者様に合わせた個別化医療が重要となります。
            </p>
            <p className="text-gray-700 leading-relaxed">
              当院では、X線・CT検査とリアルタイム読影により、迅速かつ正確な診断を行い、
              その診断に基づいて、最適な治療をご提案いたします。
            </p>
          </div>
        </section>

        <div className="text-center mt-12 space-x-4">
          <Link 
            href="/about" 
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition inline-block"
          >
            せき専門外来について詳しく見る
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

