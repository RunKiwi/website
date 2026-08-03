import { Reveal } from './Reveal';

export default function ValueBanner() {
  return (
    <section className="banner-section" aria-label="What Kiwi is">
      <Reveal as="div" className="container banner-content" stagger>
        <p className="banner-positioning">
          A copilot suggests code you then have to write. A sandbox vendor rents you a box you then have to fill. <span className="text-gradient">Kiwi takes the task through to a pull request, inside a boundary you set, and hands you the record of what it did.</span>
        </p>
        <ul className="banner-trust-strip">
          <li className="trust-item">
            <span className="trust-dot" aria-hidden="true"></span>
            Model code runs with no network and no key
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
