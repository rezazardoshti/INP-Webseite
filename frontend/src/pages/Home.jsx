import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../api/client'
import '../styles/home.css'

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

        const response = await apiClient.get('/galleries/')
        const galleries = Array.isArray(response.data) ? response.data : []

        const getValidImages = (currentGallery) => {
          if (!currentGallery?.media_items || !Array.isArray(currentGallery.media_items)) {
            return []
          }

          return currentGallery.media_items
            .filter(
              (item) =>
                item?.is_active &&
                item?.media_type === 'image' &&
                item?.image
            )
            .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
        }

        const homeGallery = galleries.find(
          (item) =>
            item?.is_active &&
            item?.title?.trim().toLowerCase() === 'home' &&
            getValidImages(item).length > 0
        )

        const fallbackGallery = galleries.find(
          (item) => item?.is_active && getValidImages(item).length > 0
        )

        const selectedGallery = homeGallery || fallbackGallery

        if (!selectedGallery) {
          setGallery(null)
          setError('Bitte im Backend mindestens eine aktive Gallery mit aktiven Bildern anlegen.')
          return
        }

        setGallery(selectedGallery)
      } catch (err) {
        console.error('Fehler beim Laden der Home-Gallery:', err)
        setGallery(null)
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
      .filter(
        (item) =>
          item?.is_active &&
          item?.media_type === 'image' &&
          item?.image
      )
      .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
  }, [gallery])

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides])

  useEffect(() => {
    if (slides.length === 0) {
      setActiveIndex(0)
      return
    }

    if (activeIndex >= slides.length) {
      setActiveIndex(0)
    }
  }, [activeIndex, slides.length])

  const currentSlide = slides[activeIndex]

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">INP Innenausbau</span>

            <h1>Innenausbau mit Präzision, Qualität und sauberer Ausführung</h1>

            <p>
              Wir bieten zuverlässige Lösungen in den Bereichen Trockenbau,
              Montage, Tischlerarbeiten und moderner Innenausbau –
              professionell, termingerecht und mit hoher Sorgfalt umgesetzt.
            </p>

            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Jetzt anfragen
              </Link>

              <Link to="/services" className="btn btn-outline">
                Unsere Leistungen
              </Link>
            </div>

            <div className="hero-features">
              <div className="hero-feature">
                <strong>Saubere Arbeit</strong>
                <span>Präzise und ordentlich ausgeführt</span>
              </div>

              <div className="hero-feature">
                <strong>Zuverlässige Termine</strong>
                <span>Klare Absprachen und pünktliche Umsetzung</span>
              </div>

              <div className="hero-feature">
                <strong>Individuelle Lösungen</strong>
                <span>Passend für Privat- und Gewerbekunden</span>
              </div>
            </div>
          </div>

          <div className="hero-media">
            {loading ? (
              <div className="hero-placeholder">
                <p>Startseite wird geladen ...</p>
              </div>
            ) : error ? (
              <div className="hero-placeholder">
                <p>{error}</p>
              </div>
            ) : currentSlide?.image ? (
              <div className="hero-slider">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title || gallery?.title || 'INP Innenausbau'}
                  className="hero-image"
                />

                <div className="hero-overlay">
                  
                </div>
              </div>
            ) : (
              <div className="hero-placeholder">
                <p>Bitte Bilder in der Hero-Gallery hochladen.</p>
              </div>
            )}

            {slides.length > 1 && (
              <div className="hero-dots">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id || index}
                    type="button"
                    className={`hero-dot ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section services-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Unsere Leistungen</span>
            <h2>Handwerkliche Lösungen für einen hochwertigen Innenausbau</h2>
            <p>
              Ob Ausbau, Montage oder individuelle Holzarbeiten – wir verbinden
              saubere Ausführung mit einem Blick für Funktion und Optik.
            </p>
          </div>

          <div className="services-grid">
            <article className="service-card">
              <span className="service-number">01</span>
              <h3>Trockenbau</h3>
              <p>
                Fachgerechte Wände, Decken und Raumlösungen für Wohn- und
                Gewerbeobjekte.
              </p>
            </article>

            <article className="service-card">
              <span className="service-number">02</span>
              <h3>Montage</h3>
              <p>
                Sorgfältige Montagearbeiten mit sauberer Umsetzung und
                zuverlässigem Ablauf.
              </p>
            </article>

            <article className="service-card">
              <span className="service-number">03</span>
              <h3>Tischlerarbeiten</h3>
              <p>
                Individuelle und passgenaue Holzarbeiten mit handwerklichem
                Anspruch.
              </p>
            </article>

            <article className="service-card">
              <span className="service-number">04</span>
              <h3>Innenausbau</h3>
              <p>
                Durchdachte Innenraumlösungen mit Fokus auf Qualität,
                Funktionalität und sauberes Finish.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section why-us">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Warum INP Innenausbau</span>
            <h2>Verlässliches Handwerk mit professionellem Anspruch</h2>
            <p>
              Wir setzen auf Qualität, saubere Abläufe und eine Ausführung, auf
              die sich unsere Kunden verlassen können. Von der Planung bis zum
              letzten Detail arbeiten wir strukturiert, präzise und mit einem
              hohen Anspruch an das Ergebnis.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-list">
              <div className="why-item">Saubere und präzise Arbeitsweise</div>
              <div className="why-item">Persönliche Betreuung und klare Kommunikation</div>
              <div className="why-item">Termintreue und zuverlässige Umsetzung</div>
              <div className="why-item">Passende Lösungen für jedes Projekt</div>
            </div>

            <div className="why-stats">
              <div className="why-stat">
                <h3>Qualität</h3>
                <p>Hochwertige Ausführung mit Blick auf jedes Detail.</p>
              </div>

              <div className="why-stat">
                <h3>Erfahrung</h3>
                <p>Praxisnahe Lösungen für unterschiedliche Anforderungen.</p>
              </div>

              <div className="why-stat">
                <h3>Vertrauen</h3>
                <p>Klare Absprachen und ehrliche Zusammenarbeit.</p>
              </div>

              <div className="why-stat">
                <h3>Flexibilität</h3>
                <p>Individuelle Umsetzung nach Bedarf und Projektumfang.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-box">
          <div>
            <span className="section-tag">Kontakt</span>
            <h2>Sie planen ein Projekt im Bereich Innenausbau?</h2>
            <p>
              Sprechen Sie mit uns über Ihr Vorhaben. Wir beraten Sie gerne und
              finden eine passende Lösung für Ihr Projekt.
            </p>
          </div>

          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Anfrage senden
            </Link>

            <a href="tel:+491234567890" className="btn btn-outline">
              Jetzt anrufen
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home