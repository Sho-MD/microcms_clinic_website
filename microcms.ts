import { createClient, MicroCMSQueries, MicroCMSListResponse } from 'microcms-js-sdk';

/**
 * MicroCMSクライアントを取得する
 * 環境変数が設定されていない場合はエラーを投げる
 */
function getClient() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain) {
    throw new Error('MICROCMS_SERVICE_DOMAIN is not defined in the environment variables.');
  }

  if (!apiKey) {
    throw new Error('MICROCMS_API_KEY is not defined in the environment variables.');
  }

  return createClient({
    serviceDomain,
    apiKey,
  });
}

export type ClinicInfo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  // 基本情報
  clinicName?: string;
  name?: string;
  医院名?: string;
  catchCopy?: string;
  キャッチコピー?: string;
  // 診療内容
  treatments?: string[];
  診療内容?: string[];
  // 特徴
  features?: Array<{
    title?: string;
    タイトル?: string;
    description?: string;
    説明?: string;
  }>;
  特徴?: Array<{
    title?: string;
    タイトル?: string;
    description?: string;
    説明?: string;
  }>;
  // 診療時間
  hours?: {
    weekday?: string;
    平日?: string;
    saturday?: string;
    土曜?: string;
    holiday?: string;
    休診?: string;
  };
  診療時間?: {
    weekday?: string;
    平日?: string;
    saturday?: string;
    土曜?: string;
    holiday?: string;
    休診?: string;
  };
  // アクセス情報
  address?: string;
  住所?: string;
  phone?: string;
  電話?: string;
  heroTitle?: string;
  hero_kicker?: string;
  heroKicker?: string;
  heroDescription?: string;
  reservationNote?: string;
  heroImage?: unknown;
  CTpicture?: unknown; // Added CTpicture field
  services?: Array<{
    title?: string;
    description?: string;
  }>;
  flow?: Array<{
    title?: string;
    description?: string;
  }>;
  news?: Array<{
    title?: string;
    date?: string;
    description?: string;
  }>;
  faq?: Array<{
    question?: string;
    answer?: string;
  }>;
  [field: string]: unknown;
};

export async function fetchClinicInfo(queries?: MicroCMSQueries): Promise<ClinicInfo> {
  const client = getClient();
  return client.get<ClinicInfo>({
    endpoint: 'information',
    queries,
  });
}

export type NewsItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title?: string;
  content?: string;
  body?: string;
  summary?: string;
  description?: string;
  date?: string; // APIスキーマのdateフィールド
  category?: string | {
    id: string;
    name?: string;
  } | null;
  [field: string]: unknown;
};

export async function fetchNewsList(queries?: MicroCMSQueries) {
  const client = getClient();
  return client.getList<NewsItem>({
    endpoint: 'news',
    queries,
  });
}

export async function fetchNewsDetail(contentId: string, queries?: MicroCMSQueries) {
  const client = getClient();
  // リッチエディタフィールドをHTML形式で取得するためのクエリを追加
  const finalQueries = {
    ...queries,
    // contentフィールドがリッチエディタの場合、HTML形式で取得
    // ただし、既にqueriesに指定がある場合は上書きしない
    ...(queries?.fields ? {} : {}),
  };
  return client.get<NewsItem>({
    endpoint: 'news',
    contentId,
    queries: finalQueries,
  });
}

