"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Hospital,
  Activity,
  Stethoscope,
  Info,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/",              key: "home",         icon: LayoutDashboard },
  { href: "/capacity",      key: "capacity",     icon: Hospital },
  { href: "/surveillance",  key: "surveillance", icon: Activity },
  { href: "/specialists",   key: "specialists",  icon: Stethoscope },
  { href: "/about",         key: "about",        icon: Info },
] as const;

export function Sidebar() {
  const { t } = useLanguage();
  const path = usePathname();
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:border-e md:border-border md:bg-bg-secondary">
      <div className="border-b border-border px-5 py-4">
        <div className="text-base font-semibold tracking-tightish text-text-primary">
          {t.brand.name}
        </div>
        <div className="mt-1 text-xs text-text-muted">
          {t.brand.submission}
        </div>
      </div>
      <nav className="flex-1 px-2 py-3">
        {ITEMS.map((item) => {
          const active =
            path === item.href ||
            (item.href !== "/" && path.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-bg-tertiary text-accent-primary"
                  : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span>{t.nav[item.key]}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border px-5 py-3 text-xs text-text-muted">
        {t.footer.author}
      </div>
    </aside>
  );
}
