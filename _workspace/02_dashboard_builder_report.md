# Dashboard Builder Report

## 생성 정보
- **브랜드**: 트립닷컴 (Trip.com)
- **분석 일자**: 2026-04-13
- **대상 국가**: 한국 (KR)
- **출력 파일**: `app/page.js`

## 생성된 섹션

| # | 섹션 | 상태 | 사용 데이터 |
|---|------|------|------------|
| 1 | 헤더 | 완료 | meta.brand, meta.collected_at, meta.countries |
| 2 | 핵심 메트릭 카드 | 완료 | keyword_metrics.트립닷컴 (volume_avg, volume_trend, cpc, competition_index) |
| 2a | 월별 검색량 차트 | 완료 | keyword_metrics.트립닷컴.monthly_recent |
| 2b | 인구통계 | 완료 | keyword_metrics.트립닷컴.demography |
| 3 | 소비자 인식 (CEP) | 완료 | consumer_perceptions.트립닷컴.communities, cep_summary |
| 4 | 경쟁사 비교 테이블 | 완료 | keyword_metrics (아고다, 야놀자, 여기어때, 호텔스컴바인) |
| 5 | 검색 여정 | 완료 | search_journeys.top_paths |
| 6 | 연관 키워드 TOP 20 | 완료 | related_keywords (20개 전체) |
| 7 | 핵심 인사이트 | 완료 | insights.key_findings |

## 사용한 데이터 필드

- `meta` — 헤더 영역 (브랜드명, 일자, 국가)
- `keyword_metrics.트립닷컴` — 핵심 메트릭 4종, 월별 추이, 인구통계
- `keyword_metrics.{경쟁사}` — 경쟁사 비교 테이블 (volume_avg, volume_trend, cpc, competition_index)
- `consumer_perceptions.트립닷컴.communities` — CEP 클러스터 카드 8종
- `consumer_perceptions.트립닷컴.cep_summary` — CEP 요약 배지
- `search_journeys.top_paths` — 검색 여정 경로 8건
- `related_keywords` — 연관 키워드 20건
- `insights.key_findings` — 핵심 인사이트 5건
- `insights.cep` — CEP 요약과 교차 확인 용도

## 미사용 데이터 및 사유

| 필드 | 사유 |
|------|------|
| `keyword_metrics.트립닷컴.intents` | 의도 분류(i/n/c/t) 값이 0/1 바이너리로 시각화 가치 낮음 |
| `keyword_metrics.{경쟁사}.gg_volume_avg, nv_volume_avg` | 경쟁사 Google/Naver 세부 분리량은 비교 테이블 복잡도 증가 대비 효용 낮음 |
| `keyword_metrics.{경쟁사}.volume_total` | 월평균으로 충분히 비교 가능, 연간 총량은 중복 정보 |
| `insights.competitive_positioning` | 경쟁사 비교 테이블에서 동일 정보를 직접 구성하여 대체 |

## 기술 사양

- **프레임워크**: Next.js App Router
- **파일 구조**: `app/page.js` 단일 파일
- **스타일링**: 인라인 style={{}} 전용 (Tailwind, CSS 모듈 미사용)
- **테마**: 다크 (#0a0a2e ~ #1a1a4e ~ #2d1b69 그라데이션)
- **데이터**: 상수 객체로 파일 상단 선언 (API 호출 없음)
- **언어**: 전체 한국어 레이블
- **컴포넌트 수**: 10개 (SectionTitle, MetricCard, MonthlyChart, DemographyBar, CEPSection, CompetitorTable, JourneyFlow, KeywordList, FindingsSection, EmptySection)
