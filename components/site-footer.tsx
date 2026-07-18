import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer shell-panel">
      <div className="footer-brand">
        <span className="brand-mark brand-mark-footer">JR</span>
        <div>
          <h3>Jayadev Rana</h3>
          <p>Founder-led Pine Script and trading automation development studio.</p>
        </div>
      </div>

      <div className="footer-links">
        <div>
          <h4>Studio</h4>
          <Link href="/workspace">Workspace</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#about">About</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="https://wa.me/917735268199" target="_blank" rel="noreferrer">
            WhatsApp / Call
          </a>
          <a href="tel:+917732568199">+91 7732568199</a>
          <a
            href="https://www.tradingview.com/pine-script-docs/welcome/"
            target="_blank"
            rel="noreferrer"
          >
            TradingView Pine Docs
          </a>
        </div>
      </div>

      <div className="footer-compliance">
        <p>Software / IT services only — no financial advice.</p>
        <p>Custom indicators, strategies, alerts, EA systems, and automation workflows.</p>
      </div>
    </footer>
  );
}
