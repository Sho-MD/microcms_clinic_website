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
                const displayDate = item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
                  : '';
                const summary =
                  item.summary ||
                  item.description ||
                  stripHtml(item.content) ||
                  stripHtml(item.body);

                return (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
                      {displayDate || '公開日未定'}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      <Link href={`/news/${item.id}`} className="hover:text-sky-600 transition">
                        {item.title ?? 'お知らせ'}
                      </Link>
                    </h2>
                    {summary && <p className="mt-4 text-sm text-slate-600">{summary}</p>}
                    <div className="mt-6">
                      <Link
                        href={`/news/${item.id}`}
                        className="text-sm font-semibold text-sky-600 hover:text-sky-700"
                      >
                        詳細を見る →
                      </Link>
                    </div>
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

