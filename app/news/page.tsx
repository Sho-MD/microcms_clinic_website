import Link from 'next/link';
import { fetchNewsList } from '../../microcms';

const stripHtml = (value?: string, length = 120) => {
  if (!value) return '';
  const text = value.replace(/<[^>]+>/g, '');
  return text.length > length ? `${text.slice(0, length)}…` : text;
};

export default async function NewsPage() {
  const { contents } = await fetchNewsList({
    orders: '-publishedAt',
  });

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">News</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              お知らせ一覧
            </h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {contents.length === 0 ? (
              <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center text-sm text-slate-600">
                現在公開中のお知らせはありません。
              </div>
            ) : (
              contents.map((item) => {
                // 日付の取得（dateフィールド優先、なければpublishedAt）
                const dateValue = item.date || item.publishedAt;
                const displayDate = dateValue
                  ? new Date(dateValue).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
                  : '';
                
                // カテゴリーの取得
                const categoryName = typeof item.category === 'string' 
                  ? item.category 
                  : (item.category && typeof item.category === 'object' && 'name' in item.category)
                    ? item.category.name
                    : null;
                
                // contentの全文を取得
                const fullContent = typeof item.content === 'string' ? item.content : '';
                const plainTextContent = fullContent.replace(/<[^>]+>/g, '');
                
                // 要約（120文字まで）
                const summary = stripHtml(item.content, 120);
                const isTruncated = plainTextContent.length > 120;

                return (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {displayDate && (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
                          {displayDate}
                        </p>
                      )}
                      {categoryName && (
                        <span className="text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700 font-medium">
                          {categoryName}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      <Link href={`/news/${item.id}`} className="hover:text-sky-600 transition">
                        {item.title ?? 'お知らせ'}
                      </Link>
                    </h2>
                    {summary && <p className="mt-4 text-sm text-slate-600">{summary}</p>}
                    {isTruncated && (
                      <div className="mt-6">
                        <Link
                          href={`/news/${item.id}`}
                          className="text-sm font-semibold text-sky-600 hover:text-sky-700"
                        >
                          詳細を見る →
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 inline-block"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

