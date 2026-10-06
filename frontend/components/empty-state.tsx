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
    <div className="space-y-4 flex flex-col items-center justify-center rounded-md border border-border bg-card p-8 text-center">
      <Image
        src={image}
        alt={alt}
        width={208}
        height={208}
        className="h-20 w-20"
      />

      <div className="space-y-2">
        <h1 className="font-semibold text-text">{title}</h1>
        <p className="text-xs leading-6 text-muted">{description}</p>
      </div>
    </div>
  );
}
