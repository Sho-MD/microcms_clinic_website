import { fetchClinicInfo } from '../../microcms';
import Link from 'next/link';
import { FieldDisplay } from '../components/FieldDisplay';

export default async function AccessPage() {
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

  const address = getFieldValue(['address', '住所', 'address_1'], '住所情報を設定してください');
  const phone = getFieldValue(['phone', '電話', 'tel', 'telephone'], '電話番号を設定してください');
  
  // accessInstructionフィールド（マップ）の取得
  const accessInstruction = clinicInfo.accessInstruction;
  const accessInstructionHtml = typeof accessInstruction === 'string' ? accessInstruction : null;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
          アクセス
        </h1>

        <section className="mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              所在地
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-blue-900 mb-2">住所</h3>
                <p className="text-gray-700">{address}</p>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">電話番号</h3>
                <p className="text-gray-700 text-xl">{phone}</p>
              </div>
              {/* accessInstructionフィールド（マップ）の表示 */}
              {accessInstructionHtml && (
                <div className="mt-6">
                  <h3 className="font-bold text-blue-900 mb-4">アクセス</h3>
                  <div 
                    className="w-full"
                    dangerouslySetInnerHTML={{ 
                      __html: accessInstructionHtml
                    }}
                  />
                </div>
              )}
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>ご注意</strong>：当院はラジオロジークリニックの一区画として併設されています。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            診療時間
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="border border-gray-300 px-4 py-3">診療時間</th>
                  <th className="border border-gray-300 px-4 py-3">月</th>
                  <th className="border border-gray-300 px-4 py-3">火</th>
                  <th className="border border-gray-300 px-4 py-3">水</th>
                  <th className="border border-gray-300 px-4 py-3">木</th>
                  <th className="border border-gray-300 px-4 py-3">金</th>
                  <th className="border border-gray-300 px-4 py-3">土</th>
                  <th className="border border-gray-300 px-4 py-3">日/祝</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">09:00～12:30</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">●</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">●</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">●</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">／</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">●</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="text-blue-900 font-semibold">▲</span>
                    <span className="text-xs block text-red-600 mt-1">完全予約制</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">／</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">16:00〜19:00</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">●</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">●</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">●</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">／</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">●</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">／</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">／</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">▲</span> 土曜：9:00〜13:00（<span className="text-red-600 font-semibold">完全予約制</span>）
              </p>
              <p>休診日：木曜・土曜午後・日祝日</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ご予約・お問い合わせ
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed mb-4">
              ご予約やお問い合わせは、お電話またはWEB予約をご利用ください。
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-blue-900 font-bold mr-3">📞</span>
                <span className="text-gray-700">お電話でのご連絡：{phone}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-900 font-bold mr-3">💻</span>
                <span className="text-gray-700">WEB予約：準備中</span>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center mt-12">
          <Link 
            href="/" 
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition inline-block"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

