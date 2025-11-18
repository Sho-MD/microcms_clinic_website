import { fetchClinicInfo } from '../../microcms';
import Link from 'next/link';
import { FieldDisplay } from '../components/FieldDisplay';

const pickString = (record: Record<string, unknown>, keys: string[], fallback = '') => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return fallback;
};

export default async function AccessPage() {
  const clinicInfo = await fetchClinicInfo();

  const address = pickString(clinicInfo, ['address', '住所', 'address_1'], '住所情報を設定してください');
  const phone = pickString(clinicInfo, ['phone', 'tel', '電話', 'telephone'], '電話番号を設定してください');
  // 電話番号からハイフンやスペースを削除してtel:リンク用に変換
  const phoneLink = phone.replace(/[-\s]/g, '');
  
  const accessInstruction = clinicInfo.accessInstruction;
  const accessInstructionHtml = typeof accessInstruction === 'string' ? accessInstruction : null;

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Access</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              アクセス
            </h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                所在地
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">住所</h3>
                  <p className="text-sm text-slate-600">{address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">電話番号</h3>
                  <p className="text-lg font-semibold text-slate-900">
                    <Link href={`tel:${phoneLink}`} className="hover:text-sky-600 transition">
                      {phone}
                    </Link>
                  </p>
                </div>
                {accessInstructionHtml && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-slate-900 mb-4">アクセス</h3>
                    <div 
                      className="w-full rounded-2xl overflow-hidden"
                      dangerouslySetInnerHTML={{ 
                        __html: accessInstructionHtml
                      }}
                    />
                  </div>
                )}
                <div className="rounded-2xl border border-slate-100 bg-sky-50 p-4">
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-900">ご注意：</strong>当院は
                    <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 underline">
                      ラジオロジークリニック扇町
                    </Link>
                    の一区画として併設されています。
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                診療時間（せき専門外来）
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-sky-600 text-white">
                      <th className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">診療時間</th>
                      <th className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">月</th>
                      <th className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">火</th>
                      <th className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">水</th>
                      <th className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">木</th>
                      <th className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">金</th>
                      <th className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">土</th>
                      <th className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold">日/祝</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-sm text-slate-900">9:00～12:00</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center">
                        <span className="text-sky-600 font-semibold">○</span>
                        <span className="text-xs block text-red-600 mt-1 font-semibold">完全予約制</span>
                      </td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-sm text-slate-900">12:00～17:00</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center">
                        <span className="text-sky-600 font-semibold">○</span>
                        <span className="text-xs block text-red-600 mt-1 font-semibold">完全予約制</span>
                      </td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-sm text-slate-900">17:00～19:00</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center">
                        <span className="text-sky-600 font-semibold">○</span>
                        <span className="text-xs block text-red-600 mt-1 font-semibold">完全予約制</span>
                      </td>
                      <td className="border border-slate-200 px-3 sm:px-4 py-2 sm:py-3 text-center text-slate-400">×</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">
                    土曜日のせき専門外来は完全予約制です。
                  </p>
                  <p>
                    平日の
                    <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 underline">
                      ラジオロジークリニック扇町
                    </Link>
                    の診療時間については、
                    <Link href="https://radio-gazo.jp/#schedule" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 underline">
                      こちら
                    </Link>
                    をご確認ください。
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                ご予約・お問い合わせ
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-sky-50 p-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  ご予約やお問い合わせは、お電話またはWEB予約をご利用ください。
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-sky-600 font-semibold mr-3">📞</span>
                    <span className="text-sm text-slate-600">
                      お電話でのご連絡：
                      <Link href={`tel:${phoneLink}`} className="font-semibold text-slate-900 hover:text-sky-600 transition">
                        {phone}
                      </Link>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky-600 font-semibold mr-3">💻</span>
                    <span className="text-sm text-slate-600">WEB予約：準備中</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="text-center pt-8">
              <Link 
                href="/" 
                className="rounded-full bg-sky-600 px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 inline-block"
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
