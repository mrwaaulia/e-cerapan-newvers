export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-content px-32 py-14 md:py-20">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
            Mengenal E-Cerapan
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            E-Cerapan adalah layanan digital dari Direktorat Metrologi
            Kementerian Perdagangan untuk mencatat hasil pengujian alat ukur
            secara terstandarisasi dan aman.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            Layanan ini mendukung digitalisasi proses tera dan tera ulang
            (UTTP), berdasarkan ketentuan resmi yang telah diatur dalam
            peraturan perundang-undangan yang berlaku, sehingga proses
            pengujian alat ukur Anda menjadi lebih transparan dan mudah
            diakses.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            Terbuka bagi petugas, badan usaha, hingga masyarakat umum yang
            ingin memastikan alat ukur yang mereka gunakan sudah sesuai
            standar.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src="/assets/images/about-image.png"
            alt="Petugas melakukan pemeriksaan alat ukur"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
