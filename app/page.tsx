import { fetchClinicInfo, fetchNewsList } from '../microcms';
import Link from 'next/link';
import { FieldDisplay } from './components/FieldDisplay';
import CMSImage from './components/CMSImage';

const toArray = <T,>(value: T[] | string[] | undefined, fallback: T[] = []): T[] => {
  if (!value) return fallback;
  if (Array.isArray(value)) return value as T[];
  return fallback;
};

const pickString = (record: Record<string, unknown>, keys: string[], fallback = '') => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return fallback;
};

export default async function Home() {
  const clinicInfo = await fetchClinicInfo();
  const newsResponse = await fetchNewsList({
    limit: 4,
    orders: '-publishedAt',
  });
  const newsItems = newsResponse.contents ?? [];

  const clinicName = pickString(
    clinicInfo,
    ['heroTitle', 'hero_title', 'name', 'clinicName', '医院名'],
    'せきとぜんそく専門外来'
  );
  const heroKicker = pickString(
    clinicInfo,
    ['heroKicker', 'hero_kicker'],
    'RADIOLOGY CLINIC ALLIANCE'
  );
  const heroDescription = pickString(
    clinicInfo,
    ['heroDescription', 'hero_description', 'catchCopy', 'キャッチコピー'],
    'ラジオロジークリニック併設の強みを活かし、画像診断と呼吸器診療を同じ空間で完結させます。'
  );
  const reservationNote = pickString(
    clinicInfo,
    ['reservationNote', '予約案内'],
    '現在は土曜日のみ完全予約制で診療しています。平日は準備中のため、最新情報は当サイトでご確認ください。'
  );
  const heroImage = clinicInfo.heroImage || clinicInfo['hero_image'] || clinicInfo['ヒーロー画像'];

  const services = toArray<any>(
    (clinicInfo.services || clinicInfo['診療メニュー']) as any[],
    [
      { title: '非結核性抗酸菌症', description: 'CT・MRIによる詳細評価と個別治療。' },
      { title: '咳喘息・喘息', description: '専門医による吸入治療と生活指導。' },
      { title: 'COPDケア', description: '呼吸リハビリと禁煙支援を組み合わせたプログラム。' },
    ]
  );

  const flow = toArray<any>(
    (clinicInfo.flow || clinicInfo['診療フロー']) as any[],
    [
      { title: '1. 完全予約制', description: '現在は土曜日のみ。予約フォーム準備中につき、お電話で受付。' },
      { title: '2. 問診と検査', description: '症状ヒアリング後、必要に応じてCT/MRI・呼吸機能検査を行います。' },
      { title: '3. 読影・診断', description: '放射線診断専門医が即時読影し、呼吸器専門医が診断。' },
      { title: '4. 治療とフォロー', description: '薬物治療とセルフケア指導を行い、再発を防ぎます。' },
    ]
  );

  const faq = toArray<any>(
    (clinicInfo.faq || clinicInfo['FAQ']) as any[],
    [
      { question: '予約方法は？', answer: '現在は土曜日のみです。お電話で日程をご相談ください。WEB予約は準備中です。' },
      { question: '画像検査は同日に受けられますか？', answer: 'ラジオロジークリニック併設のため、原則同日に撮影と読影を完了できます。' },
    ]
  );

  const doctorMessage = pickString(
    clinicInfo,
    ['doctorIntroduction', 'doctor_intro', 'doctor_message', 'message'],
    '呼吸器内科専門医・満屋 奨が、長引く咳やぜんそくの悩みに寄り添います。'
  );

  const address = pickString(clinicInfo, ['address', '住所'], '大阪府大阪市北区...');
  const phone = pickString(clinicInfo, ['phone', 'tel', '電話', 'telephone'], '06-XXXX-XXXX');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-600">{heroKicker}</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              {clinicName}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
              {heroDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/access"
                className="rounded-full bg-sky-600 px-7 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                土曜の完全予約について
              </Link>
              <Link
                href="/examination"
                className="rounded-full border border-sky-200 px-7 py-3 text-center text-sm font-semibold text-sky-700 transition hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:ring-offset-2"
              >
                検査・読影の体制
              </Link>
            </div>
            <p className="mt-5 text-xs text-slate-500">{reservationNote}</p>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-inner md:h-[420px]">
            <CMSImage imageField={heroImage} alt="Hero" fieldName="heroImage" />
          </div>
        </div>
      </section>

      {/* Ribbon */}
      <section className="bg-sky-50">
        <div className="container mx-auto px-4 py-6 text-center">
          <span className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-sky-700 shadow-sm">
            平日は準備中 ／ 土曜日のみ完全予約制
          </span>
          <p className="mt-3 text-xs text-slate-500">予約フォーム公開まではお電話にて承ります。</p>
        </div>
      </section>

      {/* Concept & Services */}
      <section className="bg-white">
        <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">当院について</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              {pickString(
                clinicInfo,
                ['concept', 'コンセプト'],
                '画像診断と呼吸器診療を同じ空間で完結させ、長引く咳に迅速に対応します。'
              )}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-sky-50 p-4">
                <p className="text-xs font-semibold text-sky-600">即日読影</p>
                <p className="mt-2 text-sm text-slate-600">放射線診断専門医がその場で画像を解析し、診断までスムーズ。</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-sky-600">呼吸器内科専門</p>
                <p className="mt-2 text-sm text-slate-600">呼吸器内科専門医・満屋 奨が長引く咳とぜんそくに特化して診療します。</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Services</p>
            <div className="mt-4 space-y-4">
              {services.map((service, index) => (
                <div key={service.title ?? index} className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{service.title ?? `メニュー ${index + 1}`}</p>
                  <p className="mt-2 text-xs text-slate-600">
                    {service.description ?? 'microCMSの services フィールドに説明を追加してください。'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="bg-sky-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Flow</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">診療の流れ</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {flow.map((step, index) => (
              <div key={index} className="rounded-3xl bg-white p-5 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 text-sm font-semibold text-slate-900">{step.title ?? `ステップ ${index + 1}`}</p>
                <p className="mt-2 text-xs text-slate-600">
                  {step.description ?? 'microCMSの flow フィールドに説明を入力してください。'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor */}
      <section className="bg-white">
        <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 md:items-center">
          <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-slate-100 shadow-inner md:h-96">
            <CMSImage
              imageField={clinicInfo.doctorPhoto || clinicInfo['医師写真']}
              alt="医師写真"
              fieldName="doctorPhoto"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Doctor</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {pickString(clinicInfo, ['doctorName', '医師名'], '満屋 奨')}
            </h2>
            <p className="text-xs text-slate-500">
              {pickString(clinicInfo, ['doctorTitle', '役職'], '呼吸器内科専門医')}
            </p>
            <p className="mt-4 text-sm text-slate-600">{doctorMessage}</p>
            <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <FieldDisplay data={clinicInfo} fieldId="qualifications" label="資格（microCMS）" />
              <FieldDisplay data={clinicInfo} fieldId="career" label="経歴（microCMS）" />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-sky-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="rounded-3xl border border-sky-200/30 bg-sky-800/70 p-8 shadow-lg">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">Schedule</p>
                <h2 className="mt-2 text-2xl font-bold">診療日時</h2>
                <p className="mt-3 text-sm text-sky-100">{reservationNote}</p>
              </div>
              <div className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm">
                <p className="text-xs font-semibold text-sky-600">現在の診療</p>
                <p className="mt-2 text-lg font-bold">土曜 09:00 – 13:00（完全予約制）</p>
                <p className="text-xs text-slate-500">最終受付 12:30 ／ 平日は準備中</p>
              </div>
            </div>
            <div className="mt-6 border-t border-sky-700 pt-4 text-xs text-sky-200">
              予約フォーム公開までは <span className="font-semibold text-white">{phone}</span> へご連絡ください。
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">News</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">お知らせ</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {newsItems.length === 0 ? (
              <div className="col-span-2 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center text-sm text-slate-600">
                現在公開中のお知らせはありません。
              </div>
            ) : (
              newsItems.map((item) => {
                const displayDate = item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
                  : '';
                const summary =
                  item.summary ||
                  item.description ||
                  (typeof item.content === 'string' ? item.content.replace(/<[^>]+>/g, '').slice(0, 80) : '') ||
                  (typeof item.body === 'string' ? item.body.replace(/<[^>]+>/g, '').slice(0, 80) : '');
                return (
                  <div key={item.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold text-sky-600">{displayDate || '公開日未定'}</p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">{item.title ?? 'お知らせ'}</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {summary || '詳細は本文をご確認ください。'}
                    </p>
                    <div className="mt-4">
                      <Link
                        href={`/news/${item.id}`}
                        className="text-sm font-semibold text-sky-600 hover:text-sky-700"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/news"
              className="rounded-full border border-sky-200 px-7 py-3 text-sm font-semibold text-sky-700 transition hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:ring-offset-2 inline-block"
            >
              過去のお知らせ一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sky-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">FAQ</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">よくある質問</h2>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faq.map((item, index) => (
              <details key={index} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                  {item.question ?? `質問 ${index + 1}`}
                  <span className="text-sky-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">
                  {item.answer ?? 'microCMSの faq フィールドに回答を入力してください。'}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="bg-white">
        <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Access</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">アクセス</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">所在地：</span>
                {address}
              </p>
              <p>
                <span className="font-semibold text-slate-900">電話：</span>
                {phone}
              </p>
              <p>ラジオロジークリニック扇町 内区画で診療しています。</p>
            </div>
            <div className="mt-6 text-sm text-slate-600">
              <FieldDisplay data={clinicInfo} fieldId="accessInstruction" label="アクセス案内（microCMS）" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <div className="h-72 w-full overflow-hidden rounded-2xl bg-white">
              <FieldDisplay data={clinicInfo} fieldId="map" label="map フィールドにGoogle Mapを追加" />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              map もしくは accessInstruction フィールドに埋め込みコードを設定すると表示されます。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

