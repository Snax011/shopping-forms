import PasswordInput from "./components/PasswordInput.jsx";
import SubmitButton from "./components/SubmitButton.jsx";

export default function App() {
  return (
    <main className="app-shell" aria-live="polite">
      <header className="app-header">
        <p className="eyebrow">React Events Lab</p>
        <h1>Password Input Security Monitor</h1>
        <p className="subtitle">
          This form tracks typing activity and button hover movement so a
          security engineer can plug in anti-bot logic later.
        </p>
      </header>

      <div className="app-grid">
        <section className="stack" aria-label="Password event controls">
          <PasswordInput />
          <SubmitButton />
        </section>

        <aside className="sidebar" aria-label="Component descriptions">
          <section className="status-card">
            <span className="status-badge">Component Tree</span>
            <ul className="component-map">
              <li>App</li>
              <li>PasswordInput, connected directly to App</li>
              <li>SubmitButton, connected directly to App</li>
            </ul>
          </section>

          <section className="status-card">
            <h2>Lab Notes</h2>
            <ul className="hint-list">
              <li>PasswordInput handles the input change event.</li>
              <li>SubmitButton handles mouse enter and mouse leave events.</li>
              <li>Both components expose small status updates for testing.</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}