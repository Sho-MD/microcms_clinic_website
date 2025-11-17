import { ClinicInfo } from '../../microcms';

type FieldDisplayProps = {
  data: ClinicInfo;
  fieldId: string;
  label?: string;
  className?: string;
};

/**
 * MicroCMSのフィールドIDを指定して、その値を表示するコンポーネント
 */
export function FieldDisplay({ data, fieldId, label, className = '' }: FieldDisplayProps) {
  const value = data[fieldId];
  
  if (value === undefined || value === null || value === '') {
    return null;
  }

  // 配列の場合
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    
    return (
      <div className={className}>
        {label && <h3 className="font-bold text-blue-900 mb-2">{label}</h3>}
        <ul className="space-y-2">
          {value.map((item, index) => {
            if (typeof item === 'object' && item !== null) {
              // オブジェクトの配列の場合（例：特徴の配列）
              return (
                <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  {Object.entries(item).map(([key, val]) => (
                    <div key={key} className="mb-2">
                      <span className="font-semibold text-gray-700">{key}: </span>
                      <span className="text-gray-700">{String(val)}</span>
                    </div>
                  ))}
                </li>
              );
            }
            return (
              <li key={index} className="text-gray-700">• {String(item)}</li>
            );
          })}
        </ul>
      </div>
    );
  }

  // オブジェクトの場合
  if (typeof value === 'object' && value !== null) {
    return (
      <div className={className}>
        {label && <h3 className="font-bold text-blue-900 mb-2">{label}</h3>}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="mb-2">
              <span className="font-semibold text-gray-700">{key}: </span>
              <span className="text-gray-700">{String(val)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // HTML文字列の場合（iframeや埋め込みコードなど）
  if (typeof value === 'string' && (value.includes('<iframe') || value.includes('<script') || value.includes('embed'))) {
    return (
      <div className={className}>
        {label && <h3 className="font-bold text-blue-900 mb-2">{label}</h3>}
        <div 
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    );
  }

  // 文字列・数値などの基本型の場合
  return (
    <div className={className}>
      {label && <h3 className="font-bold text-blue-900 mb-2">{label}</h3>}
      <p className="text-gray-700">{String(value)}</p>
    </div>
  );
}

/**
 * MicroCMSから取得したデータのすべてのフィールドを一覧表示するコンポーネント
 * デバッグ用や、すべてのフィールドを確認したい場合に使用
 */
export function AllFieldsDisplay({ data }: { data: ClinicInfo }) {
  // システムフィールドを除外
  const systemFields = ['id', 'createdAt', 'updatedAt', 'publishedAt', 'revisedAt'];
  
  const customFields = Object.keys(data).filter(key => !systemFields.includes(key));
  
  if (customFields.length === 0) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-gray-700">表示するフィールドがありません。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {customFields.map(fieldId => (
        <FieldDisplay
          key={fieldId}
          data={data}
          fieldId={fieldId}
          label={fieldId}
          className="bg-gray-50 p-4 rounded-lg"
        />
      ))}
    </div>
  );
}

