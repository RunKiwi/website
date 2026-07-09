export default function KanbanDashboard() {
  return (
    <section id="dashboard" className="dashboard-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Interactive Kanban Control Board</h2>
          <p className="section-subtitle">
            Monitor your agent's loops, debug stack traces, edit budgets, and manage offline sessions in real-time.
          </p>
        </div>

        <div className="dashboard-mockup-wrapper">
          <div className="mockup-header-bar">
            <div className="mockup-window-controls">
              <div className="window-dot red"></div>
              <div className="window-dot yellow"></div>
              <div className="window-dot green"></div>
            </div>
            <div className="mockup-browser-url">https://dashboard.runkiwi.dev</div>
          </div>
          
          <div className="dashboard-mockup">
            <div className="sidebar">
              <div className="sidebar-item active">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                <span>Dashboard</span>
              </div>
              <div className="sidebar-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <span>Workspaces</span>
              </div>
              <div className="sidebar-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg>
                <span>Task List</span>
              </div>
              <div className="sidebar-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span>Settings</span>
              </div>
            </div>
            
            <div className="mockup-content">
              <div className="mockup-top-bar">
                <h3>Agent Tasks</h3>
                <div className="mockup-badge active">4 Running Sandbox Containers</div>
              </div>
              
              <div className="kanban-board">
                {/* Column 1 */}
                <div className="kanban-col">
                  <div className="col-header">
                    <span>ORCHESTRATING (Aider/Claude)</span>
                    <span className="count">1</span>
                  </div>
                  <div className="kanban-card paused">
                    <div className="card-tag">task-3829</div>
                    <h4 className="card-task-title">Fix AWS S3 client bucket upload issue</h4>
                    <div className="card-alert-msg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                      AWS_SECRET_ACCESS_KEY retrieved from Vault
                    </div>
                    <div className="card-footer">
                      <span>Waiting on Reviewer Persona</span>
                      <span className="avatar">U</span>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="kanban-col">
                  <div className="col-header">
                    <span>RUNNING (Multi-Agent Workloads)</span>
                    <span className="count">2</span>
                  </div>
                  <div className="kanban-card">
                    <div className="card-tag running">task-3831</div>
                    <h4 className="card-task-title">Resolve nil pointer error in database connector</h4>
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar-fill animate-progress"></div>
                    </div>
                    <div className="card-log-snippet">
                      [Coder Persona] Running `go test ./pkg/db...` (Passed 14/15)
                    </div>
                    <div className="card-footer">
                      <span>Vault Cached</span>
                      <span className="avatar active">K</span>
                    </div>
                  </div>

                  <div className="kanban-card">
                    <div className="card-tag running">task-3830</div>
                    <h4 className="card-task-title">Refactor endpoints to support pagination</h4>
                    <div className="progress-bar-wrapper">
                      <div className="progress-bar-fill animate-progress-slow"></div>
                    </div>
                    <div className="card-log-snippet">
                      [E2B Sandbox] Deploying data analysis runtime...
                    </div>
                    <div className="card-footer">
                      <span>Ecosystem Agent Online</span>
                      <span className="avatar active">K</span>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="kanban-col">
                  <div className="col-header">
                    <span>RESOLVED</span>
                    <span className="count">1</span>
                  </div>
                  <div className="kanban-card resolved">
                    <div className="card-tag completed">task-3825</div>
                    <h4 className="card-task-title">Fix divide by zero inside AverageCalculation</h4>
                    <div className="card-success-msg">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Success. Fixed code saved to zip package.
                    </div>
                    <div className="card-footer">
                      <span>Completed 20m ago</span>
                      <span className="avatar">K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
