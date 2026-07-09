export default function FeaturesGrid() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Built for Enterprise Agent Workflows</h2>
          <p className="section-subtitle">
            Secure, resilient execution that bridges the speed of the cloud with the compliance of local keys.
          </p>
        </div>

        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
            </div>
            <h3 className="feature-title">Multi-Agent Orchestration</h3>
            <p className="feature-desc">
              Move beyond simple actor-critic loops. Spawn distinct Researcher, Coder, and Data Analyst personas that share a context bus to solve complex tasks collaboratively.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="feature-title">Pluggable Sandboxes</h3>
            <p className="feature-desc">
              Bring your own runtime. Execute workloads seamlessly across built-in Docker environments, E2B cloud containers, or any custom third-party compute provider.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="feature-title">Ecosystem Integration</h3>
            <p className="feature-desc">
              Don't build everything from scratch. Leverage Kiwi's secure sandbox as a powerful orchestration backend for third-party tools like Aider, Devin, or Claude.
            </p>
          </div>

          {/* Card 4 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
            </div>
            <h3 className="feature-title">Enterprise Vault Injection</h3>
            <p className="feature-desc">
              Eliminate reverse tunneling overhead. Inject credentials directly into sandboxes securely using native integrations for HashiCorp Vault and AWS Secrets Manager.
            </p>
          </div>

          {/* Card 5 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3 className="feature-title">Ticket-Based Invocation</h3>
            <p className="feature-desc">
              Trigger complex orchestration pipelines natively from issue trackers. Feed full context directly from GitHub, Jira, or Linear using a simple `--ticket` CLI flag.
            </p>
          </div>

          {/* Card 6 */}
          <div className="feature-card">
            <div className="card-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="9" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="15" x2="21" y2="15"></line>
              </svg>
            </div>
            <h3 className="feature-title">Budget Caps & Safety</h3>
            <p className="feature-desc">
              Integrated circuit breakers detect infinite loop structures by tracking duplicate terminal output hashes. Budget caps limit token overhead to guarantee cost-controls.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
