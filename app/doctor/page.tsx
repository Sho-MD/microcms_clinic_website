import { fetchClinicInfo } from '../../microcms';
import Link from 'next/link';
import Image from 'next/image';

export default async function DoctorPage() {
  const clinicInfo = await fetchClinicInfo();

  // 医師情報の取得（複数のフィールドID候補を試す）
  const getFieldValue = (fieldIds: string[], defaultValue: string = '') => {
    for (const fieldId of fieldIds) {
      const value = clinicInfo[fieldId];
      if (value && typeof value === 'string' && value.trim() !== '') {
        return value;
      }
    }
    return defaultValue;
  };

  // 医師写真の取得（MicroCMSの画像フィールドに対応）
  const doctorPhoto = clinicInfo.doctorPhoto || clinicInfo['医師写真'] || clinicInfo['doctor_photo'];
  let doctorPhotoUrl: string | null = null;
  
  if (doctorPhoto) {
    if (typeof doctorPhoto === 'string') {
      doctorPhotoUrl = doctorPhoto;
    } else if (typeof doctorPhoto === 'object' && doctorPhoto !== null) {
      // MicroCMSの画像オブジェクト形式に対応
      if ('url' in doctorPhoto) {
        doctorPhotoUrl = (doctorPhoto as any).url;
      } else if ('src' in doctorPhoto) {
        doctorPhotoUrl = (doctorPhoto as any).src;
      }
    }
  }

  // 医師名
  const doctorName = getFieldValue(['doctorName', '医師名', 'doctor_name', 'name'], '満屋 奨');
  
  // 役職（院長ではなく医師として表示）
  const doctorTitle = getFieldValue(['doctorTitle', '役職', 'doctor_title', 'title'], '医師');
  
  // 専門分野
  const specialty = getFieldValue(['specialty', '専門分野', 'specialty_field'], '呼吸器内科');
  
  // 資格
  const qualifications = clinicInfo.qualifications || clinicInfo['資格'] || clinicInfo['qualifications'];
  const qualificationsList = Array.isArray(qualifications) 
    ? qualifications.map((q: any) => typeof q === 'string' ? q : String(q))
    : typeof qualifications === 'string' 
      ? qualifications.split('\n').filter((q: string) => q.trim() !== '')
      : [];
  
  // 経歴
  const career = clinicInfo.career || clinicInfo['経歴'] || clinicInfo['career'];
  const careerList = Array.isArray(career)
    ? career.map((c: any) => typeof c === 'string' ? c : String(c))
    : typeof career === 'string'
      ? career.split('\n').filter((c: string) => c.trim() !== '')
      : [];
  
  // メッセージ
  const message = getFieldValue(['message', 'メッセージ', 'doctor_message'], '');

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
          医師紹介
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* 医師写真 */}
            {doctorPhotoUrl && (
              <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4 md:p-6">
                <div className="relative w-full max-w-xs h-64 sm:h-80 md:w-full md:h-auto md:aspect-square mx-auto">
                  <Image
                    src={doctorPhotoUrl}
                    alt={`${doctorName} ${doctorTitle}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 320px, 33vw"
                  />
                </div>
              </div>
            )}
            
            {/* 医師情報 */}
            <div className={`${doctorPhotoUrl ? 'md:w-2/3' : 'w-full'} p-4 sm:p-6 md:p-8`}>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                {doctorName}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-4">
                {doctorTitle} | {specialty}
              </p>
              
              {/* 資格 */}
              {qualificationsList.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">資格</h3>
                  <ul className="space-y-2">
                    {qualificationsList.map((qualification, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="text-blue-900 mr-2">•</span>
                        <span>{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 経歴 */}
        {careerList.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">経歴</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ul className="space-y-3">
                {careerList.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-blue-900 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* メッセージ */}
        {message && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">メッセージ</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {message}
              </p>
            </div>
          </section>
        )}

        {/* 注意書き */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-sm text-gray-600">
            <strong>ご注意：</strong>当院はラジオロジークリニックの一区画として併設されており、
            満屋医師はせき専門外来を担当する医師です。
          </p>
        </div>

        <div className="text-center">
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

