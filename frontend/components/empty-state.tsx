import Image from "next/image";

type EmptyStateProps = {
  image: string;
  alt?: string;
  title: string;
  description: string;
};

export default function EmptyState({
  image,
  alt = "Empty state",
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
      <Image
        src={image}
        alt={alt}
        width={208}
        height={208}
        className="mb-6 h-52 w-52"
      />

      <div className="max-w-md space-y-2">
        <h1 className="text-lg font-semibold text-text">{title}</h1>

        <p className="text-sm leading-6 text-muted">{description}</p>
      </div>
    </div>
  );
}
