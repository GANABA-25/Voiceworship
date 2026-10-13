import ThemeToggle from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Welcome to My App Landing Page</h1>
      <ThemeToggle />
    </div>
  );
}
