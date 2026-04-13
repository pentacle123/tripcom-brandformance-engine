// ============================================================
// 트립닷컴 브랜드포먼스 대시보드
// 생성일: 2026-04-13
// 단일 파일 구조 — 인라인 스타일 전용
// ============================================================

// ── 디자인 토큰 ──
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

// ── 데이터 상수 ──
const META = {
  brand: "트립닷컴",
  keywords: ["트립닷컴", "trip.com"],
  competitors: ["야놀자", "여기어때", "아고다", "호텔스컴바인"],
  countries: ["kr"],
  collected_at: "2026-04-13",
};

const BRAND_METRICS = {
  volume_avg: 790533,
  volume_total: 8115800,
  volume_trend: -0.01,
  cpc: 0.86,
  competition: "MEDIUM",
  competition_index: 60,
  gg_volume_avg: 231000,
  nv_volume_avg: 559533,
  intents: { i: 1, n: 1, c: 0, t: 0 },
  demography: {
    gender_ratio: 41.83,
    f_gender_ratio: 58.16,
    a20_ratio: 7.27,
    a25_ratio: 13.89,
    a30_ratio: 31.53,
    a40_ratio: 27.31,
    a50_ratio: 18.3,
  },
  monthly_recent: [
    { month: "2025-10", total: 665600 },
    { month: "2025-11", total: 793700 },
    { month: "2025-12", total: 814200 },
    { month: "2026-01", total: 889600 },
    { month: "2026-02", total: 677600 },
    { month: "2026-03", total: 804400 },
  ],
};

const COMPETITOR_DATA = {
  "아고다": { volume_avg: 1607766, volume_trend: -0.06, cpc: 0.47, competition_index: 65 },
  "야놀자": { volume_avg: 469366, volume_trend: -0.15, cpc: 0.39, competition_index: 53 },
  "여기어때": { volume_avg: 440400, volume_trend: -0.09, cpc: 0.40, competition_index: 52 },
  "호텔스컴바인": { volume_avg: 110266, volume_trend: -0.06, cpc: 0.62, competition_index: 68 },
};

const CEP_DATA = [
  { id: 0, label: "호텔 예약 (지역별)", keywords: ["와이탄 호텔 추천", "상하이 호텔 추천", "수원 숙소 추천", "수원 호텔", "에어비앤비"] },
  { id: 1, label: "기업/회사 정보", keywords: ["트립닷컴 한국 지사", "트립닷컴 어느나라", "트립닷컴 중국 회사", "트립닷컴 모회사", "트립닷컴 채용"] },
  { id: 2, label: "고객센터/상담", keywords: ["트립닷컴 고객센터", "트립닷컴 상담원 연결", "트립닷컴 전화번호", "트립닷컴 탈퇴", "트립닷컴 환불"] },
  { id: 3, label: "앱/플랫폼 이용", keywords: ["트립닷컴 로그인", "트립닷컴 앱", "트립닷컴 PC버전", "트립닷컴 예약", "트립닷컴 싼 이유"] },
  { id: 4, label: "항공권 예약/발권", keywords: ["트립닷컴 항공권", "트립닷컴 항공권 조회", "트립닷컴 e티켓", "트립닷컴 예약번호", "트립닷컴 체크인"] },
  { id: 5, label: "후기/비교 (커뮤니티)", keywords: ["트립닷컴 항공권 후기 디시", "트립닷컴 vs 스카이스캐너", "아고다 트립닷컴 비교", "트립닷컴 싸게 사는법", "트립닷컴 비추"] },
  { id: 7, label: "호텔 가격비교", keywords: ["호텔 싸게 예약하는 법", "해외 호텔 싸게", "호텔스닷컴 후기", "부킹닷컴 호텔 후기", "아고다 국내호텔"] },
  { id: 8, label: "중국 리조트/호텔", keywords: ["나라다 리조트", "칭다오 지모고성", "지모고성 맛집", "바른투어"] },
];

const CEP_SUMMARY = ["항공권 예약", "호텔 가격비교", "할인코드/쿠폰", "해외여행 숙소", "고객센터 문의"];

const SEARCH_JOURNEYS = [
  { path: ["트립닷컴", "트립닷컴 할인코드", "트립닷컴 항공권 할인코드"], type: "할인 탐색" },
  { path: ["트립닷컴", "트립닷컴 할인코드", "트립닷컴 할인코드 2026"], type: "할인 탐색" },
  { path: ["트립닷컴", "트립닷컴 고객센터", "트립닷컴 고객센터 전화번호"], type: "CS 문의" },
  { path: ["트립닷컴", "트립닷컴 앱", "트립닷컴 항공권 할인"], type: "앱 할인" },
  { path: ["트립닷컴", "트립닷컴 항공권 후기", "트립닷컴 항공권 후기 디시"], type: "후기 탐색" },
  { path: ["트립닷컴", "트립닷컴 싼 이유", "트립닷컴 항공권 후기"], type: "신뢰 확인" },
  { path: ["호텔스컴바인", "호텔스컴바인 광고", "트립닷컴"], type: "경쟁사 유입" },
  { path: ["트립닷컴", "트립닷컴 고객센터", "트립닷컴 상담원 연결 디시"], type: "CS 불만" },
];

const RELATED_KEYWORDS = [
  { keyword: "트립닷컴 할인코드", rank: 1 },
  { keyword: "트립닷컴 항공권", rank: 2 },
  { keyword: "트립닷컴 고객센터", rank: 3 },
  { keyword: "트립닷컴 항공권 할인코드", rank: 4 },
  { keyword: "트립닷컴 할인", rank: 5 },
  { keyword: "트립닷컴 항공권 후기", rank: 6 },
  { keyword: "트립닷컴 항공권 취소", rank: 7 },
  { keyword: "트립닷컴 쿠폰", rank: 8 },
  { keyword: "트립닷컴 할인코드 1월", rank: 9 },
  { keyword: "트립닷컴 호텔 할인코드", rank: 10 },
  { keyword: "트립닷컴 내통장결제", rank: 11 },
  { keyword: "트립닷컴 할인 쿠폰", rank: 12 },
  { keyword: "트립닷컴 환불", rank: 13 },
  { keyword: "트립닷컴 할인코드 항공권", rank: 14 },
  { keyword: "트립닷컴 광고", rank: 15 },
  { keyword: "트립닷컴 할인코드 2026", rank: 16 },
  { keyword: "트립닷컴 항공권 발권", rank: 17 },
  { keyword: "트립닷컴 이심", rank: 18 },
  { keyword: "트립닷컴 파트너스", rank: 19 },
  { keyword: "트립닷컴 카드할인", rank: 20 },
];

const KEY_FINDINGS = [
  "트립닷컴은 경쟁사 중 유일하게 트렌드 -1%로 가장 안정적 성장세",
  "CPC $0.86로 경쟁사 대비 가장 높아 광고 경쟁이 치열",
  "검색자 58%가 여성, 30대가 31.5%로 핵심 타겟",
  "할인코드 관련 검색이 연관 키워드 1위 — 가격 민감 소비자 비중 높음",
  "경쟁사 대비 '항공권' 연관 검색이 강점 (호텔 중심 아고다와 차별화)",
];

// ── 유틸리티 함수 ──
function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
}

function formatPercent(v) {
  const pct = (v * 100).toFixed(1);
  return v >= 0 ? `+${pct}%` : `${pct}%`;
}

function getTrendColor(v) {
  return v >= 0 ? THEME.text.positive : THEME.text.negative;
}

// ── 섹션 컴포넌트 ──

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: THEME.spacing.md,
      color: THEME.text.primary,
      borderLeft: `4px solid ${THEME.text.accent}`,
      paddingLeft: THEME.spacing.sm,
    }}>
      {children}
    </h2>
  );
}

function MetricCard({ title, value, sub, trendValue }) {
  const hasTrend = trendValue !== undefined && trendValue !== null;
  return (
    <div style={{
      background: THEME.bg.card,
      border: THEME.border.card,
      borderRadius: THEME.radius,
      padding: THEME.spacing.lg,
      flex: "1 1 200px",
      minWidth: "180px",
    }}>
      <p style={{ color: THEME.text.secondary, fontSize: "0.85rem", margin: 0, marginBottom: "0.5rem" }}>{title}</p>
      <p style={{ color: THEME.text.primary, fontSize: "2rem", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{value}</p>
      {hasTrend && (
        <p style={{ color: getTrendColor(trendValue), fontSize: "0.9rem", margin: 0, marginTop: "0.4rem", fontWeight: 600 }}>
          {formatPercent(trendValue)}
        </p>
      )}
      {sub && <p style={{ color: THEME.text.muted, fontSize: "0.8rem", margin: 0, marginTop: "0.3rem" }}>{sub}</p>}
    </div>
  );
}

function MonthlyChart({ data }) {
  const max = Math.max(...data.map(d => d.total));
  return (
    <div style={{
      background: THEME.bg.card,
      border: THEME.border.card,
      borderRadius: THEME.radius,
      padding: THEME.spacing.lg,
    }}>
      <p style={{ color: THEME.text.secondary, fontSize: "0.85rem", margin: 0, marginBottom: THEME.spacing.sm }}>
        월별 검색량 추이
      </p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" }}>
        {data.map((d, i) => {
          const h = (d.total / max) * 100;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <span style={{ color: THEME.text.secondary, fontSize: "0.65rem", marginBottom: "4px" }}>
                {formatNumber(d.total)}
              </span>
              <div style={{
                width: "100%",
                maxWidth: "48px",
                height: `${h}%`,
                background: `linear-gradient(180deg, ${THEME.text.accent} 0%, #a29bfe 100%)`,
                borderRadius: "6px 6px 0 0",
                minHeight: "8px",
              }} />
              <span style={{ color: THEME.text.muted, fontSize: "0.6rem", marginTop: "4px" }}>
                {d.month.slice(5)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DemographyBar({ label, value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
      <span style={{ color: THEME.text.secondary, fontSize: "0.75rem", width: "40px", textAlign: "right" }}>{label}</span>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: "4px", height: "16px", overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color || THEME.text.accent, borderRadius: "4px", transition: "width 0.3s" }} />
      </div>
      <span style={{ color: THEME.text.primary, fontSize: "0.75rem", width: "45px" }}>{value}%</span>
    </div>
  );
}

function CEPSection({ communities, summary }) {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: THEME.spacing.xs, marginBottom: THEME.spacing.md }}>
        {summary.map((s, i) => (
          <span key={i} style={{
            background: THEME.text.accent,
            color: "#fff",
            fontSize: "0.8rem",
            fontWeight: 600,
            padding: "4px 14px",
            borderRadius: "20px",
          }}>
            {s}
          </span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: THEME.spacing.sm }}>
        {communities.map((c) => (
          <div key={c.id} style={{
            background: THEME.bg.card,
            border: THEME.border.card,
            borderRadius: THEME.radius,
            padding: THEME.spacing.md,
          }}>
            <p style={{ color: THEME.text.primary, fontWeight: 600, fontSize: "0.95rem", margin: 0, marginBottom: "0.5rem" }}>
              {c.label}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {c.keywords.map((kw, j) => (
                <span key={j} style={{
                  background: "rgba(108,92,231,0.15)",
                  color: "#a29bfe",
                  fontSize: "0.72rem",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  border: "1px solid rgba(108,92,231,0.25)",
                }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitorTable() {
  const allBrands = [
    { name: "트립닷컴", ...{ volume_avg: BRAND_METRICS.volume_avg, volume_trend: BRAND_METRICS.volume_trend, cpc: BRAND_METRICS.cpc, competition_index: BRAND_METRICS.competition_index }, isBrand: true },
    ...Object.entries(COMPETITOR_DATA).map(([name, d]) => ({ name, ...d, isBrand: false })),
  ];
  allBrands.sort((a, b) => b.volume_avg - a.volume_avg);

  const thStyle = {
    padding: "12px 16px",
    textAlign: "left",
    color: THEME.text.secondary,
    fontSize: "0.8rem",
    fontWeight: 600,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    whiteSpace: "nowrap",
  };
  const tdStyle = {
    padding: "12px 16px",
    fontSize: "0.9rem",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ overflowX: "auto", borderRadius: THEME.radius, border: THEME.border.card, background: THEME.bg.card }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>브랜드</th>
            <th style={{ ...thStyle, textAlign: "right" }}>월평균 검색량</th>
            <th style={{ ...thStyle, textAlign: "right" }}>검색 트렌드</th>
            <th style={{ ...thStyle, textAlign: "right" }}>CPC ($)</th>
            <th style={{ ...thStyle, textAlign: "right" }}>경쟁도</th>
          </tr>
        </thead>
        <tbody>
          {allBrands.map((b, i) => (
            <tr key={i} style={{
              background: b.isBrand ? "rgba(108,92,231,0.12)" : "transparent",
            }}>
              <td style={{
                ...tdStyle,
                fontWeight: b.isBrand ? 700 : 400,
                color: b.isBrand ? THEME.text.accent : THEME.text.primary,
              }}>
                {b.name}{b.isBrand ? " *" : ""}
              </td>
              <td style={{ ...tdStyle, textAlign: "right", color: THEME.text.primary }}>{formatNumber(b.volume_avg)}</td>
              <td style={{ ...tdStyle, textAlign: "right", color: getTrendColor(b.volume_trend), fontWeight: 600 }}>{formatPercent(b.volume_trend)}</td>
              <td style={{ ...tdStyle, textAlign: "right", color: THEME.text.primary }}>${b.cpc.toFixed(2)}</td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                <span style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: "12px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  background: b.competition_index >= 65 ? "rgba(225,112,85,0.15)" : b.competition_index >= 55 ? "rgba(253,203,110,0.15)" : "rgba(0,184,148,0.15)",
                  color: b.competition_index >= 65 ? THEME.text.negative : b.competition_index >= 55 ? "#fdcb6e" : THEME.text.positive,
                }}>
                  {b.competition_index}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function JourneyFlow({ journeys }) {
  const typeColors = {
    "할인 탐색": "#6c5ce7",
    "CS 문의": "#e17055",
    "앱 할인": "#00b894",
    "후기 탐색": "#fdcb6e",
    "신뢰 확인": "#74b9ff",
    "경쟁사 유입": "#fd79a8",
    "CS 불만": "#d63031",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {journeys.map((j, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          background: THEME.bg.card,
          border: THEME.border.card,
          borderRadius: "12px",
          padding: "12px 16px",
          flexWrap: "wrap",
        }}>
          <span style={{
            background: typeColors[j.type] || THEME.text.accent,
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "10px",
            marginRight: "12px",
            whiteSpace: "nowrap",
          }}>
            {j.type}
          </span>
          {j.path.map((step, si) => (
            <span key={si} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{
                color: step === META.brand ? THEME.text.accent : THEME.text.primary,
                fontWeight: step === META.brand ? 700 : 400,
                fontSize: "0.85rem",
              }}>
                {step}
              </span>
              {si < j.path.length - 1 && (
                <span style={{ color: THEME.text.muted, margin: "0 8px", fontSize: "0.8rem" }}>→</span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function KeywordList({ keywords }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {keywords.map((kw, i) => {
        const opacity = 1 - (i / keywords.length) * 0.5;
        const size = i < 5 ? "0.95rem" : i < 10 ? "0.85rem" : "0.78rem";
        return (
          <span key={i} style={{
            background: THEME.bg.card,
            border: THEME.border.card,
            borderRadius: "12px",
            padding: "8px 16px",
            fontSize: size,
            color: THEME.text.primary,
            opacity,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{
              color: THEME.text.accent,
              fontSize: "0.7rem",
              fontWeight: 700,
              minWidth: "20px",
            }}>
              #{kw.rank}
            </span>
            {kw.keyword}
          </span>
        );
      })}
    </div>
  );
}

function FindingsSection({ findings }) {
  return (
    <div style={{
      background: THEME.bg.card,
      border: THEME.border.card,
      borderRadius: THEME.radius,
      padding: THEME.spacing.lg,
    }}>
      <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
        {findings.map((f, i) => (
          <li key={i} style={{
            color: THEME.text.primary,
            fontSize: "0.9rem",
            lineHeight: 1.7,
            marginBottom: "6px",
          }}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptySection({ title }) {
  return (
    <div style={{
      padding: THEME.spacing.lg,
      background: THEME.bg.card,
      borderRadius: THEME.radius,
      border: THEME.border.card,
      textAlign: "center",
    }}>
      <p style={{ color: THEME.text.muted }}>{title} 데이터를 수집하지 못했습니다.</p>
    </div>
  );
}

// ── 메인 페이지 ──
export default function Home() {
  const sectionStyle = {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: `0 ${THEME.spacing.lg}`,
    marginBottom: THEME.spacing.xl,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: THEME.bg.primary,
      color: THEME.text.primary,
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
      paddingBottom: THEME.spacing.xl,
    }}>

      {/* ── 1. 헤더 ── */}
      <header style={{
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
        padding: `${THEME.spacing.xl} ${THEME.spacing.lg}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: THEME.spacing.sm,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        marginBottom: THEME.spacing.xl,
      }}>
        <div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            <span style={{ color: THEME.text.accent }}>트립닷컴</span> 브랜드포먼스 리포트
          </h1>
          <p style={{ color: THEME.text.secondary, fontSize: "0.95rem", margin: 0, marginTop: "0.5rem" }}>
            Trip.com 검색 데이터 기반 브랜드 성과 분석
          </p>
        </div>
        <div style={{ display: "flex", gap: THEME.spacing.md, alignItems: "center" }}>
          <span style={{
            background: "rgba(108,92,231,0.15)",
            color: THEME.text.accent,
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}>
            한국 (KR)
          </span>
          <span style={{ color: THEME.text.muted, fontSize: "0.85rem" }}>
            {META.collected_at}
          </span>
        </div>
      </header>

      {/* ── 2. 핵심 메트릭 카드 ── */}
      <section style={sectionStyle}>
        <SectionTitle>핵심 메트릭</SectionTitle>
        <div style={{ display: "flex", gap: THEME.spacing.sm, flexWrap: "wrap", marginBottom: THEME.spacing.md }}>
          <MetricCard
            title="월평균 검색량"
            value={formatNumber(BRAND_METRICS.volume_avg)}
            sub={`Google ${formatNumber(BRAND_METRICS.gg_volume_avg)} / Naver ${formatNumber(BRAND_METRICS.nv_volume_avg)}`}
          />
          <MetricCard
            title="검색 트렌드"
            value={formatPercent(BRAND_METRICS.volume_trend)}
            trendValue={BRAND_METRICS.volume_trend}
            sub="전 분기 대비 변화율"
          />
          <MetricCard
            title="CPC (클릭당 비용)"
            value={`$${BRAND_METRICS.cpc.toFixed(2)}`}
            sub="경쟁사 평균 대비 높음"
          />
          <MetricCard
            title="광고 경쟁도"
            value={BRAND_METRICS.competition_index}
            sub={BRAND_METRICS.competition}
          />
        </div>

        {/* 월별 차트 + 인구통계 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: THEME.spacing.sm }}>
          <MonthlyChart data={BRAND_METRICS.monthly_recent} />
          <div style={{
            background: THEME.bg.card,
            border: THEME.border.card,
            borderRadius: THEME.radius,
            padding: THEME.spacing.lg,
          }}>
            <p style={{ color: THEME.text.secondary, fontSize: "0.85rem", margin: 0, marginBottom: THEME.spacing.sm }}>
              검색자 인구통계
            </p>
            <div style={{ display: "flex", gap: THEME.spacing.lg, marginBottom: THEME.spacing.sm }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: THEME.text.primary, fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>
                  {BRAND_METRICS.demography.f_gender_ratio}%
                </p>
                <p style={{ color: THEME.text.secondary, fontSize: "0.75rem", margin: 0 }}>여성</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: THEME.text.primary, fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>
                  {BRAND_METRICS.demography.gender_ratio}%
                </p>
                <p style={{ color: THEME.text.secondary, fontSize: "0.75rem", margin: 0 }}>남성</p>
              </div>
            </div>
            <p style={{ color: THEME.text.muted, fontSize: "0.7rem", margin: 0, marginBottom: "8px" }}>연령대 분포</p>
            <DemographyBar label="20대" value={BRAND_METRICS.demography.a20_ratio + BRAND_METRICS.demography.a25_ratio} color="#a29bfe" />
            <DemographyBar label="30대" value={BRAND_METRICS.demography.a30_ratio} color="#6c5ce7" />
            <DemographyBar label="40대" value={BRAND_METRICS.demography.a40_ratio} color="#5f4fcf" />
            <DemographyBar label="50대+" value={BRAND_METRICS.demography.a50_ratio} color="#4834b0" />
          </div>
        </div>
      </section>

      {/* ── 3. 소비자 인식 (CEP) ── */}
      <section style={sectionStyle}>
        <SectionTitle>소비자 인식 (CEP)</SectionTitle>
        <p style={{ color: THEME.text.secondary, fontSize: "0.85rem", marginTop: 0, marginBottom: THEME.spacing.sm }}>
          소비자가 트립닷컴을 검색할 때의 주요 진입점과 관련 클러스터
        </p>
        <CEPSection communities={CEP_DATA} summary={CEP_SUMMARY} />
      </section>

      {/* ── 4. 경쟁사 비교 ── */}
      <section style={sectionStyle}>
        <SectionTitle>경쟁사 비교</SectionTitle>
        <CompetitorTable />
      </section>

      {/* ── 5. 검색 여정 ── */}
      <section style={sectionStyle}>
        <SectionTitle>검색 여정</SectionTitle>
        <p style={{ color: THEME.text.secondary, fontSize: "0.85rem", marginTop: 0, marginBottom: THEME.spacing.sm }}>
          소비자가 트립닷컴을 검색하기 전/후의 탐색 경로
        </p>
        <JourneyFlow journeys={SEARCH_JOURNEYS} />
      </section>

      {/* ── 6. 연관 키워드 (상위 20개) ── */}
      <section style={sectionStyle}>
        <SectionTitle>연관 키워드 TOP 20</SectionTitle>
        <KeywordList keywords={RELATED_KEYWORDS} />
      </section>

      {/* ── 핵심 인사이트 ── */}
      <section style={sectionStyle}>
        <SectionTitle>핵심 인사이트</SectionTitle>
        <FindingsSection findings={KEY_FINDINGS} />
      </section>

      {/* ── 푸터 ── */}
      <footer style={{
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
        padding: `${THEME.spacing.lg} ${THEME.spacing.lg}`,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
      }}>
        <p style={{ color: THEME.text.muted, fontSize: "0.75rem", margin: 0 }}>
          Tripcom Brandformance Engine v2 | 데이터 수집일: {META.collected_at} | 자동 생성 대시보드
        </p>
      </footer>
    </div>
  );
}
