---
name: brandformance-orchestrator
description: "Trip.com 브랜드포먼스 분석 대시보드를 생성하는 오케스트레이터. 트립닷컴, Trip.com, 브랜드포먼스, 브랜드 분석, 검색 데이터 분석, 대시보드 생성, 경쟁사 비교 요청 시 이 스킬을 사용. 후속 작업: 대시보드 수정, 데이터 업데이트, 결과 보완, 다시 실행, 재실행, 키워드 추가, 경쟁사 추가, 국가 추가, 섹션 수정, 이전 결과 개선 요청 시에도 반드시 이 스킬을 사용."
---

# Brandformance Orchestrator

Trip.com 브랜드포먼스 분석 에이전트를 조율하여 검색 데이터 기반 대시보드를 생성하는 통합 스킬.

## 실행 모드: 서브 에이전트

에이전트 간 실시간 통신이 불필요한 순차 파이프라인이므로 서브 에이전트 모드를 사용한다.

## 에이전트 구성

| 에이전트 | subagent_type | 역할 | 스킬 | 출력 |
|---------|--------------|------|------|------|
| data-researcher | data-researcher | MCP 도구로 검색 데이터 수집·분석 | brandformance-data | `_workspace/01_data_researcher_raw.json` |
| dashboard-builder | dashboard-builder | 수집 데이터 기반 page.js 대시보드 생성 | brandformance-dashboard | `app/page.js` |
| qa-reviewer | qa-reviewer | 데이터 정합성 + UI + 빌드 검증 | (인라인) | `_workspace/03_qa_reviewer_report.md` |

## 워크플로우

### Phase 0: 컨텍스트 확인

기존 산출물 존재 여부를 확인하여 실행 모드를 결정한다:

1. `_workspace/` 디렉토리 존재 여부 확인
2. 실행 모드 결정:
   - **`_workspace/` 미존재** → **초기 실행**. Phase 1로 진행
   - **`_workspace/` 존재 + 사용자가 부분 수정 요청** (예: "키워드 추가", "경쟁사 변경", "섹션 수정") → **부분 재실행**. 해당 에이전트만 재호출. 이전 산출물 경로를 에이전트 프롬프트에 포함하여 기존 결과를 읽고 수정하도록 지시
   - **`_workspace/` 존재 + 새 입력 제공** → **새 실행**. 기존 `_workspace/`를 `_workspace_prev/`로 이동한 뒤 Phase 1 진행

### Phase 1: 준비

1. 사용자 입력에서 분석 파라미터를 추출한다:
   - **브랜드 키워드**: 기본값 `["트립닷컴", "trip.com"]`
   - **경쟁사**: 기본값 `["야놀자", "여기어때", "아고다", "호텔스컴바인"]`
   - **국가**: 기본값 `["kr"]`
   - 사용자가 명시하면 해당 값 사용, 미명시면 기본값 적용
2. `_workspace/` 디렉토리 생성
3. 파라미터를 `_workspace/00_input.json`에 저장

### Phase 2: 데이터 수집

data-researcher 에이전트를 호출한다:

```
Agent(
  description: "브랜드포먼스 검색 데이터 수집",
  subagent_type: "data-researcher",
  model: "opus",
  prompt: "
    당신은 data-researcher 에이전트입니다. .claude/agents/data-researcher.md를 읽고 역할을 확인하라.
    .claude/skills/brandformance-data/SKILL.md를 읽고 수집 절차를 따르라.

    분석 파라미터:
    - 브랜드 키워드: {keywords}
    - 경쟁사: {competitors}
    - 국가: {countries}

    수집 데이터를 _workspace/01_data_researcher_raw.json에 저장하라.
    {부분 재실행 시: 이전 결과 _workspace/01_data_researcher_raw.json을 먼저 읽고 변경 부분만 업데이트하라.}
  "
)
```

에이전트 완료 후 `_workspace/01_data_researcher_raw.json` 존재를 확인한다. 없으면 1회 재시도. 재실패 시 사용자에게 보고하고 중단.

### Phase 3: 대시보드 생성

dashboard-builder 에이전트를 호출한다:

```
Agent(
  description: "브랜드포먼스 대시보드 UI 생성",
  subagent_type: "dashboard-builder",
  model: "opus",
  prompt: "
    당신은 dashboard-builder 에이전트입니다. .claude/agents/dashboard-builder.md를 읽고 역할을 확인하라.
    .claude/skills/brandformance-dashboard/SKILL.md를 읽고 대시보드 생성 가이드를 따르라.

    입력 데이터: _workspace/01_data_researcher_raw.json
    출력: app/page.js (전체 대시보드)

    대시보드 생성 후 _workspace/02_dashboard_builder_report.md에 생성 보고서를 작성하라.
    {부분 재실행 시: 현재 app/page.js를 읽고, 요청된 섹션만 수정하라.}
  "
)
```

### Phase 4: QA 검증

qa-reviewer 에이전트를 호출한다:

```
Agent(
  description: "브랜드포먼스 대시보드 QA 검증",
  subagent_type: "qa-reviewer",
  model: "opus",
  prompt: "
    당신은 qa-reviewer 에이전트입니다. .claude/agents/qa-reviewer.md를 읽고 역할을 확인하라.

    검증 대상:
    1. _workspace/01_data_researcher_raw.json (원본 데이터)
    2. app/page.js (생성된 대시보드)

    다음을 검증하라:
    1. 데이터 정합성 — JSON 데이터가 page.js에 정확히 반영되었는지 교차 비교
    2. 코드 규약 — 인라인 스타일 전용, 단일 파일 구조, 외부 CSS 미사용
    3. 빌드 검증 — npm run build 실행

    검증 결과를 _workspace/03_qa_reviewer_report.md에 저장하라.
    critical 실패가 있으면 반드시 명시하라.
  "
)
```

### Phase 5: 수정 루프 (조건부)

QA 리포트(`_workspace/03_qa_reviewer_report.md`)를 읽는다:

- **critical 실패 없음** → Phase 6으로 진행
- **critical 실패 있음** → dashboard-builder를 재호출하여 수정. QA 리포트의 실패 항목과 수정 방안을 프롬프트에 포함. 최대 2회 재시도 후 남은 이슈는 사용자에게 보고.

### Phase 6: 정리 및 보고

1. `_workspace/` 디렉토리 보존 (감사 추적용)
2. 사용자에게 결과 요약 보고:
   - 수집한 키워드/국가 수
   - 대시보드 섹션 구성
   - QA 결과 (통과/경고/실패 항목 수)
   - `app/page.js` 변경 사항 요약
3. 후속 작업 안내: "키워드 추가, 경쟁사 변경, 섹션 수정 등을 요청하면 부분 재실행합니다."

## 데이터 흐름

```
[오케스트레이터]
    │
    ├── Phase 1: 파라미터 추출 → _workspace/00_input.json
    │
    ├── Phase 2: Agent(data-researcher)
    │     └── _workspace/01_data_researcher_raw.json
    │
    ├── Phase 3: Agent(dashboard-builder)
    │     ├── app/page.js (최종 산출물)
    │     └── _workspace/02_dashboard_builder_report.md
    │
    ├── Phase 4: Agent(qa-reviewer)
    │     └── _workspace/03_qa_reviewer_report.md
    │
    ├── Phase 5: (조건부) Agent(dashboard-builder) 재호출
    │
    └── Phase 6: 사용자에게 보고
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| data-researcher 실패 | 1회 재시도. 재실패 시 사용자에게 보고하고 중단 |
| dashboard-builder 실패 | 1회 재시도. 재실패 시 부분 결과(데이터)만 보고 |
| qa-reviewer 실패 | QA 없이 결과 전달, "QA 미완료" 경고 표시 |
| 빌드 실패 | dashboard-builder 재호출하여 빌드 에러 수정 (최대 2회) |
| MCP 도구 전체 불가 | 사용자에게 도구 연결 상태 확인 요청 |

## 테스트 시나리오

### 정상 흐름
1. 사용자: "트립닷컴 브랜드포먼스 분석 대시보드 만들어줘"
2. Phase 1: 기본 파라미터 적용 (트립닷컴, 경쟁사 4개, 한국)
3. Phase 2: MCP 도구로 데이터 수집 → JSON 생성
4. Phase 3: page.js 대시보드 생성 (6개 섹션)
5. Phase 4: QA 통과
6. Phase 6: 결과 보고
7. 예상 결과: `app/page.js`에 완성된 대시보드, `_workspace/`에 중간 산출물

### 에러 흐름
1. Phase 2에서 cluster_finder 호출 실패
2. data-researcher가 해당 항목을 null로 설정하고 나머지 수집 완료
3. Phase 3에서 CEP 섹션을 "데이터 없음" 플레이스홀더로 렌더링
4. Phase 4에서 QA가 null 처리를 확인 → 경고(warning)로 분류
5. Phase 6에서 "CEP 데이터 미수집" 경고 포함하여 보고

### 부분 재실행 흐름
1. 사용자: "경쟁사에 부킹닷컴도 추가해줘"
2. Phase 0: `_workspace/` 존재 + 부분 수정 → 부분 재실행
3. Phase 2: data-researcher 재호출 (기존 JSON 읽고 부킹닷컴 데이터만 추가)
4. Phase 3: dashboard-builder 재호출 (경쟁사 테이블에 부킹닷컴 추가)
5. Phase 4~6: QA + 보고
