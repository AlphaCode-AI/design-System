import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import { VariantProps } from 'class-variance-authority';
import { DateRange } from 'react-day-picker';
export { DateRange } from 'react-day-picker';
import { ClassValue } from 'clsx';
export { ColorToken, RadiusToken, SpacingToken, borderRadius, breakpoints, colors, fontSize, fontWeight, lineHeight, spacing, zIndex } from './tokens/index.cjs';
export * from 'lucide-react';

declare const buttonVariants: (props?: ({
    variant?: "link" | "primary" | "secondary" | "tertiary" | "icon" | null | undefined;
    size?: "xl" | "lg" | "md" | "sm" | "xs" | "icon-xl" | "icon-lg" | "icon-md" | "icon-sm" | "icon-xs" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React$1.ReactNode;
    rightIcon?: React$1.ReactNode;
    /**
     * variant별 색상을 override할 Tailwind 클래스
     * @example "bg-blue-500 text-white hover:bg-blue-600"
     */
    colorClassName?: string;
    /** true면 부모 너비에 맞게 100% 확장 */
    fullWidth?: boolean;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const buttonGroupVariants: (props?: ({
    direction?: "horizontal" | "vertical" | null | undefined;
    gap?: "md" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonGroupProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonGroupVariants> {
    direction?: "horizontal" | "vertical";
}
declare function ButtonGroup({ className, direction, children, ...props }: ButtonGroupProps): React$1.JSX.Element;

declare const fabVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | null | undefined;
    size?: "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FABProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof fabVariants> {
    /** 아이콘 (필수) — children으로 전달 */
    children: React$1.ReactNode;
    /**
     * 레이블 텍스트
     * - expandOnHover 없이 사용: 항상 라벨 표시 (Extended FAB)
     * - expandOnHover와 함께: 호버 시에만 라벨 표시
     */
    label?: string;
    /**
     * 호버 시 라벨 펼침 방향
     * - "right": 아이콘 우측으로 라벨 펼쳐짐
     * - "left" : 아이콘 좌측으로 라벨 펼쳐짐
     * label prop이 있어야 동작합니다.
     */
    expandOnHover?: "right" | "left";
    /**
     * 아이콘 전용 FAB 호버 시 표시할 툴팁 텍스트
     * 디자인 시스템 Tooltip 컴포넌트를 사용합니다.
     * label이 없을 때만 동작합니다.
     * @example tooltip="추가하기"
     */
    tooltip?: string;
    /**
     * 툴팁 표시 위치
     * @default "top-center"
     */
    tooltipPlacement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    /** 화면 고정 위치 */
    fixed?: boolean;
    /** fixed 사용 시 위치 커스텀 (기본: "bottom-6 right-6") */
    position?: string;
    /**
     * variant 기본 색상을 override할 Tailwind 클래스
     * @example "bg-blue-500 text-white hover:bg-blue-600"
     */
    colorClassName?: string;
}
declare const FAB: React$1.ForwardRefExoticComponent<FABProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const badgeVariants: (props?: ({
    variant?: "primary" | "complete" | "success" | "warning" | "fail" | "default" | null | undefined;
    size?: "lg" | "md" | "sm" | "xs" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React$1.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    /** 좌측 아이콘 (선택) */
    icon?: React$1.ReactNode;
}
declare function Badge({ className, variant, size, icon, children, ...props }: BadgeProps): React$1.JSX.Element;

declare const avatarVariants: (props?: ({
    shape?: "circle" | "square" | null | undefined;
    size?: "xl" | "lg" | "md" | "sm" | "xs" | "2xl" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AvatarProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof avatarVariants> {
    /** 이미지 URL */
    src?: string;
    /** 이미지 alt (접근성: 스크린 리더용) */
    alt?: string;
    /** 이름 — Text 타입 이니셜 생성 및 접근성에 사용 */
    name?: string;
    /** 아이콘 — Icon 타입에 사용 */
    icon?: React$1.ReactNode;
    /** 이미지 로드 실패 시 fallback (기본: 이니셜 또는 아이콘) */
    fallback?: React$1.ReactNode;
}
declare const Avatar: React$1.ForwardRefExoticComponent<AvatarProps & React$1.RefAttributes<HTMLDivElement>>;

declare const cardVariants: (props?: ({
    variant?: "background" | "line" | "shadow" | null | undefined;
    interactive?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const shadowSizeMap: {
    readonly xs: "shadow-xs";
    readonly sm: "shadow-sm";
    readonly md: "shadow-md";
    readonly lg: "shadow-lg";
    readonly xl: "shadow-xl";
    readonly "2xl": "shadow-2xl";
};
type CardShadowSize = keyof typeof shadowSizeMap;
interface CardProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    shadowSize?: CardShadowSize;
}
declare const Card: React$1.ForwardRefExoticComponent<CardProps & React$1.RefAttributes<HTMLDivElement>>;
interface CardMenuProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
}
declare const CardMenu: React$1.ForwardRefExoticComponent<CardMenuProps & React$1.RefAttributes<HTMLButtonElement>>;
/** 우측 상단 컨트롤 공통 props */
type CardHeaderControl = {
    control?: "none";
} | {
    control: "menu";
    onMenuClick?: () => void;
} | {
    control: "checkbox";
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
} | {
    control: "radio";
    checked?: boolean;
    onChange?: React$1.ChangeEventHandler<HTMLInputElement>;
    name?: string;
    value?: string;
} | {
    control: "switch";
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
};
type CardHeaderProps = Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> & CardHeaderControl & {
    /** 이미지 URL — image 타입 */
    imageSrc?: string;
    imageAlt?: string;
    /** 아바타 영역 콘텐츠 — Avatar 컴포넌트 또는 커스텀 ReactNode */
    avatar?: React$1.ReactNode;
    /** 제목 */
    title?: React$1.ReactNode;
    /** 부제목 / 설명 */
    subtitle?: React$1.ReactNode;
    /** 우측 뱃지/상태 요소 (control과 별개로 이미지 헤더에서 사용) */
    badge?: React$1.ReactNode;
};
declare const CardHeader: React$1.ForwardRefExoticComponent<CardHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLHeadingElement> & React$1.RefAttributes<HTMLHeadingElement>>;
interface CardContentProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /**
     * true이면 children 항목 사이에 <Divider />를 자동으로 삽입합니다.
     * @default false
     */
    divider?: boolean;
}
declare const CardContent: React$1.ForwardRefExoticComponent<CardContentProps & React$1.RefAttributes<HTMLDivElement>>;
declare const CardDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;
interface CardFooterProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** 구분선 표시 여부 */
    divider?: boolean;
}
declare const CardFooter: React$1.ForwardRefExoticComponent<CardFooterProps & React$1.RefAttributes<HTMLDivElement>>;
interface CardFooterUserProps extends React$1.HTMLAttributes<HTMLDivElement> {
    avatar?: Pick<AvatarProps, "src" | "name" | "fallback" | "size" | "shape">;
    name?: string;
    sub?: string;
    action?: React$1.ReactNode;
}
declare const CardFooterUser: React$1.ForwardRefExoticComponent<CardFooterUserProps & React$1.RefAttributes<HTMLDivElement>>;
interface CardFooterInfoProps extends React$1.HTMLAttributes<HTMLDivElement> {
    items?: Array<{
        icon?: React$1.ReactNode;
        label: string;
    }>;
    action?: React$1.ReactNode;
}
declare const CardFooterInfo: React$1.ForwardRefExoticComponent<CardFooterInfoProps & React$1.RefAttributes<HTMLDivElement>>;
interface CardFooterButtonsProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** 버튼 배치 방향 */
    direction?: "horizontal" | "vertical";
    /** 주요 액션 버튼 텍스트 */
    primaryLabel?: string;
    /** 주요 액션 콜백 */
    onPrimary?: () => void;
    /** 보조 액션 버튼 텍스트 */
    secondaryLabel?: string;
    /** 보조 액션 콜백 */
    onSecondary?: () => void;
    /** 구분선 표시 여부 */
    divider?: boolean;
}
declare const CardFooterButtons: React$1.ForwardRefExoticComponent<CardFooterButtonsProps & React$1.RefAttributes<HTMLDivElement>>;

declare const dividerVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    variant?: "solid" | "dashed" | null | undefined;
    inset?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface DividerProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dividerVariants> {
}
declare function Divider({ className, orientation, variant, inset, ...props }: DividerProps): React$1.JSX.Element;

declare const checkboxVariants: (props?: ({
    size?: "xl" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckboxProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size" | "type">, VariantProps<typeof checkboxVariants> {
    label?: string;
    description?: string;
    indeterminate?: boolean;
    /**
     * 체크 시 색상 (기본: ac-primary-50 #FF6300)
     * 어떤 CSS 색상값도 가능 — "#006FFF", "rgb(0,111,255)", "var(--ac-blue-50)"
     */
    activeColor?: string;
}
declare const Checkbox: React$1.ForwardRefExoticComponent<CheckboxProps & React$1.RefAttributes<HTMLInputElement>>;

interface CheckboxGroupProps extends React$1.HTMLAttributes<HTMLFieldSetElement> {
    title?: string;
    direction?: "vertical" | "horizontal";
}
declare function CheckboxGroup({ title, direction, className, children, ...props }: CheckboxGroupProps): React$1.JSX.Element;

declare const radioVariants: (props?: ({
    size?: "xl" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface RadioProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size" | "type">, VariantProps<typeof radioVariants> {
    label?: string;
    description?: string;
    /**
     * 체크 시 색상 (기본: ac-primary-50 #FF6300)
     * 어떤 CSS 색상값도 가능 — "#006FFF", "rgb(0,111,255)", "var(--ac-blue-50)"
     */
    activeColor?: string;
}
declare const Radio: React$1.ForwardRefExoticComponent<RadioProps & React$1.RefAttributes<HTMLInputElement>>;
interface RadioGroupProps extends React$1.HTMLAttributes<HTMLFieldSetElement> {
    title?: string;
    direction?: "vertical" | "horizontal";
}
declare function RadioGroup({ title, direction, className, children, ...props }: RadioGroupProps): React$1.JSX.Element;

interface BreadcrumbItem {
    /** 표시할 레이블 */
    label: string;
    /** 링크 URL (없으면 클릭 불가) */
    href?: string;
    /** 클릭 핸들러 */
    onClick?: () => void;
}
interface BreadcrumbsProps extends React$1.HTMLAttributes<HTMLElement> {
    /** 브레드크럼 아이템 목록 */
    items: BreadcrumbItem[];
    /**
     * 구분자 타입
     * - slash: "/"
     * - chevron: ">"
     */
    separator?: "slash" | "chevron";
    /**
     * 최대 표시 아이템 수
     * 초과 시 중간을 "..."으로 축약
     * (기본값: 제한 없음)
     */
    maxItems?: number;
    /** 홈 아이콘 표시 여부 (기본: true) */
    showHomeIcon?: boolean;
}
declare function Breadcrumbs({ className, items, separator, maxItems, showHomeIcon, ...props }: BreadcrumbsProps): React$1.JSX.Element | null;

type DatePickerMode = "single" | "range";
type DatePickerSize = "sm" | "md" | "lg";
type DatePickerState = "default" | "complete" | "error" | "disable";

interface DatePickerProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (date?: Date) => void;
    size?: DatePickerSize;
    state?: DatePickerState;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    placeholder?: string;
    dateFormat?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    offsetMonths?: number;
    disabledDates?: Date[];
    weekendColor?: boolean;
    className?: string;
    id?: string;
}
declare function DatePicker({ value, defaultValue, onChange, size, state, label, helperText, errorMessage, placeholder, dateFormat, disabled, minDate, maxDate, offsetMonths, disabledDates, weekendColor, className, id, }: DatePickerProps): React$1.JSX.Element;
interface DateRangePickerProps {
    value?: DateRange;
    defaultValue?: DateRange;
    onChange?: (range?: DateRange) => void;
    size?: DatePickerSize;
    state?: DatePickerState;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    dateFormat?: string;
    disabled?: boolean;
    twoMonths?: boolean;
    minDate?: Date;
    maxDate?: Date;
    offsetMonths?: number;
    disabledDates?: Date[];
    weekendColor?: boolean;
    className?: string;
    id?: string;
}
declare function DateRangePicker({ value, defaultValue, onChange, size, state, label, helperText, errorMessage, startPlaceholder, endPlaceholder, dateFormat, disabled, twoMonths, minDate, maxDate, offsetMonths, disabledDates, weekendColor, className, id, }: DateRangePickerProps): React$1.JSX.Element;

declare const textInputVariants: (props?: ({
    size?: "lg" | "md" | "sm" | null | undefined;
    state?: "complete" | "default" | "error" | "disable" | "focus" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextInputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
    size?: "sm" | "md" | "lg";
    state?: "default" | "complete" | "focus" | "error" | "disable";
    label?: string;
    labelLeft?: boolean;
    helperText?: string;
    errorMessage?: string;
    prefix?: React$1.ReactNode;
    suffix?: React$1.ReactNode;
    buttonLabel?: string;
    buttonVariant?: "primary" | "secondary" | "tertiary" | "link";
    buttonClassName?: string;
    onButtonClick?: React$1.MouseEventHandler<HTMLButtonElement>;
}
declare const TextInput: React$1.ForwardRefExoticComponent<TextInputProps & React$1.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends React$1.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    state?: "default" | "complete" | "focus" | "error" | "disable";
}
declare const Textarea: React$1.ForwardRefExoticComponent<TextareaProps & React$1.RefAttributes<HTMLTextAreaElement>>;

interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
interface SelectOptionGroup {
    title: string;
    options: SelectOption[];
}
declare const selectVariants: (props?: ({
    size?: "lg" | "md" | "sm" | null | undefined;
    state?: "complete" | "default" | "error" | "disable" | "focus" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SelectProps extends VariantProps<typeof selectVariants> {
    options?: SelectOption[];
    groups?: SelectOptionGroup[];
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    className?: string;
    id?: string;
}
declare function Select({ size, state, options, groups, placeholder, value, defaultValue, onValueChange, disabled, label, helperText, errorMessage, className, id, }: SelectProps): React$1.JSX.Element;

declare const fileInputVariants: (props?: ({
    size?: "lg" | "md" | "sm" | null | undefined;
    state?: "complete" | "default" | "error" | "disable" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FileInputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size" | "type">, VariantProps<typeof fileInputVariants> {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    triggerLabel?: string;
}
declare const FileInput: React$1.ForwardRefExoticComponent<FileInputProps & React$1.RefAttributes<HTMLInputElement>>;

declare const switchTrackVariants: (props?: ({
    size?: "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SwitchProps extends Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">, VariantProps<typeof switchTrackVariants> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    /** 활성 색상 (기본: ac-primary-50 #FF6300) */
    activeColor?: string;
    label?: string;
}
declare const Switch: React$1.ForwardRefExoticComponent<SwitchProps & React$1.RefAttributes<HTMLButtonElement>>;

interface ToggleGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** "default" | "primary" */
    variant?: "default" | "primary";
    size?: "sm" | "md" | "lg";
    iconOnly?: boolean;
    /** active 아이템에 적용할 Tailwind 클래스 (variant의 active 색상을 override) */
    activeClassName?: string;
}
declare function ToggleGroup({ value, defaultValue, onValueChange, variant, size, iconOnly, activeClassName, className, children, ...props }: ToggleGroupProps): React$1.JSX.Element;
interface ToggleGroupItemProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    icon?: React$1.ReactNode;
    tooltip?: string;
}
declare function ToggleGroupItem({ value, icon, tooltip, children, className, disabled, ...props }: ToggleGroupItemProps): React$1.JSX.Element;

type TooltipPlacement = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
interface TooltipProps {
    /** 툴팁 본문 */
    content: React$1.ReactNode;
    /** 툴팁 위치 */
    placement?: TooltipPlacement;
    /** 트리거 요소 */
    children: React$1.ReactNode;
    /** 툴팁 박스 Tailwind 클래스 override */
    className?: string;
    /** 화살표 Tailwind border 클래스 override (예: "border-t-ac-blue-90") */
    arrowClassName?: string;
}
declare function Tooltip({ content, placement, children, className, arrowClassName }: TooltipProps): React$1.JSX.Element;

type ExpandIconType = "chevron" | "plusMinus" | "arrow";
interface SideNavItem {
    id: string;
    label: string;
    href?: string;
    icon?: React$1.ReactNode;
    children?: SideNavItem[];
    divider?: boolean;
}
interface SideNavContextValue {
    activeId: string;
    onSelect: (id: string) => void;
    openIds: Set<string>;
    toggleOpen: (id: string) => void;
    activeClassName: string;
    expandIcon: ExpandIconType;
    renderLink?: (item: SideNavItem, children: React$1.ReactNode, className: string) => React$1.ReactNode;
}
interface SideNavigationProps extends Omit<React$1.HTMLAttributes<HTMLElement>, "title"> {
    items: SideNavItem[];
    activeId?: string;
    defaultActiveId?: string;
    onActiveChange?: (id: string) => void;
    defaultOpenIds?: string[];
    /**
     * active 상태에 적용할 Tailwind 클래스
     * @default "text-ac-primary-50"
     */
    activeClassName?: string;
    title?: string;
    /**
     * 하위 목록 열림/닫힘 토글 아이콘 타입
     * @default "chevron"
     */
    expandIcon?: ExpandIconType;
    /**
     * href가 있는 아이템을 커스텀 링크로 렌더링
     * Next.js 사용 예:
     * renderLink={(item, children, className) => (
     *   <Link href={item.href!} className={className}>{children}</Link>
     * )}
     */
    renderLink?: SideNavContextValue["renderLink"];
}
declare const SideNavigation: React$1.ForwardRefExoticComponent<SideNavigationProps & React$1.RefAttributes<HTMLElement>>;

type TabSize = "sm" | "md" | "lg";
type TabVariant = "fill" | "full";
interface TabsProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** fill: 콘텐츠 너비 / full: 균등 분할 */
    variant?: TabVariant;
    size?: TabSize;
    /**
     * 활성 탭 색상
     * 토큰명(ac-blue-50) 또는 hex/rgb 값 모두 사용 가능
     * @default "ac-primary-50"
     */
    activeColor?: string;
}
declare const Tabs: React$1.ForwardRefExoticComponent<TabsProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TabList: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
interface TabTriggerProps extends Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
    value: string;
}
declare const TabTrigger: React$1.ForwardRefExoticComponent<TabTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
interface TabContentProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value: string;
}
declare const TabContent: React$1.ForwardRefExoticComponent<TabContentProps & React$1.RefAttributes<HTMLDivElement>>;

type SnackbarVariant = "default" | "error" | "success" | "info" | "warning";
type SnackbarPosition = "top" | "bottom";
type SnackbarSize = "sm" | "md" | "lg";
interface SnackbarItem {
    id: string;
    message: React$1.ReactNode;
    variant?: SnackbarVariant;
    /** 좌측 아이콘 또는 아바타 */
    leftItem?: React$1.ReactNode;
    /** 우측: close / chevron / check / ReactNode (Button 등) */
    rightItem?: "close" | "chevron" | "check" | React$1.ReactNode;
    /** 아이콘 색상 override — Tailwind text 클래스. 미지정 시 variant 기본색 적용 */
    iconColorClass?: string;
    /** 배경색 override — Tailwind bg 클래스 (예: "bg-ac-blue-10") */
    bgColorClass?: string;
    /** 텍스트 색상 override — Tailwind text 클래스 (예: "text-ac-white") */
    textColorClass?: string;
    onAction?: () => void;
    duration?: number;
}
interface SnackbarContextValue {
    show: (item: Omit<SnackbarItem, "id">) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}
declare function useSnackbar(): SnackbarContextValue;
interface SnackbarProviderProps {
    children: React$1.ReactNode;
    position?: SnackbarPosition;
    maxCount?: number;
    defaultDuration?: number;
}
declare function SnackbarProvider({ children, position, maxCount, defaultDuration, }: SnackbarProviderProps): React$1.JSX.Element;
interface SnackbarProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "color"> {
    message: React$1.ReactNode;
    variant?: SnackbarVariant;
    /** 좌측 아이콘 또는 아바타 */
    leftItem?: React$1.ReactNode;
    /** 우측: close / chevron / check / ReactNode (Button 등) */
    rightItem?: "close" | "chevron" | "check" | React$1.ReactNode;
    /** 아이콘 색상 override — Tailwind text 클래스. 미지정 시 variant 기본색 적용 */
    iconColorClass?: string;
    /** 배경색 override — Tailwind bg 클래스 (예: "bg-ac-blue-10") */
    bgColorClass?: string;
    /** 텍스트 색상 override — Tailwind text 클래스 (예: "text-ac-white") */
    textColorClass?: string;
    /** 스낵바 크기 */
    size?: SnackbarSize;
    /**
     * close 버튼 동작 방식
     * - "dismiss": 스낵바 전체 제거 (기본값)
     * - "hide-right": 오른쪽 아이템만 제거, 스낵바는 유지
     */
    closeMode?: "dismiss" | "hide-right";
    onClose?: () => void;
    onAction?: () => void;
}
declare const Snackbar: React$1.ForwardRefExoticComponent<SnackbarProps & React$1.RefAttributes<HTMLDivElement>>;

type ToastStyle = "default" | "full" | "uploading" | "uploading-success" | "message";
type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
type ToastStackMode = "list" | "nesting";
interface ToastItem {
    id: string;
    style?: ToastStyle;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    /** uploading: 진행률 0-100 */
    progress?: number;
    /** uploading: 진행률 텍스트 */
    progressLabel?: string;
    /** uploading: 소요 시간 텍스트 */
    timeLabel?: string;
    /** message: 아바타 이미지 URL */
    avatarSrc?: string;
    /** message: 아바타 대체 텍스트 (이니셜 등) */
    avatarFallback?: string;
    /** message: 시간 텍스트 */
    timestamp?: string;
    /** ms. 0 = 자동 닫힘 없음. 기본 4000 */
    duration?: number;
}
interface ToastProps extends Omit<ToastItem, "id"> {
    onClose?: () => void;
    className?: string;
}
interface ToastProviderProps {
    children: React$1.ReactNode;
    position?: ToastPosition;
    maxCount?: number;
    defaultDuration?: number;
    /** list: 세로 나열 (기본) | nesting: 카드 스택, 호버 시 펼침 */
    stackMode?: ToastStackMode;
}
interface ToastContextValue {
    show: (item: Omit<ToastItem, "id">) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}
declare function useToast(): ToastContextValue;
declare function ToastProvider({ children, position, maxCount, defaultDuration, stackMode, }: ToastProviderProps): React$1.JSX.Element;
declare const Toast: React$1.ForwardRefExoticComponent<ToastProps & React$1.RefAttributes<HTMLDivElement>>;

type PaginationType = "simple" | "default";
interface PaginationProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** 전체 페이지 수 */
    total: number;
    /** 현재 페이지 (controlled) */
    page?: number;
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    /** simple: 이전/다음 아이콘만, 중앙에 input 표시 */
    type?: PaginationType;
    /** 비활성화 */
    disabled?: boolean;
    /** 활성 페이지 버튼 배경 색상 — Tailwind bg 클래스 (예: "bg-ac-gray-80", 기본: "bg-ac-primary-50") */
    activeColorClass?: string;
    /** 페이지당 항목 수 선택 표시 */
    showPageSize?: boolean;
    pageSizeOptions?: number[];
    pageSize?: number;
    defaultPageSize?: number;
    onPageSizeChange?: (size: number) => void;
    /** Go to 페이지 점프 입력 표시 */
    showJumper?: boolean;
}
declare const Pagination: React$1.ForwardRefExoticComponent<PaginationProps & React$1.RefAttributes<HTMLDivElement>>;

type ProgressType = "linear" | "circular";
type ProgressLinearSize = "sm" | "md" | "lg" | "xl";
type ProgressCircularSize = "xs" | "sm" | "md" | "lg" | "xl";
interface ProgressIndicatorProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "color"> {
    /** 선형 / 원형 */
    type?: ProgressType;
    /** 0 ~ 100 */
    value?: number;
    /** 최대값 (기본 100) */
    max?: number;
    /** 선형 사이즈 */
    linearSize?: ProgressLinearSize;
    /** 원형 사이즈 */
    circularSize?: ProgressCircularSize;
    /** 진행 색상 (기본 ac-primary-50) */
    color?: string;
    /** 트랙 색상 (기본 ac-gray-30) */
    trackColor?: string;
    /** 라벨 텍스트 */
    label?: string;
    /** 퍼센트 표시 여부 */
    showValue?: boolean;
    /** indeterminate (로딩 상태) */
    indeterminate?: boolean;
}
declare const ProgressIndicator: React$1.ForwardRefExoticComponent<ProgressIndicatorProps & React$1.RefAttributes<HTMLDivElement>>;

declare const RADIUS_MAP: {
    readonly none: "rounded-none";
    readonly 0: "rounded-none";
    readonly 1: "rounded-sm";
    readonly 2: "rounded";
    readonly 3: "rounded-md";
    readonly 4: "rounded-lg";
    readonly rounded: "rounded-full";
};
type SkeletonRadius = keyof typeof RADIUS_MAP;
interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    radius?: SkeletonRadius;
    index?: number;
    className?: string;
}
declare function Skeleton({ width, height, radius, index, className, }: SkeletonProps): React$1.JSX.Element;

interface TreeListItemData {
    id: string;
    label: string;
    icon?: React.ReactNode;
    children?: TreeListItemData[];
    isExpanded?: boolean;
}
type TreeListDensity = "compact" | "balanced" | "spacious";
interface TreeListProps {
    items: TreeListItemData[];
    density?: TreeListDensity;
    header?: React.ReactNode;
    selectedId?: string;
    onSelect?: (id: string) => void;
    className?: string;
}
declare function TreeList({ items, density, header, selectedId, onSelect, className, }: TreeListProps): React$1.JSX.Element;

type DropdownAlign = "start" | "center" | "end";
type DropdownSide = "top" | "bottom" | "left" | "right";
interface DropdownProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: DropdownSide;
    align?: DropdownAlign;
    /** 드롭다운 열림 방식: 클릭, 호버, 또는 우클릭 @default "click" */
    trigger?: "click" | "hover" | "contextmenu";
    children: React$1.ReactNode;
}
declare function Dropdown({ open: controlledOpen, defaultOpen, onOpenChange, side, align, trigger, children, }: DropdownProps): React$1.JSX.Element;
declare namespace Dropdown {
    var displayName: string;
}
interface DropdownTriggerProps extends React$1.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
    disabled?: boolean;
}
declare function DropdownTrigger({ children, asChild, disabled, onClick, ...props }: DropdownTriggerProps): React$1.JSX.Element;
declare namespace DropdownTrigger {
    var displayName: string;
}
interface DropdownContentProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    minWidth?: number | string;
}
declare const DropdownContent: React$1.ForwardRefExoticComponent<DropdownContentProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownLabel: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownSeparator: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
interface DropdownItemProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 좌측 아이콘 */
    icon?: React$1.ReactNode;
    /** 우측 단축키 힌트 */
    shortcut?: string;
    /** 외부 링크 아이콘 표시 */
    external?: boolean;
    /** 우측 chevron (sub dropdown용) */
    hasSubmenu?: boolean;
    disabled?: boolean;
    /** small 사이즈 */
    small?: boolean;
    onSelect?: () => void;
}
declare const DropdownItem: React$1.ForwardRefExoticComponent<DropdownItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface DropdownCheckboxItemProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    icon?: React$1.ReactNode;
}
declare const DropdownCheckboxItem: React$1.ForwardRefExoticComponent<DropdownCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface DropdownRadioGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
declare function DropdownRadioGroup({ value: controlledValue, defaultValue, onValueChange, children, ...props }: DropdownRadioGroupProps): React$1.JSX.Element;
declare namespace DropdownRadioGroup {
    var displayName: string;
}
interface DropdownRadioItemProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    value: string;
    disabled?: boolean;
    icon?: React$1.ReactNode;
}
declare const DropdownRadioItem: React$1.ForwardRefExoticComponent<DropdownRadioItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface DropdownAvatarHeaderProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** 아바타 이미지 URL */
    src?: string;
    /** 이름 (이니셜 생성에 사용) */
    name?: string;
    /** 주 텍스트 */
    label: string;
    /** 부 텍스트 (이메일 등) */
    description?: string;
}
declare const DropdownAvatarHeader: React$1.ForwardRefExoticComponent<DropdownAvatarHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
interface DropdownAvatarItemProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** 아바타 이미지 URL */
    src?: string;
    /** 이름 (이니셜 생성에 사용) */
    name?: string;
    /** 주 텍스트 */
    label: string;
    /** 부 텍스트 (이메일 등) */
    description?: string;
    disabled?: boolean;
    onSelect?: () => void;
}
declare const DropdownAvatarItem: React$1.ForwardRefExoticComponent<DropdownAvatarItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface DropdownSubMenuProps {
    id: string;
    trigger: React$1.ReactNode;
    children: React$1.ReactNode;
    disabled?: boolean;
}
declare function DropdownSubMenu({ id, trigger, children, disabled }: DropdownSubMenuProps): React$1.JSX.Element;
declare namespace DropdownSubMenu {
    var displayName: string;
}

type DialogSize = "sm" | "md" | "lg";
interface DialogProps {
    /** controlled open 상태 */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** sm(500px) / md(800px) / lg(1000px) */
    size?: DialogSize;
    /** Scrim 클릭 시 닫기 (기본 true) */
    closeOnScrim?: boolean;
    /** ESC 키로 닫기 (기본 true) */
    closeOnEsc?: boolean;
    children?: React$1.ReactNode;
}
declare function Dialog({ open: controlledOpen, defaultOpen, onOpenChange, size, closeOnScrim, closeOnEsc, children, }: DialogProps): React$1.JSX.Element;
declare namespace Dialog {
    var displayName: string;
}
interface DialogTriggerProps extends React$1.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
}
declare function DialogTrigger({ children, asChild, onClick, ...props }: DialogTriggerProps): React$1.JSX.Element;
declare namespace DialogTrigger {
    var displayName: string;
}
interface DialogContentProps extends React$1.HTMLAttributes<HTMLDivElement> {
    closeOnScrim?: boolean;
}
declare const DialogContent: React$1.ForwardRefExoticComponent<DialogContentProps & React$1.RefAttributes<HTMLDivElement>>;
interface DialogHeaderProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React$1.ReactNode;
    subtitle?: React$1.ReactNode;
    showClose?: boolean;
    divider?: boolean;
}
declare const DialogHeader: React$1.ForwardRefExoticComponent<DialogHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DialogBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
interface DialogFooterProps extends React$1.HTMLAttributes<HTMLDivElement> {
    divider?: boolean;
}
declare const DialogFooter: React$1.ForwardRefExoticComponent<DialogFooterProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DialogTitle: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLHeadingElement> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;
interface DialogCloseProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}
declare function DialogClose({ children, asChild, onClick, ...props }: DialogCloseProps): React$1.JSX.Element;
declare namespace DialogClose {
    var displayName: string;
}

type AccordionType = "single" | "multiple";
interface AccordionProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "onChange"> {
    type?: AccordionType;
    /** default: 배경 없음 / filled: 배경색 있음 */
    variant?: "default" | "filled";
    /** filled variant 시 배경색 커스텀 (기본: ac-gray-10) */
    backgroundColor?: string;
    /** 모든 AccordionContent에 일괄 적용할 className */
    contentClassName?: string;
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
}
declare const Accordion: React$1.ForwardRefExoticComponent<AccordionProps & React$1.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React$1.HTMLAttributes<HTMLDivElement> {
    value: string;
}
declare const AccordionItem: React$1.ForwardRefExoticComponent<AccordionItemProps & React$1.RefAttributes<HTMLDivElement>>;
interface AccordionTriggerProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    /** plus: +/- 토글 아이콘 (Default) / chevron: 화살표 아이콘 */
    iconType?: "plus" | "chevron";
}
declare const AccordionTrigger: React$1.ForwardRefExoticComponent<AccordionTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

type CarouselOrientation = "horizontal" | "vertical";
type CarouselNavStyle = "default" | "line" | "border" | "text";
type CarouselDotsType = "rounded" | "line" | "border";
interface CarouselProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** 슬라이드 방향 */
    orientation?: CarouselOrientation;
    /** 무한 루프 여부 */
    loop?: boolean;
    /** 초기 인덱스 (uncontrolled) */
    defaultIndex?: number;
    /** 현재 인덱스 (controlled) */
    index?: number;
    onIndexChange?: (index: number) => void;
    /** 한 번에 보이는 아이템 수 — Multi Carousel */
    itemsPerView?: number;
}
declare const Carousel: React$1.ForwardRefExoticComponent<CarouselProps & React$1.RefAttributes<HTMLDivElement>>;
interface CarouselContentProps extends React$1.HTMLAttributes<HTMLDivElement> {
}
declare const CarouselContent: React$1.ForwardRefExoticComponent<CarouselContentProps & React$1.RefAttributes<HTMLDivElement>>;
declare const CarouselItem: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
interface CarouselNavButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    navStyle?: CarouselNavStyle;
}
declare const CarouselPrevious: React$1.ForwardRefExoticComponent<CarouselNavButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const CarouselNext: React$1.ForwardRefExoticComponent<CarouselNavButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
interface CarouselDotsProps extends React$1.HTMLAttributes<HTMLDivElement> {
    activeColor?: string;
    type?: CarouselDotsType;
}
declare const CarouselDots: React$1.ForwardRefExoticComponent<CarouselDotsProps & React$1.RefAttributes<HTMLDivElement>>;
declare const CarouselCounter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

type SliderType = "default" | "input" | "with-icon" | "range" | "range-input";
interface SliderProps {
    type?: SliderType;
    /** thumb/fill 색상 Tailwind 클래스. 예: "bg-ac-blue-50" @default "bg-ac-primary-50" */
    colorClassName?: string;
    min?: number;
    max?: number;
    step?: number;
    /** single: number, range: [number, number] */
    value?: number | [number, number];
    defaultValue?: number | [number, number];
    onValueChange?: (value: number | [number, number]) => void;
    disabled?: boolean;
    /** default / range 타입에서 min/max 레이블 표시 */
    showMinMax?: boolean;
    leftIcon?: React$1.ReactNode;
    rightIcon?: React$1.ReactNode;
    className?: string;
}
declare function Slider({ type, colorClassName, min, max, step, value: controlledValue, defaultValue, onValueChange, disabled, showMinMax, leftIcon, rightIcon, className, }: SliderProps): React$1.JSX.Element;
declare namespace Slider {
    var displayName: string;
}

interface StepItem {
    title?: string;
    stepText?: string;
}
type StepIndicatorType = "horizontal" | "vertical";
type StepIndicatorStyle = "default" | "simple";
type StepIndicatorSize = "sm" | "md" | "lg";
interface StepIndicatorProps {
    steps: StepItem[];
    /** 0-based 현재 진행 중인 단계 인덱스 */
    current: number;
    type?: StepIndicatorType;
    /** default: 아이콘 + 텍스트 / simple: 아이콘만 */
    style?: StepIndicatorStyle;
    size?: StepIndicatorSize;
    /** 단계 숫자 텍스트 표시 여부 */
    showStepText?: boolean;
    /**
     * 활성/완료 색상 Tailwind text 클래스
     * bg-current / border-current로 내부에서 파생됨
     * @default "text-ac-primary-50"
     */
    colorClassName?: string;
    className?: string;
}
declare function StepIndicator({ steps, current, type, style, size, showStepText, colorClassName, className, }: StepIndicatorProps): React$1.JSX.Element;
declare namespace StepIndicator {
    var displayName: string;
}

type ResizableOrientation = "horizontal" | "vertical";
type ResizableHandleVariant = "margin" | "line";
interface ResizablePanelGroupProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "children"> {
    /** 크기 조절 방향. 기본값: horizontal */
    orientation?: ResizableOrientation;
    /** 초기 패널 크기 (%, 합산 100). 생략 시 균등 분할 */
    defaultSizes?: number[];
    children: React$1.ReactNode;
}
declare function ResizablePanelGroup({ orientation, defaultSizes, className, children, ...props }: ResizablePanelGroupProps): React$1.JSX.Element;
declare namespace ResizablePanelGroup {
    var displayName: string;
}
interface ResizablePanelProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** ResizablePanelGroup이 자동으로 주입합니다 */
    _index?: number;
}
declare function ResizablePanel({ className, _index, style, ...props }: ResizablePanelProps): React$1.JSX.Element;
declare namespace ResizablePanel {
    var displayName: string;
}
interface ResizableHandleProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "children"> {
    /** margin: 여백 구분 (기본) | line: 1px 선 구분 */
    variant?: ResizableHandleVariant;
    /** ResizablePanelGroup이 자동으로 주입합니다 */
    _index?: number;
}
declare function ResizableHandle({ variant, className, _index, ...props }: ResizableHandleProps): React$1.JSX.Element;
declare namespace ResizableHandle {
    var displayName: string;
}

/**
 * Tailwind 클래스를 안전하게 병합합니다.
 * clsx로 조건부 클래스를 처리하고, twMerge로 충돌을 해결합니다.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary", className)
 */
declare function cn(...inputs: ClassValue[]): string;

declare function IconWrapper({ children, className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): React$1.JSX.Element;
declare function cloneIconWithSize(icon: React$1.ReactNode, sizeClass: string): React$1.ReactNode;

interface InputHelperTextProps {
    id?: string;
    helperText?: string;
    errorMessage?: string;
    isError: boolean;
}
declare function InputHelperText({ id, helperText, errorMessage, isError }: InputHelperTextProps): React$1.JSX.Element | null;

export { Accordion, AccordionContent, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, Avatar, type AvatarProps, Badge, type BadgeProps, type BreadcrumbItem, Breadcrumbs, type BreadcrumbsProps, Button, ButtonGroup, type ButtonGroupProps, type ButtonProps, Card, CardContent, CardDescription, CardFooter, CardFooterButtons, CardFooterInfo, type CardFooterInfoProps, type CardFooterProps, CardFooterUser, type CardFooterUserProps, CardHeader, type CardHeaderProps, CardMenu, type CardMenuProps, type CardProps, CardTitle, Carousel, CarouselContent, type CarouselContentProps, CarouselCounter, CarouselDots, type CarouselDotsProps, CarouselItem, type CarouselNavButtonProps, type CarouselNavStyle, CarouselNext, type CarouselOrientation, CarouselPrevious, type CarouselProps, Checkbox, CheckboxGroup, type CheckboxGroupProps, type CheckboxProps, DatePicker, type DatePickerMode, type DatePickerProps, type DatePickerSize, type DatePickerState, DateRangePicker, type DateRangePickerProps, Dialog, DialogBody, DialogClose, DialogContent, type DialogContentProps, DialogDescription, DialogFooter, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, DialogTitle, DialogTrigger, type DialogTriggerProps, Divider, type DividerProps, Dropdown, type DropdownAlign, DropdownAvatarHeader, type DropdownAvatarHeaderProps, DropdownAvatarItem, type DropdownAvatarItemProps, DropdownCheckboxItem, type DropdownCheckboxItemProps, DropdownContent, type DropdownContentProps, DropdownItem, type DropdownItemProps, DropdownLabel, type DropdownProps, DropdownRadioGroup, type DropdownRadioGroupProps, DropdownRadioItem, type DropdownRadioItemProps, DropdownSeparator, type DropdownSide, DropdownSubMenu, type DropdownSubMenuProps, DropdownTrigger, type DropdownTriggerProps, FAB, type FABProps, FileInput, type FileInputProps, IconWrapper, InputHelperText, Pagination, type PaginationProps, type PaginationType, type ProgressCircularSize, ProgressIndicator, type ProgressIndicatorProps, type ProgressLinearSize, type ProgressType, Radio, RadioGroup, type RadioGroupProps, type RadioProps, ResizableHandle, type ResizableHandleProps, type ResizableHandleVariant, ResizablePanel, ResizablePanelGroup, type ResizablePanelGroupProps, Select, type SelectOption, type SelectOptionGroup, type SelectProps, type SideNavItem, SideNavigation, type SideNavigationProps, Skeleton, type SkeletonProps, type SkeletonRadius, Slider, type SliderProps, type SliderType, Snackbar, type SnackbarItem, type SnackbarPosition, type SnackbarProps, SnackbarProvider, type SnackbarProviderProps, type SnackbarVariant, StepIndicator, type StepIndicatorProps, type StepIndicatorSize, type StepIndicatorStyle, type StepIndicatorType, type StepItem, Switch, type SwitchProps, TabContent, type TabContentProps, TabList, type TabSize, TabTrigger, type TabTriggerProps, type TabVariant, Tabs, type TabsProps, TextInput, type TextInputProps, Textarea, type TextareaProps, Toast, type ToastItem, type ToastPosition, type ToastProps, ToastProvider, type ToastProviderProps, type ToastStyle, ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupProps, Tooltip, type TooltipProps, TreeList, type TreeListDensity, type TreeListItemData, type TreeListProps, avatarVariants, badgeVariants, buttonGroupVariants, buttonVariants, cardVariants, checkboxVariants, cloneIconWithSize, cn, dividerVariants, fabVariants, fileInputVariants, radioVariants, textInputVariants, useSnackbar, useToast };
