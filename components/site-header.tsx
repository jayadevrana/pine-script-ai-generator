import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/", kind: "route" },
  { label: "Workspace", href: "/workspace", kind: "route" },
  { label: "Pine Docs", href: "https://www.tradingview.com/pine-script-docs/welcome/", external: true },
  { label: "Services", href: "/#services", kind: "anchor" },
  { label: "About", href: "/#about", kind: "anchor" },
  { label: "Contact", href: "/#contact", kind: "anchor" },
];

export function SiteHeader() {
  return (
    <header className="site-header shell-panel">
      <Link className="brand" href="/">
        <span className="brand-mark">JR</span>
        <span className="brand-copy">
          <strong>Jayadev Rana</strong>
          <span>PSQPine · Pine Script Development Studio</span>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        {navLinks.map((link) =>
          link.external ? (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ) : link.kind === "route" ? (
            <Link key={link.label} href={link.href === "/" ? "/" : "/workspace"}>
              {link.label}
            </Link>
          ) : (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ),
        )}
      </nav>

      <div className="nav-actions">
        <a className="phone-link" href="tel:+917732568199">
          +91 7732568199
        </a>
        <a
          className="button button-primary"
          href="https://wa.me/917735268199"
          target="_blank"
          rel="noreferrer"
        >
          Book Consultation
        </a>
      </div>
    </header>
  );
}
