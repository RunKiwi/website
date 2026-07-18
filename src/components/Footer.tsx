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
          <p className="footer-tagline">The planner and the swarm for shipping teams. One issue in, one verified PR out — on our cloud, or in yours.</p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Product</h4>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#features">Features</Link>
            <Link href="#tiers">Managed &amp; BYOC</Link>
            <Link href="#quickstart">Quickstart</Link>
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
        <p>&copy; {new Date().getFullYear()} Kiwi. Managed cloud, or bring your own · the planner and the swarm.</p>
      </div>
    </footer>
  );
}
