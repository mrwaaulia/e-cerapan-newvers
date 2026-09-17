'use client';

export default function CtaSection() {
  return (
    <section className="px-32 py-14 md:py-20 flex justify-center bg-white">
      <div className="w-full rounded-[2rem] bg-blue-600 px-6 py-12 text-center text-white md:px-12 md:py-16 shadow-lg">

        <p className="text-4xl font-bold">
          Wujudkan Pengukuran Akurat &amp; Terpercaya
          <br />
          <span className="text-yellow-400">Bersama E-Cerapan</span>
        </p>

        <p className="mx-auto mt-4 w-full text-sm text-white/90 md:mt-6 md:text-base">
          Proses lebih mudah, lebih cepat, dan terukur secara digital. Semua dalam satu platform.
        </p>

        <button className="mt-8 rounded-lg bg-yellow-400 px-8 py-3 text-sm font-bold text-white transition hover:bg-yellow-500 md:mt-10 md:px-10 md:text-base">
          Coba Sekarang
        </button>

      </div>
    </section>
  );
}