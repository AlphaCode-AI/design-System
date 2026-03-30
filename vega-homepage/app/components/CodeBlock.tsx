"use client";

import { cn } from "@alphacode-ai/design-system";

interface CodeBlockProps {
  code?: string;
  children?: React.ReactNode;
  className?: string;
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

export default function CodeBlock({ code, children, className }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-ac-gray-80 bg-ac-gray-90 px-5 py-4 font-mono text-sm leading-relaxed overflow-x-auto",
        className
      )}
    >
      {code ? (
        <pre>
        {code.split("\n").map((line, i) => {
          // 1. 현재 줄을 토큰화합니다.
          const tokens = tokenize(line);
          
          return (
            <div key={i}>
              {/* 2. 토큰이 있다면(내용이 있다면) 기존처럼 렌더링하고, 
                     없다면(빈 줄이라면) <br />을 넣어 높이를 유지합니다. */}
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
        <pre className="text-ac-gray-20">{children}</pre>
      )}
    </div>
  );
}