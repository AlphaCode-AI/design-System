"use client";

import { UsageCard } from "@/app/components/UsageCard";
import TableOfContents, { TocItem } from "@/app/components/TableOfContents";
import { Download, Button } from "@alphacode-ai/design-system";

const toc: TocItem[] = [
  { id: "primary-logo", label: "Primary Logo" },
  { id: "symbol", label: "Symbol" },
  { id: "usage-guide", label: "사용 가이드" },
];

export default function LogoPage() {
  return (
    <div className="flex w-full">
      <div className="lex-1 min-w-0 px-10 py-8">
        
        {/* ── Header ── */}
        <header className="mb-12 border-b border-border pb-8 flex justify-between items-end">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-foreground">Logo</h1>
            <p className="text-sm text-foreground leading-relaxed">
              Alpha Code의 대표 로고 가이드입니다. 로고를 사용할 때는 반드시 해당 규정을 숙지하고 사용해 주세요.
            </p>
          </div>
          <Button
            asChild
            variant="primary"
            size="md"
            rightIcon={<Download size={16} />}
          >
            <a href="/logo/Alphacode_logo_all.zip" download>
              Download Logo.zip
            </a>
          </Button>
        </header>

        {/* ── 1. Primary Logo ── */}
        <section id="primary-logo" className="scroll-mt-10 mb-20">
          <h2 className="text-xl font-bold text-foreground mb-1">Primary Logo</h2>
          <p className="text-sm text-foreground mb-6">
            알파코드의 대표 로고입니다. 회사 전체를 대표할 때 사용합니다.<br />
            대문자 'A'와 '알파'의 형상을 조합하여 만든 심볼과, 'Alpha Code'의 'CODE'를 결합한 디자인으로 구성되어 있습니다.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="h-48 rounded-xl bg-ac-gray-20 flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_logo_primary_horizontal.png" alt="alphacode logo" />
              <span className="text-ac-gray-50 italic text-xs absolute bottom-4 right-6">alphacode.logo.primary.horizontal</span>
            </div>
            <div className="h-48 rounded-xl bg-ac-gray-20 flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_logo_primary_vertical.png" alt="alphacode logo" />
              <span className="text-ac-gray-50 italic text-xs absolute bottom-4 right-6">alphacode.logo.primary.vertical</span>
            </div>
          </div>

          <h3 className="text-md font-bold text-foreground mb-2">Background 예시</h3>
          <p className="text-sm text-foreground mb-4">배경이 어두울 때 : 밝은 배경과 어두운 배경에서 동일한 로고를 사용합니다.</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-24 rounded-lg bg-ac-orange-20 flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_logo_primary_horizontal.png" alt="alphacode logo" className="w-40"/>
            </div>
            <div className="h-24 rounded-lg bg-ac-black flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_logo_primary_horizontal.png" alt="alphacode logo" className="w-40"/>
            </div>
          </div>
          
          <p className="text-sm text-foreground mb-4">배경이 로고 색상과 겹칠 때 : 배경 색상이 로고의 yello 또는 orange 색상과 어쩔 수 없이 겹칠때, 가이드를 참고하여 사용해 주세요.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 rounded-lg bg-[#FFCC38] flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_logo_black_horizontal.png" alt="alphacode logo" className="w-40"/>  
            </div>
            <div className="h-24 rounded-lg bg-[#FFA100] flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_logo_white_horizontal.png" alt="alphacode logo" className="w-40"/>  
            </div>
            <div className="h-24 rounded-lg bg-ac-primary-50 flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_logo_mix_horizontal.png" alt="alphacode logo" className="w-40"/>  
            </div>
          </div>
        </section>

        {/* ── 2. Symbol ── */}
        <section id="symbol" className="scroll-mt-10 mb-20">
          <h2 className="text-xl font-bold text-foreground mb-1">Symbol</h2>
          <p className="text-sm text-foreground mb-6">
            알파코드의 심볼입니다. Favicon, Thumbnail, Avatar 또는 Icon에 사용합니다.
          </p>
          <div className="h-36 rounded-xl bg-ac-gray-20 flex items-center justify-center relative mb-8">
            <img src="/logo/alphacode_symbol_primary.png" alt="alphacode symbol" className="w-24" />
            <span className="text-ac-gray-50 italic text-xs absolute bottom-4 right-6">alphacode.symbol.primary</span>
          </div>

          <h3 className="text-md font-bold text-foreground mb-2">Background 예시</h3>
          <p className="text-sm text-foreground mb-4">배경이 어두울 때 : 밝은 배경과 어두운 배경에서 동일한 심볼을 사용합니다</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-24 rounded-lg bg-ac-orange-20 flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_symbol_primary.png" alt="alphacode symbol" className="w-16"/>
            </div>
            <div className="h-24 rounded-lg bg-ac-black flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_symbol_primary.png" alt="alphacode symbol" className="w-16"/>
            </div>
          </div>
          
          <p className="text-sm text-foreground mb-4">배경이 로고 색상과 겹칠 때 : 배경 색상이 로고의 yello 또는 orange 색상과 어쩔 수 없이 겹칠때, 가이드를 참고하여 사용해 주세요.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 rounded-lg bg-[#FFCC38] flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_symbol_black.png" alt="alphacode symbol" className="w-16"/>  
            </div>
            <div className="h-24 rounded-lg bg-[#FFA100] flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_symbol_white.png" alt="alphacode symbol" className="w-16"/>  
            </div>
            <div className="h-24 rounded-lg bg-ac-primary-50 flex flex-col items-center justify-center relative">
              <img src="/logo/alphacode_symbol_primary.png" alt="alphacode symbol" className="w-16"/>  
            </div>
          </div>
        </section>

        {/* ── 3. 사용 가이드 ── */}
        <section id="usage-guide" className="scroll-mt-10 mb-20">
          <div className="mb-10 border-t border-border pt-10">
            <h2 className="text-xl font-bold text-foreground mb-2">사용 가이드</h2>
            <p className="text-sm text-foreground leading-relaxed">
              알파코드 로고의 변형 및 왜곡은 브랜드 아이덴티티의 일관성을 해칠 수 있으므로 사용 시 주의가 필요합니다. 
              가이드 외의 사용에 대해 의문이 있으시면 문의해 주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            <UsageCard type="Don't" src="/logo/logo_dont_1.png" description="로고의 정해진 형태에서 왜곡하여 사용하지 않습니다." />
            <UsageCard type="Don't" src="/logo/logo_dont_2.png" description="로고를 정해진 형태 외에 다른 형태로 조합하여 사용하지 않습니다." />
            <UsageCard type="Don't" src="/logo/logo_dont_3.png"  description="로고의 전체 형상이 잘리지 않도록 주의합니다." />
            <UsageCard type="Don't" src="/logo/logo_dont_4.png"  description="로고에 임의로 효과를 적용하여 사용하지 않습니다." />
            <UsageCard type="Don't" variant="fill" src="/logo/logo_dont_5.png" description="복잡한 배경 위에 사용하지 않습니다." />
            <UsageCard type="Don't" src="/logo/logo_dont_6.png"  description="순서를 바꾸어 사용하지 않습니다." />
            <UsageCard type="Don't" src="/logo/logo_dont_7.png"  description="기울여 사용하지 않습니다." />
            <UsageCard type="Don't" src="/logo/logo_dont_8.png"  description="정해진 색상 이외에 다른 색상으로 변형하여 사용하지 않습니다." />
          </div>
        </section>

      </div>
      <TableOfContents items={toc} />
    </div>
  );
}