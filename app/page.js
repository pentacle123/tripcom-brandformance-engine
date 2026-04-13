"use client";
import React, { useState, useCallback, useEffect } from "react";

// ══════════════════════════════════════════════════════════════
// Trip.com AI Brandformance Engine v7.0
// Page Navigation | Light Theme | YouTube API | Samyang Patterns
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
  "opp-i1": ["골프 라운딩 브이로그", "해외 골프 여행"],
  "opp-i2": ["프로포즈 후 신혼여행 준비", "결혼기념일 여행 브이로그"],
  "opp-i3": ["퇴사 후 한달살기", "번아웃 여행 브이로그", "워케이션 브이로그"],
  "opp-i4": ["어버이날 선물 추천", "부모님 해외여행 보내드리기"],
  "opp-i5": ["영어캠프 후기", "세부 어학연수 엄마"],
  "opp-i6": ["해외 콘서트 여행", "마라톤 해외 대회"],
  "opp-d8": ["홍콩 맛집 브이로그", "홍콩 야경 여행"],
  "opp-d9": ["싱가포르 가족여행 브이로그", "싱가포르 맛집"],
  "opp-d10": ["몽골 여행 브이로그", "몽골 초원 게르"],
  "opp-d11": ["발리 풀빌라 브이로그", "발리 여행 비용"],
  "opp-i7": ["크루즈 여행 후기", "일본 크루즈 브이로그"],
  "opp-i8": ["도쿄마라톤 참가 브이로그", "해외 마라톤 원정 후기"],
  "opp-i9": ["세부 다이빙 브이로그", "스쿠버다이빙 해외 여행"],
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
  { id:"opp-d8", title:"홍콩 쇼핑·야경·딤섬 여행자", icon:"🌃", hookType:"Experience-hook", hookLabel:"도시 경험 집약", strategyCopy:"3박이면 충분한 도시. 쇼핑+야경+딤섬의 밀도 높은 경험을 설계한다.", level:"MEGA", region:"동아시아", destinations:["홍콩","마카오"], monthlyVol:129400, annualVol:1561500, keyInsight:"마카오(연 73만)와 묶어서 검색하는 패턴. 짧은 일정 고밀도 여행", demographics:"여성 74% · 30대 25%, 40대 24%, 50대+ 26%", peakSeason:"1월, 10~12월", peakMonths:[100,73,68,58,69,63,80,83,74,95,88,92], stage:"Plan", pathJourney:["홍콩여행","맛집","야경","쇼핑","마카오"], pathInsight:"홍콩에서 시작 → 맛집/딤섬이 핵심 → 야경(빅토리아피크) → 쇼핑 → 마카오 당일치기 연결", clusterInsight:"홍콩 클러스터에서 '딤섬'과 '야경'이 양대 허브. 마카오와 강한 연결. 3박4일 일정이 주류", topKeywords:[{keyword:"홍콩 여행",vol:129400},{keyword:"마카오 여행",vol:60853},{keyword:"홍콩 맛집",vol:35000},{keyword:"홍콩 야경",vol:18000},{keyword:"홍콩 쇼핑",vol:15000},{keyword:"홍콩 딤섬",vol:12000}], uspConnection:"원스톱(홍콩+마카오 묶음) + Trip.Best 맛집", painPoints:["3박에 뭘 다 할 수 있을지 모르겠다","홍콩-마카오 이동이 복잡할까 걱정"], contentHook:"홍콩 3박4일 마카오까지, 딤섬 5곳 야경 2곳 완벽 동선", dataProof:"홍콩여행 129,400/월, 마카오 60,853/월, 맛집 35,000/월" },
  { id:"opp-d9", title:"싱가포르 가족·시니어 여행자", icon:"🦁", hookType:"Family-hook", hookLabel:"안전한 가족 도시", strategyCopy:"깨끗하고 안전한 도시. 아이 동반 가족과 시니어 모두에게 최적의 첫 해외여행지.", level:"MEGA", region:"동남아", destinations:["싱가포르"], monthlyVol:101783, annualVol:1309350, keyInsight:"여성 77%로 가장 높은 여성 비율. 50대+ 34%로 시니어 강세", demographics:"여성 77% · 50대+ 34%, 40대 26%", peakSeason:"1월, 3월, 5~7월", peakMonths:[95,85,93,73,85,87,88,82,64,65,60,63], stage:"Plan", pathJourney:["싱가포르여행","관광지","맛집","유니버셜","호텔"], pathInsight:"싱가포르여행 진입 → 유니버셜스튜디오가 가족 핵심 → 맛집(칠리크랩) → 호텔(마리나베이샌즈)", clusterInsight:"싱가포르 클러스터에서 '유니버셜'과 '마리나베이'가 양대 허브. 가족과 시니어 타겟이 뚜렷", topKeywords:[{keyword:"싱가포르 여행",vol:101783},{keyword:"싱가포르 관광",vol:25000},{keyword:"싱가포르 맛집",vol:18000},{keyword:"싱가포르 호텔",vol:15000},{keyword:"유니버셜 싱가포르",vol:12000}], uspConnection:"24시간 CS + 가족 패키지 + Trip.Best", painPoints:["물가가 비쌀까 걱정된다","아이와 시니어 모두 즐길 수 있는 곳이 있을까"], contentHook:"싱가포르 4일, 아이도 부모님도 만족한 코스 비용 전부 공개", dataProof:"싱가포르여행 101,783/월, 여성77%, 50대+34%" },
  { id:"opp-d10", title:"몽골 초원·모험 여행자", icon:"🐎", hookType:"Adventure-hook", hookLabel:"모험 어드벤처", strategyCopy:"도시가 아닌 초원. 다른 여행지와 완전히 다른 경험을 찾는 2030이 급증하고 있다.", level:"MEGA", region:"동아시아", destinations:["몽골"], monthlyVol:71916, annualVol:1157570, keyInsight:"성장률 +27%로 급성장 중! 2030 젊은 층이 '다른 경험'을 찾아 유입", demographics:"여성 67% · 20-30대 50%, 50대+ 28%", peakSeason:"5~8월 (여름 집중)", peakMonths:[47,55,67,60,80,90,89,79,48,42,45,38], stage:"Dream", pathJourney:["몽골여행","투어","게르","경비","준비물"], pathInsight:"몽골여행 진입 → 투어 필수(개별 이동 불가) → 게르 체험 → 경비 확인 → 준비물이 특이", clusterInsight:"몽골 클러스터에서 '투어'가 압도적 허브. 개별자유여행이 어려워 패키지 수요 높음", topKeywords:[{keyword:"몽골 여행",vol:71916},{keyword:"몽골 투어",vol:25000},{keyword:"몽골 경비",vol:12000},{keyword:"몽골 게르",vol:8000},{keyword:"몽골 준비물",vol:6000}], uspConnection:"원스톱 투어 패키지 + 트립지니 AI 일정", painPoints:["개별 여행이 가능한지 모르겠다","투어를 어디서 예약해야 하는지"], contentHook:"서울 직장인이 몽골 초원에서 보낸 5일, 인생이 바뀌었다", dataProof:"몽골여행 71,916/월, 성장률 +27%, 20-30대 50%" },
  { id:"opp-d11", title:"발리 허니문·서퍼 여행자", icon:"🌴", hookType:"Emotion-hook", hookLabel:"꿈의 휴양지", strategyCopy:"신혼여행의 디폴트이자 서퍼의 성지. 성장률 +22%로 수요가 계속 늘고 있다.", level:"MEGA", region:"동남아", destinations:["발리"], monthlyVol:90523, annualVol:1112960, keyInsight:"성장률 +22% 급성장. 신혼여행+서핑+요가+디지털노마드 다층 타겟", demographics:"여성 70% · 30대 31%, 40대 24%, 50대+ 24%", peakSeason:"1~3월, 5~7월", peakMonths:[80,74,83,81,93,93,83,87,75,84,77,75], stage:"Dream", pathJourney:["발리여행","풀빌라","우붓","서핑","비용"], pathInsight:"발리여행 진입 → 풀빌라가 핵심 숙소 → 우붓(문화)과 꾸따(해변) 분기 → 서핑/요가 체험 → 비용 확인", clusterInsight:"발리 클러스터에서 '풀빌라'와 '우붓'이 양대 허브. 신혼여행과 일반 여행이 혼재", topKeywords:[{keyword:"발리 여행",vol:90523},{keyword:"발리 풀빌라",vol:20000},{keyword:"발리 우붓",vol:15000},{keyword:"발리 맛집",vol:12000},{keyword:"발리 서핑",vol:8000},{keyword:"발리 비용",vol:7000}], uspConnection:"Trip.Best 풀빌라 랭킹 + 가격 비교", painPoints:["풀빌라 가격 비교가 어렵다","우붓과 꾸따 중 어디에 숙소를 잡을지"], contentHook:"발리 풀빌라 1박 10만원대, 실제로 가능한 곳 3곳", dataProof:"발리여행 90,523/월, 성장률 +22%, 풀빌라 20,000/월" },
];

const INT_OPPS = [
  { id:"opp-i1", title:"시니어 골프 여행자", icon:"⛳", hookType:"Lifestyle-hook", hookLabel:"라이프스타일 소구", strategyCopy:"스크린골프 96,370/월(연 130만). 한국 골퍼의 진입점은 스크린이다. 스크린에서 치다가 '태국 1라운드 5만원'을 알게 되면 해외 골프의 문이 열린다.", level:"LARGE", interest:"골프", e3tag:"Elderly", monthlyVol:7952, annualVol:95424, motherAnnualVol:4863000, keyInsight:"스크린골프(연 130만)가 한국 골프 시장의 진짜 대중적 진입점. 스크린 → 국내 필드 → 해외 골프장의 자연스러운 확장 경로. 골프만 남성 61%", demographics:"남성 61% · 50대+ 54%", peakSeason:"연중 (봄가을 피크)", peakMonths:[60,55,65,70,65,55,50,45,55,70,65,60], stage:"Plan", destinations:["후쿠오카","태국","베트남"], pathJourney:["스크린골프","골프연습장","골프장예약","해외골프패키지","태국/일본 골프장"], pathInsight:"스크린골프로 입문 → 필드 욕구 → 국내 골프장 가격에 놀람 → '해외가 더 싸다'는 발견 → 태국/일본 골프 여행. 가격 비교가 전환의 핵심 트리거", clusterInsight:"골프여행 클러스터에서 '가격'과 '패키지'가 양대 허브", topKeywords:[{keyword:"스크린골프",vol:1300830,note:"연간. 골프 대중화의 진입점"},{keyword:"일본 골프 여행",vol:18923},{keyword:"골프 입문",vol:28740,note:"연간. 입문자→해외골프 꿈"},{keyword:"골프 여행",vol:5600},{keyword:"태국 골프",vol:3200},{keyword:"골프 패키지",vol:2800},{keyword:"후쿠오카 골프",vol:2100}], uspConnection:"원스톱(항공+호텔+골프장) + 가격 경쟁력", painPoints:["골프장+항공+숙소 따로 예약 귀찮다","가격 비교 어렵다","스크린골프 비용이면 해외 라운딩 가능한지 모름"], contentHook:"스크린골프 3번 값이면 태국에서 18홀 라운딩 가능합니다", dataProof:"스크린골프 연 1,300,830회, 일본골프 18,923/월(남성61%)" },
  { id:"opp-i2", title:"신혼·프로포즈·기념일 여행자", icon:"💍", hookType:"Emotion-hook", hookLabel:"인생 최고의 여행", strategyCopy:"프로포즈 72,306/월 → 결혼준비 → 신혼여행. 그리고 매년 돌아오는 결혼기념일. 1회성이 아니라 반복되는 여행 기회.", level:"MEGA", interest:"신혼여행", e3tag:null, monthlyVol:26843, annualVol:331060, motherMonthlyVol:149805, motherAnnualVol:1797660, keyInsight:"프로포즈(연 77만)가 신혼여행의 선행지표. 프로포즈한 사람은 6개월 안에 신혼여행을 검색한다. 결혼 후에는 매년 결혼기념일(연 13.5만)+결혼기념일선물(연 21.4만)이 반복 기회.", demographics:"여성 63% · 25-34세 88%", peakSeason:"연중 (1월 피크)", peakMonths:[85,70,65,60,65,70,60,55,65,75,80,75], stage:"Dream", destinations:["발리","하와이","몰디브"], pathJourney:["프로포즈","결혼준비","신혼여행","발리/풀빌라","결혼기념일여행"], pathInsight:"프로포즈 성공 → 결혼준비 → 신혼여행 검색 → 발리 디폴트 → 풀빌라가 결정 → 매년 결혼기념일 여행 반복", clusterInsight:"신혼여행 클러스터에서 '발리'가 압도적 허브. 프로포즈→결혼준비→신혼여행의 파이프라인 존재", topKeywords:[{keyword:"프로포즈",vol:772830,note:"연간. 신혼여행의 선행지표"},{keyword:"결혼기념일 선물",vol:213960,note:"연간. 매년 반복되는 기회"},{keyword:"결혼준비",vol:186340,note:"연간"},{keyword:"웨딩홀",vol:134780,note:"연간"},{keyword:"결혼기념일",vol:135100,note:"연간"},{keyword:"웨딩스냅",vol:97030,note:"연간, +50% 성장"},{keyword:"결혼기념일 여행",vol:10450,note:"연간, 직접 연결"},{keyword:"신혼여행",vol:26843},{keyword:"발리 신혼여행",vol:8500},{keyword:"신혼여행 비용",vol:6200},{keyword:"풀빌라",vol:4800}], uspConnection:"Trip.Best 허니문 랭킹 + 풀빌라 가격 비교", painPoints:["여행사 vs 직접 예약 고민","예산 내 최고 경험 욕구","결혼기념일에 매년 뭘 해야 할지 모르겠다"], contentHook:"프로포즈 성공 후 가장 먼저 검색한 것 — 발리 풀빌라 신혼여행 실제 비용", dataProof:"프로포즈 연 772,830회, 결혼기념일선물 연 213,960회, 신혼여행 26,843/월" },
  { id:"opp-i3", title:"삶의 전환점 여행자 (한달살기·워케이션)", icon:"🏠", hookType:"Life-hook", hookLabel:"세컨드라이프 설계", strategyCopy:"번아웃 44,863/월, 퇴사 20,020/월, 워케이션 9,983/월(+70%). 삶의 전환점에 선 사람들은 모두 '어디론가 떠나고 싶다'. 한달살기는 여행이 아니라 삶의 실험이다.", level:"MEGA", interest:"한달살기", e3tag:"Elderly", monthlyVol:11173, annualVol:156790, motherMonthlyVol:151264, motherAnnualVol:1815168, keyInsight:"번아웃(연 65.7만)+퇴사(연 48.6만)가 가장 큰 진입점. 워케이션 +70%, 갭이어 +157% 폭발 성장. 삶의 전환점에서 여행을 찾는 소비자가 급증하고 있다.", demographics:"여성 63% · 40-50대 66%", peakSeason:"1월 새해, 가을 추석 후", peakMonths:[80,65,60,55,60,55,50,50,55,65,70,75], stage:"Dream", destinations:["치앙마이","발리","다낭"], pathJourney:["번아웃/퇴사","어디론가 떠나고 싶다","한달살기/워케이션","동남아 가성비","치앙마이/발리 비용"], pathInsight:"번아웃·퇴사 → '어디론가 떠나고 싶다' → 한달살기/워케이션 발견 → 동남아 가성비 → 비용 확인 후 결정", clusterInsight:"한달살기 클러스터에서 '비용'과 '장기숙소'가 핵심 허브. 번아웃/퇴사 클러스터와 강한 연결. 워케이션이 새로운 허브로 부상", topKeywords:[{keyword:"번아웃",vol:656810,note:"연간. 삶의 전환점 최대 키워드"},{keyword:"퇴사",vol:486210,note:"연간. 퇴사 후 첫 행동 = 여행"},{keyword:"디지털노마드",vol:238880,note:"연간. 해외 원격근무"},{keyword:"한달살기",vol:156790,note:"연간. 직접 기회"},{keyword:"워케이션",vol:140550,note:"연간, +70% 성장!"},{keyword:"안식년",vol:135560,note:"연간"},{keyword:"노후준비",vol:204040,note:"연간"},{keyword:"정년퇴직",vol:109520,note:"연간"},{keyword:"갭이어",vol:47070,note:"연간, +157% 폭발 성장!"},{keyword:"정년퇴직 선물",vol:45890,note:"연간. 효도와 겹침"}], uspConnection:"장기 숙소 예약 + 트립지니 AI 장기체류 플래너 + 가격 경쟁력", painPoints:["번아웃인데 어디로 가야 할지 모르겠다","한달살기 비용이 얼마나 드는지 감이 안 잡힌다","워케이션 가능한 곳이 어디인지 모르겠다"], contentHook:"번아웃 온 직장인이 치앙마이 한달살기 후 달라진 3가지", dataProof:"번아웃 연 656,810회, 퇴사 연 486,210회, 워케이션 연 140,550회(+70%)" },
  { id:"opp-i4", title:"효도·어버이날·환갑 여행 기획자", icon:"🙏", hookType:"Emotion-hook", hookLabel:"후회 트리거", strategyCopy:"어버이날 연 400만, 환갑 연 71만, 칠순 연 24만 — '부모님께 뭘 드릴까' 고민하는 그 순간에 '여행이 최고의 선물'이라는 콘텐츠가 전환을 만든다.", level:"MEGA", interest:"효도여행", e3tag:"Elderly", monthlyVol:14285, annualVol:171407, motherAnnualVol:6000000, keyInsight:"어버이날(연 400만)·환갑(연 71만)·칠순(연 24만) = 부모님을 위한 감정 모먼트 연 600만 검색. '선물' 검색자에게 여행을 제안하면 가장 큰 Elderly 기회", demographics:"여성 79% · 30대 40% (자녀가 부모님 대신 검색)", peakSeason:"5월(어버이날), 9월(추석), 환갑/칠순 연중 분산", peakMonths:[65,55,100,55,90,55,50,50,65,55,50,60], stage:"Dream", destinations:["일본","동남아","유럽"], pathJourney:["어버이날/환갑/칠순","선물 고민","여행 선물","효도여행 추천","해외여행 예약"], pathInsight:"감정 모먼트(어버이날/환갑/칠순)에서 시작 → '뭘 드릴까' 선물 고민 → '여행이 최고의 선물' 발견 → 효도여행 검색 → 24시간CS가 결정적 소구점", clusterInsight:"어버이날 클러스터에서 '선물'이 최대 허브. 환갑/칠순에서는 '여행'이 선물 옵션 중 하나로 존재. 감정(후회, 감사)이 전환의 핵심 트리거", topKeywords:[{keyword:"어버이날",vol:4002560,note:"연간, 5월 집중"},{keyword:"환갑",vol:708460,note:"연간"},{keyword:"어버이날 선물",vol:679370,note:"연간"},{keyword:"칠순",vol:239780,note:"연간"},{keyword:"환갑 선물",vol:121130,note:"연간"},{keyword:"칠순 선물",vol:89690,note:"연간"},{keyword:"부모님 선물",vol:113080,note:"연간"},{keyword:"환갑 여행",vol:19270,note:"연간, 직접 여행 연결"},{keyword:"칠순 여행",vol:20370,note:"연간, 직접 여행 연결"},{keyword:"부모님 결혼기념일 선물",vol:46650,note:"연간"},{keyword:"가족 해외여행 추천",vol:34760,note:"연간, +129% 성장"}], uspConnection:"24시간 한국어 CS + 시니어 맞춤 패키지", painPoints:["부모님이 해외에서 문제 생기면 어떡하지","영어 못하시는데 괜찮을까","어버이날에 뭘 드려야 할지 모르겠다"], contentHook:"어버이날, 카네이션 대신 부모님 첫 해외여행을 보내드렸습니다", dataProof:"어버이날 연 4,002,560회, 환갑 연 708,460회, 칠순 연 239,780회 — 감정 모먼트 총 연 600만 검색" },
  { id:"opp-i5", title:"자녀 영어캠프·방학시즌 기획 맘", icon:"📚", hookType:"Solution-hook", hookLabel:"원스톱 해결", strategyCopy:"여름방학(연 201만)·겨울방학(연 87만)·졸업여행(연 29만) = 연 317만 방학 시즌 모먼트. 엄마들의 검색은 '영어캠프'가 아니라 '방학에 뭐하지'에서 시작된다.", level:"LARGE", interest:"영어캠프", e3tag:null, monthlyVol:14898, annualVol:178776, motherAnnualVol:1107048, keyInsight:"여름방학(연 201만)+겨울방학(연 87만)+졸업여행(연 29만) = 방학 시즌 연 317만 검색. 엄마의 검색은 '방학에 뭐하지'에서 시작 → 영어캠프/해외여행 발견. 여름7월·겨울12월 이중 피크", demographics:"여성 72% · 40대 46%", peakSeason:"7월(여름방학), 12월(겨울방학), 2월(졸업시즌)", peakMonths:[85,50,45,40,45,60,95,55,45,40,45,80], stage:"Plan", destinations:["세부","괌","호주"], pathJourney:["여름방학/겨울방학","방학에 뭐하지","영어캠프/해외여행","세부 가성비","캠프+항공+숙소"], pathInsight:"방학 시작 2~3개월 전부터 검색 시작. '방학에 뭐하지' → 영어캠프 발견 → 세부가 가성비 1위 → 캠프+항공+숙소 원스톱 필요", clusterInsight:"방학 클러스터에서 '여름방학'이 최대 허브. 영어캠프는 방학 활동의 하위 클러스터", topKeywords:[{keyword:"여름방학",vol:2014560,note:"연간. 방학 시즌 최대 키워드"},{keyword:"겨울방학",vol:869740,note:"연간"},{keyword:"졸업여행",vol:285700,note:"연간"},{keyword:"영어캠프",vol:2256},{keyword:"세부 영어캠프",vol:1800},{keyword:"영어캠프 비용",vol:900},{keyword:"겨울방학 영어캠프",vol:750},{keyword:"괌 영어캠프",vol:400}], uspConnection:"원스톱 항공+숙소+캠프 패키지 + 24시간 CS(아이 안전)", painPoints:["캠프+항공+숙소 따로 예약 복잡","방학에 뭘 시켜야 할지 모르겠다","아이 혼자 보내기 불안"], contentHook:"여름방학 세부 영어캠프 4주, 항공부터 숙소까지 한번에 해결한 방법", dataProof:"여름방학 연 2,014,560회, 겨울방학 연 869,740회, 영어캠프 2,256/월" },
  { id:"opp-i6", title:"이벤트+여행 연결자", icon:"🎪", hookType:"Event-hook", hookLabel:"이벤트 연결 여행", strategyCopy:"'보러 가는 여행'은 전환율이 가장 높다.", level:"NICHE", interest:"이벤트", e3tag:"Event", monthlyVol:2579, annualVol:30860, keyInsight:"3E 전략 핵심", demographics:"콘서트:20대여성/마라톤:30-40대남성/미식:여성63%", peakSeason:"이벤트별 상이", peakMonths:[55,50,55,60,55,65,60,55,60,65,55,50], stage:"Plan", destinations:["일본","미국","유럽","태국"], pathJourney:["이벤트확인","일정","항공+숙소","예약"], pathInsight:"전환 경로가 짧고 전환율 최고", clusterInsight:"이벤트 검색은 의도가 매우 구체적", topKeywords:[{keyword:"미식 여행",vol:1323},{keyword:"해외 마라톤",vol:1070},{keyword:"해외 콘서트",vol:186},{keyword:"도쿄 마라톤",vol:800},{keyword:"와인 여행",vol:450}], uspConnection:"이벤트 일정 연동 + 원스톱 예약", painPoints:["이벤트 날짜 항공편 빨리 잡아야"], contentHook:"도쿄마라톤 참가자를 위한 3박4일 루트", dataProof:"마라톤 1,070/월, 미식 1,323/월" },
  { id:"opp-i7", title:"크루즈 여행 탐색자", icon:"🚢", hookType:"Experience-hook", hookLabel:"떠다니는 리조트", strategyCopy:"유일하게 남녀 비율이 반반인 여행 검색. 40-50대 가족/부부가 '다른 형태의 여행'을 찾고 있다.", level:"MEGA", interest:"크루즈", e3tag:"Elderly", monthlyVol:84623, annualVol:1116030, keyInsight:"남성 46%·여성 54%로 유일하게 남녀 반반. 40-50대 55%. 3E Elderly 직결", demographics:"남 46%·여 54% (거의 반반!) · 40대 28%, 50대+ 27%", peakSeason:"연중 고른 분포 (1월, 3월 약간 높음)", peakMonths:[75,75,98,61,75,78,66,63,73,77,59,62], stage:"Dream", destinations:["일본 크루즈","동남아 크루즈","지중해 크루즈","알래스카 크루즈"], pathJourney:["크루즈여행","가격","노선","크루즈회사","후기"], pathInsight:"크루즈여행 진입 → 가격이 최대 관문 → 노선 선택 → 크루즈 회사 비교 → 후기 확인 후 결정", clusterInsight:"크루즈 클러스터에서 '가격'과 '노선'이 양대 허브. 부부/가족 단위 예약이 주류", topKeywords:[{keyword:"크루즈 여행",vol:84623},{keyword:"크루즈 가격",vol:25000},{keyword:"일본 크루즈",vol:18000},{keyword:"크루즈 추천",vol:12000},{keyword:"크루즈 후기",vol:8000}], uspConnection:"원스톱(크루즈+항공+호텔) + 가격 비교 + 24시간 CS", painPoints:["크루즈 가격이 얼마인지 감이 안 잡힌다","어떤 크루즈 회사가 좋은지 모르겠다"], contentHook:"크루즈 여행 처음이라면, 100만원대로 가능한 일본 노선 비교", dataProof:"크루즈여행 84,623/월, 남46%·여54%, 40-50대 55%" },
  { id:"opp-i8", title:"마라톤·러닝 원정 여행자", icon:"🏃", hookType:"Event-hook", hookLabel:"러닝 원정 여행", strategyCopy:"마라톤(연 284만) 검색자 중 해외 대회 원정 수요. 도쿄마라톤·호놀룰루마라톤 = 완주 + 관광 결합형.", level:"LARGE", interest:"마라톤", e3tag:"Event", monthlyVol:8539, annualVol:102468, motherAnnualVol:2841024, keyInsight:"마라톤 연 284만 검색. 해외 마라톤 대회 참가 + 관광 결합. 도쿄마라톤이 최대 허브. 대회 확정 → 즉시 항공+숙소 검색 = 전환 경로 최단", demographics:"남성 58% · 30-40대 62%", peakSeason:"대회 일정별 (2월 도쿄, 12월 호놀룰루)", peakMonths:[65,80,70,55,50,55,50,55,60,70,65,75], stage:"Plan", destinations:["도쿄","호놀룰루","보스턴","베를린"], pathJourney:["마라톤","해외마라톤","도쿄마라톤","항공+숙소","대회등록+관광"], pathInsight:"마라톤 훈련 → 해외 대회 도전 욕구 → 대회 확정 → 항공+숙소 즉시 예약. 전환 의도 매우 높음", clusterInsight:"마라톤 클러스터에서 '대회명'이 핵심 허브. 러닝+관광 결합 트렌드", topKeywords:[{keyword:"마라톤",vol:2841024,note:"연간. 러닝 문화 대중화"},{keyword:"하프마라톤",vol:3800},{keyword:"해외 마라톤",vol:1070},{keyword:"도쿄 마라톤",vol:800},{keyword:"마라톤 대회 일정",vol:5200}], uspConnection:"원스톱(항공+숙소+대회 일정 연동) + 빠른 예약", painPoints:["대회 날짜 맞춰 항공편 빨리 잡아야","숙소 빨리 매진","대회+관광 동선 기획 어려움"], contentHook:"도쿄마라톤 완주 후 츠키지시장까지 — 러너를 위한 3박4일", dataProof:"마라톤 연 2,841,024회, 해외마라톤 1,070/월, 도쿄마라톤 800/월" },
  { id:"opp-i9", title:"스쿠버다이빙·해양 체험 여행자", icon:"🤿", hookType:"Experience-hook", hookLabel:"수중 체험 여행", strategyCopy:"다이빙(연 27.9만) 검색자의 해외 다이빙 포인트 원정. 세부·발리·오키나와가 핵심 목적지.", level:"NICHE", interest:"다이빙", e3tag:null, monthlyVol:3406, annualVol:40872, motherAnnualVol:278916, keyInsight:"다이빙 연 27.9만 검색. 자격증 취득 + 해외 다이빙 포인트 여행 결합. 세부가 가성비 1위 다이빙 목적지", demographics:"남성 52% · 20-30대 58%", peakSeason:"5-8월 여름 집중", peakMonths:[50,50,55,60,70,80,90,85,65,55,50,45], stage:"Plan", destinations:["세부","발리","오키나와","사이판"], pathJourney:["다이빙","스쿠버다이빙","해외다이빙","세부다이빙","다이빙자격증"], pathInsight:"다이빙 입문/자격증 → 국내 포인트 → '해외가 더 좋다' 발견 → 세부/발리 원정", clusterInsight:"다이빙 클러스터에서 '세부'와 '자격증'이 양대 허브", topKeywords:[{keyword:"다이빙",vol:278916,note:"연간"},{keyword:"스쿠버다이빙",vol:3800},{keyword:"세부 다이빙",vol:2200},{keyword:"다이빙 자격증",vol:1800},{keyword:"발리 다이빙",vol:900}], uspConnection:"원스톱(항공+숙소+다이빙샵) + 가격 경쟁력", painPoints:["다이빙샵+항공+숙소 따로 예약 복잡","해외 다이빙 포인트 정보 부족"], contentHook:"세부에서 고래상어와 수영하는 3박4일 풀코스", dataProof:"다이빙 연 278,916회, 세부다이빙 2,200/월" },
];

const ALL_OPPS = [...DEST_OPPS, ...INT_OPPS];

// ── USP TAGS per opportunity ──
const USP_TAGS = {
  "opp-d1": ["tripbest", "price"],
  "opp-d2": ["price", "tripgenie"],
  "opp-d3": ["cs", "onestop"],
  "opp-d4": ["onestop", "tripbest", "cs"],
  "opp-d5": ["tripbest", "price"],
  "opp-d6": ["onestop", "cs"],
  "opp-d7": ["tripbest"],
  "opp-d8": ["onestop", "tripbest"],
  "opp-d9": ["cs", "onestop", "tripbest"],
  "opp-d10": ["onestop", "tripgenie"],
  "opp-d11": ["tripbest", "price"],
  "opp-i1": ["onestop", "price"],
  "opp-i2": ["onestop", "tripgenie"],
  "opp-i3": ["price", "tripgenie"],
  "opp-i4": ["cs"],
  "opp-i5": ["onestop", "cs"],
  "opp-i8": ["onestop"],
  "opp-i9": ["onestop", "price"],
  "opp-i6": ["onestop", "price"],
  "opp-i7": ["onestop", "price", "cs"],
};

const USP_MAP = [
  { id:"onestop", icon:"🔗", name:"원스톱 플랫폼", pain:"항공+호텔+액티비티를 따로 예약하는 고통을 해결", count:12 },
  { id:"cs", icon:"🇰🇷", name:"24시간 한국어 CS", pain:"해외에서 문제 생기면?이라는 불안을 해소", count:6 },
  { id:"tripbest", icon:"🏆", name:"Trip.Best 랭킹", pain:"너무 많아서 못 고르겠다는 선택 고통을 해결", count:7 },
  { id:"price", icon:"💰", name:"가격 경쟁력", pain:"최저가를 찾아 헤매는 시간을 절약", count:8 },
  { id:"tripgenie", icon:"🤖", name:"트립지니 AI", pain:"일정 짜기 귀찮다를 AI가 해결", count:5 },
];
const USP_ICONS = { onestop:"🔗", cs:"🇰🇷", tripbest:"🏆", price:"💰", tripgenie:"🤖" };
const USP_NAMES = { onestop:"원스톱", cs:"한국어CS", tripbest:"Trip.Best", price:"가격", tripgenie:"트립지니" };

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
  "opp-i1": { who:{tags:["50대+ 남성","골프 동호회","스크린골프 이용자","은퇴자/직장인"],evidence:"남성 61% | 50대+ 54% | 스크린골프 연 130만 검색"}, when:{tags:["봄 3-4월 피크","가을 10월 피크","연중 고른 분포"],evidence:"4월 70, 10월 70 | 스크린골프는 연중 검색"}, journey:{tags:["스크린골프 → 골프연습장 → 골프장예약 → 해외골프패키지 → 태국/일본"],evidence:"스크린골프가 대중적 진입점, 가격이 해외골프 전환 트리거"}, pain:{tags:["골프장+항공+숙소 따로 예약 귀찮다","가격 비교 어렵다","스크린골프 비용이면 해외 가능한지 모름"],evidence:"골프 패키지 2,800/월 | 스크린골프 연 130만"}, usp:{tags:["원스톱 패키지(항공+호텔+골프장)","가격 경쟁력"],evidence:"항공+호텔+골프장 원스톱. 스크린골프 3번 값 = 태국 1라운드"}, hook:{tags:["스크린골프 3번 값으로 태국 18홀","후쿠오카 골프 3박 실비","50대 아버지 골프여행 선물"],evidence:"스크린골프 연 1,300,830회, 일본골프 18,923/월"} },
  "opp-i2": { who:{tags:["25-34세 여성","프로포즈 준비자","예비 신혼부부","결혼기념일 부부"],evidence:"여성 63% | 25-34세 88% | 프로포즈 연 77만 검색"}, when:{tags:["연중 (1월 피크)","봄 결혼 시즌","10-11월","결혼기념일 연중"],evidence:"1월 85 피크 | 프로포즈→6개월 후 신혼여행"}, journey:{tags:["프로포즈 → 결혼준비 → 신혼여행 → 발리/풀빌라 → 결혼기념일 반복"],evidence:"프로포즈가 선행지표, 매년 기념일이 반복 기회"}, pain:{tags:["여행사 vs 직접 예약","예산 내 최고 경험","결혼기념일에 매년 뭘 해야 할지 모름"],evidence:"프로포즈 연 77만 | 결혼기념일선물 연 21만"}, usp:{tags:["Trip.Best 허니문 랭킹","풀빌라 가격비교"],evidence:"풀빌라 가격 비교가 핵심. 기념일 반복 기회"}, hook:{tags:["프로포즈 성공 후 첫 검색","400만원 발리 풀빌라 실비","결혼기념일 여행 서프라이즈"],evidence:"프로포즈 연 772,830회, 결혼기념일선물 연 213,960회"} },
  "opp-i3": { who:{tags:["40-50대 여성","번아웃 직장인","퇴사자","디지털노마드","워케이션 희망자"],evidence:"여성 63% | 40-50대 66% | 번아웃 연 65.7만 검색"}, when:{tags:["1월 새해 결심","가을 추석 후","퇴사 직후","번아웃 시점"],evidence:"1월 80 피크 | 번아웃/퇴사는 연중 발생"}, journey:{tags:["번아웃/퇴사 → 어디론가 떠나고 싶다 → 한달살기/워케이션 → 동남아 가성비 → 비용 확인"],evidence:"삶의 전환점에서 여행 욕구 발생, 비용이 최종 결정"}, pain:{tags:["번아웃인데 어디로 가야 할지 모르겠다","한달살기 비용 감 안 잡힘","워케이션 가능한 곳 모름"],evidence:"번아웃 연 65.7만 | 워케이션 +70% 성장"}, usp:{tags:["장기 숙소 예약","트립지니 AI 장기체류 플래너","가격 경쟁력"],evidence:"장기 숙박 할인율. 워케이션 인프라 추천"}, hook:{tags:["번아웃 온 직장인의 치앙마이 한달살기","퇴사 후 발리 워케이션 실비","150만원 한달살기 가계부"],evidence:"번아웃 연 656,810회, 퇴사 연 486,210회, 워케이션 연 140,550회(+70%)"} },
  "opp-i4": { who:{tags:["30대 여성 (자녀가 대신 검색)","어버이날 선물 고민자","환갑/칠순 기획자","부모님 대리 검색"],evidence:"여성 79% | 30대 40% | 어버이날 연 4,002,560회 + 환갑 연 708,460회 + 칠순 연 239,780회"}, when:{tags:["5월 어버이날 최대 피크","3월 사전 기획","9월 추석","환갑/칠순 연중 분산"],evidence:"5월 검색 지수 100(최고 피크) | 3월 100 사전 기획"}, journey:{tags:["어버이날/환갑/칠순 → 선물 고민 → 여행 선물 → 효도여행 추천 → 해외여행 예약"],evidence:"감정 모먼트에서 시작 → 선물 고민 → 여행이 최고의 선물 발견 → 24시간CS가 결정적"}, pain:{tags:["부모님이 해외에서 문제 생기면 어떡하지","영어 못하시는데 괜찮을까","어버이날에 뭘 드려야 할지 모르겠다"],evidence:"어버이날 선물 연 679,370회 | 환갑 선물 연 121,130회"}, usp:{tags:["24시간 한국어 CS","시니어 맞춤 패키지","안전 보장","여행이 최고의 선물"],evidence:"24시간 CS가 시니어 여행의 결정적 안심 요소. 감정 모먼트 연 600만에 여행을 연결"}, hook:{tags:["카네이션 대신 첫 해외여행","보내드리고 후회한 것들","환갑에 드린 최고의 선물","어버이날 여행 선물"],evidence:"감정 모먼트 총 연 600만 검색 | 가족 해외여행 추천 +129% 성장"} },
  "opp-i5": { who:{tags:["40대 엄마","초등학생 자녀","교육열 높은 학부모"],evidence:"여성 72% | 40대 46% | 여름방학 연 201만 검색"}, when:{tags:["7월 여름방학 최대 피크","12월 겨울방학 피크","2월 졸업시즌"],evidence:"7월 95 피크, 12월 80 피크 | 2~3개월 전 사전 기획"}, journey:{tags:["방학에 뭐하지 → 영어캠프/해외여행 → 세부 가성비 → 캠프+항공+숙소"],evidence:"방학 시즌 모먼트에서 시작 → 영어캠프 발견"}, pain:{tags:["캠프+항공+숙소 따로 복잡","방학에 뭘 시켜야 할지 모름","아이 혼자 보내기 불안"],evidence:"여름방학 연 201만, 겨울방학 연 87만"}, usp:{tags:["원스톱 항공+숙소+캠프","24시간 CS(아이 안전)","가격 비교"],evidence:"원스톱 + 24시간 CS가 엄마 안심 소구"}, hook:{tags:["여름방학 세부 영어캠프 한번에 해결","영어캠프 비용 비교표","엄마가 준비한 겨울방학 영어캠프"],evidence:"여름방학 연 2,014,560회, 겨울방학 연 869,740회"} },
  "opp-i6": { who:{tags:["20대 여성 (콘서트)","30-40대 남성 (마라톤)","미식 관심 여성"],evidence:"이벤트별 타겟 상이 | 높은 전환 의도"}, when:{tags:["이벤트 일정에 따라","공연 발표 직후","대회 등록 시즌"],evidence:"이벤트 확정 → 즉시 검색"}, journey:{tags:["이벤트 확인 → 일정 → 항공+숙소 → 예약"],evidence:"전환 경로 짧고 전환율 높음"}, pain:{tags:["이벤트 항공편 빨리 잡아야","교통+숙소 맞추기","티켓+여행 동시"],evidence:"시간 압박이 최대"}, usp:{tags:["이벤트 일정 연동","원스톱 예약","빠른 예약"],evidence:"원스톱이 최대 소구"}, hook:{tags:["도쿄마라톤 러닝+관광","해외 콘서트 원정","미식 페스티벌 TOP 5"],evidence:"마라톤 1,070/월"} },
  "opp-d8": { who:{tags:["30-50대 여성","쇼핑·미식 관심자","커플·부부"],evidence:"여성 74% | 30대 25%, 40대 24%, 50대+ 26%"}, when:{tags:["1월 피크","10-12월 연말 시즌"],evidence:"1월 100 최고 피크, 10월 95"}, journey:{tags:["홍콩여행 → 맛집/딤섬 → 야경 → 쇼핑 → 마카오"],evidence:"딤섬과 야경이 양대 핵심"}, pain:{tags:["3박에 뭘 다 할 수 있을지 모름","홍콩-마카오 이동 복잡"],evidence:"3박4일 일정이 주류"}, usp:{tags:["원스톱(홍콩+마카오 묶음)","Trip.Best 맛집"],evidence:"홍콩+마카오 원스톱이 핵심"}, hook:{tags:["딤섬 5곳 야경 2곳 동선","3박4일 마카오까지","빅토리아피크 야경"],evidence:"홍콩여행 129,400/월, 마카오 60,853/월"} },
  "opp-d9": { who:{tags:["40-50대 여성","가족 여행 기획자","시니어 동반"],evidence:"여성 77% | 50대+ 34%, 40대 26%"}, when:{tags:["1월 피크","3월","5-7월 여름"],evidence:"1월 95, 3월 93"}, journey:{tags:["싱가포르여행 → 관광지 → 맛집 → 유니버셜 → 호텔"],evidence:"유니버셜이 가족 핵심"}, pain:{tags:["물가 비쌀까 걱정","아이+시니어 모두 즐길 곳"],evidence:"싱가포르 호텔 15,000/월"}, usp:{tags:["24시간 CS","가족 패키지","Trip.Best"],evidence:"안전+청결이 핵심 소구"}, hook:{tags:["아이도 부모님도 만족 코스","비용 전부 공개","유니버셜+마리나베이"],evidence:"싱가포르여행 101,783/월"} },
  "opp-d10": { who:{tags:["20-30대 모험가","여성 67%","자연 체험 관심자"],evidence:"여성 67% | 20-30대 50%, 50대+ 28%"}, when:{tags:["5-8월 여름 집중","6월 피크"],evidence:"6월 90 최고 피크"}, journey:{tags:["몽골여행 → 투어 → 게르 → 경비 → 준비물"],evidence:"투어가 압도적 허브"}, pain:{tags:["개별 여행 가능한지 모름","투어 예약처 모름"],evidence:"몽골 투어 25,000/월"}, usp:{tags:["원스톱 투어 패키지","트립지니 AI 일정"],evidence:"패키지 수요 높음"}, hook:{tags:["초원에서 보낸 5일","게르 체험 리얼 후기","인생 바뀐 여행"],evidence:"몽골여행 71,916/월, +27% 성장"} },
  "opp-d11": { who:{tags:["30대 여성","신혼부부","서퍼·요가 관심자"],evidence:"여성 70% | 30대 31%, 40대 24%"}, when:{tags:["1-3월","5-7월 이중 피크"],evidence:"5-6월 93 최고 피크"}, journey:{tags:["발리여행 → 풀빌라 → 우붓 → 서핑 → 비용"],evidence:"풀빌라가 핵심 숙소"}, pain:{tags:["풀빌라 가격 비교 어려움","우붓 vs 꾸따 숙소 위치"],evidence:"발리 풀빌라 20,000/월"}, usp:{tags:["Trip.Best 풀빌라 랭킹","가격 비교"],evidence:"풀빌라 가격비교가 핵심"}, hook:{tags:["풀빌라 1박 10만원대","우붓 인생샷 스팟","서핑 초보 체험기"],evidence:"발리여행 90,523/월, +22% 성장"} },
  "opp-i7": { who:{tags:["40-50대 부부","남46%·여54% 반반","가족 단위"],evidence:"남 46%·여 54% 거의 반반 | 40대 28%, 50대+ 27%"}, when:{tags:["연중 고른 분포","1월·3월 약간 높음"],evidence:"3월 98 최고 피크"}, journey:{tags:["크루즈여행 → 가격 → 노선 → 크루즈회사 → 후기"],evidence:"가격이 최대 관문"}, pain:{tags:["크루즈 가격 감 안 잡힘","어떤 회사가 좋은지 모름"],evidence:"크루즈 가격 25,000/월"}, usp:{tags:["원스톱(크루즈+항공+호텔)","가격 비교","24시간 CS"],evidence:"원스톱+가격 비교가 핵심"}, hook:{tags:["100만원대 일본 크루즈","처음이면 이 노선","부부 크루즈 실비 공개"],evidence:"크루즈여행 84,623/월, 남녀반반"} },
  "opp-i8": { who:{tags:["30-40대 남성","마라톤 러너","해외 대회 도전자"],evidence:"남성 58% | 30-40대 62% | 마라톤 연 284만 검색"}, when:{tags:["대회 일정별 (2월 도쿄, 12월 호놀룰루)","대회 발표 직후"],evidence:"도쿄마라톤 2월, 호놀룰루 12월"}, journey:{tags:["마라톤 훈련 → 해외 대회 도전 → 대회 확정 → 항공+숙소 즉시"],evidence:"대회 확정 → 즉시 예약. 전환 의도 최고"}, pain:{tags:["대회 날짜 맞춰 항공편 잡기 어려움","숙소 빨리 매진","대회+관광 동선"],evidence:"해외마라톤 1,070/월"}, usp:{tags:["원스톱(항공+숙소+대회 일정 연동)","빠른 예약"],evidence:"대회 일정 맞춤 원스톱"}, hook:{tags:["도쿄마라톤 완주+관광 3박4일","해외 마라톤 참가 풀코스","러너의 여행 루트"],evidence:"마라톤 연 2,841,024회"} },
  "opp-i9": { who:{tags:["20-30대","남녀 반반","다이빙 자격증 취득자/희망자"],evidence:"남성 52% | 20-30대 58%"}, when:{tags:["5-8월 여름 집중","7월 피크"],evidence:"7월 90 최고 피크"}, journey:{tags:["다이빙 입문 → 자격증 → 국내 포인트 → 해외 원정"],evidence:"자격증 취득 후 해외 다이빙 포인트 원정"}, pain:{tags:["다이빙샵+항공+숙소 따로 예약 복잡","해외 다이빙 포인트 정보 부족"],evidence:"세부다이빙 2,200/월"}, usp:{tags:["원스톱(항공+숙소+다이빙)","가격 경쟁력"],evidence:"다이빙 패키지 원스톱"}, hook:{tags:["세부 고래상어 수영 3박4일","다이빙 자격증 따고 첫 해외 원정","발리 수중 절경"],evidence:"다이빙 연 278,916회"} },
};

// ── EXTRA OPPORTUNITIES (pill tags) ──
const EXTRA_OPPS = [
  { keyword:"나고야 여행", annual:979030 },{ keyword:"오키나와 여행", annual:963550 },
  { keyword:"중국 여행", annual:875790 },{ keyword:"세부 여행", annual:829010 },
  { keyword:"호주 여행", annual:783860 },{ keyword:"마카오 여행", annual:732400 },
  { keyword:"두바이 여행", annual:596280 },{ keyword:"터키 여행", annual:548580 },
  { keyword:"라오스 여행", annual:480120 },{ keyword:"포르투갈 여행", annual:470600 },
  { keyword:"캄보디아 여행", annual:470490 },{ keyword:"워킹홀리데이", annual:425690 },
  { keyword:"푸켓 여행", annual:425880 },{ keyword:"필리핀 여행", annual:405630 },
  { keyword:"뉴질랜드 여행", annual:355080 },{ keyword:"캐나다 여행", annual:352960 },
  { keyword:"온천 여행", annual:302180 },{ keyword:"미국 여행", annual:296020 },
  { keyword:"크로아티아 여행", annual:289530 },{ keyword:"사이판 여행", annual:276640 },
  { keyword:"그리스 여행", annual:231940 },{ keyword:"쿠알라룸푸르 여행", annual:224500 },
  { keyword:"파리 여행", annual:218480 },{ keyword:"체코 여행", annual:215940 },
  { keyword:"런던 여행", annual:166530 },{ keyword:"멕시코 여행", annual:150560 },
  { keyword:"몰디브 여행", annual:98820 },
];
const fmtMan = (n) => Math.round(n/10000) + "만";

// ── CONTENT TYPES & USPS ──
const CONTENT_TYPES = [
  { code:"A", name:"후기체험형", color:"#FF6B6B", by:"creator", icon:"🎬" },
  { code:"B", name:"정보비교형", color:"#10B981", by:"brand", icon:"🖥️" },
  { code:"C", name:"가격특가형", color:"#10B981", by:"brand", icon:"🖥️" },
  { code:"D", name:"AI일정형", color:"#10B981", by:"brand", icon:"🖥️" },
  { code:"E", name:"데이터랭킹형", color:"#10B981", by:"brand", icon:"🖥️" },
  { code:"F", name:"USP실증형", color:"#0770E3", by:"brand", icon:"🖥️" },
];
const PROD_STYLES = { creator: { bg:"#FEF2F2", color:"#DC2626", label:"🎬 크리에이터" }, brand: { bg:"#F0FDF4", color:"#16A34A", label:"🖥️ 브랜드 자체제작" } };

// ── SYSTEM PROMPTS ──
const SYSTEM_PROMPT = `당신은 Trip.com 한국 숏폼 콘텐츠 전략가입니다.
규칙: 1.후킹에 브랜드명 금지 2.관심사90%+여행10% 3.Dream/Plan/Book/Share 4.시리즈1편(90/10)→2편(60/40)→3편(30/70) 5.USP5종(원스톱플랫폼/24시간한국어CS/Trip.Best랭킹/가격경쟁력/트립지니AI)

5개 아이디어를 생성할 때 다음 유형을 반드시 섞어서 생성하세요:
- 아이디어 1-2: A.후기체험형 — 크리에이터가 실제로 다녀온 후기 콘텐츠. 생생한 현장감이 핵심. productionBy:"creator"
- 아이디어 3: B.정보비교형 — 데이터/이미지 기반으로 브랜드가 자체 제작 가능. 가격 비교, 맛집 랭킹, 코스 추천 등. productionBy:"brand"
- 아이디어 4: C.가격특가형 또는 D.AI일정형 — Trip.com 가격 경쟁력 또는 트립지니 AI를 직접 보여주는 콘텐츠. productionBy:"brand"
- 아이디어 5: F.USP실증형 — Trip.com USP(Trip.Best, 24시간CS, 트립지니 등)를 직접 시연/증명. productionBy:"brand"

topKeywords에 포함된 키워드들을 활용하여 아이디어를 생성하세요.
관심사 기회의 경우:
- 아이디어 1-2: 이미 여행을 검색하는 사람 대상
- 아이디어 3-4: 아직 여행을 생각하지 않은 관심층 대상 → 여행을 '발견'시키는 콘텐츠. 관심사90%+여행10%.
- 아이디어 5: Trip.com USP를 직접 소구

각 아이디어에 targetKeyword(진입점 키워드)와 targetKeywordVol(검색량)을 반드시 포함하세요.

JSON 배열로만 응답. 마크다운 없이. 반드시 5개.
[{"rank":1,"title":"제목","contentType":"A|B|C|D|E|F","contentTypeLabel":"후기체험형","productionBy":"creator|brand","productionNote":"크리에이터 촬영 필요","stage":"Dream|Plan|Book|Share","conversionScore":85~98,"hook3s":"후킹카피","sceneFlow":["씬1","씬2","씬3","씬4"],"uspConnection":"연결 USP","target":"타겟","targetKeyword":"진입점 키워드","targetKeywordVol":"검색량(월 또는 연)","creatorStrategy":"크리에이터 전략","dataProof":"데이터 근거","seriesNote":"시리즈 구성"}]`;

const PLATFORM_PROMPT = `당신은 Trip.com 한국 숏폼 콘텐츠 전략가입니다. 아래 아이디어를 확장하세요.
JSON 객체로만 응답. 마크다운 없이.
{"youtubeShorts":{"title":"유튜브용 제목","hook":"후킹","scenes":["씬1","씬2","씬3","씬4"],"proof":"데이터 근거","cta":"CTA","hashtags":["태그1","태그2","태그3","태그4","태그5"],"uploadTime":"업로드 시간","targetCluster":"타겟"},"instagramReels":{"title":"인스타용 제목","hook":"후킹","scenes":["씬1","씬2","씬3","씬4"],"proof":"데이터 근거","cta":"CTA","hashtags":["태그1","태그2","태그3","태그4","태그5"],"uploadTime":"업로드 시간","targetCluster":"타겟"},"bumperAds":[{"hook2s":"1-2초 훅(10자이내)","message2s":"3-4초 메시지(15자이내)","cta2s":"5-6초 CTA(10자이내)","uspFocus":"USP","targetKeywords":["키워드1","키워드2","키워드3"]},{"hook2s":"훅2","message2s":"메시지2","cta2s":"CTA2","uspFocus":"USP","targetKeywords":["키워드1","키워드2","키워드3"]},{"hook2s":"훅3","message2s":"메시지3","cta2s":"CTA3","uspFocus":"USP","targetKeywords":["키워드1","키워드2","키워드3"]}],"displayAds":[{"headline":"헤드라인(20자이내)","subCopy":"서브카피(30자이내)","cta":"CTA(8자이내)","recommendedSizes":["300x250","728x90","320x100"],"uspFocus":"USP","targetKeywords":["키워드1","키워드2","키워드3"]},{"headline":"헤드라인2","subCopy":"서브카피2","cta":"CTA2","recommendedSizes":["300x250","728x90","320x100"],"uspFocus":"USP","targetKeywords":["키워드1","키워드2","키워드3"]},{"headline":"헤드라인3","subCopy":"서브카피3","cta":"CTA3","recommendedSizes":["300x250","728x90","320x100"],"uspFocus":"USP","targetKeywords":["키워드1","키워드2","키워드3"]}]}`;

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function BrandformanceEngine() {
  const [currentView, setCurrentView] = useState("main");
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [generatedIdeas, setGeneratedIdeas] = useState({});
  const [loadingIds, setLoadingIds] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [ideaPerspective, setIdeaPerspective] = useState("auto");
  const [ytCreators, setYtCreators] = useState({});
  const [ytLoading, setYtLoading] = useState({});
  const [activeUsps, setActiveUsps] = useState(new Set());

  const fmt = (n) => Number(n).toLocaleString('ko-KR');
  const fmtNum = fmt; // alias
  const toggleSection = useCallback((k) => setExpandedSections(p => ({...p,[k]:!p[k]})),[]);
  const scoreColor = (s) => s >= 95 ? C.accent : s >= 85 ? C.primary : C.secondary;
  const toggleUsp = (uspId) => setActiveUsps(prev => {
    const next = new Set(prev);
    if (next.has(uspId)) next.delete(uspId); else next.add(uspId);
    return next;
  });
  const isOppHighlighted = (oppId) => {
    if (activeUsps.size === 0) return true;
    const tags = USP_TAGS[oppId] || [];
    return tags.some(t => activeUsps.has(t));
  };

  const classifyTier = (subs) => {
    if (subs >= 100000) return { tier:"MACRO", color:"#FF6B00" };
    if (subs >= 10000) return { tier:"MICRO", color:"#0770E3" };
    return { tier:"NANO", color:"#8B5CF6" };
  };

  // ── Navigation ──
  const goToAnalysis = (opp) => { setSelectedOpp(opp); setSelectedIdea(null); setCurrentView("analysis"); };
  const goToIdeas = () => setCurrentView("ideas");
  const goToStoryboard = (idea) => { setSelectedIdea(idea); setStoryboardTab(0); setCurrentView("storyboard"); };
  const goBack = () => {
    if (currentView === "storyboard") setCurrentView("ideas");
    else if (currentView === "ideas") setCurrentView("analysis");
    else if (currentView === "analysis") { setCurrentView("main"); setSelectedOpp(null); }
  };
  const goHome = () => { setCurrentView("main"); setSelectedOpp(null); setSelectedIdea(null); };

  const VIEW_STEP = { main: 0, analysis: 1, ideas: 2, storyboard: 3 };
  const activeStep = VIEW_STEP[currentView] || 0;

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

  // ── Claude API (with 60s timeout) ──
  const fetchWithTimeout = async (url, options, timeoutMs = 60000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      return res;
    } finally { clearTimeout(timer); }
  };

  const generateIdeas = useCallback(async (opp) => {
    if (loadingIds[opp.id]) return;
    setLoadingIds(p => ({...p,[opp.id]:true}));
    setGeneratedIdeas(p => { const n = {...p}; if(n[opp.id]?.[0]?.error) delete n[opp.id]; return n; });
    const ctx = CONTEXT_DATA[opp.id] || {};
    const contextStr = Object.entries(ctx).map(([k,v]) => `${k}: ${v.tags?.join(", ")} | ${v.evidence}`).join("\n");
    try {
      const res = await fetchWithTimeout("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: [{ role: "user", content: `숏폼 아이디어 5개를 생성하세요:\n제목:${opp.title}\n인사이트:${opp.keyInsight}\n인구통계:${opp.demographics}\n검색량:월${opp.monthlyVol?.toLocaleString()}\n연간모수:${opp.motherAnnualVol||opp.annualVol||""}\n전략:${opp.strategyCopy}\n후킹:${opp.hookType} ${opp.hookLabel}\n콘텐츠훅:${opp.contentHook}\nUSP:${opp.uspConnection}\n페인:${(opp.painPoints||[]).join(",")}\n데이터:${opp.dataProof}\ntopKeywords:${JSON.stringify(opp.topKeywords||[])}\nYT검색어:${(YT_QUERIES[opp.id]||[]).join(",")}\n6축맥락:\n${contextStr}` }] })
      }, 60000);
      const data = await res.json();
      if (data.error) throw new Error(data.error?.message || (typeof data.error === "string" ? data.error : JSON.stringify(data.error)));
      const text = data.content?.[0]?.text || "";
      const m = text.match(/\[[\s\S]*\]/);
      if (m) {
        setGeneratedIdeas(p => ({...p,[opp.id]:JSON.parse(m[0])}));
        setCurrentView("ideas");
      } else throw new Error("JSON 파싱 실패 — 응답: " + text.substring(0, 100));
    } catch (e) {
      const msg = e.name === "AbortError" ? "요청 시간 초과 (60초). 잠시 후 다시 시도해주세요." : e.message;
      setGeneratedIdeas(p => ({...p,[opp.id]:[{error:msg}]})); setCurrentView("ideas");
    }
    finally { setLoadingIds(p => ({...p,[opp.id]:false})); }
  }, [loadingIds]);

  // ── Platform content generation (on-demand for storyboard) ──
  const [platformLoading, setPlatformLoading] = useState({});
  const [storyboardTab, setStoryboardTab] = useState(0);
  const generatePlatformContent = useCallback(async (idea, opp) => {
    const key = `${opp.id}-${idea.rank||0}`;
    if (platformLoading[key] || idea.youtubeShorts) return;
    setPlatformLoading(p => ({...p,[key]:true}));
    try {
      const res = await fetchWithTimeout("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: PLATFORM_PROMPT, messages: [{ role: "user", content: `아이디어:\n제목:${idea.title}\n콘텐츠유형:${idea.contentType}\n스테이지:${idea.stage}\n후킹:${idea.hook3s}\n씬:${(idea.sceneFlow||[]).join(" → ")}\nUSP:${idea.uspConnection}\n타겟:${idea.target||opp.demographics}\n데이터:${idea.dataProof||opp.dataProof}` }] })
      }, 45000);
      const data = await res.json();
      if (!data.error) {
        const text = data.content?.[0]?.text || "";
        const m = text.match(/\{[\s\S]*\}/);
        if (m) {
          const platform = JSON.parse(m[0]);
          // Merge platform content into the idea
          setGeneratedIdeas(prev => {
            const ideas = [...(prev[opp.id]||[])];
            const idx = ideas.findIndex(i => (i.rank||0) === (idea.rank||0));
            if (idx >= 0) ideas[idx] = {...ideas[idx], ...platform};
            return {...prev, [opp.id]: ideas};
          });
          // Update selectedIdea too
          setSelectedIdea(prev => prev ? {...prev, ...platform} : prev);
        }
      }
    } catch(e) { console.log("Platform content error:", e.message); }
    finally { setPlatformLoading(p => ({...p,[key]:false})); }
  }, [platformLoading]);

  // Auto-search creators when opp is selected
  useEffect(() => { if (selectedOpp) searchCreators(selectedOpp.id); }, [selectedOpp]);

  // ── Pill style helper ──
  const pill = (bg, color, text, extra) => ({ fontSize:10, fontWeight:600, color, background:bg, padding:"3px 10px", borderRadius:8, display:"inline-block", ...extra });

  // ══════════════════════════════════════════════════════════════
  // HEADER
  // ══════════════════════════════════════════════════════════════
  const Header = () => (
    <div style={{ position:"sticky", top:0, zIndex:100, background:"#FFFFFF", borderBottom:`1px solid ${C.border}`, padding:"12px 0" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={goHome}>
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

  // ══════════════════════════════════════════════════════════════
  // STEP INDICATOR
  // ══════════════════════════════════════════════════════════════
  const STEPS_LABEL = ["기회 발견","기회 분석","AI 아이디어","스토리보드"];
  const StepIndicator = () => (
    <div style={{ position:"sticky", top:52, zIndex:99, background:"#FFFFFF", borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"14px 24px", display:"flex", alignItems:"center" }}>
        {STEPS_LABEL.map((s,i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ flex:1, height:2, background:i<=activeStep?C.primary:"#CBD5E1", margin:"0 4px" }} />}
            <div style={{ display:"flex", alignItems:"center", gap:6, opacity:i<=activeStep?1:0.4 }}>
              <div style={{ width:26, height:26, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", background:i===activeStep?C.primary:i<activeStep?C.accent:"#CBD5E1", color:i<=activeStep?"#fff":C.textSoft, fontSize:12, fontWeight:700 }}>{i+1}</div>
              <span style={{ color:i<=activeStep?C.text:C.textSoft, fontSize:12, fontWeight:i===activeStep?700:500, whiteSpace:"nowrap" }}>{s}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════
  // MINI HEATMAP
  // ══════════════════════════════════════════════════════════════
  const MiniHeatmap = ({ data }) => (
    <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:40 }}>
      {data.map((v,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
          <div style={{ width:"100%", height:Math.max(4,v*0.35), borderRadius:2, background:v>=80?C.primary:v>=60?"rgba(7,112,227,0.4)":"rgba(7,112,227,0.15)" }} />
          <span style={{ fontSize:8, color:C.textSoft }}>{i+1}월</span>
        </div>
      ))}
    </div>
  );

  // ══════════════════════════════════════════════════════════════
  // CREATOR CARDS (YouTube API)
  // ══════════════════════════════════════════════════════════════
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
                <div style={{ color:C.primary, fontSize:10, marginTop:2 }}>이 크리에이터와 협업 시 - 관심사 90% + 여행 10% 콘텐츠로 자연스러운 노출</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════
  // BACK BUTTON
  // ══════════════════════════════════════════════════════════════
  const BackNav = ({ label }) => (
    <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:20 }}>
      <span onClick={goBack} style={{ color:C.primary, fontSize:13, fontWeight:600, cursor:"pointer" }}>{label || "← 이전 단계"}</span>
      {currentView !== "analysis" && <span onClick={goHome} style={{ color:C.textSoft, fontSize:12, cursor:"pointer" }}>← 처음으로</span>}
    </div>
  );

  // ══════════════════════════════════════════════════════════════
  // VIEW 1: MAIN (기회 발견)
  // ══════════════════════════════════════════════════════════════
  const renderMain = () => (
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
        <div style={{ background:C.card, borderRadius:20, border:`1px solid ${C.border}`, padding:32, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <span style={pill("#EFF6FF",C.primary,"",{marginBottom:12,alignSelf:"flex-start"})}>ListeningMind 검색 데이터 기반</span>
          <div style={{ color:C.primary, fontSize:34, fontWeight:800, marginBottom:6 }}>연간 {fmt(20110058)}회</div>
          <div style={{ color:C.text, fontSize:14, fontWeight:600, marginBottom:16, lineHeight:1.5 }}>Trip.com을 검색하지 않고<br/>여행과 관심사를 검색하는 소비자</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:C.surface, borderRadius:10, padding:"10px 14px", border:`1px solid ${C.border}` }}>
              <span style={{ color:C.text, fontSize:13 }}>여행 목적지 검색 (11개 기회)</span>
              <span style={{ color:C.primary, fontSize:16, fontWeight:800 }}>연간 {fmt(18076348)}회</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:C.surface, borderRadius:10, padding:"10px 14px", border:`1px solid ${C.border}` }}>
              <span style={{ color:C.text, fontSize:13 }}>라이프 관심사 검색 (7개 기회)</span>
              <span style={{ color:C.secondary, fontSize:16, fontWeight:800 }}>연간 {fmt(2033710)}회</span>
            </div>
          </div>
          <div style={{ color:C.secondary, fontSize:12, fontWeight:600, lineHeight:1.5 }}>이 검색에서 Trip.com은 발견되지 않고 있습니다 — 이것이 기회입니다</div>
        </div>
      </div>

      {/* Competition Banner */}
      <div style={{ background:C.bannerBg, border:`1px solid ${C.border}`, borderRadius:12, padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12, marginBottom:32 }}>
        <div style={{ color:C.textSoft, fontSize:12 }}><span style={{ color:C.text, fontWeight:600 }}>OTA 경쟁 환경 (연간):</span> 스카이스캐너 3,813만 {">"} 아고다 1,929만 {">"} 네이버항공권 1,893만 {">"} <span style={{ color:C.primary, fontWeight:600 }}>트립닷컴 949만</span> {">"} 마이리얼트립 694만</div>
        <div style={{ color:C.gold, fontSize:11 }}>스카이스캐너→트립닷컴 크로스플로우</div>
      </div>

      {/* USP Asset Map */}
      <div style={{ background:"#F0F9FF", borderRadius:20, padding:"28px 24px", marginBottom:32, border:`1px solid ${C.border}` }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:18, fontWeight:700, marginBottom:4 }}>Trip.com이 이 기회를 잡을 수 있는 이유</div>
          <div style={{ color:C.textSoft, fontSize:13 }}>5가지 USP 자산이 소비자의 페인포인트를 해결합니다{activeUsps.size > 0 ? ` · ${activeUsps.size}개 USP 필터 활성` : ""}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:12 }}>
          {USP_MAP.map(usp => {
            const isActive = activeUsps.has(usp.id);
            return (
              <div key={usp.id} onClick={() => toggleUsp(usp.id)} style={{ background:isActive?"#EFF6FF":"#FFFFFF", borderRadius:16, border:`2px solid ${isActive?C.primary:C.border}`, padding:20, cursor:"pointer", textAlign:"center", transition:"all 0.2s", transform:isActive?"translateY(-2px)":"none", boxShadow:isActive?"0 4px 12px rgba(7,112,227,0.15)":"none" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{usp.icon}</div>
                <div style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:6 }}>{usp.name}</div>
                <div style={{ color:C.textSoft, fontSize:11, lineHeight:1.4, marginBottom:10, minHeight:30 }}>{usp.pain}</div>
                <div style={{ color:C.primary, fontSize:22, fontWeight:800 }}>{usp.count}</div>
                <div style={{ color:C.textSoft, fontSize:10 }}>기회 연결</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section A: Destination */}
      <div style={{ marginBottom:40 }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:18, fontWeight:700, marginBottom:4 }}>A. 여행 목적지에서 출발한 기회</div>
          <div style={{ color:C.textSoft, fontSize:13, marginBottom:8 }}>목적지에 따라 궁금해하는 것은 완전히 다릅니다</div>
          <span style={pill(`${C.primary}12`,C.primary,"")}>연간 {fmt(18076348)}회 검색 | 11개 기회 클러스터</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {DEST_OPPS.map(opp => {
            const ss = STAGE_STYLES[opp.stage] || {};
            const highlighted = isOppHighlighted(opp.id);
            const oppUsps = USP_TAGS[opp.id] || [];
            return (
              <div key={opp.id} onClick={() => goToAnalysis(opp)} style={{ background:C.card, borderRadius:16, border:`1px solid ${hoveredCard===opp.id?C.primary:C.border}`, borderLeft:`3px solid ${C.primary}`, padding:"16px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:16, transition:"all 0.2s", transform:hoveredCard===opp.id?"translateY(-2px)":"none", boxShadow:hoveredCard===opp.id?"0 4px 12px rgba(0,0,0,0.08)":"none", opacity:highlighted?1:0.3 }} onMouseEnter={() => setHoveredCard(opp.id)} onMouseLeave={() => setHoveredCard(null)}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, minWidth:48 }}>
                  <span style={{ fontSize:28 }}>{opp.icon}</span>
                  <span style={{ fontSize:9, fontWeight:700, color:"#fff", background:LEVEL_COLORS[opp.level], padding:"2px 6px", borderRadius:4 }}>{opp.level}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:C.text, fontSize:15, fontWeight:700, marginBottom:3 }}>{opp.title}</div>
                  <div style={{ fontSize:12, marginBottom:2 }}><span style={{ color:C.primary, fontWeight:600 }}>{opp.hookType}</span> <span style={{ color:C.textSoft }}>{opp.hookLabel}</span></div>
                  <div style={{ color:C.textSoft, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{opp.strategyCopy}</div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:4 }}>
                    <span style={pill(ss.bg||"#EFF6FF", ss.color||C.primary, "")}>{opp.stage}</span>
                    {oppUsps.map(u => <span key={u} style={pill("#F0F9FF",C.primary,"")}>{USP_ICONS[u]}{USP_NAMES[u]}</span>)}
                  </div>
                </div>
                <div style={{ textAlign:"right", minWidth:100 }}>
                  <div style={{ color:C.primary, fontSize:14, fontWeight:800 }}>연간 {fmt(opp.annualVol)}회</div>
                  <div style={{ color:C.textSoft, fontSize:10 }}>월 평균 {fmt(opp.monthlyVol)}회</div>
                  <div style={{ color:C.primary, fontSize:18, marginTop:6 }}>→</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section B: Interest */}
      <div>
        <div style={{ marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:18, fontWeight:700, marginBottom:4 }}>B. 소비자 관심사에서 출발한 기회</div>
          <div style={{ color:C.textSoft, fontSize:13, marginBottom:8 }}>관심사 속에서 Trip.com이 발견됩니다</div>
          <div style={{ display:"flex", gap:8 }}>
            <span style={pill(`${C.secondary}12`,C.secondary,"")}>관심층 연간 14,000,000+회 | 해외 연결 연간 {fmt(2146916)}회 | 10개 기회 클러스터</span>
            <span style={pill("#FFFBEB","#D97706","")}>3E 전략 정합</span>
          </div>
        </div>

        {/* 3E Strategy Banner */}
        <div style={{ background:"#FFFBEB", borderRadius:14, border:"1px solid #FDE68A", padding:16, marginBottom:16 }}>
          <div style={{ color:"#92400E", fontSize:13, fontWeight:700, marginBottom:10 }}>3E 전략 — Elderly · Event · Life Transition</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <div style={{ background:"#FFFFFF", borderRadius:10, padding:12, border:"1px solid #FDE68A" }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#92400E", marginBottom:4 }}>👴 Elderly — 시니어 시장의 재발견</div>
              <div style={{ fontSize:11, color:C.text, lineHeight:1.5, marginBottom:6 }}>어버이날(400만)·환갑(71만)·칠순(24만) = 연 600만 감정 모먼트<br/>+ 골프(130만)·크루즈(112만) = 시니어 라이프스타일 여행</div>
              <div style={{ fontSize:10, color:C.textSoft, lineHeight:1.4 }}>연결: 효도·어버이날·환갑, 골프(스크린골프→해외), 한달살기, 크루즈<br/>Trip.com: 24시간 CS + 시니어 맞춤 + "여행이 최고의 선물"</div>
            </div>
            <div style={{ background:"#FFFFFF", borderRadius:10, padding:12, border:"1px solid #FDE68A" }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#92400E", marginBottom:4 }}>🎪 Event — 이벤트 연결 여행</div>
              <div style={{ fontSize:11, color:C.text, lineHeight:1.5, marginBottom:6 }}>콘서트·마라톤·미식 = 전환 경로가 가장 짧은 여행<br/>+ 프로포즈(77만)·결혼기념일(21만) = 인생 이벤트 반복 기회</div>
              <div style={{ fontSize:10, color:C.textSoft, lineHeight:1.4 }}>연결: 이벤트+여행, 프로포즈→신혼여행→기념일 반복<br/>Trip.com: 이벤트 일정 연동 + 원스톱 예약</div>
            </div>
            <div style={{ background:"#F0FDF4", borderRadius:10, padding:12, border:"1px solid #BBF7D0" }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#166534", marginBottom:4 }}>🔄 Life Transition — 삶의 전환점 여행</div>
              <div style={{ fontSize:11, color:C.text, lineHeight:1.5, marginBottom:6 }}>번아웃(65.7만)·퇴사(48.6만)·워케이션(14만,+70%)·갭이어(4.7만,+157%)</div>
              <div style={{ fontSize:10, color:C.textSoft, lineHeight:1.4 }}>연결: 한달살기, 워케이션, 디지털노마드, 안식년, 정년퇴직<br/>Trip.com: 장기숙소 + 트립지니 AI 플래너 + 가격 경쟁력</div>
            </div>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {INT_OPPS.map(opp => {
            const ss = STAGE_STYLES[opp.stage] || {};
            const highlighted = isOppHighlighted(opp.id);
            const oppUsps = USP_TAGS[opp.id] || [];
            return (
              <div key={opp.id} onClick={() => goToAnalysis(opp)} style={{ background:C.card, borderRadius:16, border:`1px solid ${hoveredCard===opp.id?C.secondary:C.border}`, borderLeft:`3px solid ${C.secondary}`, padding:"16px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:16, transition:"all 0.2s", transform:hoveredCard===opp.id?"translateY(-2px)":"none", boxShadow:hoveredCard===opp.id?"0 4px 12px rgba(0,0,0,0.08)":"none", opacity:highlighted?1:0.3 }} onMouseEnter={() => setHoveredCard(opp.id)} onMouseLeave={() => setHoveredCard(null)}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, minWidth:48 }}>
                  <span style={{ fontSize:28 }}>{opp.icon}</span>
                  <span style={{ fontSize:9, fontWeight:700, color:"#fff", background:LEVEL_COLORS[opp.level], padding:"2px 6px", borderRadius:4 }}>{opp.level}</span>
                  {opp.e3tag && <span style={pill("#FFFBEB","#D97706","")}>{opp.e3tag}</span>}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:C.text, fontSize:15, fontWeight:700, marginBottom:3 }}>{opp.title}</div>
                  <div style={{ fontSize:12, marginBottom:2 }}><span style={{ color:C.secondary, fontWeight:600 }}>{opp.hookType}</span> <span style={{ color:C.textSoft }}>{opp.hookLabel}</span></div>
                  <div style={{ color:C.textSoft, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{opp.strategyCopy}</div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:4 }}>
                    {oppUsps.map(u => <span key={u} style={pill("#F0F9FF",C.primary,"")}>{USP_ICONS[u]}{USP_NAMES[u]}</span>)}
                  </div>
                </div>
                <div style={{ textAlign:"right", minWidth:100 }}>
                  <div style={{ color:C.secondary, fontSize:14, fontWeight:800 }}>연간 {fmt(opp.motherAnnualVol || opp.annualVol)}회</div>
                  <div style={{ color:C.secondary, fontSize:18, marginTop:6 }}>→</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra Opportunities */}
      <div style={{ marginTop:40 }}>
        <div style={{ marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:18, fontWeight:700, marginBottom:4 }}>추가 발견된 기회</div>
          <div style={{ color:C.textSoft, fontSize:13 }}>검색량이 확인된 추가 목적지와 관심사입니다</div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {EXTRA_OPPS.map((ex,i) => (
            <span key={i} style={{ background:"#F0F9FF", border:`1px solid ${C.border}`, borderRadius:20, padding:"6px 14px", fontSize:12, color:C.text, cursor:"pointer", transition:"all 0.15s", display:"inline-flex", alignItems:"center", gap:6 }} onMouseEnter={e => e.currentTarget.style.borderColor=C.primary} onMouseLeave={e => e.currentTarget.style.borderColor=C.border}>
              {ex.keyword} <span style={{ color:C.textSoft, fontSize:10 }}>연 {fmtMan(ex.annual)}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════
  // VIEW 2: ANALYSIS (기회 분석) — Full Page
  // ══════════════════════════════════════════════════════════════
  const AXIS_CFG = [
    { key:"who", icon:"👤", color:"#FF6B6B", label:"WHO", sub:"누가 검색하는가?" },
    { key:"when", icon:"📅", color:"#4ECDC4", label:"WHEN", sub:"언제 검색하는가?" },
    { key:"journey", icon:"🔍", color:"#45B7D1", label:"JOURNEY", sub:"어떤 경로로 검색하는가?" },
    { key:"pain", icon:"😣", color:"#FF8B94", label:"PAIN", sub:"소비자의 고통은?" },
    { key:"usp", icon:"🔗", color:"#FFD93D", label:"USP FIT", sub:"Trip.com이 해결할 수 있는 것" },
    { key:"hook", icon:"🎣", color:"#DDA0DD", label:"HOOK", sub:"콘텐츠 진입점" },
  ];

  const renderAnalysis = () => {
    if (!selectedOpp) return null;
    const opp = selectedOpp;
    const ctx = CONTEXT_DATA[opp.id] || {};
    const ss = STAGE_STYLES[opp.stage] || {};
    const isLoading = loadingIds[opp.id];
    return (
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 24px 40px" }}>
        <BackNav label="← 이전 단계" />

        {/* Title Area */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
              <span style={{ fontSize:40 }}>{opp.icon}</span>
              <div>
                <div style={{ color:C.text, fontSize:26, fontWeight:800 }}>{opp.title}</div>
                <div style={{ color:C.textSoft, fontSize:13, marginTop:2 }}>{opp.strategyCopy}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <span style={pill(`${(ss.bg||"#EFF6FF")}`, ss.color||C.primary, "")}>{opp.hookType}</span>
              <span style={pill(ss.bg||"#EFF6FF", ss.color||C.primary, "")}>{opp.stage}</span>
              <span style={{ fontSize:10, fontWeight:700, color:"#fff", background:LEVEL_COLORS[opp.level], padding:"3px 10px", borderRadius:8 }}>{opp.level}</span>
              <span style={pill("#EFF6FF",C.primary,"")}>연간 {fmt(opp.annualVol)}회 · 월 {fmt(opp.monthlyVol)}회</span>
            </div>
          </div>
          <button onClick={() => { if(!generatedIdeas[opp.id]) generateIdeas(opp); else goToIdeas(); }} disabled={isLoading} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:14, padding:"14px 28px", fontSize:14, fontWeight:700, cursor:isLoading?"wait":"pointer", whiteSpace:"nowrap", opacity:isLoading?0.7:1 }}>
            {isLoading ? "생성 중..." : "AI 숏폼 아이디어 생성"}
          </button>
        </div>

        {/* Monthly Trend */}
        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:20, marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <span style={{ color:C.text, fontSize:14, fontWeight:600 }}>월별 검색 트렌드</span>
            <span style={{ color:C.primary, fontSize:18, fontWeight:800 }}>월 평균 {fmt(opp.monthlyVol)}회</span>
          </div>
          <MiniHeatmap data={opp.peakMonths} />
        </div>

        {/* 6-Axis Grid (2col x 3row) */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
          {AXIS_CFG.map(ax => {
            const d = ctx[ax.key]; if(!d) return null;
            return (
              <div key={ax.key} style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <span style={{ fontSize:16 }}>{ax.icon}</span>
                  <div>
                    <div style={{ color:C.text, fontSize:14, fontWeight:700 }}>{ax.label}</div>
                    <div style={{ color:C.textSoft, fontSize:11 }}>{ax.sub}</div>
                  </div>
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

        {/* Search Journey (PathFinder) */}
        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:20, marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:10 }}>🔍 검색 여정 (PathFinder)</div>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:10 }}>
            {opp.pathJourney.map((node,i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color:C.primary, fontWeight:700 }}>→</span>}
                <span style={{ background:"#EFF6FF", color:C.primary, padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600 }}>{node}</span>
              </React.Fragment>
            ))}
          </div>
          <div style={{ color:C.textSoft, fontSize:12 }}>{opp.pathInsight}</div>
        </div>

        {/* Cluster Insight */}
        <div style={{ background:"#F0F9FF", borderRadius:14, border:`1px solid ${C.border}`, padding:20, marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:6 }}>🧠 소비자 인식 (Cluster)</div>
          <div style={{ color:C.text, fontSize:13, lineHeight:1.6 }}>{opp.clusterInsight}</div>
        </div>

        {/* Top Keywords */}
        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:20, marginBottom:16 }}>
          <div style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:10 }}>🔑 관련 검색어 TOP</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {(opp.topKeywords||[]).map((kw,i) => (
              <span key={i} style={{ background:i<3?"#EFF6FF":"#F8FAFC", color:i<3?C.primary:C.text, padding:"6px 12px", borderRadius:20, fontSize:12, fontWeight:i<3?600:400, border:`1px solid ${i<3?`${C.primary}30`:C.border}` }}>
                {kw.keyword} <span style={{ color:C.textSoft, fontSize:10 }}>{kw.note ? `${fmt(kw.vol)} (${kw.note})` : `${fmt(kw.vol)}/월`}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Content Hook + Data Proof */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
          <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:20 }}>
            <div style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:8 }}>콘텐츠 훅 예시</div>
            <div style={{ color:C.secondary, fontSize:18, fontWeight:700, lineHeight:1.5 }}>{opp.contentHook}</div>
          </div>
          <div style={{ background:"#F8FAFC", borderRadius:14, border:`1px solid ${C.border}`, padding:20 }}>
            <div style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:8 }}>DATA EVIDENCE</div>
            <div style={{ color:C.text, fontSize:13, lineHeight:1.6 }}>{opp.dataProof}</div>
          </div>
        </div>

        {/* Execute Button */}
        <button onClick={() => { if(!generatedIdeas[opp.id]) generateIdeas(opp); else goToIdeas(); }} disabled={isLoading} style={{ width:"100%", background:C.primary, color:"#fff", border:"none", borderRadius:14, padding:"18px 0", fontSize:16, fontWeight:700, cursor:isLoading?"wait":"pointer", opacity:isLoading?0.7:1 }}>
          {isLoading ? (
            <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              <span style={{ display:"inline-block", width:18, height:18, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
              AI가 아이디어를 생성 중...
            </span>
          ) : "실행 — AI 숏폼 아이디어 생성"}
        </button>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════
  // VIEW 3: AI IDEAS
  // ══════════════════════════════════════════════════════════════
  const PERSP = [{key:"auto",label:"AI 자동 추천"},{key:"A",label:"A. 소비자 맥락 조합"},{key:"B",label:"B. 검색 여정 발견"},{key:"C",label:"C. 크로스 카테고리"}];

  const renderIdeas = () => {
    if (!selectedOpp) return null;
    const opp = selectedOpp;
    const ideas = generatedIdeas[opp.id];
    const isLoading = loadingIds[opp.id];
    return (
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 24px 40px" }}>
        <BackNav label="← 이전 단계" />

        {/* Title */}
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <span style={{ fontSize:32 }}>{opp.icon}</span>
            <div>
              <div style={{ color:C.text, fontSize:22, fontWeight:800 }}>{opp.title}</div>
              <div style={{ color:C.textSoft, fontSize:13 }}>AI 아이디어 생성 결과</div>
            </div>
          </div>
          {ideas && !ideas[0]?.error && <div style={{ color:C.accent, fontSize:13, fontWeight:600 }}>숏폼 아이디어 {ideas.length}개 생성 완료</div>}
        </div>

        {/* Perspective Tabs */}
        <div style={{ display:"flex", gap:8, marginBottom:24 }}>
          {PERSP.map((p,i) => (
            <button key={p.key} onClick={() => i===0?setIdeaPerspective(p.key):null} style={{ padding:"8px 16px", borderRadius:20, border:`1px solid ${ideaPerspective===p.key?C.primary:C.border}`, background:ideaPerspective===p.key?C.primary:"transparent", color:ideaPerspective===p.key?"#fff":i===0?C.text:C.textSoft, fontSize:12, fontWeight:600, cursor:i===0?"pointer":"default", opacity:i===0?1:0.5 }}>
              {p.label}{i>0 && " (준비중)"}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div style={{ textAlign:"center", padding:80 }}>
            <div style={{ display:"inline-block", width:40, height:40, border:"3px solid #E2E8F0", borderTopColor:C.primary, borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
            <div style={{ color:C.textSoft, fontSize:14, marginTop:16 }}>AI가 아이디어를 생성 중... (최대 30초 소요)</div>
          </div>
        )}

        {/* No ideas yet */}
        {!ideas && !isLoading && (
          <div style={{ textAlign:"center", padding:60 }}>
            <div style={{ color:C.textSoft, fontSize:14, marginBottom:16 }}>아직 아이디어가 생성되지 않았습니다</div>
            <button onClick={() => generateIdeas(opp)} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:12, padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer" }}>AI 아이디어 생성하기</button>
          </div>
        )}

        {/* Idea Cards */}
        {ideas && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {ideas.map((idea,idx) => {
              if (idea.error) return (
                <div key={idx} style={{ padding:20, background:"#FEF2F2", borderRadius:12, textAlign:"center" }}>
                  <div style={{ color:C.warn, fontSize:14, fontWeight:600, marginBottom:8 }}>⚠️ AI 생성 실패</div>
                  <div style={{ color:C.textSoft, fontSize:12, marginBottom:16 }}>{idea.error}</div>
                  <button onClick={() => generateIdeas(opp)} disabled={isLoading} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                    {isLoading ? "재시도 중..." : "다시 시도하기"}
                  </button>
                </div>
              );
              const ct = CONTENT_TYPES.find(c => c.code === idea.contentType) || CONTENT_TYPES[0];
              const score = idea.conversionScore || (95-idx*3);
              const ss = STAGE_STYLES[idea.stage] || {};
              if (ideaPerspective !== "auto" && idea.perspective && idea.perspective !== ideaPerspective) return null;
              return (
                <div key={idx} style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, borderLeft:`4px solid ${ct.color}`, overflow:"hidden" }}>
                  <div style={{ padding:"20px 24px", display:"flex", gap:20 }}>
                    {/* Left: Rank */}
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"center", minWidth:50 }}>
                      <div style={{ width:50, height:50, borderRadius:25, background:`${C.primary}10`, display:"flex", alignItems:"center", justifyContent:"center", color:C.primary, fontSize:24, fontWeight:800 }}>{idea.rank||idx+1}</div>
                    </div>

                    {/* Center: Content */}
                    <div style={{ flex:1 }}>
                      {/* Tags */}
                      <div style={{ display:"flex", gap:6, marginBottom:8, flexWrap:"wrap" }}>
                        <span style={pill(`${ct.color}20`,ct.color,"")}>{ct.code}.{ct.name}</span>
                        {(() => { const ps = PROD_STYLES[idea.productionBy] || PROD_STYLES[ct.by]; return ps ? <span style={pill(ps.bg,ps.color,"")}>{ps.label}</span> : null; })()}
                        <span style={pill(ss.bg||"#EFF6FF",ss.color||C.textSoft,"")}>{idea.stage}</span>
                        {idea.perspective && <span style={pill(`${C.purple}12`,C.purple,"")}>{idea.perspective}</span>}
                        {idea.contextCombo && <span style={pill("#F8FAFC",C.textSoft,"")}>{idea.contextCombo}</span>}
                      </div>

                      {/* Title */}
                      <div style={{ color:C.text, fontSize:16, fontWeight:700, marginBottom:6 }}>{idea.title}</div>

                      {/* 타겟 진입점 */}
                      {idea.targetKeyword && (
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                          <span style={{ fontSize:11, color:C.primary, fontWeight:600 }}>🎯 타겟 진입점:</span>
                          <span style={pill(`${C.primary}12`,C.primary,"")}>{idea.targetKeyword}</span>
                          {idea.targetKeywordVol && <span style={{ fontSize:10, color:C.textSoft }}>({idea.targetKeywordVol})</span>}
                        </div>
                      )}

                      {/* Data Proof */}
                      {idea.dataProof && <div style={{ color:C.textSoft, fontSize:12, marginBottom:8 }}>📊 {idea.dataProof}</div>}

                      {/* Hook */}
                      <div style={{ color:C.secondary, fontSize:16, fontWeight:700, marginBottom:12 }}>✦ HOOK: {idea.hook3s}</div>

                      {/* Scene Flow - 4 boxes */}
                      {idea.sceneFlow && (
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8, marginBottom:12 }}>
                          {idea.sceneFlow.map((s,si) => (
                            <div key={si} style={{ background:C.surface, padding:"8px 10px", borderRadius:10, border:`1px solid ${C.border}`, textAlign:"center" }}>
                              <div style={{ color:C.primary, fontSize:11, fontWeight:700, marginBottom:2 }}>씬{si+1}</div>
                              <div style={{ color:C.text, fontSize:11, lineHeight:1.4 }}>{s}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* USP */}
                      <div style={{ color:C.primary, fontSize:12, marginBottom:6 }}>USP: {idea.uspConnection}</div>

                      {/* Creator Strategy */}
                      {idea.creatorStrategy && (
                        <div style={{ background:C.surface, borderRadius:10, padding:"8px 12px", border:`1px solid ${C.border}` }}>
                          <span style={{ fontSize:12, color:C.text }}>🎬 크리에이터 협업 — {idea.creatorStrategy}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Score + Button */}
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", minWidth:80 }}>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ color:scoreColor(score), fontSize:42, fontWeight:800, lineHeight:1 }}>{score}</div>
                        <div style={{ color:C.textSoft, fontSize:10, marginTop:2 }}>전환점수</div>
                      </div>
                      <button onClick={() => goToStoryboard(idea)} style={{ background:C.primary, color:"#fff", border:"none", borderRadius:10, padding:"10px 16px", fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", marginTop:12 }}>스토리보드 보기 →</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════
  // VIEW 4: STORYBOARD
  // ══════════════════════════════════════════════════════════════
  // Auto-generate platform content when entering storyboard
  useEffect(() => {
    if (currentView === "storyboard" && selectedIdea && selectedOpp && !selectedIdea.youtubeShorts) {
      generatePlatformContent(selectedIdea, selectedOpp);
    }
  }, [currentView, selectedIdea, selectedOpp]);

  const renderStoryboard = () => {
    if (!selectedOpp || !selectedIdea) return null;
    const opp = selectedOpp;
    const idea = selectedIdea;
    const yt = idea.youtubeShorts || {};
    const ig = idea.instagramReels || {};
    const pKey = `${opp.id}-${idea.rank||0}`;
    const isPlatformLoading = platformLoading[pKey];
    const ct = CONTENT_TYPES.find(c => c.code === idea.contentType) || CONTENT_TYPES[0];
    const ss = STAGE_STYLES[idea.stage] || {};

    const PlatformCard = ({ platform, color, icon, maxDur, data }) => {
      const d = data || {};
      return (
        <div style={{ flex:1, background:C.card, borderRadius:16, border:`1px solid ${C.border}`, borderTop:`3px solid ${color}`, overflow:"hidden", padding:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span style={{ fontSize:20 }}>{icon}</span>
            <span style={{ color, fontSize:15, fontWeight:700 }}>{platform}</span>
            <span style={pill(`${color}15`,color,"")}>MAX {maxDur}</span>
            <span style={pill(`${color}15`,color,"")}>9:16</span>
          </div>
          <div style={{ color:C.text, fontSize:16, fontWeight:700, marginBottom:10 }}>{d.title || idea.title}</div>

          <div style={{ marginBottom:14 }}>
            <div style={{ color, fontSize:12, fontWeight:600, marginBottom:4 }}>✦ HOOK (0-3초)</div>
            <div style={{ color:C.text, fontSize:14, fontStyle:"italic", fontWeight:500 }}>{d.hook || idea.hook3s}</div>
          </div>

          <div style={{ marginBottom:14 }}>
            <div style={{ color, fontSize:12, fontWeight:600, marginBottom:8 }}>✦ SCENE FLOW</div>
            {(d.scenes || idea.sceneFlow || []).map((s,i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
                <span style={{ color, fontSize:12, fontWeight:700, minWidth:20 }}>{i+1}.</span>
                <span style={{ color:C.text, fontSize:12, lineHeight:1.5 }}>{s}</span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom:14 }}>
            <div style={{ color:C.accent, fontSize:12, fontWeight:600, marginBottom:4 }}>✓ PROOF</div>
            <div style={{ color:C.text, fontSize:12 }}>{d.proof || idea.dataProof}</div>
          </div>

          <div style={{ marginBottom:14 }}>
            <div style={{ color:C.secondary, fontSize:12, fontWeight:600, marginBottom:4 }}>→ CTA</div>
            <div style={{ color:C.text, fontSize:12 }}>{d.cta || idea.uspConnection}</div>
          </div>

          {(d.hashtags||[]).length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:14 }}>
              {d.hashtags.map((h,i) => <span key={i} style={{ fontSize:10, color, background:`${color}10`, padding:"3px 10px", borderRadius:12 }}>#{h}</span>)}
            </div>
          )}

          <div style={{ display:"flex", gap:16, fontSize:11, color:C.textSoft, borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
            {d.uploadTime && <span>⏰ {d.uploadTime}</span>}
            <span>🎯 {d.targetCluster || idea.target || opp.demographics}</span>
          </div>
        </div>
      );
    };

    return (
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 24px 40px" }}>
        <BackNav label="← 이전 단계" />

        {/* Title Area */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", gap:8, marginBottom:8 }}>
            <span style={pill(`${ct.color}20`,ct.color,"")}>{ct.code}.{ct.name}</span>
            <span style={pill(ss.bg||"#EFF6FF",ss.color||C.textSoft,"")}>{idea.stage}</span>
          </div>
          <div style={{ color:C.text, fontSize:24, fontWeight:800, marginBottom:6 }}>{idea.title}</div>
          <div style={{ color:C.secondary, fontSize:16, fontStyle:"italic" }}>{idea.hook3s}</div>
        </div>

        {/* 3-Tab Bar */}
        <div style={{ display:"flex", gap:0, marginBottom:20, background:C.card, borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          {[
            { label:"숏폼 콘텐츠", icon:"▶" },
            { label:"6초 범퍼 광고", icon:"⚡" },
            { label:"DA 배너", icon:"🖼️" },
          ].map((tab,i) => (
            <div key={i} onClick={() => setStoryboardTab(i)} style={{ flex:1, padding:"14px 16px", textAlign:"center", cursor:"pointer", background: storyboardTab === i ? C.primary : "transparent", color: storyboardTab === i ? "#fff" : C.textSoft, fontSize:13, fontWeight: storyboardTab === i ? 700 : 500, borderRight: i < 2 ? `1px solid ${C.border}` : "none", transition:"all 0.2s" }}>
              {tab.icon} {tab.label}
            </div>
          ))}
        </div>

        {/* Loading Spinner */}
        {isPlatformLoading && !yt.title && (
          <div style={{ textAlign:"center", padding:40, background:C.card, borderRadius:14, border:`1px solid ${C.border}`, marginBottom:16 }}>
            <div style={{ display:"inline-block", width:32, height:32, border:"3px solid #E2E8F0", borderTopColor:C.primary, borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
            <div style={{ color:C.textSoft, fontSize:13, marginTop:12 }}>플랫폼별 콘텐츠를 생성 중...</div>
          </div>
        )}

        {/* Tab 1: 숏폼 콘텐츠 */}
        {storyboardTab === 0 && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
              <PlatformCard platform="YouTube Shorts" color={C.youtube} icon="▶" maxDur="60s" data={yt} />
              <PlatformCard platform="Instagram Reels" color={C.instagram} icon="📷" maxDur="90s" data={ig} />
            </div>

            {/* 4-Grid Info */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:12, marginBottom:24 }}>
              {[
                {i:"🎯",l:"타겟",v:idea.target||opp.demographics},
                {i:"🎬",l:"크리에이터 추천",v:idea.creatorStrategy||"MICRO 크리에이터 협업"},
                {i:"📊",l:"데이터 근거",v:idea.dataProof},
                {i:"📅",l:"시리즈 구성",v:idea.seriesNote||"1편(90/10)→2편(60/40)→3편(30/70)"}
              ].map((d,i) => (
                <div key={i} style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`, padding:16 }}>
                  <div style={{ fontSize:11, color:C.textSoft, marginBottom:6 }}>{d.i} {d.l}</div>
                  <div style={{ fontSize:12, color:C.text, lineHeight:1.6 }}>{d.v}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Tab 2: 6초 범퍼 광고 */}
        {storyboardTab === 1 && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:24 }}>
            {(idea.bumperAds || [{},{},{}]).map((ad,i) => (
              <div key={i} style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, borderTop:`3px solid ${C.secondary}`, padding:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                  <span style={{ fontSize:20 }}>⚡</span>
                  <span style={{ color:C.secondary, fontSize:15, fontWeight:700 }}>범퍼 #{i+1}</span>
                  <span style={pill(`${C.secondary}15`,C.secondary,"")}>6초</span>
                </div>

                {/* Hook 1-2초 */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ color:C.secondary, fontSize:11, fontWeight:700, marginBottom:4 }}>⏱ 1-2초 HOOK</div>
                  <div style={{ color:C.text, fontSize:18, fontWeight:800, lineHeight:1.3 }}>{ad.hook2s || "—"}</div>
                </div>

                {/* Message 3-4초 */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ color:C.primary, fontSize:11, fontWeight:700, marginBottom:4 }}>💬 3-4초 MESSAGE</div>
                  <div style={{ color:C.text, fontSize:14, fontWeight:600, lineHeight:1.4 }}>{ad.message2s || "—"}</div>
                </div>

                {/* CTA 5-6초 */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ color:C.accent, fontSize:11, fontWeight:700, marginBottom:4 }}>→ 5-6초 CTA</div>
                  <div style={{ color:C.accent, fontSize:14, fontWeight:700 }}>{ad.cta2s || "—"}</div>
                </div>

                {/* USP Focus */}
                {ad.uspFocus && (
                  <div style={{ marginBottom:10 }}>
                    <span style={pill(`${C.primary}12`,C.primary,"")}>USP: {ad.uspFocus}</span>
                  </div>
                )}

                {/* Target Keywords */}
                {(ad.targetKeywords||[]).length > 0 && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                    {ad.targetKeywords.map((kw,ki) => <span key={ki} style={{ fontSize:10, color:C.textSoft, background:C.surface, padding:"3px 8px", borderRadius:8 }}>#{kw}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: DA 배너 */}
        {storyboardTab === 2 && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:24 }}>
            {(idea.displayAds || [{},{},{}]).map((ad,i) => (
              <div key={i} style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, borderTop:`3px solid ${C.purple}`, padding:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                  <span style={{ fontSize:20 }}>🖼️</span>
                  <span style={{ color:C.purple, fontSize:15, fontWeight:700 }}>DA #{i+1}</span>
                </div>

                {/* Headline */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ color:C.purple, fontSize:11, fontWeight:700, marginBottom:4 }}>📌 HEADLINE</div>
                  <div style={{ color:C.text, fontSize:18, fontWeight:800, lineHeight:1.3 }}>{ad.headline || "—"}</div>
                </div>

                {/* Sub Copy */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ color:C.textSoft, fontSize:11, fontWeight:700, marginBottom:4 }}>💬 SUB COPY</div>
                  <div style={{ color:C.text, fontSize:13, lineHeight:1.5 }}>{ad.subCopy || "—"}</div>
                </div>

                {/* CTA */}
                <div style={{ marginBottom:14 }}>
                  <div style={{ color:C.accent, fontSize:11, fontWeight:700, marginBottom:4 }}>→ CTA</div>
                  <div style={{ background:C.primary, color:"#fff", display:"inline-block", padding:"6px 16px", borderRadius:8, fontSize:13, fontWeight:700 }}>{ad.cta || "—"}</div>
                </div>

                {/* Recommended Sizes */}
                {(ad.recommendedSizes||[]).length > 0 && (
                  <div style={{ marginBottom:10 }}>
                    <div style={{ fontSize:10, color:C.textSoft, marginBottom:4 }}>추천 사이즈</div>
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                      {ad.recommendedSizes.map((sz,si) => <span key={si} style={pill(C.surface,C.textSoft,"")}>{sz}</span>)}
                    </div>
                  </div>
                )}

                {/* USP Focus */}
                {ad.uspFocus && (
                  <div style={{ marginBottom:10 }}>
                    <span style={pill(`${C.primary}12`,C.primary,"")}>USP: {ad.uspFocus}</span>
                  </div>
                )}

                {/* Target Keywords */}
                {(ad.targetKeywords||[]).length > 0 && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                    {ad.targetKeywords.map((kw,ki) => <span key={ki} style={{ fontSize:10, color:C.textSoft, background:C.surface, padding:"3px 8px", borderRadius:8 }}>#{kw}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Collapsible: Ad Targeting */}
        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, marginBottom:12, overflow:"hidden" }}>
          <div onClick={() => toggleSection("ad")} style={{ padding:"16px 20px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ color:C.text, fontSize:14, fontWeight:600 }}>📢 광고 노출 추천</span>
            <span style={{ color:C.textSoft, fontSize:14 }}>{expandedSections.ad?"▴":"▾"}</span>
          </div>
          {expandedSections.ad && (
            <div style={{ padding:"0 20px 16px", borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
              <div style={{ color:C.text, fontSize:12, lineHeight:1.8, whiteSpace:"pre-line" }}>
                {idea.adTargeting || `• 관심사: ${opp.title} 관련 검색 이력자\n• 인구통계: ${opp.demographics}\n• 리타겟팅: Trip.com 방문 후 이탈자\n• 시즌: ${opp.peakSeason} 집중 노출`}
              </div>
            </div>
          )}
        </div>

        {/* Collapsible: Creator Matching */}
        <div style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, marginBottom:24, overflow:"hidden" }}>
          <div onClick={() => toggleSection("creator")} style={{ padding:"16px 20px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ color:C.text, fontSize:14, fontWeight:600 }}>🎬 크리에이터 매칭 — YouTube API 실시간 검색</span>
            <span style={{ color:C.textSoft, fontSize:14 }}>{expandedSections.creator?"▴":"▾"}</span>
          </div>
          {expandedSections.creator && (
            <div style={{ padding:"0 20px 16px", borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
              <div style={{ color:C.textSoft, fontSize:12, marginBottom:10 }}>"{(YT_QUERIES[opp.id]||[])[0]}" 검색 결과 기반 추천</div>
              <CreatorCards oppId={opp.id} />
            </div>
          )}
        </div>

        {/* Back to ideas */}
        <button onClick={() => setCurrentView("ideas")} style={{ width:"100%", background:C.surface, color:C.primary, border:`1px solid ${C.border}`, borderRadius:14, padding:"14px 0", fontSize:14, fontWeight:600, cursor:"pointer" }}>← 다른 아이디어 보기</button>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════
  // FOOTER
  // ══════════════════════════════════════════════════════════════
  const Footer = () => (
    <div style={{ background:C.footerBg, borderTop:`1px solid ${C.border}`, padding:"24px 0", textAlign:"center" }}>
      <div style={{ color:"#94A3B8", fontSize:11, letterSpacing:3 }}>PENTACLE × AI&nbsp;&nbsp;&nbsp;ALGORITHM PERFORMANCE PLATFORM</div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:0.6}50%{opacity:0.3}}`}</style>
      <Header />
      <StepIndicator />
      {currentView === "main" && renderMain()}
      {currentView === "analysis" && renderAnalysis()}
      {currentView === "ideas" && renderIdeas()}
      {currentView === "storyboard" && renderStoryboard()}
      <Footer />
    </div>
  );
}
