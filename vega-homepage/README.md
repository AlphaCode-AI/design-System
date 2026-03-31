# Vega Homepage

AlphaCode Design System 문서 사이트입니다.

> **조직 내부 전용입니다.** `@alphacode-ai/design-system` 패키지가 GitHub Packages (private)에 배포되어 있으므로, AlphaCode-AI 조직 멤버의 GitHub PAT가 있어야 설치할 수 있습니다.

---

## 로컬 실행 방법

### 1. 레포 클론

전체 레포 클론:

```bash
git clone https://github.com/AlphaCode-AI/design-System.git
cd design-System/vega-homepage
```

또는 vega-homepage 폴더만 sparse checkout:

```bash
git clone --filter=blob:none --sparse https://github.com/AlphaCode-AI/design-System.git
cd design-System
git sparse-checkout set vega-homepage
cd vega-homepage
```

### 2. NPM_TOKEN 설정

`@alphacode-ai/design-system` 패키지 설치에 GitHub PAT가 필요합니다.

```bash
export NPM_TOKEN=your_github_pat
```

> PAT 발급: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
> 필요 스코프: `read:packages`

### 3. 의존성 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |

---

## 관련 링크

- [`@alphacode-ai/design-system`](../alphaCode-designSystem) — UI 컴포넌트 라이브러리
- [GitHub Packages](https://github.com/orgs/AlphaCode-AI/packages) — 패키지 레지스트리
