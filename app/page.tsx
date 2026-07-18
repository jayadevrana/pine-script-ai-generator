import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

const serviceCards = [
  {
    title: "Pine Script Indicators",
    description:
      "Custom TradingView indicators engineered for readability, alert readiness, and non-repaint conscious behavior.",
    tags: ["Pine v6", "Indicators", "Alert-ready"],
  },
  {
    title: "Pine Script Strategies",
    description:
      "Strategy engineering for entries, exits, runners, position logic, and backtest-aware Pine workflows.",
    tags: ["Strategies", "Multi-target", "Risk logic"],
  },
  {
    title: "Strategy Debugging",
    description:
      "Fix broken logic, resolve repainting concerns, audit exit behavior, and clean up Pine scripts that need a second pass.",
    tags: ["Debugging", "Refactoring", "Validation"],
  },
  {
    title: "TradingView Alert Systems",
    description:
      "Webhook-oriented script outputs and alert payload structures for automation-friendly workflows.",
    tags: ["Alerts", "Webhooks", "Automation"],
  },
  {
    title: "MT4 / MT5 EA Development",
    description:
      "MQL-based execution systems and EA builds for traders who need Pine logic bridged into platform automation.",
    tags: ["MQL4", "MQL5", "EA systems"],
  },
  {
    title: "TradingView Automation Workflows",
    description:
      "TradingView-to-broker and tool-to-tool automation architecture for technical execution pipelines.",
    tags: ["Broker bridges", "Automation", "Integrations"],
  },
  {
    title: "Code Refactoring & Optimisation",
    description:
      "Performance, modularity, and maintainability improvements for Pine code that needs to be production-ready.",
    tags: ["Clean code", "Performance", "Modular"],
  },
];

const founderPoints = [
  "Custom Pine Script indicator development",
  "Pine Script strategy development",
  "TradingView alert-ready scripts",
  "Multi-target strategy logic",
  "ATR / RR / fixed SL-TP systems",
  "Non-repaint signal tools",
  "MT4 / MT5 EA development",
  "TradingView-to-broker automation workflows",
  "Strategy logic consulting and debugging",
];

const trustPoints = [
  "Compile-conscious generation with structured outputs",
  "Readable, modular code orientation instead of throwaway snippets",
  "Founder-led technical review and development positioning",
  "Software / IT services only — no financial advice",
];

const workspaceFlow = [
  "Prompt",
  "Blueprint",
  "Pine Code",
  "Review",
  "Refine",
];

export default function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero-grid">
        <div className="hero-card shell-panel">
          <div className="eyebrow-row">
            <p className="section-eyebrow">Founder-led Pine Script development</p>
            <span className="compliance-pill">Software / IT only</span>
          </div>

          <h1>Custom Pine Script and strategy engineering for serious TradingView workflows.</h1>
          <p className="hero-description">
            PSQPine is Jayadev Rana&apos;s AI-assisted Pine Script development studio for
            custom indicators, strategy systems, alert-ready logic, debugging, and
            automation-oriented TradingView builds.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" href="/workspace">
              Open Workspace
            </Link>
            <a
              className="button button-secondary"
              href="https://wa.me/917735268199"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Jayadev
            </a>
          </div>

          <div className="hero-trust-strip">
            <div className="trust-chip">
              <span className="trust-chip-value">Jayadev Rana</span>
              <span className="trust-chip-label">Founder</span>
            </div>
            <div className="trust-chip">
              <span className="trust-chip-value">PSQPine</span>
              <span className="trust-chip-label">Product studio</span>
            </div>
            <div className="trust-chip">
              <span className="trust-chip-value">Pine v6</span>
              <span className="trust-chip-label">Core specialization</span>
            </div>
          </div>
        </div>

        <div className="hero-side">
          <div className="shell-panel founder-profile-card">
            <p className="card-label">Founder</p>
            <h2>Jayadev Rana</h2>
            <p>
              Founder-led Pine Script and trading automation development focused on clean
              implementation, alert systems, strategy logic, and software-first delivery.
            </p>
            <div className="contact-stack">
              <a href="tel:+917732568199">Call: +91 7732568199</a>
              <a href="https://wa.me/917735268199" target="_blank" rel="noreferrer">
                WhatsApp consultation
              </a>
            </div>
          </div>

          <div className="shell-panel hero-signal-card">
            <p className="card-label">Studio capabilities</p>
            <ul className="compact-list">
              <li>TradingView alert-ready scripts</li>
              <li>Multi-target and ATR / RR exit systems</li>
              <li>Debugging and non-repaint tooling</li>
              <li>MT4 / MT5 EA and broker automation support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="brand-marquee shell-panel">
        {workspaceFlow.map((item, index) => (
          <div key={item} className="marquee-item">
            <span>{item}</span>
            {index < workspaceFlow.length - 1 ? <span className="marquee-arrow">→</span> : null}
          </div>
        ))}
      </section>

      <section id="about" className="content-split">
        <div className="shell-panel content-main">
          <SectionHeading
            eyebrow="About"
            title="A founder-led Pine Script and automation development studio."
            description="Built for traders, educators, and teams who need technical execution quality, not generic strategy fluff."
          />
          <p className="section-body">
            Jayadev Rana leads this studio as a software-focused Pine Script specialist.
            The work spans custom indicators, strategy engineering, TradingView alerts,
            EA systems, and debugging-heavy delivery where code quality matters as much
            as feature coverage.
          </p>
          <p className="section-body">
            The positioning is straightforward: technical development services for
            TradingView, Pine Script, and automation workflows. No profit promises. No
            signal-selling language. Software / IT services only.
          </p>
        </div>

        <div className="shell-panel expertise-card">
          <p className="card-label">Core expertise</p>
          <ul className="feature-list">
            {founderPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="shell-panel services-section">
        <SectionHeading
          eyebrow="Services"
          title="Productized Pine development, consulting, and automation support."
          description="Designed to feel like a premium technical studio, not a generic template marketplace."
        />

        <div className="services-grid">
          {serviceCards.map((service) => (
            <article key={service.title} className="service-card">
              <p className="card-label">{service.title}</p>
              <p>{service.description}</p>
              <div className="tag-row">
                {service.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace-preview-grid">
        <div className="shell-panel preview-copy">
          <SectionHeading
            eyebrow="Workspace"
            title="A product workspace for Pine generation, review, and refinement."
            description="Prompt-led, structured, and clearly separated between idea, blueprint, code, and review."
          />
          <div className="flow-list">
            {workspaceFlow.map((step, index) => (
              <div key={step} className="flow-step">
                <span className="flow-index">{`0${index + 1}`}</span>
                <div>
                  <h3>{step}</h3>
                  <p>
                    {step === "Prompt"
                      ? "Capture the trading logic in direct technical language."
                      : step === "Blueprint"
                        ? "Inspect assumptions and structured build intent."
                        : step === "Pine Code"
                          ? "Generate Pine Script v6 output for real editing."
                          : step === "Review"
                            ? "Check warnings, validation states, and output quality."
                            : "Iterate toward cleaner logic and better implementation."}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link className="button button-primary" href="/workspace">
            Launch the Workspace
          </Link>
        </div>

        <div className="shell-panel preview-frame">
          <div className="preview-toolbar">
            <span>Prompt brief</span>
            <span>Pine v6 studio</span>
          </div>
          <div className="preview-shell">
            <div className="preview-prompt-card">
              <p className="card-label">Prompt</p>
              <p>
                Build a Pine Script strategy with EMA momentum, ATR stops, multi-target
                exits, and alert-ready webhook fields.
              </p>
            </div>
            <div className="preview-blueprint-card">
              <p className="card-label">Blueprint</p>
              <ul className="compact-list">
                <li>Entries and exits mapped</li>
                <li>Risk mode defined</li>
                <li>Warnings separated</li>
              </ul>
            </div>
            <pre className="preview-code-card">{`//@version=6
strategy("PSQPine Preview", overlay=true)
fast = ta.ema(close, 10)
slow = ta.ema(close, 20)
longSignal = ta.crossover(fast, slow)`}</pre>
          </div>
        </div>
      </section>

      <section className="shell-panel trust-section">
        <SectionHeading
          eyebrow="Trust and expertise"
          title="Deep Pine specialization with a compile-conscious, debug-focused workflow."
          description="The product and service language should feel technical, trustworthy, and conversion-ready without drifting into trading-guru promises."
        />
        <div className="trust-grid">
          {trustPoints.map((point) => (
            <article key={point} className="trust-card">
              <h3>{point}</h3>
              <p>
                {point === "Software / IT services only — no financial advice"
                  ? "Clear compliance language is intentional throughout the experience."
                  : "This site is positioned as a technical build and consulting surface for Pine and automation work."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-grid">
        <div className="shell-panel contact-copy">
          <SectionHeading
            eyebrow="Contact"
            title="Need a custom Pine Script build, refactor, or technical consultation?"
            description="Talk directly with Jayadev Rana about custom indicators, strategies, alerts, EA systems, or TradingView automation workflows."
          />
          <p className="section-body">
            Best fit for teams and traders who already know what they want automated and
            need a reliable software execution partner to build it properly.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="https://wa.me/917735268199"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp / Call
            </a>
            <Link className="button button-secondary" href="/workspace">
              Try the Workspace
            </Link>
          </div>
        </div>

        <div className="shell-panel contact-card">
          <p className="card-label">Direct contact</p>
          <div className="contact-detail">
            <span>Founder</span>
            <strong>Jayadev Rana</strong>
          </div>
          <div className="contact-detail">
            <span>Phone / WhatsApp</span>
            <strong>+91 7732568199</strong>
          </div>
          <div className="contact-detail">
            <span>Studio</span>
            <strong>PSQPine · Pine Script Development Studio</strong>
          </div>
          <p className="compliance-note">
            Software / IT services only — no financial advice.
          </p>
        </div>
      </section>
    </div>
  );
}
