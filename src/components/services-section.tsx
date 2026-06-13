import { Home, Building2, BatteryCharging, ShieldCheck, Zap, Activity, ArrowRight, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

type Feature = { icon: React.ElementType; text: string };

function ServiceCard({
  id,
  eyebrow,
  Icon,
  title,
  intro,
  features,
  cta,
  badge,
  variant = "light",
}: {
  id: string;
  eyebrow: string;
  Icon: React.ElementType;
  title: string;
  intro: string;
  features: Feature[];
  cta: string;
  badge?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <article
      id={id}
      className={[
        "group relative flex flex-col overflow-hidden rounded-3xl border p-8 lg:p-10 transition-all duration-500",
        "hover:-translate-y-1",
        isDark
          ? "bg-charcoal text-white border-white/10 hover:border-[color:var(--gold)]/50 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)]"
          : "bg-card text-foreground border-border hover:border-[color:var(--gold)]/60 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]",
      ].join(" ")}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[color:var(--gold)]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />

      <div className="flex items-center justify-between">
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em]",
            isDark
              ? "bg-white/5 text-[color:var(--gold)] border border-white/10"
              : "bg-secondary text-muted-foreground border border-border",
          ].join(" ")}
        >
          {eyebrow}
        </span>
        <span
          className={[
            "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
            isDark
              ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)] ring-1 ring-[color:var(--gold)]/30"
              : "bg-charcoal text-[color:var(--gold)]",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <h3
        className={[
          "mt-8 font-display text-3xl lg:text-[2rem] leading-tight font-semibold",
          isDark ? "text-white" : "text-charcoal",
        ].join(" ")}
      >
        {title}
      </h3>

      <p
        className={[
          "mt-4 text-[15px] leading-relaxed",
          isDark ? "text-white/75" : "text-muted-foreground",
        ].join(" ")}
      >
        {intro}
      </p>

      <ul className="mt-8 space-y-4">
        {features.map(({ icon: I, text }, i) => (
          <li key={i} className="flex items-start gap-4">
            <span
              className={[
                "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                isDark
                  ? "bg-white/5 text-[color:var(--gold)] ring-1 ring-white/10"
                  : "bg-[color:var(--gold)]/15 text-charcoal",
              ].join(" ")}
            >
              <I className="h-4 w-4" />
            </span>
            <span className={isDark ? "text-white/85 text-sm leading-relaxed" : "text-foreground/85 text-sm leading-relaxed"}>
              {text}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10 space-y-5">
        {badge && (
          <div
            className={[
              "flex items-center gap-3 rounded-xl px-4 py-3 text-xs",
              isDark
                ? "bg-white/[0.04] border border-white/10 text-white/75"
                : "bg-secondary/70 border border-border text-muted-foreground",
            ].join(" ")}
          >
            <Landmark className="h-4 w-4 text-[color:var(--gold)] shrink-0" />
            <span>{badge}</span>
          </div>
        )}

        <Button
          asChild
          className={[
            "h-12 w-full rounded-full justify-between px-6 group/btn",
            isDark
              ? "bg-[color:var(--gold)] text-charcoal hover:bg-[color:var(--gold)]/90"
              : "bg-charcoal text-[color:var(--gold)] hover:bg-charcoal/90 border border-[color:var(--gold)]/30",
          ].join(" ")}
        >
          <a href="#estimate">
            <span className="font-medium">{cta}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </Button>
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Our Solutions
          </span>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl font-semibold text-charcoal leading-[1.05]">
            Two paths to the sun.<br />
            <span className="text-[color:var(--solar-blue)]">One standard of craft.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground max-w-xl">
            Whether you're powering a coastal home or a Visayas-wide operation,
            every Green Sun system is engineered, installed, and supported by the
            same Cebu-based team.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:gap-8 lg:grid-cols-2">
          <ServiceCard
            id="residential"
            eyebrow="Residential"
            Icon={Home}
            title="Residential Energy Freedom"
            intro="High-performance solar is one of the most reliable, appreciating investments a Cebu household can make — a clean asset on your roof that pays itself back while preserving the islands you call home."
            features={[
              {
                icon: BatteryCharging,
                text: "Hybrid systems with smart battery storage — seamlessly protect your home from sudden blackouts and brownouts, day or night.",
              },
              {
                icon: ShieldCheck,
                text: "Tier-1 panels, 25-year performance warranty, and a single accountable Cebu team for installation and aftercare.",
              },
              {
                icon: Activity,
                text: "Real-time monitoring on your phone — see every kilowatt you generate, store, and save.",
              },
            ]}
            badge="Partner bank financing available for qualified applicants."
            cta="Design my home system"
            variant="light"
          />

          <ServiceCard
            id="commercial"
            eyebrow="Commercial & Industrial"
            Icon={Building2}
            title="Commercial & Industrial Infrastructure"
            intro="A serious OPEX lever for businesses across the Visayas. We design large-scale arrays that turn rooftops and yards into a long-term cost advantage — without compromising uptime."
            features={[
              {
                icon: ShieldCheck,
                text: "High-durability industrial arrays engineered for typhoon-grade winds, salt air, and tropical heat cycles.",
              },
              {
                icon: Zap,
                text: "Peak-shaving inverters that drastically slash daytime demand charges and flatten your utility bill.",
              },
              {
                icon: Activity,
                text: "Automatic utility switching keeps production lines, cold storage, and POS systems running through grid failures — zero downtime.",
              },
            ]}
            cta="Request a commercial assessment"
            variant="dark"
          />
        </div>
      </div>
    </section>
  );
}
