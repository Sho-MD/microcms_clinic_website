import { fetchClinicInfo } from '../../microcms';
import Link from 'next/link';
import CMSImage from '../components/CMSImage';

const pickString = (record: Record<string, unknown>, keys: string[], fallback = '') => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return fallback;
};

const toArray = <T,>(value: T[] | string[] | undefined, fallback: T[] = []): T[] => {
  if (!value) return fallback;
  if (Array.isArray(value)) return value as T[];
  return fallback;
};

export default async function DoctorPage() {
  const clinicInfo = await fetchClinicInfo();

  const doctorName = pickString(clinicInfo, ['doctorName', '医師名', 'doctor_name', 'name'], '満屋 奨');
  const doctorTitle = pickString(clinicInfo, ['doctorTitle', '役職', 'doctor_title', 'title'], '呼吸器内科専門医');
  const specialty = pickString(clinicInfo, ['specialty', '専門分野', 'specialty_field'], '呼吸器内科');
  const doctorMessage = pickString(clinicInfo, ['doctorIntroduction', 'doctor_intro', 'doctor_message', 'message'], '');
  
  const doctorPhoto = clinicInfo.doctorPhoto || clinicInfo['医師写真'] || clinicInfo['doctor_photo'];
  
  const qualifications = clinicInfo.qualifications || clinicInfo['資格'];
  const qualificationsList = toArray<string>(
    Array.isArray(qualifications) 
      ? qualifications.map((q: any) => typeof q === 'string' ? q : String(q))
      : typeof qualifications === 'string' 
        ? qualifications.split('\n').filter((q: string) => q.trim() !== '')
        : []
  );
  
  const career = clinicInfo.career || clinicInfo['経歴'];
  const careerList = toArray<string>(
    Array.isArray(career)
      ? career.map((c: any) => typeof c === 'string' ? c : String(c))
      : typeof career === 'string'
        ? career.split('\n').filter((c: string) => c.trim() !== '')
        : []
  );

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Doctor</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              医師紹介
            </h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-slate-50 flex items-center justify-center p-6 md:p-8">
                  <div className="relative w-full max-w-xs h-72 md:h-full md:aspect-square mx-auto">
                    <CMSImage
                      imageField={doctorPhoto}
                      alt={`${doctorName} ${doctorTitle}`}
                      fieldName="doctorPhoto"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 mb-2">医師</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    {doctorName}
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    {doctorTitle} | {specialty}
                  </p>
                  
                  {doctorMessage && (
                    <div className="mb-6">
                      <p className="text-sm leading-relaxed text-slate-600">{doctorMessage}</p>
                    </div>
                  )}

                  {qualificationsList.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">資格</h3>
                      <ul className="space-y-2">
                        {qualificationsList.map((q, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start">
                            <span className="text-sky-600 mr-2">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {careerList.length > 0 && (
              <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 mb-4">Career</p>
                <h3 className="text-xl font-bold text-slate-900 mb-6">経歴</h3>
                <ul className="space-y-3">
                  {careerList.map((item, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-slate-100 bg-sky-50 p-6">
              <p className="text-xs text-slate-600">
                <strong className="text-slate-900">ご注意：</strong>当院は
                <Link href="https://radio-gazo.jp/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 underline">
                  ラジオロジークリニック扇町
                </Link>
                の一区画として併設されており、{doctorName}はせき専門外来を担当する医師です。
              </p>
            </div>

            <div className="mt-12 text-center">
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
