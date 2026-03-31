# AlphaCode Design System Monorepo

AlphaCode Design System 모노레포입니다.

---

## Structure

```
designSystem/
├── alphaCode-designSystem/   # @alphacode-ai/design-system 패키지
└── vega-homepage/            # 디자인 시스템 문서 사이트
```

---

## Packages

| 패키지 | 설명 | 버전 |
|--------|------|------|
| [`@alphacode-ai/design-system`](./alphaCode-designSystem) | Tailwind preset, 디자인 토큰, UI 컴포넌트 | `0.3.0` |

---

## Getting Started (개발 환경)

디자인 시스템을 직접 수정하며 개발할 때 사용합니다.

### 의존성 설치

```bash
pnpm install
```

### 디자인 시스템 빌드

```bash
pnpm --filter @alphacode-ai/design-system build
```

### 문서 사이트 실행

```bash
cd vega-homepage
NPM_TOKEN=your_github_pat npm install
npm run dev
```

> vega-homepage는 pnpm workspace에서 분리되어 있어 별도로 설치합니다.
> 자세한 내용은 [`vega-homepage/README.md`](./vega-homepage/README.md)를 참고하세요.

---

## Publishing

```bash
cd alphaCode-designSystem

# 버전 업데이트
npm version patch   # 0.3.0 → 0.3.1
npm version minor   # 0.3.0 → 0.4.0

# 빌드
pnpm build

# GitHub Packages에 배포
NPM_TOKEN=your_github_pat npm publish --registry https://npm.pkg.github.com
```

> 자세한 내용은 [`alphaCode-designSystem/README.md`](./alphaCode-designSystem/README.md)를 참고하세요.
