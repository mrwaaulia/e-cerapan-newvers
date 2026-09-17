// src/app/e-cerapan/pengujian/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
import Breadcrumb from '@/components/e-cerapan/ui/Breadcrumb';
import PageHeader from '@/components/e-cerapan/ui/PageHeader';
import FormField from '@/components/e-cerapan/ui/FormField';
import Stepper from '@/components/e-cerapan/ui/Stepper';
import SectionCard from '@/components/e-cerapan/ui/SectionCard';
import SummaryCard from '@/components/e-cerapan/ui/SummaryCard';
import { WizardStepProps, Step2Data, DataNozzle, DataBejana, Totalisator, CerapanItem } from '@/types/wizard';

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-lg border border-gray-300 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2479BC]/30 focus:border-[#2479BC] transition-colors disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed';

function parseNum(val: string | undefined | null): number {
  if (!val) return NaN;
  const clean = val.toString().replace(',', '.').trim();
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? NaN : parsed;
}

export default function PengujianPerhitunganPage({
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

  const step1DataPengujian = formData?.step1?.dataPengujian;
  const step1IdentitasUTTP = formData?.step1?.identitasUTTP;

  const dataPengujian = {
    nomorOrder: step1DataPengujian?.nomorOrder || 'ORD-2024-0847',
    noSPBU: step1DataPengujian?.noSPBU || '34.121.01',
    namaPemilik: step1DataPengujian?.namaPemilik || 'PT. Pertamina Retail',
    nomorPompaUkur: step1DataPengujian?.namaPompaUkur || 'PU-001',
    merekTipe: (step1IdentitasUTTP?.merek && step1IdentitasUTTP?.tipeModel)
      ? `${step1IdentitasUTTP.merek} ${step1IdentitasUTTP.tipeModel}`
      : step1IdentitasUTTP?.merek || 'Tokheim Quantium 310',
    nomorSeri: step1IdentitasUTTP?.nomorSeri || 'SN-2023-TKH-0456',
  };

  const [dataNozzle, setDataNozzle] = useState<DataNozzle>(() => ({
    identitas: formData?.step2?.dataNozzle?.identitas || 'Nozzle 1',
    jenisCairan: formData?.step2?.dataNozzle?.jenisCairan || 'Pertalite (RON 90)',
    hargaSatuan: formData?.step2?.dataNozzle?.hargaSatuan || '10000',
  }));

  const [dataBejana, setDataBejana] = useState<DataBejana>(() => ({
    merek: formData?.step2?.dataBejana?.merek || 'Pertamina Calibration',
    tipe: formData?.step2?.dataBejana?.tipe || 'BU-20L',
    nomorSeri: formData?.step2?.dataBejana?.nomorSeri || 'BJ-2023-0012',
    volNominal: formData?.step2?.dataBejana?.volNominal || '20',
    volSebenarnya: formData?.step2?.dataBejana?.volSebenarnya || '19.998',
    skalaUtama: formData?.step2?.dataBejana?.skalaUtama || '0.05',
    tglVerifikasi: formData?.step2?.dataBejana?.tglVerifikasi || '2023-12-22',
  }));

  const [totalisator, setTotalisator] = useState<Totalisator>(() => ({
    sebelumUji: formData?.step2?.totalisator?.sebelumUji || '15432,000',
    sesudahUji: formData?.step2?.totalisator?.sesudahUji || '15492,000',
    totalTerpakai: formData?.step2?.totalisator?.totalTerpakai || '60.000 L',
  }));

  const [cerapan, setCerapan] = useState<CerapanItem[]>(() => {
    if (formData?.step2?.cerapan && formData.step2.cerapan.length > 0) {
      return formData.step2.cerapan;
    }
    return [
      { volNominal: '20', penunjukan: '20,050', volSebenarnya: '19,980', kesalahan: '+0.3504', status: 'lolos' },
      { volNominal: '20', penunjukan: '20,080', volSebenarnya: '20,01', kesalahan: '+0.3498', status: 'lolos' },
      { volNominal: '20', penunjukan: '20,150', volSebenarnya: '19,950', kesalahan: '+0.7500', status: 'tidak_lolos' },
    ];
  });

  // ─── Real-Time Totalisator Handler ───
  const handleTotalisatorChange = (field: 'sebelumUji' | 'sesudahUji', value: string) => {
    setTotalisator((prev) => {
      const updated = { ...prev, [field]: value };
      const a = parseNum(updated.sebelumUji);
      const b = parseNum(updated.sesudahUji);
      if (!isNaN(a) && !isNaN(b)) {
        updated.totalTerpakai = `${(b - a).toFixed(3)} L`;
      }
      return updated;
    });
  };

  // ─── Real-Time Cerapan Handler ───
  const updateCerapan = (index: number, field: keyof CerapanItem, value: string) => {
    setCerapan((prev) => {
      const updated = [...prev];
      const newItem = { ...updated[index], [field]: value };

      const p = parseNum(field === 'penunjukan' ? value : newItem.penunjukan);
      const v = parseNum(field === 'volSebenarnya' ? value : newItem.volSebenarnya);

      if (!isNaN(p) && !isNaN(v) && v > 0) {
        const rawError = ((p - v) / v) * 100;
        const roundedError = Number(rawError.toFixed(4));
        const signStr = roundedError >= 0 ? '+' : '';
        newItem.kesalahan = `${signStr}${roundedError.toFixed(4)}`;
        newItem.status = (roundedError >= -0.5 && roundedError <= 0.5) ? 'lolos' : 'tidak_lolos';
      } else {
        newItem.kesalahan = '';
        newItem.status = '';
      }

      updated[index] = newItem;
      return updated;
    });
  };

  // ─── Real-Time Calculations for Cerapan Summary ───
  const cerapanCalculations = cerapan.map((item) => {
    const p = parseNum(item.penunjukan);
    const v = parseNum(item.volSebenarnya);

    if (isNaN(p) || isNaN(v) || v <= 0) {
      return {
        errorVal: null as number | null,
        errorStr: '',
        status: '',
        isFilled: false,
      };
    }

    const rawError = ((p - v) / v) * 100;
    const roundedError = Number(rawError.toFixed(4));
    const signStr = roundedError >= 0 ? '+' : '';
    const formattedStr = `${signStr}${roundedError.toFixed(4)}`;
    const status = (roundedError >= -0.5 && roundedError <= 0.5) ? 'lolos' : 'tidak_lolos';

    return {
      errorVal: roundedError,
      errorStr: formattedStr,
      status,
      isFilled: true,
    };
  });

  const allCerapanFilled = cerapanCalculations.length === 3 && cerapanCalculations.every((c) => c.isFilled && c.errorVal !== null);

  let averageErrorStr = '—';
  let averageErrorStatus: 'LOLOS' | 'TIDAK LOLOS' | undefined = undefined;

  let repeatabilityStr = '—';
  let repeatabilityStatus: 'LOLOS' | 'TIDAK LOLOS' | undefined = undefined;

  if (allCerapanFilled) {
    const errors = cerapanCalculations.map((c) => c.errorVal as number);
    const sum = errors.reduce((acc, curr) => acc + curr, 0);
    const rawAvg = sum / errors.length;
    const averageErrorVal = Number(rawAvg.toFixed(4));
    const avgSign = averageErrorVal >= 0 ? '+' : '';
    averageErrorStr = `${avgSign}${averageErrorVal.toFixed(4)}%`;
    averageErrorStatus = (averageErrorVal >= -0.5 && averageErrorVal <= 0.5) ? 'LOLOS' : 'TIDAK LOLOS';

    const maxErr = Math.max(...errors);
    const minErr = Math.min(...errors);
    const rawR = maxErr - minErr;
    const repeatabilityVal = Number(rawR.toFixed(4));
    repeatabilityStr = `${repeatabilityVal.toFixed(4)}%`;
    repeatabilityStatus = repeatabilityVal <= 0.3 ? 'LOLOS' : 'TIDAK LOLOS';
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] w-full">
      <div className="px-8 py-8 md:px-12 md:py-12 max-w-[1100px] mx-auto space-y-8">
        
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'E-Cerapan', href: '/e-cerapan' },
            { label: 'Pengujian & Perhitungan' },
          ]}
        />

        <Stepper
          steps={['Pemeriksaan Awal', 'Pengujian & Perhitungan', 'Hasil']}
          currentStep={1} 
        />

        <PageHeader
          title="Pemeriksaan Pengujian & Perhitungan Awal"
          subtitle="Pompa Ukur BBM — Input data pengujian dan cerapan"
        />

        <SectionCard title="Data Pengujian">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Nomor Order"><input type="text" className={INPUT_CLASS} value={dataPengujian.nomorOrder} disabled /></FormField>
            <FormField label="No. SPBU"><input type="text" className={INPUT_CLASS} value={dataPengujian.noSPBU} disabled /></FormField>
            <FormField label="Nama Pemilik/Penanggung Jawab"><input type="text" className={INPUT_CLASS} value={dataPengujian.namaPemilik} disabled /></FormField>
            <FormField label="Nomor Pompa Ukur"><input type="text" className={INPUT_CLASS} value={dataPengujian.nomorPompaUkur} disabled /></FormField>
            <FormField label="Merek/Tipe"><input type="text" className={INPUT_CLASS} value={dataPengujian.merekTipe} disabled /></FormField>
            <FormField label="Nomor Seri"><input type="text" className={INPUT_CLASS} value={dataPengujian.nomorSeri} disabled /></FormField>
          </div>
        </SectionCard>

        <SectionCard title="Data Pengujian Nozzle">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Identitas Nozzle" required><input type="text" className={INPUT_CLASS} value={dataNozzle.identitas} onChange={(e) => setDataNozzle({...dataNozzle, identitas: e.target.value})} /></FormField>
            <FormField label="Jenis Cairan" required><input type="text" className={INPUT_CLASS} value={dataNozzle.jenisCairan} onChange={(e) => setDataNozzle({...dataNozzle, jenisCairan: e.target.value})} /></FormField>
            <FormField label="Harga Satuan (Rp/L)" required><input type="text" className={INPUT_CLASS} value={dataNozzle.hargaSatuan} onChange={(e) => setDataNozzle({...dataNozzle, hargaSatuan: e.target.value})} /></FormField>
          </div>
        </SectionCard>

        <SectionCard title="Data Bejana Ukur">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Merek" required><input type="text" className={INPUT_CLASS} value={dataBejana.merek} onChange={(e) => setDataBejana({...dataBejana, merek: e.target.value})} /></FormField>
            <FormField label="Tipe/Model" required><input type="text" className={INPUT_CLASS} value={dataBejana.tipe} onChange={(e) => setDataBejana({...dataBejana, tipe: e.target.value})} /></FormField>
            <FormField label="Nomor Seri" required><input type="text" className={INPUT_CLASS} value={dataBejana.nomorSeri} onChange={(e) => setDataBejana({...dataBejana, nomorSeri: e.target.value})} /></FormField>
            <FormField label="Volume Nominal (L)" required><input type="text" className={INPUT_CLASS} value={dataBejana.volNominal} onChange={(e) => setDataBejana({...dataBejana, volNominal: e.target.value})} /></FormField>
            <FormField label="Volume Sebenarnya (L)" required><input type="text" className={INPUT_CLASS} value={dataBejana.volSebenarnya} onChange={(e) => setDataBejana({...dataBejana, volSebenarnya: e.target.value})} /></FormField>
            <FormField label="Skala Utama Sebenarnya (L)" required><input type="text" className={INPUT_CLASS} value={dataBejana.skalaUtama} onChange={(e) => setDataBejana({...dataBejana, skalaUtama: e.target.value})} /></FormField>
            <FormField label="Tanggal Verifikasi Terakhir" required>
              <div className="relative">
                <input type="date" className={INPUT_CLASS} value={dataBejana.tglVerifikasi} onChange={(e) => setDataBejana({...dataBejana, tglVerifikasi: e.target.value})} />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="Totalisator" subtitle="Penunjukan meter pompa sebelum dan sesudah pengujian">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
            <FormField label="Sebelum Uji — a (L)" required><input type="text" className={INPUT_CLASS} value={totalisator.sebelumUji} onChange={(e) => handleTotalisatorChange('sebelumUji', e.target.value)} /></FormField>
            <FormField label="Sesudah Uji — b (L)" required><input type="text" className={INPUT_CLASS} value={totalisator.sesudahUji} onChange={(e) => handleTotalisatorChange('sesudahUji', e.target.value)} /></FormField>
            <FormField label="Total Terpakai — (b-a)"><input type="text" className={`${INPUT_CLASS} font-semibold`} value={totalisator.totalTerpakai} disabled /></FormField>
          </div>
        </SectionCard>

        {/* ═══ SECTION 5: Input Cerapan (Dynamic Colors) ═══ */}
        <div className="bg-[#F3F4F6] rounded-xl border border-gray-200 p-6 md:p-8 space-y-6">
          <div className="mb-2">
            <h3 className="font-semibold text-gray-800 text-lg">Input Cerapan</h3>
            <p className="text-[14px] text-gray-500">Masukkan data 3 kali penyerahan untuk masing-masing nozzle</p>
          </div>

          {cerapan.map((item, index) => {
            const calc = cerapanCalculations[index];
            const isFilled = calc.isFilled;
            const isError = calc.status === 'tidak_lolos';
            
            // Toggle classes based on status
            const badgeClasses = isFilled
              ? isError 
                ? 'bg-red-50 text-red-500 border-red-500'
                : 'bg-[#64CC4A]/10 text-[#64CC4A] border-[#64CC4A]'
              : 'hidden';
              
            const inputBorderClasses = isFilled
              ? isError 
                ? 'border-red-500 text-red-500 focus:ring-red-500/30'
                : 'border-[#64CC4A] text-[#64CC4A] focus:ring-[#64CC4A]/30'
              : 'border-gray-300 text-gray-800 focus:ring-[#2479BC]/30';

            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="font-bold text-gray-800">Cerapan {index + 1}</h4>
                  <span className={`px-4 py-1.5 border rounded-full text-[13px] font-semibold transition-colors ${badgeClasses}`}>
                    E = {calc.errorStr} %
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                  <FormField label="Vol. Nominal (L)" required>
                    <input type="text" className={INPUT_CLASS} value={item.volNominal} onChange={(e) => updateCerapan(index, 'volNominal', e.target.value)} />
                  </FormField>
                  <FormField label="Penunjukan Cerapan (L)" required>
                    <input type="text" className={INPUT_CLASS} value={item.penunjukan} onChange={(e) => updateCerapan(index, 'penunjukan', e.target.value)} />
                  </FormField>
                  <FormField label="Vol. Sebenarnya (L)" required>
                    <input type="text" className={INPUT_CLASS} value={item.volSebenarnya} onChange={(e) => updateCerapan(index, 'volSebenarnya', e.target.value)} />
                  </FormField>
                  <FormField label="Kesalahan (%)" required>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-3 rounded-lg border bg-white text-[14px] font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${inputBorderClasses}`} 
                      value={calc.isFilled ? `${calc.errorStr}%` : item.kesalahan} 
                      onChange={(e) => updateCerapan(index, 'kesalahan', e.target.value)} 
                    />
                  </FormField>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ SECTION 6: Ringkasan Perhitungan ═══ */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-[#2479BC] text-xl mb-6">Ringkasan Perhitungan</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {cerapanCalculations.map((calc, idx) => (
              <SummaryCard
                key={idx}
                label={`Kesalahan Cerapan ${idx + 1}`}
                value={calc.isFilled ? `${calc.errorStr}%` : '—'}
                status={calc.isFilled ? (calc.status === 'lolos' ? 'LOLOS' : 'TIDAK LOLOS') : undefined}
                variant={calc.isFilled ? (calc.status === 'lolos' ? 'success' : 'error') : 'neutral'}
              />
            ))}
            <SummaryCard
              label="Kesalahan Rata-rata"
              value={averageErrorStr}
              status={averageErrorStatus}
              variant={averageErrorStatus === 'LOLOS' ? 'success' : averageErrorStatus === 'TIDAK LOLOS' ? 'error' : 'neutral'}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <SummaryCard
              label="Kemampuan Ulang"
              value={repeatabilityStr}
              status={repeatabilityStatus}
              variant={repeatabilityStatus === 'LOLOS' ? 'success' : repeatabilityStatus === 'TIDAK LOLOS' ? 'error' : 'neutral'}
            />
            <SummaryCard label="MPE Akurasi" value="± 0.5000%" variant="neutral" />
            <SummaryCard label="MPE Kemampuan Ulang" value="≤ 0.3000%" variant="neutral" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              if (prevStep) {
                prevStep();
              } else {
                router.push('/e-cerapan/pemeriksaanawal');
              }
            }}
            className="w-full sm:w-1/2 py-4 rounded-xl text-[16px] font-semibold text-gray-700 bg-transparent border-2 border-gray-300 hover:bg-gray-50 transition-all active:scale-[0.99]"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={() => {
              const step2Payload: Step2Data = {
                dataNozzle,
                dataBejana,
                totalisator,
                cerapan,
              };
              if (updateFormData) {
                updateFormData('step2', step2Payload);
              }
              if (nextStep) {
                nextStep();
              } else {
                router.push('/e-cerapan/hasilpengujian');
              }
            }}
            className="w-full sm:w-1/2 py-4 rounded-xl text-[16px] font-semibold text-white bg-[#2479BC] hover:bg-[#1d6aa6] transition-all active:scale-[0.99]"
          >
            Lihat Hasil Evaluasi
          </button>
        </div>

      </div>
    </div>
  );
}