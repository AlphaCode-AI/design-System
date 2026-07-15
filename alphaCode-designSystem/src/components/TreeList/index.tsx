"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

export interface TreeListItemData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeListItemData[];
  isExpanded?: boolean;
}

export type TreeListDensity = "compact" | "balanced" | "spacious";

export interface TreeListProps {
  items: TreeListItemData[];
  density?: TreeListDensity;
  header?: React.ReactNode;
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

const DENSITY_MAP: Record<TreeListDensity, string> = {
  compact:  "py-0.5",
  balanced: "py-1",
  spacious: "py-1.5",
};

function hasDescendant(items: TreeListItemData[], targetId: string): boolean {
  for (const item of items) {
    if (item.id === targetId) return true;
    if (item.children && hasDescendant(item.children, targetId)) return true;
  }
  return false;
}

interface TreeNodeProps {
  node: TreeListItemData;
  depth: number;
  density: TreeListDensity;
  selectedId?: string;
  onSelect?: (id: string) => void;
  hoveredId?: string;
  onHover: (id: string) => void;
}

function TreeNode({ node, depth, density, selectedId, onSelect, hoveredId, onHover }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(node.isExpanded ?? false);
  const hasChildren = !!node.children?.length;
  const isSelected = selectedId === node.id;
  const isHovered = hoveredId === node.id;

  // indent 16px, line은 +12 위치로 4px gap 확보
  const buttonMargin = 8 + depth * 16;
  const lineLeft = buttonMargin + 12;

  const handleClick = () => {
    if (hasChildren) setExpanded((prev) => !prev);
    onSelect?.(node.id);
  };

  const hoveredInSubtree =
    hoveredId != null &&
    (node.id === hoveredId || (!!node.children && hasDescendant(node.children, hoveredId)));
  const directChildSelected =
    selectedId != null && !!node.children?.some((c) => c.id === selectedId);

  const lineClass = directChildSelected
    ? "bg-ac-gray-50"
    : hoveredInSubtree
    ? "bg-ac-gray-30"
    : "bg-transparent";

  return (
    <li>
      <button
        onClick={handleClick}
        onMouseEnter={() => onHover(node.id)}
        className={cn(
          "w-full flex items-center gap-1.5 px-2 text-sm text-left rounded-md transition-colors",
          DENSITY_MAP[density],
          isSelected
            ? "bg-ac-gray-30 text-foreground font-medium"
            : isHovered
            ? "bg-ac-gray-20 text-foreground"
            : "text-foreground"
        )}
        style={{ marginLeft: `${buttonMargin}px`, width: `calc(100% - ${buttonMargin}px)` }}
      >
          {hasChildren ? (
            <ChevronRight
              size={14}
              className={cn(
                "shrink-0 text-muted-foreground transition-transform duration-150",
                expanded && "rotate-90"
              )}
            />
          ) : (
            <span className="w-3.5 shrink-0" />
          )}
          {node.icon && (
            <span className="shrink-0 text-muted-foreground">{node.icon}</span>
          )}
          <span className="truncate">{node.label}</span>
      </button>

      {/* 하위 목록 + 세로선 */}
      {hasChildren && expanded && (
        <div className="relative">
          <ul>
            {node.children!.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                density={density}
                selectedId={selectedId}
                onSelect={onSelect}
                hoveredId={hoveredId}
                onHover={onHover}
              />
            ))}
          </ul>
          {/* 세로선 — 여백 영역에만 위치, 버튼과 분리 */}
          <div
            className={cn(
              "absolute top-0 bottom-0 w-px pointer-events-none transition-colors duration-150",
              lineClass
            )}
            style={{ left: `${lineLeft}px` }}
          />
        </div>
      )}
    </li>
  );
}

export function TreeList({
  items,
  density = "balanced",
  header,
  selectedId,
  onSelect,
  className,
}: TreeListProps) {
  const [hoveredId, setHoveredId] = useState<string | undefined>();

  return (
    <div
      className={cn("select-none", className)}
      onMouseLeave={() => setHoveredId(undefined)}
    >
      {header && (
        <div className="px-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {header}
        </div>
      )}
      <ul>
        {items.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            density={density}
            selectedId={selectedId}
            onSelect={onSelect}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </ul>
    </div>
  );
}
