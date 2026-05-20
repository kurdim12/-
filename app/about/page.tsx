"use client";

import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/components/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div>
      <PageHeader
        eyebrow={t.nav.about}
        title={t.about.title}
        subtitle={t.brand.tagline}
      />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 md:px-6">
        <Section title={t.about.pitch.title}>
          <p>{t.about.pitch.p1}</p>
          <p>{t.about.pitch.p2}</p>
          <p className="font-medium text-text-primary">{t.about.pitch.p3}</p>
        </Section>

        <Section title={t.about.methodology.title}>
          <p>{t.about.methodology.p1}</p>
        </Section>

        <Section title={t.about.limitations.title}>
          <p>{t.about.limitations.p1}</p>
        </Section>

        <Section title={t.about.roadmap.title}>
          <ul className="space-y-2 ps-5 [list-style:disc] marker:text-accent-primary">
            {t.about.roadmap.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <div className="border-t border-border pt-6 text-xs text-text-muted">
          {t.about.author} · {t.brand.submission}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-block h-4 w-1 rounded-full bg-accent-primary" />
        <h2 className="text-lg font-semibold tracking-tightish text-text-primary">
          {title}
        </h2>
      </div>
      <div className="space-y-3 text-[15px] leading-relaxed text-text-secondary">
        {children}
      </div>
    </section>
  );
}
