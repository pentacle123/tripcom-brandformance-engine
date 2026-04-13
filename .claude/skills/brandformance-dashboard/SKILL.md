---
name: brandformance-dashboard
description: "수집된 브랜드포먼스 데이터를 Next.js App Router의 단일 page.js 인라인 스타일 대시보드로 변환하는 가이드. 대시보드 생성, UI 업데이트, 시각화 컴포넌트 구성 시 이 스킬을 사용."
---

# Brandformance Dashboard Generation

브랜드포먼스 데이터를 Next.js 인라인 스타일 대시보드로 변환하는 절차.

## 제약 조건

| 항목 | 규칙 |
|------|------|
| 파일 구조 | `app/page.js` 단일 파일, 모든 컴포넌트를 같은 파일 내 함수로 정의 |
| 스타일링 | `style={{}}` 인라인만 사용. Tailwind, CSS 모듈, globals.css 금지 |
| 데이터 | API 호출 없음. 분석 데이터를 파일 상단 상수 객체로 선언 |
| 언어 | 모든 레이블·설명 한국어 |
| 테마 | 다크 테마 (아래 디자인 토큰 참조) |

## 디자인 토큰

```javascript
const THEME = {
  bg: {
    primary: "linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 50%, #2d1b69 100%)",
    card: "rgba(255,255,255,0.05)",
    cardHover: "rgba(255,255,255,0.08)",
  },
  border: {
    card: "1px solid rgba(255,255,255,0.1)",
  },
  text: {
    primary: "#ffffff",
    secondary: "#aaaaaa",
    muted: "#666666",
    accent: "#6c5ce7",
    positive: "#00b894",
    negative: "#e17055",
  },
  radius: "16px",
  spacing: { xs: "0.5rem", sm: "1rem", md: "1.5rem", lg: "2rem", xl: "3rem" },
};
```

## 대시보드 섹션 (순서대로)

### 1. 헤더
- 브랜드명 (h1), 분석 일자, 분석 국가 표시
- 풀 너비, 패딩 충분히

### 2. 핵심 메트릭 카드 (4열 그리드)
- 월평균 검색량, 검색 트렌드(증감률), CPC, 경쟁도
- 각 카드: 제목(secondary 색상), 값(primary, 큰 폰트), 부가 설명
- 트렌드는 양수면 positive, 음수면 negative 색상

### 3. 소비자 인식 (CEP)
- 클러스터별 카드 목록
- 각 카드: 클러스터명, 핵심 키워드 태그, 소비자 동기/상황 요약

### 4. 경쟁사 비교 테이블
- 테이블 헤더: 키워드, 검색량, 트렌드, CPC, 경쟁도
- 브랜드 행은 accent 색상으로 하이라이트
- 반응형: 작은 화면에서 가로 스크롤

### 5. 검색 여정
- 검색 경로를 화살표로 연결 (before → brand → after)
- 상위 10개 경로 표시
- 각 경로의 빈도(가중치) 표시

### 6. 연관 키워드
- 검색량 순 상위 20개 키워드 태그 클라우드 또는 리스트
- 각 키워드: 이름, 검색량, 의도 분류 배지

## page.js 구조 템플릿

```javascript
// 데이터 상수 (data-researcher 산출물에서 추출)
const BRAND_DATA = { ... };
const COMPETITOR_DATA = { ... };
const RELATED_KEYWORDS = [ ... ];
const SEARCH_JOURNEYS = [ ... ];
const CEP_DATA = [ ... ];

// 유틸리티 함수
function formatNumber(n) { ... }
function TrendBadge({ value }) { ... }

// 섹션 컴포넌트 (같은 파일 내)
function MetricCard({ title, value, trend, description }) { ... }
function CEPSection({ data }) { ... }
function CompetitorTable({ brand, competitors }) { ... }
function JourneyFlow({ journeys }) { ... }
function KeywordCloud({ keywords }) { ... }

// 메인 페이지
export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: THEME.bg.primary, color: THEME.text.primary }}>
      {/* 헤더 */}
      {/* 메트릭 카드 그리드 */}
      {/* CEP 섹션 */}
      {/* 경쟁사 비교 */}
      {/* 검색 여정 */}
      {/* 연관 키워드 */}
    </div>
  );
}
```

## null 데이터 처리

데이터가 null인 섹션은 다음과 같이 렌더링한다:

```javascript
function EmptySection({ title }) {
  return (
    <div style={{ padding: "2rem", background: THEME.bg.card, borderRadius: THEME.radius, border: THEME.border.card, textAlign: "center" }}>
      <p style={{ color: THEME.text.muted }}>{title} 데이터를 수집하지 못했습니다.</p>
    </div>
  );
}
```
