import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-left">
          <div className="logo">
            <Image className="logo-icon" src="/kiwi.png" alt="Kiwi logo" width={24} height={24} />
            <span className="logo-text">Kiwi</span>
          </div>
          <p className="footer-tagline">The control plane for running LLM agents in production — isolated, cost-governed, observable, and safely resumable.</p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Product</h4>
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How It Works</Link>
            <Link href="#quickstart">Quickstart</Link>
            <Link href="#dashboard">Dashboard</Link>
          </div>

          <div className="footer-col">
            <h4>Project</h4>
            <Link href="https://github.com/runkiwi/kiwi" target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link href="#quickstart">Documentation</Link>
            <Link href="#">Releases</Link>
            <Link href="#">Discussions</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kiwi. Bring your own Anthropic key · self-hosted daemon.</p>
      </div>
    </footer>
  );
}
