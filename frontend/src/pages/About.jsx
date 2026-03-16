import { Link } from 'react-router-dom'
import '../styles/about.css'

function About() {
  const values = [
    {
      title: 'Qualität',
      text: 'Wir legen Wert auf saubere Ausführung, hochwertige Arbeit und präzise Ergebnisse bis ins Detail.',
    },
    {
      title: 'Zuverlässigkeit',
      text: 'Klare Absprachen, termingerechte Umsetzung und ein strukturierter Ablauf stehen bei uns im Mittelpunkt.',
    },
    {
      title: 'Sorgfalt',
      text: 'Jedes Projekt wird mit Aufmerksamkeit, Verantwortung und handwerklichem Anspruch umgesetzt.',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Beratung',
      text: 'Wir besprechen Ihr Vorhaben, Ihre Wünsche und die passende Lösung für Ihr Projekt.',
    },
    {
      number: '02',
      title: 'Planung',
      text: 'Danach strukturieren wir die Umsetzung klar, effizient und nachvollziehbar.',
    },
    {
      number: '03',
      title: 'Ausführung',
      text: 'Die Arbeiten werden sauber, präzise und mit professionellem Anspruch durchgeführt.',
    },
    {
      number: '04',
      title: 'Ergebnis',
      text: 'Am Ende erhalten Sie eine hochwertige Lösung, die funktional und optisch überzeugt.',
    },
  ]

  return (
    <>
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-content">
            <span className="about-badge">Über uns</span>
            <h1>Handwerk mit Qualität, Struktur und einem klaren Anspruch</h1>
            <p>
              INP Innenausbau steht für saubere Arbeit, präzise Umsetzung und
              verlässliche Lösungen im Bereich Innenausbau. Wir begleiten
              Projekte mit Sorgfalt, Erfahrung und einem Blick für funktionale
              und optisch hochwertige Ergebnisse.
            </p>

            <div className="about-hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Projekt anfragen
              </Link>
              <Link to="/services" className="btn btn-outline">
                Leistungen ansehen
              </Link>
            </div>
          </div>

          <div className="about-hero-card">
            <div className="about-card-panel">
              <span className="about-card-label">Unser Fokus</span>
              <h2>Innenausbau, Trockenbau, Montage und Tischlerarbeiten</h2>
              <p>
                Wir verbinden handwerkliche Präzision mit sauberer Organisation
                und einer professionellen Umsetzung für Privat- und
                Gewerbekunden.
              </p>

              <div className="about-mini-stats">
                <div>
                  <strong>Saubere Arbeit</strong>
                  <span>Strukturiert und präzise</span>
                </div>
                <div>
                  <strong>Klare Abläufe</strong>
                  <span>Transparent und verlässlich</span>
                </div>
                <div>
                  <strong>Individuelle Lösungen</strong>
                  <span>Passend zum Projekt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story section">
        <div className="container about-story-grid">
          <div className="about-story-content">
            <span className="section-tag">Unser Unternehmen</span>
            <h2>Professionelle Umsetzung statt unnötiger Komplexität</h2>
            <p>
              Unser Anspruch ist es, handwerkliche Arbeiten mit hoher Qualität
              und einer klaren, zuverlässigen Arbeitsweise umzusetzen. Dabei
              legen wir Wert auf saubere Ergebnisse, sinnvolle Lösungen und eine
              gute Zusammenarbeit mit unseren Kunden.
            </p>
            <p>
              Ob kleinere Arbeiten oder größere Innenausbau-Projekte: Wir
              arbeiten strukturiert, sorgfältig und mit Blick auf jedes Detail.
              So entstehen Lösungen, die nicht nur praktisch funktionieren,
              sondern auch optisch überzeugen.
            </p>
          </div>

          <div className="about-story-side">
            <div className="about-highlight">
              <span className="about-highlight-number">01</span>
              <div>
                <h3>Saubere Ausführung</h3>
                <p>
                  Präzises Arbeiten und ein ordentliches Ergebnis stehen bei uns
                  an erster Stelle.
                </p>
              </div>
            </div>

            <div className="about-highlight">
              <span className="about-highlight-number">02</span>
              <div>
                <h3>Klare Kommunikation</h3>
                <p>
                  Transparente Absprachen sorgen für Sicherheit und Vertrauen
                  während des gesamten Projekts.
                </p>
              </div>
            </div>

            <div className="about-highlight">
              <span className="about-highlight-number">03</span>
              <div>
                <h3>Zuverlässige Umsetzung</h3>
                <p>
                  Wir achten auf Struktur, Termine und eine saubere Durchführung
                  in jeder Projektphase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-facts section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Was uns auszeichnet</span>
            <h2>Ein Partner für hochwertige handwerkliche Lösungen</h2>
            <p>
              Unsere Arbeit basiert auf handwerklicher Sorgfalt, einem
              professionellen Ablauf und dem Ziel, für jedes Projekt eine
              passende und überzeugende Lösung zu schaffen.
            </p>
          </div>

          <div className="about-facts-grid">
            <article className="about-fact-card">
              <strong>Präzision</strong>
              <p>
                Saubere Arbeit und genaue Umsetzung für sichtbare Qualität im
                Ergebnis.
              </p>
            </article>

            <article className="about-fact-card">
              <strong>Struktur</strong>
              <p>
                Klare Prozesse und nachvollziehbare Abläufe für eine ruhige und
                professionelle Projektumsetzung.
              </p>
            </article>

            <article className="about-fact-card">
              <strong>Verlässlichkeit</strong>
              <p>
                Termintreue, ehrliche Kommunikation und ein partnerschaftlicher
                Umgang mit Kunden.
              </p>
            </article>

            <article className="about-fact-card">
              <strong>Flexibilität</strong>
              <p>
                Individuelle Lösungen, abgestimmt auf Anforderungen, Räume und
                Projektumfang.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-values section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Unsere Werte</span>
            <h2>Wofür wir bei jedem Projekt stehen</h2>
          </div>

          <div className="about-values-grid">
            {values.map((value) => (
              <article key={value.title} className="about-value-card">
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">So arbeiten wir</span>
            <h2>Ein klarer Ablauf für ein starkes Ergebnis</h2>
          </div>

          <div className="about-process-grid">
            {steps.map((step) => (
              <article key={step.number} className="about-step-card">
                <span className="about-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta section">
        <div className="container">
          <div className="about-cta-box">
            <div>
              <span className="section-tag">Jetzt Kontakt aufnehmen</span>
              <h2>Sie planen ein Projekt im Bereich Innenausbau?</h2>
              <p>
                Lassen Sie uns über Ihr Vorhaben sprechen. Wir beraten Sie gerne
                und entwickeln eine passende Lösung für Ihre Anforderungen.
              </p>
            </div>

            <div className="about-cta-actions">
              <Link to="/contact" className="btn btn-primary">
                Anfrage senden
              </Link>
              <Link to="/projects" className="btn btn-outline">
                Projekte ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About