import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Link href="#" className="logo" id="header-logo-link">
          <Image className="logo-icon" src="/kiwi.png" alt="Kiwi Logo" width={32} height={32} priority />
          <span className="logo-text">Kiwi</span>
        </Link>
        
        <nav className="nav-links">
          <Link href="#how-it-works" className="nav-link" id="nav-how-link">How it works</Link>
          <Link href="#features" className="nav-link" id="nav-features-link">Features</Link>
          <Link href="#tiers" className="nav-link" id="nav-tiers-link">Managed &amp; BYOC</Link>
          <Link href="#quickstart" className="nav-link" id="nav-quickstart-link">Quickstart</Link>
        </nav>

        <div className="header-actions">
          <Link href="https://app.runkiwi.dev" className="btn btn-secondary btn-sm" id="header-docs-btn">Sign in</Link>
          <Link href="#quickstart" className="btn btn-primary btn-sm" id="header-cta-btn">Start free</Link>
        </div>
      </div>
    </header>
  );
}
