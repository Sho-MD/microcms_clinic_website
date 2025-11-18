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
    // params.newsIdを確認
    const newsId = params.newsId;
    
    // もしnewsIdが存在しない、または不正な場合は404
    if (!newsId) {
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
  if ('contents' in news && Array.isArray(news.contents) && news.contents.length > 0) {
    news = news.contents[0] as typeof news;
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
  
  // デバッグ用：開発環境でのみログ出力
  if (process.env.NODE_ENV === 'development') {
    console.log('News Detail Debug:', {
      hasContent: !!news.content,
      contentType: typeof news.content,
      contentLength: typeof news.content === 'string' ? news.content.length : 0,
      contentHtmlLength: contentHtml.length,
      allKeys: Object.keys(news),
    });
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

            {/* デバッグ情報（常に表示） */}
            <details className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
              <summary className="cursor-pointer font-semibold text-yellow-800">🔍 デバッグ情報（クリックして展開）</summary>
              <div className="mt-2 space-y-2 text-yellow-900">
                <p><strong>利用可能なフィールド:</strong> {Object.keys(news).join(', ')}</p>
                <p><strong>contentの存在:</strong> {news.content ? 'あり' : 'なし'}</p>
                <p><strong>contentの型:</strong> {typeof news.content}</p>
                <p><strong>contentの値（最初の500文字）:</strong></p>
                <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
                  {news.content 
                    ? (typeof news.content === 'string' 
                        ? news.content.substring(0, 500) 
                        : JSON.stringify(news.content, null, 2).substring(0, 500))
                    : 'contentフィールドが存在しません'}
                </pre>
                <p><strong>contentHtmlの長さ:</strong> {contentHtml.length}</p>
                <p><strong>contentHtmlが空か:</strong> {contentHtml.trim() === '' ? 'はい' : 'いいえ'}</p>
                <p><strong>contentHtml（最初の200文字）:</strong></p>
                <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
                  {contentHtml || '(空)'}
                </pre>
              </div>
            </details>

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

