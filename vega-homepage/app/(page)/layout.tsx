export default function SubPageLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex w-full">
        {/* 페이지 콘텐츠 */}
        <article className="flex-1 min-w-0">
          {children}
        </article>
      </div>
    );
  }