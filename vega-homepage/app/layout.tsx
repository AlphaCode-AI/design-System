import "@/app/globals.css";
import LayoutShell from "@/app/components/LayoutShell";

export const metadata = {
  title: "VEGA UI - AlphaCode Design System",
  description: "알파코드 디자인 시스템 문서",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
