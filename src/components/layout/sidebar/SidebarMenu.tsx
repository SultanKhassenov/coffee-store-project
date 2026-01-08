"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../ui/Logo";
import { SIDEBAR_LINKS } from "@/lib/SIDEBAR_LINKS"

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
    {/* оверлей */}
        {isOpen && (
            <div
                onClick={onClose}
                className="fixed inset-0 h-13/10 bg-black/30 z-40"
            />
        )}
        <div
          className={`fixed top-18 left-0 z-40 w-fit h-fit
             bg-white rounded-3xl shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-1/20" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 space-x-20 space-y-4">
            <Logo media="sm"/>

            {SIDEBAR_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`text-lg transition ${
                    isActive
                      ? "font-bold text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button 
                className="absolute top-1/10 right-1/10"
                onClick={onClose}>
                    <X />
            </button>
          </div>
        </div>
    </>
  );
}
