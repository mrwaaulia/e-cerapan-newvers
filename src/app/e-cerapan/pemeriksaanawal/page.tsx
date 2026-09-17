'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, AlertTriangle } from 'lucide-react';
import Breadcrumb from '@/components/e-cerapan/ui/Breadcrumb';
import PageHeader from '@/components/e-cerapan/ui/PageHeader';
import FormSection from '@/components/e-cerapan/ui/FormSection';
import FormField from '@/components/e-cerapan/ui/FormField';
import Stepper from '@/components/e-cerapan/ui/Stepper';
import { WizardStepProps, Step1Data } from '@/types/wizard';


interface DataPengujian {
  nomorOrder: string;
  namaPemilik: string;
  nomorSIML: string;
  contactPerson: string;
  alamatTerpasang: string;
  namaPompaUkur: string;
  tanggalPengujian: string;
  namaPetugas1: string;
  namaPetugas2: string;
}

interface IdentitasUTTP {
  merek: string;
  tipeModel: string;
  nomorSeri: string;
  jumlahNozzle: string;
  tahunPembuatan: string;
}

interface KondisiOperasi {
  ujiAlkMaksimum: string;
  ujiAlkMinimum: string;
  mfr: string;
  nomorPencacahTipe: string;
}

interface ChecklistItem {
  penilaian: 'ya' | 'tidak' | null;
  keterangan: string;
}

// ─── Checklist Questions ─────────────────────────────────────

const CHECKLIST_QUESTIONS = [
  'Apakah PU BBM dilengkapi dengan Pencacah Tipe (hasil tanda tera)?\n• Apakah informasi pada plat identitas/shelter sesuai dengan Pencacah, spesifikasi, dan PU BBM sesuai dengan Pencacah/Tipe?',
  'Apakah PU BBM sudah dioperasikan dengan benar?\n• Apakah sudah beroperasi/berjalan sesuai rutin dan tidak ada yang rusak?\n• Apakah sudah beroperasi sesuai standar/jam kerja?',
  'Apakah sertifikasi yang sudah diperoleh pada proses pemeriksaan sudah lengkap dan sesuai?\n• Apakah identitas pada pelat/shelter lengkap dan sesuai?\n• Apakah identitas pada pelat/shelter memiliki trat pelat dan/atau informasi?',
  'Apakah PU BBM dalam kondisi lengkap dan bersih?',
  'Apakah pengukuran volume, harga satuan, dan total harga sesuai dengan yang tercatat?',
  'Apakah tidak terdapat kerusakan atau cacat pada alat yang dapat mempengaruhi ketelitian?',
  'Apakah Gallon/tangki bersih, tidak berkarat dan tidak berlubang atau pecah?',
  'Apakah pengukuran volume, harga satuan, dan total harga sesuai dengan yang tercatat pada display?',
  'Apakah (5 ons) dan bensin/minyak, bola dan batas dipoles, dsb, disiapkan sesuai operasi?',
  'Apakah metering/lag meter sesuai dengan indikasi udara di dalam tabung pengukuran yang sama?',
  'Apakah pada PU BBM tidak ditemukan adanya kebocoran atau permasalahan lain?',
  'Apakah pada PU BBM tidak ditemukan adanya tu kesusutan atau permasalahan lainnya?',
];


const INPUT_CLASS =
  'w-full px-4 py-3 rounded-lg border border-gray-300 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2479BC]/30 focus:border-[#2479BC] transition-colors';


export default function PemeriksaanAwalPage({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: Partial<WizardStepProps> = {}) {
  const router = useRouter();

  useEffect(() => {
    if (!updateFormData) {
      router.replace('/e-cerapan');
    }
  }, [updateFormData, router]);

  const [dataPengujian, setDataPengujian] = useState<DataPengujian>(() => ({
    nomorOrder: formData?.step1?.dataPengujian?.nomorOrder || '',
    namaPemilik: formData?.step1?.dataPengujian?.namaPemilik || '',
    nomorSIML: formData?.step1?.dataPengujian?.nomorSIML || '',
    contactPerson: formData?.step1?.dataPengujian?.contactPerson || '',
    alamatTerpasang: formData?.step1?.dataPengujian?.alamatTerpasang || '',
    namaPompaUkur: formData?.step1?.dataPengujian?.namaPompaUkur || '',
    tanggalPengujian: formData?.step1?.dataPengujian?.tanggalPengujian || '',
    namaPetugas1: formData?.step1?.dataPengujian?.namaPetugas1 || '',
    namaPetugas2: formData?.step1?.dataPengujian?.namaPetugas2 || '',
  }));

  const [identitasUTTP, setIdentitasUTTP] = useState<IdentitasUTTP>(() => ({
    merek: formData?.step1?.identitasUTTP?.merek || '',
    tipeModel: formData?.step1?.identitasUTTP?.tipeModel || '',
    nomorSeri: formData?.step1?.identitasUTTP?.nomorSeri || '',
    jumlahNozzle: formData?.step1?.identitasUTTP?.jumlahNozzle || '',
    tahunPembuatan: formData?.step1?.identitasUTTP?.tahunPembuatan || '',
  }));

  const [kondisiOperasi, setKondisiOperasi] = useState<KondisiOperasi>(() => ({
    ujiAlkMaksimum: formData?.step1?.kondisiOperasi?.ujiAlkMaksimum || '',
    ujiAlkMinimum: formData?.step1?.kondisiOperasi?.ujiAlkMinimum || '',
    mfr: formData?.step1?.kondisiOperasi?.mfr || '',
    nomorPencacahTipe: formData?.step1?.kondisiOperasi?.nomorPencacahTipe || '',
  }));

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    if (formData?.step1?.checklist && formData.step1.checklist.length === CHECKLIST_QUESTIONS.length) {
      return formData.step1.checklist.map((item) => ({
        penilaian: item.penilaian,
        keterangan: item.keterangan || '',
      }));
    }
    return CHECKLIST_QUESTIONS.map(() => ({ penilaian: null, keterangan: '' }));
  });

  // ─── Handlers ────────────────────────────────────────────────

  const updateDataPengujian = (field: keyof DataPengujian, value: string) => {
    setDataPengujian((prev) => ({ ...prev, [field]: value }));
  };

  const updateIdentitasUTTP = (field: keyof IdentitasUTTP, value: string) => {
    setIdentitasUTTP((prev) => ({ ...prev, [field]: value }));
  };

  const updateKondisiOperasi = (field: keyof KondisiOperasi, value: string) => {
    setKondisiOperasi((prev) => ({ ...prev, [field]: value }));
  };

  const updateChecklist = (index: number, field: keyof ChecklistItem, value: string | null) => {
    setChecklist((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ─── Check if all mandatory fields and checklist items are filled ───

  const isDataPengujianFilled =
    Boolean(dataPengujian.nomorOrder.trim()) &&
    Boolean(dataPengujian.namaPemilik.trim()) &&
    Boolean(dataPengujian.nomorSIML.trim()) &&
    Boolean(dataPengujian.contactPerson.trim()) &&
    Boolean(dataPengujian.namaPompaUkur.trim()) &&
    Boolean(dataPengujian.tanggalPengujian.trim()) &&
    Boolean(dataPengujian.namaPetugas1.trim()) &&
    Boolean(dataPengujian.namaPetugas2.trim());

  const isIdentitasUTTPFilled =
    Boolean(identitasUTTP.merek.trim()) &&
    Boolean(identitasUTTP.tipeModel.trim()) &&
    Boolean(identitasUTTP.nomorSeri.trim()) &&
    Boolean(identitasUTTP.jumlahNozzle.trim()) &&
    Boolean(identitasUTTP.tahunPembuatan.trim());

  const isKondisiOperasiFilled =
    Boolean(kondisiOperasi.ujiAlkMaksimum.trim()) &&
    Boolean(kondisiOperasi.ujiAlkMinimum.trim()) &&
    Boolean(kondisiOperasi.mfr.trim()) &&
    Boolean(kondisiOperasi.nomorPencacahTipe.trim());

  const allChecklistFilled = checklist.every((item) => item.penilaian !== null);

  const isFormValid =
    isDataPengujianFilled &&
    isIdentitasUTTPFilled &&
    isKondisiOperasiFilled &&
    allChecklistFilled;

  // ─── Submit Handler ──────────────────────────────────────────

  const handleSubmit = () => {
    if (!isFormValid) return;
    const payload: Step1Data = {
      dataPengujian: {
        ...dataPengujian,
        noSPBU: formData?.step1?.dataPengujian?.noSPBU || '34.121.01',
      },
      identitasUTTP,
      kondisiOperasi,
      checklist: checklist.map((item, i) => ({
        no: i + 1,
        uraian: CHECKLIST_QUESTIONS[i],
        ...item,
      })),
    };

    if (updateFormData) {
      updateFormData('step1', payload);
    }
    if (nextStep) {
      nextStep();
    }
  };

// ─── Check Validation ──────────────────────────────────────────

  const allChecklistFilled = checklist.every((item) => item.penilaian !== null);

  const allRequiredFieldsFilled = [
    dataPengujian.nomorOrder,
    dataPengujian.namaPemilik,
    dataPengujian.nomorSIML,
    dataPengujian.contactPerson,
    dataPengujian.namaPompaUkur,
    dataPengujian.tanggalPengujian,
    dataPengujian.namaPetugas1,
    dataPengujian.namaPetugas2,
    identitasUTTP.merek,
    identitasUTTP.tipeModel,
    identitasUTTP.nomorSeri,
    identitasUTTP.jumlahNozzle,
    identitasUTTP.tahunPembuatan,
    kondisiOperasi.ujiAlkMaksimum,
    kondisiOperasi.ujiAlkMinimum,
    kondisiOperasi.mfr,
    kondisiOperasi.nomorPencacahTipe,
  ].every((val) => val.trim() !== '');

  const isFormValid = allChecklistFilled && allRequiredFieldsFilled;


  return (
    <div className="min-h-screen bg-[#F9F9F9] w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'E-Cerapan', href: '/e-cerapan' },
            { label: 'Pemeriksaan Awal' },
          ]}
        />

        {/* Stepper */}
        <Stepper
          steps={['Pemeriksaan Awal', 'Pengujian/Pemeriksaan', 'Hasil']}
          currentStep={0}
        />

        {/* Page Header */}
        <PageHeader
          title="Pemeriksaan Awal"
          subtitle="Pompa Ukur BBM — Isi seluruh data awal cerapan/pemeriksaan."
        />

        {/* ═══ SECTION 1: Data Pengujian ═══ */}
        <FormSection title="Data Pengujian">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <FormField label="Nomor Order" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. ORD-001"
                value={dataPengujian.nomorOrder}
                onChange={(e) => updateDataPengujian('nomorOrder', e.target.value)}
              />
            </FormField>

            <FormField label="Nama Pemilik/Penanggung Jawab" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. PT Pertamina Retail"
                value={dataPengujian.namaPemilik}
                onChange={(e) => updateDataPengujian('namaPemilik', e.target.value)}
              />
            </FormField>

            <FormField label="Nomor SIML" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. 01234"
                value={dataPengujian.nomorSIML}
                onChange={(e) => updateDataPengujian('nomorSIML', e.target.value)}
              />
            </FormField>

            <FormField label="Contact Person" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. Budi Santoso, 081234567890"
                value={dataPengujian.contactPerson}
                onChange={(e) => updateDataPengujian('contactPerson', e.target.value)}
              />
            </FormField>

            <FormField label="Alamat Terpasang" className="md:col-span-2">
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. Jl. Indonesia 123"
                value={dataPengujian.alamatTerpasang}
                onChange={(e) => updateDataPengujian('alamatTerpasang', e.target.value)}
              />
            </FormField>

            <FormField label="Nama Pompa Ukur" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. PU-001"
                value={dataPengujian.namaPompaUkur}
                onChange={(e) => updateDataPengujian('namaPompaUkur', e.target.value)}
              />
            </FormField>

            <FormField label="Tanggal Pengujian" required>
              <div className="relative">
                <input
                  type="date"
                  className={INPUT_CLASS}
                  value={dataPengujian.tanggalPengujian}
                  onChange={(e) => updateDataPengujian('tanggalPengujian', e.target.value)}
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </FormField>

            <FormField label="Nama Petugas 1" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. Budi Santoso"
                value={dataPengujian.namaPetugas1}
                onChange={(e) => updateDataPengujian('namaPetugas1', e.target.value)}
              />
            </FormField>

            <FormField label="Nama Petugas 2" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. Budi Santoso"
                value={dataPengujian.namaPetugas2}
                onChange={(e) => updateDataPengujian('namaPetugas2', e.target.value)}
              />
            </FormField>
          </div>
        </FormSection>

        {/* ═══ SECTION 2: Identitas UTTP (Alat) ═══ */}
        <FormSection title="Identitas UTTP (Alat)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Merek" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. Gilbarco"
                value={identitasUTTP.merek}
                onChange={(e) => updateIdentitasUTTP('merek', e.target.value)}
              />
            </FormField>

            <FormField label="Tipe/Model" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. Encore Seri 1"
                value={identitasUTTP.tipeModel}
                onChange={(e) => updateIdentitasUTTP('tipeModel', e.target.value)}
              />
            </FormField>

            <FormField label="Nomor Seri" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. SN-30092"
                value={identitasUTTP.nomorSeri}
                onChange={(e) => updateIdentitasUTTP('nomorSeri', e.target.value)}
              />
            </FormField>

            <FormField label="Jumlah Nozzle" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. 1"
                value={identitasUTTP.jumlahNozzle}
                onChange={(e) => updateIdentitasUTTP('jumlahNozzle', e.target.value)}
              />
            </FormField>

            <FormField label="Tahun Pembuatan" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. 2020"
                value={identitasUTTP.tahunPembuatan}
                onChange={(e) => updateIdentitasUTTP('tahunPembuatan', e.target.value)}
              />
            </FormField>
          </div>
        </FormSection>

        {/* ═══ SECTION 3: Kondisi Operasi ═══ */}
        <FormSection title="Kondisi Operasi">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <FormField label="Uji Alk Maksimum (L/menit)" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. 1"
                value={kondisiOperasi.ujiAlkMaksimum}
                onChange={(e) => updateKondisiOperasi('ujiAlkMaksimum', e.target.value)}
              />
            </FormField>

            <FormField label="Uji Alk Minimum (L/menit)" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. 1"
                value={kondisiOperasi.ujiAlkMinimum}
                onChange={(e) => updateKondisiOperasi('ujiAlkMinimum', e.target.value)}
              />
            </FormField>

            <FormField label="MFR = Min Measured Quantity (L) (hasil)" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. 1"
                value={kondisiOperasi.mfr}
                onChange={(e) => updateKondisiOperasi('mfr', e.target.value)}
              />
            </FormField>

            <FormField label="Nomor Pencacah/Tipe" required>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="cth. P1-X-Style-V2022"
                value={kondisiOperasi.nomorPencacahTipe}
                onChange={(e) => updateKondisiOperasi('nomorPencacahTipe', e.target.value)}
              />
            </FormField>
          </div>
        </FormSection>

        {/* ═══ SECTION 4: Checklist Pemeriksaan ═══ */}
        <FormSection title="Checklist Pemeriksaan">
          <div className="overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 font-semibold text-gray-700 w-[50px]">No</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Uraian</th>
                  <th className="text-center py-3 px-3 font-semibold text-gray-700 w-[120px]">Penilaian</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700 w-[200px]">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {CHECKLIST_QUESTIONS.map((question, index) => {
                  const isYa = checklist[index].penilaian === 'ya';
                  const isTidak = checklist[index].penilaian === 'tidak';

                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-4 px-3 text-gray-600 align-top font-medium">{index + 1}</td>
                      <td className="py-4 px-3 text-gray-700 align-top whitespace-pre-line leading-relaxed">
                        {question}
                      </td>
                      <td className="py-4 px-3 align-top">
                        <div className="flex items-center justify-center gap-4">
                          
                          {/* Tombol"Ya" */}
                          <button
                            type="button"
                            // Jika sudah "ya", klik lagi akan mengubahnya jadi null (cancel). Jika belum, ubah jadi "ya"
                            onClick={() => updateChecklist(index, 'penilaian', isYa ? null : 'ya')}
                            className="flex items-center gap-1.5 cursor-pointer group focus:outline-none"
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                              isYa ? 'border-[#64CC4A]' : 'border-gray-300 group-hover:border-gray-400'
                            }`}>
                              {/* Lingkaran dalam (hijau solid tanpa hitam) */}
                              {isYa && <div className="w-2 h-2 rounded-full bg-[#64CC4A]" />}
                            </div>
                            <span className={`text-[13px] transition-colors ${
                              isYa ? 'text-[#64CC4A] font-bold' : 'text-gray-600 group-hover:text-gray-800'
                            }`}>
                              Ya
                            </span>
                          </button>

                          {/* Tombol "Tidak" */}
                          <button
                            type="button"
                            // Jika sudah "tidak", klik lagi akan mengubahnya jadi null (cancel). Jika belum, ubah jadi "tidak"
                            onClick={() => updateChecklist(index, 'penilaian', isTidak ? null : 'tidak')}
                            className="flex items-center gap-1.5 cursor-pointer group focus:outline-none"
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                              isTidak ? 'border-red-500' : 'border-gray-300 group-hover:border-gray-400'
                            }`}>
                              {/* Lingkaran dalam (merah solid) */}
                              {isTidak && <div className="w-2 h-2 rounded-full bg-red-500" />}
                            </div>
                            <span className={`text-[13px] transition-colors ${
                              isTidak ? 'text-red-500 font-bold' : 'text-gray-600 group-hover:text-gray-800'
                            }`}>
                              Tidak
                            </span>
                          </button>

                        </div>
                      </td>
                      <td className="py-4 px-3 align-top">
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2479BC]/30 focus:border-[#2479BC] transition-colors"
                          placeholder="Keterangan..."
                          value={checklist[index].keterangan}
                          onChange={(e) => updateChecklist(index, 'keterangan', e.target.value)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Warning */}
          {!isFormValid && (
            <div className="flex items-center gap-3 mt-6 px-4 py-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-[14px] text-amber-700">
                {!allRequiredFieldsFilled 
                  ? 'Lengkapi semua kolom form yang wajib diisi (bertanda *).' 
                  : 'Lengkapi semua penilaian checklist sebelum melanjutkan.'}
              </p>
            </div>
          )}
        </FormSection>

        {/* ═══ Submit Button ═══ */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl text-[18px] font-semibold transition-all ${isFormValid
            ? 'bg-[#2479BC] text-white hover:bg-[#1d6aa6] active:scale-[0.99] cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Validasi Pemeriksaan
        </button>
      </div>
    </div>
  );
}
