/**
 * MicroCMS関連の設定値を一元管理します。
 * Next.jsでは実行時に `process.env` から値を参照するため、
 * ビルド前に環境変数を設定してください。
 */
const microcmsConfig = {
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
};

module.exports = microcmsConfig;


