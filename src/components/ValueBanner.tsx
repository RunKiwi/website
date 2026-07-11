import { Reveal } from './Reveal';

export default function ValueBanner() {
  return (
    <section className="banner-section" aria-label="What Kiwi is">
      <Reveal as="div" className="container banner-content" stagger>
        <p className="banner-positioning">
          The safest way to put AI coding agents to work — <span className="text-gradient">boxed in, watched closely, and impossible to lose.</span>
        </p>
        <ul className="banner-trust-strip">
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Secrets never leave your machine
          </li>
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Isolated &amp; network-locked
          </li>
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Never lose a run
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
