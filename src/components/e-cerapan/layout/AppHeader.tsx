import Image from "next/image";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="sticky z-20 top-0 lg:pl-0 pl-12 h-19 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-full items-center px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo/logo.png"
            alt="Logo Direktorat Metrologi"
            width={40}
            height={40}
            priority
            className="lg:h-10 h-8 lg:w-10 w-8 object-contain"
          />

          <div className="leading-tight">
            <p className="text-base font-bold text-primary lg::text-lg">
              Direktorat Metrologi
            </p>

            <p className="text-[10px] text-black lg:text-xs">
              Kementerian Perdagangan Republik Indonesia
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
