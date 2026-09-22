"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/hero-bg.png"
          alt=""
          fill
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-0 w-full bg-linear-to-b from-primary/90 via-primary/80 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-6 py-20 text-center text-white md:py-28">
        <h1 className="text-3xl font-bold leading-tight md:text-5xl">
          Periksa Akurasi Alat Ukur
          <br />
          <span className="text-amber-300">Secara Digital</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white md:text-base">
          E-Cerapan adalah layanan digital dari Direktorat Metrologi dan
          Kementerian Perdagangan RI, untuk memastikan keakuratan alat ukur
          sesuai standar yang berlaku. Layanan ini terbuka bagi petugas lapangan
          maupun masyarakat umum.
        </p>
        <Button
          variant="primary"
          onPress={() => router.push("/e-cerapan")}
          className="h-12 w-full rounded-md mt-4 bg-primary shadow-md px-8 text-base font-semibold text-white sm:w-auto"
        >
          Coba Sekarang
        </Button>
      </div>
    </section>
  );
}
