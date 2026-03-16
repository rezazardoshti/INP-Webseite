import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../api/client'
import '../styles/services.css'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '')

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const normalizeImageUrl = (imageUrl) => {
    if (!imageUrl) return ''
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl
    }
    return `${BACKEND_BASE_URL}${imageUrl}`
  }

  const getPreviewText = (service) => {
    if (service.shortDescription) return service.shortDescription
    return service.description
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await apiClient.get('/services/')
        const data = Array.isArray(response.data) ? response.data : []

        const normalizedServices = data
          .filter((item) => item?.is_active)
          .map((item, index) => ({
            id: item?.id ?? index,
            title: item?.title?.trim() || 'Leistung',
            slug: item?.slug || '',
            shortDescription: item?.short_description?.trim() || '',
            description: item?.description?.trim() || '',
            image: normalizeImageUrl(item?.image || ''),
            order: item?.order ?? 0,
          }))
          .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

        setServices(normalizedServices)
      } catch (err) {
        console.error('Fehler beim Laden der Leistungen:', err)
        setServices([])
        setError('Die Leistungen konnten nicht geladen werden.')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <>
      <section className="services-hero">
        <div className="container services-hero-grid">
          <div className="services-hero-content">
            <span className="services-badge">Leistungen</span>
            <h1>Unsere Leistungen im Innenausbau</h1>
            <p>
              Wir bieten professionelle handwerkliche Leistungen mit sauberer
              Ausführung, klarer Struktur und einem hohen Anspruch an Qualität,
              Funktion und Optik.
            </p>

            <div className="services-hero-actions">
              
            </div>
          </div>

          <div className="services-hero-panel">
            <div className="services-hero-panel-inner">
              <span className="services-panel-label">Was wir bieten</span>
              <h2>Individuelle Lösungen statt Standardlösungen</h2>
              <p>
                Jede Leistung wird passend zum Projekt, zur Raumsituation und zu
                Ihren Anforderungen umgesetzt.
              </p>

              <div className="services-hero-points">
                <div>
                  <strong>Saubere Ausführung</strong>
                  <span>Präzise und ordentlich umgesetzt</span>
                </div>
                <div>
                  <strong>Klare Kommunikation</strong>
                  <span>Verlässlich in jeder Projektphase</span>
                </div>
                <div>
                  <strong>Flexible Umsetzung</strong>
                  <span>Passend zu Bedarf und Umfang</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-list-section section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Unsere Leistungen</span>
            <h2>Professionelle Lösungen für moderne Innenausbau-Projekte</h2>
            <p>
              Wir setzen auf saubere Ausführung, klare Abläufe und Ergebnisse,
              die funktional und optisch überzeugen.
            </p>
          </div>

          {loading ? (
            <div className="services-state-box">
              <p>Leistungen werden geladen ...</p>
            </div>
          ) : error ? (
            <div className="services-state-box services-state-error">
              <p>{error}</p>
            </div>
          ) : services.length === 0 ? (
            <div className="services-state-box">
              <p>Es sind aktuell noch keine aktiven Leistungen vorhanden.</p>
            </div>
          ) : (
            <div className="services-stack">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  className={`service-featured-card ${
                    index % 2 !== 0 ? 'service-featured-card-reverse' : ''
                  }`}
                >
                  <div className="service-featured-media">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-featured-image"
                      />
                    ) : (
                      <div className="service-image-placeholder">
                        <span>{service.title}</span>
                      </div>
                    )}
                  </div>

                  <div className="service-featured-content">
                    

                    <h3>{service.title}</h3>

                    {service.shortDescription && (
                      <p className="service-featured-short">
                        
                      </p>
                    )}

                    <p className="service-featured-text">
                      
                    </p>

                    <div className="service-featured-actions">
                      <Link
                        to={`/services/${service.slug}`}
                        className="btn btn-primary"
                      >
                        Mehr erfahren
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="services-info section">
        <div className="container">
          <div className="services-info-box">
            <div>
              <span className="section-tag">Qualität</span>
              <h2>Handwerkliche Leistungen mit Sorgfalt und Struktur</h2>
              <p>
                Von der Planung bis zur Ausführung achten wir auf Qualität,
                Zuverlässigkeit und eine professionelle Umsetzung für jedes
                Projekt.
              </p>
            </div>

            <div className="services-info-actions">
              <Link to="/contact" className="btn btn-primary">
                Jetzt Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services