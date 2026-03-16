import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
  <img src="/logo.jpg" alt="INP Innenausbau Logo" className="brand-logo" />

  <div className="brand-text">
    <strong>INP-Innenausbau</strong>
    <small>Trockenbau · Montage · Tischlerarbeiten</small>
  </div>
</NavLink>

        <nav className="nav">
          <NavLink to="/">Start</NavLink>
          <NavLink to="/ueber-uns">Über uns</NavLink>
          <NavLink to="/leistungen">Leistungen</NavLink>
          <NavLink to="/projekte">Projekte</NavLink>
          <NavLink to="/bewertungen">Bewertungen</NavLink>
          <NavLink to="/kontakt" className="nav-cta">
            Kontakt
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header