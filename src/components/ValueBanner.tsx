import { Reveal } from './Reveal';

export default function ValueBanner() {
  return (
    <section className="banner-section" aria-label="What Kiwi is">
      <Reveal as="div" className="container banner-content" stagger>
        <p className="banner-positioning">
          Copilots hand you suggestions. Sandbox vendors hand you a box. <span className="text-gradient">Kiwi plans the work and runs the swarm—end to end.</span>
        </p>
        <ul className="banner-trust-strip">
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Planner decomposes issues into a worker DAG
          </li>
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            One job → one branch → one PR
          </li>
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Managed cloud, or your own VPC
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
