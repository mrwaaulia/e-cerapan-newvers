"use client";

import { useState } from "react";

import PageHeader from "@/components/e-cerapan/layout/PageHeader";

import FormCard from "@/components/e-cerapan/form/FormCard";
import FormField from "@/components/e-cerapan/form/FormField";

import AlertMessage from "@/components/e-cerapan/feedback/AlertMessage";
import ConfirmModal from "@/components/e-cerapan/feedback/ConfirmModal";

import Input from "@/components/ui/Input";
import RadioGroup from "@/components/ui/RadioGroup";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/e-cerapan/layout/Breadcrumb";
import StatCard from "@/components/e-cerapan/cards/StatCard";

// ======================================================
// DATA CHECKLIST PEMERIKSAAN
// ======================================================

interface ChecklistItem {
  id: number;
  description: string;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 1,
    description: `Apakah PU BBM dilengkapi dengan Persetujuan Tipe (untuk Tera)?
- Apakah informasi pada pelat identitas sesuai dengan Persetujuan Tipe?
- Apakah spesifikasi teknis PU BBM sesuai dengan Persetujuan Tipe?`,
  },
  {
    id: 2,
    description: `Apakah PU BBM sudah digunakan dengan benar?
- Apakah tanda tera sebelumnya masih utuh dan tidak ada yang rusak?
- Apakah tidak terdapat alat tambahan yang mengubah spesifikasi dan/atau memengaruhi hasil pengukuran PU BBM?`,
  },
  {
    id: 3,
    description: `Apakah semua deskripsi yang wajib jelas terpasang pada pelat identitas dan terpasang tetap pada PU BBM?
- Apakah identitas pada pelat data lengkap sesuai syarat teknis?
- Apakah identitas pada pelat data mudah terlihat, jelas dan mudah dibaca?`,
  },
  {
    id: 4,
    description: "Apakah PU BBM dalam kondisi lengkap dan bersih?",
  },
  {
    id: 5,
    description:
      "Apakah PU BBM terpasang dengan kokoh pada pondasinya atau pada sisi Tangki Ukur Mobil BBM?",
  },
  {
    id: 6,
    description:
      "Apakah tidak terdapat kerusakan pada penutup Perangkat Penunjuk?",
  },
  {
    id: 7,
    description: "Apakah Gelas Penglihat bersih serta penuh dengan produk?",
  },
  {
    id: 8,
    description:
      "Apakah penunjukan volume, harga satuan, dan total harga sesuai dengan Slang yang dipilih?",
  },
  {
    id: 9,
    description:
      "Apakah penunjukan volume, harga satuan, dan total harga sesuai dengan Slang yang dipilih?",
  },
  {
    id: 10,
    description: `Apakah Slang dalam kondisi baik, (pada slang apakah ditemukan kondisi seperti lecet, retak atau pembungkus Slangnya telah usang)?`,
  },
  {
    id: 11,
    description:
      "Apakah masing-masing nozzle menghentikan aliran cairan ketika dikembalikan ke tempat penyimpanannya?",
  },
  {
    id: 12,
    description:
      "Apakah pada PU BBM tidak ditemukan adanya kebocoran atau rembesan cairan?",
  },
];

// ======================================================
// TIPE DATA FORM
// ======================================================

interface PengujianData {
  nomorOrder: string;
  namaPemilik: string;
  nomorSPBU: string;
  contactPerson: string;
  alamatTerpasang: string;
  nomorPompa: string;
  tanggalPengujian: string;
  namaPetugas1: string;
  namaPetugas2: string;
}

interface ChecklistAnswer {
  penilaian: string;
  keterangan: string;
}

// ======================================================
// HALAMAN PEMERIKSAAN AWAL
// ======================================================

export default function ExamplePemeriksaanAwalPage() {
  // ----------------------------------------------------
  // STATE DATA PENGUJIAN
  // ----------------------------------------------------

  const [formData, setFormData] = useState<PengujianData>({
    nomorOrder: "",
    namaPemilik: "",
    nomorSPBU: "",
    contactPerson: "",
    alamatTerpasang: "",
    nomorPompa: "",
    tanggalPengujian: "",
    namaPetugas1: "",
    namaPetugas2: "",
  });

  // ----------------------------------------------------
  // STATE CHECKLIST
  // ----------------------------------------------------

  const [checklistAnswers, setChecklistAnswers] = useState<
    Record<number, ChecklistAnswer>
  >({});

  // ----------------------------------------------------
  // STATE MODAL
  // ----------------------------------------------------

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // ----------------------------------------------------
  // STATE VALIDASI
  // ----------------------------------------------------

  const [isSubmitted, setIsSubmitted] = useState(false);

  // ----------------------------------------------------
  // HANDLER DATA PENGUJIAN
  // ----------------------------------------------------

  const handleFormChange = (field: keyof PengujianData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ----------------------------------------------------
  // HANDLER CHECKLIST
  // ----------------------------------------------------

  const handleChecklistChange = (
    id: number,
    field: keyof ChecklistAnswer,
    value: string,
  ) => {
    setChecklistAnswers((prev) => ({
      ...prev,
      [id]: {
        penilaian: prev[id]?.penilaian ?? "",
        keterangan: prev[id]?.keterangan ?? "",
        [field]: value,
      },
    }));
  };

  // ----------------------------------------------------
  // VALIDASI DATA
  // ----------------------------------------------------

  const requiredFields: (keyof PengujianData)[] = [
    "nomorOrder",
    "namaPemilik",
    "nomorSPBU",
    "contactPerson",
    "alamatTerpasang",
    "nomorPompa",
    "tanggalPengujian",
    "namaPetugas1",
    "namaPetugas2",
  ];

  const isFormComplete = requiredFields.every(
    (field) => formData[field].trim() !== "",
  );

  const isChecklistComplete = checklistItems.every(
    (item) =>
      checklistAnswers[item.id]?.penilaian !== undefined &&
      checklistAnswers[item.id]?.penilaian !== "",
  );

  const isAllComplete = isFormComplete && isChecklistComplete;

  // ----------------------------------------------------
  // HANDLER VALIDASI PEMERIKSAAN
  // ----------------------------------------------------

  const handleValidate = () => {
    setIsConfirmOpen(true);
  };

  // ----------------------------------------------------
  // HANDLER KONFIRMASI
  // ----------------------------------------------------

  const handleConfirm = () => {
    setIsConfirmOpen(false);

    // Sementara hanya simulasi validasi frontend.
    // Belum ada pengiriman data ke backend atau database.
    setIsSubmitted(true);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      {/* ================================================
          BREADCRUMB
      ================================================ */}

      <Breadcrumb
        items={[
          {
            label: "E-Cerapan",
            href: "/e-cerapan",
          },
          {
            label: "Cerapan Pompa Ukur BBM",
          },
        ]}
      />

      {/* ================================================
          STEPPER
      ================================================ */}

      <div className="flex gap-4 mb-8">
        <Button variant="outline" size="md" fullWidth>
          Test
        </Button>
        <Button variant="primary" size="md" fullWidth>
          Test
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard value={1} label="Pengujian" valueColor="primary" />
        <StatCard value={1} label="Pengujian" valueColor="danger" />
        <StatCard value={1} label="Pengujian" valueColor="warning" />
      </div>

      {/* ================================================
          PAGE HEADER
      ================================================ */}

      <PageHeader
        title="Pemeriksaan Awal"
        description="Pompa Ukur BBM - Isi seluruh data dan checklist pemeriksaan"
        className="mb-7"
      />

      {/* ================================================
          FORM DATA PENGUJIAN
      ================================================ */}

      <FormCard
        title="Data Pengujian"
        className="mb-7"
        headerClassName="bg-gray-200 px-5 py-3"
        contentClassName="p-5"
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          {/* NOMOR ORDER */}

          <FormField
            label="Nomor Order"
            required
            error={
              isSubmitted && !formData.nomorOrder.trim()
                ? "Nomor order wajib diisi."
                : undefined
            }
          >
            <Input
              placeholder="cth. ORD-001"
              value={formData.nomorOrder}
              onChange={(e) => handleFormChange("nomorOrder", e.target.value)}
            />
          </FormField>

          {/* NAMA PEMILIK */}

          <FormField
            label="Nama Pemilik/Penanggung Jawab"
            required
            error={
              isSubmitted && !formData.namaPemilik.trim()
                ? "Nama pemilik wajib diisi."
                : undefined
            }
          >
            <Input
              placeholder="cth. PT Pertamina Retail"
              value={formData.namaPemilik}
              onChange={(e) => handleFormChange("namaPemilik", e.target.value)}
            />
          </FormField>

          {/* NOMOR SPBU */}

          <FormField
            label="Nomor SPBU"
            required
            error={
              isSubmitted && !formData.nomorSPBU.trim()
                ? "Nomor SPBU wajib diisi."
                : undefined
            }
          >
            <Input
              placeholder="cth. 01.001.01"
              value={formData.nomorSPBU}
              onChange={(e) => handleFormChange("nomorSPBU", e.target.value)}
            />
          </FormField>

          {/* CONTACT PERSON */}

          <FormField
            label="Contact Person"
            required
            error={
              isSubmitted && !formData.contactPerson.trim()
                ? "Contact person wajib diisi."
                : undefined
            }
          >
            <Input
              placeholder="cth. Budi Santoso, 081234567890"
              value={formData.contactPerson}
              onChange={(e) =>
                handleFormChange("contactPerson", e.target.value)
              }
            />
          </FormField>

          {/* ALAMAT TERPASANG */}

          <FormField
            label="Alamat Terpasang"
            required
            className="md:col-span-2"
            error={
              isSubmitted && !formData.alamatTerpasang.trim()
                ? "Alamat terpasang wajib diisi."
                : undefined
            }
          >
            <Input
              placeholder="cth. Jl. Jakarta No. 123"
              value={formData.alamatTerpasang}
              onChange={(e) =>
                handleFormChange("alamatTerpasang", e.target.value)
              }
            />
          </FormField>

          {/* NOMOR POMPA UKUR */}

          <FormField
            label="Nomor Pompa Ukur"
            required
            error={
              isSubmitted && !formData.nomorPompa.trim()
                ? "Nomor pompa ukur wajib diisi."
                : undefined
            }
          >
            <Input
              placeholder="cth. PU-001"
              value={formData.nomorPompa}
              onChange={(e) => handleFormChange("nomorPompa", e.target.value)}
            />
          </FormField>

          {/* TANGGAL PENGUJIAN */}

          <FormField
            label="Tanggal Pengujian"
            required
            error={
              isSubmitted && !formData.tanggalPengujian.trim()
                ? "Tanggal pengujian wajib diisi."
                : undefined
            }
          >
            <Input
              type="date"
              value={formData.tanggalPengujian}
              onChange={(e) =>
                handleFormChange("tanggalPengujian", e.target.value)
              }
            />
          </FormField>

          {/* NAMA PETUGAS 1 */}

          <FormField
            label="Nama Petugas 1"
            required
            error={
              isSubmitted && !formData.namaPetugas1.trim()
                ? "Nama petugas 1 wajib diisi."
                : undefined
            }
          >
            <Input
              placeholder="cth. Budi Santoso"
              value={formData.namaPetugas1}
              onChange={(e) => handleFormChange("namaPetugas1", e.target.value)}
            />
          </FormField>

          {/* NAMA PETUGAS 2 */}

          <FormField
            label="Nama Petugas 2"
            required
            error={
              isSubmitted && !formData.namaPetugas2.trim()
                ? "Nama petugas 2 wajib diisi."
                : undefined
            }
          >
            <Input
              placeholder="cth. Budi Santoso"
              value={formData.namaPetugas2}
              onChange={(e) => handleFormChange("namaPetugas2", e.target.value)}
            />
          </FormField>
        </div>
      </FormCard>

      {/* ================================================
          CHECKLIST PEMERIKSAAN
      ================================================ */}

      <FormCard
        title="Checklist Pemeriksaan"
        className="mb-5"
        headerClassName="bg-gray-200 px-5 py-3"
        contentClassName="p-0"
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[760px] table-fixed border-collapse text-xs">
            {/* TABLE HEADER */}

            <thead>
              <tr className="border-b border-gray-200 text-primary">
                <th className="w-[6%] px-3 py-3 text-center font-medium">No</th>

                <th className="w-[49%] px-3 py-3 text-left font-medium">
                  Deskripsi
                </th>

                <th className="w-[22%] px-3 py-3 text-center font-medium">
                  Penilaian
                </th>

                <th className="w-[23%] px-3 py-3 text-left font-medium">
                  Keterangan <span className="text-neutral">*opsional</span>
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody>
              {checklistItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  {/* NOMOR */}

                  <td className="px-3 py-3 text-center align-middle text-black">
                    {item.id}
                  </td>

                  {/* DESKRIPSI */}

                  <td className="whitespace-pre-line px-3 py-3 align-middle leading-[1.35] text-black">
                    {item.description}
                  </td>

                  {/* PENILAIAN */}

                  <td className="px-2 py-3 align-middle">
                    <RadioGroup
                      name={`penilaian-${item.id}`}
                      value={checklistAnswers[item.id]?.penilaian ?? ""}
                      onChange={(value) =>
                        handleChecklistChange(item.id, "penilaian", value)
                      }
                      options={[
                        {
                          label: "Ya",
                          value: "ya",
                        },
                        {
                          label: "Tidak",
                          value: "tidak",
                        },
                      ]}
                      className="justify-center gap-3"
                      inputClassName="h-3.5 w-3.5"
                    />
                  </td>

                  {/* KETERANGAN */}

                  <td className="px-3 py-3 align-middle">
                    <Textarea
                      placeholder="Masukkan Keterangan"
                      rows={1}
                      value={checklistAnswers[item.id]?.keterangan ?? ""}
                      onChange={(e) =>
                        handleChecklistChange(
                          item.id,
                          "keterangan",
                          e.target.value,
                        )
                      }
                      className="min-h-[34px] resize-y px-2 py-2 text-[10px]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==============================================
            ALERT CHECKLIST
        ============================================== */}

        <div className="px-5 pb-5 pt-4">
          <AlertMessage
            variant="warning"
            message={
              isChecklistComplete
                ? "Seluruh penilaian checklist telah dilengkapi."
                : "Lengkapi semua penilaian checklist sebelum validasi"
            }
            className="text-xs"
          />
        </div>
      </FormCard>

      {/* ================================================
          TOMBOL VALIDASI
      ================================================ */}

      <div className="mb-8">
        <Button fullWidth onClick={handleValidate}>
          Validasi Pemeriksaan
        </Button>
      </div>

      {/* ================================================
          CONFIRM MODAL
      ================================================ */}

      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Konfirmasi Pemeriksaan"
        description="Pastikan seluruh data dan checklist pemeriksaan telah sesuai sebelum melanjutkan proses."
        confirmText="Konfirmasi"
        cancelText="Batal"
      >
        <div className="space-y-3 border-y border-gray-200 py-4">
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-neutral">Nomor Order</span>

            <span className="text-right font-medium text-black">
              {formData.nomorOrder || "-"}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-neutral">Nomor Pompa Ukur</span>

            <span className="text-right font-medium text-black">
              {formData.nomorPompa || "-"}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-neutral">Tanggal Pengujian</span>

            <span className="text-right font-medium text-black">
              {formData.tanggalPengujian || "-"}
            </span>
          </div>
        </div>
      </ConfirmModal>
    </div>
  );
}
