import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr_0.7fr] lg:gap-16">
          {/* Institution */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/assets/logo/Metrologi.svg"
                alt="Logo Direktorat Metrologi"
                width={48}
                height={48}
                className="lg:h-12 h-8 lg:w-12 w-8 object-contain"
              />

              <div>
                <h2 className="lg:text-xl text-md font-bold leading-tight">
                  Direktorat Metrologi
                </h2>

                <p className="lg:text-sm text-xs leading-5 text-white/90">
                  Kementerian Perdagangan Republik Indonesia
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md lg:text-sm text-xs leading-6 text-white/85">
              Layanan digital Direktorat Metrologi, Kementerian Perdagangan RI
              untuk verifikasi takaran pompa ukur berdasarkan standar metrologi
              yang berlaku.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="lg:text-base text-sm font-bold">Contacts us</h3>

            <div className="mt-4 space-y-1 lg:text-sm text-xs leading-6 text-white/90">
              <p>(022) 4202773</p>
              <p>metrologi@kemendag.go.id</p>
              <p>
                Jl. Pasteur No.27, Pasir Kaliki, Cicendo, Kota Bandung, Jawa
                Barat 40171
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="lg:text-base text-sm font-bold">Social</h3>

            <div className="mt-5 flex items-center gap-4">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.65 1.5a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H7.7v3h2.7v8h3.1Z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="transition-opacity hover:opacity-70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7L16 12l-6.4 3.5Z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="transition-opacity hover:opacity-70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.4L2.8 2h6.4l4.4 5.8L18.9 2Zm-1.1 18h1.7L8.3 3.9H6.5L17.8 20Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="lg:my-12 my-6 border-t border-white/30" />

        {/* Copyright */}
        <div className="text-center">
          <p className="lg:text-sm text-xs text-white/95">
            © {new Date().getFullYear()} Direktorat Metrologi. Hak Cipta
            Dilindungi Undang-Undang.
          </p>
        </div>
      </div>
    </footer>
  );
}
