function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <h3>INP Innenausbau</h3>
          <p>
            Ihr Ansprechpartner für Trockenbau, Montage, Tischlerarbeiten und
            saubere Innenausbau-Lösungen.
          </p>
        </div>

        <div className="footer-col">
          <h4>Kontakt</h4>
          <ul className="footer-list">
            <li>Musterstraße 12, 12345 Musterstadt</li>
            <li>
              <a href="tel:+491234567890">+49 123 456 7890</a>
            </li>
            <li>
              <a href="mailto:info@inp-innenausbau.de">info@inp-innenausbau.de</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          
        </div>

        <div className="footer-col">
          <h4>Social Media</h4>
          <div className="social-links">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="social-link"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M17 3H7C4.79 3 3 4.79 3 7V17C3 19.21 4.79 21 7 21H17C19.21 21 21 19.21 21 17V7C21 4.79 19.21 3 17 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5937 13.799C15.2061 14.5458 14.5925 15.1514 13.8408 15.5291C13.089 15.9068 12.2372 16.0377 11.4068 15.903C10.5764 15.7682 9.80976 15.3748 9.21682 14.7818C8.62388 14.1889 8.23047 13.4222 8.09572 12.5918C7.96096 11.7614 8.09189 10.9096 8.46957 10.1579C8.84725 9.40614 9.45285 8.79253 10.1997 8.40493C10.9465 8.01733 11.7965 7.87524 12.6287 7.99859C13.4773 8.12444 14.2629 8.51914 14.8717 9.12791C15.4804 9.73669 15.8751 10.5223 16 11.37Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M17.5 6.5H17.51"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="social-link"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 8H16V5H13C10.79 5 9 6.79 9 9V11H7V14H9V20H12V14H15L16 11H12V9C12 8.45 12.45 8 13 8H14Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 INP Innenausbau. Alle Rechte vorbehalten.</p>
          <p>Impressum · Datenschutz</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer