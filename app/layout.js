export const metadata = {
  title: "Trip.com AI Brandformance Engine",
  description: "한국 검색 행태 특화 숏폼 전략 시스템 | Pentacle × AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, background: "#F5F7FA", fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
