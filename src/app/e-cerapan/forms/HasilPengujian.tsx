"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Breadcrumb from "@/components/e-cerapan/layout/Breadcrumb";
import Stepper from "@/components/e-cerapan/layout/Stepper";
import PageHeader from "@/components/e-cerapan/ui/PageHeader";
import ResultCard from "@/components/e-cerapan/ui/ResultCard";
import MetricSummary from "@/components/e-cerapan/ui/MetricSummary";
import InfoCard from "@/components/e-cerapan/ui/InfoCard";
import ParameterTable from "@/components/e-cerapan/ui/ParameterTable";
import ConfirmationModal from "@/components/e-cerapan/ui/ConfirmationModal";
import { WizardStepProps } from "@/types/wizard";

export default function HasilPengujianPage({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: Partial<WizardStepProps> = {}) {
  const router = useRouter();

  useEffect(() => {
    if (!updateFormData) {
      router.replace("/e-cerapan");
    }
  }, [updateFormData, router]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getImageDataURL = (src: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };
  const handleConfirmSimpan = async () => {
    setIsLoading(true);
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 18;
      const lineHeight = 4.4;

      const dataForm = formData?.step1?.dataPengujian;
      const nomorSurat = dataForm?.nomorSIML || "P.5617/PKTN.4.5/DL/07/2025";
      const nomorDokumenAtas = "DL-P-25-0095-001";

      // halaman 1
      const logoData = await getImageDataURL("/assets/logo/Metrologi.svg");

      if (logoData && logoData.startsWith("data:image")) {
        try {
          pdf.addImage(logoData, "PNG", margin, 10, 11, 11);
        } catch (imgError) {
          console.error("Gagal menambahkan gambar ke PDF:", imgError);
        }
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.text("KEMENTERIAN PERDAGANGAN", margin + 14, 12);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(6.5);
      pdf.text("REPUBLIK INDONESIA", margin + 14, 16);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text(nomorDokumenAtas, pageWidth - margin, 16, { align: "right" });

      let y = 34;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10.5);
      pdf.text("SURAT KETERANGAN HASIL PENGUJIAN", pageWidth / 2, y, {
        align: "center",
      });
      y += 5;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text(`Nomor: ${nomorSurat}`, pageWidth / 2, y, { align: "center" });
      y += 10;

      const addKeyValue = (
        label: string,
        value: string | string[],
        options?: { boldValue?: boolean; extraGap?: number },
      ) => {
        const labelX = margin;
        const colonX = margin + 43;
        const valueX = margin + 46;
        const maxValueWidth = pageWidth - margin - valueX;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.text(label, labelX, y);
        pdf.text(":", colonX, y);

        pdf.setFont("helvetica", options?.boldValue ? "bold" : "normal");

        if (Array.isArray(value)) {
          let currentY = y;
          value.forEach((line) => {
            const splitLines = pdf.splitTextToSize(line, maxValueWidth);
            pdf.text(splitLines, valueX, currentY);
            currentY += splitLines.length * lineHeight;
          });
          y = currentY + (options?.extraGap || 0);
        } else {
          const splitLines = pdf.splitTextToSize(
            String(value || "-"),
            maxValueWidth,
          );
          pdf.text(splitLines, valueX, y);
          y +=
            Math.max(lineHeight, splitLines.length * lineHeight) +
            (options?.extraGap || 0);
        }
      };

      addKeyValue("Jenis UTTP", "Tangki Ukur Mobil");
      addKeyValue(
        "Merek/Tipe",
        `${identitasAlat?.[0]?.value || "Aweco"} / ${identitasAlat?.[1]?.value || "AWC 40000L"}`,
      );
      addKeyValue(
        "Nomor Seri",
        identitasAlat?.[2]?.value || "20.10.01 B.254/06",
      );
      addKeyValue("Media Uji/Komoditas", "Air");
      addKeyValue(
        "Kapasitas Maksimum",
        `${identitasAlat?.[3]?.value || "40000"} Liter`,
      );
      addKeyValue("Buatan", identitasAlat?.[4]?.value || "Indonesia");
      addKeyValue("Nama Pabrikan", "Aweco");
      addKeyValue(
        "Alamat Pabrikan",
        "Jl. Raya Wonoayu 26C Desa/Kelurahan Gempol, Kec. Gempol, Kab. Pasuruan, Provinsi Jawa Timur - 67155",
      );
      addKeyValue("Pemohon", "PT Aweco Indosteel Perkasa", { boldValue: true });
      addKeyValue(
        "Alamat Pemohon",
        "Graha Elnusa Lt. 2, Jl. TB Simatupang Kav. 1B Jakarta Selatan",
      );
      addKeyValue("Diuji/Diverifikasi Oleh", [
        "Mochamad Ibnu Athoillah, S.T., M.App.Ec (Intl)    NIP : 198008262003121001",
        "Moh. Agung Nugroho, A. Md.                       NIP : 198912242012121001",
      ]);
      addKeyValue("Waktu Pengujian/Verifikasi", "23 Juni 2025 - 29 Juni 2025");
      addKeyValue(
        "Lokasi Pengujian/Verifikasi",
        "Jl. Raya Wonoayu 26C Desa/Kelurahan Gempol, Kec. Gempol, Kab. Pasuruan, Provinsi Jawa Timur - 67155",
      );
      addKeyValue(
        "Dasar Pengujian/Verifikasi",
        "Surat Permohonan dari: PT Aweco Indosteel Perkasa\nNomor: 017/AWC/V/2025-D, Tanggal: 11 Juni 2025",
      );
      addKeyValue(
        "Persyaratan Teknis",
        "Lampiran 1 huruf E Nomor 2.X. Syarat Teknis Tangki Ukur Mobil Bahan Bakar Minyak Peraturan Menteri Perdagangan No 21 Tahun 2023 Tentang Perubahan Atas Peraturan Menteri Perdagangan Nomor 26 tahun 2021 tentang Penetapan Standar Kegiatan Usaha dan Produk Pada Penyelenggaraan Perizinan Berbasis Risiko Sektor Perdagangan",
      );
      addKeyValue(
        "Hasil",
        "Tangki Ukur Mobil Merek Aweco tipe AWC 40000L dinyatakan Memenuhi Syarat Teknis, untuk jenis-jenis pengujian terlampir yang merupakan bagian tidak terpisahkan dari Surat Keterangan Hasil Pengujian ini.",
      );

      y = Math.max(y + 6, pageHeight - 40);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text("Bandung, 8 Juli 2025", pageWidth - margin, y, {
        align: "right",
      });
      y += 4;
      pdf.text("Kepala Balai Pengujian", pageWidth - margin, y, {
        align: "right",
      });
      pdf.addPage();

      // halaman 2
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text(`Lampiran ${nomorSurat}`, pageWidth - margin, 15, {
        align: "right",
      });

      y = 30;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10.5);
      pdf.text("RESUME PENGUJIAN TIPE UTTP", pageWidth / 2, y, {
        align: "center",
      });
      y += 4;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.text(`Nomor: ${nomorSurat}`, pageWidth / 2, y, { align: "center" });
      y += 8;

      const tableHead: import("jspdf-autotable").RowInput[] = [
        [
          {
            content: "NO",
            rowSpan: 2,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "PEMERIKSAAN & PENGUJIAN",
            rowSpan: 2,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "PEMENUHAN SYARAT",
            colSpan: 3,
            styles: { halign: "center" },
          },
          {
            content: "KETERANGAN",
            rowSpan: 2,
            styles: { halign: "center", valign: "middle" },
          },
        ],
        [
          { content: "YA", styles: { halign: "center" } },
          { content: "TIDAK", styles: { halign: "center" } },
          { content: "N/A", styles: { halign: "center" } },
        ],
      ];

      const tableBody = [
        ["I", "Pemeriksaan Administrasi & Visual", "X", "", "", ""],
        ["II", "Uji Unjuk Kerja (Performance Tests)", "", "", "", ""],
        ["", "2.1 Pengujian Volume Nominal", "X", "", "", ""],
        ["", "2.2 Pengujian Ruang Kosong", "X", "", "", ""],
        [
          "",
          "2.3 Pengujian Kepekaan di Sekitar Volume Nominal",
          "X",
          "",
          "",
          "",
        ],
        [
          "",
          "2.4 Pengujian Perubahan Volume Akibat Deformasi",
          "",
          "",
          "X",
          "",
        ],
        ["", "2.5 Pengujian Volume Cairan Tertinggal", "X", "", "", ""],
      ];

      autoTable(pdf, {
        startY: y,
        margin: { left: margin, right: margin },
        head: tableHead,
        body: tableBody,
        theme: "plain",
        styles: {
          font: "helvetica",
          fontSize: 7.5,
          cellPadding: 1.7,
          lineColor: [0, 0, 0],
          lineWidth: 0.2,
          textColor: [0, 0, 0],
        },
        headStyles: {
          fontStyle: "bold",
          fillColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: 10, halign: "center" },
          1: { cellWidth: "auto" },
          2: { cellWidth: 12, halign: "center" },
          3: { cellWidth: 14, halign: "center" },
          4: { cellWidth: 12, halign: "center" },
          5: { cellWidth: 25 },
        },
      });

      // Tanda Tangan & QR Code Halaman 2
      // @ts-expect-error Mengambil posisi Y akhir tabel
      const finalTableY = pdf.lastAutoTable.finalY || 120;
      y = finalTableY + 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      const signatureX = pageWidth - margin - 18;
      pdf.text("Bandung, 8 Juli 2025", signatureX, y, { align: "center" });
      y += 4;
      pdf.text("Manajer Pelayanan Persetujuan Tipe,", signatureX, y, {
        align: "center",
      });

      y += 4;
      const qrCodeData = await fetch("/assets/qr-specimen.png")
        .then((res) => {
          if (!res.ok) {
            return null;
          }
          return res.blob();
        })
        .then((blob) =>
          blob
            ? new Promise<string | null>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = () => resolve(null);
                reader.readAsDataURL(blob);
              })
            : null,
        )
        .catch(() => null);

      if (qrCodeData) {
        pdf.addImage(qrCodeData, "PNG", signatureX - 16, y, 32, 32);
        y += 34;
      } else {
        y += 28;
      }

      pdf.setFont("helvetica", "bold");
      pdf.text("Dr. Yudi Risman Hadiyanto, S.Si. M.Se.", signatureX, y, {
        align: "center",
      });
      y += 4;
      pdf.setFont("helvetica", "normal");
      pdf.text("NIP: 197209292005021001", signatureX, y, { align: "center" });

      const safeFileName = nomorSurat.replace(/[^a-z0-9_-]/gi, "-");
      sessionStorage.setItem("e-cerapan-pdf", pdf.output("datauristring"));
      sessionStorage.setItem("e-cerapan-pdf-name", `SKHP-${safeFileName}.pdf`);

      setIsModalOpen(false);
      router.push("/e-cerapan/pengujianberhasil");
    } catch (error) {
      console.error("Gagal mengekspor PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const identitasAlat = [
    {
      label: "Merek",
      value: formData?.step1?.identitasUTTP?.merek || "Tokheim",
    },
    {
      label: "Tipe",
      value: formData?.step1?.identitasUTTP?.tipeModel || "Quantium 310",
    },
    {
      label: "No. Seri",
      value: formData?.step1?.identitasUTTP?.nomorSeri || "SN-2023-TKH-0456",
    },
    {
      label: "Jml. Nozzle",
      value: formData?.step1?.identitasUTTP?.jumlahNozzle || "2",
    },
    {
      label: "Tahun Buat",
      value: formData?.step1?.identitasUTTP?.tahunPembuatan || "2022",
    },
  ];

  const dataPengujian = [
    {
      label: "No. Pengujian",
      value: formData?.step1?.dataPengujian?.nomorOrder || "PU-BBM-2024-0847",
    },
    {
      label: "Tanggal",
      value: formData?.step1?.dataPengujian?.tanggalPengujian || "2026-09-13",
    },
    {
      label: "No. SPBU",
      value: formData?.step1?.dataPengujian?.noSPBU || "34.121.01",
    },
    {
      label: "Petugas 1",
      value:
        formData?.step1?.dataPengujian?.namaPetugas1 || "Ahmad Fauzi, S.T.",
    },
    {
      label: "Petugas 2",
      value:
        formData?.step1?.dataPengujian?.namaPetugas2 || "Siti Rahayu, S.T.",
    },
  ];

  const checklist = formData?.step1?.checklist || [];
  const cerapan = formData?.step2?.cerapan || [];

  const checklistTidak = checklist.filter(
    (item) => item.penilaian === "tidak",
  ).length;
  const cerapanTidakLolos = cerapan.filter(
    (item) => item.status === "tidak_lolos",
  ).length;
  const totalGagal = checklistTidak + cerapanTidakLolos;
  const isSuccess = totalGagal === 0;

  const hasData = checklist.length > 0 || cerapan.length > 0;
  const displayDiperiksa = hasData ? checklist.length + cerapan.length : 12;
  const displayGagal = hasData ? totalGagal : 0;
  const displayLolos = hasData
    ? Math.max(displayDiperiksa - displayGagal, 0)
    : 12;
  const displayIsSuccess = hasData ? isSuccess : true;

  const parameterData = [
    {
      parameter: "Kesalahan Rata-rata (Akurasi)",
      nilai: "0.3335",
      satuan: "%",
      toleransi: "± 0.5%",
      status: "LOLOS" as const,
    },
    {
      parameter: "Kemampuan Ulang (Repeatability)",
      nilai: "0.0499",
      satuan: "%",
      toleransi: "≤ 0.3%",
      status: "LOLOS" as const,
    },
    {
      parameter: "Meter Factor",
      nilai: "0.99668",
      satuan: "—",
      toleransi: "0.995 – 1.005",
      status: "LOLOS" as const,
    },
    {
      parameter: "Penjatah Volume",
      nilai: formData?.step2?.dataBejana?.volNominal || "20",
      satuan: "L",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Penjatah Harga",
      nilai: formData?.step2?.dataNozzle?.hargaSatuan
        ? `Rp ${formData.step2.dataNozzle.hargaSatuan}`
        : "Rp 200.000",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Anti-drain (Penghisap Balik)",
      nilai: "Ada",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Laju Alir Maksimum",
      nilai: formData?.step1?.kondisiOperasi?.ujiAlkMaksimum || "80",
      satuan: "L/menit",
      toleransi: "≤ 120 L/menit",
      status: "LOLOS" as const,
    },
    {
      parameter: "Fasilitas Perangkat Penunjukan",
      nilai: "Berfungsi",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Nozzle Cut-off",
      nilai: "Berfungsi",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Interlock (Multi-nozzle)",
      nilai: "Berfungsi",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Kebocoran / Rembesan",
      nilai: "Tidak Ada",
      satuan: "—",
      toleransi: "—",
      status: "LOLOS" as const,
    },
    {
      parameter: "Total Volume Terpakai",
      nilai: formData?.step2?.totalisator?.totalTerpakai || "60.00",
      satuan: "L",
      toleransi: "—",
      status: "—" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto">
        <Stepper
          steps={["Pemeriksaan Awal", "Pengujian/Pemeriksaan", "Hasil"]}
          currentStep={2}
        />
        <div className="flex flex-col gap-[40px]">
          <PageHeader
            title="Hasil Keseluruhan Pengujian"
            subtitle="Evaluasi lengkap semua parameter pengujian Pompa Ukur BBM"
          />

          <ResultCard isSuccess={displayIsSuccess} />
          <MetricSummary
            diperiksa={displayDiperiksa}
            lolos={displayLolos}
            gagal={displayGagal}
          />
          <InfoCard
            identitasAlat={identitasAlat}
            dataPengujian={dataPengujian}
          />
          <ParameterTable data={parameterData} />

          <div className="flex gap-[40px]">
            <button
              type="button"
              onClick={() => {
                if (prevStep) {
                  prevStep();
                }
              }}
              className="w-full py-[8px] px-[16px] border border-[#686868] text-[#686868] font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
            <button
              type="button"
              className="w-full py-[8px] px-[16px] border bg-[#2479BC] text-white font-bold rounded-lg text-sm hover:bg-[#1d6aa6] transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Kirim Hasil
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSimpan}
        noPengujian={dataPengujian[0].value}
        tanggal={dataPengujian[1].value}
        jenisAlat="Pompa Ukur BBM"
        isLoading={isLoading}
      />
    </div>
  );
}
