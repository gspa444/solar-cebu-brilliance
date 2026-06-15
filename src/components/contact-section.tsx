import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  {
    icon: Phone,
    label: "Phone",
    value: "+63 920 255 4453",
    href: "tel:+639202554453",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sales@greensunsolarpower.com",
    href: "mailto:sales@greensunsolarpower.com",
  },
  {
    icon: MapPin,
    label: "Main Office",
    value: "Cebu City, Philippines",
    href: "#",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-secondary/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Contact
          </span>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl font-semibold text-charcoal leading-[1.05]">
            Let's design your <span className="text-[color:var(--solar-blue)]">solar future.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground max-w-md">
            Talk to a Cebu-based engineer about your roof, your load, and the
            fastest path to a measurable return. Free, no-pressure consultation.
          </p>
          <Button
            asChild
            className="mt-8 h-12 px-7 rounded-full bg-charcoal text-[color:var(--gold)] hover:bg-charcoal/90 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.6)]"
          >
            <a href="mailto:sales@greensunsolarpower.com" className="inline-flex items-center gap-2">
              Request an Estimate <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
          {items.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--gold)]/60 hover:shadow-[0_20px_50px_-25px_rgba(15,23,42,0.3)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-charcoal text-[color:var(--gold)]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 text-[15px] font-medium text-charcoal break-words group-hover:text-[color:var(--solar-blue)] transition-colors">
                {value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
