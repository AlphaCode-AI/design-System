"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Carousel,
  CarouselContent,
  CarouselCounter,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Divider,
  Minus,
  Plus,
  Select,
  ShoppingCart,
  Star,
  Truck,
  X,
  RotateCcw,
  Shield,
} from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";

const IMAGES = [
  { bg: "bg-ac-primary-20",  label: "메인 이미지" },
  { bg: "bg-ac-blue-20",     label: "착용 이미지" },
  { bg: "bg-ac-green-20",    label: "디테일 이미지" },
  { bg: "bg-ac-orange-20",   label: "후면 이미지" },
];

const COLOR_OPTIONS = [
  { value: "black", label: "블랙" },
  { value: "white", label: "화이트" },
  { value: "navy",  label: "네이비" },
];

const SIZE_OPTIONS: Record<string, { value: string; label: string }[]> = {
  black: [
    { value: "XS", label: "XS" },
    { value: "S",  label: "S" },
    { value: "M",  label: "M" },
    { value: "L",  label: "L" },
    { value: "XL", label: "XL" },
  ],
  white: [
    { value: "M",  label: "M" },
    { value: "L",  label: "L" },
    { value: "XL", label: "XL" },
  ],
  navy: [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ],
};

const REVIEWS = [
  { name: "김**", rating: 5, comment: "착용감이 정말 좋아요. 사이즈도 딱 맞고 재질도 기대 이상입니다.", date: "2026.06.12" },
  { name: "이**", rating: 4, comment: "색감이 사진보다 더 예쁩니다. 배송도 빠르고 만족합니다.",       date: "2026.06.05" },
];

export default function ProductDetailTemplatePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize,  setSelectedSize]  = useState("");
  const [items, setItems] = useState<{ id: string; label: string; qty: number }[]>([]);

  const originalPrice = 128000;
  const discountRate  = 25;
  const salePrice     = Math.round(originalPrice * (1 - discountRate / 100) / 100) * 100;

  const totalQty   = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.qty * salePrice, 0);

  const handleSizeSelect = (size: string) => {
    if (!size) return;
    const colorLabel = COLOR_OPTIONS.find((c) => c.value === selectedColor)?.label ?? selectedColor;
    const id    = `${selectedColor}-${size}`;
    const label = `${colorLabel} / ${size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, label, qty: 1 }];
    });
    setSelectedColor("");
    setSelectedSize("");
  };

  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
      <PageHeader
        title="상품 상세"
        description="Carousel, Badge, ToggleGroup, Button, Tooltip을 조합한 상품 상세 페이지입니다."
        border
      />

      <div className="flex gap-8 items-start">

        {/* ── 왼쪽: 이미지 캐러셀 ───────────────── */}
        <div className="w-[360px] shrink-0 space-y-3">
          <Carousel loop index={carouselIndex} onIndexChange={setCarouselIndex}>
            <CarouselContent className="rounded-xl overflow-hidden">
              {IMAGES.map((img) => (
                <CarouselItem key={img.label}>
                  <div className={`${img.bg} w-full aspect-square flex items-center justify-center`}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground opacity-20">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* 이전/다음 버튼 */}
            <div className="absolute inset-y-0 left-2 flex items-center">
              <CarouselPrevious navStyle="border" />
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center">
              <CarouselNext navStyle="border" />
            </div>

            {/* 카운터 */}
            <div className="absolute top-3 right-3">
              <CarouselCounter className="bg-card/90 backdrop-blur-sm text-xs px-2 py-0.5 rounded-md" />
            </div>

          </Carousel>

          {/* 썸네일 스트립 */}
          <div className="flex gap-2">
            {IMAGES.map((img, i) => (
              <button
                key={img.label}
                onClick={() => setCarouselIndex(i)}
                className={`flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  carouselIndex === i ? "border-ac-primary-50" : "border-border"
                }`}
              >
                <div className={`${img.bg} w-full h-full flex items-center justify-center`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground opacity-30">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* ── 오른쪽: 상품 정보 ────────────────── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* 배지 + 브랜드 */}
          <div className="flex items-center gap-2">
            <Badge variant="fail" size="sm">{discountRate}% OFF</Badge>
            <Badge variant="primary" size="sm">NEW</Badge>
            <span className="text-xs text-muted-foreground ml-auto">ALPHACODE</span>
          </div>

          {/* 상품명 */}
          <div>
            <h1 className="text-lg font-bold text-foreground leading-snug">
              AlphaCode 클래식 오버핏 티셔츠
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Premium Cotton · Relaxed Fit</p>
          </div>

          {/* 별점 */}
          <div className="flex items-center gap-1.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={14} className={s <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">4.0 (리뷰 128개)</span>
          </div>

          {/* 가격 */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{salePrice.toLocaleString()}원</span>
            <span className="text-sm text-muted-foreground line-through">{originalPrice.toLocaleString()}원</span>
            <span className="text-sm font-bold text-ac-primary-50">{discountRate}%</span>
          </div>

          <Divider />

          {/* 옵션 선택 */}
          <div className="space-y-3">
            <Select
              label="색상"
              placeholder="색상을 선택해주세요"
              options={COLOR_OPTIONS}
              value={selectedColor}
              onValueChange={(v) => { setSelectedColor(v); setSelectedSize(""); }}
              size="md"
            />
            <Select
              label="사이즈"
              placeholder={selectedColor ? "사이즈를 선택해주세요" : "색상을 먼저 선택해주세요"}
              options={selectedColor ? SIZE_OPTIONS[selectedColor] : []}
              value={selectedSize}
              onValueChange={handleSizeSelect}
              size="md"
              disabled={!selectedColor}
            />
          </div>

          {/* 선택 항목 */}
          {items.length > 0 && (
            <div className="rounded-lg border border-border overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="px-4 py-3 border-b border-border last:border-b-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <button
                      onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-md">
                      <button
                        onClick={() => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}
                        className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-medium text-foreground">{item.qty}</span>
                      <button
                        onClick={() => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))}
                        className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {(salePrice * item.qty).toLocaleString()}원
                    </span>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 bg-ac-gray-10 flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">총 {totalQty}개</span>
                <div className="text-right space-y-0.5">
                  <p className="text-xs text-muted-foreground">
                    총 금액 <span className="font-medium text-foreground">{(originalPrice * totalQty).toLocaleString()}원</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    나의 할인가 <span className="font-bold text-ac-primary-50">{totalPrice.toLocaleString()}원</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 구매 버튼 */}
          <div className="flex gap-2 pt-1">
            <Button variant="tertiary" size="md" className="flex-1" disabled={items.length === 0}>
              <ShoppingCart size={16} />
              장바구니
            </Button>
            <Button variant="primary" size="md" className="flex-1" disabled={items.length === 0}>
              {items.length > 0 ? `${totalPrice.toLocaleString()}원 구매` : "옵션을 선택해주세요"}
            </Button>
          </div>

          <Divider />

          {/* 배송/혜택 정보 */}
          <div className="space-y-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck size={13} className="shrink-0" />
              <span>3만원 이상 무료배송 · 오늘 주문 시 내일 도착</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={13} className="shrink-0" />
              <span>수령 후 7일 이내 무료 교환/반품</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={13} className="shrink-0" />
              <span>정품 보증 · AlphaCode 공식 스토어</span>
            </div>
          </div>

          <Divider />

          {/* 최신 리뷰 */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">최신 리뷰</p>
            {REVIEWS.map((r) => (
              <div key={r.name} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={11} className={s <= r.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"} />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-foreground">{r.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{r.date}</span>
                </div>
                <p className="text-xs text-muted-foreground">{r.comment}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
