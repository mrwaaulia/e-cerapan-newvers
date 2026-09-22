import AppHeader from "@/components/e-cerapan/layout/AppHeader";
import Sidebar from "@/components/e-cerapan/layout/Sidebar";

export default function EcerapanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <div className="min-h-screen lg:pl-60">
        <AppHeader />

        <main className="mx-auto w-full max-w-350">{children}</main>
      </div>
    </div>
  );
}
