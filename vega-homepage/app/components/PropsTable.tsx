import { cn } from "@alphacode-ai/design-system";
import React from "react";

interface PropsTableProps {
  headers?: string[];
  rows: string[][];
  cols?: string;
}

export default function PropsTable({
  headers = ["Prop", "Type", "Default", "Description"],
  rows,
  cols = "1fr 1.5fr 1fr 2fr",
}: PropsTableProps) {
  return (
    <div className="overflow-x-auto">
      <div
        style={{ display: "grid", gridTemplateColumns: cols, minWidth: "460px" }}
        className="border border-border rounded-lg overflow-hidden text-sm"
      >
        {headers.map((h) => (
          <div key={h} className="px-3 py-2 bg-ac-gray-10 font-semibold text-foreground border-b border-border">{h}</div>
        ))}
        {rows.map(([prop, type, def, desc], i, arr) => (
          <React.Fragment key={i}>
            <div className={cn("px-3 py-2 font-mono text-xs text-ac-primary-50", i < arr.length - 1 && "border-b border-border")}>{prop}</div>
            <div className={cn("px-3 py-2 font-mono text-xs text-foreground",    i < arr.length - 1 && "border-b border-border")}>{type}</div>
            <div className={cn("px-3 py-2 font-mono text-xs text-foreground",    i < arr.length - 1 && "border-b border-border")}>{def}</div>
            <div className={cn("px-3 py-2 text-xs text-foreground",              i < arr.length - 1 && "border-b border-border")}>{desc}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
