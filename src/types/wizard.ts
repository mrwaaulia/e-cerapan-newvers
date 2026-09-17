export interface DataPengujianStep1 {
     nomorOrder: string;
     namaPemilik: string;
     nomorSIML: string;
     contactPerson: string;
     alamatTerpasang: string;
     namaPompaUkur: string;
     tanggalPengujian: string;
     namaPetugas1: string;
     namaPetugas2: string;
     noSPBU?: string;
   }

   export interface IdentitasUTTP {
     merek: string;
     tipeModel: string;
     nomorSeri: string;
     jumlahNozzle: string;
     tahunPembuatan: string;
   }

   export interface KondisiOperasi {
     ujiAlkMaksimum: string;
     ujiAlkMinimum: string;
     mfr: string;
     nomorPencacahTipe: string;
   }

   export interface ChecklistItem {
     no?: number;
     uraian?: string;
     penilaian: 'ya' | 'tidak' | null;
     keterangan: string;
   }

   export interface Step1Data {
     dataPengujian: DataPengujianStep1;
     identitasUTTP: IdentitasUTTP;
     kondisiOperasi: KondisiOperasi;
     checklist: ChecklistItem[];
   }

   export interface DataNozzle {
     identitas: string;
     jenisCairan: string;
     hargaSatuan: string;
   }

   export interface DataBejana {
     merek: string;
     tipe: string;
     nomorSeri: string;
     volNominal: string;
     volSebenarnya: string;
     skalaUtama: string;
     tglVerifikasi: string;
   }

   export interface Totalisator {
     sebelumUji: string;
     sesudahUji: string;
     totalTerpakai: string;
   }

   export interface CerapanItem {
     volNominal: string;
     penunjukan: string;
     volSebenarnya: string;
     kesalahan: string;
     status: string;
   }

   export interface Step2Data {
     dataNozzle: DataNozzle;
     dataBejana: DataBejana;
     totalisator: Totalisator;
     cerapan: CerapanItem[];
   }

   export interface WizardFormData {
     step1: Step1Data;
     step2: Step2Data;
   }

   export interface WizardStepProps {
     formData: WizardFormData;
     updateFormData: (stepKey: keyof WizardFormData, data: any) => void;
     nextStep: () => void;
     prevStep: () => void;
     currentStep?: number;
     goToStep?: (step: number) => void;
   }