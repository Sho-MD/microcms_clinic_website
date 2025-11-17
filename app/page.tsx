import { fetchClinicInfo } from '../microcms';
import Link from 'next/link';
import { FieldDisplay } from './components/FieldDisplay';

export default async function Home() {
  const clinicInfo = await fetchClinicInfo();

  // MicroCMSのフィールドIDを直接使用（複数の候補を試す）
  const getFieldValue = (fieldIds: string[], defaultValue: string = '') => {
    for (const fieldId of fieldIds) {
      const value = clinicInfo[fieldId];
      if (value && typeof value === 'string' && value.trim() !== '') {
        return value;
      }
    }
    return defaultValue;
  };

  const clinicName = getFieldValue(['name', 'clinicName', '医院名', 'clinic_name'], 'せき専門外来');
  const catchCopy = getFieldValue(['catchCopy', 'キャッチコピー', 'catch_copy'], 'ラジオロジークリニック併設 | X線・CT検査とリアルタイム読影が可能');

  return (
    <main className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4 md:mb-6">
            {clinicName}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8 px-2">
            {catchCopy}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Link 
              href="/about" 
              className="bg-blue-900 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-800 transition text-sm sm:text-base"
            >
              せき専門外来について
            </Link>
            <Link 
              href="/examination" 
              className="bg-white text-blue-900 border-2 border-blue-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-sm sm:text-base"
            >
              検査について
            </Link>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            当院の特徴
          </h2>
          {/* MicroCMSの特徴フィールドがあれば表示、なければデフォルト表示 */}
          {(clinicInfo.features || clinicInfo['特徴'] || clinicInfo['features']) ? (
            <div className="grid md:grid-cols-3 gap-8">
              {((clinicInfo.features || clinicInfo['特徴'] || clinicInfo['features']) as any[])?.map((feature: any, index: number) => (
                <div key={index} className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {feature.title || feature['タイトル'] || feature['title'] || `特徴 ${index + 1}`}
                  </h3>
                  <p className="text-gray-700">
                    {feature.description || feature['説明'] || feature['description'] || ''}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  ラジオロジークリニック併設
                </h3>
                <p className="text-gray-700">
                  当院はラジオロジークリニックの一区画として併設されており、X線やCT検査をすぐに実施できます。
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  リアルタイム読影
                </h3>
                <p className="text-gray-700">
                  放射線科専門医がリアルタイムで読影を行うため、迅速かつ正確な診断が可能です。
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl mb-4">🫁</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  呼吸器内科専門医
                </h3>
                <p className="text-gray-700">
                  呼吸器内科専門医が、せきに関わる様々な疾患を専門的に診療いたします。
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 診療内容セクション */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            診療内容
          </h2>
          {/* MicroCMSの診療内容フィールドがあれば表示、なければデフォルト表示 */}
          {(clinicInfo.treatments || clinicInfo['診療内容'] || clinicInfo['treatments']) ? (
            <div className="grid md:grid-cols-2 gap-6">
              {((clinicInfo.treatments || clinicInfo['診療内容'] || clinicInfo['treatments']) as string[])?.map((treatment: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">
                    {treatment}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  非結核性抗酸菌症
                </h3>
                <p className="text-gray-700">
                  結核菌以外の抗酸菌による感染症です。長引く咳や痰、全身倦怠感などの症状が現れます。当院ではCT検査とリアルタイム読影により、早期発見・適切な治療を行います。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  喘息
                </h3>
                <p className="text-gray-700">
                  気道の慢性的な炎症により、咳や喘鳴、呼吸困難が起こる疾患です。適切な診断と治療により、症状をコントロールし、日常生活を快適に過ごせます。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  COPD（慢性閉塞性肺疾患）
                </h3>
                <p className="text-gray-700">
                  主に喫煙が原因で、肺の機能が低下する疾患です。長引く咳や息切れが特徴的です。早期発見と適切な治療により、進行を抑えることができます。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">
                  その他せきに関わる疾患
                </h3>
                <p className="text-gray-700">
                  咳喘息、アトピー性咳嗽、感染後咳嗽、逆流性食道炎など、長引く咳の原因となる様々な疾患を診療いたします。
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 検査についてセクション */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            検査について
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                X線検査
              </h3>
              <p className="text-gray-700">
                胸部X線検査により、肺や気管支の状態を確認します。被ばく量は極めて少なく、安全に検査が可能です。
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                CT検査
              </h3>
              <p className="text-gray-700">
                より詳細な画像診断が必要な場合、CT検査を実施します。当院ではすぐにCT検査が可能なため、迅速な診断ができます。
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                リアルタイム読影
              </h3>
              <p className="text-gray-700">
                放射線科専門医がリアルタイムで画像を読影するため、検査後すぐに結果をお伝えできます。迅速な診断により、早期治療が可能です。
              </p>
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/examination" 
                className="text-blue-900 font-semibold hover:underline"
              >
                検査について詳しく見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-12 md:py-16 px-4 bg-blue-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            長引く咳でお悩みの方へ
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-blue-100 px-2">
            咳が2週間以上続く場合は、早めの受診をお勧めします。<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>当院では専門的な検査と診断により、適切な治療をご提案いたします。
          </p>
          <Link 
            href="/about" 
            className="bg-white text-blue-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block text-sm sm:text-base"
          >
            せき専門外来について詳しく見る
          </Link>
        </div>
      </section>
    </main>
  );
}
