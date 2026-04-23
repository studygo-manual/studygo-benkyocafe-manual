import { redirect } from "next/navigation";

export default function Home() {
  // ログイン後は manual-easy.html をトップとして表示
  redirect("/manual-easy.html");
}
