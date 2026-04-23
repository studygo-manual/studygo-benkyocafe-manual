"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>スタディGO スタッフマニュアル</h1>
        <p style={styles.subtitle}>
          このページは勉強カフェ新宿スタジオ スタッフ向けの社内限定マニュアルです。
          <br />
          許可された Google アカウントでログインしてください。
        </p>

        {error && (
          <div style={styles.error}>
            {error === "AccessDenied"
              ? "このアカウントにはアクセス権限がありません。國松までご連絡ください。"
              : "ログインに失敗しました。もう一度お試しください。"}
          </div>
        )}

        <button
          type="button"
          style={styles.button}
          onClick={() => signIn("google", { callbackUrl })}
        >
          <span style={styles.googleIcon}>G</span>
          Google でログイン
        </button>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={styles.container}>読み込み中...</div>}>
      <SignInContent />
    </Suspense>
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
    maxWidth: "440px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "32px",
  },
  error: {
    background: "#ffe4e4",
    color: "#c00",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    background: "#fff",
    color: "#333",
    border: "1px solid #ddd",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.2s",
  },
  googleIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    background: "#4285f4",
    color: "#fff",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "14px",
  },
};
