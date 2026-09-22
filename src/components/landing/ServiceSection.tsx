"use client";

import Image from "next/image";

export default function ServiceSection() {
  return (
    <section
      id="services"
      className="mx-auto max-w-content px-32 py-5 md:py-10"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14 lg:gap-20">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 shrink-0">
          <Image
            src="/assets/images/service-icon.png"
            alt="Service Icon"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
          />
        </div>

        <div className="flex flex-col gap-4 w-full flex-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy">
            Satu Layanan Beragam Alat Ukur
          </h2>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-base text-justify leading-relaxed text-neutral">
              E-Cerapan mendukung pengelolaan berbagai jenis alat ukur, dari
              timbangan, meteran air, meteran gas, hingga alat ukur takar,
              timbang, dan perlengkapannya (UTTP) lainnya.
            </p>

            <p className="text-base text-justify leading-relaxed text-neutral">
              Proses pengujian yang lebih sederhana dan terstandarisasi membantu
              mempercepat pelayanan tanpa mengurangi ketelitian dan akurasi
              hasil kerja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
