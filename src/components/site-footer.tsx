import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/gsps-logo.png";

const nav = [
  { label: "Residential Solutions", href: "#residential" },
  { label: "Commercial Systems", href: "#commercial" },
  { label: "ROI Breakdown", href: "#roi" },
  { label: "Get an Estimate", href: "#estimate" },
];

const contact = [
  { icon: Phone, value: "+63 920 255 4453", href: "tel:+639202554453" },
  { icon: Mail, value: "sales@greensunsolarpower.com", href: "mailto:sales@greensunsolarpower.com" },
  { icon: MapPin, value: "Cebu City, Philippines" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-charcoal text-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[color:var(--gold)]/10 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10 relative">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Green Sun Power Systems"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <div className="leading-tight">
                <div className="font-display text-xl font-semibold text-white">
                  Green Sun <span className="text-[color:var(--gold)]">Power</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Systems · Cebu, Philippines
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/65 max-w-md">
              Cebu's premier partner for clean power. Premium residential and
              industrial solar engineered to harness the energy of the Visayas.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/80 hover:text-[color:var(--gold)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Contact
            </p>
            <ul className="mt-5 space-y-4">
              {contact.map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-[color:var(--gold)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  {href ? (
                    <a href={href} className="text-sm text-white/85 hover:text-white transition-colors break-words">
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-white/85 break-words">{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/55">
            © {year} Green Sun Power Systems. All rights reserved.
          </p>
          <p className="text-xs text-white/55">
            Cebu City, Philippines · Authorized Solar Supplier
          </p>
        </div>
      </div>
    </footer>
  );
}
