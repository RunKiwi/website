import Link from 'next/link';
import { Logo } from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-left">
          <div className="logo">
            <span className="logo-chip"><Logo className="logo-bird" /></span>
            <span className="logo-text">Kiwi</span>
          </div>
          <p className="footer-tagline">Coding agents that run where you say. One task in, one verified PR out — contained, recorded, and on our cloud or in yours.</p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Product</h4>
            <Link href="https://app.runkiwi.dev" target="_blank" rel="noopener noreferrer">Open the app</Link>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#features">Features</Link>
            <Link href="#tiers">Managed &amp; BYOC</Link>
            <Link href="#quickstart">Quickstart</Link>
          </div>

          <div className="footer-col">
            <h4>Project</h4>
            <Link href="https://github.com/RunKiwi/kiwi" target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link href="https://docs.runkiwi.dev" target="_blank" rel="noopener noreferrer">Documentation</Link>
            <Link href="#">Releases</Link>
            <Link href="#">Discussions</Link>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden flex justify-between items-center pointer-events-none mt-8 -mb-4 select-none" style={{ fontSize: '20vw', lineHeight: 0.8, fontWeight: 900, opacity: 0.03, padding: '0 2vw' }}>
        {'RUNKIWI'.split('').map((char, i) => (
          <span key={i} className="uppercase text-white leading-none">{char}</span>
        ))}
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kiwi. Managed cloud, or bring your own · contained execution, on the record.</p>
      </div>
    </footer>
  );
}
