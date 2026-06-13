import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/gsps-logo.png";

const links = [
  { label: "Residential Solutions", href: "#residential" },
  { label: "Commercial Systems", href: "#commercial" },
  { label: "ROI Breakdown", href: "#roi" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Green Sun Power Systems"
            width={48}
            height={48}
            className="h-11 w-11 object-contain drop-shadow-[0_4px_12px_rgba(193,153,68,0.35)]"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-charcoal">
              Green Sun <span className="text-[color:var(--gold)]">Power</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Systems · Cebu
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-[color:var(--gold)] after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden sm:inline-flex h-11 px-6 rounded-full bg-charcoal text-[color:var(--gold)] hover:bg-charcoal/90 border border-[color:var(--gold)]/40 shadow-[0_8px_30px_-12px_rgba(193,153,68,0.55)]"
          >
            <a href="#estimate">Get an Estimate</a>
          </Button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-2 text-foreground/80"
              >
                {l.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 h-11 rounded-full bg-charcoal text-[color:var(--gold)] hover:bg-charcoal/90"
            >
              <a href="#estimate" onClick={() => setOpen(false)}>Get an Estimate</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
