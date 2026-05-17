/**
 * Header — site branding and tagline at the top of every page.
 * Accepts no props; purely presentational.
 */
export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-logo" aria-hidden="true">◈</span>
          <span className="header-name">DevShowcase</span>
        </div>
        <p className="header-tagline">
          A curated portfolio of modern web projects
        </p>
      </div>
    </header>
  );
}
