import { Reveal } from './Reveal';

export default function ValueBanner() {
  return (
    <section className="banner-section" aria-label="What Kiwi is">
      <Reveal as="div" className="container banner-content" stagger>
        <p className="banner-positioning">
          Copilots hand you suggestions. Sandbox vendors hand you a box. <span className="text-gradient">Kiwi runs the work end to end—inside a boundary you set, with a record of what happened.</span>
        </p>
        <ul className="banner-trust-strip">
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Model code runs sandboxed, default-deny, key-free
          </li>
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Every edit, verdict and test run recorded
          </li>
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Your own Anthropic, OpenAI or Gemini key
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
