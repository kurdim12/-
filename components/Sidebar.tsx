"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Hospital,
  Activity,
  Stethoscope,
  Info,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "./LanguageContext";
import { cn } from "@/lib/utils";

type NavKey = "home" | "capacity" | "surveillance" | "specialists" | "about";

interface NavItem {
  href: string;
  key: NavKey;
  icon: LucideIcon;
  section: "intel" | "info";
}

const ITEMS: NavItem[] = [
  { href: "/",              key: "home",         icon: LayoutDashboard, section: "intel" },
  { href: "/capacity",      key: "capacity",     icon: Hospital,        section: "intel" },
  { href: "/surveillance",  key: "surveillance", icon: Activity,        section: "intel" },
  { href: "/specialists",   key: "specialists",  icon: Stethoscope,     section: "intel" },
  { href: "/about",         key: "about",        icon: Info,            section: "info" },
];

export function Sidebar() {
  const { t, lang } = useLanguage();
  const path = usePathname();

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href);

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-e md:border-border md:bg-bg-secondary">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <Logo size={28} />
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tightish text-text-primary">
            {t.brand.name}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
            v0.1 · prototype
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <SectionLabel lang={lang} label={lang === "ar" ? "الذكاء" : "Intelligence"} />
        {ITEMS.filter((i) => i.section === "intel").map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item.href)} label={t.nav[item.key]} />
        ))}

        <div className="mt-4">
          <SectionLabel lang={lang} label={lang === "ar" ? "المشروع" : "Project"} />
          {ITEMS.filter((i) => i.section === "info").map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} label={t.nav[item.key]} />
          ))}
        </div>
      </nav>

      <div className="space-y-1 border-t border-border px-5 py-3">
        <div className="text-[11px] font-medium text-text-secondary">
          {t.footer.submission}
        </div>
        <div className="text-[11px] text-text-muted">{t.footer.author}</div>
      </div>
    </aside>
  );
}

function SectionLabel({ label }: { lang: string; label: string }) {
  return (
    <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
      {label}
    </div>
  );
}

function NavLink({
  item,
  active,
  label,
}: {
  item: NavItem;
  active: boolean;
  label: string;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-bg-tertiary text-accent-primary"
          : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
      )}
    >
      {active && (
        <span className="absolute inset-y-1.5 start-0 w-0.5 rounded-full bg-accent-primary" />
      )}
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      <span className="truncate">{label}</span>
    </Link>
  );
}
