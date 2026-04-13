export const metadata = {
  title: "Tripcom Brandformance Engine",
  description: "Trip.com 브랜드포먼스 분석 엔진",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
