import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo">
            <Image className="logo-icon" src="/kiwi.png" alt="Kiwi Logo" width={24} height={24} />
            <span className="logo-text">Kiwi</span>
          </div>
          <p className="footer-tagline">The Universal Orchestration Layer for Enterprise AI Agents.</p>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-heading">Project</h4>
          <ul className="footer-list">
            <li><Link href="https://github.com/runkiwi/kiwi" target="_blank" rel="noopener noreferrer">GitHub</Link></li>
            <li><Link href="#">Documentation</Link></li>
            <li><Link href="#">Releases</Link></li>
            <li><Link href="#">Discussions</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Community</h4>
          <ul className="footer-list">
            <li><Link href="#">Discord Server</Link></li>
            <li><Link href="#">Twitter / X</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Contribute</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kiwi Open Source Project. Built for the Agentic Web.</p>
      </div>
    </footer>
  );
}
