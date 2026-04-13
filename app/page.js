"use client";
import React, { useState, useCallback } from "react";

// ══════════════════════════════════════════════════════════════
// Trip.com AI Brandformance Engine v4.0
// Dark Theme | Samyang Patterns | Enriched Data | 3-Tab + Step
// ══════════════════════════════════════════════════════════════

// ── COLOR SYSTEM (DARK THEME) ──
const C = {
  primary: "#0770E3",
  secondary: "#FF6B00",
  dark: "#0A1628",
  card: "#13203A",
  surface: "#0D1520",
  border: "rgba(7,112,227,0.20)",
  borderActive: "#0770E3",
  text: "#E8ECF1",
  textSoft: "#8B99AE",
  accent: "#00D4AA",
  warn: "#FF4757",
  gold: "#FFD700",
  purple: "#8B5CF6",
  heroGrad: "linear-gradient(135deg, #0770E3, #0A1628)",
};

const LEVEL_COLORS = { MEGA: "#FF4757", LARGE: "#FF6B00", MEDIUM: "#0770E3", NICHE: "#8B5CF6" };
const STAGE_COLORS = { Dream: "#FF9A9E", Plan: "#00D4AA", Book: "#0770E3", Share: "#FFD700" };

// ── DESTINATION OPPORTUNITIES (7) ──
const DEST_OPPS = [
  {
    id: "opp-d1", title: "일본 맛집 탐방객", icon: "🍣",
    hookType: "Taste-hook", hookLabel: "미식 디스커버리",
    strategyCopy: "맛집이 여행의 Entry Point. 73K 검색의 미식 욕구를 여행 동선으로 확장한다.",
    level: "MEGA", region: "일본", destinations: ["오사카", "후쿠오카", "도쿄", "교토"],
    monthlyVol: 136090, annualVol: 1633080,
    keyInsight: "일본 여행 검색의 70%가 '맛집'에서 시작",
    demographics: "여성 67% · 30-40대 60%", peakSeason: "10~1월",
    peakMonths: [80,70,65,60,70,75,85,75,60,95,100,90], stage: "Dream",
    pathJourney: ["맛집", "맛집거리", "관광지", "동선", "근교여행"],
    pathInsight: "맛집에서 시작해서 여행 전체를 계획하게 됨. 먹거리→동선→숙소→항공 역순 결정",
    clusterInsight: "일본여행 클러스터에서 '맛집'이 가장 큰 허브 노드. 오사카-교토-후쿠오카가 삼각 연결",
    topKeywords: [
      { keyword: "오사카 맛집", vol: 73090 }, { keyword: "후쿠오카 맛집", vol: 45000 },
      { keyword: "도쿄 맛집", vol: 40000 }, { keyword: "오사카 규카츠", vol: 12100 },
      { keyword: "오사카 라멘", vol: 11483 }, { keyword: "오사카 스시", vol: 9800 },
      { keyword: "교토 맛집", vol: 8500 }, { keyword: "오사카 타코야끼", vol: 6200 },
    ],
    uspConnection: "Trip.Best 맛집 랭킹 + 원스톱 예약",
    painPoints: ["맛집이 너무 많아서 못 고르겠다", "현지인 맛집 vs 관광객 맛집 구분이 안 된다"],
    contentHook: "오사카 현지인만 아는 규카츠 골목 3곳",
    dataProof: "오사카맛집 73,090/월, 규카츠 12,100/월, 라멘 11,483/월, 스시 9,800/월"
  },
  {
    id: "opp-d2", title: "다낭·나트랑 가성비 리조트 여행자", icon: "🏖️",
    hookType: "Value-hook", hookLabel: "가성비 증명",
    strategyCopy: "일정→경비가 두 번째 관문. '이 가격에 이 리조트가 가능하다'는 실증이 전환을 만든다.",
    level: "MEGA", region: "베트남", destinations: ["다낭", "나트랑"],
    monthlyVol: 174649, annualVol: 2095788,
    keyInsight: "일정과 경비가 핵심 의사결정 요인. 패키지 vs 자유여행 갈림",
    demographics: "여성 66% · 30-40대 58%", peakSeason: "1월, 5~7월",
    peakMonths: [90,65,60,55,75,85,90,80,55,65,65,75], stage: "Plan",
    pathJourney: ["3박4일", "패키지", "3박5일", "경비", "맛집/리조트"],
    pathInsight: "일정 프레임(3박4일)으로 시작 → 패키지와 자유여행 비교 → 경비 확인이 결정의 핵심 관문",
    clusterInsight: "다낭 클러스터에서 '리조트'와 '경비'가 양대 허브. 호이안과 묶어서 검색하는 패턴",
    topKeywords: [
      { keyword: "다낭 여행", vol: 75116 }, { keyword: "나트랑 여행", vol: 99533 },
      { keyword: "다낭 리조트", vol: 23406 }, { keyword: "다낭 맛집", vol: 18500 },
      { keyword: "다낭 3박4일", vol: 14200 }, { keyword: "다낭 경비", vol: 9800 },
      { keyword: "다낭 호이안", vol: 7600 }, { keyword: "나트랑 리조트", vol: 35000 },
    ],
    uspConnection: "가격 경쟁력 + 트립지니 AI 일정 플래너",
    painPoints: ["패키지가 나을지 자유여행이 나을지 모르겠다", "경비가 얼마나 들지 감이 안 온다"],
    contentHook: "다낭 3박4일 50만원 리조트 루트, 실제 영수증 공개",
    dataProof: "다낭여행 75,116/월, 나트랑 99,533/월, 리조트 23,406/월, 경비 9,800/월"
  },
  {
    id: "opp-d3", title: "방콕·태국 가족여행 안전 탐색자", icon: "👨‍👩‍👧",
    hookType: "Safety-hook", hookLabel: "안심 가족여행",
    strategyCopy: "가족=안전 최우선. '아이와 함께 가도 괜찮을까'의 불안을 해소하면 예약이 따라온다.",
    level: "MEGA", region: "태국", destinations: ["방콕", "태국 전체", "파타야"],
    monthlyVol: 129526, annualVol: 1554312,
    keyInsight: "가족 안전이 최우선. 주의사항 검색 후 파타야로 확장",
    demographics: "여성 71% · 30대 32%, 40대 27%", peakSeason: "1월, 7~8월, 12월",
    peakMonths: [90,55,50,40,55,60,70,55,40,45,40,85], stage: "Plan",
    pathJourney: ["가족여행", "파타야", "안전/주의사항", "효도여행", "호텔"],
    pathInsight: "가족여행에서 시작 → 파타야 연결 → 안전 확인이 필수 관문 → 효도여행으로도 역류",
    clusterInsight: "방콕 클러스터에서 '가족'과 '안전'이 강력 연결. 가족은 리조트형, 커플은 시내형",
    topKeywords: [
      { keyword: "방콕 여행", vol: 55550 }, { keyword: "태국 여행", vol: 73976 },
      { keyword: "방콕 맛집", vol: 9610 }, { keyword: "방콕 마사지", vol: 8200 },
      { keyword: "태국 여행코스", vol: 25000 }, { keyword: "방콕 가족여행", vol: 4800 },
      { keyword: "파타야 여행", vol: 12000 }, { keyword: "태국 주의사항", vol: 3500 },
    ],
    uspConnection: "24시간 한국어 CS + 가족 패키지",
    painPoints: ["아이 데리고 가도 안전할까", "영어 못하면 어떡하지", "위생이 걱정된다"],
    contentHook: "아이 2명과 방콕-파타야 6일, 안전하게 다녀온 리얼 후기",
    dataProof: "방콕 55,550/월, 태국 73,976/월, 맛집 9,610/월, 마사지 8,200/월"
  },
  {
    id: "opp-d4", title: "유럽 첫 여행자", icon: "🗼",
    hookType: "Discovery-hook", hookLabel: "첫 발견의 설렘",
    strategyCopy: "지리 학습부터 시작하는 유럽 초보자. '어디부터 가야 하지'의 막막함을 해결하면 충성 고객이 된다.",
    level: "MEGA", region: "유럽", destinations: ["스페인", "이탈리아", "스위스", "프랑스", "영국", "독일"],
    monthlyVol: 266224, annualVol: 3194688,
    keyInsight: "지리 학습부터 시작. 나라 선택→코스→패키지 순서",
    demographics: "여성 74% · 50대+ 31%", peakSeason: "1월, 5~6월, 9~10월",
    peakMonths: [65,55,55,45,50,50,40,40,40,45,35,40], stage: "Dream",
    pathJourney: ["유럽", "나라/지도", "패키지", "혼자여행", "자전거여행"],
    pathInsight: "유럽이라는 큰 카테고리에서 시작 → 나라 선택 → 패키지 vs 자유여행 분기",
    clusterInsight: "유럽여행 클러스터에서 국가별 서브 클러스터가 뚜렷. 스페인-이탈리아 연결 강함. 50대+가 31%로 시니어 시장",
    topKeywords: [
      { keyword: "유럽 여행", vol: 45586 }, { keyword: "스페인 여행", vol: 67973 },
      { keyword: "이탈리아 여행", vol: 54613 }, { keyword: "스위스 여행", vol: 52466 },
      { keyword: "유럽 패키지", vol: 15000 }, { keyword: "유럽 여행코스", vol: 12000 },
      { keyword: "유럽 경비", vol: 8000 }, { keyword: "유럽 혼자여행", vol: 5500 },
    ],
    uspConnection: "원스톱 다국가 예약 + Trip.Best 코스 추천",
    painPoints: ["나라가 너무 많아서 어디부터 가야 할지 모르겠다", "경비가 얼마나 들지 감이 안 잡힌다"],
    contentHook: "유럽 처음이면 이 3개국 10일 루트가 정답인 이유",
    dataProof: "유럽 45,586/월, 스페인 67,973/월, 이탈리아 54,613/월, 스위스 52,466/월"
  },
  {
    id: "opp-d5", title: "대만 맛집·야시장 탐방객", icon: "🧋",
    hookType: "Taste-hook", hookLabel: "야시장 어드벤처",
    strategyCopy: "대만=야시장. 먹거리 탐험이 곧 여행의 전부인 소비자. 가성비 미식 천국의 동선을 설계한다.",
    level: "MEGA", region: "동아시아", destinations: ["대만"],
    monthlyVol: 186300, annualVol: 2235600,
    keyInsight: "맛집+야시장이 핵심. 일본 다음 2위 검색량",
    demographics: "여성 72% · 40-50대 56%", peakSeason: "10~1월",
    peakMonths: [85,60,55,50,55,60,55,50,55,65,65,70], stage: "Dream",
    pathJourney: ["대만여행", "맛집", "야시장", "관광지", "경비"],
    pathInsight: "대만여행 자체가 진입 → 맛집/야시장이 핵심 허브 → 관광지는 부수적 → 경비 확인 후 결정",
    clusterInsight: "대만여행 클러스터에서 '야시장'과 '맛집'이 최대 허브. 타이베이-지우펀 연결",
    topKeywords: [
      { keyword: "대만 여행", vol: 186300 }, { keyword: "대만 맛집", vol: 9553 },
      { keyword: "대만 야시장", vol: 7200 }, { keyword: "타이베이 맛집", vol: 5800 },
      { keyword: "지우펀", vol: 4500 }, { keyword: "대만 경비", vol: 3200 },
    ],
    uspConnection: "Trip.Best 맛집 랭킹 + 가격 비교",
    painPoints: ["야시장이 너무 많은데 어디가 진짜 맛있는지 모르겠다"],
    contentHook: "대만 야시장 먹거리 1만원으로 10가지 도전",
    dataProof: "대만여행 186,300/월, 맛집 9,553/월"
  },
  {
    id: "opp-d6", title: "괌·하와이 가족 리조트 여행자", icon: "🌺",
    hookType: "Family-hook", hookLabel: "가족 리조트",
    strategyCopy: "괌=30대 가족의 첫 해외, 하와이=50대 버킷리스트. 같은 '리조트'인데 타겟이 완전히 다르다.",
    level: "MEGA", region: "미주", destinations: ["괌", "하와이"],
    monthlyVol: 93359, annualVol: 1120308,
    keyInsight: "괌=30대 가족, 하와이=50대+ 버킷리스트",
    demographics: "괌: 30대 36% / 하와이: 50대+ 30%", peakSeason: "괌 1,4~6월 / 하와이 1,5~7월",
    peakMonths: [70,55,55,55,65,75,70,50,65,75,90,70], stage: "Plan",
    pathJourney: ["괌/하와이", "맛집", "비용", "호텔", "액티비티"],
    pathInsight: "괌은 '아이 첫 해외여행'으로 진입, 하와이는 '인생 여행'으로 진입",
    clusterInsight: "괌 클러스터에서 '가족'과 '아이' 연결 강함. 하와이는 '허니문'과 '은퇴' 양쪽 연결",
    topKeywords: [
      { keyword: "괌 여행", vol: 60576 }, { keyword: "하와이 여행", vol: 32783 },
      { keyword: "괌 맛집", vol: 9636 }, { keyword: "하와이 맛집", vol: 8500 },
      { keyword: "하와이 비용", vol: 12000 }, { keyword: "괌 호텔", vol: 7200 },
    ],
    uspConnection: "원스톱 항공+호텔+액티비티",
    painPoints: ["괌과 하와이 중 우리 가족에 맞는 곳이 어딘지 모르겠다"],
    contentHook: "괌 vs 하와이, 아이 나이별로 추천이 다른 이유",
    dataProof: "괌 60,576/월, 하와이 32,783/월, 괌맛집 9,636/월, 하와이비용 12,000/월"
  },
  {
    id: "opp-d7", title: "삿포로 겨울 시즌 여행자", icon: "❄️",
    hookType: "Season-hook", hookLabel: "시즌 한정 경험",
    strategyCopy: "겨울에만 가능한 경험. 눈축제+온천+스키의 시즌 콤보를 선점한다.",
    level: "MEGA", region: "일본", destinations: ["삿포로"],
    monthlyVol: 91766, annualVol: 1101192,
    keyInsight: "겨울 시즌 집중. 눈축제+온천+스키가 핵심 3종 세트",
    demographics: "여성 68% · 40대 29%", peakSeason: "11~2월",
    peakMonths: [85,70,50,40,45,50,55,45,40,70,85,100], stage: "Plan",
    pathJourney: ["삿포로", "눈축제", "온천", "스키", "맛집"],
    pathInsight: "삿포로 진입 → 눈축제가 핵심 트리거 → 온천/스키 연결 → 맛집은 보조",
    clusterInsight: "삿포로 클러스터에서 '겨울'이 압도적 허브. 겨울 시즌 집중 전략이 효율적",
    topKeywords: [
      { keyword: "삿포로 여행", vol: 91766 }, { keyword: "삿포로 눈축제", vol: 30000 },
      { keyword: "삿포로 맛집", vol: 18000 }, { keyword: "삿포로 온천", vol: 9500 },
      { keyword: "삿포로 스키", vol: 7200 },
    ],
    uspConnection: "Trip.Best 시즌 추천 + 스키 패키지",
    painPoints: ["눈축제 기간에 숙소 잡기가 너무 어렵다", "겨울에 어떤 옷을 입어야 하는지"],
    contentHook: "삿포로 눈축제 시즌 3박4일 완벽 동선, 숙소 예약 타이밍",
    dataProof: "삿포로 91,766/월, 눈축제 30,000/월, 온천 9,500/월"
  }
];

// ── INTEREST OPPORTUNITIES (6) ──
const INT_OPPS = [
  {
    id: "opp-i1", title: "시니어 골프 여행자", icon: "⛳",
    hookType: "Lifestyle-hook", hookLabel: "라이프스타일 소구",
    strategyCopy: "유일한 남성 다수 여행 검색. 기존 여행 마케팅이 놓친 타겟을 골프로 잡는다.",
    level: "LARGE", interest: "골프", e3tag: "Elderly",
    monthlyVol: 24523, annualVol: 284990,
    keyInsight: "여행 검색 전체가 여성 70%인데, 골프만 남성 61%",
    demographics: "남성 61% · 50대+ 54%", peakSeason: "연중 (봄가을 피크)",
    peakMonths: [60,55,65,70,65,55,50,45,55,70,65,60], stage: "Plan",
    destinations: ["후쿠오카", "태국", "베트남", "필리핀"],
    pathJourney: ["골프여행", "동남아", "태국", "가격", "캐디/여행사"],
    pathInsight: "골프여행이라는 구체적 목적으로 시작 → 동남아가 가성비 → 가격 비교가 핵심 관문",
    clusterInsight: "골프여행 클러스터에서 '가격'과 '패키지'가 양대 허브. 황제투어 수요도 존재",
    topKeywords: [
      { keyword: "일본 골프 여행", vol: 18923 }, { keyword: "골프 여행", vol: 5600 },
      { keyword: "태국 골프", vol: 3200 }, { keyword: "골프 패키지", vol: 2800 },
      { keyword: "후쿠오카 골프", vol: 2100 },
    ],
    uspConnection: "원스톱(항공+호텔+골프장) + 가격 경쟁력",
    painPoints: ["골프장+항공+숙소 따로 예약이 귀찮다", "가격 비교가 어렵다"],
    contentHook: "50대 아버지를 위한 후쿠오카 골프 3박 실제 비용 공개",
    dataProof: "일본골프 18,923/월(남성61%), 골프여행 5,600/월(40-50대84%)"
  },
  {
    id: "opp-i2", title: "신혼여행 커플", icon: "💍",
    hookType: "Emotion-hook", hookLabel: "인생 최고의 여행",
    strategyCopy: "발리가 디폴트. '비용 대비 최고의 경험'을 실증하면 허니문 여행사 대신 트립닷컴을 선택한다.",
    level: "LARGE", interest: "신혼여행", e3tag: null,
    monthlyVol: 26843, annualVol: 331060,
    keyInsight: "발리 디폴트. 비용→추천순위→풀빌라 검색 여정",
    demographics: "여성 63% · 25-34세 88%", peakSeason: "연중 (1월 피크)",
    peakMonths: [85,70,65,60,65,70,60,55,65,75,80,75], stage: "Dream",
    destinations: ["발리", "하와이", "몰디브", "유럽"],
    pathJourney: ["신혼여행", "발리", "비용", "추천순위", "풀빌라"],
    pathInsight: "신혼여행이라는 인생 이벤트에서 시작 → 발리가 디폴트 → 비용 확인 → 풀빌라가 최종 결정",
    clusterInsight: "신혼여행 클러스터에서 '발리'가 압도적 허브. 몰디브는 프리미엄, 하와이는 장거리 대안",
    topKeywords: [
      { keyword: "신혼여행", vol: 26843 }, { keyword: "신혼여행 추천", vol: 12000 },
      { keyword: "발리 신혼여행", vol: 8500 }, { keyword: "신혼여행 비용", vol: 6200 },
      { keyword: "풀빌라", vol: 4800 },
    ],
    uspConnection: "Trip.Best 허니문 랭킹 + 풀빌라 가격 비교",
    painPoints: ["허니문 여행사를 써야 하나 직접 예약해야 하나", "예산 내에서 최고의 경험을 하고 싶다"],
    contentHook: "발리 신혼여행 400만원이면 이 풀빌라 가능",
    dataProof: "신혼여행 26,843/월, 성장률 +20%"
  },
  {
    id: "opp-i3", title: "은퇴·한달살기 탐색자", icon: "🏠",
    hookType: "Life-hook", hookLabel: "세컨드라이프 설계",
    strategyCopy: "은퇴 후 삶을 설계하는 40-50대. 한달살기는 '여행'이 아니라 '삶의 실험'이다.",
    level: "MEDIUM", interest: "한달살기", e3tag: "Elderly",
    monthlyVol: 11173, annualVol: 156790,
    keyInsight: "은퇴/세컨드라이프 직결. 치앙마이 vs 발리가 양대 선택지",
    demographics: "여성 63% · 40-50대 66%", peakSeason: "1월, 가을",
    peakMonths: [80,65,60,55,60,55,50,50,55,65,70,75], stage: "Dream",
    destinations: ["치앙마이", "발리", "다낭", "유럽"],
    pathJourney: ["한달살기", "해외", "유럽/동남아", "저렴한곳", "치앙마이비용"],
    pathInsight: "한달살기라는 삶의 전환에서 시작 → 해외 vs 국내 분기 → 동남아가 가성비 압도",
    clusterInsight: "한달살기 클러스터에서 '비용'과 '장기숙소'가 핵심 허브. 디지털노마드와 은퇴자가 혼재",
    topKeywords: [
      { keyword: "한달살기", vol: 11173 }, { keyword: "해외 한달살기", vol: 5800 },
      { keyword: "치앙마이 한달살기", vol: 3500 }, { keyword: "발리 한달살기", vol: 2400 },
      { keyword: "한달살기 비용", vol: 1800 },
    ],
    uspConnection: "장기 숙소 예약 + 트립지니 현지 생활 가이드",
    painPoints: ["한 달 숙소를 어떻게 구하는지 모르겠다", "현지 생활비가 얼마나 드는지"],
    contentHook: "치앙마이 한달살기 150만원 리얼 가계부",
    dataProof: "한달살기 11,173/월, 해외한달살기 확장 시 연 15만+"
  },
  {
    id: "opp-i4", title: "효도/부모님 여행 기획자", icon: "🙏",
    hookType: "Emotion-hook", hookLabel: "후회 트리거",
    strategyCopy: "30대 자녀가 부모님 대신 검색한다. '후회'라는 감정이 가장 강력한 전환 동기.",
    level: "MEDIUM", interest: "효도여행", e3tag: "Elderly",
    monthlyVol: 6692, annualVol: 71640,
    keyInsight: "30대 자녀가 부모님 대신 검색. '후회' 감정이 트리거",
    demographics: "여성 79% · 30대 40%", peakSeason: "1월(설), 5월(어버이날), 9월(추석)",
    peakMonths: [85,60,55,50,75,55,50,45,70,55,50,65], stage: "Dream",
    destinations: ["일본", "동남아", "유럽"],
    pathJourney: ["부모님여행", "60대/70대", "효도여행", "추천", "후회/10계명"],
    pathInsight: "부모님 여행이라는 효도 동기에서 시작 → 연령대별 적합지 탐색 → 감정 콘텐츠에 반응",
    clusterInsight: "부모님여행 클러스터에서 '60대'와 '70대'가 핵심 노드. 안전과 편의가 가격보다 우선",
    topKeywords: [
      { keyword: "부모님 해외여행", vol: 6692 }, { keyword: "효도 여행", vol: 3800 },
      { keyword: "부모님 여행 추천", vol: 2500 }, { keyword: "60대 해외여행", vol: 1800 },
      { keyword: "부모님 여행 후회", vol: 900 },
    ],
    uspConnection: "24시간 한국어 CS + 시니어 맞춤 패키지",
    painPoints: ["부모님이 해외에서 문제 생기면 어떡하지", "영어 못하시는데 괜찮을까"],
    contentHook: "부모님 첫 해외여행 보내드리기 전 꼭 알아야 할 5가지",
    dataProof: "부모님여행 6,692/월, 효도여행 확장, 여성79%"
  },
  {
    id: "opp-i5", title: "자녀 영어캠프 기획 맘", icon: "📚",
    hookType: "Solution-hook", hookLabel: "원스톱 해결",
    strategyCopy: "항공+숙소+캠프를 따로 예약하는 고통. 원스톱이라는 USP가 가장 직접적으로 소구되는 타겟.",
    level: "NICHE", interest: "영어캠프", e3tag: null,
    monthlyVol: 2256, annualVol: 42340,
    keyInsight: "40대 엄마가 검색. 원스톱 예약이 최대 페인포인트 해결",
    demographics: "여성 72% · 40대 46%", peakSeason: "1~3월(여름방학 준비), 10~11월(겨울방학)",
    peakMonths: [80,75,70,50,45,40,55,50,45,70,75,65], stage: "Plan",
    destinations: ["세부", "괌", "호주"],
    pathJourney: ["영어캠프", "세부", "비용", "프로그램비교", "항공"],
    pathInsight: "영어캠프라는 교육 목적에서 시작 → 세부가 가성비 1위 → 프로그램 비교 → 예약",
    clusterInsight: "영어캠프 클러스터에서 '세부'가 압도적. '비용'과 '후기'가 양대 허브",
    topKeywords: [
      { keyword: "영어캠프", vol: 2256 }, { keyword: "세부 영어캠프", vol: 1800 },
      { keyword: "영어캠프 비용", vol: 900 }, { keyword: "겨울방학 영어캠프", vol: 750 },
      { keyword: "괌 영어캠프", vol: 400 },
    ],
    uspConnection: "원스톱 항공+숙소+액티비티",
    painPoints: ["캠프+항공+숙소를 따로따로 예약하는 게 너무 복잡하다"],
    contentHook: "세부 영어캠프 4주, 항공부터 숙소까지 한번에 해결한 방법",
    dataProof: "영어캠프 2,256/월, 40대엄마 46%"
  },
  {
    id: "opp-i6", title: "이벤트+여행 연결자", icon: "🎪",
    hookType: "Event-hook", hookLabel: "이벤트 연결 여행",
    strategyCopy: "콘서트·마라톤·미식 이벤트가 여행의 트리거. '보러 가는 여행'은 전환율이 가장 높다.",
    level: "NICHE", interest: "이벤트·콘서트·마라톤·미식", e3tag: "Event",
    monthlyVol: 2579, annualVol: 30860,
    keyInsight: "3E 전략 Event+Travel 핵심. 이벤트별로 타겟이 완전히 다름",
    demographics: "콘서트: 20대여성 / 마라톤: 30-40대남성 / 미식: 여성63%",
    peakSeason: "이벤트별 상이",
    peakMonths: [55,50,55,60,55,65,60,55,60,65,55,50], stage: "Plan",
    destinations: ["일본", "미국", "유럽", "태국"],
    pathJourney: ["콘서트/마라톤/미식", "일정확인", "항공+숙소", "예약"],
    pathInsight: "이벤트 일정이 확정되면 → 즉시 항공+숙소 검색 → 전환 경로가 짧고 전환율 높음",
    clusterInsight: "이벤트 관련 검색은 규모는 작지만 의도(intent)가 매우 구체적. 전환율이 일반 여행 검색보다 높음",
    topKeywords: [
      { keyword: "미식 여행", vol: 1323 }, { keyword: "해외 마라톤", vol: 1070 },
      { keyword: "해외 콘서트", vol: 186 }, { keyword: "도쿄 마라톤", vol: 800 },
      { keyword: "와인 여행", vol: 450 },
    ],
    uspConnection: "이벤트 일정 연동 + 원스톱 예약",
    painPoints: ["이벤트 날짜에 맞는 항공편을 빨리 잡아야 한다"],
    contentHook: "도쿄마라톤 참가자를 위한 3박4일 러닝+관광 루트",
    dataProof: "콘서트 186/월, 마라톤 1,070/월, 미식 1,323/월"
  }
];

// ── SEASON DATA (10 destinations × 12 months) ──
const SEASON_DATA = {
  "오사카": [80,70,65,60,70,75,85,75,60,95,100,90],
  "후쿠오카": [85,70,65,60,70,80,90,75,60,90,95,100],
  "도쿄": [95,70,55,55,60,60,70,55,50,80,85,90],
  "다낭": [90,65,60,55,75,85,90,80,55,65,65,75],
  "방콕": [90,55,50,40,55,60,70,55,40,45,40,85],
  "대만": [85,60,55,50,55,60,55,50,55,65,65,70],
  "괌": [70,55,55,55,65,75,70,50,65,75,90,70],
  "하와이": [40,35,35,35,55,50,40,30,35,30,30,30],
  "유럽": [65,55,55,45,50,50,40,40,40,45,35,40],
  "삿포로": [85,70,50,40,45,50,55,45,40,70,85,100],
};
const MONTHS = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

// ── CONTENT TYPES ──
const CONTENT_TYPES = [
  { code: "A", name: "진정성형", color: "#FF6B6B", desc: "로컬 체험 VLOG, 현지인 추천" },
  { code: "B", name: "가성비증명형", color: "#4ECDC4", desc: "실제 영수증, 비용 비교" },
  { code: "C", name: "일정가이드형", color: "#45B7D1", desc: "N박N일 완벽 동선" },
  { code: "D", name: "정보발견형", color: "#96CEB4", desc: "팁, 꿀정보, 실수 방지" },
  { code: "E", name: "UGC리뷰형", color: "#DDA0DD", desc: "실제 후기, Before/After" },
  { code: "F", name: "USP실증형", color: "#FFD93D", desc: "Trip.com 기능 실사용" },
  { code: "G", name: "허락형", color: "#FF8B94", desc: "소비 정당화, 감성 트리거" },
];

// ── CREATOR TIERS ──
const CREATOR_TIERS = [
  { tier: "MEGA", range: "3천만~8천만", role: "트렌드 점화", color: "#FF4757" },
  { tier: "MACRO", range: "500만~2천만", role: "신뢰 구축", color: "#FF6B00" },
  { tier: "MICRO", range: "80만~300만", role: "커뮤니티 침투", color: "#0770E3" },
  { tier: "NANO", range: "20만~80만", role: "롱테일 SEO", color: "#8B5CF6" },
];

// ── USP DATA ──
const USPS = [
  { id: "onestop", name: "원스톱 플랫폼", icon: "🔗", desc: "항공+호텔+액티비티 한 번에", detail: "접속 20~24회, 결정 9~11일의 과정을 하나의 플랫폼에서", pains: ["예약 따로따로 귀찮다", "가격 비교에 지친다"], rank: 1 },
  { id: "cs", name: "24시간 한국어 CS", icon: "🇰🇷", desc: "언제든 한국어 상담", detail: "효도/가족여행에서 가장 강력. 환불불안 해소", pains: ["해외에서 문제생기면?", "영어 못하면?"], rank: 2 },
  { id: "tripbest", name: "Trip.Best 랭킹", icon: "🏆", desc: "선택의 고통 해결", detail: "AI 기반 목적지/호텔/액티비티 추천 랭킹", pains: ["어디가 좋은지 모르겠다", "후기가 너무 많다"], rank: 3 },
  { id: "price", name: "가격 경쟁력", icon: "💰", desc: "최저가 보장 + 할인코드", detail: "아고다 대비 항공 강점, 호텔은 가격마다 다름", pains: ["최저가를 찾고 싶다"], rank: 4 },
  { id: "tripgenie", name: "트립지니 AI", icon: "🤖", desc: "AI 여행 플래너", detail: "이용자 +117%, AI 예약 +400%. 월 검색 58회지만 +83% 성장", pains: ["일정 짜기 귀찮다", "현지 정보를 모른다"], rank: 5 },
];

// ── CLAUDE SYSTEM PROMPT ──
const SYSTEM_PROMPT = `당신은 Trip.com 한국 숏폼 콘텐츠 전략가입니다.

규칙:
1. 후킹에 브랜드명(트립닷컴) 금지. 소비자 관심사로 시작
2. 관심사 90% + 여행 10% 공식 (1편 기준)
3. 7가지 콘텐츠 유형: A.진정성형, B.가성비증명형, C.일정가이드형, D.정보발견형, E.UGC리뷰형, F.USP실증형, G.허락형
4. 결정 단계 태그: Dream/Plan/Book/Share
5. 시리즈: 1편(90/10) → 2편(60/40) → 3편(30/70)
6. USP 5종: 원스톱/24시간CS/Trip.Best/가격/트립지니

반드시 JSON 배열로만 응답. 마크다운 없이.
[{"rank":1,"title":"제목","contentType":"A~G","stage":"Dream|Plan|Book|Share","hook3s":"후킹카피","sceneFlow":["씬1","씬2","씬3","씬4"],"uspConnection":"USP","target":"타겟","creatorType":"MEGA|MACRO|MICRO|NANO","dataProof":"근거","seriesNote":"시리즈"}]`;

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════

export default function BrandformanceEngine() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});
  const [generatedIdeas, setGeneratedIdeas] = useState({});
  const [loadingIds, setLoadingIds] = useState({});
  const [expandedIdeas, setExpandedIdeas] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleCard = useCallback((id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleIdea = useCallback((key) => {
    setExpandedIdeas(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // ── Claude API Call ──
  const generateIdeas = useCallback(async (opp) => {
    if (loadingIds[opp.id]) return;
    setLoadingIds(prev => ({ ...prev, [opp.id]: true }));
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `다음 기회에 대한 숏폼 아이디어 5개를 생성해주세요:\n\n제목: ${opp.title}\n인사이트: ${opp.keyInsight}\n인구통계: ${opp.demographics}\n검색량: 월 ${opp.monthlyVol?.toLocaleString()}\n전략: ${opp.strategyCopy}\n후킹타입: ${opp.hookType} ${opp.hookLabel}\n콘텐츠훅: ${opp.contentHook}\nUSP연결: ${opp.uspConnection}\n페인포인트: ${(opp.painPoints || []).join(", ")}\n데이터: ${opp.dataProof}` }]
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error?.message || data.error);
      const text = data.content?.[0]?.text || "";
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        setGeneratedIdeas(prev => ({ ...prev, [opp.id]: JSON.parse(jsonMatch[0]) }));
      } else {
        throw new Error("JSON 파싱 실패");
      }
    } catch (e) {
      setGeneratedIdeas(prev => ({ ...prev, [opp.id]: [{ error: e.message }] }));
    } finally {
      setLoadingIds(prev => ({ ...prev, [opp.id]: false }));
    }
  }, [loadingIds]);

  const fmtNum = (n) => n >= 1000000 ? (n / 1000000).toFixed(1) + "M" : n >= 1000 ? (n / 1000).toFixed(0) + "K" : String(n);

  // ══════════════════════════════════════════════════════
  // RENDER: HEADER
  // ══════════════════════════════════════════════════════
  const renderHeader = () => (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,22,40,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "12px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: C.primary, color: "#fff", fontWeight: 800, fontSize: 11, padding: "4px 8px", borderRadius: 6 }}>Trip.com</div>
          <div>
            <div style={{ color: C.text, fontSize: 15, fontWeight: 700 }}>AI Brandformance Engine</div>
            <div style={{ color: C.textSoft, fontSize: 10, letterSpacing: 2, fontWeight: 500 }}>ALGORITHM PERFORMANCE PLATFORM</div>
          </div>
        </div>
        <div style={{ color: C.textSoft, fontSize: 12 }}>Pentacle × AI</div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // RENDER: HERO (2-column + visual formula)
  // ══════════════════════════════════════════════════════
  const renderHero = () => (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "55% 45%", gap: 20 }}>
        {/* Left: Brand + Formula */}
        <div style={{ background: "linear-gradient(135deg, #0770E3 0%, #0A1628 100%)", borderRadius: 20, padding: 36 }}>
          <div style={{ color: C.secondary, fontSize: 12, letterSpacing: 3, fontWeight: 600, marginBottom: 8 }}>TRIP.COM × PENTACLE</div>
          <div style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AI Brandformance Engine</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>
            소비자의 관심사에서 여행과 Trip.com을 발견하게 하는<br/>AI 기반 마케팅 전략 플랫폼
          </div>

          {/* Visual Formula */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            {[
              { emoji: "🔍", text: "관심사 데이터" },
              { emoji: "✈️", text: "여행 발견" },
              { emoji: "📈", text: "Trip.com 성장" }
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 20, fontWeight: 800 }}>{i === 1 ? "×" : "="}</span>}
                <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 22 }}>{item.emoji}</div>
                  <div style={{ color: "#fff", fontSize: 11, fontWeight: 600, marginTop: 4 }}>{item.text}</div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* 3 Icons */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { icon: "📊", text: "검색 데이터 기반 기회 발견" },
              { icon: "🎬", text: "알고리즘 최적화 숏폼 설계" },
              { icon: "🔗", text: "USP→크리에이터→전환 연결" }
            ].map((item, i) => (
              <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Discovery Gap Dashboard */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "해외 출국자", value: "29.24M", sub: "2025 내국인 해외관광", color: "#fff" },
            { label: null, value: "━", color: C.textSoft, isOp: true },
            { label: "트립닷컴 검색", value: "9.49M", sub: "브랜드 직접 검색", color: C.primary },
            { label: null, value: "═", color: C.textSoft, isOp: true },
            { label: "발견 공백", value: "14.60M+", sub: "목적지만 검색, 기회", color: C.secondary, highlight: true }
          ].map((item, i) => (
            item.isOp ? (
              <div key={i} style={{ textAlign: "center", color: item.color, fontSize: 18, fontWeight: 800, padding: "0 0" }}>{item.value}</div>
            ) : (
              <div key={i} style={{ background: item.highlight ? "rgba(255,107,0,0.08)" : C.card, border: `1px solid ${item.highlight ? "rgba(255,107,0,0.3)" : C.border}`, borderRadius: 14, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: C.textSoft, fontSize: 11, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: item.color, fontSize: 28, fontWeight: 800 }}>{item.value}</div>
                </div>
                <div style={{ color: C.textSoft, fontSize: 11, textAlign: "right" }}>{item.sub}</div>
              </div>
            )
          ))}
          <div style={{ color: C.textSoft, fontSize: 11, textAlign: "center", marginTop: 4, lineHeight: 1.5 }}>
            이 <span style={{ color: C.secondary, fontWeight: 700 }}>14.60M</span> 소비자가 여행을 검색하면서도 Trip.com을 발견하지 못하고 있습니다
          </div>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // RENDER: COMPETITION BANNER
  // ══════════════════════════════════════════════════════
  const renderCompBanner = () => (
    <div style={{ maxWidth: 1200, margin: "16px auto 0", padding: "0 24px" }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ color: C.textSoft, fontSize: 12, lineHeight: 1.6 }}>
          <span style={{ color: C.text, fontWeight: 600 }}>OTA 경쟁 환경:</span>{" "}
          스카이스캐너 317.8만/월<span style={{ color: C.textSoft, fontSize: 10 }}>(트립닷컴 자회사)</span>{" > "}
          아고다 160.8만{" > "}네이버항공권 157.7만{" > "}
          <span style={{ color: C.primary, fontWeight: 600 }}>트립닷컴 79.1만</span>{" > "}마이리얼트립 57.8만
        </div>
        <div style={{ color: C.gold, fontSize: 11, whiteSpace: "nowrap" }}>
          💡 스카이스캐너→트립닷컴 크로스플로우가 핵심 기회
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // RENDER: TABS + STEP INDICATOR
  // ══════════════════════════════════════════════════════
  const TABS = ["기회 발견", "콘텐츠 전략", "USP × 크리에이터"];
  const STEPS = ["기회 발견", "콘텐츠 설계", "크리에이터 매칭"];

  const renderTabs = () => (
    <div style={{ position: "sticky", top: 52, zIndex: 99, background: "rgba(10,22,40,0.95)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 24px 0" }}>
        {/* Tab Bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {TABS.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: "8px 20px", borderRadius: 20, border: "none", cursor: "pointer",
              background: activeTab === i ? C.primary : "transparent",
              color: activeTab === i ? "#fff" : C.textSoft,
              fontSize: 13, fontWeight: 600, transition: "all 0.2s"
            }}>{tab}</button>
          ))}
        </div>
        {/* Step Indicator */}
        <div style={{ display: "flex", alignItems: "center", paddingBottom: 12 }}>
          {STEPS.map((step, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ flex: 1, height: 2, background: i <= activeTab ? C.primary : "rgba(255,255,255,0.1)" }} />}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                  background: i <= activeTab ? C.primary : "rgba(255,255,255,0.1)",
                  color: i <= activeTab ? "#fff" : C.textSoft,
                  fontSize: 11, fontWeight: 700
                }}>{i + 1}</div>
                <span style={{ color: i <= activeTab ? C.text : C.textSoft, fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>{step}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // RENDER: MINI HEATMAP (12 months)
  // ══════════════════════════════════════════════════════
  const MiniHeatmap = ({ data }) => (
    <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 28 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ width: "100%", height: Math.max(4, v * 0.24), borderRadius: 2, background: v >= 80 ? C.primary : v >= 60 ? "rgba(7,112,227,0.5)" : "rgba(7,112,227,0.2)" }} />
          <span style={{ fontSize: 8, color: C.textSoft }}>{i + 1}</span>
        </div>
      ))}
    </div>
  );

  // ══════════════════════════════════════════════════════
  // RENDER: OPPORTUNITY CARD (Samyang pattern)
  // ══════════════════════════════════════════════════════
  const renderOppCard = (opp, category) => {
    const isExpanded = expandedCards[opp.id];
    const ideas = generatedIdeas[opp.id];
    const isLoading = loadingIds[opp.id];
    const borderColor = category === "A" ? C.primary : C.secondary;

    return (
      <div key={opp.id} style={{
        background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${borderColor}`, overflow: "hidden",
        transition: "all 0.2s", transform: hoveredCard === opp.id ? "translateY(-2px)" : "none",
        boxShadow: hoveredCard === opp.id ? "0 4px 20px rgba(7,112,227,0.15)" : "none"
      }}
        onMouseEnter={() => setHoveredCard(opp.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Collapsed Header */}
        <div onClick={() => toggleCard(opp.id)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
          {/* Left: Icon + Level */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 48 }}>
            <span style={{ fontSize: 28 }}>{opp.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: LEVEL_COLORS[opp.level], background: `${LEVEL_COLORS[opp.level]}15`, padding: "2px 6px", borderRadius: 4 }}>{opp.level}</span>
            {opp.e3tag && <span style={{ fontSize: 8, fontWeight: 600, color: C.gold, background: "rgba(255,215,0,0.12)", padding: "1px 5px", borderRadius: 3 }}>{opp.e3tag}</span>}
          </div>

          {/* Center: Title + Hook + Strategy */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: C.text, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{opp.title}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
              <span style={{ color: borderColor }}>{opp.hookType}</span>
              <span style={{ color: C.textSoft, marginLeft: 6 }}>{opp.hookLabel}</span>
            </div>
            <div style={{ color: C.textSoft, fontSize: 12, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{opp.strategyCopy}</div>
            <div style={{ marginTop: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: STAGE_COLORS[opp.stage], background: `${STAGE_COLORS[opp.stage]}20`, padding: "2px 8px", borderRadius: 10 }}>{opp.stage}</span>
            </div>
          </div>

          {/* Right: Volume + Chevron */}
          <div style={{ textAlign: "right", minWidth: 90 }}>
            <div style={{ color: C.primary, fontSize: 22, fontWeight: 800 }}>{fmtNum(opp.monthlyVol)}</div>
            <div style={{ color: C.textSoft, fontSize: 10 }}>연 {fmtNum(opp.annualVol)}</div>
            <div style={{ color: C.textSoft, fontSize: 14, marginTop: 4 }}>{isExpanded ? "▴" : "▾"}</div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${C.border}` }}>
            {/* Data Analysis */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
              <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
                <div style={{ color: C.textSoft, fontSize: 10, marginBottom: 4 }}>👥 인구통계</div>
                <div style={{ color: C.text, fontSize: 12, fontWeight: 500 }}>{opp.demographics}</div>
              </div>
              <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
                <div style={{ color: C.textSoft, fontSize: 10, marginBottom: 4 }}>📅 피크시즌</div>
                <div style={{ color: C.text, fontSize: 12, fontWeight: 500 }}>{opp.peakSeason}</div>
              </div>
            </div>

            {/* Mini Heatmap */}
            <div style={{ marginTop: 12, background: C.surface, borderRadius: 10, padding: 12 }}>
              <div style={{ color: C.textSoft, fontSize: 10, marginBottom: 6 }}>📊 월별 검색 트렌드</div>
              <MiniHeatmap data={opp.peakMonths} />
            </div>

            {/* PathFinder Journey */}
            <div style={{ marginTop: 12, background: C.surface, borderRadius: 10, padding: 12 }}>
              <div style={{ color: C.textSoft, fontSize: 10, marginBottom: 8 }}>🗺️ 검색 여정 (PathFinder)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                {opp.pathJourney.map((node, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span style={{ color: C.primary, fontSize: 12, fontWeight: 700 }}>→</span>}
                    <span style={{ background: `${C.primary}20`, color: C.primary, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 8, border: `1px solid ${C.border}` }}>{node}</span>
                  </React.Fragment>
                ))}
              </div>
              <div style={{ color: C.textSoft, fontSize: 11, marginTop: 8, lineHeight: 1.5 }}>{opp.pathInsight}</div>
            </div>

            {/* Cluster Insight */}
            <div style={{ marginTop: 12, background: "rgba(0,212,170,0.06)", borderRadius: 10, padding: 12, border: `1px solid rgba(0,212,170,0.15)` }}>
              <div style={{ color: C.accent, fontSize: 10, fontWeight: 600, marginBottom: 4 }}>🧠 소비자 인식 (Cluster)</div>
              <div style={{ color: C.text, fontSize: 12, lineHeight: 1.5 }}>{opp.clusterInsight}</div>
            </div>

            {/* Top Keywords */}
            <div style={{ marginTop: 12 }}>
              <div style={{ color: C.textSoft, fontSize: 10, marginBottom: 6 }}>🔍 관련 검색어 TOP</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {opp.topKeywords.map((kw, i) => (
                  <span key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px", fontSize: 11, color: C.text }}>
                    {kw.keyword} <span style={{ color: C.primary, fontWeight: 700 }}>{fmtNum(kw.vol)}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* USP + Pain Points */}
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
                <div style={{ color: C.textSoft, fontSize: 10, marginBottom: 4 }}>🔗 USP 연결</div>
                <div style={{ color: C.text, fontSize: 12 }}>{opp.uspConnection}</div>
              </div>
              <div style={{ background: C.surface, borderRadius: 10, padding: 12 }}>
                <div style={{ color: C.textSoft, fontSize: 10, marginBottom: 4 }}>😣 페인포인트</div>
                {(opp.painPoints || []).map((p, i) => (
                  <div key={i} style={{ color: C.text, fontSize: 11, lineHeight: 1.6 }}>• {p}</div>
                ))}
              </div>
            </div>

            {/* Content Hook */}
            <div style={{ marginTop: 12, background: "rgba(255,107,0,0.06)", borderRadius: 10, padding: 12, border: `1px solid rgba(255,107,0,0.15)` }}>
              <div style={{ color: C.textSoft, fontSize: 10, marginBottom: 4 }}>🎣 콘텐츠 훅 예시</div>
              <div style={{ color: C.secondary, fontSize: 14, fontWeight: 600 }}>{opp.contentHook}</div>
            </div>

            {/* Generate Button */}
            <button
              onClick={(e) => { e.stopPropagation(); generateIdeas(opp); }}
              disabled={isLoading}
              style={{
                marginTop: 16, width: "100%", height: 48, borderRadius: 12, border: "none",
                background: isLoading ? C.textSoft : C.primary, color: "#fff",
                fontSize: 15, fontWeight: 700, cursor: isLoading ? "default" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}
            >
              {isLoading ? (
                <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> 생성 중...</>
              ) : "🎬 실행 — AI 숏폼 아이디어 생성"}
            </button>

            {/* Generated Ideas */}
            {ideas && (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {ideas.map((idea, idx) => {
                  if (idea.error) return <div key={idx} style={{ color: C.warn, fontSize: 12, padding: 12, background: "rgba(255,71,87,0.1)", borderRadius: 10 }}>⚠️ {idea.error}</div>;
                  const ideaKey = `${opp.id}-${idx}`;
                  const isIdeaExpanded = expandedIdeas[ideaKey];
                  const ct = CONTENT_TYPES.find(c => c.code === idea.contentType) || CONTENT_TYPES[0];

                  return (
                    <div key={idx} style={{ background: C.surface, borderRadius: 12, border: `1px solid ${C.border}`, borderLeft: `3px solid ${ct.color}`, overflow: "hidden" }}>
                      <div onClick={() => toggleIdea(ideaKey)} style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ color: C.primary, fontSize: 20, fontWeight: 800, minWidth: 28 }}>#{idea.rank || idx + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 10, fontWeight: 600, color: ct.color, background: `${ct.color}20`, padding: "1px 6px", borderRadius: 4 }}>{ct.code}.{ct.name}</span>
                            <span style={{ fontSize: 10, fontWeight: 600, color: STAGE_COLORS[idea.stage] || C.textSoft, background: `${STAGE_COLORS[idea.stage] || C.textSoft}20`, padding: "1px 6px", borderRadius: 4 }}>{idea.stage}</span>
                          </div>
                          <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{idea.title}</div>
                          <div style={{ color: C.secondary, fontSize: 12, marginTop: 2 }}>{idea.hook3s}</div>
                          {/* Scene Flow */}
                          {idea.sceneFlow && (
                            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                              {idea.sceneFlow.map((s, si) => (
                                <span key={si} style={{ flex: 1, fontSize: 10, color: C.textSoft, background: C.card, padding: "4px 6px", borderRadius: 6, textAlign: "center" }}>{s}</span>
                              ))}
                            </div>
                          )}
                          <div style={{ color: C.textSoft, fontSize: 11, marginTop: 4 }}>USP: {idea.uspConnection}</div>
                        </div>
                        <span style={{ color: C.textSoft }}>{isIdeaExpanded ? "▴" : "▾"}</span>
                      </div>
                      {isIdeaExpanded && (
                        <div style={{ padding: "0 16px 12px", borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 0, paddingTop: 12 }}>
                          <div><span style={{ fontSize: 10, color: C.textSoft }}>🎯 타겟</span><div style={{ color: C.text, fontSize: 12, marginTop: 2 }}>{idea.target}</div></div>
                          <div><span style={{ fontSize: 10, color: C.textSoft }}>🎬 크리에이터</span><div style={{ color: C.text, fontSize: 12, marginTop: 2 }}>{idea.creatorType}</div></div>
                          <div><span style={{ fontSize: 10, color: C.textSoft }}>📊 데이터 근거</span><div style={{ color: C.text, fontSize: 12, marginTop: 2 }}>{idea.dataProof}</div></div>
                          <div><span style={{ fontSize: 10, color: C.textSoft }}>📅 시리즈</span><div style={{ color: C.text, fontSize: 12, marginTop: 2 }}>{idea.seriesNote}</div></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ══════════════════════════════════════════════════════
  // TAB 1: OPPORTUNITY DISCOVERY
  // ══════════════════════════════════════════════════════
  const renderTab1 = () => (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 40px" }}>
      {/* Section A: Destination */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>A. 여행 목적지에서 출발한 기회</div>
          <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 8 }}>같은 '여행'을 검색해도 목적지에 따라 궁금해하는 것은 완전히 다릅니다</div>
          <span style={{ fontSize: 11, color: C.primary, background: `${C.primary}15`, padding: "4px 10px", borderRadius: 8, fontWeight: 600 }}>연간 14,602,000+ 검색 | 7개 기회 클러스터</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {DEST_OPPS.map(opp => renderOppCard(opp, "A"))}
        </div>
      </div>

      {/* Section B: Interest */}
      <div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>B. 소비자 관심사에서 출발한 기회</div>
          <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 8 }}>여행을 검색하지 않는 소비자 — 그들의 관심사 속에서 여행과 Trip.com이 발견됩니다</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: C.secondary, background: `${C.secondary}15`, padding: "4px 10px", borderRadius: 8, fontWeight: 600 }}>연간 917,000+ 검색 | 6개 기회 클러스터</span>
            <span style={{ fontSize: 11, color: C.gold, background: "rgba(255,215,0,0.12)", padding: "4px 10px", borderRadius: 8, fontWeight: 600 }}>Trip.com CEO 3E 전략(Event·Elderly·Emerging) 정합</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {INT_OPPS.map(opp => renderOppCard(opp, "B"))}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // TAB 2: CONTENT STRATEGY
  // ══════════════════════════════════════════════════════
  const renderTab2 = () => (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 40px" }}>
      {/* Season Heatmap */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>시즌 캘린더 히트맵</div>
        <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 16 }}>목적지별 검색량 변화를 한눈에 파악하고 콘텐츠 타이밍을 최적화하세요</div>
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: C.textSoft, fontSize: 11, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>목적지</th>
                  {MONTHS.map(m => (
                    <th key={m} style={{ padding: "12px 8px", textAlign: "center", color: C.textSoft, fontSize: 11, fontWeight: 500, borderBottom: `1px solid ${C.border}` }}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(SEASON_DATA).map(([dest, vals]) => (
                  <tr key={dest}>
                    <td style={{ padding: "10px 16px", color: C.text, fontSize: 12, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{dest}</td>
                    {vals.map((v, i) => {
                      const opacity = v / 100;
                      return (
                        <td key={i} style={{ padding: 4, borderBottom: `1px solid ${C.border}`, textAlign: "center" }}>
                          <div style={{ background: `rgba(7,112,227,${opacity})`, borderRadius: 6, padding: "8px 4px", color: v >= 70 ? "#fff" : C.textSoft, fontSize: 10, fontWeight: v >= 80 ? 700 : 400, minWidth: 36 }}>
                            {v}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Content Types */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>7가지 콘텐츠 유형</div>
        <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 16 }}>소비자 여정의 각 단계에 최적화된 콘텐츠 유형으로 전환율을 극대화합니다</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {CONTENT_TYPES.map(ct => (
            <div key={ct.code} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, borderLeft: `3px solid ${ct.color}`, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: ct.color, background: `${ct.color}20`, padding: "2px 8px", borderRadius: 6 }}>{ct.code}</span>
                <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{ct.name}</span>
              </div>
              <div style={{ color: C.textSoft, fontSize: 12 }}>{ct.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 90/10 Series */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>90/10 시리즈 연작 전략</div>
        <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 16 }}>관심사에서 시작해 브랜드로 연결하는 3편 시리즈 구조</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { ep: "1편", ratio: "90/10", desc: "관심사 90% + Trip.com 10%", sub: "후킹에 브랜드 없음. 순수 관심사 콘텐츠", color: C.accent },
            { ep: "2편", ratio: "60/40", desc: "관심사 60% + Trip.com 40%", sub: "자연스러운 기능 소개. '이걸 쓰면 편하더라'", color: C.primary },
            { ep: "3편", ratio: "30/70", desc: "관심사 30% + Trip.com 70%", sub: "USP 전면. 예약 전환 유도", color: C.secondary },
          ].map(item => (
            <div key={item.ep} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, textAlign: "center" }}>
              <div style={{ color: item.color, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.ep}</div>
              <div style={{ color: C.text, fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{item.ratio}</div>
              <div style={{ color: C.text, fontSize: 12, fontWeight: 500, marginBottom: 4 }}>{item.desc}</div>
              <div style={{ color: C.textSoft, fontSize: 11 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Stage */}
      <div>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>결정 단계 매핑</div>
        <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 16 }}>Dream → Plan → Book → Share 각 단계에 맞는 콘텐츠를 배치합니다</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          {[
            { stage: "Dream", desc: "영감과 발견", icon: "💭", examples: "맛집/리조트 탐방, 시즌 경험" },
            { stage: "Plan", desc: "비교와 결정", icon: "📋", examples: "경비/일정/코스 비교" },
            { stage: "Book", desc: "예약 전환", icon: "🎫", examples: "가격 비교, USP 실증" },
            { stage: "Share", desc: "후기 공유", icon: "📢", examples: "리얼 후기, Before/After" },
          ].map(s => (
            <div key={s.stage} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, borderTop: `3px solid ${STAGE_COLORS[s.stage]}`, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: STAGE_COLORS[s.stage], fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{s.stage}</div>
              <div style={{ color: C.text, fontSize: 12, fontWeight: 500, marginBottom: 4 }}>{s.desc}</div>
              <div style={{ color: C.textSoft, fontSize: 11 }}>{s.examples}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // TAB 3: USP × CREATOR
  // ══════════════════════════════════════════════════════
  const renderTab3 = () => (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 40px" }}>
      {/* USPs */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Trip.com USP 5종</div>
        <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 16 }}>소비자 페인포인트를 직접 해결하는 Trip.com의 핵심 무기</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {USPS.map(usp => (
            <div key={usp.id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 28, minWidth: 40, textAlign: "center" }}>{usp.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ color: C.text, fontSize: 15, fontWeight: 700 }}>{usp.name}</span>
                  <span style={{ fontSize: 10, color: C.primary, background: `${C.primary}15`, padding: "2px 8px", borderRadius: 8 }}>Rank #{usp.rank}</span>
                </div>
                <div style={{ color: C.textSoft, fontSize: 12, marginBottom: 6 }}>{usp.desc} — {usp.detail}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {usp.pains.map((p, i) => (
                    <span key={i} style={{ fontSize: 11, color: C.warn, background: "rgba(255,71,87,0.1)", padding: "3px 8px", borderRadius: 6 }}>😣 {p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Tiers */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>크리에이터 4단계</div>
        <div style={{ color: C.textSoft, fontSize: 13, marginBottom: 16 }}>캠페인 목적에 따라 최적의 크리에이터 조합을 설계합니다</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          {CREATOR_TIERS.map(ct => (
            <div key={ct.tier} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, borderTop: `3px solid ${ct.color}`, padding: 20, textAlign: "center" }}>
              <div style={{ color: ct.color, fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{ct.tier}</div>
              <div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{ct.range}</div>
              <div style={{ color: C.textSoft, fontSize: 12 }}>{ct.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Approach A & B */}
      <div>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>접근법 A + B</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24 }}>
            <div style={{ color: C.primary, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>접근법 A: USP 중심</div>
            <div style={{ color: C.textSoft, fontSize: 12, lineHeight: 1.8 }}>
              1. USP 5종 중 하나를 선택<br/>
              2. 해당 USP가 해결하는 페인포인트 확인<br/>
              3. 페인포인트를 가진 타겟 오디언스 매칭<br/>
              4. 타겟에 맞는 콘텐츠 유형(A~G) 결정<br/>
              5. 크리에이터 티어 선택 후 실행
            </div>
          </div>
          <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24 }}>
            <div style={{ color: C.secondary, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>접근법 B: 타겟 중심</div>
            <div style={{ color: C.textSoft, fontSize: 12, lineHeight: 1.8 }}>
              1. 13개 기회 클러스터 중 타겟 선택<br/>
              2. 타겟의 검색 여정과 페인포인트 분석<br/>
              3. 적합한 USP 매칭<br/>
              4. 결정 단계(Dream/Plan/Book)에 맞는 콘텐츠 설계<br/>
              5. 크리에이터 조합 후 실행
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // RENDER: FOOTER
  // ══════════════════════════════════════════════════════
  const renderFooter = () => (
    <div style={{ borderTop: `1px solid ${C.border}`, padding: "24px 0", textAlign: "center" }}>
      <div style={{ color: C.textSoft, fontSize: 11, letterSpacing: 3, fontWeight: 500 }}>
        PENTACLE × AI&nbsp;&nbsp;&nbsp;ALGORITHM PERFORMANCE PLATFORM
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // MAIN RENDER
  // ══════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: C.dark, color: C.text }}>
      {/* CSS Keyframes for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {renderHeader()}
      {renderHero()}
      {renderCompBanner()}
      {renderTabs()}

      {activeTab === 0 && renderTab1()}
      {activeTab === 1 && renderTab2()}
      {activeTab === 2 && renderTab3()}

      {renderFooter()}
    </div>
  );
}
