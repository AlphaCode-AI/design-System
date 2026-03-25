"use client";

import * as React from "react";
import { DayPicker, type DateRange, type Matcher } from "react-day-picker";
import { ko } from "date-fns/locale";
import { format, isValid, addMonths, subMonths, startOfDay } from "date-fns";
import { cn } from "@/utils/cn";
import { CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/Button";

/* ── Types ─────────────────────────────────────────────────── */
export type DatePickerMode  = "single" | "range";
export type DatePickerView  = "day" | "month" | "year";
export type DatePickerSize  = "sm" | "md" | "lg";
export type DatePickerState = "default" | "complete" | "error" | "disable";
export type { DateRange };

/* ── Input size / state helpers ─────────────────────────────── */
const inputSizeClass: Record<DatePickerSize, string> = {
  lg: "h-10 px-3 text-sm",
  md: "h-9 px-3 text-sm",
  sm: "h-[30px] px-2.5 text-xs",
};
const inputStateClass: Record<DatePickerState, string> = {
  default:  "border-border",
  complete: "border-border",
  error:    "border-ac-red-50",
  disable:  "border-border",
};

/* ── DayPicker classNames ───────────────────────────────────── */
const BASE_DAY_CLASSNAMES = {
  root:          "w-full select-none",
  months:        "flex flex-col",
  month:         "",
  month_caption: "",
  caption_label: "hidden",
  nav:           "hidden",
  weeks:         "",
  weekdays:      "flex px-3 py-1",
  weekday:       "w-10 h-10 flex items-center justify-center text-sm font-medium text-foreground",
  week:          "flex px-3",
  day:           "relative text-center",
  day_button:    cn(
    "h-10 w-10 rounded-full text-sm font-medium transition-colors",
    "hover:bg-ac-gray-20 focus:outline-none"
  ),
  today:         "[&:not(.selected)>button]:ring-1 [&:not(.selected)>button]:ring-ac-primary-50 [&:not(.selected)>button]:text-ac-primary-50 [&:not(.selected)>button]:font-bold",
  outside:       "[&>button]:!text-ac-gray-50",
  disabled:      "pointer-events-none [&>button]:opacity-30",
};

function getDayPickerClassNames(mode: "single" | "range" = "single") {
  if (mode === "range") {
    return {
      ...BASE_DAY_CLASSNAMES,
      selected:     "",
      range_start:  "[&>button]:!bg-ac-black [&>button]:!text-white [&>button]:!font-bold",
      range_end:    "[&>button]:!bg-ac-black [&>button]:!text-white [&>button]:!font-bold",
      range_middle: "[&>button]:!bg-ac-gray-20 [&>button]:!rounded-none [&>button]:!text-ac-black",
    };
  }
  return {
    ...BASE_DAY_CLASSNAMES,
    selected:     "[&>button]:!bg-ac-black [&>button]:!text-white [&>button]:!font-bold",
    range_start:  "",
    range_end:    "",
    range_middle: "",
  };
}

/* ── MonthHeader (공통) ─────────────────────────────────────── */
function MonthHeader({
  calendarMonth,
  setDisplayMonth,
  onYearClick,
  onMonthClick,
  showPrev = true,
  showNext = true,
}: {
  calendarMonth: { date: Date };
  setDisplayMonth: React.Dispatch<React.SetStateAction<Date>>;
  onYearClick: () => void;
  onMonthClick: () => void;
  showPrev?: boolean;
  showNext?: boolean;
}) {
  const year = calendarMonth.date.getFullYear();
  const month = calendarMonth.date.getMonth();

  return (
    <div className="flex items-center justify-between bg-ac-gray-10 px-6 h-[60px]">
      {showPrev ? (
        <button
          type="button"
          onClick={() => setDisplayMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      ) : (
        <div className="w-9" />
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onYearClick}
          className="flex items-center gap-1 px-3 h-10 rounded-md hover:bg-ac-gray-20 text-sm font-bold text-foreground transition-colors"
        >
          {year}년
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          type="button"
          onClick={onMonthClick}
          className="flex items-center gap-1 px-3 h-10 rounded-md hover:bg-ac-gray-20 text-sm font-bold text-foreground transition-colors"
        >
          {month + 1}월
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      {showNext ? (
        <button
          type="button"
          onClick={() => setDisplayMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <div className="w-9" />
      )}
    </div>
  );
}

/* ── YearView ───────────────────────────────────────────────── */
function YearView({
  currentYear,
  selectedYear,
  onSelectYear,
  minYear,
  maxYear,
}: {
  currentYear: number;
  selectedYear?: number;
  onSelectYear: (year: number) => void;
  minYear?: number;
  maxYear?: number;
}) {
  const [yearPage, setYearPage] = React.useState(Math.floor(currentYear / 9) * 9);
  const years = Array.from({ length: 9 }, (_, i) => yearPage + i);

  const isPrevDisabled = minYear !== undefined && yearPage - 1 < minYear;
  const isNextDisabled = maxYear !== undefined && yearPage + 9 > maxYear;

  return (
    <div className="w-[318px]">
      <div className="flex items-center justify-between bg-ac-gray-10 px-6 h-[60px]">
        <button
          type="button"
          onClick={() => setYearPage(y => y - 9)}
          disabled={isPrevDisabled}
          className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold text-foreground">{yearPage} – {yearPage + 8}</span>
        <button
          type="button"
          onClick={() => setYearPage(y => y + 9)}
          disabled={isNextDisabled}
          className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {years.map(y => {
          const isDisabled = (minYear !== undefined && y < minYear) || (maxYear !== undefined && y > maxYear);
          return (
            <button
              key={y}
              type="button"
              onClick={() => onSelectYear(y)}
              disabled={isDisabled}
              className={cn(
                "rounded-md py-2.5 text-base font-medium transition-colors",
                isDisabled
                  ? "opacity-30 pointer-events-none"
                  : selectedYear === y
                    ? "bg-ac-balck-50 text-white font-bold"
                    : "hover:bg-ac-gray-20"
              )}
            >
              {y}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── MonthView ──────────────────────────────────────────────── */
const MONTHS_KO = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

function MonthView({
  currentYear,
  selectedMonth,
  onBack,
  onSelectMonth,
  minDate,
  maxDate,
}: {
  currentYear: number;
  selectedMonth?: number;
  onBack: () => void;
  onSelectMonth: (month: number) => void;
  minDate?: Date;
  maxDate?: Date;
}) {
  const isMonthDisabled = (monthIndex: number) => {
    if (minDate) {
      if (currentYear < minDate.getFullYear()) return true;
      if (currentYear === minDate.getFullYear() && monthIndex < minDate.getMonth()) return true;
    }
    if (maxDate) {
      if (currentYear > maxDate.getFullYear()) return true;
      if (currentYear === maxDate.getFullYear() && monthIndex > maxDate.getMonth()) return true;
    }
    return false;
  };

  return (
    <div className="w-[318px]">
      <div className="flex items-center justify-between bg-ac-gray-10 px-6 h-[60px]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-bold text-foreground hover:text-ac-primary-50 transition-colors"
        >
          {currentYear}년
        </button>
        <div className="w-9" />
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {MONTHS_KO.map((m, i) => {
          const isDisabled = isMonthDisabled(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectMonth(i)}
              disabled={isDisabled}
              className={cn(
                "rounded-md py-2.5 text-base font-medium transition-colors",
                isDisabled
                  ? "opacity-30 pointer-events-none"
                  : selectedMonth === i
                    ? "bg-ac-black text-white font-bold"
                    : "hover:bg-ac-gray-20"
              )}
            >
              {m}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SingleCalendar
══════════════════════════════════════════════════════════════ */
interface SingleCalendarProps {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  weekendColor?: boolean;
}

function SingleCalendar({ selected, onSelect, minDate, maxDate, disabledDates, weekendColor }: SingleCalendarProps) {
  const [displayMonth, setDisplayMonth] = React.useState<Date>(selected ?? new Date());
  const [view, setView] = React.useState<DatePickerView>("day");

  const disabledDays: Matcher[] = [
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after: maxDate }] : []),
    ...(disabledDates ?? []),
  ];

  const weekendModifiers = weekendColor ? {
    sunday: (date: Date) => date.getDay() === 0,
    saturday: (date: Date) => date.getDay() === 6,
  } : undefined;
  const weekendModifiersClassNames = weekendColor ? {
    sunday: "[&>button]:!text-ac-red-50",
    saturday: "[&>button]:!text-ac-blue-50",
  } : undefined;

  if (view === "year") {
    return (
      <YearView
        currentYear={displayMonth.getFullYear()}
        selectedYear={selected?.getFullYear()}
        onSelectYear={(y) => {
          setDisplayMonth(new Date(y, displayMonth.getMonth(), 1));
          setView("month");
        }}
        minYear={minDate?.getFullYear()}
        maxYear={maxDate?.getFullYear()}
      />
    );
  }

  if (view === "month") {
    return (
      <MonthView
        currentYear={displayMonth.getFullYear()}
        selectedMonth={selected?.getMonth()}
        onBack={() => setView("year")}
        onSelectMonth={(m) => {
          setDisplayMonth(new Date(displayMonth.getFullYear(), m, 1));
          setView("day");
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  return (
    <div className="w-[318px] pb-2">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        locale={ko}
        weekStartsOn={0}
        showOutsideDays
        classNames={getDayPickerClassNames()}
        startMonth={minDate}
        endMonth={maxDate}
        disabled={disabledDays.length > 0 ? disabledDays : undefined}
        modifiers={weekendModifiers}
        modifiersClassNames={weekendModifiersClassNames}
        components={{
          MonthCaption: ({ calendarMonth }) => (
            <MonthHeader
              calendarMonth={calendarMonth}
              setDisplayMonth={setDisplayMonth}
              onYearClick={() => setView("year")}
              onMonthClick={() => setView("month")}
            />
          ),
        }}
      />
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   RangeCalendar — 단일 달력 or 두 달력 + 푸터
══════════════════════════════════════════════════════════════ */
interface RangeCalendarProps {
  selected?: DateRange;
  onSelect?: (range?: DateRange) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  twoMonths?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  weekendColor?: boolean;
}

function RangeCalendar({ selected, onSelect, onConfirm, onCancel, twoMonths = false, minDate, maxDate, disabledDates, weekendColor }: RangeCalendarProps) {
  const startMonth = selected?.from ?? new Date();
  const [displayMonth, setDisplayMonth] = React.useState<Date>(
    new Date(startMonth.getFullYear(), startMonth.getMonth(), 1)
  );
  const [view, setView] = React.useState<DatePickerView>("day");

  const nextMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1);

  const fmtDate = (d?: Date) => d && isValid(d) ? format(d, "yyyy-MM-dd") : "";
  const rangeText = selected?.from && selected?.to
    ? `${fmtDate(selected.from)} ~ ${fmtDate(selected.to)}`
    : selected?.from ? fmtDate(selected.from)
    : "";
  const canConfirm = !!(selected?.from && selected?.to);

  const Footer = () => (
    <div className="flex items-center px-4 gap-2 border-t border-border h-[52px] mt-1">
      <span className="flex-1 text-xs text-foreground truncate">{rangeText}</span>
      <Button variant="tertiary" size="sm" onClick={onCancel}>취소</Button>
      <Button variant="primary" size="sm" onClick={onConfirm} disabled={!canConfirm}>확인</Button>
    </div>
  );

  if (view === "year") {
    return (
      <YearView
        currentYear={displayMonth.getFullYear()}
        selectedYear={selected?.from?.getFullYear()}
        onSelectYear={(y) => {
          setDisplayMonth(new Date(y, displayMonth.getMonth(), 1));
          setView("month");
        }}
        minYear={minDate?.getFullYear()}
        maxYear={maxDate?.getFullYear()}
      />
    );
  }

  if (view === "month") {
    return (
      <MonthView
        currentYear={displayMonth.getFullYear()}
        selectedMonth={selected?.from?.getMonth()}
        onBack={() => setView("year")}
        onSelectMonth={(m) => {
          setDisplayMonth(new Date(displayMonth.getFullYear(), m, 1));
          setView("day");
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }

  const disabledDays: Matcher[] = [
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after: maxDate }] : []),
    ...(disabledDates ?? []),
  ];

  const weekendModifiers = weekendColor ? {
    sunday: (date: Date) => date.getDay() === 0,
    saturday: (date: Date) => date.getDay() === 6,
  } : undefined;
  const weekendModifiersClassNames = weekendColor ? {
    sunday: "[&>button]:!text-ac-red-50",
    saturday: "[&>button]:!text-ac-blue-50",
  } : undefined;

  const dayPickerProps = {
    mode: "range" as const,
    selected,
    onSelect,
    locale: ko,
    weekStartsOn: 0 as const,
    showOutsideDays: true,
    classNames: getDayPickerClassNames("range"),
    startMonth: minDate,
    endMonth: maxDate,
    disabled: disabledDays.length > 0 ? disabledDays : undefined,
    modifiers: weekendModifiers,
    modifiersClassNames: weekendModifiersClassNames,
  };

  if (twoMonths) {
    return (
      <div>
        <div className="flex">
          <div className="w-[318px] pb-2">
            <DayPicker
              {...dayPickerProps}
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              components={{
                MonthCaption: ({ calendarMonth }) => (
                  <MonthHeader
                    calendarMonth={calendarMonth}
                    setDisplayMonth={setDisplayMonth}
                    onYearClick={() => setView("year")}
                    onMonthClick={() => setView("month")}
                    showNext={false}
                  />
                ),
              }}
            />
          </div>
          <div className="w-px bg-border" />
          <div className="w-[318px] pb-2">
            <DayPicker
              {...dayPickerProps}
              month={nextMonth}
              onMonthChange={() => {}}
              components={{
                MonthCaption: ({ calendarMonth }) => (
                  <MonthHeader
                    calendarMonth={calendarMonth}
                    setDisplayMonth={setDisplayMonth}
                    onYearClick={() => setView("year")}
                    onMonthClick={() => setView("month")}
                    showPrev={false}
                  />
                ),
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-[318px]">
      <DayPicker
        {...dayPickerProps}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        components={{
          MonthCaption: ({ calendarMonth }) => (
            <MonthHeader
              calendarMonth={calendarMonth}
              setDisplayMonth={setDisplayMonth}
              onYearClick={() => setView("year")}
              onMonthClick={() => setView("month")}
            />
          ),
        }}
      />
      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DatePicker (Single)
══════════════════════════════════════════════════════════════ */
export interface DatePickerProps {
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

function DatePicker({
  value, defaultValue, onChange,
  size = "md", state = "default",
  label, helperText, errorMessage,
  placeholder = "날짜를 선택해주세요.",
  dateFormat = "yyyy년 MM월 dd일",
  disabled, minDate, maxDate, offsetMonths, disabledDates, weekendColor, className, id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const today = startOfDay(new Date());
  const resolvedMin = minDate ?? (offsetMonths !== undefined ? subMonths(today, offsetMonths) : undefined);
  const resolvedMax = maxDate ?? (offsetMonths !== undefined ? addMonths(today, offsetMonths) : undefined);

  const inputId = id ?? React.useId();
  const isError = state === "error" || !!errorMessage;
  const resolvedState = isError ? "error" : state;

  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (date?: Date) => {
    if (!controlled) setInternalValue(date);
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 w-full" ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="relative">
        <button
          id={inputId}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen(o => !o)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={isError}
          className={cn(
            "flex items-center justify-between w-full rounded-md border bg-background transition-colors",
            "disabled:bg-ac-gray-20 disabled:cursor-not-allowed disabled:opacity-60",
            inputSizeClass[size], inputStateClass[resolvedState],
            !currentValue && "text-muted-foreground",
            className
          )}
        >
          <span>
            {currentValue && isValid(currentValue)
              ? format(currentValue, dateFormat, { locale: ko })
              : placeholder}
          </span>
          <CalendarIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
        </button>
        {open && (
          <div className="absolute z-dropdown mt-1 rounded-lg border border-border bg-background shadow-lg overflow-hidden">
            <SingleCalendar selected={currentValue} onSelect={handleSelect} minDate={resolvedMin} maxDate={resolvedMax} disabledDates={disabledDates} weekendColor={weekendColor} />
          </div>
        )}
      </div>
      {(helperText || errorMessage) && (
        <p className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DateRangePicker
══════════════════════════════════════════════════════════════ */
export interface DateRangePickerProps {
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

function DateRangePicker({
  value, defaultValue, onChange,
  size = "md", state = "default",
  label, helperText, errorMessage,
  startPlaceholder = "시작일", endPlaceholder = "종료일",
  dateFormat = "yyyy-MM-dd",
  disabled, twoMonths = false, minDate, maxDate, offsetMonths, disabledDates, weekendColor, className, id,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>(defaultValue);
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(defaultValue);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const today = startOfDay(new Date());
  const resolvedMin = minDate ?? (offsetMonths !== undefined ? subMonths(today, offsetMonths) : undefined);
  const resolvedMax = maxDate ?? (offsetMonths !== undefined ? addMonths(today, offsetMonths) : undefined);

  const inputId = id ?? React.useId();
  const isError = state === "error" || !!errorMessage;
  const resolvedState = isError ? "error" : state;

  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (disabled) return;
    setTempRange(currentValue);
    setOpen(o => !o);
  };

  const handleConfirm = () => {
    if (!controlled) setInternalValue(tempRange);
    onChange?.(tempRange);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempRange(currentValue);
    setOpen(false);
  };

  const fmt = (d?: Date) => d && isValid(d) ? format(d, dateFormat, { locale: ko }) : undefined;

  return (
    <div className="flex flex-col gap-1 w-full" ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="relative">
        <button
          id={inputId}
          type="button"
          disabled={disabled}
          onClick={handleOpen}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={isError}
          className={cn(
            "flex items-center justify-between w-full rounded-md border bg-background transition-colors gap-2",
            "disabled:bg-ac-gray-20 disabled:cursor-not-allowed disabled:opacity-60",
            inputSizeClass[size], inputStateClass[resolvedState],
            className
          )}
        >
          <span className={cn(!currentValue?.from && "text-muted-foreground")}>
            {fmt(currentValue?.from) ?? startPlaceholder}
          </span>
          <span className="text-foreground shrink-0">~</span>
          <span className={cn(!currentValue?.to && "text-muted-foreground")}>
            {fmt(currentValue?.to) ?? endPlaceholder}
          </span>
          <CalendarIcon className="w-4 h-4 shrink-0 text-muted-foreground ml-auto" />
        </button>
        {open && (
          <div className="absolute z-dropdown mt-1 rounded-lg border border-border bg-background shadow-lg overflow-hidden">
            <RangeCalendar
              selected={tempRange}
              onSelect={setTempRange}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              twoMonths={twoMonths}
              minDate={resolvedMin}
              maxDate={resolvedMax}
              disabledDates={disabledDates}
              weekendColor={weekendColor}
            />
          </div>
        )}
      </div>
      {(helperText || errorMessage) && (
        <p className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
}

export { DatePicker, DateRangePicker };
