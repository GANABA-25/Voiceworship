import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>

      <p className="mt-2 text-gray-500 max-w-md">
        Sorry, the page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-md bg-primary px-6 py-3 text-white hover:opacity-90 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
