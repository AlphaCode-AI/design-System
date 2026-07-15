"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  CheckCircle2,
  Divider,
  FileText,
  Image,
  ProgressIndicator,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Upload,
  X,
} from "@alphacode-ai/design-system";
import PageHeader from "@/app/components/PageHeader";

type UploadStatus = "pending" | "uploading" | "done" | "error";

interface UploadFile {
  id: string;
  name: string;
  size: string;
  type: "image" | "doc";
  progress: number;
  status: UploadStatus;
}

const INITIAL_FILES: UploadFile[] = [
  { id: "1", name: "hero_banner.png",       size: "2.4 MB", type: "image", progress: 0, status: "pending" },
  { id: "2", name: "design_guide.pdf",      size: "5.1 MB", type: "doc",   progress: 0, status: "pending" },
  { id: "3", name: "product_shot.jpg",      size: "1.8 MB", type: "image", progress: 0, status: "pending" },
  { id: "4", name: "brand_assets.zip",      size: "12.3 MB", type: "doc",  progress: 0, status: "pending" },
];

const STATUS_CONFIG: Record<UploadStatus, { label: string; variant: "success" | "warning" | "default" | "fail" }> = {
  pending:   { label: "대기 중",   variant: "default" },
  uploading: { label: "업로드 중", variant: "warning" },
  done:      { label: "완료",      variant: "success" },
  error:     { label: "오류",      variant: "fail" },
};

export default function UploadProgressTemplatePage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [files, setFiles] = useState<UploadFile[]>(INITIAL_FILES);
  const [uploading, setUploading] = useState(false);

  const bootLoad = useCallback(() => {
    setPageLoading(true);
setFiles(INITIAL_FILES.map((f) => ({ ...f, progress: 0, status: "pending" })));
    setUploading(false);

    setTimeout(() => setPageLoading(false), 2000);
  }, []);

  useEffect(() => { bootLoad(); }, [bootLoad]);

  const startUpload = () => {
    if (uploading) return;
    setUploading(true);
    setFiles((prev) => prev.map((f) => ({ ...f, status: "uploading" as UploadStatus })));

    const intervals: ReturnType<typeof setInterval>[] = [];

    INITIAL_FILES.forEach((_, i) => {
      const speed = 3 + i * 1.2;
      let progress = 0;

      const timer = setInterval(() => {
        progress += Math.random() * speed + 1;
        if (progress >= 100) {
          clearInterval(timer);
          setFiles((prev) =>
            prev.map((f, idx) =>
              idx === i ? { ...f, progress: 100, status: "done" } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f, idx) =>
              idx === i ? { ...f, progress: Math.min(progress, 99) } : f
            )
          );
        }
      }, 120);

      intervals.push(timer);
    });
  };

  const resetUpload = () => {
    setFiles(INITIAL_FILES.map((f) => ({ ...f, progress: 0, status: "pending" })));
    setUploading(false);
  };

  const doneCount = files.filter((f) => f.status === "done").length;
  const allDone = doneCount === files.length;
  const totalProgress = Math.round(files.reduce((s, f) => s + f.progress, 0) / files.length);

  if (pageLoading) {
    return (
      <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
        <PageHeader
          title="업로드 진행"
          description="ProgressIndicator(circular)를 활용한 페이지 로딩 및 파일 업로드 진행 예시입니다."
          border
        />
        <div className="rounded-xl border border-border bg-card h-[480px] flex flex-col items-center justify-center gap-6">
          <ProgressIndicator
            type="circular"
            circularSize="xl"
            indeterminate
          />
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-foreground">페이지 로딩 중...</p>
            <p className="text-xs text-muted-foreground">리소스를 불러오고 있습니다</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 px-4 py-8 md:px-10 md:py-10 max-w-[900px] mx-auto">
      <PageHeader
        title="업로드 진행"
        description="ProgressIndicator(circular)를 활용한 페이지 로딩 및 파일 업로드 진행 예시입니다."
        border
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">

        {/* 헤더 */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-ac-primary-10 flex items-center justify-center">
              <Upload size={16} className="text-ac-primary-50" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">파일 업로드</p>
              <p className="text-xs text-muted-foreground">{files.length}개 파일 · 총 21.6 MB</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="tertiary" size="sm" onClick={bootLoad}>
              <RefreshCw size={14} />
              새로고침
            </Button>
            {uploading && !allDone && (
              <Button variant="secondary" size="sm" onClick={resetUpload}>
                <X size={14} />
                취소
              </Button>
            )}
            {allDone && (
              <Button variant="tertiary" size="sm" onClick={resetUpload}>
                <RotateCcw size={14} />
                다시 시도
              </Button>
            )}
            {!uploading && (
              <Button variant="primary" size="sm" onClick={startUpload}>
                <Upload size={14} />
                업로드 시작
              </Button>
            )}
          </div>
        </div>

        {/* 전체 진행률 */}
        {uploading && (
          <div className="px-6 py-4 bg-ac-gray-10 border-b border-border flex items-center gap-4">
            <ProgressIndicator
              type="circular"
              value={totalProgress}
              circularSize="md"
              showValue
              color={allDone ? "ac-green-50" : undefined}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                {allDone ? "모든 파일 업로드 완료" : `${doneCount} / ${files.length}개 완료`}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {allDone ? "파일이 성공적으로 업로드됐습니다." : "업로드가 진행 중입니다..."}
              </p>
            </div>
            {allDone && <CheckCircle2 size={20} className="text-ac-green-50 shrink-0" />}
          </div>
        )}

        {/* 파일 목록 */}
        <div className="divide-y divide-border">
          {files.map((file) => {
            const status = STATUS_CONFIG[file.status];
            return (
              <div key={file.id} className="px-6 py-4 flex items-center gap-4">
                <Avatar
                  size="sm"
                  fallback={file.type === "image" ? "IMG" : "DOC"}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <Badge variant={status.variant} size="sm">{status.label}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
                <ProgressIndicator
                  type="circular"
                  value={file.progress}
                  circularSize="sm"
                  showValue={file.status === "uploading"}
                  color={file.status === "done" ? "ac-green-50" : undefined}
                  indeterminate={false}
                />
              </div>
            );
          })}
        </div>

        <Divider />

        {/* 하단 유저 정보 */}
        <div className="px-6 py-4 flex items-center gap-3">
          <Avatar size="sm" fallback="홍" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground">홍길동</p>
            <p className="text-xs text-muted-foreground">업로드 위치: /프로젝트/에셋</p>
          </div>
          <Sparkles size={14} className="text-muted-foreground" />
          <p className="text-xs text-muted-foreground">자동 정리 켜짐</p>
        </div>

      </div>
    </div>
  );
}
