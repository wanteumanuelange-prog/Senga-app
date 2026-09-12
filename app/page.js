"use client";

import Link from "next/link";

export default function SplashPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 44,
          letterSpacing: 6,
        }}
      >
        SENGA
      </div>
      <div
        style={{
          color: "var(--ember)",
          fontSize: 12.5,
          letterSpacing: 3,
          marginTop: 8,
          marginBottom: 40,
        }}
      >
        COACHING &amp; DEVELOPMENT
      </div>
      <Link href="/login" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: "15px 34px",
            borderRadius: 3,
            background: "var(--ember)",
            color: "var(--ivory)",
            border: "none",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Continuer
        </button>
      </Link>
    </div>
  );
}
