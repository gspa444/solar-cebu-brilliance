import { useMemo, useState } from "react";
import { Calculator, Sun, Building2, Home, Zap, Wallet, CalendarClock, FileSearch, Upload } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type PropertyType = "residential" | "commercial";

const PESO = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

function fmtNumber(n: number) {
  return new Intl.NumberFormat("en-PH", { maximumFractionDigits: 1 }).format(n);
}

export function SavingsCalculator() {
  const [bill, setBill] = useState(15000);
  const [type, setType] = useState<PropertyType>("residential");

  const results = useMemo(() => {
    // Local utility baseline: PHP 12-15/kWh. Use a mid 13.5 for residential, 12.5 for commercial (large user).
    const rate = type === "residential" ? 13.5 : 12.5;
    const monthlyKwh = bill / rate;
    // Average Cebu peak-sun-hours ~ 5 h/day, ~150 h/month. Sized to cover ~85% of load (residential)
    // or 75% of load (commercial accounts for usage spread + peak-shaving).
    const coverage = type === "residential" ? 0.85 : 0.75;
    const psh = 150; // monthly productive hours
    const systemKw = Math.max(3, (monthlyKwh * coverage) / psh);

    // Round to nice steps
    const rounded = systemKw <= 10 ? Math.round(systemKw * 2) / 2 : Math.round(systemKw);
    const sizeLabel = type === "residential"
      ? `${rounded} kW`
      : `${Math.max(5, Math.round(rounded))} kVA`;

    const monthlySavings = Math.round(rounded * psh * rate * 0.95); // 95% offset of generated kWh

    // System cost: residential ~PHP 55k/kW, commercial ~PHP 45k/kVA installed.
    const perKw = type === "residential" ? 55000 : 45000;
    const systemCost = rounded * perKw;
    const annualSavings = monthlySavings * 12;
    const roiYears = annualSavings > 0 ? systemCost / annualSavings : 0;

    return {
      sizeLabel,
      systemKw: rounded,
      monthlySavings,
      annualSavings,
      systemCost,
      roiYears,
    };
  }, [bill, type]);

  return (
    <section id="roi" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <div className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-[color:var(--solar-blue)]/10 blur-3xl" />
        <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <Calculator className="h-3.5 w-3.5" /> ROI Breakdown
          </span>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl font-semibold text-charcoal leading-[1.05]">
            Calculate Your <span className="text-[color:var(--solar-blue)]">Visayan</span> <span className="text-[color:var(--gold)]">Solar Savings</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground">
            Move the slider, pick your property type, and see a live estimate
            calibrated to Cebu utility rates and tropical sun hours.
          </p>
        </div>

        {/* Calculator grid */}
        <div className="mt-14 grid gap-6 lg:gap-8 lg:grid-cols-5 items-stretch">
          {/* Inputs */}
          <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-8 lg:p-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Step 01</p>
            <h3 className="mt-2 font-display text-2xl text-charcoal">Property Type</h3>

            <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-secondary p-1.5 border border-border">
              {([
                { id: "residential", label: "Residential", Icon: Home },
                { id: "commercial", label: "Commercial", Icon: Building2 },
              ] as const).map(({ id, label, Icon }) => {
                const active = type === id;
                return (
                  <button
                    key={id}
                    onClick={() => setType(id)}
                    className={[
                      "relative inline-flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium transition-all",
                      active
                        ? "bg-charcoal text-[color:var(--gold)] shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5)]"
                        : "text-muted-foreground hover:text-charcoal",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mt-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Step 02</p>
              <div className="mt-2 flex items-baseline justify-between">
                <h3 className="font-display text-2xl text-charcoal">Monthly Electric Bill</h3>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold text-charcoal tabular-nums">
                  {PESO.format(bill)}
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">/ month</span>
              </div>

              <div className="mt-6">
                <Slider
                  value={[bill]}
                  min={3000}
                  max={100000}
                  step={500}
                  onValueChange={(v) => setBill(v[0] ?? bill)}
                  className="[&_[data-slot=slider-range]]:bg-[color:var(--gold)] [&_[data-slot=slider-thumb]]:border-[color:var(--gold)] [&_[data-slot=slider-thumb]]:bg-charcoal"
                />
                <div className="mt-3 flex justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>₱3,000</span>
                  <span>₱100,000+</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Sun className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                Calibrated to Visayas rates: ₱12 – ₱15 / kWh.
              </div>
            </div>
          </div>

          {/* Results — dark premium card */}
          <div className="lg:col-span-3 relative rounded-3xl p-[1.5px] bg-gradient-to-br from-[color:var(--gold)] via-[color:var(--solar-blue)] to-[color:var(--gold)] shadow-[0_30px_80px_-30px_rgba(15,23,42,0.55)]">
            <div className="relative h-full rounded-[calc(theme(borderRadius.3xl)-1.5px)] bg-charcoal text-white p-8 lg:p-10 overflow-hidden">
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--gold)]/15 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[color:var(--solar-blue)]/25 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
                    Live Estimate
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] animate-pulse" />
                    Updating
                  </span>
                </div>

                {/* Headline metric: recommended system */}
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-white/60">Recommended System Size</p>
                  <p className="mt-2 font-display text-6xl sm:text-7xl font-semibold tabular-nums">
                    {results.sizeLabel}
                  </p>
                  <p className="mt-2 text-sm text-white/65">
                    Hybrid solar array with smart battery storage, sized for{" "}
                    {type === "residential" ? "your home's daily load" : "continuous business operations and peak-shaving"}.
                  </p>
                </div>

                {/* Stat grid */}
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <Stat
                    icon={Wallet}
                    label="Estimated Monthly Savings"
                    value={PESO.format(results.monthlySavings)}
                    sub={`${PESO.format(results.annualSavings)} per year`}
                  />
                  <Stat
                    icon={CalendarClock}
                    label="Estimated ROI Timeframe"
                    value={`${fmtNumber(results.roiYears)} yrs`}
                    sub={`Payback on ~${PESO.format(results.systemCost)} install`}
                    accent="blue"
                  />
                </div>

                {/* ROI bar */}
                <div className="mt-8">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-white/60">
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="h-3 w-3 text-[color:var(--gold)]" />
                      Payback velocity
                    </span>
                    <span>Lower is faster</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--gold)] to-[color:var(--solar-blue)] transition-all duration-500"
                      style={{
                        width: `${Math.max(15, Math.min(100, 100 - results.roiYears * 10))}%`,
                      }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-white/55">
                    After payback, every peso saved goes straight to your bottom line for the
                    remaining 20+ years of system life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="mt-8 relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/40 bg-gradient-to-r from-[color:var(--gold)]/10 via-background to-[color:var(--solar-blue)]/10 p-6 lg:p-8">
          <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[color:var(--gold)]" />
          <div className="flex flex-col md:flex-row md:items-center gap-6 pl-2">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-charcoal text-[color:var(--gold)] ring-1 ring-[color:var(--gold)]/40">
              <FileSearch className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)] font-medium">
                Bill Analysis Strategy
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-charcoal">
                Upload or provide a copy of your recent power bill, and our engineering team will
                provide a comprehensive, line-by-line breakdown of your current energy charges
                versus your projected solar savings.
              </p>
            </div>
            <Button
              asChild
              className="h-12 px-6 rounded-full bg-charcoal text-[color:var(--gold)] hover:bg-charcoal/90 shrink-0"
            >
              <a
                href="mailto:sales@greensunsolarpower.com?subject=Power%20Bill%20Analysis%20Request"
                className="inline-flex items-center gap-2"
              >
                <Upload className="h-4 w-4" /> Send My Bill
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
  accent = "gold",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  accent?: "gold" | "blue";
}) {
  const accentColor = accent === "gold" ? "var(--gold)" : "var(--solar-blue)";
  return (
    <div className="relative rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1"
          style={{ backgroundColor: `color-mix(in oklab, ${accentColor} 18%, transparent)`, color: accentColor, borderColor: accentColor }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-[11px] uppercase tracking-wider text-white/60">{label}</p>
      </div>
      <p
        className="mt-3 font-display text-3xl font-semibold tabular-nums"
        style={{ color: accentColor }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-white/55">{sub}</p>}
    </div>
  );
}
