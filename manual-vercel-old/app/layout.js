export const metadata = {
  title: "スタディGO スタッフマニュアル",
  description: "勉強カフェ新宿スタジオ スタッフ向けマニュアル",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
