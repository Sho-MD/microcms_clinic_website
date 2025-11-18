import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchNewsDetail } from '../../../microcms';

type NewsDetailPageProps = {
  params: Promise<{
    newsId: string;
  }> | {
    newsId: string;
  };
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  // paramsがPromiseの場合は解決
  const resolvedParams = params instanceof Promise ? await params : params;
  
  let news;
  try {
    // params.newsIdを確認
    const newsId = resolvedParams.newsId;
    
    // もしnewsIdが存在しない、または不正な場合は404
    if (!newsId || typeof newsId !== 'string') {
      notFound();
    }
    
    news = await fetchNewsDetail(newsId);
  } catch (error) {
    console.error('Error fetching news detail:', error);
    notFound();
  }

  if (!news) {
    notFound();
  }
  
  // newsがリスト形式（getListの結果）の場合、contentsから最初の要素を取得
  if (news && typeof news === 'object' && 'contents' in news) {
    const listResponse = news as any;
    if (Array.isArray(listResponse.contents) && listResponse.contents.length > 0) {
      news = listResponse.contents[0];
    } else {
      // contentsが空の場合は404
      notFound();
    }
  }
  
  // newsがまだリスト形式の場合は404
  if (!news || typeof news !== 'object' || ('contents' in news && !('id' in news))) {
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
  
  // contentフィールドを優先的に取得
  const contentValue = news.content;
  
  // 文字列の場合（HTML文字列）- これが最も一般的な形式
  if (typeof contentValue === 'string') {
    contentHtml = contentValue;
  } 
  // オブジェクト形式の場合（MicroCMSのリッチエディタのブロック構造など）
  else if (contentValue && typeof contentValue === 'object') {
    // 配列の場合
    if (Array.isArray(contentValue)) {
      // ブロック構造をHTMLに変換
      const contentArray = contentValue as unknown[];
      contentHtml = contentArray.map((block: any) => {
        if (typeof block === 'string') {
          return block;
        } else if (block && typeof block === 'object') {
          // ブロックオブジェクトの場合
          if (block.html) {
            return block.html;
          } else if (block.text) {
            return `<p>${block.text}</p>`;
          } else if (block.content) {
            return typeof block.content === 'string' ? block.content : String(block.content);
          }
        }
        return '';
      }).filter(Boolean).join('');
    } 
    // 単一オブジェクトの場合
    else {
      const contentObj = contentValue as Record<string, unknown>;
      if (contentObj.html && typeof contentObj.html === 'string') {
        contentHtml = contentObj.html;
      } else if (contentObj.text && typeof contentObj.text === 'string') {
        contentHtml = `<p>${contentObj.text}</p>`;
      } else {
        // その他の場合は文字列化
        contentHtml = `<pre>${JSON.stringify(contentValue, null, 2)}</pre>`;
      }
    }
  }
  
  // contentが取得できなかった場合、他のフィールドを確認
  if (!contentHtml || contentHtml.trim() === '') {
    if (typeof news.body === 'string' && news.body.trim()) {
      contentHtml = news.body;
    } else if (typeof news.description === 'string' && news.description.trim()) {
      contentHtml = `<p>${news.description}</p>`;
    } else if (typeof news.summary === 'string' && news.summary.trim()) {
      contentHtml = `<p>${news.summary}</p>`;
    }
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

            {contentHtml && contentHtml.trim() ? (
              <div
                className="mt-8 text-sm leading-relaxed text-slate-700 space-y-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_figure]:my-4 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <div className="mt-8">
                <p className="text-sm text-slate-600 mb-4">
                  本文は近日公開予定です。
                </p>
                <p className="text-xs text-red-600">
                  ⚠️ contentが表示されていません。上記のデバッグ情報を確認してください。
                </p>
              </div>
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

