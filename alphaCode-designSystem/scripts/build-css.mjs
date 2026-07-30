// 컴포넌트가 사용하는 Tailwind 유틸리티 클래스를 미리 컴파일해
// dist/styles.css 뒤에 붙인다. 배경은 src/build-entry.css 주석 참고.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const entryPath = path.join(rootDir, "src/build-entry.css");
const stylesDistPath = path.join(rootDir, "dist/styles.css");

const entryCss = readFileSync(entryPath, "utf8");

const result = await postcss([tailwindcss()]).process(entryCss, {
  from: entryPath,
});

const existing = readFileSync(stylesDistPath, "utf8");
writeFileSync(
  stylesDistPath,
  `${existing}\n/* ── 컴포넌트 유틸리티 클래스 (빌드 시 사전 컴파일, scripts/build-css.mjs) ── */\n${result.css}\n`
);

console.log(
  `[build-css] compiled component utilities into dist/styles.css (${result.css.length} bytes)`
);
