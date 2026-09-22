"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function CtaSection() {
  const router = useRouter();
  return (
    <section className="px-32 py-5 md:py-10 flex justify-center bg-white">
      <div className="w-full rounded-[2rem] bg-primary px-6 py-12 text-center text-white md:px-12 md:py-16 shadow-lg">
        <p className="text-4xl font-bold">
          Wujudkan Pengukuran Akurat &amp; Terpercaya
          <br />
          <span className="text-warning">Bersama E-Cerapan</span>
        </p>

        <p className="mx-auto mt-4 w-full text-sm text-white/90 md:mt-6 md:text-base">
          Proses lebih mudah, lebih cepat, dan terukur secara digital. Semua
          dalam satu platform.
        </p>

        <Button
          variant="primary"
          onPress={() => router.push("/e-cerapan")}
          className="mt-8 rounded-lg bg-warning px-8 py-3 text-sm font-bold text-white transition hover:bg-yellow-500 md:mt-10 md:px-12 md:py-6 md:text-base"
        >
          Coba Sekarang
        </Button>
      </div>
    </section>
  );
}
