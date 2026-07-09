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
          <Link href="#how-it-works" className="nav-link" id="nav-how-link">How It Works</Link>
          <Link href="#features" className="nav-link" id="nav-features-link">Features</Link>
          <Link href="#dashboard" className="nav-link" id="nav-dashboard-link">Dashboard</Link>
          <Link href="#quickstart" className="nav-link" id="nav-quickstart-link">Quickstart</Link>
        </nav>

        <div className="header-actions">
          <Link href="#quickstart" className="btn btn-secondary btn-sm" id="header-docs-btn">Docs</Link>
          <Link href="#simulator-section" className="btn btn-primary btn-sm" id="header-cta-btn">Try Demo</Link>
        </div>
      </div>
    </header>
  );
}
