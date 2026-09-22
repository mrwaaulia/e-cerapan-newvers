"use client";

import { useSyncExternalStore } from "react";
import Stepper from "@/components/e-cerapan/layout/Stepper";

//hardcodenya
const details = [
  { label: "No. Pengujian", value: "PU-BBM-2024-0847", accent: true },
  { label: "Status", value: "LULUS UJI", accent: true },
  { label: "Jenis Alat", value: "Pompa Ukur BBM" },
  { label: "Tanggal Simpan", value: "Minggu, 13 September 2026" },
];

export default function PengujianBerhasilPage() {
  const subscribe = () => () => {};
  const pdfData = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem("e-cerapan-pdf"),
    () => null,
  );
  const pdfName = useSyncExternalStore(
    subscribe,
    () =>
      sessionStorage.getItem("e-cerapan-pdf-name") ||
      "SKHP-hasil-pengujian.pdf",
    () => "SKHP-hasil-pengujian.pdf",
  );

  const createPdfBlob = async () => {
    if (!pdfData) return null;

    const response = await fetch(pdfData);
    return response.blob();
  };

  const previewPdf = async () => {
    if (!pdfData) return;

    const previewWindow = window.open("about:blank", "_blank");
    if (!previewWindow) return;

    try {
      const pdfBlob = await createPdfBlob();
      if (!pdfBlob) return;

      const pdfUrl = URL.createObjectURL(pdfBlob);
      previewWindow.location.href = pdfUrl;
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 60_000);
    } catch (error) {
      previewWindow.close();
      console.error("Gagal membuka pratinjau PDF:", error);
    }
  };

  const downloadPdf = async () => {
    const pdfBlob = await createPdfBlob();
    if (!pdfBlob) return;

    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfName;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 1_000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F9F9F9]">
      <div className="mx-auto w-full max-w-[780px] px-6 py-8 md:px-10 md:py-9">
        <Stepper
          steps={["Pemeriksaan Awal", "Pengujian & Perhitungan", "Hasil"]}
          currentStep={2}
          stepStatus="completed"
        />

        <section className="flex flex-col items-center text-center">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#2C82C4]">
            <svg
              aria-hidden="true"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 12 5 5L19 7"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#2479BC] md:text-[24px]">
            Pengujian Berhasil Disimpan
          </h1>
          <p className="mt-3 max-w-[620px] text-base leading-7 text-[#333333]">
            Data hasil pengujian telah berhasil tersimpan dalam sistem
            e-Cerapan.
            <br className="hidden sm:block" />
            Dokumen resmi dapat diunduh atau dipratinjau.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 rounded-xl border border-[#EEEEEE] bg-white p-7 shadow-[0_2px_5px_rgba(0,0,0,0.12)] sm:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-lg border border-[#E2E2E2] bg-[F8F8F8] px-4 py-4 text-left"
              >
                <p className="text-[11px] text-[#686868]">{detail.label}</p>
                <p
                  className={`mt-1 text-[13px] font-medium ${
                    detail.accent
                      ? detail.label === "Status"
                        ? "text-[#5ABD55]"
                        : "text-[#2479BC]"
                      : "text-[#222222]"
                  }`}
                >
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid w-full grid-cols-1 gap-7 sm:grid-cols-2">
            <button
              type="button"
              onClick={previewPdf}
              disabled={!pdfData}
              className="h-[42px] rounded-md bg-[#2C82C4] px-[16px] py-[8px] text-base font-bold text-white shadow-sm transition-colors hover:bg-[#2479BC]"
            >
              Pratinjau PDF
            </button>
            <button
              type="button"
              onClick={downloadPdf}
              disabled={!pdfData}
              className="h-[42px] rounded-md border-2 border-[#2C82C4] bg-white px-[16px] py-[8px] text-base font-bold text-[#2C82C4] transition-colors hover:bg-[#F0F7FC]"
            >
              Unduh PDF
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
