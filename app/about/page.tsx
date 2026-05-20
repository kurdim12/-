"use client";

import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div>
      <PageHeader title={t.about.title} subtitle={t.brand.tagline} />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 md:px-6">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">
            {t.about.pitch.title}
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary">{t.about.pitch.p1}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{t.about.pitch.p2}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{t.about.pitch.p3}</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">
            {t.about.methodology.title}
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary">{t.about.methodology.p1}</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">
            {t.about.limitations.title}
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary">{t.about.limitations.p1}</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-text-primary">
            {t.about.roadmap.title}
          </h2>
          <ul className="space-y-2 ps-5 text-sm leading-relaxed text-text-secondary [list-style:disc]">
            {t.about.roadmap.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border pt-6 text-xs text-text-muted">
          {t.about.author} · {t.brand.submission}
        </section>
      </div>
    </div>
  );
}
