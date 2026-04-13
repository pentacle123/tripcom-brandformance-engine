---
name: brandformance-data
description: "MCP 검색 데이터 도구(cluster_finder, intent_finder, keyword_info, path_finder)를 사용하여 브랜드포먼스 데이터를 체계적으로 수집하는 절차 가이드. 트립닷컴, Trip.com, 여행 브랜드 검색 데이터 수집, 소비자 인식 분석, CEP 발견, 경쟁사 비교 데이터 수집 시 이 스킬을 사용."
---

# Brandformance Data Collection

Trip.com 브랜드포먼스 분석을 위한 MCP 검색 데이터 수집 절차.

## 수집 워크플로우

### Step 1: 키워드 메트릭 수집 (keyword_info)

대상 키워드와 경쟁사 키워드의 기본 메트릭을 수집한다.

```
keyword_info(
  keywords: ["트립닷컴", "야놀자", "여기어때", "아고다", ...],
  gl: "kr",
  data_type: "all"
)
```

수집 항목:
- `ads_metrics`: 월평균 검색량(volume_avg), 연간 총 검색량(volume_total), 증감률(volume_trend), CPC, 경쟁도
- `features`: SERP 스니펫 유형 (광고, 뉴스, 지식패널 등)
- `intents`: 검색 의도 분류 (정보, 상업, 거래, 네비게이션)
- `demography`: 검색자 인구통계 (연령, 성별)
- `monthly_volume`: 월별 검색량 추이

다국가 분석 시 gl 파라미터를 변경하여 국가별로 별도 호출한다.

### Step 2: 소비자 인식 수집 (cluster_finder)

브랜드 키워드의 소비자 커뮤니티 인식과 Category Entry Points를 수집한다.

```
cluster_finder(
  keyword: "트립닷컴",
  gl: "kr",
  data_type: "communities",
  hop: 2
)
```

수집 항목:
- 커뮤니티별 소비자 인식 (구매 맥락, 상황, 이유, 감정)
- Category Entry Points — 소비자가 브랜드를 떠올리는 진입점

경쟁사 키워드도 동일하게 수집하여 인식 비교 기반을 마련한다.

연관 키워드 확장이 필요하면 `data_type: "rels"`로 관계 데이터도 수집한다.

### Step 3: 연관 키워드 확장 (intent_finder)

대상 키워드의 연관 키워드를 검색량 순으로 수집한다.

```
intent_finder(
  keywords: ["트립닷컴"],
  gl: "kr",
  sort: "volume_avg",
  limit: 50
)
```

이 데이터는 소비자의 실제 검색 의도를 파악하고 대시보드의 "연관 키워드" 섹션에 사용된다.

### Step 4: 검색 여정 수집 (path_finder)

소비자의 검색 경로(전후 검색어)를 수집한다.

```
path_finder(
  keyword: "트립닷컴",
  gl: "kr",
  limit: 300
)
```

이 데이터로 소비자가 브랜드 검색 전후에 어떤 키워드를 탐색하는지 파악한다.

## 출력 형식

모든 수집 데이터를 다음 JSON 구조로 통합한다:

```json
{
  "meta": {
    "brand": "트립닷컴",
    "keywords": ["트립닷컴", "trip.com"],
    "competitors": ["야놀자", "여기어때", "아고다"],
    "countries": ["kr"],
    "collected_at": "2026-04-13T..."
  },
  "keyword_metrics": {
    "트립닷컴": { "volume_avg": 0, "volume_trend": 0, "cpc": 0, "competition_index": 0, ... },
    "야놀자": { ... }
  },
  "consumer_perceptions": {
    "트립닷컴": { "communities": [...], "cep": [...] },
    "야놀자": { ... }
  },
  "related_keywords": [
    { "keyword": "...", "volume_avg": 0, "intent": "..." }
  ],
  "search_journeys": {
    "트립닷컴": { "paths": [...] }
  },
  "insights": {
    "cep": ["가격 비교", "해외 호텔", ...],
    "competitive_positioning": [{ "dimension": "...", "brand_score": 0, "competitor_avg": 0 }],
    "consumer_segments": [{ "segment": "...", "keywords": [...], "volume": 0 }]
  }
}
```

## 데이터 품질 원칙

- MCP 도구가 반환하는 원본 데이터를 왜곡하지 않는다. 수치는 그대로 전달한다.
- 수집 불가 항목은 `null`로 설정하고 `meta.notes`에 사유를 기록한다.
- insights 섹션은 수집된 데이터를 기반으로 도출한 분석가의 해석이다. 데이터가 뒷받침하지 않는 추론은 포함하지 않는다.
