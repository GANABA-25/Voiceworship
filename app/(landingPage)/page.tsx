import Link from "next/link";
import LandingPageNavbar from "./components/landing-page-navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
      <LandingPageNavbar />

      <section className="relative isolate min-h-[calc(100vh-56px)] overflow-hidden border-t border-white/8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* <div
            className="absolute inset-0 w-15 h-15 border border-primary/10"
            // style={{
            //   backgroundImage:
            //     "linear-gradient(rgba(226,169,43,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(226,169,43,0.055) 1px, transparent 1px)",
            //   backgroundSize: "48px 48px",
            //   maskImage:
            //     "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            // }}
          /> */}

          <div
            className="
    absolute inset-0
    bg-[linear-gradient(rgba(226,169,43,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(226,169,43,0.055)_1px,transparent_1px)]
    bg-[size:48px_48px]
    [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]
  "
          />

          <div className="absolute left-1/2 top-0 h-130 w-212.5 -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-[140px]" />

          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#080808]" />
        </div>
      </section>
    </main>
  );
}
