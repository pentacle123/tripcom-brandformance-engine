"use client";
import React, { useState, useCallback } from "react";

// ══════════════════════════════════════════════════════════════
// Trip.com AI Brandformance Engine v3.0
// 3-Tab Structure | Opportunity-Driven | Claude API
// ══════════════════════════════════════════════════════════════

// ── COLOR SYSTEM ──
const C = {
  primary: "#0770E3",
  secondary: "#FF6B00",
  dark: "#0A1628",
  card: "#13203A",
  cardHover: "#182848",
  surface: "#0E1A2E",
  border: "rgba(7,112,227,0.20)",
  text: "#E8ECF1",
  textSoft: "#8B99AE",
  accent: "#00D4AA",
  warn: "#FF4757",
  gold: "#FFD700",
  purple: "#8B5CF6",
};

const STAGE_COLORS = { Dream: "#FF9A9E", Plan: "#A8E6CF", Book: C.primary, Share: C.gold };

// ── DESTINATION OPPORTUNITIES (7) ──
const DESTINATION_OPPORTUNITIES = [
  {
    id: "opp-d1", title: "일본 맛집 탐방객", icon: "🍣", region: "일본",
    destinations: ["오사카", "후쿠오카", "도쿄", "교토"],
    totalMonthlyVol: 136090, annualVol: 1633080,
    keyInsight: "일본 여행 검색의 70%가 '맛집'에서 시작. 맛집이 여행의 Entry Point",
    demographics: "여성 67% · 30-40대 60%", peakSeason: "10~1월 (가을·겨울)",
    pathJourney: "맛집 → 맛집거리 → 관광지 → 동선 → 근교여행",
    uspConnection: "Trip.Best 맛집 랭킹 + 원스톱 예약",
    contentHook: "오사카 현지인만 아는 규카츠 골목 3곳", stage: "Dream",
    dataProof: "오사카맛집 73,090/월, 규카츠 12,100/월, 라멘 11,483/월"
  },
  {
    id: "opp-d2", title: "다낭·나트랑 리조트 가성비 여행자", icon: "🏖️", region: "베트남",
    destinations: ["다낭", "나트랑"], totalMonthlyVol: 98649, annualVol: 1183788,
    keyInsight: "일정→경비가 두 번째 관문. 가격이 결정의 핵심",
    demographics: "여성 66% · 30-40대 59%", peakSeason: "1월, 5~7월",
    pathJourney: "3박4일 → 패키지 → 경비 → 맛집/리조트",
    uspConnection: "가격 경쟁력 + 트립지니 AI 일정 플래너",
    contentHook: "다낭 3박4일 50만원으로 가능한 리조트 루트", stage: "Plan",
    dataProof: "다낭여행 75,116/월, 리조트 23,406/월, 나트랑 99,533/월"
  },
  {
    id: "opp-d3", title: "방콕·태국 가족여행 안전 탐색자", icon: "👨‍👩‍👧", region: "태국",
    destinations: ["방콕", "태국 전체", "파타야"], totalMonthlyVol: 129526, annualVol: 1554312,
    keyInsight: "가족=안전 최우선. '주의사항' 검색 후 파타야로 확장",
    demographics: "여성 71% · 30대 32%", peakSeason: "1월, 7~8월, 12월",
    pathJourney: "가족여행 → 파타야 → 안전/주의 → 효도여행",
    uspConnection: "24시간 한국어 CS + 가족 패키지",
    contentHook: "방콕 가족여행 파타야까지 6일 안전 루트", stage: "Plan",
    dataProof: "방콕여행 55,550/월, 태국여행 73,976/월, 맛집 9,610/월"
  },
  {
    id: "opp-d4", title: "유럽 첫 여행자 (지리 학습 단계)", icon: "🗼", region: "유럽",
    destinations: ["스페인", "이탈리아", "스위스", "프랑스", "영국"],
    totalMonthlyVol: 266224, annualVol: 3194688,
    keyInsight: "지리 학습부터 시작. 나라 선택→코스→패키지 순서",
    demographics: "여성 74% · 50대+ 31%", peakSeason: "1월, 5~6월, 9~10월",
    pathJourney: "유럽 → 나라/지도 → 패키지 → 혼자/자전거 여행",
    uspConnection: "원스톱 다국가 예약 + Trip.Best 코스 추천",
    contentHook: "유럽 처음이면 이 3개국 루트가 정답인 이유", stage: "Dream",
    dataProof: "유럽여행 45,586/월, 스페인 67,973/월, 이탈리아 54,613/월, 스위스 52,466/월"
  },
  {
    id: "opp-d5", title: "대만 맛집·야시장 탐방객", icon: "🧋", region: "동아시아",
    destinations: ["대만"], totalMonthlyVol: 186300, annualVol: 2235600,
    keyInsight: "맛집+야시장이 핵심. 일본 다음 2위 검색량",
    demographics: "여성 72% · 40-50대 56%", peakSeason: "10~1월",
    pathJourney: "대만여행 → 맛집 → 야시장 → 관광지 → 경비",
    uspConnection: "Trip.Best 맛집 + 가격 비교",
    contentHook: "대만 야시장 먹거리 1만원으로 10가지 도전", stage: "Dream",
    dataProof: "대만여행 186,300/월, 맛집 9,553/월"
  },
  {
    id: "opp-d6", title: "괌·하와이 가족 리조트 여행자", icon: "🌺", region: "미주",
    destinations: ["괌", "하와이"], totalMonthlyVol: 93359, annualVol: 1120308,
    keyInsight: "괌=30대 가족, 하와이=50대+ 버킷리스트. 타겟 완전히 다름",
    demographics: "괌: 30대 36% / 하와이: 50대+ 30%", peakSeason: "괌 1,4~6월 / 하와이 1,5~7월",
    pathJourney: "괌/하와이 → 맛집 → 비용 → 호텔 → 액티비티",
    uspConnection: "원스톱 항공+호텔+액티비티",
    contentHook: "괌 vs 하와이, 우리 가족에 맞는 곳은?", stage: "Plan",
    dataProof: "괌여행 60,576/월, 하와이여행 32,783/월, 괌맛집 9,636/월"
  },
  {
    id: "opp-d7", title: "삿포로 겨울 시즌 여행자", icon: "❄️", region: "일본",
    destinations: ["삿포로"], totalMonthlyVol: 91766, annualVol: 1101192,
    keyInsight: "겨울 시즌 집중. 눈축제+온천+스키가 핵심",
    demographics: "여성 68% · 40대 29%", peakSeason: "11~2월 (겨울 집중)",
    pathJourney: "삿포로 → 눈축제 → 온천 → 스키 → 맛집",
    uspConnection: "Trip.Best 시즌 추천 + 스키 패키지",
    contentHook: "삿포로 눈축제 시즌 3박4일 완벽 동선", stage: "Plan",
    dataProof: "삿포로여행 91,766/월, 눈축제 30,000/월"
  }
];

// ── INTEREST OPPORTUNITIES (6) ──
const INTEREST_OPPORTUNITIES = [
  {
    id: "opp-i1", title: "시니어 골프 여행자", icon: "⛳", interest: "골프",
    totalMonthlyVol: 24523, annualVol: 284990,
    keyInsight: "여행 검색 전체가 여성 70%인데, 골프 여행만 남성 61% — 완전히 다른 타겟과 채널이 필요",
    demographics: "남성 61% · 50대+ 54%", e3tag: "Elderly",
    destinations: ["후쿠오카", "태국", "베트남", "필리핀"],
    pathJourney: "골프여행 → 동남아 → 태국 → 가격 → 캐디/여행사",
    uspConnection: "원스톱(항공+호텔+골프장) + 가격 경쟁력",
    contentHook: "50대 아버지를 위한 후쿠오카 골프 3박 패키지 실제 비용", stage: "Plan",
    dataProof: "일본골프여행 18,923/월(남성61%), 골프여행 5,600/월(40-50대84%)"
  },
  {
    id: "opp-i2", title: "신혼여행 커플 (발리 디폴트)", icon: "💍", interest: "신혼여행",
    totalMonthlyVol: 26843, annualVol: 331060,
    keyInsight: "발리가 디폴트 선택지. 비용→추천순위→풀빌라 순서",
    demographics: "여성 63% · 25-34세 88%", e3tag: null,
    destinations: ["발리", "하와이", "몰디브", "유럽"],
    pathJourney: "신혼여행 → 발리 → 비용 → 추천순위 → 풀빌라",
    uspConnection: "Trip.Best 허니문 랭킹 + 풀빌라 가격 비교",
    contentHook: "'발리 신혼여행 400만원이면 이 풀빌라 가능'", stage: "Dream",
    dataProof: "신혼여행 26,843/월, 성장률+20%"
  },
  {
    id: "opp-i3", title: "은퇴·한달살기 탐색자", icon: "🏠", interest: "한달살기",
    totalMonthlyVol: 11173, annualVol: 156790,
    keyInsight: "은퇴/세컨드라이프 직결. 치앙마이 10.5만+발리 4.8만. 비용이 핵심",
    demographics: "여성 63% · 40-50대 66%", e3tag: "Elderly",
    destinations: ["치앙마이", "발리", "다낭", "유럽"],
    pathJourney: "한달살기 → 해외 → 유럽/동남아 → 저렴한곳 → 치앙마이비용",
    uspConnection: "장기 숙소 예약 + 트립지니 현지 생활 가이드",
    contentHook: "'치앙마이 한달살기 150만원 리얼 가계부'", stage: "Dream",
    dataProof: "한달살기 11,173/월, 해외한달살기 확장 시 15만+/연"
  },
  {
    id: "opp-i4", title: "효도/부모님 여행 기획자", icon: "👨‍👩‍👧", interest: "효도여행",
    totalMonthlyVol: 6692, annualVol: 71640,
    keyInsight: "30대 자녀가 부모님 대신 검색. '후회' 감정이 강력한 트리거",
    demographics: "여성 79% · 30대 40%", e3tag: "Elderly",
    destinations: ["일본", "동남아", "유럽"],
    pathJourney: "부모님여행 → 60대/70대 → 효도여행 → 추천 → 후회/10계명",
    uspConnection: "24시간 한국어 CS + 시니어 맞춤 패키지",
    contentHook: "'부모님 첫 해외여행 보내드리기 전 꼭 알아야 할 것'", stage: "Dream",
    dataProof: "부모님해외여행 6,692/월, 효도여행 확장, 여성79%"
  },
  {
    id: "opp-i5", title: "자녀 영어캠프 기획 맘", icon: "📚", interest: "영어캠프",
    totalMonthlyVol: 2256, annualVol: 42340,
    keyInsight: "40대 엄마가 검색. 항공+숙소+캠프 따로 예약이 고통 — 원스톱 USP 직결",
    demographics: "여성 72% · 40대 46%", e3tag: null,
    destinations: ["세부", "괌", "호주"],
    pathJourney: "영어캠프 → 세부 → 비용 → 프로그램비교 → 항공",
    uspConnection: "원스톱 항공+숙소+액티비티 예약",
    contentHook: "'세부 영어캠프 4주, 항공부터 숙소까지 한번에 해결한 방법'", stage: "Plan",
    dataProof: "영어캠프 2,256/월, 40대엄마 46%, 원스톱USP직결"
  },
  {
    id: "opp-i6", title: "이벤트+여행 연결자", icon: "🎪", interest: "이벤트·콘서트·마라톤",
    totalMonthlyVol: 2579, annualVol: 30860,
    keyInsight: "트립닷컴 3E 전략 Event+Travel 핵심. 콘서트+마라톤+미식",
    demographics: "이벤트유형별 상이", e3tag: "Event",
    destinations: ["일본", "미국", "유럽", "태국"],
    pathJourney: "콘서트/마라톤/미식 → 일정확인 → 항공+숙소 → 예약",
    uspConnection: "이벤트 일정 연동 + 원스톱 예약",
    contentHook: "'도쿄마라톤 참가자를 위한 3박4일 러닝+관광 루트'", stage: "Plan",
    dataProof: "해외콘서트 186/월, 마라톤 1,070/월, 미식 1,323/월"
  }
];

// ── CONTENT TYPES (7) ──
const CONTENT_TYPES = [
  { id: "A", name: "진정성형", desc: "꾸밈없는 솔직 후기", stage: "Dream", color: "#4ECDC4" },
  { id: "B", name: "가성비 증명형", desc: "실제 영수증/경비 공개", stage: "Plan", color: "#FFE66D" },
  { id: "C", name: "일정/코스 가이드형", desc: "30초 동선 정리", stage: "Plan", color: "#A8E6CF" },
  { id: "D", name: "정보 발견형", desc: "관심사 90% + 여행 10%", stage: "Dream", color: "#FF6B6B" },
  { id: "E", name: "UGC 리뷰형", desc: "실제 이용 후기", stage: "Book", color: "#C9B1FF" },
  { id: "F", name: "USP 실증형", desc: "트립닷컴 기능이 주인공", stage: "Book", color: C.primary },
  { id: "G", name: "허락형", desc: '"당신도 가도 된다"', stage: "Dream", color: "#FF9A9E" },
];

// ── CREATOR TIERS (4) ──
const CREATOR_TIERS = [
  { tier: "MEGA", range: "100만+", count: "1~2건", cost: "3~8천만/편", kpi: "도달/브랜드 검색 리프트", color: C.gold },
  { tier: "MACRO", range: "10~100만", count: "5~10건", cost: "500~2,000만/편", kpi: "저장/공유율", color: C.primary },
  { tier: "MICRO", range: "1~10만", count: "20~50건", cost: "80~300만/편", kpi: "인게이지먼트/CTR", color: C.accent },
  { tier: "NANO", range: "1만 미만", count: "50~200건", cost: "20~80만/편", kpi: "UGC 볼륨", color: C.purple },
];

// ── USPS (5) ──
const USPS = [
  { id: "onestop", name: "원스톱 플랫폼", icon: "🔗", desc: "항공+호텔+액티비티 한 번에", detail: "접속 20~24회, 결정 9~11일의 과정을 하나의 플랫폼에서", pains: ["예약 따로따로 귀찮다", "가격 비교에 지친다"], rank: 1 },
  { id: "cs", name: "24시간 한국어 CS", icon: "🇰🇷", desc: "언제든 한국어 상담", detail: "효도/가족여행에서 가장 강력. 환불불안 해소", pains: ["해외에서 문제생기면?", "영어 못하면?"], rank: 2 },
  { id: "tripbest", name: "Trip.Best 랭킹", icon: "🏆", desc: "선택의 고통 해결", detail: "AI 기반 목적지/호텔/액티비티 추천 랭킹", pains: ["어디가 좋은지 모르겠다", "후기가 너무 많다"], rank: 3 },
  { id: "price", name: "가격 경쟁력", icon: "💰", desc: "최저가 보장 + 할인코드", detail: "아고다 대비 항공 강점, 호텔은 가격마다 다름", pains: ["최저가를 찾고 싶다"], rank: 4 },
  { id: "tripgenie", name: "트립지니 AI", icon: "🤖", desc: "AI 여행 플래너", detail: "이용자 +117%, AI 예약 +400%. 월 검색 58회지만 +83% 성장", pains: ["일정 짜기 귀찮다", "현지 정보를 모른다"], rank: 5 },
];

// ── SEASON DATA ──
const SEASON_DATA = {
  "오사카": [70,90,75,70,80,85,90,80,65,95,100,95],
  "후쿠오카": [85,70,65,60,70,80,90,75,60,90,95,100],
  "도쿄": [95,70,55,55,60,60,70,55,50,80,85,90],
  "다낭": [90,65,60,55,75,85,90,80,55,65,65,75],
  "방콕": [90,55,50,40,55,60,70,55,40,45,40,45],
  "대만": [85,60,55,50,55,60,55,50,55,65,65,70],
  "괌": [70,55,55,55,65,75,70,50,65,75,90,70],
  "하와이": [40,35,35,35,55,50,40,30,35,30,30,30],
  "유럽": [65,55,55,45,50,50,40,40,40,45,35,40],
  "스페인": [75,70,65,55,65,60,45,45,45,55,55,55],
};

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState({});
  const [selectedUsp, setSelectedUsp] = useState(null);

  const toggleCard = (id) => setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));

  const tabs = [
    { name: "기회 발견", icon: "◉" },
    { name: "콘텐츠 전략", icon: "◇" },
    { name: "USP × 크리에이터", icon: "▸" },
  ];

  const generateIdeas = async (oppId, context) => {
    setGenerating(true);
    try {
      const systemPrompt = `당신은 Trip.com 한국 숏폼 콘텐츠 전략가입니다. 검색 데이터 기반으로 숏폼 아이디어를 설계합니다.

규칙:
1. 후킹에 브랜드명(트립닷컴) 금지. 소비자 관심사로 시작
2. 관심사 90% + 여행 10% 공식 적용 (1편 기준)
3. 7가지 콘텐츠 유형: A.진정성형, B.가성비증명형, C.일정가이드형, D.정보발견형, E.UGC리뷰형, F.USP실증형, G.허락형
4. 결정 단계 태그: Dream/Plan/Book/Share
5. 시리즈 구성: 1편(90/10) → 2편(60/40) → 3편(30/70)
6. USP 5종: 원스톱/24시간CS/Trip.Best/가격/트립지니

반드시 JSON 배열로만 응답. 마크다운 없이.
[{"rank":1,"title":"제목","contentType":"A~G","stage":"Dream|Plan|Book|Share","hook3s":"0~3초 후킹카피","sceneFlow":["씬1","씬2","씬3","씬4"],"uspConnection":"연결USP","target":"타겟","creatorType":"MEGA|MACRO|MICRO|NANO","dataProof":"검색데이터근거","seriesNote":"시리즈구성제안"}]`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: systemPrompt,
          messages: [{ role: "user", content: context }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setGeneratedIdeas(prev => ({ ...prev, [oppId]: Array.isArray(parsed) ? parsed : [parsed] }));
    } catch (e) {
      console.error("API Error:", e);
      setGeneratedIdeas(prev => ({
        ...prev,
        [oppId]: [{ rank: 1, title: "API 연결을 확인해주세요", hook3s: "-", sceneFlow: ["-"], contentType: "-", stage: "-", uspConnection: "-", target: "-", creatorType: "-", dataProof: "-", seriesNote: "-" }]
      }));
    }
    setGenerating(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${C.dark} 0%, ${C.surface} 100%)`, color: C.text, fontFamily: "'Pretendard', -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header style={{ background: "rgba(10,22,40,0.95)", borderBottom: `1px solid ${C.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: C.primary, borderRadius: 8, padding: "6px 12px", fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>Trip.com</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>AI Brandformance Engine</div>
            <div style={{ fontSize: 10, color: C.textSoft, letterSpacing: 2, textTransform: "uppercase" }}>Pentacle x AI</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.textSoft }}>v3.0</div>
      </header>

      {/* TAB BAR */}
      <div style={{ background: C.dark, borderBottom: `1px solid ${C.border}`, padding: "0 24px", position: "sticky", top: 50, zIndex: 99 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 4, padding: "8px 0" }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              background: activeTab === i ? C.primary : "transparent",
              color: activeTab === i ? "#fff" : C.textSoft,
              border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer",
              fontSize: 13, fontWeight: activeTab === i ? 700 : 500, transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 10 }}>{tab.icon}</span> {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
        {activeTab === 0 && (
          <TabOpportunity
            expandedCards={expandedCards} toggleCard={toggleCard}
            generating={generating} generatedIdeas={generatedIdeas} generateIdeas={generateIdeas}
          />
        )}
        {activeTab === 1 && <TabContent />}
        {activeTab === 2 && (
          <TabUSP
            selectedUsp={selectedUsp} setSelectedUsp={setSelectedUsp}
            generating={generating} generatedIdeas={generatedIdeas} generateIdeas={generateIdeas}
            expandedCards={expandedCards} toggleCard={toggleCard}
          />
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 1: OPPORTUNITY DISCOVERY
// ══════════════════════════════════════════════════════════════
function TabOpportunity({ expandedCards, toggleCard, generating, generatedIdeas, generateIdeas }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* HERO */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 55%", minWidth: 320 }}>
          <div style={{ fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>TRIP.COM x PENTACLE</div>
          <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.3, marginBottom: 8 }}>AI Brandformance Engine</div>
          <div style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.6 }}>
            검색 데이터 기반 기회 발견 → 숏폼 콘텐츠 전략 → AI 아이디어 생성까지 원스톱 전략 시스템
          </div>
        </div>
        <div style={{ flex: "1 1 40%", minWidth: 300, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {[
            { label: "해외 출국자", value: "29.24M", sub: "2025년 내국인 해외관광", color: C.text },
            { label: "트립닷컴 검색", value: "9.49M", sub: "브랜드 직접 검색", color: C.primary },
            { label: "발견 공백", value: "14.60M+", sub: "목적지만 검색 (기회)", color: C.secondary },
          ].map((d, i) => (
            <div key={i} style={{ background: C.card, borderRadius: 16, padding: "16px 20px", minWidth: 150, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>{d.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: d.color }}>{d.value}</div>
              <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{d.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCEPT BANNER */}
      <div style={{ background: `linear-gradient(90deg, ${C.primary}15, ${C.secondary}10)`, borderRadius: 16, padding: "14px 24px", border: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
          검색 데이터에서 발견한 13개 기회 클러스터 — 각 기회에서 바로 숏폼 아이디어를 AI 생성합니다
        </div>
      </div>

      {/* CATEGORY A: DESTINATION */}
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>A. 여행 목적지에서 출발한 기회</div>
        <div style={{ fontSize: 13, color: C.textSoft, marginBottom: 16 }}>목적지 검색 데이터 기반 7개 기회 클러스터</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {DESTINATION_OPPORTUNITIES.map(opp => (
            <OpportunityCard
              key={opp.id} opp={opp} color={C.primary}
              expandedCards={expandedCards} toggleCard={toggleCard}
              generating={generating} generatedIdeas={generatedIdeas} generateIdeas={generateIdeas}
            />
          ))}
        </div>
      </div>

      {/* CATEGORY B: INTEREST */}
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>B. 소비자 관심사에서 출발한 기회</div>
        <div style={{ fontSize: 13, color: C.textSoft, marginBottom: 16 }}>라이프스타일 관심사 기반 6개 기회 클러스터</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {INTEREST_OPPORTUNITIES.map(opp => (
            <OpportunityCard
              key={opp.id} opp={opp} color={C.secondary}
              expandedCards={expandedCards} toggleCard={toggleCard}
              generating={generating} generatedIdeas={generatedIdeas} generateIdeas={generateIdeas}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// OPPORTUNITY CARD (Collapse / Expand)
// ══════════════════════════════════════════════════════════════
function OpportunityCard({ opp, color, expandedCards, toggleCard, generating, generatedIdeas, generateIdeas }) {
  const isOpen = expandedCards[opp.id];
  const ideas = generatedIdeas[opp.id] || [];
  const stageColor = STAGE_COLORS[opp.stage] || C.primary;

  const handleGenerate = () => {
    const context = `기회: ${opp.title}
총월간검색량: ${opp.totalMonthlyVol.toLocaleString()}
인구통계: ${opp.demographics}
검색여정: ${opp.pathJourney}
USP연결: ${opp.uspConnection}
콘텐츠훅예시: ${opp.contentHook}
데이터근거: ${opp.dataProof}
결정단계: ${opp.stage}

이 기회에서 숏폼 아이디어 5개를 생성해주세요.`;
    generateIdeas(opp.id, context);
  };

  return (
    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, borderLeft: `3px solid ${color}`, overflow: "hidden" }}>
      {/* COLLAPSED */}
      <div onClick={() => toggleCard(opp.id)} style={{ padding: 24, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{opp.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{opp.title}</div>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, fontWeight: 700, background: `${stageColor}25`, color: stageColor }}>{opp.stage}</span>
            {opp.e3tag && (
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, fontWeight: 700, background: `${C.gold}20`, color: C.gold }}>{opp.e3tag}</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: C.primary }}>{opp.totalMonthlyVol.toLocaleString()}</span>
            <span style={{ fontSize: 11, color: C.textSoft }}>/월</span>
            <span style={{ fontSize: 11, color: C.textSoft }}>· 연간 {opp.annualVol.toLocaleString()}</span>
          </div>
          <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, lineHeight: 1.5 }}>{opp.keyInsight}</div>
        </div>
        <span style={{ fontSize: 18, color: C.textSoft, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>▾</span>
      </div>

      {/* EXPANDED */}
      {isOpen && (
        <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 16 }}>
            <div style={{ background: C.surface, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>인구통계</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{opp.demographics}</div>
            </div>
            <div style={{ background: C.surface, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>피크 시즌</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{opp.peakSeason}</div>
            </div>
            <div style={{ background: C.surface, borderRadius: 12, padding: 14, gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>검색 여정</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {opp.pathJourney.split("→").map((step, i, arr) => (
                  <span key={i}>
                    <span style={{ color: C.text }}>{step.trim()}</span>
                    {i < arr.length - 1 && <span style={{ color: C.primary, margin: "0 4px" }}> → </span>}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ background: C.surface, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>USP 연결</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>{opp.uspConnection}</div>
            </div>
            <div style={{ background: C.surface, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>데이터 근거</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{opp.dataProof}</div>
            </div>
            <div style={{ background: `${C.secondary}10`, borderRadius: 12, padding: 14, gridColumn: "1 / -1", border: `1px solid ${C.secondary}30` }}>
              <div style={{ fontSize: 11, color: C.secondary, marginBottom: 4, fontWeight: 700 }}>콘텐츠 훅 예시</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{opp.contentHook}</div>
            </div>
          </div>

          {/* GENERATE BUTTON */}
          <button onClick={handleGenerate} disabled={generating} style={{
            marginTop: 16, background: generating ? C.textSoft : C.primary, color: "#fff",
            border: "none", borderRadius: 12, padding: "0 28px", fontSize: 15, fontWeight: 700,
            cursor: generating ? "wait" : "pointer", width: "100%", height: 48, transition: "all 0.2s",
          }}>
            {generating ? "아이디어 생성 중..." : "🎬 이 기회에서 숏폼 아이디어 생성"}
          </button>

          {/* IDEAS */}
          {ideas.length > 0 && (
            <IdeaCards ideas={ideas} expandedCards={expandedCards} toggleCard={toggleCard} prefix={opp.id} />
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// IDEA CARDS
// ══════════════════════════════════════════════════════════════
function IdeaCards({ ideas, expandedCards, toggleCard, prefix }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.accent }}>숏폼 아이디어 {ideas.length}개 생성 완료</div>
      {ideas.map((idea, i) => {
        const cardId = `${prefix}-idea-${i}`;
        const isOpen = expandedCards[cardId];
        const typeInfo = CONTENT_TYPES.find(t => t.id === idea.contentType) || CONTENT_TYPES[0];
        const stageColor = STAGE_COLORS[idea.stage] || C.primary;
        return (
          <div key={i} style={{ background: C.surface, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {/* COLLAPSED */}
            <div onClick={() => toggleCard(cardId)} style={{ padding: "14px 16px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ background: C.primary, color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>#{idea.rank || i + 1}</span>
                    <span style={{ background: `${typeInfo.color}30`, color: typeInfo.color, fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{idea.contentType}. {typeInfo.name}</span>
                    <span style={{ background: `${stageColor}25`, color: stageColor, fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{idea.stage}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{idea.title}</div>
                  <div style={{ fontSize: 12, color: C.secondary, fontWeight: 600 }}>🎣 "{idea.hook3s}"</div>
                </div>
                <span style={{ fontSize: 16, color: C.textSoft, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
              </div>
              {/* SCENE FLOW */}
              <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                {(idea.sceneFlow || []).map((scene, j) => (
                  <div key={j} style={{ background: `${C.primary}10`, borderRadius: 6, padding: "4px 8px", fontSize: 10, color: C.text, border: `1px solid ${C.primary}20`, flex: "1 1 100px", textAlign: "center" }}>
                    <span style={{ color: C.primary, fontWeight: 700 }}>{j + 1}.</span> {scene}
                  </div>
                ))}
              </div>
              {/* USP */}
              <div style={{ fontSize: 11, color: C.accent, marginTop: 6, fontWeight: 600 }}>USP: {idea.uspConnection}</div>
            </div>

            {/* EXPANDED */}
            {isOpen && (
              <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <span style={{ fontSize: 10, color: C.textSoft }}>타겟</span>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{idea.target}</div>
                </div>
                <div>
                  <span style={{ fontSize: 10, color: C.textSoft }}>크리에이터</span>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{idea.creatorType}</div>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <span style={{ fontSize: 10, color: C.textSoft }}>데이터 근거</span>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.accent }}>{idea.dataProof}</div>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <span style={{ fontSize: 10, color: C.textSoft }}>시리즈 구성</span>
                  <div style={{ fontSize: 12 }}>{idea.seriesNote}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 2: CONTENT STRATEGY
// ══════════════════════════════════════════════════════════════
function TabContent() {
  const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* SEASON HEATMAP */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>시즌 캘린더 히트맵</div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 700 }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px repeat(12, 1fr)", gap: 2 }}>
              <div />
              {months.map(m => (
                <div key={m} style={{ fontSize: 10, textAlign: "center", color: C.textSoft, padding: 4 }}>{m}</div>
              ))}
              {Object.entries(SEASON_DATA).map(([dest, vals]) => (
                <div key={dest} style={{ display: "contents" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", paddingRight: 8 }}>{dest}</div>
                  {vals.map((v, i) => {
                    const intensity = v / 100;
                    const bg = intensity > 0.8 ? C.primary : intensity > 0.6 ? `${C.primary}90` : intensity > 0.4 ? `${C.primary}50` : `${C.primary}25`;
                    return (
                      <div key={`${dest}-${i}`} style={{ background: bg, borderRadius: 4, padding: "6px 2px", textAlign: "center", fontSize: 10, fontWeight: v > 80 ? 700 : 400, color: v > 60 ? "#fff" : C.textSoft }}>
                        {v}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 7 CONTENT TYPES */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>7가지 콘텐츠 유형 가이드</div>
        <div style={{ fontSize: 13, color: C.textSoft, marginBottom: 16 }}>결정 단계(Dream → Plan → Book → Share)에 따른 최적 콘텐츠 유형</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {CONTENT_TYPES.map(ct => (
            <div key={ct.id} style={{ background: C.surface, borderRadius: 12, padding: 16, borderLeft: `3px solid ${ct.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{ct.id}. {ct.name}</span>
                <span style={{ fontSize: 10, background: `${ct.color}20`, color: ct.color, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{ct.stage}</span>
              </div>
              <div style={{ fontSize: 13, color: C.textSoft }}>{ct.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERIES STRUCTURE */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>시리즈 숏폼 연작 구조 (90/10 공식)</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { ep: "1편 — 피드 유입", ratio: "관심사 90% + 여행 10%", desc: "알고리즘 최적화. 여행 태그 최소", color: C.accent },
            { ep: "2편 — 심화", ratio: "관심사 60% + 여행 40%", desc: "같은 크리에이터, 여행 비중 확대", color: C.primary },
            { ep: "3편 — 전환", ratio: "관심사 30% + 여행 70%", desc: "트립닷컴 제품 인터페이스 노출", color: C.secondary },
          ].map((ep, i) => (
            <div key={i} style={{ flex: "1 1 200px", background: C.surface, borderRadius: 16, padding: 24, border: `1px solid ${ep.color}30` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: ep.color, marginBottom: 6 }}>{ep.ep}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{ep.ratio}</div>
              <div style={{ fontSize: 11, color: C.textSoft }}>{ep.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DECISION STAGE FLOW */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>소비자 결정 단계 x 콘텐츠 매핑</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { stage: "Dream", icon: "💭", desc: "꿈꾸기 (3-4주 전)", types: "A.진정성 / D.발견 / G.허락", color: "#FF9A9E" },
            { stage: "Plan", icon: "📋", desc: "계획 (1-2주 전)", types: "B.가성비 / C.코스가이드", color: "#A8E6CF" },
            { stage: "Book", icon: "✈️", desc: "예약 (3-5일 전)", types: "E.UGC / F.USP실증", color: C.primary },
            { stage: "Share", icon: "📸", desc: "공유 (여행 후)", types: "UGC 재생산 유도", color: C.gold },
          ].map((s, i, arr) => (
            <div key={s.stage} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ background: `${s.color}15`, borderRadius: 16, padding: 24, textAlign: "center", flex: "1 1 160px", border: `1px solid ${s.color}40`, minWidth: 160 }}>
                <div style={{ fontSize: 28 }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: s.color, marginTop: 4 }}>{s.stage}</div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{s.desc}</div>
                <div style={{ fontSize: 10, fontWeight: 600, marginTop: 6, color: C.text }}>{s.types}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ color: C.textSoft, fontSize: 18, flexShrink: 0 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// TAB 3: USP x CREATOR
// ══════════════════════════════════════════════════════════════
function TabUSP({ selectedUsp, setSelectedUsp, generating, generatedIdeas, generateIdeas, expandedCards, toggleCard }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* USP CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {USPS.map(usp => (
          <button key={usp.id} onClick={() => setSelectedUsp(usp.id === selectedUsp ? null : usp.id)} style={{
            background: usp.id === selectedUsp ? `${C.primary}25` : C.card,
            border: `1px solid ${usp.id === selectedUsp ? C.primary : C.border}`,
            borderRadius: 16, padding: 24, cursor: "pointer", textAlign: "left", color: C.text, transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{usp.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{usp.name}</div>
            <div style={{ fontSize: 11, color: C.textSoft, marginTop: 4 }}>{usp.desc}</div>
            <div style={{ fontSize: 10, color: C.warn, marginTop: 6 }}>
              {usp.pains[0]}
            </div>
          </button>
        ))}
      </div>

      {/* SELECTED USP DETAIL */}
      {selectedUsp && (() => {
        const usp = USPS.find(x => x.id === selectedUsp);
        if (!usp) return null;
        const oppId = `usp-${usp.id}`;
        const ideas = generatedIdeas[oppId] || [];

        const handleGenerate = () => {
          const context = `USP: ${usp.name}
설명: ${usp.detail}
소비자페인: ${usp.pains.join(", ")}

이 USP를 중심으로:
1. 접근법 A(USP중심): 이 USP가 주인공인 F.USP실증형 콘텐츠 2개
2. 접근법 B(타겟중심): 관심사 크리에이터가 자연스럽게 이 USP를 발견하는 D.정보발견형 콘텐츠 3개
총 5개의 숏폼 아이디어를 생성해주세요.`;
          generateIdeas(oppId, context);
        };

        return (
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.primary}40` }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{usp.icon} {usp.name}</div>
            <div style={{ fontSize: 13, color: C.textSoft, marginTop: 4 }}>{usp.detail}</div>

            {/* PAIN POINTS */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>소비자 페인포인트 매칭</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {usp.pains.map((p, i) => (
                  <span key={i} style={{ background: `${C.warn}15`, color: C.warn, fontSize: 12, padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.warn}30` }}>{p}</span>
                ))}
              </div>
            </div>

            {/* CREATOR TIERS */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>크리에이터 티어별 전략</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                {CREATOR_TIERS.map(ct => (
                  <div key={ct.tier} style={{ background: C.surface, borderRadius: 12, padding: 16, borderLeft: `3px solid ${ct.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: ct.color }}>{ct.tier}</span>
                      <span style={{ fontSize: 11, color: C.textSoft }}>{ct.range}</span>
                    </div>
                    <div style={{ fontSize: 12, marginTop: 6 }}>{ct.count} · {ct.cost}</div>
                    <div style={{ fontSize: 11, color: C.accent, marginTop: 4 }}>KPI: {ct.kpi}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TWO APPROACHES */}
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: C.surface, borderRadius: 16, padding: 24, border: `1px solid ${C.primary}30` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>접근법 A — USP 중심</div>
                <div style={{ fontSize: 13, color: C.textSoft, marginTop: 6 }}>"{usp.name}" USP에 가장 적합한 크리에이터를 찾고, 그 크리에이터의 스타일에 맞는 콘텐츠를 설계</div>
              </div>
              <div style={{ background: C.surface, borderRadius: 16, padding: 24, border: `1px solid ${C.secondary}30` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.secondary }}>접근법 B — 타겟 중심</div>
                <div style={{ fontSize: 13, color: C.textSoft, marginTop: 6 }}>관심사 크리에이터(골프/미식/육아)가 여행을 자연스럽게 말하도록 설계. 크리에이터의 기존 팬층 활용</div>
              </div>
            </div>

            {/* GENERATE */}
            <button onClick={handleGenerate} disabled={generating} style={{
              marginTop: 16, background: generating ? C.textSoft : C.primary, color: "#fff",
              border: "none", borderRadius: 12, padding: "0 28px", fontSize: 15, fontWeight: 700,
              cursor: generating ? "wait" : "pointer", width: "100%", height: 48, transition: "all 0.2s",
            }}>
              {generating ? "아이디어 생성 중..." : "🎬 USP x 크리에이터 아이디어 생성"}
            </button>

            {ideas.length > 0 && (
              <IdeaCards ideas={ideas} expandedCards={expandedCards} toggleCard={toggleCard} prefix={oppId} />
            )}
          </div>
        );
      })()}
    </div>
  );
}
