interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  border?: boolean;
}

export default function PageHeader({ title, description, action, border }: PageHeaderProps) {
  return (
    <div className={`mb-8 flex flex-col md:flex-row justify-between items-end gap-4 ${border ? "border-b border-border pb-8 mb-12" : ""}`}>
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-foreground leading-relaxed">{description}</p>
      </div>
      {action}
    </div>
  );
}
