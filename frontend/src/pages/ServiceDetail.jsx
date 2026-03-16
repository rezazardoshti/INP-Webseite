import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import apiClient from '../api/client'
import '../styles/service-detail.css'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '')

function ServiceDetail() {
  const { slug } = useParams()

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  const normalizeImageUrl = (imageUrl) => {
    if (!imageUrl) return ''
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl
    }
    return `${BACKEND_BASE_URL}${imageUrl}`
  }

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true)

        const response = await apiClient.get(`/services/${slug}/`)
        const item = response.data

        setService({
          ...item,
          image: normalizeImageUrl(item?.image || ''),
        })
      } catch (error) {
        console.error('Fehler beim Laden der Leistung:', error)
        setService(null)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [slug])

  const descriptionText = useMemo(() => {
    if (!service) return ''
    return service.description?.trim() || service.short_description?.trim() || ''
  }, [service])

  const shouldShowToggle = descriptionText.length > 500

  if (loading) {
    return (
      <section className="service-detail-page">
        <div className="container service-detail-state">
          <p>Leistung wird geladen ...</p>
        </div>
      </section>
    )
  }

  if (!service) {
    return (
      <section className="service-detail-page">
        <div className="container service-detail-state">
          <p>Die gewünschte Leistung wurde nicht gefunden.</p>

          <div className="service-detail-actions">
            <Link to="/services" className="btn btn-outline">
              Zurück zu Leistungen
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="service-detail-hero">
        <div className="container service-detail-hero-grid">
          <div className="service-detail-content">
            <span className="service-detail-badge">Unsere Leistung</span>

            <h1>{service.title}</h1>

            {service.short_description && (
              <p className="service-detail-short">{service.short_description}</p>
            )}

            <div className="service-detail-description-card">
              <div
                className={`service-detail-description ${
                  expanded ? 'is-expanded' : ''
                }`}
              >
                {descriptionText ? (
                  <p>{descriptionText}</p>
                ) : (
                  <p>Zu dieser Leistung ist aktuell noch keine Beschreibung vorhanden.</p>
                )}
              </div>

              {shouldShowToggle && (
                <button
                  type="button"
                  className="service-detail-toggle"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  {expanded ? 'Weniger anzeigen' : 'Mehr lesen'}
                </button>
              )}
            </div>

            <div className="service-detail-actions">
              

             <div className="service-detail-actions">
                <Link to="/services" className="btn btn-outline">
                    Zurück zu Leistungen
                </Link>
                </div>
            </div>
          </div>

          <div className="service-detail-media">
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="service-detail-image"
              />
            ) : (
              <div className="service-detail-image-placeholder">
                <span>{service.title}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="service-detail-benefits section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Ihre Vorteile</span>
            <h2>Saubere Umsetzung mit einem professionellen Anspruch</h2>
            <p>
              Bei jeder Leistung achten wir auf eine zuverlässige Planung, eine
              präzise Ausführung und ein Ergebnis, das funktional und optisch
              überzeugt.
            </p>
          </div>

          <div className="service-detail-info-grid">
            <article className="service-info-card">
              <h3>Saubere Ausführung</h3>
              <p>
                Wir arbeiten strukturiert, ordentlich und mit Blick auf jedes
                Detail, damit das Ergebnis langfristig überzeugt.
              </p>
            </article>

            <article className="service-info-card">
              <h3>Individuelle Lösungen</h3>
              <p>
                Jede Leistung wird an die Anforderungen des Projekts, die Räume
                und die gewünschte Nutzung angepasst.
              </p>
            </article>

            <article className="service-info-card">
              <h3>Zuverlässige Umsetzung</h3>
              <p>
                Klare Absprachen, sinnvolle Abläufe und eine professionelle
                Durchführung sorgen für Sicherheit im Projekt.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="service-detail-cta section">
        <div className="container">
          <div className="service-detail-cta-box">
            <div>
              <span className="section-tag">Kontakt</span>
              <h2>Sie möchten diese Leistung für Ihr Projekt nutzen?</h2>
              <p>
                Sprechen Sie mit uns über Ihr Vorhaben. Wir beraten Sie gerne
                und finden eine passende Lösung für Ihr Projekt.
              </p>
            </div>

            <div className="service-detail-actions">
              <Link to="/contact" className="btn btn-primary">
                Jetzt anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceDetail