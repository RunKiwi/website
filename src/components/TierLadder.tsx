'use client';

import { Reveal } from './Reveal';
import { Cloud, Server, Check } from 'lucide-react';

type Row = { label: string; managed: string; byoc: string };

const rows: Row[] = [
  { label: 'Onboarding', managed: 'npm i kiwi && kiwi submit', byoc: 'terraform apply + a VM' },
  { label: 'Operator', managed: 'Kiwi runs the daemon', byoc: 'You run the daemon' },
  { label: 'Your code', managed: 'On Kiwi infrastructure', byoc: 'Never leaves your VPC' },
  { label: 'Credentials', managed: 'Sealed in transit & at rest', byoc: 'Zero-knowledge — we can’t decrypt' },
  { label: 'Planner', managed: 'Runs in the Control Plane', byoc: 'Runs daemon-side' },
  { label: 'You pay for', managed: 'Compute + orchestration', byoc: 'Orchestration only' },
];

export default function TierLadder() {
  return (
    <section id="tiers" className="tiers-section">
      <div className="container">
        <Reveal as="div" className="section-header">
          <span className="section-eyebrow">One product · Two operators</span>
          <h2 className="section-title">Start on our cloud. Move to yours when you outgrow trusting us.</h2>
          <p className="section-subtitle">
            The exact same daemon, protocol, and swarm. The only thing that changes is who runs the machine — so graduating is a flag, not a migration.
          </p>
        </Reveal>

        <Reveal as="div" className="tiers-grid">
          {/* Managed */}
          <div className="tier-card tier-managed">
            <div className="tier-head">
              <span className="tier-icon"><Cloud className="w-5 h-5" /></span>
              <div>
                <span className="tier-eyebrow">Default entry</span>
                <h3 className="tier-name">Managed</h3>
              </div>
            </div>
            <p className="tier-pitch">Zero setup. We host the data plane, hold your keys like any SaaS, and you ship your first PR in one command.</p>
            <code className="tier-cmd">$ npm i kiwi &amp;&amp; kiwi submit &quot;Fix issue #50&quot;</code>
            <ul className="tier-points">
              <li><Check className="w-4 h-4" /> No AWS account, no Terraform, no VM</li>
              <li><Check className="w-4 h-4" /> Bounded free tier, then usage-based</li>
              <li><Check className="w-4 h-4" /> Best way to evaluate the swarm</li>
            </ul>
          </div>

          {/* BYOC */}
          <div className="tier-card tier-byoc">
            <div className="tier-head">
              <span className="tier-icon"><Server className="w-5 h-5" /></span>
              <div>
                <span className="tier-eyebrow">Graduation</span>
                <h3 className="tier-name">Bring Your Own Cloud</h3>
              </div>
            </div>
            <p className="tier-pitch">Run the daemon in your own AWS/GCP account. Code and credentials never leave your VPC — genuine zero-knowledge, and cheaper at scale.</p>
            <code className="tier-cmd">$ terraform apply &nbsp;·&nbsp; kiwidaemon --join-token …</code>
            <ul className="tier-points">
              <li><Check className="w-4 h-4" /> Proprietary code stays in your VPC</li>
              <li><Check className="w-4 h-4" /> Credentials sealed to a key only you hold</li>
              <li><Check className="w-4 h-4" /> For compliance — and lower cost at volume</li>
            </ul>
          </div>
        </Reveal>

        {/* Comparison table */}
        <Reveal as="div" className="tiers-table-wrap">
          <table className="tiers-table">
            <thead>
              <tr>
                <th></th>
                <th>Managed</th>
                <th>BYOC</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.managed}</td>
                  <td>{r.byoc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="tiers-note">
            We&apos;re specific about this on purpose: <strong>zero-knowledge is a BYOC property.</strong> In managed mode we operate the machine that holds the key, so we can read your credentials — exactly like any hosted platform. When that matters to you, graduating to BYOC is the answer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
