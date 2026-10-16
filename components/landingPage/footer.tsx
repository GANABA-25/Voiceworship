import Logo from "../logo";

export default function Footer() {
  return (
    <div className="border border-border bg-card mt-24">
      <div className="max-w-360 mx-auto flex flex-col gap-12 md:flex-row md:gap-0  justify-between items-start p-12">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted">
            Voice-controlled church presentation <br /> software for modern
            worship teams.
          </p>
        </div>

        <div className="space-y-4">
          <h1 className="text-muted uppercase">Product</h1>
          <ul className="space-y-4 text-text">
            <li>Features</li>
            <li>Bible</li>
            <li>Pricing</li>
            <li>Roadmap</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h1 className="text-muted uppercase">Company</h1>
          <ul className="space-y-4 text-text">
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h1 className="text-muted uppercase">Resources</h1>
          <ul className="space-y-4 text-text">
            <li>Documentation</li>
            <li>Help Center</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h1 className="text-muted uppercase">Legal</h1>
          <ul className="space-y-4 text-text">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Security</li>
          </ul>
        </div>
      </div>

      <div className="max-w-360 mx-auto border-t border-border p-4">
        <p className="text-muted">© 2026 VoiceWorship. All rights reserved</p>
      </div>
    </div>
  );
}
