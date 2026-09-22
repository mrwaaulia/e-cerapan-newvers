"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    {
      label: "Beranda",
      href: "#home",
    },
    {
      label: "Tentang",
      href: "#about",
    },
    {
      label: "Alur Cerapan",
      href: "#steps",
    },
    {
      label: "Layanan",
      href: "#services",
    },
  ];

  return (
    <header className="sticky py-2 top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img
            src={"/assets/logo/Metrologi.svg"}
            alt="Logo"
            className="lg:h-15 h-8 lg:w-15 w-8"
          />

          <div>
            <p className="lg:text-xl text-sm font-bold leading-tight text-primary">
              Direktorat Metrologi
            </p>

            <p className="lg:text-sm text-[10px] text-neutral">
              Kementerian Perdagangan Republik Indonesia
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral transition-colors hover:bg-gray-100 hover:text-primary md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-xs font-medium text-neutral transition-colors hover:bg-primary-hover hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
