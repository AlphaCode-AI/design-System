"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { SideNavigation, SideNavItem, cn, X } from "@alphacode-ai/design-system";
import { getGnbSection } from "@/app/components/Gnb";

const vegaUiItems: SideNavItem[] = [
  { id: "overview", label: "Overview", href: "/" },
  { id: "logo",     label: "Logo",     href: "/logo" },
];

const foundationItems: SideNavItem[] = [
  { id: "breakpoints", label: "Breakpoints", href: "/foundation/breakpoints" },
  { id: "color",       label: "Color",       href: "/foundation/color" },
  { id: "radius",      label: "Radius",      href: "/foundation/radius" },
  { id: "shadow",      label: "Shadow",      href: "/foundation/shadow" },
  { id: "spacing",     label: "Spacing",     href: "/foundation/spacing" },
];

const templateItems: SideNavItem[] = [
  { id: "login",     label: "로그인",     href: "/templates/login" },
  { id: "signup",    label: "회원가입",   href: "/templates/signup" },
  { id: "payment",   label: "결제",       href: "/templates/payment" },
  { id: "card-list",  label: "카드 리스트", href: "/templates/card-list" },
  { id: "side-shell",     label: "사이드 쉘",   href: "/templates/side-shell" },
  { id: "product-detail", label: "상품 상세",   href: "/templates/product-detail" },
  { id: "ai-chat",          label: "AI Chat",       href: "/templates/ai-chat" },
  { id: "upload-progress", label: "업로드 진행",  href: "/templates/upload-progress" },
  { id: "ide",             label: "IDE",           href: "/templates/ide" },
];

const componentItems: SideNavItem[] = [
  { id: "accordion",   label: "Accordion",          href: "/components/accordion" },
  { id: "avatar",      label: "Avatar",             href: "/components/avatar" },
  { id: "badges",      label: "Badges",             href: "/components/badges" },
  { id: "breadcrumbs", label: "Breadcrumbs",        href: "/components/breadcrumbs" },
  {
    id: "button",
    label: "Button",
    children: [
      { id: "button-button",       label: "Button",       href: "/components/button" },
      { id: "button-button-group", label: "Button Group", href: "/components/button/button-group" },
      { id: "button-fab",          label: "FAB",          href: "/components/button/fab" },
    ],
  },
  { id: "card",        label: "Cards",              href: "/components/cards" },
  { id: "carousel",    label: "Carousel",           href: "/components/carousel" },
  { id: "dialog",      label: "Dialog",             href: "/components/dialog" },
  { id: "divider",     label: "Divider",            href: "/components/divider" },
  { id: "dropdown",    label: "Dropdown",           href: "/components/dropdown" },
  {
    id: "input",
    label: "Input",
    children: [
      { id: "input-checkbox",    label: "Checkbox",    href: "/components/input/checkbox" },
      { id: "input-date-picker", label: "Date Picker", href: "/components/input/date-picker" },
      { id: "input-file-input",  label: "File Input",  href: "/components/input/file-input" },
      { id: "input-radio",       label: "Radio",      href: "/components/input/radio" },
      { id: "input-select",      label: "Select",     href: "/components/input/select" },
      { id: "input-switch",      label: "Switch",     href: "/components/input/switch" },
      { id: "input-text-input",  label: "Text Input", href: "/components/input/text-input" },
      { id: "input-textarea",    label: "Textarea",   href: "/components/input/textarea" },
    ],
  },
  { id: "pagination",  label: "Pagination",         href: "/components/pagination" },
  { id: "progress",       label: "Progress Indicator", href: "/components/progress" },
  { id: "resizable",        label: "Resizable",          href: "/components/resizable" },
  { id: "skeleton",         label: "Skeleton",           href: "/components/skeleton" },
  { id: "side-navigation",  label: "Side Navigation",    href: "/components/side-navigation" },
  { id: "slider",      label: "Slider",             href: "/components/slider" },
  { id: "snackbar",    label: "Snackbar",           href: "/components/snackbar" },
  { id: "step-indicator", label: "Step Indicator",     href: "/components/step-indicator" },
  { id: "tab",         label: "Tab",                href: "/components/tab" },
  { id: "toast",       label: "Toast",              href: "/components/toast" },
  { id: "toggle-group", label: "Toggle Group",      href: "/components/toggle-group" },
  { id: "tooltip",     label: "Tooltip",            href: "/components/tooltip" },
  { id: "tree-list",   label: "Tree List",          href: "/components/tree-list" },
];

// children까지 재귀 탐색해서 pathname에 맞는 id 반환
function findActiveId(items: SideNavItem[], pathname: string): string | undefined {
  for (const item of items) {
    if (item.href === pathname) return item.id;
    if (item.children) {
      const found = findActiveId(item.children, pathname);
      if (found) return found;
    }
  }
}

const allItems = [...vegaUiItems, ...foundationItems, ...componentItems, ...templateItems];

function getActiveId(pathname: string): string {
  return findActiveId(allItems, pathname) ?? "overview";
}

// 현재 pathname이 해당 부모 아이템의 children 중 하나에 속하는지 확인
function isParentOfActive(item: SideNavItem, pathname: string): boolean {
  return item.children?.some(child => child.href === pathname) ?? false;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const activeId = useMemo(() => getActiveId(pathname), [pathname]);
  const section = getGnbSection(pathname);

  const openParentIds = useMemo(
    () => componentItems.filter(item => isParentOfActive(item, pathname)).map(item => item.id),
    [pathname]
  );

  const renderLink = useCallback((item: SideNavItem, children: React.ReactNode, className: string) => (
    <Link href={item.href!} className={className} onClick={onClose}>
      {children}
    </Link>
  ), [onClose]);

  return (
    <aside className={cn(
      "w-[250px] shrink-0 border-r border-border flex flex-col bg-background",
      "fixed inset-y-0 left-0 z-modal transition-transform duration-200",
      "md:static md:inset-auto md:z-auto md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* 모바일 닫기 버튼 */}
      <div className="md:hidden flex items-center justify-between px-4 h-12 border-b border-border shrink-0">
        <span className="text-sm font-semibold text-foreground">메뉴</span>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-ac-gray-10 transition-colors text-muted-foreground"
          onClick={onClose}
          aria-label="메뉴 닫기"
        >
          <X size={18} />
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto py-6 pl-4 pr-2 flex flex-col gap-6">
        {section === "docs" && (
          <>
            <SideNavigation
              title="Vega UI"
              items={vegaUiItems}
              activeId={activeId}
              renderLink={renderLink}
            />
            <SideNavigation
              title="Foundation"
              items={foundationItems}
              activeId={activeId}
              renderLink={renderLink}
            />
          </>
        )}
        {section === "components" && (
          <SideNavigation
            title="Component"
            items={componentItems}
            activeId={activeId}
            defaultOpenIds={openParentIds}
            renderLink={renderLink}
          />
        )}
        {section === "templates" && (
          <SideNavigation
            title="Templates"
            items={templateItems}
            activeId={activeId}
            renderLink={renderLink}
          />
        )}
      </div>
    </aside>
  );
}