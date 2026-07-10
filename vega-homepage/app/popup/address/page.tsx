"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { Badge, Button, Radio, Select, TextInput } from "@alphacode-ai/design-system";

declare global {
  interface Window {
    daum: {
      Postcode: new (opts: {
        oncomplete: (d: { roadAddress: string; zonecode: string }) => void;
      }) => { open: () => void };
    };
  }
}

type Address = {
  id: string;
  lastName: string;
  firstName: string;
  phone: string;
  address: string;
  detail: string;
  zip: string;
  isDefault: boolean;
};

const INITIAL_ADDRESSES: Address[] = [
  { id: "1", lastName: "홍", firstName: "길동", phone: "010-1234-5678", address: "서울특별시 강남구 테헤란로 123", detail: "○○빌딩 4층", zip: "06234", isDefault: true },
  { id: "2", lastName: "홍", firstName: "길동", phone: "010-9876-5432", address: "서울특별시 마포구 합정동 456", detail: "○○아파트 101동 302호", zip: "04087", isDefault: false },
  { id: "3", lastName: "홍", firstName: "길순", phone: "010-5555-1234", address: "경기도 성남시 분당구 판교로 235", detail: "△△타워 7층", zip: "13494", isDefault: false },
];

const DELIVERY_NOTES = [
  { value: "door", label: "문 앞에 놓아주세요" },
  { value: "lobby", label: "경비실에 맡겨주세요" },
  { value: "contact", label: "배송 전 연락 바랍니다" },
  { value: "safe", label: "안전하게 보관해주세요" },
];

const EMPTY_FORM = { name: "", phone: "", zip: "", address: "", detail: "", note: "", isDefault: false };

/* ── 아이콘 ─────────────────────────────────────────────────── */
function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function AddressPopupPage() {
  const [view, setView] = useState<"list" | "form">("list");
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState("1");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("selected");
    if (id) setSelectedId(id);
  }, []);

  const filteredAddresses = addresses.filter((a) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      (a.lastName + a.firstName).includes(q) ||
      a.address.toLowerCase().includes(q) ||
      a.phone.includes(q)
    );
  });

  const handleConfirm = () => {
    const selected = addresses.find((a) => a.id === selectedId) ?? addresses[0];
    window.opener?.postMessage({ type: "ADDRESS_SELECTED", address: selected }, "*");
    window.close();
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setView("form");
  };

  const handleOpenEdit = (a: Address) => {
    setEditingId(a.id);
    setForm({ name: a.lastName + a.firstName, phone: a.phone, zip: a.zip, address: a.address, detail: a.detail, note: "", isDefault: a.isDefault });
    setView("form");
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedId === id) {
      const next = addresses.find((a) => a.id !== id);
      if (next) setSelectedId(next.id);
    }
  };

  const handleSave = () => {
    const lastName = form.name.slice(0, 1);
    const firstName = form.name.slice(1);
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, lastName, firstName, phone: form.phone, zip: form.zip, address: form.address, detail: form.detail, isDefault: form.isDefault }
            : form.isDefault ? { ...a, isDefault: false } : a
        )
      );
    } else {
      const newId = String(Date.now());
      setAddresses((prev) => [
        ...prev.map((a) => (form.isDefault ? { ...a, isDefault: false } : a)),
        { id: newId, lastName, firstName, phone: form.phone, zip: form.zip, address: form.address, detail: form.detail, isDefault: form.isDefault },
      ]);
      setSelectedId(newId);
    }
    setView("list");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 7) formatted = digits.slice(0, 3) + "-" + digits.slice(3, 7) + "-" + digits.slice(7);
    else if (digits.length > 3) formatted = digits.slice(0, 3) + "-" + digits.slice(3);
    setForm((f) => ({ ...f, phone: formatted }));
  };

  const handleAddressSearch = () => {
    if (!window.daum) return;
    new window.daum.Postcode({
      oncomplete: (data) => {
        setForm((f) => ({ ...f, zip: data.zonecode, address: data.roadAddress }));
      },
    }).open();
  };

  return (
    <div className="flex flex-col h-screen">
      {view === "list" ? (
        <>
          <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0">
            <h1 className="text-base font-bold text-foreground">배송지 정보</h1>
            <button
              onClick={() => window.close()}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <XIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <TextInput
              placeholder="배송지 이름, 주소, 연락처로 검색하세요"
              size="md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suffix={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              }
            />
            <Button variant="tertiary" className="w-full" onClick={handleOpenAdd}>
              배송지 추가하기
            </Button>

            <div className="divide-y divide-border">
              {filteredAddresses.map((a) => (
                <div key={a.id} className="py-4">
                  <label
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setSelectedId(a.id)}
                  >
                    <Radio
                      name="address"
                      value={a.id}
                      checked={selectedId === a.id}
                      onChange={() => setSelectedId(a.id)}
                      size="lg"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-semibold text-foreground">{a.lastName}{a.firstName}</p>
                        {a.isDefault && <Badge variant="default" size="sm">기본 배송지</Badge>}
                        {a.id === addresses[0]?.id && <Badge variant="default" size="sm">최근 사용</Badge>}
                      </div>
                      <p className="text-sm text-foreground">{a.address} {a.detail}</p>
                      <p className="text-sm text-muted-foreground">{a.phone}</p>
                      <div
                        className="flex gap-2 mt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="tertiary" size="sm" onClick={() => handleOpenEdit(a)}>수정</Button>
                        {!a.isDefault && (
                          <Button variant="tertiary" size="sm" onClick={() => handleDelete(a.id)}>삭제</Button>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
              {filteredAddresses.length === 0 && (
                <p className="py-10 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</p>
              )}
            </div>
          </div>

          <div className="px-5 py-4 border-t border-border shrink-0">
            <Button variant="primary" className="w-full" onClick={handleConfirm}>
              변경하기
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 px-5 h-14 border-b border-border shrink-0">
            <button
              onClick={() => setView("list")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft />
            </button>
            <h1 className="text-base font-bold text-foreground">
              {editingId ? "배송지 수정" : "배송지 추가"}
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            <TextInput
              label="이름"
              placeholder="받는 분의 이름을 입력해주세요"
              size="md"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <TextInput
              label="휴대폰번호"
              placeholder="휴대폰번호를 입력해주세요."
              size="md"
              value={form.phone}
              onChange={handlePhoneChange}
              inputMode="numeric"
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">주소</p>
              <TextInput
                placeholder="우편번호"
                size="md"
                value={form.zip}
                readOnly
                onChange={() => {}}
                buttonLabel="주소 찾기"
                buttonVariant="primary"
                onButtonClick={handleAddressSearch}
              />
              <TextInput
                placeholder="주소"
                size="md"
                value={form.address}
                readOnly
                onChange={() => {}}
              />
              <TextInput
                placeholder="상세주소"
                size="md"
                value={form.detail}
                onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
              />
            </div>
            <Select
              label="배송 요청사항 (선택)"
              placeholder="배송 요청사항을 선택해주세요"
              options={DELIVERY_NOTES}
              value={form.note}
              onValueChange={(v) => setForm((f) => ({ ...f, note: v }))}
              size="md"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                className="w-4 h-4 cursor-pointer rounded border-border accent-foreground"
              />
              <span className="text-sm text-foreground">기본 배송지로 설정</span>
            </label>
          </div>

          <div className="px-5 py-4 border-t border-border shrink-0">
            <Button variant="primary" className="w-full" onClick={handleSave}>
              저장하기
            </Button>
          </div>
        </>
      )}

      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
    </div>
  );
}
