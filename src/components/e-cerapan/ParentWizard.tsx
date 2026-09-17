'use client';

import React, { useState } from 'react';
import { WizardFormData, WizardStepProps } from '@/types/wizard';
import PemeriksaanAwalPage from '@/app/e-cerapan/pemeriksaanawal/page';
import HasilPemeriksaanAwalPage from '@/app/e-cerapan/pemeriksaanawal/hasilpemeriksaanawal/page';
import PengujianPerhitunganPage from '@/app/e-cerapan/pengujian/page';
import HasilPengujianPage from '@/app/e-cerapan/hasilpengujian/page';

export const initialWizardFormData: WizardFormData = {
  step1: {
    dataPengujian: {
      nomorOrder: '',
      namaPemilik: '',
      nomorSIML: '',
      contactPerson: '',
      alamatTerpasang: '',
      namaPompaUkur: '',
      tanggalPengujian: '',
      namaPetugas1: '',
      namaPetugas2: '',
      noSPBU: '34.121.01',
    },
    identitasUTTP: {
      merek: '',
      tipeModel: '',
      nomorSeri: '',
      jumlahNozzle: '',
      tahunPembuatan: '',
    },
    kondisiOperasi: {
      ujiAlkMaksimum: '',
      ujiAlkMinimum: '',
      mfr: '',
      nomorPencacahTipe: '',
    },
    checklist: [],
  },
  step2: {
    dataNozzle: {
      identitas: 'Nozzle 1',
      jenisCairan: 'Pertalite (RON 90)',
      hargaSatuan: '10000',
    },
    dataBejana: {
      merek: 'Pertamina Calibration',
      tipe: 'BU-20L',
      nomorSeri: 'BJ-2023-0012',
      volNominal: '20',
      volSebenarnya: '19.998',
      skalaUtama: '0.05',
      tglVerifikasi: '2023-12-22',
    },
    totalisator: {
      sebelumUji: '15432,000',
      sesudahUji: '15492,000',
      totalTerpakai: '60.000 L',
    },
    cerapan: [
      { volNominal: '20', penunjukan: '20,050', volSebenarnya: '19,980', kesalahan: '+0.3504', status: 'lolos' },
      { volNominal: '20', penunjukan: '20,080', volSebenarnya: '20,01', kesalahan: '+0.3498', status: 'lolos' },
      { volNominal: '20', penunjukan: '20,150', volSebenarnya: '19,950', kesalahan: '+0.7500', status: 'tidak_lolos' },
    ],
  },
};

interface ParentWizardProps {
  initialStep?: number;
}

export default function ParentWizard({ initialStep = 0 }: ParentWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [formData, setFormData] = useState<WizardFormData>(initialWizardFormData);

  const updateFormData = (stepKey: keyof WizardFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        ...data,
      },
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step <= 3) {
      setCurrentStep(step);
    }
  };

  const stepProps: WizardStepProps = {
    formData,
    updateFormData,
    nextStep,
    prevStep,
    currentStep,
    goToStep,
  };

  return (
    <div className="w-full">
      {currentStep === 0 && <PemeriksaanAwalPage {...stepProps} />}
      {currentStep === 1 && <HasilPemeriksaanAwalPage {...stepProps} />}
      {currentStep === 2 && <PengujianPerhitunganPage {...stepProps} />}
      {currentStep === 3 && <HasilPengujianPage {...stepProps} />}
    </div>
  );
}

