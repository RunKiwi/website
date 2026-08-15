import { Reveal, RevealItem } from './Reveal';

const companies = ['ACME', 'Numexa'];

export default function Companies() {
  return (
    <section className="companies-section" aria-label="Companies">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">Companies</span>
          <h2 className="section-title">Trusted by forward-thinking teams</h2>
          <p className="section-subtitle">
            Kiwi powers the containment and evidence workflows that these companies rely on.
          </p>
        </Reveal>

        <Reveal as="div" className="companies-list" stagger>
          {companies.map((name, i) => (
            <RevealItem key={i} className="company-name">
              {name}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
