"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Divider,
  Radio,
  Select,
  TextInput,
} from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";

/* ── 데이터 ─────────────────────────────────────────────────── */
const SAVED_ADDRESSES = [
  { id: "1", lastName: "홍", firstName: "길동", phone: "010-1234-5678", address: "서울특별시 강남구 테헤란로 123", detail: "○○빌딩 4층", zip: "06234", isDefault: true },
  { id: "2", lastName: "홍", firstName: "길동", phone: "010-9876-5432", address: "서울특별시 마포구 합정동 456", detail: "○○아파트 101동 302호", zip: "04087", isDefault: false },
  { id: "3", lastName: "홍", firstName: "길순", phone: "010-5555-1234", address: "경기도 성남시 분당구 판교로 235", detail: "△△타워 7층", zip: "13494", isDefault: false },
];

const ORDER_ITEMS = [
  { name: "VEGA UI Pro 라이선스", desc: "연간 구독 · 팀 플랜", price: 165000, originalPrice: null as number | null, badge: null as string | null, color: "bg-ac-primary-20" },
  { name: "디자인 토큰 패키지", desc: "1회 결제 · 확장 토큰", price: 30000, originalPrice: null as number | null, badge: null as string | null, color: "bg-ac-blue-20" },
  { name: "컴포넌트 라이브러리", desc: "전체 컴포넌트 · 업데이트 포함", price: 80000, originalPrice: 100000 as number | null, badge: "베스트셀러", color: "bg-ac-green-20" },
];

type PaymentId = "kakao" | "naver" | "toss" | "card" | "other";

const PAYMENT_METHODS: { id: PaymentId; label: string; badge?: string; icon?: React.ReactNode }[] = [
  {
    id: "kakao",
    label: "카카오페이",
    badge: "최대 즉시할인",
    icon: (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0" style={{ backgroundColor: "#FEE500" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#191919">
          <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.72 1.52 5.12 3.84 6.56L4.8 21l4.24-2.24c.96.24 1.92.4 2.96.4 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"/>
        </svg>
      </span>
    ),
  },
  {
    id: "naver",
    label: "네이버페이",
    icon: (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0" style={{ backgroundColor: "#03C75A" }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
          <path d="M16.27 12.97L7.5 1H1v22h7.73V11.03L17.5 23H24V1h-7.73z"/>
        </svg>
      </span>
    ),
  },
  {
    id: "toss",
    label: "토스페이",
    icon: (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0" style={{ backgroundColor: "#0064FF" }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
          <path d="M11.5 2C6.26 2 2 6.26 2 11.5S6.26 21 11.5 21 21 16.74 21 11.5 16.74 2 11.5 2zm3.5 7h-2v6h-2V9H9V7h6v2z"/>
        </svg>
      </span>
    ),
  },
  { id: "card", label: "카드 결제" },
  { id: "other", label: "다른 결제 방법" },
];

const CARD_COMPANIES = [
  { value: "samsung", label: "삼성카드" },
  { value: "hyundai", label: "현대카드" },
  { value: "lotte", label: "롯데카드" },
  { value: "kb", label: "KB국민카드" },
  { value: "shinhan", label: "신한카드" },
  { value: "woori", label: "우리카드" },
];

const MONTHS = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1).padStart(2, "0"), label: String(i + 1).padStart(2, "0") + "월" }));
const YEARS = Array.from({ length: 8 }, (_, i) => { const y = 2025 + i; return { value: String(y), label: String(y) }; });

const DELIVERY_NOTES = [
  { value: "door", label: "문 앞에 놓아주세요" },
  { value: "lobby", label: "경비실에 맡겨주세요" },
  { value: "contact", label: "배송 전 연락 바랍니다" },
  { value: "safe", label: "안전하게 보관해주세요" },
];

interface Coupon {
  id: string;
  name: string;
  discountType: "amount" | "percent";
  discount: number;
  maxDiscount?: number;
  minOrder: number;
  expiry: string;
}

const COUPONS: Coupon[] = [
  { id: "c1", name: "신규 가입 쿠폰", discountType: "amount", discount: 5000, minOrder: 0, expiry: "2026-07-31" },
  { id: "c2", name: "여름 시즌 10% 할인", discountType: "percent", discount: 10, maxDiscount: 15000, minOrder: 50000, expiry: "2026-08-15" },
  { id: "c3", name: "친구 추천 혜택", discountType: "amount", discount: 3000, minOrder: 0, expiry: "2026-09-30" },
];


const won = (n: number) => `₩${n.toLocaleString()}`;

/* ── Page ───────────────────────────────────────────────────── */
export default function PaymentTemplatePage() {
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0]);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [points, setPoints] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentId>("kakao");
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [tempCouponId, setTempCouponId] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "ADDRESS_SELECTED") {
        setSelectedAddress(e.data.address);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleOpenAddressPopup = () => {
    window.open(
      `/popup/address?selected=${selectedAddress.id}`,
      "address-popup",
      "width=500,height=700,scrollbars=no,resizable=no"
    );
  };

  const selectedCoupon = COUPONS.find((c) => c.id === selectedCouponId) ?? null;

  const subtotal = ORDER_ITEMS.reduce((sum, i) => sum + i.price, 0);
  const baseDiscount = 20000;
  const couponDiscount = selectedCoupon
    ? selectedCoupon.discountType === "amount"
      ? selectedCoupon.discount
      : Math.min(Math.floor(subtotal * selectedCoupon.discount / 100), selectedCoupon.maxDiscount ?? Infinity)
    : 0;
  const pointsUsed = Math.min(parseInt(points || "0") || 0, Math.floor(subtotal * 0.07));
  const total = subtotal - baseDiscount - couponDiscount - pointsUsed;
  const discountPct = Math.round(((baseDiscount + couponDiscount + pointsUsed) / subtotal) * 100);
  const savingsTotal = Math.floor(total * 0.01) + 3500;

  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
      <PageHeader
        title="주문서"
        description="TextInput, Select, Radio, Accordion, Dialog, Badge, Button을 조합한 결제 페이지입니다."
        border
      />

      <div className="flex gap-10 items-start">
        {/* ── 왼쪽 ─────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-8">

          {/* 배송지 */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground">배송지</h2>
                {selectedAddress.isDefault && <Badge variant="default" size="sm">기본 배송지</Badge>}
              </div>
              <Button
                variant="tertiary"
                size="sm"
                onClick={handleOpenAddressPopup}
              >
                배송지 변경
              </Button>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">{selectedAddress.lastName}{selectedAddress.firstName}</p>
              <p className="text-sm text-muted-foreground">{selectedAddress.address} {selectedAddress.detail}</p>
              <p className="text-sm text-muted-foreground">{selectedAddress.phone}</p>
            </div>
            <Select
              placeholder="배송 요청사항을 선택해주세요"
              options={DELIVERY_NOTES}
              value={deliveryNote}
              onValueChange={setDeliveryNote}
              size="md"
            />
          </section>

          <Divider />

          {/* 주문 상품 */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-foreground">주문 상품 {ORDER_ITEMS.length}개</h2>
            <div className="divide-y divide-border">
              {ORDER_ITEMS.map((item) => (
                <div key={item.name} className="flex gap-3 py-4">
                  <div className={`w-20 h-20 rounded-md shrink-0 ${item.color} flex items-center justify-center`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground opacity-40">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                    </svg>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground leading-none">{item.name}</p>
                        {item.badge && <Badge variant="success" size="sm" className="shrink-0">{item.badge}</Badge>}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    <div className="flex items-center gap-2">
                      {item.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">{won(item.originalPrice)}</span>
                      )}
                      <span className="text-sm font-bold text-foreground">{won(item.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* 장바구니 쿠폰 */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">할인/쿠폰</h2>
              <span className="text-xs text-muted-foreground">사용 가능 {COUPONS.length}장</span>
            </div>
            <button
              type="button"
              onClick={() => { setTempCouponId(selectedCouponId); setCouponDialogOpen(true); }}
              className="w-full flex items-center justify-between rounded-md border border-border bg-background px-3 h-9 text-sm hover:bg-ac-gray-10 transition-colors"
            >
              {selectedCoupon ? (
                <span className="text-foreground font-medium">
                  {selectedCoupon.name}
                  <span className="ml-2 text-ac-primary-50">
                    -{selectedCoupon.discountType === "amount"
                      ? won(selectedCoupon.discount)
                      : `${selectedCoupon.discount}%`}
                  </span>
                </span>
              ) : (
                <span className="text-muted-foreground">쿠폰을 선택해주세요</span>
              )}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground shrink-0">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </section>

          <Divider />

          {/* 보유 적립금 사용 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">보유 적립금 사용</h2>
            <TextInput
              placeholder="0"
              size="md"
              value={points}
              onChange={(e) => setPoints(e.target.value.replace(/\D/g, ""))}
              buttonLabel="사용 취소"
              buttonVariant="secondary"
              onButtonClick={() => setPoints("")}
            />
            <p className="text-xs text-muted-foreground">
              적용 한도(7%) {won(Math.floor(subtotal * 0.07))} / 보유 5,073원
            </p>
          </section>

          <Divider />

          {/* 결제 수단 */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-foreground">결제 수단</h2>

            <div className="rounded-lg border border-border overflow-hidden divide-y divide-border">
              {PAYMENT_METHODS.map((method) => (
                <div key={method.id}>
                  <label className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-ac-gray-10 transition-colors">
                    <Radio
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      size="lg"
                    />
                    {method.icon}
                    <span className="flex-1 text-sm font-medium text-foreground">{method.label}</span>
                    {method.badge && <Badge variant="warning" size="sm">{method.badge}</Badge>}
                  </label>

                  {method.id === "card" && paymentMethod === "card" && (
                    <div className="px-4 pb-5 pt-2 space-y-3 bg-ac-gray-10 border-t border-border">
                      <Select label="카드사" placeholder="카드사를 선택해주세요" options={CARD_COMPANIES} size="md" />
                      <TextInput label="카드 번호" placeholder="0000 0000 0000 0000" size="md" />
                      <div className="grid grid-cols-3 gap-3">
                        <Select label="유효 월" placeholder="MM" options={MONTHS} size="md" />
                        <Select label="유효 년" placeholder="YY" options={YEARS} size="md" />
                        <TextInput label="CVC" placeholder="123" size="md" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Accordion type="single" className="rounded-lg border border-border overflow-hidden divide-y divide-border">
              <AccordionItem value="benefit" className="border-0">
                <AccordionTrigger className="px-4 py-3 text-xs hover:bg-ac-gray-10 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground font-medium w-8 shrink-0">혜택</span>
                    <span className="text-foreground">삼성카드 첫 결제 시 3만원 즉시 할인</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-xs text-muted-foreground">
                  삼성카드로 첫 결제 시 3만원 즉시 할인 혜택이 자동 적용됩니다. 월 1회, 최대 1회 사용 가능합니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="guide" className="border-0 border-t border-border">
                <AccordionTrigger className="px-4 py-3 text-xs hover:bg-ac-gray-10 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground font-medium w-8 shrink-0">안내</span>
                    <span className="text-foreground">취소 및 환불 안내</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-xs text-muted-foreground">
                  결제 완료 후 7일 이내 취소 가능합니다. 디지털 콘텐츠는 다운로드 이후 환불이 불가합니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="installment" className="border-0 border-t border-border">
                <AccordionTrigger className="px-4 py-3 text-xs hover:bg-ac-gray-10 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground font-medium w-8 shrink-0">할부</span>
                    <span className="text-foreground">신용카드 무이자 할부 안내</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-xs text-muted-foreground">
                  5만원 이상 결제 시 2~3개월 무이자 할부가 가능합니다. 일부 카드사는 제외될 수 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* ── 오른쪽 ───────────────────────────────── */}
        <div className="w-72 shrink-0 sticky top-8 space-y-5">

          {/* 결제 금액 */}
          <div className="space-y-1">
            <p className="text-base font-bold text-foreground">결제 금액</p>
            <div className="space-y-2.5 mt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">상품 금액</span>
                <span className="text-foreground">{won(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">할인 금액</span>
                <span className="text-ac-primary-50">-{won(baseDiscount)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">할인/쿠폰</span>
                  <span className="text-ac-primary-50">-{won(couponDiscount)}</span>
                </div>
              )}
              {pointsUsed > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">적립금 사용</span>
                  <span className="text-ac-primary-50">-{won(pointsUsed)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">배송비</span>
                <span className="text-ac-blue-50 font-medium">무료배송</span>
              </div>
              <div className="flex justify-between items-baseline font-bold text-sm pt-2.5">
                <span className="text-foreground">총 결제 금액</span>
                <div className="text-right">
                  <span className="text-ac-primary-50 text-xs mr-1">{discountPct}%</span>
                  <span className="text-foreground text-base">{won(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* 적립 혜택 */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-foreground">적립 혜택</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">1% 기본 적립</span>
                <span className="text-foreground">{won(Math.floor(total * 0.01))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">후기 적립</span>
                <span className="text-foreground">최대 3,500원</span>
              </div>
              <div className="flex justify-between font-bold pt-2 text-sm">
                <span className="text-foreground">총 적립 금액</span>
                <span className="text-foreground">{won(savingsTotal)}</span>
              </div>
            </div>
          </div>

          <Divider />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">이번 주문으로 받을 혜택</span>
            <span className="font-bold text-ac-primary-50">{won(savingsTotal + baseDiscount + couponDiscount)}</span>
          </div>

          <Divider />

          {/* 동의 */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>주문 내용을 확인했으며 결제에 동의합니다.</span>
              <button className="text-foreground hover:underline shrink-0 ml-2">자세히</button>
            </div>
            <div className="flex items-center justify-between">
              <span>회원님의 개인정보는 안전하게 관리됩니다.</span>
              <button className="text-foreground hover:underline shrink-0 ml-2">자세히</button>
            </div>
          </div>

          {/* 결제 버튼 */}
          <div className="space-y-2">
            <Button variant="primary" className="w-full">
              <span className="line-through mr-2 opacity-60 font-normal text-xs">{won(subtotal)}</span>
              {won(total)} 결제하기
            </Button>
          </div>
        </div>
      </div>

      {/* 쿠폰 선택 다이얼로그 */}
      <Dialog open={couponDialogOpen} onOpenChange={setCouponDialogOpen} size="sm">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>할인/쿠폰</DialogTitle>
          </DialogHeader>
          <DialogBody className="space-y-2">
            {/* 미사용 옵션 */}
            <label
              className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors"
              style={{ borderColor: tempCouponId === null ? "var(--ac-primary-50)" : "var(--border)" }}
              onClick={() => setTempCouponId(null)}
            >
              <Radio
                name="coupon"
                value=""
                checked={tempCouponId === null}
                onChange={() => setTempCouponId(null)}
                size="lg"
              />
              <p className="text-sm text-muted-foreground pt-0.5">쿠폰 미사용</p>
            </label>

            {COUPONS.map((c) => (
              <label
                key={c.id}
                className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors"
                style={{ borderColor: tempCouponId === c.id ? "var(--ac-primary-50)" : "var(--border)" }}
                onClick={() => setTempCouponId(c.id)}
              >
                <Radio
                  name="coupon"
                  value={c.id}
                  checked={tempCouponId === c.id}
                  onChange={() => setTempCouponId(c.id)}
                  size="lg"
                />
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs font-bold text-ac-primary-50">
                    {c.discountType === "amount" ? won(c.discount) + " 할인" : `${c.discount}% 할인`}
                    {c.maxDiscount && ` (최대 ${won(c.maxDiscount)})`}
                  </p>
                  {c.minOrder > 0 && (
                    <p className="text-xs text-muted-foreground">{won(c.minOrder)} 이상 구매 시 사용 가능</p>
                  )}
                  <p className="text-xs text-muted-foreground">만료일: {c.expiry}</p>
                </div>
              </label>
            ))}
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="tertiary" size="md">취소</Button>
            </DialogClose>
            <Button
              variant="primary"
              size="md"
              onClick={() => { setSelectedCouponId(tempCouponId); setCouponDialogOpen(false); }}
            >
              적용하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
