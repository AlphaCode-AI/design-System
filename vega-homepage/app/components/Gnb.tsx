"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@alphacode-ai/design-system";

export type GnbSection = "docs" | "components" | "templates";

export function getGnbSection(pathname: string): GnbSection {
  if (pathname.startsWith("/components")) return "components";
  if (pathname.startsWith("/templates")) return "templates";
  return "docs";
}

const GNB_ITEMS: { id: GnbSection; label: string; href: string }[] = [
  { id: "docs",       label: "Docs",       href: "/" },
  { id: "components", label: "Components", href: "/components/accordion" },
  { id: "templates",  label: "Templates",  href: "/templates/login" },
];

export default function Gnb() {
  const pathname = usePathname();
  const section = getGnbSection(pathname);

  return (
    <nav className="flex items-center gap-1">
      {GNB_ITEMS.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "px-3 py-1.5 text-sm rounded-md transition-colors",
            section === item.id
              ? "text-foreground font-medium bg-ac-gray-10"
              : "text-muted-foreground hover:text-foreground hover:bg-ac-gray-10"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
