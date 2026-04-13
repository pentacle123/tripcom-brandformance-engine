"use client";
import React, { useState, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
// Trip.com AI Brandformance Engine v2.0
// 4-Tab Structure | Hardcoded ListeningMind Data | Claude API
// ═══════════════════════════════════════════════════════════

// ── COLOR SYSTEM ──
const C = {
  primary: "#0770E3",    // Trip.com Blue
  secondary: "#FF6B00",  // Trip.com Orange
  dark: "#0A1628",
  card: "#111B2E",
  cardHover: "#162240",
  surface: "#0D1520",
  border: "rgba(7,112,227,0.15)",
  text: "#E8ECF1",
  textSoft: "#8B99AE",
  accent: "#00D4AA",
  warn: "#FF4757",
  gold: "#FFD700",
  purple: "#8B5CF6",
};

// ── DESTINATION DATA (ListeningMind keyword_info) ──
const DESTINATIONS = [
  { id: "osaka", name: "오사카", flag: "🇯🇵", vol: 174266, annual: 1918800, trend: -0.30, gender: { m: 32.6, f: 67.4 }, age: { "20대": 4.9, "25-29": 10.6, "30대": 25.3, "40대": 34.5, "50대+": 23.4 }, topSearch: "맛집", topVol: 73090, region: "일본", peak: [10,11,12,1] },
  { id: "fukuoka", name: "후쿠오카", flag: "🇯🇵", vol: 209666, annual: 2348500, trend: -0.17, gender: { m: 32.8, f: 67.2 }, age: { "20대": 4.3, "25-29": 10.8, "30대": 26.9, "40대": 30.7, "50대+": 26.5 }, topSearch: "맛집", topVol: 45000, region: "일본", peak: [10,11,12,1] },
  { id: "tokyo", name: "도쿄", flag: "🇯🇵", vol: 134566, annual: 1495300, trend: -0.27, gender: { m: 29.0, f: 71.0 }, age: { "20대": 6.9, "25-29": 15.6, "30대": 30.6, "40대": 28.2, "50대+": 17.3 }, topSearch: "관광지", topVol: 40000, region: "일본", peak: [10,11,12,1] },
  { id: "kyoto", name: "교토", flag: "🇯🇵", vol: 55790, annual: 639560, trend: -0.07, gender: { m: 27.1, f: 72.9 }, age: { "20대": 5.9, "25-29": 14.6, "30대": 29.1, "40대": 25.2, "50대+": 24.1 }, topSearch: "사원", topVol: 18000, region: "일본", peak: [10,11,3,4] },
  { id: "sapporo", name: "삿포로", flag: "🇯🇵", vol: 91766, annual: 1198620, trend: -0.48, gender: { m: 32.2, f: 67.8 }, age: { "20대": 4.4, "25-29": 11.3, "30대": 28.3, "40대": 28.9, "50대+": 26.1 }, topSearch: "눈축제", topVol: 30000, region: "일본", peak: [11,12,1,2] },
  { id: "danang", name: "다낭", flag: "🇻🇳", vol: 75116, annual: 920530, trend: -0.21, gender: { m: 34.3, f: 65.7 }, age: { "20대": 4.6, "25-29": 10.1, "30대": 27.8, "40대": 31.7, "50대+": 25.1 }, topSearch: "리조트", topVol: 23406, region: "동남아", peak: [1,5,6,7] },
  { id: "nhatrang", name: "나트랑", flag: "🇻🇳", vol: 99533, annual: 1233700, trend: -0.14, gender: { m: 30.6, f: 69.4 }, age: { "20대": 3.1, "25-29": 8.9, "30대": 25.0, "40대": 32.6, "50대+": 30.0 }, topSearch: "리조트", topVol: 35000, region: "동남아", peak: [1,5,6,7] },
  { id: "bangkok", name: "방콕", flag: "🇹🇭", vol: 55550, annual: 706990, trend: -0.12, gender: { m: 29.0, f: 71.0 }, age: { "20대": 5.6, "25-29": 15.7, "30대": 31.6, "40대": 27.0, "50대+": 19.3 }, topSearch: "맛집", topVol: 9610, region: "동남아", peak: [1,7,8,12] },
  { id: "thailand", name: "태국", flag: "🇹🇭", vol: 73976, annual: 999130, trend: -0.39, gender: { m: 35.5, f: 64.5 }, age: { "20대": 5.2, "25-29": 12.5, "30대": 24.1, "40대": 25.4, "50대+": 31.4 }, topSearch: "여행코스", topVol: 25000, region: "동남아", peak: [1,7,12] },
  { id: "taiwan", name: "대만", flag: "🇹🇼", vol: 186300, annual: 2301600, trend: -0.28, gender: { m: 27.7, f: 72.3 }, age: { "20대": 6.6, "25-29": 13.1, "30대": 23.0, "40대": 26.5, "50대+": 29.4 }, topSearch: "맛집", topVol: 9553, region: "동아시아", peak: [12,1,10,11] },
  { id: "guam", name: "괌", flag: "🇬🇺", vol: 60576, annual: 845530, trend: -0.36, gender: { m: 33.1, f: 66.9 }, age: { "20대": 5.7, "25-29": 13.8, "30대": 35.6, "40대": 30.4, "50대+": 13.7 }, topSearch: "맛집", topVol: 9636, region: "미주", peak: [1,4,5,6] },
  { id: "hawaii", name: "하와이", flag: "🇺🇸", vol: 32783, annual: 474260, trend: -0.12, gender: { m: 29.4, f: 70.6 }, age: { "20대": 3.9, "25-29": 11.0, "30대": 26.5, "40대": 27.2, "50대+": 30.4 }, topSearch: "비용", topVol: 12000, region: "미주", peak: [1,5,6,7] },
  { id: "europe", name: "유럽", flag: "🇪🇺", vol: 45586, annual: 563700, trend: 0.03, gender: { m: 26.3, f: 73.7 }, age: { "20대": 9.0, "25-29": 12.9, "30대": 22.8, "40대": 21.2, "50대+": 31.2 }, topSearch: "패키지", topVol: 15000, region: "유럽", peak: [1,3,5,8] },
  { id: "spain", name: "스페인", flag: "🇪🇸", vol: 67973, annual: 754380, trend: -0.03, gender: { m: 21.4, f: 78.6 }, age: { "20대": 6.4, "25-29": 12.9, "30대": 22.2, "40대": 19.2, "50대+": 36.9 }, topSearch: "여행코스", topVol: 18000, region: "유럽", peak: [1,3,9,10] },
  { id: "italy", name: "이탈리아", flag: "🇮🇹", vol: 54613, annual: 596740, trend: 0.07, gender: { m: 22.6, f: 77.4 }, age: { "20대": 7.2, "25-29": 13.0, "30대": 23.1, "40대": 19.3, "50대+": 33.9 }, topSearch: "맛집", topVol: 923, region: "유럽", peak: [1,5,9,10] },
  { id: "switzerland", name: "스위스", flag: "🇨🇭", vol: 52466, annual: 660480, trend: 0.08, gender: { m: 27.4, f: 72.6 }, age: { "20대": 9.0, "25-29": 14.4, "30대": 23.1, "40대": 17.4, "50대+": 29.9 }, topSearch: "경비", topVol: 4000, region: "유럽", peak: [5,6,7,8] },
];

// ── COMPETITOR OTA DATA ──
const COMPETITORS = [
  { name: "스카이스캐너", vol: 3177500, color: "#00B2E3", note: "트립닷컴 자회사" },
  { name: "아고다", vol: 1607766, color: "#EE2E24" },
  { name: "네이버 항공권", vol: 1577233, color: "#03CF5D" },
  { name: "트립닷컴", vol: 790533, color: C.primary },
  { name: "마이리얼트립", vol: 578100, color: "#FF5A5F" },
  { name: "호텔스컴바인", vol: 110266, color: "#F5A623" },
  { name: "트립지니", vol: 58, color: C.purple, note: "AI +83% 성장" },
];

// ── LIFE INTEREST DATA ──
const INTERESTS = [
  { id: "honeymoon", name: "신혼여행", icon: "💍", vol: 26843, annual: 331060, growth: 0.20, gender: { m: 36.7, f: 63.3 }, ageMain: "25-34세 88%", e3: "—", destinations: ["발리", "하와이", "몰디브", "유럽"], decisionStage: "Dream", keyInsight: "발리가 디폴트. 비용→추천순위→풀빌라가 검색 여정" },
  { id: "golf-japan", name: "일본 골프 여행", icon: "⛳", vol: 18923, annual: 218910, growth: -0.28, gender: { m: 61.3, f: 38.7 }, ageMain: "50대+ 54%", e3: "Elderly", destinations: ["후쿠오카", "나고야", "홋카이도"], decisionStage: "Plan", keyInsight: "여행 검색 전체가 여성인데 골프만 남성 다수 — 완전히 다른 타겟" },
  { id: "monthly-living", name: "한달살기", icon: "🏠", vol: 11173, annual: 156790, growth: 0.11, gender: { m: 37.2, f: 62.8 }, ageMain: "40-50대 66%", e3: "Elderly", destinations: ["치앙마이", "발리", "다낭", "유럽"], decisionStage: "Dream", keyInsight: "은퇴/세컨드라이프 직결. 치앙마이 10.5만+발리 4.8만" },
  { id: "golf-total", name: "골프 여행(종합)", icon: "🏌️", vol: 5600, annual: 66080, growth: -0.36, gender: { m: 55.6, f: 44.4 }, ageMain: "40-50대 84%", e3: "Elderly", destinations: ["태국", "베트남", "일본", "필리핀"], decisionStage: "Plan", keyInsight: "동남아→태국→가격→캐디 순서. 황제투어 수요도 존재" },
  { id: "parents", name: "부모님/효도여행", icon: "👨‍👩‍👧", vol: 6692, annual: 71640, growth: 0.03, gender: { m: 21.3, f: 78.7 }, ageMain: "30대 40%", e3: "Elderly", destinations: ["일본", "동남아", "유럽"], decisionStage: "Dream", keyInsight: "30대 자녀가 검색. '후회' 감정이 강력. 24시간 CS 최적 소구" },
  { id: "english-camp", name: "영어캠프", icon: "📚", vol: 2256, annual: 42340, growth: -0.26, gender: { m: 27.9, f: 72.1 }, ageMain: "40대 46%", e3: "—", destinations: ["세부", "괌", "호주"], decisionStage: "Plan", keyInsight: "엄마가 검색. 항공+숙소+캠프 원스톱 예약 USP 직결" },
  { id: "gourmet", name: "미식 여행", icon: "🍽️", vol: 1323, annual: 16180, growth: -0.09, gender: { m: 36.6, f: 63.4 }, ageMain: "25-40대 분산", e3: "Event", destinations: ["일본", "이탈리아", "스페인", "태국"], decisionStage: "Dream", keyInsight: "오사카 맛집 73K — 맛집이 여행의 Entry Point" },
  { id: "marathon", name: "해외 마라톤", icon: "🏃", vol: 1070, annual: 11430, growth: -0.11, gender: { m: 68.1, f: 31.9 }, ageMain: "30-40대 74%", e3: "Event", destinations: ["도쿄", "보스턴", "베를린", "호놀룰루"], decisionStage: "Plan", keyInsight: "Event+Travel 직결. 남성 68%, 이벤트형 콘텐츠 최적" },
  { id: "concert", name: "해외 콘서트", icon: "🎵", vol: 186, annual: 3221, growth: -0.01, gender: { m: 34.1, f: 65.9 }, ageMain: "20대 23%", e3: "Event", destinations: ["일본", "미국", "유럽"], decisionStage: "Dream", keyInsight: "트립닷컴 3E 전략 Event+Travel 핵심. 검색량 소규모지만 전환율 높음" },
];

// ── TRIPCOM USP DATA ──
const USPS = [
  { id: "onestop", name: "원스톱 플랫폼", icon: "🔗", desc: "항공+호텔+액티비티 한 번에", detail: "접속 20~24회, 결정 9~11일의 과정을 하나의 플랫폼에서", pains: ["예약 따로따로 귀찮다", "가격 비교에 지친다"], rank: 1 },
  { id: "cs", name: "24시간 한국어 CS", icon: "🇰🇷", desc: "언제든 한국어 상담", detail: "효도/가족여행에서 가장 강력. 환불불안 해소", pains: ["해외에서 문제생기면?", "영어 못하면?"], rank: 2 },
  { id: "tripbest", name: "Trip.Best 랭킹", icon: "🏆", desc: "선택의 고통 해결", detail: "AI 기반 목적지/호텔/액티비티 추천 랭킹", pains: ["어디가 좋은지 모르겠다", "후기가 너무 많다"], rank: 3 },
  { id: "price", name: "가격 경쟁력", icon: "💰", desc: "최저가 보장 + 할인코드", detail: "아고다 대비 항공 강점, 호텔은 가격마다 다름", pains: ["최저가를 찾고 싶다"], rank: 4 },
  { id: "tripgenie", name: "트립지니 AI", icon: "🤖", desc: "AI 여행 플래너", detail: "이용자 +117%, AI 예약 +400%. 월 검색 58회지만 +83% 성장", pains: ["일정 짜기 귀찮다", "현지 정보를 모른다"], rank: 5 },
];

// ── CONTENT TYPES (7 Types) ──
const CONTENT_TYPES = [
  { id: "A", name: "진정성형", desc: "꾸밈없는 솔직 후기", stage: "Dream", color: "#4ECDC4" },
  { id: "B", name: "가성비 증명형", desc: "실제 영수증/경비 공개", stage: "Plan", color: "#FFE66D" },
  { id: "C", name: "일정/코스 가이드형", desc: "30초 동선 정리", stage: "Plan", color: "#A8E6CF" },
  { id: "D", name: "정보 발견형", desc: "관심사 90% + 여행 10%", stage: "Dream", color: "#FF6B6B" },
  { id: "E", name: "UGC 리뷰형", desc: "실제 이용 후기", stage: "Book", color: "#C9B1FF" },
  { id: "F", name: "USP 실증형", desc: "트립닷컴 기능이 주인공", stage: "Book", color: C.primary },
  { id: "G", name: "허락형", desc: '"당신도 가도 된다"', stage: "Dream", color: "#FF9A9E" },
];

// ── CREATOR TIERS ──
const CREATOR_TIERS = [
  { tier: "MEGA", range: "100만+", count: "1~2건", cost: "3~8천만/편", kpi: "도달/브랜드 검색 리프트", color: C.gold },
  { tier: "MACRO", range: "10~100만", count: "5~10건", cost: "500~2,000만/편", kpi: "저장/공유율", color: C.primary },
  { tier: "MICRO", range: "1~10만", count: "20~50건", cost: "80~300만/편", kpi: "인게이지먼트/CTR", color: C.accent },
  { tier: "NANO", range: "1만 미만", count: "50~200건", cost: "20~80만/편", kpi: "UGC 볼륨", color: C.purple },
];

// ── PATH FINDER INSIGHTS (Summarized) ──
const PATH_INSIGHTS = {
  "오사카 맛집": { paths: 50, journey: "맛집 → 맛집거리 → 관광지 → 동선 → 근교여행", insight: "맛집에서 시작해서 여행 전체를 계획하게 됨", topNodes: ["규카츠 모토무라", "도톤보리", "난바", "신사이바시", "관광지 추천"] },
  "다낭 3박4일": { paths: 50, journey: "3박4일 → 패키지 → 3박5일 → 경비 → 준비물/맛집", insight: "일정 → 경비가 두 번째 관문", topNodes: ["베트남 패키지", "호이안", "자유여행", "경비", "맛집"] },
  "방콕 가족여행": { paths: 50, journey: "가족여행 → 파타야 → 안전/주의사항 → 효도여행", insight: "가족=안전 최우선, 파타야 연결, 효도여행 역류", topNodes: ["파타야", "안전", "여행코스", "효도여행", "호텔"] },
  "유럽 여행": { paths: 50, journey: "유럽 → 나라/지도 → 패키지 → 혼자여행 → 자전거여행", insight: "지리 학습부터 시작. 다양한 여행 유형", topNodes: ["지도", "나라", "패키지", "혼자여행", "필수코스"] },
  "신혼여행": { paths: 50, journey: "신혼여행 → 발리 → 비용 → 추천순위 → 풀빌라", insight: "발리=디폴트. 비용이 핵심 의사결정 요인", topNodes: ["발리", "비용", "추천순위", "풀빌라", "허니문 여행사"] },
  "골프 여행": { paths: 50, journey: "골프여행 → 동남아 → 태국 → 가격 → 여행사/캐디", insight: "가격+여행사 비교. 황제투어 수요 존재", topNodes: ["동남아", "태국", "골프투어로", "패키지", "캐디"] },
  "한달살기": { paths: 50, journey: "한달살기 → 해외 → 유럽/동남아 → 저렴한곳 → 치앙마이비용", insight: "해외 vs 국내 분기, 동남아가 가성비 압도", topNodes: ["해외", "유럽", "동남아", "치앙마이", "비용"] },
  "부모님 해외여행": { paths: 50, journey: "부모님여행 → 60대/70대 → 효도여행 → 추천 → 후회/10계명", insight: "'후회' 감정이 강력한 트리거. 가족여행 10계명 콘텐츠", topNodes: ["60대", "70대", "효도여행", "추천", "후회"] },
};

// ── SEASON HEATMAP DATA ──
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

// ═══════════ MAIN COMPONENT ═══════════
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [discoveryMode, setDiscoveryMode] = useState("destination"); // destination | interest
  const [selectedDest, setSelectedDest] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [selectedUsp, setSelectedUsp] = useState(null);
  const [pathInsightOpen, setPathInsightOpen] = useState(null);

  const tabs = [
    { name: "Market Intelligence", icon: "◉" },
    { name: "Discovery Engine", icon: "◆" },
    { name: "Content Strategy", icon: "◇" },
    { name: "USP × Creator Match", icon: "▸" },
  ];

  const toggleCard = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ── CLAUDE API CALL ──
  const generateIdeas = async (context) => {
    setGenerating(true);
    setGeneratedIdeas([]);
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
      setGeneratedIdeas(Array.isArray(parsed) ? parsed : [parsed]);
    } catch (e) {
      console.error("API Error:", e);
      setGeneratedIdeas([{ rank: 1, title: "API 연결을 확인해주세요", hook3s: "-", sceneFlow: ["-"], contentType: "-", stage: "-", uspConnection: "-", target: "-", creatorType: "-", dataProof: "-", seriesNote: "-" }]);
    }
    setGenerating(false);
  };

  // ═══════════ RENDER ═══════════
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${C.dark} 0%, ${C.surface} 100%)`, color: C.text, fontFamily: "'Pretendard', -apple-system, sans-serif" }}>
      {/* ── HEADER ── */}
      <header style={{ background: "rgba(10,22,40,0.95)", borderBottom: `1px solid ${C.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: C.primary, borderRadius: 8, padding: "6px 12px", fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>Trip.com</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>AI Brandformance Engine</div>
            <div style={{ fontSize: 10, color: C.textSoft, letterSpacing: 2, textTransform: "uppercase" }}>한국 검색 행태 특화 숏폼 전략 시스템</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.textSoft }}>Pentacle × AI</div>
      </header>
      {/* ── HERO ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.primary}15, ${C.dark})`, padding: "28px 24px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ fontSize: 11, color: C.primary, fontWeight: 600, letterSpacing: 2, marginBottom: 6 }}>DISCOVERY GAP DASHBOARD</div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3 }}>관심사에서 여행을 발견하게 하는<br/>데이터 기반 숏폼 전략</div>
          </div>
          <div style={{ flex: "1 1 400px", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {[
              { label: "해외 출국자", value: "29.24M", sub: "2025년 내국인 해외관광", color: C.text },
              { label: "트립닷컴 검색", value: "9.49M", sub: "브랜드 직접 검색", color: C.primary },
              { label: "발견 공백", value: "14.60M+", sub: "목적지만 검색 (기회)", color: C.secondary },
            ].map((d, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 12, padding: "14px 18px", minWidth: 150, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.textSoft, marginBottom: 4 }}>{d.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: d.color }}>{d.value}</div>
                <div style={{ fontSize: 10, color: C.textSoft, marginTop: 2 }}>{d.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB BAR ── */}
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

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
        {activeTab === 0 && <TabMarket />}
        {activeTab === 1 && <TabDiscovery discoveryMode={discoveryMode} setDiscoveryMode={setDiscoveryMode} selectedDest={selectedDest} setSelectedDest={setSelectedDest} selectedInterest={selectedInterest} setSelectedInterest={setSelectedInterest} generating={generating} generatedIdeas={generatedIdeas} generateIdeas={generateIdeas} expandedCards={expandedCards} toggleCard={toggleCard} pathInsightOpen={pathInsightOpen} setPathInsightOpen={setPathInsightOpen} />}
        {activeTab === 2 && <TabContent />}
        {activeTab === 3 && <TabUSP selectedUsp={selectedUsp} setSelectedUsp={setSelectedUsp} generating={generating} generatedIdeas={generatedIdeas} generateIdeas={generateIdeas} expandedCards={expandedCards} toggleCard={toggleCard} />}
      </div>
    </div>
  );
}

// ═══════════ TAB 1: MARKET INTELLIGENCE ═══════════
function TabMarket() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Competitor Search Volume */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>OTA 경쟁사 브랜드 검색량 비교</div>
        <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 20 }}>월평균 검색량 기준 · ListeningMind keyword_info</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {COMPETITORS.filter(c => c.vol > 50).map((comp, i) => {
            const maxVol = 3177500;
            const pct = (comp.vol / maxVol) * 100;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 110, fontSize: 12, fontWeight: 600, textAlign: "right", flexShrink: 0 }}>{comp.name}</div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 28, position: "relative", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${comp.color}90, ${comp.color})`, borderRadius: 6, transition: "width 0.8s", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{(comp.vol / 10000).toFixed(1)}만</span>
                  </div>
                </div>
                {comp.note && <span style={{ fontSize: 10, color: C.accent, whiteSpace: "nowrap" }}>{comp.note}</span>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 16, padding: "12px 16px", background: `${C.primary}10`, borderRadius: 10, border: `1px solid ${C.primary}30` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>💡 핵심 인사이트</div>
          <div style={{ fontSize: 12, color: C.textSoft, marginTop: 4 }}>스카이스캐너가 트립닷컴의 335배 검색되는데 이게 트립닷컴 자회사라는 걸 소비자가 모릅니다. "스카이스캐너에서 검색하고 트립닷컴에서 예약" 크로스플로우가 핵심 기회입니다.</div>
        </div>
      </div>

      {/* Top Destinations Volume */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>목적지별 검색량 순위 (비브랜드 검색)</div>
        <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 20 }}>이 검색에서 트립닷컴이 발견되지 않고 있습니다</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
          {[...DESTINATIONS].sort((a, b) => b.vol - a.vol).slice(0, 12).map((d, i) => (
            <div key={d.id} style={{ background: C.surface, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 22 }}>{d.flag}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{d.name}</span>
                  <span style={{ fontSize: 10, color: d.trend > 0 ? C.accent : C.warn }}>{d.trend > 0 ? "▲" : "▼"}{Math.abs(d.trend * 100).toFixed(0)}%</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>{(d.vol / 10000).toFixed(1)}만<span style={{ fontSize: 10, fontWeight: 400, color: C.textSoft }}>/월</span></div>
                <div style={{ fontSize: 10, color: C.textSoft }}>여성 {d.gender.f.toFixed(0)}% · {d.topSearch} {(d.topVol/1000).toFixed(0)}K</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3E Strategy Mapping */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>트립닷컴 3E 전략 × 한국 검색 데이터 매핑</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {[
            { e: "Event + Travel", color: C.secondary, items: ["해외 콘서트 186/월 (20대 여성)", "해외 마라톤 1,070/월 (30-40대 남성)", "미식 여행 1,323/월 (여성 63%)", "F1·스포츠 이벤트 (확장 가능)"], sum: "월 2,579+ 검색" },
            { e: "Elderly", color: C.gold, items: ["일본 골프 여행 18,923/월 (50대+ 54%)", "한달살기 11,173/월 (40-50대 66%)", "효도/부모님여행 6,692/월 (30대 자녀 검색)", "골프 여행 종합 5,600/월 (40-50대 84%)"], sum: "월 42,388+ 검색" },
            { e: "Emerging Markets", color: C.purple, items: ["기존 Top 목적지 외 신규 발굴", "중앙아시아·동유럽·오세아니아", "한국 아웃바운드 기준 니치 시장", "로드맵에서 확장 예정"], sum: "추후 확장" },
          ].map((seg, i) => (
            <div key={i} style={{ background: C.surface, borderRadius: 12, padding: 18, border: `1px solid ${seg.color}30` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: seg.color, marginBottom: 10 }}>{seg.e}</div>
              {seg.items.map((item, j) => (
                <div key={j} style={{ fontSize: 12, color: C.textSoft, padding: "4px 0", display: "flex", gap: 6 }}>
                  <span style={{ color: seg.color }}>·</span>{item}
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: seg.color }}>{seg.sum}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════ TAB 2: DISCOVERY ENGINE ═══════════
function TabDiscovery({ discoveryMode, setDiscoveryMode, selectedDest, setSelectedDest, selectedInterest, setSelectedInterest, generating, generatedIdeas, generateIdeas, expandedCards, toggleCard, pathInsightOpen, setPathInsightOpen }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Toggle */}
      <div style={{ display: "flex", gap: 4, background: C.card, borderRadius: 12, padding: 4, width: "fit-content", border: `1px solid ${C.border}` }}>
        {[{ key: "destination", label: "🗺️ 목적지부터" }, { key: "interest", label: "💡 관심사부터" }].map(m => (
          <button key={m.key} onClick={() => { setDiscoveryMode(m.key); setSelectedDest(null); setSelectedInterest(null); setGeneratedIdeas && undefined; }} style={{
            background: discoveryMode === m.key ? C.primary : "transparent",
            color: discoveryMode === m.key ? "#fff" : C.textSoft,
            border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600,
          }}>{m.label}</button>
        ))}
      </div>

      {discoveryMode === "destination" ? (
        <>
          {/* Destination Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
            {DESTINATIONS.map(d => (
              <button key={d.id} onClick={() => setSelectedDest(d.id === selectedDest ? null : d.id)} style={{
                background: d.id === selectedDest ? `${C.primary}30` : C.card,
                border: `1px solid ${d.id === selectedDest ? C.primary : C.border}`,
                borderRadius: 10, padding: "10px 12px", cursor: "pointer", textAlign: "left", color: C.text, transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{d.flag}</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{d.name}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.primary }}>{(d.vol / 10000).toFixed(1)}만</div>
                <div style={{ fontSize: 10, color: C.textSoft }}>여{d.gender.f.toFixed(0)}% · {d.region}</div>
              </button>
            ))}
          </div>

          {/* Selected Destination Detail */}
          {selectedDest && (() => {
            const d = DESTINATIONS.find(x => x.id === selectedDest);
            if (!d) return null;
            const pathKey = Object.keys(PATH_INSIGHTS).find(k => k.includes(d.name.slice(0, 2)));
            const pathData = pathKey ? PATH_INSIGHTS[pathKey] : null;
            return (
              <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.primary}40` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{d.flag} {d.name} 여행</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: C.primary }}>{d.vol.toLocaleString()}<span style={{ fontSize: 14, color: C.textSoft }}>/월</span></div>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ background: C.surface, borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: C.textSoft }}>성별</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>♀{d.gender.f.toFixed(0)}% ♂{d.gender.m.toFixed(0)}%</div>
                    </div>
                    <div style={{ background: C.surface, borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: C.textSoft }}>피크 시즌</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{d.peak.map(m => `${m}월`).join(", ")}</div>
                    </div>
                  </div>
                </div>

                {/* Age Distribution */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 8 }}>연령 분포</div>
                  <div style={{ display: "flex", gap: 4, height: 24 }}>
                    {Object.entries(d.age).map(([age, pct], i) => (
                      <div key={i} style={{ flex: pct, background: `${C.primary}${Math.floor(40 + pct * 2).toString(16)}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 9, fontWeight: 600 }}>{age} {pct.toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PathFinder Insight */}
                {pathData && (
                  <div style={{ marginTop: 16, background: `${C.accent}10`, borderRadius: 10, padding: 14, border: `1px solid ${C.accent}30` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 6 }}>🔍 검색 여정 (PathFinder)</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{pathData.journey}</div>
                    <div style={{ fontSize: 12, color: C.textSoft }}>{pathData.insight}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                      {pathData.topNodes.map((n, i) => (
                        <span key={i} style={{ background: `${C.accent}20`, color: C.accent, fontSize: 10, padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>{n}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button onClick={() => generateIdeas(`목적지: ${d.name}\n월 검색량: ${d.vol.toLocaleString()}\n인구통계: 여성${d.gender.f}%, 핵심연령 ${Object.entries(d.age).sort((a,b)=>b[1]-a[1])[0][0]}\n피크시즌: ${d.peak.join(",")}월\nTop검색: ${d.topSearch} ${d.topVol.toLocaleString()}\n검색여정: ${pathData?.journey || "N/A"}\n인사이트: ${pathData?.insight || "N/A"}\n\n이 목적지에 맞는 숏폼 아이디어 5개를 생성해주세요.`)} disabled={generating} style={{
                  marginTop: 16, background: generating ? C.textSoft : C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: generating ? "wait" : "pointer", width: "100%",
                }}>
                  {generating ? "⏳ 아이디어 생성 중..." : "🎬 숏폼 아이디어 생성"}
                </button>

                {/* Generated Ideas */}
                {generatedIdeas.length > 0 && <IdeaCards ideas={generatedIdeas} expandedCards={expandedCards} toggleCard={toggleCard} />}
              </div>
            );
          })()}
        </>
      ) : (
        <>
          {/* Interest Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {INTERESTS.map(int => (
              <button key={int.id} onClick={() => setSelectedInterest(int.id === selectedInterest ? null : int.id)} style={{
                background: int.id === selectedInterest ? `${C.primary}30` : C.card,
                border: `1px solid ${int.id === selectedInterest ? C.primary : C.border}`,
                borderRadius: 12, padding: 16, cursor: "pointer", textAlign: "left", color: C.text, transition: "all 0.2s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{int.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{int.name}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: C.primary }}>{int.vol.toLocaleString()}<span style={{ fontSize: 11, color: C.textSoft }}>/월</span></div>
                  </div>
                  {int.e3 !== "—" && <span style={{ fontSize: 10, background: `${C.gold}20`, color: C.gold, padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>{int.e3}</span>}
                </div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 6 }}>{int.ageMain} · {int.gender.f > 60 ? "여성" : "남성"} {Math.max(int.gender.m, int.gender.f).toFixed(0)}%</div>
                <div style={{ fontSize: 11, color: C.accent, marginTop: 4, fontWeight: 600 }}>{int.keyInsight}</div>
              </button>
            ))}
          </div>

          {/* Selected Interest Detail */}
          {selectedInterest && (() => {
            const int = INTERESTS.find(x => x.id === selectedInterest);
            if (!int) return null;
            const pathKey = Object.keys(PATH_INSIGHTS).find(k => {
              const n = int.name.replace(/\(.*\)/, "").trim().slice(0, 3);
              return k.includes(n);
            });
            const pathData = pathKey ? PATH_INSIGHTS[pathKey] : null;
            return (
              <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.primary}40` }}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{int.icon} {int.name}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.primary }}>{int.annual.toLocaleString()}<span style={{ fontSize: 14, color: C.textSoft }}> 연간 검색</span></div>

                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, background: C.surface, padding: "4px 10px", borderRadius: 6 }}>🎯 {int.ageMain}</span>
                  <span style={{ fontSize: 11, background: C.surface, padding: "4px 10px", borderRadius: 6 }}>♀{int.gender.f.toFixed(0)}% ♂{int.gender.m.toFixed(0)}%</span>
                  <span style={{ fontSize: 11, background: C.surface, padding: "4px 10px", borderRadius: 6 }}>📍 {int.destinations.join(", ")}</span>
                  <span style={{ fontSize: 11, background: `${C.primary}20`, color: C.primary, padding: "4px 10px", borderRadius: 6, fontWeight: 600 }}>{int.decisionStage}</span>
                </div>

                {pathData && (
                  <div style={{ marginTop: 14, background: `${C.accent}10`, borderRadius: 10, padding: 12, border: `1px solid ${C.accent}30` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>🔍 검색 여정</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>{pathData.journey}</div>
                    <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{pathData.insight}</div>
                  </div>
                )}

                <button onClick={() => generateIdeas(`관심사: ${int.name}\n연간검색: ${int.annual.toLocaleString()}\n인구통계: ${int.ageMain}, ${int.gender.f > 60 ? "여성" : "남성"} ${Math.max(int.gender.m, int.gender.f).toFixed(0)}%\n연결목적지: ${int.destinations.join(", ")}\n결정단계: ${int.decisionStage}\n3E전략: ${int.e3}\n핵심인사이트: ${int.keyInsight}\n검색여정: ${pathData?.journey || "N/A"}\n\n이 관심사에서 트립닷컴과 연결되는 숏폼 아이디어 5개를 생성해주세요.`)} disabled={generating} style={{
                  marginTop: 16, background: generating ? C.textSoft : C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: generating ? "wait" : "pointer", width: "100%",
                }}>
                  {generating ? "⏳ 아이디어 생성 중..." : "🎬 숏폼 아이디어 생성"}
                </button>

                {generatedIdeas.length > 0 && <IdeaCards ideas={generatedIdeas} expandedCards={expandedCards} toggleCard={toggleCard} />}
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}

// ═══════════ IDEA CARDS (Layered) ═══════════
function IdeaCards({ ideas, expandedCards, toggleCard }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.accent }}>✨ 숏폼 아이디어 {ideas.length}개 생성 완료</div>
      {ideas.map((idea, i) => {
        const isOpen = expandedCards[`idea-${i}`];
        const typeInfo = CONTENT_TYPES.find(t => t.id === idea.contentType) || CONTENT_TYPES[0];
        return (
          <div key={i} style={{ background: C.surface, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {/* Collapsed View */}
            <div onClick={() => toggleCard(`idea-${i}`)} style={{ padding: "14px 16px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ background: C.primary, color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>#{idea.rank || i + 1}</span>
                    <span style={{ background: `${typeInfo.color}30`, color: typeInfo.color, fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{idea.contentType}. {typeInfo.name}</span>
                    <span style={{ background: `${C.purple}20`, color: C.purple, fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{idea.stage}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{idea.title}</div>
                  <div style={{ fontSize: 12, color: C.secondary, fontWeight: 600 }}>🎣 "{idea.hook3s}"</div>
                </div>
                <span style={{ fontSize: 16, color: C.textSoft, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
              </div>
              {/* Scene Flow (always visible) */}
              <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                {(idea.sceneFlow || []).map((scene, j) => (
                  <div key={j} style={{ background: `${C.primary}10`, borderRadius: 6, padding: "4px 8px", fontSize: 10, color: C.text, border: `1px solid ${C.primary}20`, flex: "1 1 100px", textAlign: "center" }}>
                    <span style={{ color: C.primary, fontWeight: 700 }}>{j + 1}.</span> {scene}
                  </div>
                ))}
              </div>
              {/* USP Connection */}
              <div style={{ fontSize: 11, color: C.accent, marginTop: 6, fontWeight: 600 }}>🔗 USP: {idea.uspConnection}</div>
            </div>

            {/* Expanded View */}
            {isOpen && (
              <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div><span style={{ fontSize: 10, color: C.textSoft }}>타겟</span><div style={{ fontSize: 12, fontWeight: 600 }}>{idea.target}</div></div>
                <div><span style={{ fontSize: 10, color: C.textSoft }}>크리에이터</span><div style={{ fontSize: 12, fontWeight: 600 }}>{idea.creatorType}</div></div>
                <div style={{ gridColumn: "1 / -1" }}><span style={{ fontSize: 10, color: C.textSoft }}>데이터 근거</span><div style={{ fontSize: 12, fontWeight: 600, color: C.accent }}>{idea.dataProof}</div></div>
                <div style={{ gridColumn: "1 / -1" }}><span style={{ fontSize: 10, color: C.textSoft }}>시리즈 구성</span><div style={{ fontSize: 12 }}>{idea.seriesNote}</div></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════ TAB 3: CONTENT STRATEGY ═══════════
function TabContent() {
  const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Season Heatmap */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>시즌 캘린더 히트맵</div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 700 }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px repeat(12, 1fr)", gap: 2 }}>
              <div></div>
              {months.map(m => <div key={m} style={{ fontSize: 10, textAlign: "center", color: C.textSoft, padding: 4 }}>{m}</div>)}
              {Object.entries(SEASON_DATA).map(([dest, vals]) => (
                <>{/* Fragment for season heatmap row */}
                  <div key={dest} style={{ fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", paddingRight: 8 }}>{dest}</div>
                  {vals.map((v, i) => {
                    const intensity = v / 100;
                    const bg = intensity > 0.8 ? C.primary : intensity > 0.6 ? `${C.primary}90` : intensity > 0.4 ? `${C.primary}50` : `${C.primary}25`;
                    return (
                      <div key={`${dest}-${i}`} style={{ background: bg, borderRadius: 4, padding: "6px 2px", textAlign: "center", fontSize: 10, fontWeight: v > 80 ? 700 : 400, color: v > 60 ? "#fff" : C.textSoft }}>
                        {v}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 7 Content Types Guide */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>7가지 콘텐츠 유형 가이드</div>
        <div style={{ fontSize: 12, color: C.textSoft, marginBottom: 16 }}>결정 단계(Dream → Plan → Book → Share)에 따른 최적 콘텐츠 유형</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
          {CONTENT_TYPES.map(ct => (
            <div key={ct.id} style={{ background: C.surface, borderRadius: 10, padding: 14, borderLeft: `3px solid ${ct.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{ct.id}. {ct.name}</span>
                <span style={{ fontSize: 10, background: `${ct.color}20`, color: ct.color, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{ct.stage}</span>
              </div>
              <div style={{ fontSize: 12, color: C.textSoft }}>{ct.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Series Structure */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>시리즈 숏폼 연작 구조 (90/10 공식)</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { ep: "1편 — 피드 유입", ratio: "관심사 90% + 여행 10%", desc: "알고리즘 최적화. 여행 태그 최소", color: C.accent },
            { ep: "2편 — 심화", ratio: "관심사 60% + 여행 40%", desc: "같은 크리에이터, 여행 비중 확대", color: C.primary },
            { ep: "3편 — 전환", ratio: "관심사 30% + 여행 70%", desc: "트립닷컴 제품 인터페이스 노출", color: C.secondary },
          ].map((ep, i) => (
            <div key={i} style={{ flex: "1 1 200px", background: C.surface, borderRadius: 12, padding: 16, border: `1px solid ${ep.color}30` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: ep.color, marginBottom: 6 }}>{ep.ep}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{ep.ratio}</div>
              <div style={{ fontSize: 11, color: C.textSoft }}>{ep.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Stage Flow */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>소비자 결정 단계 × 콘텐츠 매핑</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { stage: "Dream", icon: "💭", desc: "꿈꾸기 (3-4주 전)", types: "A.진정성 / D.발견 / G.허락", color: "#FF9A9E" },
            { stage: "Plan", icon: "📋", desc: "계획 (1-2주 전)", types: "B.가성비 / C.코스가이드", color: "#A8E6CF" },
            { stage: "Book", icon: "✈️", desc: "예약 (3-5일 전)", types: "E.UGC / F.USP실증", color: C.primary },
            { stage: "Share", icon: "📸", desc: "공유 (여행 후)", types: "UGC 재생산 유도", color: C.gold },
          ].map((s, i) => (
            <>{/* Fragment for decision stage */}
              <div key={s.stage} style={{ background: `${s.color}15`, borderRadius: 12, padding: 16, textAlign: "center", flex: "1 1 160px", border: `1px solid ${s.color}40` }}>
                <div style={{ fontSize: 28 }}>{s.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: s.color, marginTop: 4 }}>{s.stage}</div>
                <div style={{ fontSize: 11, color: C.textSoft, marginTop: 2 }}>{s.desc}</div>
                <div style={{ fontSize: 10, fontWeight: 600, marginTop: 6, color: C.text }}>{s.types}</div>
              </div>
              {i < 3 && <div key={`arrow-${i}`} style={{ display: "flex", alignItems: "center", color: C.textSoft, fontSize: 18 }}>→</div>}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════ TAB 4: USP × CREATOR MATCH ═══════════
function TabUSP({ selectedUsp, setSelectedUsp, generating, generatedIdeas, generateIdeas, expandedCards, toggleCard }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* USP Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
        {USPS.map(usp => (
          <button key={usp.id} onClick={() => setSelectedUsp(usp.id === selectedUsp ? null : usp.id)} style={{
            background: usp.id === selectedUsp ? `${C.primary}25` : C.card,
            border: `1px solid ${usp.id === selectedUsp ? C.primary : C.border}`,
            borderRadius: 12, padding: 16, cursor: "pointer", textAlign: "left", color: C.text,
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{usp.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{usp.name}</div>
            <div style={{ fontSize: 11, color: C.textSoft, marginTop: 4 }}>{usp.desc}</div>
            <div style={{ fontSize: 10, color: C.warn, marginTop: 6 }}>
              소비자 페인: {usp.pains[0]}
            </div>
          </button>
        ))}
      </div>

      {/* Selected USP Detail + Creator Match */}
      {selectedUsp && (() => {
        const usp = USPS.find(x => x.id === selectedUsp);
        if (!usp) return null;
        return (
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.primary}40` }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{usp.icon} {usp.name}</div>
            <div style={{ fontSize: 13, color: C.textSoft, marginTop: 4 }}>{usp.detail}</div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>소비자 페인포인트 매칭</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {usp.pains.map((p, i) => (
                  <span key={i} style={{ background: `${C.warn}15`, color: C.warn, fontSize: 12, padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.warn}30` }}>😣 {p}</span>
                ))}
              </div>
            </div>

            {/* Creator Tiers */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>크리에이터 티어별 전략</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
                {CREATOR_TIERS.map(ct => (
                  <div key={ct.tier} style={{ background: C.surface, borderRadius: 10, padding: 14, borderLeft: `3px solid ${ct.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: ct.color }}>{ct.tier}</span>
                      <span style={{ fontSize: 10, color: C.textSoft }}>{ct.range}</span>
                    </div>
                    <div style={{ fontSize: 12, marginTop: 6 }}>📊 {ct.count} · {ct.cost}</div>
                    <div style={{ fontSize: 11, color: C.accent, marginTop: 4 }}>KPI: {ct.kpi}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Approaches */}
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: C.surface, borderRadius: 12, padding: 16, border: `1px solid ${C.primary}30` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>접근법 A — USP 중심</div>
                <div style={{ fontSize: 12, color: C.textSoft, marginTop: 6 }}>"{usp.name}" USP에 가장 적합한 크리에이터를 찾고, 그 크리에이터의 스타일에 맞는 콘텐츠를 설계</div>
              </div>
              <div style={{ background: C.surface, borderRadius: 12, padding: 16, border: `1px solid ${C.secondary}30` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.secondary }}>접근법 B — 타겟 중심</div>
                <div style={{ fontSize: 12, color: C.textSoft, marginTop: 6 }}>관심사 크리에이터(골프/미식/육아)가 여행을 자연스럽게 말하도록 설계. 크리에이터의 기존 팬층 활용</div>
              </div>
            </div>

            {/* Generate */}
            <button onClick={() => generateIdeas(`USP: ${usp.name}\n설명: ${usp.detail}\n소비자페인: ${usp.pains.join(", ")}\n\n이 USP를 중심으로:\n1. 접근법 A(USP중심): 이 USP가 주인공인 F.USP실증형 콘텐츠 2개\n2. 접근법 B(타겟중심): 관심사 크리에이터가 자연스럽게 이 USP를 발견하는 D.정보발견형 콘텐츠 3개\n총 5개의 숏폼 아이디어를 생성해주세요.`)} disabled={generating} style={{
              marginTop: 16, background: generating ? C.textSoft : C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: generating ? "wait" : "pointer", width: "100%",
            }}>
              {generating ? "⏳ 아이디어 생성 중..." : "🎬 USP × 크리에이터 아이디어 생성"}
            </button>

            {generatedIdeas.length > 0 && <IdeaCards ideas={generatedIdeas} expandedCards={expandedCards} toggleCard={toggleCard} />}
          </div>
        );
      })()}
    </div>
  );
}
