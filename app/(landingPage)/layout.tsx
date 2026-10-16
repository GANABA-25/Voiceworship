import LandingPageNavbar from "@/components/landingPage/landing-page-navbar";
import Footer from "@/components/landingPage/footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <LandingPageNavbar />

      {children}
      <Footer />
    </div>
  );
}
