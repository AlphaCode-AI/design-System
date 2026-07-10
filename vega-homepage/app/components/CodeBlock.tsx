"use client";

import { useState } from "react";
import { cn, Check, Copy } from "@alphacode-ai/design-system";

interface CodeBlockProps {
  code?: string;
  children?: React.ReactNode;
  className?: string;
  label?: string;
  lang?: string;
  copyText?: string;
}

type Token = { type: "comment" | "tag" | "attr" | "string" | "brace" | "plain"; value: string };

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];

  if (/^\s*\/\//.test(line)) {
    return [{ type: "comment", value: line }];
  }

  let rest = line;

  while (rest.length > 0) {
    const tagMatch = rest.match(/^(<\/?[A-Za-z][A-Za-z0-9.]*|>|\/>)/);
    if (tagMatch) {
      tokens.push({ type: "tag", value: tagMatch[0] });
      rest = rest.slice(tagMatch[0].length);
      continue;
    }

    const attrMatch = rest.match(/^([a-zA-Z][a-zA-Z0-9-]*)(?==)/);
    if (attrMatch) {
      tokens.push({ type: "attr", value: attrMatch[0] });
      rest = rest.slice(attrMatch[0].length);
      continue;
    }

    const strMatch = rest.match(/^("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/);
    if (strMatch) {
      tokens.push({ type: "string", value: strMatch[0] });
      rest = rest.slice(strMatch[0].length);
      continue;
    }

    const braceMatch = rest.match(/^[{}]/);
    if (braceMatch) {
      tokens.push({ type: "brace", value: braceMatch[0] });
      rest = rest.slice(1);
      continue;
    }

    tokens.push({ type: "plain", value: rest[0] });
    rest = rest.slice(1);
  }

  return tokens;
}

const tokenColor: Record<Token["type"], string> = {
  comment: "#999999",
  tag:     "#e06c75",
  attr:    "#d19a66",
  string:  "#98c379",
  brace:   "#abb2bf",
  plain:   "#abb2bf",
};

export default function CodeBlock({ code, children, className, label, lang, copyText }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = copyText ?? code ?? "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasTopBar = lang || copyText;

  return (
    <div className="space-y-1.5">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div
        className={cn(
          "relative rounded-lg border border-[#333] bg-[#1e1e1e] font-mono text-sm leading-relaxed overflow-x-auto",
          hasTopBar ? "pt-9 px-5 pb-4" : "px-5 py-4",
          className
        )}
      >
        {lang && (
          <span className="absolute top-3 left-5 text-xs text-[#666]">{lang}</span>
        )}
        {copyText !== undefined && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded-md text-[#666] hover:text-[#aaa] hover:bg-white/10 transition-colors"
            aria-label="복사"
          >
            {copied
              ? <Check className="w-4 h-4 text-ac-green-50" />
              : <Copy className="w-4 h-4" />
            }
          </button>
        )}
        {code ? (
          <pre>
            {code.split("\n").map((line, i) => {
              const tokens = tokenize(line);
              return (
                <div key={i}>
                  {tokens.length > 0 ? (
                    tokens.map((tok, j) => (
                      <span key={j} style={{ color: tokenColor[tok.type] }}>
                        {tok.value}
                      </span>
                    ))
                  ) : (
                    <br />
                  )}
                </div>
              );
            })}
          </pre>
        ) : (
          <pre className="text-[#abb2bf]">{children}</pre>
        )}
      </div>
    </div>
  );
}
