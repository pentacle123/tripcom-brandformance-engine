"use client";
import React, { useState, useCallback, useEffect } from "react";

// ══════════════════════════════════════════════════════════════
// Trip.com AI Brandformance Engine v6.0
// Light Theme | YouTube API Creators | 4-Step | Samyang Patterns
// ══════════════════════════════════════════════════════════════

// ── COLOR SYSTEM (LIGHT THEME) ──
const C = {
  primary: "#0770E3", secondary: "#FF6B00",
  bg: "#F5F7FA", card: "#FFFFFF", surface: "#F8FAFC",
  border: "#E2E8F0", borderActive: "#0770E3",
  text: "#1E293B", textSoft: "#64748B",
  accent: "#10B981", warn: "#EF4444",
  gold: "#D97706", purple: "#8B5CF6",
  youtube: "#FF0000", instagram: "#C13584",
  bannerBg: "#F0F9FF", footerBg: "#F8FAFC",
};
const LEVEL_COLORS = { MEGA: "#0770E3", LARGE: "#10B981", MEDIUM: "#F59E0B", NICHE: "#8B5CF6" };
const STAGE_STYLES = {
  Dream: { bg: "#EFF6FF", color: "#0770E3" },
  Plan: { bg: "#FFF7ED", color: "#FF6B00" },
  Book: { bg: "#F0FDF4", color: "#10B981" },
  Share: { bg: "#FFFBEB", color: "#D97706" },
};

// ══════════════════════════════════════════════════════════════
// DATA: YOUTUBE SEARCH QUERIES (per opportunity)
// ══════════════════════════════════════════════════════════════
const YT_QUERIES = {
  "opp-d1": ["오사카 맛집 브이로그", "일본 규카츠 먹방"],
  "opp-d2": ["다낭 리조트 후기", "다낭 가성비 여행"],
  "opp-d3": ["방콕 가족여행 브이로그", "태국 아이 데리고"],
  "opp-d4": ["유럽여행 브이로그", "스페인 여행 코스"],
  "opp-d5": ["대만 야시장 먹방", "타이베이 맛집"],
  "opp-d6": ["괌 가족여행", "하와이 브이로그"],
  "opp-d7": ["삿포로 눈축제", "삿포로 겨울여행"],
  "opp-i1": ["골프 라운딩 브이로그", "해외 골프"],
  "opp-i2": ["신혼여행 브이로그", "발리 풀빌라"],
  "opp-i3": ["한달살기 브이로그", "치앙마이 생활"],
  "opp-i4": ["부모님 여행 브이로그", "효도여행 후기"],
  "opp-i5": ["영어캠프 후기", "세부 어학연수"],
  "opp-i6": ["해외 콘서트 브이로그", "마라톤 여행"],
};

// ══════════════════════════════════════════════════════════════
// DATA: DESTINATION OPPORTUNITIES (7)
// ══════════════════════════════════════════════════════════════
const DEST_OPPS = [
  { id:"opp-d1", title:"일본 맛집 탐방객", icon:"🍣", hookType:"Taste-hook", hookLabel:"미식 디스커버리", strategyCopy:"맛집이 여행의 Entry Point. 73K 검색의 미식 욕구를 여행 동선으로 확장한다.", level:"MEGA", region:"일본", destinations:["오사카","후쿠오카","도쿄","교토"], monthlyVol:136090, annualVol:1633080, keyInsight:"일본 여행 검색의 70%가 '맛집'에서 시작", demographics:"여성 67% · 30-40대 60%", peakSeason:"10~1월", peakMonths:[80,70,65,60,70,75,85,75,60,95,100,90], stage:"Dream", pathJourney:["맛집","맛집거리","관광지","동선","근교여행"], pathInsight:"맛집에서 시작해서 여행 전체를 계획하게 됨", clusterInsight:"일본여행 클러스터에서 '맛집'이 가장 큰 허브 노드", topKeywords:[{keyword:"오사카 맛집",vol:73090},{keyword:"후쿠오카 맛집",vol:45000},{keyword:"도쿄 맛집",vol:40000},{keyword:"오사카 규카츠",vol:12100},{keyword:"오사카 라멘",vol:11483},{keyword:"오사카 스시",vol:9800},{keyword:"교토 맛집",vol:8500},{keyword:"오사카 타코야끼",vol:6200}], uspConnection:"Trip.Best 맛집 랭킹 + 원스톱 예약", painPoints:["맛집이 너무 많아서 못 고르겠다","현지인 맛집 vs 관광객 맛집 구분이 안 된다","예약 방법을 모르겠다"], contentHook:"오사카 현지인만 아는 규카츠 골목 3곳", dataProof:"오사카맛집 73,090/월, 규카츠 12,100/월, 라멘 11,483/월" },
  { id:"opp-d2", title:"다낭·나트랑 가성비 리조트 여행자", icon:"🏖️", hookType:"Value-hook", hookLabel:"가성비 증명", strategyCopy:"일정→경비가 두 번째 관문. '이 가격에 이 리조트가 가능하다'는 실증이 전환을 만든다.", level:"MEGA", region:"베트남", destinations:["다낭","나트랑"], monthlyVol:174649, annualVol:2095788, keyInsight:"일정과 경비가 핵심 의사결정 요인", demographics:"여성 66% · 30-40대 58%", peakSeason:"1월, 5~7월", peakMonths:[90,65,60,55,75,85,90,80,55,65,65,75], stage:"Plan", pathJourney:["3박4일","패키지","3박5일","경비","맛집/리조트"], pathInsight:"일정 프레임으로 시작 → 경비 확인이 핵심 관문", clusterInsight:"다낭 클러스터에서 '리조트'와 '경비'가 양대 허브", topKeywords:[{keyword:"다낭 여행",vol:75116},{keyword:"나트랑 여행",vol:99533},{keyword:"다낭 리조트",vol:23406},{keyword:"다낭 맛집",vol:18500},{keyword:"다낭 3박4일",vol:14200},{keyword:"다낭 경비",vol:9800},{keyword:"다낭 호이안",vol:7600},{keyword:"나트랑 리조트",vol:35000}], uspConnection:"가격 경쟁력 + 트립지니 AI 일정 플래너", painPoints:["패키지가 나을지 자유여행이 나을지 모르겠다","경비가 얼마나 들지 감이 안 온다"], contentHook:"다낭 3박4일 50만원 리조트 루트, 실제 영수증 공개", dataProof:"다낭여행 75,116/월, 나트랑 99,533/월, 리조트 23,406/월" },
  { id:"opp-d3", title:"방콕·태국 가족여행 안전 탐색자", icon:"👨‍👩‍👧", hookType:"Safety-hook", hookLabel:"안심 가족여행", strategyCopy:"가족=안전 최우선. 불안을 해소하면 예약이 따라온다.", level:"MEGA", region:"태국", destinations:["방콕","태국 전체","파타야"], monthlyVol:129526, annualVol:1554312, keyInsight:"가족 안전이 최우선", demographics:"여성 71% · 30대 32%, 40대 27%", peakSeason:"1월, 7~8월, 12월", peakMonths:[90,55,50,40,55,60,70,55,40,45,40,85], stage:"Plan", pathJourney:["가족여행","파타야","안전/주의사항","효도여행","호텔"], pathInsight:"가족여행에서 시작 → 안전 확인이 필수 관문", clusterInsight:"방콕 클러스터에서 '가족'과 '안전'이 강력 연결", topKeywords:[{keyword:"방콕 여행",vol:55550},{keyword:"태국 여행",vol:73976},{keyword:"방콕 맛집",vol:9610},{keyword:"방콕 마사지",vol:8200},{keyword:"태국 여행코스",vol:25000},{keyword:"방콕 가족여행",vol:4800},{keyword:"파타야 여행",vol:12000},{keyword:"태국 주의사항",vol:3500}], uspConnection:"24시간 한국어 CS + 가족 패키지", painPoints:["아이 데리고 가도 안전할까","영어 못하면 어떡하지","위생이 걱정된다"], contentHook:"아이 2명과 방콕-파타야 6일, 안전하게 다녀온 리얼 후기", dataProof:"방콕 55,550/월, 태국 73,976/월" },
  { id:"opp-d4", title:"유럽 첫 여행자", icon:"🗼", hookType:"Discovery-hook", hookLabel:"첫 발견의 설렘", strategyCopy:"지리 학습부터 시작하는 유럽 초보자.", level:"MEGA", region:"유럽", destinations:["스페인","이탈리아","스위스","프랑스","영국","독일"], monthlyVol:266224, annualVol:3194688, keyInsight:"지리 학습부터 시작. 나라 선택→코스→패키지 순서", demographics:"여성 74% · 50대+ 31%", peakSeason:"1월, 5~6월, 9~10월", peakMonths:[65,55,55,45,50,50,40,40,40,45,35,40], stage:"Dream", pathJourney:["유럽","나라/지도","패키지","혼자여행","자전거여행"], pathInsight:"유럽에서 시작 → 나라 선택 → 패키지 vs 자유여행 분기", clusterInsight:"유럽여행 클러스터에서 국가별 서브 클러스터가 뚜렷", topKeywords:[{keyword:"유럽 여행",vol:45586},{keyword:"스페인 여행",vol:67973},{keyword:"이탈리아 여행",vol:54613},{keyword:"스위스 여행",vol:52466},{keyword:"유럽 패키지",vol:15000},{keyword:"유럽 여행코스",vol:12000},{keyword:"유럽 경비",vol:8000},{keyword:"유럽 혼자여행",vol:5500}], uspConnection:"원스톱 다국가 예약 + Trip.Best 코스 추천", painPoints:["나라가 너무 많아서 어디부터 가야 할지 모르겠다","경비가 얼마나 들지 감이 안 잡힌다"], contentHook:"유럽 처음이면 이 3개국 10일 루트가 정답인 이유", dataProof:"유럽 45,586/월, 스페인 67,973/월" },
  { id:"opp-d5", title:"대만 맛집·야시장 탐방객", icon:"🧋", hookType:"Taste-hook", hookLabel:"야시장 어드벤처", strategyCopy:"대만=야시장. 먹거리 탐험이 곧 여행의 전부.", level:"MEGA", region:"동아시아", destinations:["대만"], monthlyVol:186300, annualVol:2235600, keyInsight:"맛집+야시장이 핵심", demographics:"여성 72% · 40-50대 56%", peakSeason:"10~1월", peakMonths:[85,60,55,50,55,60,55,50,55,65,65,70], stage:"Dream", pathJourney:["대만여행","맛집","야시장","관광지","경비"], pathInsight:"맛집/야시장이 핵심 허브", clusterInsight:"대만여행 클러스터에서 '야시장'과 '맛집'이 최대 허브", topKeywords:[{keyword:"대만 여행",vol:186300},{keyword:"대만 맛집",vol:9553},{keyword:"대만 야시장",vol:7200},{keyword:"타이베이 맛집",vol:5800},{keyword:"지우펀",vol:4500},{keyword:"대만 경비",vol:3200}], uspConnection:"Trip.Best 맛집 랭킹 + 가격 비교", painPoints:["야시장이 너무 많은데 어디가 진짜 맛있는지 모르겠다"], contentHook:"대만 야시장 먹거리 1만원으로 10가지 도전", dataProof:"대만여행 186,300/월, 맛집 9,553/월" },
  { id:"opp-d6", title:"괌·하와이 가족 리조트 여행자", icon:"🌺", hookType:"Family-hook", hookLabel:"가족 리조트", strategyCopy:"괌=30대 가족의 첫 해외, 하와이=50대 버킷리스트.", level:"MEGA", region:"미주", destinations:["괌","하와이"], monthlyVol:93359, annualVol:1120308, keyInsight:"괌=30대 가족, 하와이=50대+ 버킷리스트", demographics:"괌: 30대 36% / 하와이: 50대+ 30%", peakSeason:"괌 1,4~6월 / 하와이 1,5~7월", peakMonths:[70,55,55,55,65,75,70,50,65,75,90,70], stage:"Plan", pathJourney:["괌/하와이","맛집","비용","호텔","액티비티"], pathInsight:"괌은 '아이 첫 해외여행', 하와이는 '인생 여행'", clusterInsight:"괌 클러스터에서 '가족'과 '아이' 연결 강함", topKeywords:[{keyword:"괌 여행",vol:60576},{keyword:"하와이 여행",vol:32783},{keyword:"괌 맛집",vol:9636},{keyword:"하와이 맛집",vol:8500},{keyword:"하와이 비용",vol:12000},{keyword:"괌 호텔",vol:7200}], uspConnection:"원스톱 항공+호텔+액티비티", painPoints:["괌과 하와이 중 어디가 맞는지 모르겠다"], contentHook:"괌 vs 하와이, 아이 나이별로 추천이 다른 이유", dataProof:"괌 60,576/월, 하와이 32,783/월" },
  { id:"opp-d7", title:"삿포로 겨울 시즌 여행자", icon:"❄️", hookType:"Season-hook", hookLabel:"시즌 한정 경험", strategyCopy:"겨울에만 가능한 경험. 눈축제+온천+스키.", level:"MEGA", region:"일본", destinations:["삿포로"], monthlyVol:91766, annualVol:1101192, keyInsight:"겨울 시즌 집중", demographics:"여성 68% · 40대 29%", peakSeason:"11~2월", peakMonths:[85,70,50,40,45,50,55,45,40,70,85,100], stage:"Plan", pathJourney:["삿포로","눈축제","온천","스키","맛집"], pathInsight:"눈축제가 핵심 트리거", clusterInsight:"삿포로 클러스터에서 '겨울'이 압도적 허브", topKeywords:[{keyword:"삿포로 여행",vol:91766},{keyword:"삿포로 눈축제",vol:30000},{keyword:"삿포로 맛집",vol:18000},{keyword:"삿포로 온천",vol:9500},{keyword:"삿포로 스키",vol:7200}], uspConnection:"Trip.Best 시즌 추천 + 스키 패키지", painPoints:["눈축제 기간에 숙소 잡기 어렵다","겨울 옷차림 불안"], contentHook:"삿포로 눈축제 시즌 3박4일 완벽 동선", dataProof:"삿포로 91,766/월, 눈축제 30,000/월" },
];

const INT_OPPS = [
  { id:"opp-i1", title:"시니어 골프 여행자", icon:"⛳", hookType:"Lifestyle-hook", hookLabel:"라이프스타일 소구", strategyCopy:"유일한 남성 다수 여행 검색. 골프로 잡는다.", level:"LARGE", interest:"골프", e3tag:"Elderly", monthlyVol:24523, annualVol:284990, keyInsight:"골프만 남성 61%", demographics:"남성 61% · 50대+ 54%", peakSeason:"연중 (봄가을 피크)", peakMonths:[60,55,65,70,65,55,50,45,55,70,65,60], stage:"Plan", destinations:["후쿠오카","태국","베트남"], pathJourney:["골프여행","동남아","태국","가격","캐디/여행사"], pathInsight:"골프여행 → 동남아 가성비 → 가격 비교", clusterInsight:"골프여행 클러스터에서 '가격'과 '패키지'가 양대 허브", topKeywords:[{keyword:"일본 골프 여행",vol:18923},{keyword:"골프 여행",vol:5600},{keyword:"태국 골프",vol:3200},{keyword:"골프 패키지",vol:2800},{keyword:"후쿠오카 골프",vol:2100}], uspConnection:"원스톱(항공+호텔+골프장) + 가격 경쟁력", painPoints:["골프장+항공+숙소 따로 예약 귀찮다","가격 비교 어렵다"], contentHook:"50대 아버지를 위한 후쿠오카 골프 3박 실비 공개", dataProof:"일본골프 18,923/월(남성61%)" },
  { id:"opp-i2", title:"신혼여행 커플", icon:"💍", hookType:"Emotion-hook", hookLabel:"인생 최고의 여행", strategyCopy:"발리가 디폴트. 가성비 실증이 전환을 만든다.", level:"LARGE", interest:"신혼여행", e3tag:null, monthlyVol:26843, annualVol:331060, keyInsight:"발리 디폴트. 비용→풀빌라 여정", demographics:"여성 63% · 25-34세 88%", peakSeason:"연중 (1월 피크)", peakMonths:[85,70,65,60,65,70,60,55,65,75,80,75], stage:"Dream", destinations:["발리","하와이","몰디브"], pathJourney:["신혼여행","발리","비용","추천순위","풀빌라"], pathInsight:"발리가 디폴트 → 풀빌라가 결정 포인트", clusterInsight:"신혼여행 클러스터에서 '발리'가 압도적 허브", topKeywords:[{keyword:"신혼여행",vol:26843},{keyword:"신혼여행 추천",vol:12000},{keyword:"발리 신혼여행",vol:8500},{keyword:"신혼여행 비용",vol:6200},{keyword:"풀빌라",vol:4800}], uspConnection:"Trip.Best 허니문 랭킹 + 풀빌라 가격 비교", painPoints:["여행사 vs 직접 예약 고민","예산 내 최고 경험 욕구"], contentHook:"발리 신혼여행 400만원이면 이 풀빌라 가능", dataProof:"신혼여행 26,843/월, +20% 성장" },
  { id:"opp-i3", title:"은퇴·한달살기 탐색자", icon:"🏠", hookType:"Life-hook", hookLabel:"세컨드라이프 설계", strategyCopy:"한달살기는 '여행'이 아니라 '삶의 실험'이다.", level:"MEDIUM", interest:"한달살기", e3tag:"Elderly", monthlyVol:11173, annualVol:156790, keyInsight:"치앙마이 vs 발리가 양대 선택지", demographics:"여성 63% · 40-50대 66%", peakSeason:"1월, 가을", peakMonths:[80,65,60,55,60,55,50,50,55,65,70,75], stage:"Dream", destinations:["치앙마이","발리","다낭"], pathJourney:["한달살기","해외","동남아","저렴한곳","치앙마이비용"], pathInsight:"동남아가 가성비 압도", clusterInsight:"한달살기에서 '비용'과 '장기숙소'가 핵심 허브", topKeywords:[{keyword:"한달살기",vol:11173},{keyword:"해외 한달살기",vol:5800},{keyword:"치앙마이 한달살기",vol:3500},{keyword:"발리 한달살기",vol:2400},{keyword:"한달살기 비용",vol:1800}], uspConnection:"장기 숙소 예약 + 트립지니 가이드", painPoints:["장기 숙소 구하기 어렵다","생활비 감 안 잡힘"], contentHook:"치앙마이 한달살기 150만원 리얼 가계부", dataProof:"한달살기 11,173/월" },
  { id:"opp-i4", title:"효도/부모님 여행 기획자", icon:"🙏", hookType:"Emotion-hook", hookLabel:"후회 트리거", strategyCopy:"'후회'라는 감정이 가장 강력한 전환 동기.", level:"MEDIUM", interest:"효도여행", e3tag:"Elderly", monthlyVol:6692, annualVol:71640, keyInsight:"30대 자녀가 대신 검색", demographics:"여성 79% · 30대 40%", peakSeason:"1월, 5월, 9월", peakMonths:[85,60,55,50,75,55,50,45,70,55,50,65], stage:"Dream", destinations:["일본","동남아","유럽"], pathJourney:["부모님여행","60대/70대","효도여행","추천","후회/10계명"], pathInsight:"감정 콘텐츠에 강하게 반응", clusterInsight:"부모님여행에서 '60대'와 '70대'가 핵심 노드", topKeywords:[{keyword:"부모님 해외여행",vol:6692},{keyword:"효도 여행",vol:3800},{keyword:"부모님 여행 추천",vol:2500},{keyword:"60대 해외여행",vol:1800},{keyword:"부모님 여행 후회",vol:900}], uspConnection:"24시간 한국어 CS + 시니어 맞춤", painPoints:["해외 문제 발생 시 불안","영어 못하시는 부모님"], contentHook:"부모님 첫 해외여행 보내드리기 전 꼭 알아야 할 5가지", dataProof:"부모님여행 6,692/월, 여성79%" },
  { id:"opp-i5", title:"자녀 영어캠프 기획 맘", icon:"📚", hookType:"Solution-hook", hookLabel:"원스톱 해결", strategyCopy:"원스톱이라는 USP가 가장 직접적으로 소구되는 타겟.", level:"NICHE", interest:"영어캠프", e3tag:null, monthlyVol:2256, annualVol:42340, keyInsight:"40대 엄마가 검색", demographics:"여성 72% · 40대 46%", peakSeason:"1~3월, 10~11월", peakMonths:[80,75,70,50,45,40,55,50,45,70,75,65], stage:"Plan", destinations:["세부","괌","호주"], pathJourney:["영어캠프","세부","비용","프로그램비교","항공"], pathInsight:"세부가 가성비 1위", clusterInsight:"영어캠프 클러스터에서 '세부'가 압도적", topKeywords:[{keyword:"영어캠프",vol:2256},{keyword:"세부 영어캠프",vol:1800},{keyword:"영어캠프 비용",vol:900},{keyword:"겨울방학 영어캠프",vol:750},{keyword:"괌 영어캠프",vol:400}], uspConnection:"원스톱 항공+숙소+액티비티", painPoints:["캠프+항공+숙소 따로 예약 복잡"], contentHook:"세부 영어캠프 4주, 한번에 해결한 방법", dataProof:"영어캠프 2,256/월, 40대엄마 46%" },
  { id:"opp-i6", title:"이벤트+여행 연결자", icon:"🎪", hookType:"Event-hook", hookLabel:"이벤트 연결 여행", strategyCopy:"'보러 가는 여행'은 전환율이 가장 높다.", level:"NICHE", interest:"이벤트", e3tag:"Event", monthlyVol:2579, annualVol:30860, keyInsight:"3E 전략 핵심", demographics:"콘서트:20대여성/마라톤:30-40대남성/미식:여성63%", peakSeason:"이벤트별 상이", peakMonths:[55,50,55,60,55,65,60,55,60,65,55,50], stage:"Plan", destinations:["일본","미국","유럽","태국"], pathJourney:["이벤트확인","일정","항공+숙소","예약"], pathInsight:"전환 경로가 짧고 전환율 최고", clusterInsight:"이벤트 검색은 의도가 매우 구체적", topKeywords:[{keyword:"미식 여행",vol:1323},{keyword:"해외 마라톤",vol:1070},{keyword:"해외 콘서트",vol:186},{keyword:"도쿄 마라톤",vol:800},{keyword:"와인 여행",vol:450}], uspConnection:"이벤트 일정 연동 + 원스톱 예약", painPoints:["이벤트 날짜 항공편 빨리 잡아야"], contentHook:"도쿄마라톤 참가자를 위한 3박4일 루트", dataProof:"마라톤 1,070/월, 미식 1,323/월" },
];

const ALL_OPPS = [...DEST_OPPS, ...INT_OPPS];

// ══════════════════════════════════════════════════════════════
// DATA: 6-AXIS CONTEXT (per opportunity)
// ══════════════════════════════════════════════════════════════
const CONTEXT_DATA = {
  "opp-d1": { who:{tags:["30-40대 여성","맛집 탐방 관심자","자녀 동반 가족","커플 여행자"],evidence:"여성 67.4% | 30대 25.3%, 40대 34.5% | 오사카맛집 검색자 연 1,918,800회"}, when:{tags:["가을 피크 10-11월","연말연시 12-1월","골든위크 전 3-4월","방학 시즌 7-8월"],evidence:"10월 검색 지수 95, 11월 100으로 피크 | 여름 대비 가을 +40%"}, journey:{tags:["맛집 → 맛집거리 → 관광지 → 동선 → 근교여행"],evidence:"PathFinder 50개 경로 분석 | 맛집이 진입점"}, pain:{tags:["맛집이 너무 많아 못 고르겠다","현지인 vs 관광객 맛집 구분 불가","예약 방법을 모르겠다"],evidence:"오사카맛집 73,090/월 중 '추천' 포함 35%+"}, usp:{tags:["Trip.Best 맛집 랭킹","원스톱 예약","AI 추천"],evidence:"Trip.Best 선택의 고통 해결 USP 직결"}, hook:{tags:["오사카 현지인 규카츠 골목","30분 줄 서는 라멘집","1000엔 이하 스시"],evidence:"규카츠 12,100/월, 라멘 11,483/월, 스시 9,800/월"} },
  "opp-d2": { who:{tags:["30-40대 여성","가성비 중시","커플/신혼","가족"],evidence:"여성 66% | 30대 28%, 40대 30%"}, when:{tags:["1월 피크","5-7월 여름","추석 전후"],evidence:"1월 90, 7월 90 이중 피크"}, journey:{tags:["3박4일 → 패키지 → 경비 → 맛집 → 리조트"],evidence:"일정 프레임이 진입점"}, pain:{tags:["패키지 vs 자유여행 결정 못함","경비 감 안 잡힘","리조트 선택 어려움"],evidence:"다낭 경비 9,800/월"}, usp:{tags:["가격 경쟁력","트립지니 AI","호텔 최저가"],evidence:"아고다 대비 항공 강점"}, hook:{tags:["50만원 리조트 루트","실제 영수증 공개","3박4일 완벽 동선"],evidence:"다낭여행 75,116/월, 리조트 23,406/월"} },
  "opp-d3": { who:{tags:["30-40대 엄마","가족 여행 기획자","효도여행 검토자"],evidence:"여성 71% | 30대 32%, 40대 27%"}, when:{tags:["1월 설 연휴","7-8월 여름방학","12월 겨울방학"],evidence:"1월 90, 12월 85 방학 집중"}, journey:{tags:["가족여행 → 파타야 → 안전 → 효도여행 → 호텔"],evidence:"안전 확인이 필수 관문"}, pain:{tags:["아이 데리고 안전할까","영어 못하면","위생 걱정"],evidence:"태국 주의사항 3,500/월"}, usp:{tags:["24시간 한국어 CS","가족 패키지","환불 보장"],evidence:"24시간 CS가 가족여행 최대 안심"}, hook:{tags:["아이 2명 방콕-파타야 6일","가족 안전 루트","현지 병원 위치"],evidence:"방콕 가족여행 4,800/월"} },
  "opp-d4": { who:{tags:["50대+ 여성","첫 유럽 여행자","패키지 선호"],evidence:"여성 74% | 50대+ 31%"}, when:{tags:["1월 계획 시작","5-6월 봄 여행","9-10월 가을"],evidence:"1월 65 피크"}, journey:{tags:["유럽 → 나라/지도 → 패키지 → 혼자여행"],evidence:"지리 학습부터 시작"}, pain:{tags:["나라 너무 많아 선택 불가","경비 감 안 잡힘","언어 장벽"],evidence:"유럽 패키지 15,000/월"}, usp:{tags:["원스톱 다국가 예약","Trip.Best 코스 추천"],evidence:"다국가 원스톱이 최대 USP"}, hook:{tags:["3개국 10일 루트","유럽 경비 300만원","처음이면 이 나라"],evidence:"유럽 45,586/월, 스페인 67,973/월"} },
  "opp-d5": { who:{tags:["40-50대 여성","맛집 탐방러","야시장 마니아"],evidence:"여성 72% | 40대 28%, 50대 28%"}, when:{tags:["10-1월 피크","설 연휴 전후"],evidence:"1월 85 피크"}, journey:{tags:["대만여행 → 맛집 → 야시장 → 관광지 → 경비"],evidence:"맛집/야시장이 핵심"}, pain:{tags:["야시장 너무 많아 선택 불가","진짜 맛있는 곳 모름"],evidence:"대만 야시장 7,200/월"}, usp:{tags:["Trip.Best 맛집 랭킹","가격 비교"],evidence:"Trip.Best로 큐레이션"}, hook:{tags:["1만원으로 야시장 10가지","현지인 TOP 5","지우펀 먹방 루트"],evidence:"대만여행 186,300/월"} },
  "opp-d6": { who:{tags:["30대 가족 (괌)","50대+ 버킷리스트 (하와이)","리조트 선호"],evidence:"괌 30대 36% | 하와이 50대+ 30%"}, when:{tags:["괌 1,4-6월","하와이 1,5-7월","11월 피크"],evidence:"괌 11월 90 피크"}, journey:{tags:["괌/하와이 → 맛집 → 비용 → 호텔 → 액티비티"],evidence:"비용 관문이 큼"}, pain:{tags:["괌 vs 하와이 선택 불가","비용 높음","액티비티 정보 부족"],evidence:"하와이 비용 12,000/월"}, usp:{tags:["원스톱 항공+호텔+액티비티","가격 경쟁력"],evidence:"원스톱으로 15-20% 절감"}, hook:{tags:["아이 나이별 괌 vs 하와이","가족 4인 200만원 괌","하와이 버킷리스트"],evidence:"괌 60,576/월, 하와이 32,783/월"} },
  "opp-d7": { who:{tags:["40대 여성","겨울 여행 마니아","온천/스키 관심자"],evidence:"여성 68% | 40대 29%"}, when:{tags:["11-2월 집중","눈축제 2월 초","12월 연말"],evidence:"12월 100 최고 피크"}, journey:{tags:["삿포로 → 눈축제 → 온천 → 스키 → 맛집"],evidence:"눈축제가 핵심 트리거"}, pain:{tags:["눈축제 시즌 숙소 어려움","겨울 옷차림 불안","교통편 복잡"],evidence:"눈축제 30,000/월"}, usp:{tags:["Trip.Best 시즌 추천","스키 패키지","조기 예약 할인"],evidence:"시즌 패키지 묶어 예약"}, hook:{tags:["눈축제 3박4일 동선","숙소 예약 타이밍","온천 TOP 3"],evidence:"삿포로 91,766/월"} },
  "opp-i1": { who:{tags:["50대+ 남성","골프 동호회","은퇴자/직장인"],evidence:"남성 61% | 50대+ 54%"}, when:{tags:["봄 3-4월 피크","가을 10월 피크","연중 고른 분포"],evidence:"4월 70, 10월 70"}, journey:{tags:["골프여행 → 동남아 → 태국 → 가격 → 여행사"],evidence:"가격이 핵심 결정 요인"}, pain:{tags:["따로 예약 귀찮다","가격 비교 어렵다","현지 캐디 예약"],evidence:"골프 패키지 2,800/월"}, usp:{tags:["원스톱 패키지","가격 경쟁력"],evidence:"항공+호텔+골프장 원스톱"}, hook:{tags:["후쿠오카 골프 3박 실비","50대 아버지 선물","황제투어 vs 가성비"],evidence:"일본골프 18,923/월"} },
  "opp-i2": { who:{tags:["25-34세 여성","예비 신혼부부","풀빌라 관심자"],evidence:"여성 63% | 25-34세 88%"}, when:{tags:["연중 (1월 피크)","봄 결혼 시즌","10-11월"],evidence:"1월 85 피크"}, journey:{tags:["신혼여행 → 발리 → 비용 → 추천순위 → 풀빌라"],evidence:"풀빌라가 최종 결정"}, pain:{tags:["여행사 vs 직접 예약","예산 내 최고 경험","풀빌라 비교 어려움"],evidence:"신혼여행 비용 6,200/월"}, usp:{tags:["Trip.Best 허니문","풀빌라 가격비교"],evidence:"풀빌라 가격 비교가 핵심"}, hook:{tags:["400만원 발리 풀빌라","여행사 안 쓴 이유","SNS 인생샷 스팟"],evidence:"신혼여행 26,843/월"} },
  "opp-i3": { who:{tags:["40-50대 여성","은퇴 준비자","디지털노마드"],evidence:"여성 63% | 40-50대 66%"}, when:{tags:["1월 새해 결심","가을 추석 후"],evidence:"1월 80 피크"}, journey:{tags:["한달살기 → 해외 → 동남아 → 저렴한곳 → 치앙마이비용"],evidence:"비용이 최종 결정"}, pain:{tags:["장기 숙소 어렵다","생활비 감 안 잡힘","비자/보험 복잡"],evidence:"한달살기 비용 1,800/월"}, usp:{tags:["장기 숙소 예약","트립지니 가이드","가격 경쟁력"],evidence:"장기 숙박 할인율"}, hook:{tags:["치앙마이 150만원 가계부","한달살기 A to Z","은퇴 후 첫 한달살기"],evidence:"한달살기 11,173/월"} },
  "opp-i4": { who:{tags:["30대 여성 (자녀)","부모님 대리 검색","효도 기획자"],evidence:"여성 79% | 30대 40%"}, when:{tags:["1월 설","5월 어버이날","9월 추석"],evidence:"1월 85, 5월 75"}, journey:{tags:["부모님여행 → 60대/70대 → 효도여행 → 추천 → 후회"],evidence:"'후회' 감정에 반응"}, pain:{tags:["해외 문제 시 불안","영어 못하시는 부모님","체력 고려"],evidence:"부모님 여행 후회 900/월"}, usp:{tags:["24시간 한국어 CS","시니어 맞춤","안전 보장"],evidence:"24시간 CS가 최대 안심"}, hook:{tags:["부모님 첫 해외여행 5가지","보내드리고 후회한 것들","60대 맞춤 코스"],evidence:"부모님여행 6,692/월"} },
  "opp-i5": { who:{tags:["40대 엄마","초등학생 자녀","교육열 높은 학부모"],evidence:"여성 72% | 40대 46%"}, when:{tags:["1-3월 여름방학 준비","10-11월 겨울방학 준비"],evidence:"1월 80 피크"}, journey:{tags:["영어캠프 → 세부 → 비용 → 프로그램비교 → 항공"],evidence:"세부가 가성비 1위"}, pain:{tags:["캠프+항공+숙소 따로 복잡","프로그램 품질 불안","아이 안전 걱정"],evidence:"영어캠프 비용 900/월"}, usp:{tags:["원스톱 항공+숙소","가격 비교","24시간 CS"],evidence:"원스톱이 가장 직접 소구"}, hook:{tags:["세부 4주 한번에 해결","영어캠프 비용 비교표","엄마 준비 꿀팁"],evidence:"영어캠프 2,256/월"} },
  "opp-i6": { who:{tags:["20대 여성 (콘서트)","30-40대 남성 (마라톤)","미식 관심 여성"],evidence:"이벤트별 타겟 상이 | 높은 전환 의도"}, when:{tags:["이벤트 일정에 따라","공연 발표 직후","대회 등록 시즌"],evidence:"이벤트 확정 → 즉시 검색"}, journey:{tags:["이벤트 확인 → 일정 → 항공+숙소 → 예약"],evidence:"전환 경로 짧고 전환율 높음"}, pain:{tags:["이벤트 항공편 빨리 잡아야","교통+숙소 맞추기","티켓+여행 동시"],evidence:"시간 압박이 최대"}, usp:{tags:["이벤트 일정 연동","원스톱 예약","빠른 예약"],evidence:"원스톱이 최대 소구"}, hook:{tags:["도쿄마라톤 러닝+관광","해외 콘서트 원정","미식 페스티벌 TOP 5"],evidence:"마라톤 1,070/월"} },
};

// ── CONTENT TYPES ──
const CONTENT_TYPES = [
  { code:"A", name:"진정성형", color:"#FF6B6B" },{ code:"B", name:"가성비증명형", color:"#4ECDC4" },
  { code:"C", name:"일정가이드형", color:"#45B7D1" },{ code:"D", name:"정보발견형", color:"#96CEB4" },
  { code:"E", name:"UGC리뷰형", color:"#DDA0DD" },{ code:"F", name:"USP실증형", color:"#FFD93D" },
  { code:"G", name:"허락형", color:"#FF8B94" },
];
const USPS = [
  { id:"onestop", name:"원스톱 플랫폼", icon:"🔗", desc:"항공+호텔+액티비티 한 번에", pains:["예약 따로따로 귀찮다","가격 비교에 지친다"] },
  { id:"cs", name:"24시간 한국어 CS", icon:"🇰🇷", desc:"언제든 한국어 상담", pains:["해외에서 문제생기면?","영어 못하면?"] },
  { id:"tripbest", name:"Trip.Best 랭킹", icon:"🏆", desc:"선택의 고통 해결", pains:["어디가 좋은지 모르겠다"] },
  { id:"price", name:"가격 경쟁력", icon:"💰", desc:"최저가 보장 + 할인코드", pains:["최저가를 찾고 싶다"] },
  { id:"tripgenie", name:"트립지니 AI", icon:"🤖", desc:"AI 여행 플래너", pains:["일정 짜기 귀찮다"] },
];
const CREATOR_TIERS = [
  { tier:"MACRO", range:"10~100만", cost:"500~2,000만/편", role:"신뢰 구축", kpi:"저장/공유율", color:"#FF6B00" },
  { tier:"MICRO", range:"1~10만", cost:"80~300만/편", role:"커뮤니티 침투", kpi:"인게이지먼트/CTR", color:"#0770E3" },
  { tier:"NANO", range:"1만 미만", cost:"20~80만/편", role:"UGC 볼륨", kpi:"UGC 볼륨", color:"#8B5CF6" },
];

// ── SYSTEM PROMPT ──
const SYSTEM_PROMPT = `당신은 Trip.com 한국 숏폼 콘텐츠 전략가입니다.
규칙: 1.후킹에 브랜드명 금지 2.관심사90%+여행10% 3.콘텐츠유형A~G 4.Dream/Plan/Book/Share 5.시리즈1편(90/10)→2편(60/40)→3편(30/70) 6.USP5종
JSON 배열로만 응답. 마크다운 없이.
[{"rank":1,"title":"제목","contentType":"A~G","stage":"Dream|Plan|Book|Share","hook3s":"후킹카피","sceneFlow":["씬1","씬2","씬3","씬4"],"uspConnection":"USP","target":"타겟","creatorType":"MACRO|MICRO|NANO","dataProof":"근거","seriesNote":"시리즈","conversionScore":85~98,"perspective":"A|B|C","creatorMatch":{"name":"크리에이터명","strategy":"협업전략"},"youtubeShorts":{"title":"유튜브제목","hook":"유튜브후킹","hashtags":["태그1","태그2"],"uploadTime":"최적시간"},"instagramReels":{"title":"인스타제목","hook":"인스타후킹","hashtags":["태그1","태그2"],"uploadTime":"최적시간"},"adTargeting":"광고타겟팅"}]`;

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function BrandformanceEngine() {
  const [step, setStep] = useState(0);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [generatedIdeas, setGeneratedIdeas] = useState({});
  const [loadingIds, setLoadingIds] = useState({});
  const [expandedIdeas, setExpandedIdeas] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [ideaPerspective, setIdeaPerspective] = useState("auto");
  const [ytCreators, setYtCreators] = useState({});
  const [ytLoading, setYtLoading] = useState({});

  const fmtNum = (n) => n >= 1000000 ? (n/1000000).toFixed(1)+"M" : n >= 1000 ? (n/1000).toFixed(0)+"K" : String(n);
  const toggleIdea = useCallback((k) => setExpandedIdeas(p => ({...p,[k]:!p[k]})),[]);
  const toggleSection = useCallback((k) => setExpandedSections(p => ({...p,[k]:!p[k]})),[]);
  const selectOpp = (opp) => { setSelectedOpp(opp); setStep(1); setSelectedIdea(null); };
  const goToIdeas = () => setStep(2);
  const goToStoryboard = (idea) => { setSelectedIdea(idea); setStep(3); };
  const scoreColor = (s) => s >= 95 ? C.accent : s >= 85 ? C.primary : C.secondary;

  const classifyTier = (subs) => {
    if (subs >= 100000) return { tier:"MACRO", color:"#FF6B00" };
    if (subs >= 10000) return { tier:"MICRO", color:"#0770E3" };
    return { tier:"NANO", color:"#8B5CF6" };
  };

  // ── YouTube API: Search Creators ──
  const searchCreators = useCallback(async (oppId) => {
    if (ytCreators[oppId] || ytLoading[oppId]) return;
    setYtLoading(p => ({...p,[oppId]:true}));
    try {
      const queries = YT_QUERIES[oppId] || [];
      if (!queries.length) return;
      const res = await fetch(`/api/youtube?type=search&q=${encodeURIComponent(queries[0])}&maxResults=5`);
      const data = await res.json();
      if (data.error || !data.items?.length) { setYtCreators(p => ({...p,[oppId]:[]})); return; }
      const channels = {};
      data.items.forEach(item => {
        const chId = item.snippet?.channelId;
        const chTitle = item.snippet?.channelTitle;
        if (chId && !channels[chId]) channels[chId] = { id: chId, name: chTitle, videoTitle: item.snippet?.title, thumbnail: item.snippet?.thumbnails?.default?.url, views: item.statistics?.viewCount };
      });
      const chIds = Object.keys(channels).join(",");
      if (chIds) {
        const statsRes = await fetch(`/api/youtube?type=channelStats&channelId=${chIds}`);
        const statsData = await statsRes.json();
        (statsData.items || []).forEach(ch => {
          if (channels[ch.id]) {
            channels[ch.id].subs = parseInt(ch.statistics?.subscriberCount || "0");
            channels[ch.id].thumbnail = ch.snippet?.thumbnails?.default?.url || channels[ch.id].thumbnail;
          }
        });
      }
      setYtCreators(p => ({...p,[oppId]:Object.values(channels)}));
    } catch { setYtCreators(p => ({...p,[oppId]:[]})); }
    finally { setYtLoading(p => ({...p,[oppId]:false})); }
  }, [ytCreators, ytLoading]);

  // ── Claude API ──
  const generateIdeas = useCallback(async (opp) => {
    if (loadingIds[opp.id]) return;
    setLoadingIds(p => ({...p,[opp.id]:true}));
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: [{ role: "user", content: `숏폼 아이디어 5개:\n제목:${opp.title}\n인사이트:${opp.keyInsight}\n인구통계:${opp.demographics}\n검색량:월${opp.monthlyVol?.toLocaleString()}\n전략:${opp.strategyCopy}\n후킹:${opp.hookType} ${opp.hookLabel}\n콘텐츠훅:${opp.contentHook}\nUSP:${opp.uspConnection}\n페인:${(opp.painPoints||[]).join(",")}\n데이터:${opp.dataProof}` }] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error?.message || data.error);
      const text = data.content?.[0]?.text || "";
      const m = text.match(/\[[\s\S]*\]/);
      if (m) setGeneratedIdeas(p => ({...p,[opp.id]:JSON.parse(m[0])}));
      else throw new Error("JSON 파싱 실패");
    } catch (e) { setGeneratedIdeas(p => ({...p,[opp.id]:[{error:e.message}]})); }
    finally { setLoadingIds(p => ({...p,[opp.id]:false})); }
  }, [loadingIds]);

  // Auto-search creators when opp is selected
  useEffect(() => { if (selectedOpp) searchCreators(selectedOpp.id); }, [selectedOpp]);

  // ── Pill style helper ──
  const pill = (bg, color, text, extra) => ({ fontSize:10, fontWeight:600, color, background:bg, padding:"3px 10px", borderRadius:8, display:"inline-block", ...extra });

  // ══════════════════════════════════════════════════════
  // HEADER
  // ══════════════════════════════════════════════════════
  const Header = () => (
    <div style={{ position:"sticky", top:0, zIndex:100, background:"#FFFFFF", borderBottom:`1px solid ${C.border}`, padding:"12px 0" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => { setStep(0); setSelectedOpp(null); setSelectedIdea(null); }}>
          <div style={{ background:C.primary, color:"#fff", fontWeight:800, fontSize:11, padding:"4px 8px", borderRadius:6 }}>Trip.com</div>
          <div>
            <div style={{ color:C.text, fontSize:15, fontWeight:700 }}>AI Brandformance Engine</div>
            <div style={{ color:C.textSoft, fontSize:10, letterSpacing:2 }}>ALGORITHM PERFORMANCE PLATFORM</div>
          </div>
        </div>
        <div style={{ color:C.textSoft, fontSize:12 }}>Pentacle × AI</div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // STEP INDICATOR
  // ══════════════════════════════════════════════════════
  const STEPS_LABEL = ["기회 발견","기회 분석","AI 아이디어","스토리보드"];
  const StepIndicator = () => (
    <div style={{ position:"sticky", top:52, zIndex:99, background:"#FFFFFF", borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"14px 24px", display:"flex", alignItems:"center" }}>
        {STEPS_LABEL.map((s,i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ flex:1, height:2, background:i<=step?C.primary:"#CBD5E1", margin:"0 4px" }} />}
            <div style={{ display:"flex", alignItems:"center", gap:6, cursor:i<=step?"pointer":"default", opacity:i<=step?1:0.4 }}
              onClick={() => { if(i<=step){ setStep(i); if(i===0){setSelectedOpp(null);setSelectedIdea(null);} if(i<=1)setSelectedIdea(null); }}}>
              <div style={{ width:26, height:26, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", background:i<=step?(i===step?C.primary:C.accent):"#CBD5E1", color:i<=step?"#fff":C.textSoft, fontSize:12, fontWeight:700 }}>{i+1}</div>
              <span style={{ color:i<=step?C.text:C.textSoft, fontSize:12, fontWeight:i===step?700:500, whiteSpace:"nowrap" }}>{s}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // MINI HEATMAP
  // ══════════════════════════════════════════════════════
  const MiniHeatmap = ({ data }) => (
    <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:28 }}>
      {data.map((v,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
          <div style={{ width:"100%", height:Math.max(4,v*0.24), borderRadius:2, background:v>=80?C.primary:v>=60?"rgba(7,112,227,0.4)":"rgba(7,112,227,0.15)" }} />
          <span style={{ fontSize:8, color:C.textSoft }}>{i+1}</span>
        </div>
      ))}
    </div>
  );

  // ══════════════════════════════════════════════════════
  // CREATOR CARD (YouTube API result)
  // ══════════════════════════════════════════════════════
  const CreatorCards = ({ oppId }) => {
    const creators = ytCreators[oppId];
    const loading = ytLoading[oppId];
    if (loading) return (
      <div style={{ display:"flex", gap:12 }}>
        {[0,1,2].map(i => <div key={i} style={{ flex:1, height:80, borderRadius:12, background:"#E2E8F0", animation:"pulse 1.5s infinite" }} />)}
      </div>
    );
    if (!creators || !creators.length) return <div style={{ color:C.textSoft, fontSize:12, padding:12 }}>크리에이터 검색 결과가 없습니다</div>;
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {creators.map((cr,i) => {
          const t = classifyTier(cr.subs || 0);
          return (
            <div key={i} style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`, borderLeft:`3px solid ${t.color}`, padding:14, display:"flex", gap:12, alignItems:"center" }}>
              {cr.thumbnail && <img src={cr.thumbnail} alt="" style={{ width:40, height:40, borderRadius:20, objectFit:"cover" }} />}
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                  <span style={{ color:C.text, fontSize:13, fontWeight:700 }}>{cr.name}</span>
                  <span style={pill(`${t.color}15`, t.color, "")}>{t.tier}</span>
                  <span style={{ color:C.textSoft, fontSize:10 }}>{cr.subs ? fmtNum(cr.subs)+"명" : ""}</span>
                </div>
                {cr.videoTitle && <div style={{ color:C.textSoft, fontSize:11, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>최근: {cr.videoTitle}</div>}
                <div style={{ color:C.primary, fontSize:10, marginTop:2 }}>이 크리에이터와 협업 시 → 관심사 90% + 여행 10% 콘텐츠로 자연스러운 노출</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ══════════════════════════════════════════════════════
  // STEP 0: OPPORTUNITY DISCOVERY
  // ══════════════════════════════════════════════════════
  const renderStep0 = () => (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 24px 40px" }}>
      {/* Hero */}
      <div style={{ display:"grid", gridTemplateColumns:"55% 45%", gap:20, marginBottom:24 }}>
        <div style={{ background:"linear-gradient(135deg, #0770E3 0%, #0EA5E9 100%)", borderRadius:20, padding:36 }}>
          <div style={{ color:"rgba(255,255,255,0.8)", fontSize:12, letterSpacing:3, fontWeight:600, marginBottom:8 }}>TRIP.COM × PENTACLE</div>
          <div style={{ color:"#fff", fontSize:28, fontWeight:800, marginBottom:8 }}>AI Brandformance Engine</div>
          <div style={{ color:"rgba(255,255,255,0.8)", fontSize:13, lineHeight:1.6, marginBottom:24 }}>소비자의 관심사에서 여행과 Trip.com을 발견하게 하는<br/>AI 기반 마케팅 전략 플랫폼</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {[{e:"🔍",t:"관심사 데이터"},{e:"✈️",t:"여행 발견"},{e:"📈",t:"Trip.com 성장"}].map((it,i) => (
              <React.Fragment key={i}>
                {i>0 && <span style={{ color:"rgba(255,255,255,0.6)", fontSize:20, fontWeight:800 }}>{i===1?"×":"="}</span>}
                <div style={{ flex:1, background:"rgba(255,255,255,0.15)", borderRadius:12, padding:"12px 8px", textAlign:"center" }}>
                  <div style={{ fontSize:22 }}>{it.e}</div>
                  <div style={{ color:"#fff", fontSize:11, fontWeight:600, marginTop:4 }}>{it.t}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[{l:"해외 출국자",v:"29.24M",s:"2025 내국인 해외관광",c:C.text},{l:"트립닷컴 검색",v:"9.49M",s:"브랜드 직접 검색",c:C.primary},{l:"발견 공백",v:"14.60M+",s:"목적지만 검색, 기회",c:C.secondary,h:true}].map((it,i) => (
            <React.Fragment key={i}>
              {i>0 && <div style={{ textAlign:"center", color:C.textSoft, fontSize:16, fontWeight:800 }}>{i===1?"━":"═"}</div>}
              <div style={{ background:C.card, border:`1px solid ${it.h?"rgba(255,107,0,0.3)":C.border}`, borderRadius:14, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div><div style={{ color:C.textSoft, fontSize:11, marginBottom:4 }}>{it.l}</div><div style={{ color:it.c, fontSize:28, fontWeight:800 }}>{it.v}</div></div>
                <div style={{ color:C.textSoft, fontSize:11 }}>{it.s}</div>
              </div>
            </React.Fragment>
          ))}
          <div style={{ color:C.textSoft, fontSize:11, textAlign:"center", marginTop:4 }}>이 <span style={{ color:C.secondary, fontWeight:700 }}>14.60M</span> 소비자가 Trip.com을 발견하지 못하고 있습니다</div>
        </div>
      </div>

      {/* Competition Banner */}
      <div style={{ background:C.bannerBg, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12, marginBottom:32 }}>
        <div style={{ color:C.textSoft, fontSize:12 }}><span style={{ color:C.text, fontWeight:600 }}>OTA 경쟁 환경:</span> 스카이스캐너 317.8만 {">"}아고다 160.8만 {">"}네이버항공권 157.7만 {">"}<span style={{ color:C.primary, fontWeight:600 }}>트립닷컴 79.1만</span> {">"}마이리얼트립 57.8만</div>
        <div style={{ color:C.gold, fontSize:11 }}>💡 스카이스캐너→트립닷컴 크로스플로우</div>
      </div>

      {/* Section A */}
      <div style={{ marginBottom:40 }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:18, fontWeight:700, marginBottom:4 }}>A. 여행 목적지에서 출발한 기회</div>
          <div style={{ color:C.textSoft, fontSize:13, marginBottom:8 }}>목적지에 따라 궁금해하는 것은 완전히 다릅니다</div>
          <span style={pill(`${C.primary}12`,C.primary,"")}>연간 14,602,000+ 검색 | 7개 기회 클러스터</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {DEST_OPPS.map(opp => {
            const ss = STAGE_STYLES[opp.stage] || {};
            return (
              <div key={opp.id} onClick={() => selectOpp(opp)} style={{ background:C.card, borderRadius:16, border:`1px solid ${hoveredCard===opp.id?C.primary:C.border}`, borderLeft:`3px solid ${C.primary}`, padding:"16px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:16, transition:"all 0.2s", transform:hoveredCard===opp.id?"translateY(-2px)":"none", boxShadow:hoveredCard===opp.id?"0 4px 12px rgba(0,0,0,0.08)":"none" }} onMouseEnter={() => setHoveredCard(opp.id)} onMouseLeave={() => setHoveredCard(null)}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, minWidth:48 }}>
                  <span style={{ fontSize:28 }}>{opp.icon}</span>
                  <span style={{ fontSize:9, fontWeight:700, color:"#fff", background:LEVEL_COLORS[opp.level], padding:"2px 6px", borderRadius:4 }}>{opp.level}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:C.text, fontSize:15, fontWeight:700, marginBottom:3 }}>{opp.title}</div>
                  <div style={{ fontSize:12, marginBottom:2 }}><span style={{ color:C.primary, fontWeight:600 }}>{opp.hookType}</span> <span style={{ color:C.textSoft }}>{opp.hookLabel}</span></div>
                  <div style={{ color:C.textSoft, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{opp.strategyCopy}</div>
                  <span style={pill(ss.bg||"#EFF6FF", ss.color||C.primary, "", {marginTop:4})}>{opp.stage}</span>
                </div>
                <div style={{ textAlign:"right", minWidth:80 }}>
                  <div style={{ color:C.primary, fontSize:22, fontWeight:800 }}>{fmtNum(opp.monthlyVol)}</div>
                  <div style={{ color:C.textSoft, fontSize:10 }}>연 {fmtNum(opp.annualVol)}</div>
                  <div style={{ color:C.primary, fontSize:11, marginTop:4 }}>분석하기 →</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section B */}
      <div>
        <div style={{ marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:18, fontWeight:700, marginBottom:4 }}>B. 소비자 관심사에서 출발한 기회</div>
          <div style={{ color:C.textSoft, fontSize:13, marginBottom:8 }}>관심사 속에서 Trip.com이 발견됩니다</div>
          <div style={{ display:"flex", gap:8 }}>
            <span style={pill(`${C.secondary}12`,C.secondary,"")}>연간 917,000+ 검색 | 6개 기회 클러스터</span>
            <span style={pill("#FFFBEB","#D97706","")}>3E 전략 정합</span>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {INT_OPPS.map(opp => {
            const ss = STAGE_STYLES[opp.stage] || {};
            return (
              <div key={opp.id} onClick={() => selectOpp(opp)} style={{ background:C.card, borderRadius:16, border:`1px solid ${hoveredCard===opp.id?C.secondary:C.border}`, borderLeft:`3px solid ${C.secondary}`, padding:"16px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:16, transition:"all 0.2s", transform:hoveredCard===opp.id?"translateY(-2px)":"none", boxShadow:hoveredCard===opp.id?"0 4px 12px rgba(0,0,0,0.08)":"none" }} onMouseEnter={() => setHoveredCard(opp.id)} onMouseLeave={() => setHoveredCard(null)}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, minWidth:48 }}>
                  <span style={{ fontSize:28 }}>{opp.icon}</span>
                  <span style={{ fontSize:9, fontWeight:700, color:"#fff", background:LEVEL_COLORS[opp.level], padding:"2px 6px", borderRadius:4 }}>{opp.level}</span>
                  {opp.e3tag && <span style={pill("#FFFBEB","#D97706","")}>{opp.e3tag}</span>}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:C.text, fontSize:15, fontWeight:700, marginBottom:3 }}>{opp.title}</div>
                  <div style={{ fontSize:12, marginBottom:2 }}><span style={{ color:C.secondary, fontWeight:600 }}>{opp.hookType}</span> <span style={{ color:C.textSoft }}>{opp.hookLabel}</span></div>
                  <div style={{ color:C.textSoft, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{opp.strategyCopy}</div>
                </div>
                <div style={{ textAlign:"right", minWidth:80 }}>
                  <div style={{ color:C.secondary, fontSize:22, fontWeight:800 }}>{fmtNum(opp.monthlyVol)}</div>
                  <div style={{ color:C.textSoft, fontSize:10 }}>연 {fmtNum(opp.annualVol)}</div>
                  <div style={{ color:C.secondary, fontSize:11, marginTop:4 }}>분석하기 →</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // STEP 1: OPPORTUNITY ANALYSIS (6-axis)
  // ══════════════════════════════════════════════════════
  const AXIS_CFG = [
    { key:"who", color:"#FF6B6B", label:"WHO", sub:"누가 검색하는가?" },
    { key:"when", color:"#4ECDC4", label:"WHEN", sub:"언제 검색하는가?" },
    { key:"journey", color:"#45B7D1", label:"JOURNEY", sub:"어떤 경로로 검색하는가?" },
    { key:"pain", color:"#FF8B94", label:"PAIN", sub:"소비자의 고통은?" },
    { key:"usp", color:"#FFD93D", label:"USP FIT", sub:"Trip.com이 해결할 수 있는 것" },
    { key:"hook", color:"#DDA0DD", label:"HOOK", sub:"콘텐츠 진입점" },
  ];

  const renderStep1 = () => {
    if (!selectedOpp) return null;
    const opp = selectedOpp;
    const ctx = CONTEXT_DATA[opp.id] || {};
    const ideas = generatedIdeas[opp.id];
    return (
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 24px 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
              <span style={{ fontSize:36 }}>{opp.icon}</span>
              <div><div style={{ color:C.text, fontSize:22, fontWeight:800 }}>{opp.title}</div><div style={{ color:C.textSoft, fontSize:13 }}>{opp.strategyCopy}</div></div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <span style={pill("#EFF6FF",C.primary,"")}>📊 ListeningMind 검증</span>
              <span style={pill("#F0FDF4",C.accent,"")}>🔍 PathFinder 경로</span>
              <span style={{ fontSize:10, fontWeight:700, color:"#fff", background:LEVEL_COLORS[opp.level], padding:"3px 10px", borderRadius:8 }}>{opp.level}</span>
            </div>
          </div>
          <button onClick={() => { goToIdeas(); if(!ideas) generateIdeas(opp); }} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:12, padding:"12px 24px", fontSize:14, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>AI 아이디어 생성 실행 →</button>
        </div>

        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:16, marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ color:C.textSoft, fontSize:11 }}>📊 월별 검색 트렌드</span>
            <span style={{ color:C.primary, fontSize:20, fontWeight:800 }}>월 {fmtNum(opp.monthlyVol)}</span>
          </div>
          <MiniHeatmap data={opp.peakMonths} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {AXIS_CFG.map(ax => {
            const d = ctx[ax.key]; if(!d) return null;
            return (
              <div key={ax.key} style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ color:ax.color, fontSize:14 }}>●</span>
                  <div><div style={{ color:C.text, fontSize:14, fontWeight:700 }}>{ax.label}</div><div style={{ color:C.textSoft, fontSize:11 }}>{ax.sub}</div></div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
                  {d.tags.map((tag,i) => <span key={i} style={{ fontSize:11, fontWeight:500, color:C.text, background:`${ax.color}15`, border:`1px solid ${ax.color}30`, padding:"4px 10px", borderRadius:20 }}>{tag}</span>)}
                </div>
                <div style={{ background:"#F8FAFC", borderRadius:8, padding:"8px 12px", border:`1px solid ${C.border}` }}>
                  <div style={{ color:C.textSoft, fontSize:9, fontWeight:600, letterSpacing:1, marginBottom:4 }}>DATA EVIDENCE</div>
                  <div style={{ color:C.text, fontSize:11, lineHeight:1.5 }}>{d.evidence}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════
  // STEP 2: AI IDEAS
  // ══════════════════════════════════════════════════════
  const PERSP = [{key:"auto",label:"AI 자동 추천"},{key:"A",label:"A. 소비자 맥락 조합"},{key:"B",label:"B. 검색 여정 발견"},{key:"C",label:"C. 크로스 카테고리"}];

  const renderStep2 = () => {
    if (!selectedOpp) return null;
    const opp = selectedOpp;
    const ideas = generatedIdeas[opp.id];
    const isLoading = loadingIds[opp.id];
    return (
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 24px 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div><div style={{ color:C.text, fontSize:20, fontWeight:800 }}>{opp.icon} {opp.title} — AI 아이디어 TOP 5</div><div style={{ color:C.textSoft, fontSize:12 }}>Claude AI가 검색 데이터 기반으로 생성한 숏폼 아이디어</div></div>
          {!ideas && !isLoading && <button onClick={() => generateIdeas(opp)} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:12, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>🎬 생성 실행</button>}
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {PERSP.map(p => <button key={p.key} onClick={() => setIdeaPerspective(p.key)} style={{ padding:"6px 14px", borderRadius:16, border:`1px solid ${ideaPerspective===p.key?C.primary:C.border}`, background:ideaPerspective===p.key?"#EFF6FF":"transparent", color:ideaPerspective===p.key?C.primary:C.textSoft, fontSize:11, fontWeight:600, cursor:"pointer" }}>{p.label}</button>)}
        </div>
        {isLoading && <div style={{ textAlign:"center", padding:60 }}><div style={{ display:"inline-block", width:32, height:32, border:"3px solid #E2E8F0", borderTopColor:C.primary, borderRadius:"50%", animation:"spin 0.8s linear infinite" }} /><div style={{ color:C.textSoft, fontSize:13, marginTop:12 }}>AI가 아이디어를 생성 중...</div></div>}
        {ideas && <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {ideas.map((idea,idx) => {
            if (idea.error) return <div key={idx} style={{ color:C.warn, fontSize:12, padding:16, background:"#FEF2F2", borderRadius:12 }}>⚠️ {idea.error}</div>;
            const ct = CONTENT_TYPES.find(c => c.code === idea.contentType) || CONTENT_TYPES[0];
            const score = idea.conversionScore || (95-idx*3);
            const ideaKey = `${opp.id}-${idx}`;
            const isExp = expandedIdeas[ideaKey];
            const ss = STAGE_STYLES[idea.stage] || {};
            if (ideaPerspective !== "auto" && idea.perspective && idea.perspective !== ideaPerspective) return null;
            return (
              <div key={idx} style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, borderLeft:`3px solid ${ct.color}`, overflow:"hidden" }}>
                <div style={{ padding:"16px 20px", display:"flex", alignItems:"flex-start", gap:16 }}>
                  <div style={{ fontSize:32, fontWeight:800, color:C.primary, minWidth:40, textAlign:"center", lineHeight:1 }}>#{idea.rank||idx+1}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:6, marginBottom:6, flexWrap:"wrap" }}>
                      <span style={pill(`${ct.color}20`,ct.color,"")}>{ct.code}.{ct.name}</span>
                      <span style={pill(ss.bg||"#EFF6FF",ss.color||C.textSoft,"")}>{idea.stage}</span>
                      {idea.perspective && <span style={pill(`${C.purple}12`,C.purple,"")}>{idea.perspective}</span>}
                    </div>
                    <div style={{ color:C.text, fontSize:16, fontWeight:700, marginBottom:4 }}>{idea.title}</div>
                    <div style={{ color:C.secondary, fontSize:14, fontStyle:"italic", marginBottom:8 }}>{idea.hook3s}</div>
                    {idea.sceneFlow && <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                      {idea.sceneFlow.map((s,si) => <div key={si} style={{ flex:1, fontSize:10, color:C.textSoft, background:C.surface, padding:"6px 8px", borderRadius:8, textAlign:"center", border:`1px solid ${C.border}` }}><span style={{ color:C.primary, fontWeight:700 }}>{si+1}.</span> {s}</div>)}
                    </div>}
                    <div style={{ color:C.primary, fontSize:12 }}>USP: {idea.uspConnection}</div>
                    {idea.creatorMatch && <div style={{ marginTop:8, background:C.surface, borderRadius:10, padding:"8px 12px", border:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:11, color:C.text }}>🎬 크리에이터 협업 — <b>{idea.creatorMatch.name}</b>이(가) {idea.creatorMatch.strategy}</span>
                    </div>}
                  </div>
                  <div style={{ textAlign:"center", minWidth:70 }}>
                    <div style={{ color:scoreColor(score), fontSize:36, fontWeight:800, lineHeight:1 }}>{score}</div>
                    <div style={{ color:C.textSoft, fontSize:9, marginBottom:10 }}>전환점수</div>
                    <button onClick={() => goToStoryboard(idea)} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:8, padding:"6px 12px", fontSize:10, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>스토리보드 →</button>
                  </div>
                </div>
                <div onClick={() => toggleIdea(ideaKey)} style={{ padding:"8px 20px", borderTop:`1px solid ${C.border}`, cursor:"pointer", textAlign:"center" }}><span style={{ color:C.textSoft, fontSize:11 }}>{isExp?"▴ 접기":"▾ 상세 보기"}</span></div>
                {isExp && <div style={{ padding:"0 20px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div><span style={{ fontSize:10, color:C.textSoft }}>🎯 타겟</span><div style={{ color:C.text, fontSize:12, marginTop:2 }}>{idea.target}</div></div>
                  <div><span style={{ fontSize:10, color:C.textSoft }}>🎬 크리에이터</span><div style={{ color:C.text, fontSize:12, marginTop:2 }}>{idea.creatorType}</div></div>
                  <div><span style={{ fontSize:10, color:C.textSoft }}>📊 데이터 근거</span><div style={{ color:C.text, fontSize:12, marginTop:2 }}>{idea.dataProof}</div></div>
                  <div><span style={{ fontSize:10, color:C.textSoft }}>📅 시리즈</span><div style={{ color:C.text, fontSize:12, marginTop:2 }}>{idea.seriesNote}</div></div>
                </div>}
              </div>
            );
          })}
        </div>}
      </div>
    );
  };

  // ══════════════════════════════════════════════════════
  // STEP 3: STORYBOARD (YouTube + Instagram 2-col)
  // ══════════════════════════════════════════════════════
  const renderStep3 = () => {
    if (!selectedOpp || !selectedIdea) return null;
    const opp = selectedOpp;
    const idea = selectedIdea;
    const yt = idea.youtubeShorts || {};
    const ig = idea.instagramReels || {};
    const ct = CONTENT_TYPES.find(c => c.code === idea.contentType) || CONTENT_TYPES[0];
    const ss = STAGE_STYLES[idea.stage] || {};

    const PlatformCard = ({ platform, color, icon, maxDur, title, hook, hashtags, uploadTime }) => (
      <div style={{ flex:1, background:C.card, borderRadius:16, border:`1px solid ${C.border}`, borderTop:`3px solid ${color}`, overflow:"hidden", padding:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <span style={{ fontSize:18 }}>{icon}</span>
          <span style={{ color, fontSize:14, fontWeight:700 }}>{platform}</span>
          <span style={{ color:C.textSoft, fontSize:11 }}>MAX {maxDur}, 9:16</span>
        </div>
        <div style={{ color:C.text, fontSize:15, fontWeight:700, marginBottom:8 }}>{title || idea.title}</div>
        <div style={{ marginBottom:12 }}><div style={{ color, fontSize:11, fontWeight:600, marginBottom:4 }}>✦ HOOK (0-3초)</div><div style={{ color:C.text, fontSize:13, fontStyle:"italic" }}>{hook || idea.hook3s}</div></div>
        <div style={{ marginBottom:12 }}><div style={{ color, fontSize:11, fontWeight:600, marginBottom:6 }}>✦ SCENE FLOW</div>
          {(idea.sceneFlow||[]).map((s,i) => <div key={i} style={{ display:"flex", gap:8, marginBottom:4 }}><span style={{ color, fontSize:11, fontWeight:700, minWidth:16 }}>{i+1}</span><span style={{ color:C.text, fontSize:12 }}>{s}</span></div>)}
        </div>
        <div style={{ marginBottom:12 }}><div style={{ color:C.accent, fontSize:11, fontWeight:600, marginBottom:4 }}>✓ PROOF</div><div style={{ color:C.text, fontSize:12 }}>{idea.dataProof}</div></div>
        <div style={{ marginBottom:12 }}><div style={{ color:C.secondary, fontSize:11, fontWeight:600, marginBottom:4 }}>→ CTA</div><div style={{ color:C.text, fontSize:12 }}>{idea.uspConnection}</div></div>
        {hashtags?.length > 0 && <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:12 }}>{hashtags.map((h,i) => <span key={i} style={{ fontSize:10, color, background:`${color}10`, padding:"2px 8px", borderRadius:10 }}>#{h}</span>)}</div>}
        <div style={{ display:"flex", gap:12, fontSize:10, color:C.textSoft }}>{uploadTime && <span>⏰ {uploadTime}</span>}<span>🎯 {idea.target||opp.demographics}</span></div>
      </div>
    );

    return (
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 24px 40px" }}>
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex", gap:8, marginBottom:8 }}><span style={pill(`${ct.color}20`,ct.color,"")}>{ct.code}.{ct.name}</span><span style={pill(ss.bg||"#EFF6FF",ss.color||C.textSoft,"")}>{idea.stage}</span></div>
          <div style={{ color:C.text, fontSize:22, fontWeight:800, marginBottom:4 }}>{idea.title}</div>
          <div style={{ color:C.secondary, fontSize:14, fontStyle:"italic" }}>{idea.hook3s}</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
          <PlatformCard platform="YouTube Shorts" color={C.youtube} icon="▶" maxDur="60s" title={yt.title} hook={yt.hook} hashtags={yt.hashtags} uploadTime={yt.uploadTime} />
          <PlatformCard platform="Instagram Reels" color={C.instagram} icon="📷" maxDur="90s" title={ig.title} hook={ig.hook} hashtags={ig.hashtags} uploadTime={ig.uploadTime} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:12, marginBottom:24 }}>
          {[{i:"🎯",l:"타겟",v:idea.target||opp.demographics},{i:"🎬",l:"크리에이터",v:idea.creatorType||"MICRO"},{i:"📊",l:"데이터 근거",v:idea.dataProof},{i:"📅",l:"시리즈",v:idea.seriesNote||"1편(90/10)→2편(60/40)→3편(30/70)"}].map((d,i) => (
            <div key={i} style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`, padding:14 }}><div style={{ fontSize:10, color:C.textSoft, marginBottom:4 }}>{d.i} {d.l}</div><div style={{ fontSize:12, color:C.text, lineHeight:1.5 }}>{d.v}</div></div>
          ))}
        </div>

        {/* Ad Targeting */}
        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, marginBottom:12, overflow:"hidden" }}>
          <div onClick={() => toggleSection("ad")} style={{ padding:"14px 20px", cursor:"pointer", display:"flex", justifyContent:"space-between" }}><span style={{ color:C.text, fontSize:14, fontWeight:600 }}>📢 광고 노출 추천</span><span style={{ color:C.textSoft }}>{expandedSections.ad?"▴":"▾"}</span></div>
          {expandedSections.ad && <div style={{ padding:"0 20px 16px", borderTop:`1px solid ${C.border}`, paddingTop:12 }}><div style={{ color:C.text, fontSize:12, lineHeight:1.8, whiteSpace:"pre-line" }}>{idea.adTargeting || `• 관심사: ${opp.title} 관련 검색 이력자\n• 인구통계: ${opp.demographics}\n• 리타겟팅: Trip.com 방문 후 이탈자\n• 시즌: ${opp.peakSeason} 집중 노출`}</div></div>}
        </div>

        {/* Creator Matching */}
        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div onClick={() => toggleSection("creator")} style={{ padding:"14px 20px", cursor:"pointer", display:"flex", justifyContent:"space-between" }}><span style={{ color:C.text, fontSize:14, fontWeight:600 }}>🎬 크리에이터 매칭 가이드 — YouTube API 실시간 검색</span><span style={{ color:C.textSoft }}>{expandedSections.creator?"▴":"▾"}</span></div>
          {expandedSections.creator && <div style={{ padding:"0 20px 16px", borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
            <div style={{ color:C.textSoft, fontSize:11, marginBottom:8 }}>"{(YT_QUERIES[opp.id]||[])[0]}" 검색 결과 기반 추천</div>
            <CreatorCards oppId={opp.id} />
          </div>}
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════
  // FOOTER
  // ══════════════════════════════════════════════════════
  const Footer = () => (
    <div style={{ background:C.footerBg, borderTop:`1px solid ${C.border}`, padding:"24px 0", textAlign:"center" }}>
      <div style={{ color:"#94A3B8", fontSize:11, letterSpacing:3 }}>PENTACLE × AI&nbsp;&nbsp;&nbsp;ALGORITHM PERFORMANCE PLATFORM</div>
    </div>
  );

  // ══════════════════════════════════════════════════════
  // MAIN RENDER
  // ══════════════════════════════════════════════════════
  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:0.6}50%{opacity:0.3}}`}</style>
      <Header />
      <StepIndicator />
      {step===0 && renderStep0()}
      {step===1 && renderStep1()}
      {step===2 && renderStep2()}
      {step===3 && renderStep3()}
      <Footer />
    </div>
  );
}
