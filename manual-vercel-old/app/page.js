import { redirect } from "next/navigation";

export default function Home() {
  // ログイン後は旧マニュアル index.html をトップとして表示
  redirect("/index.html");
}
