import React from "react";
import Breadcrumb from "@/components/e-cerapan/layout/Breadcrumb";

import InfoBanner from "@/components/e-cerapan/ui/InfoBanner";
import PageHeader from "@/components/e-cerapan/layout/PageHeader";

export default function ECerapanPage() {
  return (
    <main className="min-h-screen w-full">
      <div className="px-8 py-8 md:px-12 md:py-12">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "E-Cerapan" }]}
        />

        <PageHeader
          title="Mulai Cerapan"
          description="Pilih jenis cerapan yang ingin dilakukan untuk memulai proses pengujian alat ukur."
          className="mb-7"
        />

        <InfoBanner
          title="Panduan Penggunaan"
          description="Pastikan semua peralatan standar telah disiapkan sebelum memulai pengujian. Ikuti setiap tahap sesuai prosedur yang berlaku."
        />
      </div>
    </main>
  );
}
