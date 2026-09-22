"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutPanelLeft, Fuel, type LucideIcon, LogOut } from "lucide-react";

const menuItems: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Beranda",
    href: "/e-cerapan",
    icon: LayoutPanelLeft,
  },
  {
    label: "Pompa Ukur BBM",
    href: "/e-cerapan/pengujian",
    icon: Fuel,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/e-cerapan") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Buka menu"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-black/90 lg:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-screen w-[240px]",
          "border-r border-gray-200 bg-white",
          "transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col px-4 py-6">
          {/* Mobile close */}
          <div className="mb-5 flex justify-end lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup menu"
              className="rounded-md p-2 text-black/80 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Sidebar top spacing */}
          <div className="h-7 border-b border-primary-hover/50" />

          {/* Menu */}
          <nav className="mt-4">
            <div className="space-y-4">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={[
                      "flex items-center gap-3 rounded-md px-3 py-2.5",
                      "text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-white"
                        : "text-black/90 hover:bg-primary-hover/30 hover:text-primary",
                    ].join(" ")}
                  >
                    <Icon className="h-[18px] w-[18px]" />

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Sidebar bottom spacing */}
            <div className="mb-6 h-7 border-b border-primary-hover/50" />

            {/* Bottom */}
            <Link
              href="/"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger-hover"
            >
              <LogOut className="h-[18px] w-[18px]" />

              <span>Keluar</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
