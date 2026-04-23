"use client";

import { signOut } from "next-auth/react";

export default function DeniedPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🚫</div>
        <h1 style={styles.title}>アクセス権限がありません</h1>
        <p style={styles.text}>
          このマニュアルは勉強カフェ新宿スタジオの許可されたスタッフのみが閲覧できます。
          <br />
          間違ったGoogleアカウントでログインした場合は、一度ログアウトして
          正しいアカウントで再度お試しください。
        </p>
        <p style={styles.contact}>
          アクセス権が必要な場合は 國松（s_kunimatsu@b-pt.jp）までご連絡ください。
        </p>
        <button
          type="button"
          style={styles.button}
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          ログアウトして別アカウントで試す
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #fff9e6 0%, #ffd966 100%)",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "48px 32px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "480px",
    width: "100%",
    textAlign: "center",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#c00",
    marginBottom: "16px",
  },
  text: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.7",
    marginBottom: "20px",
  },
  contact: {
    fontSize: "13px",
    color: "#888",
    marginBottom: "28px",
  },
  button: {
    background: "#ffd966",
    color: "#333",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
  },
};
