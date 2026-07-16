import { Reveal } from './Reveal';

export default function ValueBanner() {
  return (
    <section className="banner-section" aria-label="What Kiwi is">
      <Reveal as="div" className="container banner-content" stagger>
        <p className="banner-positioning">
          The execution engine built for scale — <span className="text-gradient">zero-knowledge, headless, and massively parallel.</span>
        </p>
        <ul className="banner-trust-strip">
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Zero-knowledge credentials
          </li>
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Bring Your Own Cloud (BYOC)
          </li>
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Millisecond worktree caching
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
