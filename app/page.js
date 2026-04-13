export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 50%, #2d1b69 100%)",
      color: "#fff",
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Tripcom Brandformance Engine
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#aaa", marginBottom: "2rem" }}>
        Trip.com 브랜드포먼스 분석 대시보드
      </p>
      <div style={{
        padding: "2rem 3rem",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "1rem", color: "#ccc" }}>
          준비 중입니다.
        </p>
      </div>
    </div>
  );
}
