import { fetchClinicInfo, fetchNewsList } from '../microcms';
import Link from 'next/link';
import { FieldDisplay } from './components/FieldDisplay';
import CMSImage from './components/CMSImage';

// Utility to ensure array
const toArray = <T,>(value: T[] | string[] | undefined, fallback: T[] = []): T[] => {
  if (!value) return fallback;
  if (Array.isArray(value)) return value as T[];
  return fallback;
};

// Utility to pick string
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
    limit: 3,
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
    'ラジオロジークリニック扇町'
  );
  const heroDescription = pickString(
    clinicInfo,
    ['heroDescription', 'hero_description', 'catchCopy', 'キャッチコピー'],
    '画像診断と呼吸器診療を同じ空間で完結。長引く咳の原因を即座に解明し、あなたに最適な治療を提案します。'
  );
  const reservationNote = pickString(
    clinicInfo,
    ['reservationNote', '予約案内'],
    '現在は土曜日のみ完全予約制で診療しています。'
  );
  const heroImage = clinicInfo.heroImage || clinicInfo['hero_image'] || clinicInfo['ヒーロー画像'];

  // Enhanced Services Data with Citations and Persuasive Text
  const defaultServices = [
    {
      title: '非結核性抗酸菌症 (NTM)',
      description: 'CT検査による早期発見と、喀痰検査に基づく的確な菌種同定を行います。近年増加傾向にあるこの疾患に対し、専門医がガイドラインに基づいた長期管理をサポートします。',
      stat: '国内推定患者数 8,000人超/年',
      citation: '出典: 日本結核・非結核性抗酸菌症学会 ガイドライン'
    },
    {
      title: '咳喘息・気管支喘息',
      description: '「風邪が治っても咳だけ続く」その症状、咳喘息かもしれません。呼気NO検査等で気道の炎症レベルを数値化し、適切な吸入ステロイド治療で約8割の方が症状改善を実感されています。',
      stat: '慢性咳嗽の原因 第1位',
      citation: '出典: 日本呼吸器学会 咳嗽・喀痰の診療ガイドライン2019'
    },
    {
      title: 'COPD (慢性閉塞性肺疾患)',
      description: 'タバコによる肺の生活習慣病です。スパイロメトリーによる肺年齢測定とCT画像診断を組み合わせ、早期介入で呼吸機能の低下を防ぎます。禁煙外来とも連携可能です。',
      stat: '潜在患者数 530万人以上',
      citation: '出典: NICE study (2001)'
    },
  ];

  const services = toArray<any>(
    (clinicInfo.services || clinicInfo['診療メニュー']) as any[],
    defaultServices
  );

  const flow = toArray<any>(
    (clinicInfo.flow || clinicInfo['診療フロー']) as any[],
    [
      { title: '完全予約制で待ち時間短縮', description: '現在は土曜日のみ診療。事前予約により、混雑を避けたスムーズな受診が可能です。' },
      { title: '問診・即日検査', description: '詳細な問診の後、必要に応じてCT/MRI・呼吸機能検査を同日に行います。移動の手間はありません。' },
      { title: '専門医によるダブルチェック', description: '放射線診断専門医が画像を読影し、呼吸器内科専門医が診断。見落としを防ぐ体制です。' },
      { title: '治療方針の決定', description: '診断に基づき、その日から治療を開始。吸入指導や生活習慣のアドバイスも丁寧に行います。' },
    ]
  );

  const faq = toArray<any>(
    (clinicInfo.faq || clinicInfo['FAQ']) as any[],
    [
      { question: '予約方法は？', answer: '現在は土曜日のみです。お電話で日程をご相談ください。WEB予約は準備中です。' },
      { question: '画像検査は同日に受けられますか？', answer: 'はい。ラジオロジークリニック併設のため、原則同日に撮影と読影を完了できます。これが当院の最大の特徴です。' },
    ]
  );

  const doctorMessage = pickString(
    clinicInfo,
    ['doctorIntroduction', 'doctor_intro', 'doctor_message', 'message'],
    '「咳が止まらない」という悩みは、生活の質を大きく下げます。私は呼吸器内科専門医として、画像診断の力を借りながら、その原因を徹底的に突き止めます。'
  );

  const address = pickString(clinicInfo, ['address', '住所'], '大阪府大阪市北区...');
  const phone = pickString(clinicInfo, ['phone', 'tel', '電話', 'telephone'], '06-XXXX-XXXX');
  const phoneLink = phone.replace(/[-\s]/g, '');

  return (
    <main className="min-h-screen bg-background-alt selection:bg-primary selection:text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full bg-background-soft px-4 py-1.5 text-xs font-bold text-primary mb-6 border border-sky-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {heroKicker} 併設
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl leading-[1.1]">
                {clinicName}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted max-w-xl">
                {heroDescription}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/access"
                  className="inline-flex justify-center items-center rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-sky-200 transition-all hover:bg-primary-dark hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  土曜の完全予約について
                </Link>
                <Link
                  href="/examination"
                  className="inline-flex justify-center items-center rounded-full bg-white border border-border px-8 py-4 text-base font-bold text-secondary shadow-sm transition-all hover:bg-background-alt hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2"
                >
                  検査・読影の体制
                </Link>
              </div>
              <p className="mt-4 text-xs text-foreground-muted font-medium">
                <span className="text-accent">●</span> {reservationNote}
              </p>
            </div>

            <div className="relative lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CMSImage imageField={heroImage} alt="Clinic Interior" fieldName="heroImage" className="object-cover w-full h-full scale-105 hover:scale-100 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -z-10 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/4 rounded-full bg-sky-50/50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/4 rounded-full bg-indigo-50/50 blur-3xl"></div>
      </section>

      {/* Concept Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary sm:text-4xl mb-6">
              「その咳、あきらめないでください」
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              {pickString(
                clinicInfo,
                ['concept', 'コンセプト'],
                '長引く咳の原因は様々です。当院では、高精細CTによる画像診断と、呼吸器専門医による詳細な問診を組み合わせることで、隠れた病変を見逃しません。'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '即日CT/MRI撮影', desc: '併設クリニックと連携し、受診当日に高度な画像検査が可能です。', icon: '🔍' },
              { title: 'ダブルチェック体制', desc: '放射線診断専門医と呼吸器内科専門医、2人の専門家が診断します。', icon: '👥' },
              { title: '専門的な治療', desc: '正確な診断に基づき、吸入療法や生活指導など最適な治療を行います。', icon: '💊' },
            ].map((feature, i) => (
              <div key={i} className="bg-background-alt rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background-soft">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-primary font-bold tracking-wider text-sm uppercase">Medical Services</span>
              <h2 className="text-3xl font-bold text-secondary mt-2">診療内容</h2>
            </div>
            <Link href="/treatment" className="text-primary font-bold hover:text-primary-dark transition-colors flex items-center gap-1">
              すべての診療内容を見る <span>→</span>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="text-xl font-bold text-secondary mb-4 border-b border-border pb-4">
                  {service.title ?? `診療メニュー ${index + 1}`}
                </h3>
                <p className="text-foreground leading-relaxed mb-6 flex-grow">
                  {service.description ?? '詳細な説明を準備中です。'}
                </p>

                {/* Stats & Citations */}
                <div className="mt-auto space-y-3 pt-4 border-t border-dashed border-slate-100">
                  {service.stat && (
                    <div className="flex items-center gap-2 text-sm font-bold text-accent">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      {service.stat}
                    </div>
                  )}
                  {service.citation && (
                    <p className="text-[10px] text-slate-400 text-right">
                      {service.citation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider text-sm uppercase">Flow</span>
            <h2 className="text-3xl font-bold text-secondary mt-2">受診の流れ</h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

            <div className="grid gap-8 md:grid-cols-4 relative z-10">
              {flow.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-border shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg shadow-sky-100 group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-3">{step.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="py-20 bg-background-alt">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <span className="text-primary font-bold tracking-wider text-sm uppercase">Doctor</span>
                <h2 className="text-3xl font-bold text-secondary mt-2 mb-2">
                  {pickString(clinicInfo, ['doctorName', '医師名'], '満屋 奨')}
                </h2>
                <p className="text-foreground-muted font-medium mb-6">
                  {pickString(clinicInfo, ['doctorTitle', '役職'], '呼吸器内科専門医')}
                </p>

                <div className="space-y-4 text-foreground leading-relaxed mb-8">
                  <p>{doctorMessage}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 text-sm">
                  <div>
                    <h4 className="font-bold text-secondary mb-2">資格</h4>
                    <div className="text-foreground-muted">
                      <FieldDisplay data={clinicInfo} fieldId="qualifications" label="" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-2">経歴</h4>
                    <div className="text-foreground-muted">
                      <FieldDisplay data={clinicInfo} fieldId="career" label="" />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/doctor" className="inline-flex items-center text-primary font-bold hover:underline">
                    医師紹介ページへ <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>

              <div className="order-1 md:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <CMSImage
                  imageField={clinicInfo.doctorPhoto || clinicInfo['医師写真']}
                  alt="Doctor"
                  fieldName="doctorPhoto"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-bold text-secondary">お知らせ</h2>
            <Link href="/news" className="text-sm font-bold text-primary hover:text-primary-dark">
              一覧を見る
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.length === 0 ? (
              <div className="col-span-3 py-12 text-center text-foreground-muted bg-background-alt rounded-xl border border-dashed border-slate-300">
                現在公開中のお知らせはありません。
              </div>
            ) : (
              newsItems.map((item) => {
                const dateValue = item.date || item.publishedAt;
                const displayDate = dateValue
                  ? new Date(dateValue).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
                  : '';

                return (
                  <Link key={item.id} href={`/news/${item.id}`} className="group block bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-primary/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-foreground-muted">{displayDate}</span>
                      {item.category && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-background-soft text-primary font-bold">
                          {typeof item.category === 'string' ? item.category : (item.category as any).name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                      {item.title ?? 'お知らせ'}
                    </h3>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Access & Info */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">アクセス・診療時間</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Address</h3>
                  <p className="text-lg">{address}</p>
                  <p className="text-slate-400 mt-1">
                    <a href="https://radio-gazo.jp/" target="_blank" rel="noreferrer" className="underline hover:text-primary">ラジオロジークリニック扇町</a> 内
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Tel</h3>
                  <a href={`tel:${phoneLink}`} className="text-3xl font-bold hover:text-primary transition-colors">{phone}</a>
                  <p className="text-sm text-slate-400 mt-1">お電話でのご予約・お問い合わせ</p>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Schedule</h3>
                  <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-2">
                    <span>土曜日</span>
                    <span className="font-bold text-primary">09:00 – 13:00</span>
                  </div>
                  <p className="text-xs text-slate-400 text-right">※完全予約制 / 最終受付 12:30</p>
                  <div className="mt-4 text-center text-sm bg-slate-700 py-2 rounded">
                    平日は準備中です
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[400px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
              {(() => {
                const accessInstruction = clinicInfo.accessInstruction;
                const accessInstructionHtml = typeof accessInstruction === 'string' ? accessInstruction : null;
                const mapField = clinicInfo.map;
                const mapHtml = typeof mapField === 'string' ? mapField : null;
                const mapContent = accessInstructionHtml || mapHtml;

                if (mapContent) {
                  return (
                    <div
                      className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                      dangerouslySetInnerHTML={{ __html: mapContent }}
                    />
                  );
                }
                return <div className="w-full h-full flex items-center justify-center text-slate-500">Map Loading...</div>;
              })()}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

