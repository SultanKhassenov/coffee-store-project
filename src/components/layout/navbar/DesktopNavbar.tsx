"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { PAGES_LINKS } from "@/lib/PAGES_LINKS";
import type { PAGE_LINK } from "@/types";
import Logo from "@/components/ui/Logo";

export default function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full px-8 py-3 flex items-center justify-between">
      <Logo media="lg"/>

      <ul className="flex space-x-8 text-md text-coffee">
        {PAGES_LINKS.map((link: PAGE_LINK) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={` ${
                  isActive
                    ? "font-bold underline underline-offset-4"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <button className="flex btn items-center space-x-1 rounded-lg px-3 py-2 text-sm">
        <p>ENG</p>
        <ChevronDown className="w-3" />
      </button>
    </div>
  );
}
