import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../api/client'
import '../styles/home.css'

const HERO_GALLERY_ID = 1

function Home() {
  const [gallery, setGallery] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchHeroGallery = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await apiClient.get(`/galleries/${HERO_GALLERY_ID}/`)
        setGallery(response.data)
      } catch (err) {
        console.error('Fehler beim Laden der Home-Gallery:', err)
        setError('Die Startseite konnte nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }

    fetchHeroGallery()
  }, [])

  const slides = useMemo(() => {
    if (!gallery?.media_items || !Array.isArray(gallery.media_items)) {
      return []
    }

    return gallery.media_items
      .filter((item) => item.is_active && item.media_type === 'image' && item.image)
      .sort((a, b) => a.order - b.order)
  }, [gallery])

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides])

  useEffect(() => {
    if (activeIndex >= slides.length && slides.length > 0) {
      setActiveIndex(0)
    }
  }, [activeIndex, slides.length])

  const currentSlide = slides[activeIndex]

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content fade-up">
            <span className="hero-badge">INP Innenausbau</span>

            <h1>
              Innenausbau mit <span>Präzision</span>, Qualität und sauberer
              Ausführung
            </h1>

            <p className="hero-text">
              Wir bieten zuverlässige Lösungen in den Bereichen Trockenbau,
              Montage, Tischlerarbeiten und moderner Innenausbau – professionell,
              termingerecht und mit hoher Sorgfalt umgesetzt.
            </p>

            <div className="hero-actions">
              <Link to="/kontakt" className="btn btn-primary">
                Jetzt anfragen
              </Link>

              <Link to="/leistungen" className="btn btn-secondary">
                Unsere Leistungen
              </Link>
            </div>

            <div className="hero-facts">
              <div className="fact-card">
                <strong>Saubere Arbeit</strong>
                <span>Präzise und ordentlich ausgeführt</span>
              </div>

              <div className="fact-card">
                <strong>Zuverlässige Termine</strong>
                <span>Klare Absprachen und pünktliche Umsetzung</span>
              </div>

              <div className="fact-card">
                <strong>Individuelle Lösungen</strong>
                <span>Passend für Privat- und Gewerbekunden</span>
              </div>
            </div>
          </div>

          <div className="hero-visual fade-up-delayed">
            <div className="hero-image-card">
              {loading ? (
                <div className="hero-loading">
                  <span>Startseite wird geladen ...</span>
                </div>
              ) : error ? (
                <div className="hero-image-placeholder">
                  <span>{error}</span>
                </div>
              ) : currentSlide?.image ? (
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title || gallery?.title || 'INP Innenausbau'}
                />
              ) : (
                <div className="hero-image-placeholder">
                  <span>Bitte Bilder in der Hero-Gallery hochladen.</span>
                </div>
              )}

              {slides.length > 1 && (
                <div className="hero-dots">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      className={`hero-dot ${index === activeIndex ? 'active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="hero-floating-box">
              <span>
                {gallery?.title || 'Trockenbau · Montage · Tischlerarbeiten'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section services-preview">
        <div className="container">
          <div className="section-head">
            <span className="section-kicker">Unsere Leistungen</span>
            <h2>Handwerkliche Lösungen für einen hochwertigen Innenausbau</h2>
            <p>
              Ob Ausbau, Montage oder individuelle Holzarbeiten – wir verbinden
              saubere Ausführung mit einem Blick für Funktion und Optik.
            </p>
          </div>

          <div className="service-grid">
            <article className="service-card">
              <div className="service-icon">01</div>
              <h3>Trockenbau</h3>
              <p>
                Fachgerechte Wände, Decken und Raumlösungen für Wohn- und
                Gewerbeobjekte.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon">02</div>
              <h3>Montage</h3>
              <p>
                Sorgfältige Montagearbeiten mit sauberer Umsetzung und
                zuverlässigem Ablauf.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon">03</div>
              <h3>Tischlerarbeiten</h3>
              <p>
                Individuelle und passgenaue Holzarbeiten mit handwerklichem
                Anspruch.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon">04</div>
              <h3>Innenausbau</h3>
              <p>
                Durchdachte Innenraumlösungen mit Fokus auf Qualität,
                Funktionalität und sauberes Finish.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-section why-us-section">
        <div className="container why-us-grid">
          <div className="why-us-content">
            <span className="section-kicker">Warum INP Innenausbau</span>
            <h2>Verlässliches Handwerk mit professionellem Anspruch</h2>
            <p>
              Wir setzen auf Qualität, saubere Abläufe und eine Ausführung, auf
              die sich unsere Kunden verlassen können. Von der Planung bis zum
              letzten Detail arbeiten wir strukturiert, präzise und mit einem
              hohen Anspruch an das Ergebnis.
            </p>

            <ul className="why-list">
              <li>Saubere und präzise Arbeitsweise</li>
              <li>Persönliche Betreuung und klare Kommunikation</li>
              <li>Termintreue und zuverlässige Umsetzung</li>
              <li>Passende Lösungen für jedes Projekt</li>
            </ul>
          </div>

          <div className="why-us-boxes">
            <div className="why-box">
              <strong>Qualität</strong>
              <p>Hochwertige Ausführung mit Blick auf jedes Detail.</p>
            </div>

            <div className="why-box">
              <strong>Erfahrung</strong>
              <p>Praxisnahe Lösungen für unterschiedliche Anforderungen.</p>
            </div>

            <div className="why-box">
              <strong>Vertrauen</strong>
              <p>Klare Absprachen und ehrliche Zusammenarbeit.</p>
            </div>

            <div className="why-box">
              <strong>Flexibilität</strong>
              <p>Individuelle Umsetzung nach Bedarf und Projektumfang.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section cta-section">
        <div className="container">
          <div className="cta-box">
            <div>
              <span className="section-kicker light">Kontakt</span>
              <h2>Sie planen ein Projekt im Bereich Innenausbau?</h2>
              <p>
                Sprechen Sie mit uns über Ihr Vorhaben. Wir beraten Sie gerne
                und finden eine passende Lösung für Ihr Projekt.
              </p>
            </div>

            <div className="cta-actions">
              <Link to="/kontakt" className="btn btn-primary light-btn">
                Anfrage senden
              </Link>

              <a href="tel:+491234567890" className="btn btn-outline-light">
                Jetzt anrufen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home