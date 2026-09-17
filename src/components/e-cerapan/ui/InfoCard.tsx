import React from "react";

export interface InfoItem {
  label: string;
  value: string;
}

interface InfoCardProps {
  identitasAlat?: InfoItem[];
  dataPengujian?: InfoItem[];
}

const DEFAULT_IDENTITAS_ALAT: InfoItem[] = [
  { label: "Merek", value: "Tokheim" },
  { label: "Tipe", value: "Quantium 310" },
  { label: "No. Seri", value: "SN-2023-TKH-0456" },
  { label: "Jml. Nozzle", value: "2" },
  { label: "Tahun Buat", value: "2022" },
];

const DEFAULT_DATA_PENGUJIAN: InfoItem[] = [
  { label: "No. Pengujian", value: "PU-BBM-2024-0847" },
  { label: "Tanggal", value: "2026-09-13" },
  { label: "No. SPBU", value: "34.121.01" },
  { label: "Petugas 1", value: "Ahmad Fauzi, S.T." },
  { label: "Petugas 2", value: "Siti Rahayu, S.T." },
];

export default function InfoCard({
  identitasAlat = DEFAULT_IDENTITAS_ALAT,
  dataPengujian = DEFAULT_DATA_PENGUJIAN,
}: InfoCardProps = {}) {

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#2479BC] text-base mb-4">Identitas Alat</h3>
        <div className="flex flex-col divide-y divide-slate-100 text-xs">
          {identitasAlat.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2">
              <span className="text-slate-500">{item.label}</span>
              <span className="font-semibold text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#2479BC] text-base mb-4">Data Pengujian</h3>
        <div className="flex flex-col divide-y divide-slate-100 text-xs">
          {dataPengujian.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2">
              <span className="text-slate-500">{item.label}</span>
              <span className="font-semibold text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}