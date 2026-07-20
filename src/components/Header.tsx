import Link from 'next/link';
import { Logo } from './Logo';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Link href="#" className="logo" id="header-logo-link">
          <span className="logo-chip"><Logo className="logo-bird" /></span>
          <span className="logo-text">Kiwi</span>
        </Link>

        <nav className="nav-links">
          <Link href="#how-it-works" className="nav-link" id="nav-how-link">How it works</Link>
          <Link href="#features" className="nav-link" id="nav-features-link">Features</Link>
          <Link href="#tiers" className="nav-link" id="nav-tiers-link">Managed &amp; BYOC</Link>
          <Link href="#quickstart" className="nav-link" id="nav-quickstart-link">Quickstart</Link>
        </nav>

        <div className="header-actions">
          <Link href="https://app.runkiwi.dev" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" id="header-docs-btn">Sign in</Link>
          <Link href="https://app.runkiwi.dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" id="header-cta-btn">Get started</Link>
        </div>
      </div>
    </header>
  );
}
