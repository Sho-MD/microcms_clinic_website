import Image from 'next/image';

type CMSImageProps = {
  imageField: unknown;
  alt: string;
  fieldName: string;
};

const resolveImageUrl = (imageField: unknown): string | null => {
  if (!imageField) return null;
  if (typeof imageField === 'string') {
    return imageField;
  }
  if (typeof imageField === 'object' && imageField !== null) {
    const field = imageField as { url?: string; src?: string };
    return field.url ?? field.src ?? null;
  }
  return null;
};

export default function CMSImage({ imageField, alt, fieldName }: CMSImageProps) {
  const url = resolveImageUrl(imageField);

  if (url) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xs text-slate-500">
      {fieldName}（microCMS）に画像を設定すると表示されます。
    </div>
  );
}

