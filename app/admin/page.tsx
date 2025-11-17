import { fetchClinicInfo } from '../../microcms';
import { AllFieldsDisplay } from '../components/FieldDisplay';

/**
 * デバッグ用ページ：MicroCMSから取得したすべてのフィールドを表示
 * 本番環境では削除または認証を追加してください
 */
export default async function AdminPage() {
  const clinicInfo = await fetchClinicInfo();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
          MicroCMS フィールド一覧
        </h1>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-800">
            <strong>注意：</strong>このページはデバッグ用です。MicroCMSで設定したすべてのフィールドIDとその値を確認できます。
          </p>
        </div>
        <AllFieldsDisplay data={clinicInfo} />
      </div>
    </main>
  );
}

