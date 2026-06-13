import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sun } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/cebu-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Green Sun Power Systems — Premium Solar in Cebu" },
      {
        name: "description",
        content:
          "Premium residential and commercial solar energy systems engineered for Cebu. Lower bills, cleaner power, and a faster ROI under the tropical sun.",
      },
      { property: "og:title", content: "Green Sun Power Systems — Premium Solar in Cebu" },
      {
        property: "og:description",
        content:
          "Premium residential and commercial solar energy systems engineered for Cebu.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main>
        <section className="relative isolate overflow-hidden pt-20">
          <div className="absolute inset-0 -z-10">
            <img
              src={heroImage}
              alt="Cebu coastline: green tropical mountains meeting the blue ocean"
              width={1920}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-40">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-background/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] backdrop-blur">
                <Sun className="h-3.5 w-3.5" /> Cebu · Philippines
              </span>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05]">
                Premium solar power, <span className="text-[color:var(--gold)]">engineered</span> for the tropics.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                Green Sun Power Systems designs and installs high-performance solar
                for homes and businesses across Cebu — built to last, sized to your
                load, and priced to pay itself back.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="h-12 px-7 rounded-full bg-[color:var(--gold)] text-charcoal hover:bg-[color:var(--gold)]/90 shadow-[0_20px_50px_-15px_rgba(193,153,68,0.6)]"
                >
                  <a href="#estimate" className="inline-flex items-center gap-2">
                    Get an Estimate <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <a
                  href="#roi"
                  className="text-sm font-medium text-white/90 underline-offset-8 hover:underline"
                >
                  See your ROI breakdown →
                </a>
              </div>

              <dl className="mt-16 grid grid-cols-3 max-w-lg gap-8 border-t border-white/15 pt-8">
                {[
                  { k: "25yr", v: "Panel warranty" },
                  { k: "70%", v: "Avg. bill cut" },
                  { k: "4–6y", v: "Typical payback" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="font-display text-3xl text-[color:var(--gold)]">{s.k}</dt>
                    <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            More sections coming next — residential, commercial, ROI, estimate form.
          </p>
        </section>
      </main>
    </div>
  );
}
