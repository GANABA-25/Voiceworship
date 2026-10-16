import Link from "next/link";

export default function NavItems() {
  return (
    <ul className="hidden md:flex justify-center items-center gap-4 text-muted">
      <Link href="/features">Features</Link>
      <Link href="/how-it-works">How it works</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/faq">FAQ</Link>
    </ul>
  );
}
