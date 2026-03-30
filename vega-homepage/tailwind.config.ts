import type { Config } from "tailwindcss";
// 모노레포로 연결된 디자인 시스템 패키지에서 preset을 불러옵니다.
import preset from "@alphacode-ai/design-system/tailwind-preset";

const config: Config = {
  // 👇 디자인 시스템의 모든 색상, 폰트, 여백 스펙을 그대로 물려받습니다.
  presets: [preset], 
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "../alphaCode-designSystem/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;