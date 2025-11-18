import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchNewsDetail } from '../../../microcms';

type NewsDetailPageProps = {
  params: {
    newsId: string;
  };
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  let news;
  try {
    news = await fetchNewsDetail(params.newsId);
  } catch (error) {
    notFound();
  }

  if (!news) {
    notFound();
  }

  // 日付の取得（dateフィールド優先、なければpublishedAt）
  const dateValue = news.date || news.publishedAt;
  const displayDate = dateValue
    ? new Date(dateValue).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  // カテゴリーの取得
  const categoryName = typeof news.category === 'string' 
    ? news.category 
    : (news.category && typeof news.category === 'object' && 'name' in news.category)
      ? news.category.name
      : null;

  // contentフィールドの取得（複数の形式に対応）
  let contentHtml = '';
  
  if (typeof news.content === 'string' && news.content.trim()) {
    contentHtml = news.content;
  } else if (typeof news.body === 'string' && news.body.trim()) {
    contentHtml = news.body;
  } else if (typeof news.description === 'string' && news.description.trim()) {
    contentHtml = `<p>${news.description}</p>`;
  } else if (news.content && typeof news.content === 'object') {
    // オブジェクト形式の場合（MicroCMSのリッチエディタのブロック構造など）
    // とりあえず文字列化して表示
    contentHtml = `<pre>${JSON.stringify(news.content, null, 2)}</pre>`;
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">News</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {news.title ?? 'お知らせ'}
            </h1>
            <div className="mt-2 flex items-center gap-3">
              {displayDate && (
                <p className="text-xs font-semibold text-slate-500">{displayDate}</p>
              )}
              {categoryName && (
                <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700 font-medium">
                  {categoryName}
                </span>
              )}
            </div>

            {contentHtml ? (
              <div
                className="mt-8 text-sm leading-relaxed text-slate-700 space-y-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <p className="mt-8 text-sm text-slate-600">
                本文は近日公開予定です。
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/news"
              className="rounded-full border border-sky-200 px-7 py-3 text-sm font-semibold text-sky-700 transition hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:ring-offset-2 inline-block text-center"
            >
              お知らせ一覧へ戻る
            </Link>
            <Link
              href="/"
              className="rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 inline-block text-center"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

