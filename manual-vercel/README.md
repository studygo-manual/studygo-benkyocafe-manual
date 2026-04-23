# スタディGO スタッフマニュアル（社内限定版）

勉強カフェ新宿スタジオのスタッフ向け、Google認証で許可されたアカウントのみアクセス可能な内部マニュアルです。

## 許可されたアカウント

- `benkyocafe.shinjuku@gmail.com`
- `benkyo-cafe.sbp@b-pt.jp`
- `s_kunimatsu@b-pt.jp`
- `m_kondo@b-pt.jp`

---

# セットアップ手順

## 前提

- Node.js 18以上（未インストールなら https://nodejs.org/ja から LTS 版をDL）
- Google アカウント（Google Cloud Console 用）
- GitHub アカウント（Vercelでの自動デプロイ用・任意）
- Vercel アカウント（https://vercel.com/signup からGitHub連携で作成）

---

## ステップ 1: Google OAuth クライアントの作成

1. https://console.cloud.google.com/ にアクセス
2. 上部のプロジェクト選択 → **新しいプロジェクト**
   - プロジェクト名: `studygo-manual-private`（任意）
   - 作成
3. 左メニュー「**APIs & Services**」→「**OAuth consent screen**」
   - User Type: **External** を選択 → 作成
   - アプリ名: `スタディGO マニュアル`
   - ユーザーサポートメール: `s_kunimatsu@b-pt.jp`
   - デベロッパー連絡先情報: `s_kunimatsu@b-pt.jp`
   - 「保存して次へ」を最後まで進める
   - **Test users** の追加不要（本番公開前のテスト時のみ必要）
4. 左メニュー「**Credentials**」→「**+ CREATE CREDENTIALS**」→「**OAuth client ID**」
   - Application type: **Web application**
   - 名前: `studygo-manual-web`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `https://studygo-manual-private.vercel.app`（後で実URLが決まったら差し替え）
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://studygo-manual-private.vercel.app/api/auth/callback/google`
   - 作成
5. 表示される **Client ID** と **Client Secret** をコピー（後で環境変数に使用）
6. OAuth consent screenで「**アプリを公開**」ボタンを押す（押さないと指定ユーザー外は使えません。公開しても、アクセス許可はallowlist側で制限されます）

---

## ステップ 2: ローカルでの動作確認

### 2-1. 依存関係インストール

PowerShellまたはコマンドプロンプトで：

```powershell
cd "C:\Users\s_kun\OneDrive\デスクトップ\studygo eigyou\manual-vercel"
npm install
```

（数分かかります）

### 2-2. 環境変数ファイル作成

`.env.local.example` をコピーして `.env.local` を作成し、以下を設定：

```
GOOGLE_CLIENT_ID=（ステップ1-5でコピーしたClient ID）
GOOGLE_CLIENT_SECRET=（ステップ1-5でコピーしたClient Secret）
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=（以下コマンドで生成）
ALLOWED_EMAILS=benkyocafe.shinjuku@gmail.com,benkyo-cafe.sbp@b-pt.jp,s_kunimatsu@b-pt.jp,m_kondo@b-pt.jp
```

`NEXTAUTH_SECRET` の生成（ランダム文字列）：

```powershell
# PowerShellで以下を実行
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Max 256}))
```

### 2-3. 開発サーバ起動

```powershell
npm run dev
```

ブラウザで http://localhost:3000 を開き、Googleでログインして動作確認。

---

## ステップ 3: Vercel にデプロイ

### 3-1. GitHubリポジトリに push（推奨）

1. GitHubで新規リポジトリ作成（例: `studygo-manual-private`、**Private設定**）
2. ローカルで：

```powershell
cd "C:\Users\s_kun\OneDrive\デスクトップ\studygo eigyou\manual-vercel"
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<ユーザー名>/studygo-manual-private.git
git push -u origin main
```

### 3-2. Vercel にインポート

1. https://vercel.com/new にアクセス（GitHubログイン済み想定）
2. 作成したリポジトリを選択 → **Import**
3. Framework Preset: `Next.js`（自動検出されるはず）
4. **Environment Variables** を追加：

| Name | Value |
|---|---|
| `GOOGLE_CLIENT_ID` | Client ID |
| `GOOGLE_CLIENT_SECRET` | Client Secret |
| `NEXTAUTH_SECRET` | ランダム文字列（ローカルと別のでも可） |
| `NEXTAUTH_URL` | デプロイ後のURL（例: `https://studygo-manual-private.vercel.app`）※先にデプロイして確定させ、後から更新してもOK |
| `ALLOWED_EMAILS` | `benkyocafe.shinjuku@gmail.com,benkyo-cafe.sbp@b-pt.jp,s_kunimatsu@b-pt.jp,m_kondo@b-pt.jp` |

5. **Deploy** を押す
6. 1〜2分で完了。URLをメモ
7. `NEXTAUTH_URL` が仮のままなら、実URLに更新して再デプロイ
8. ステップ1-4で設定した Google OAuth の Authorized URI も、実URLに合わせて更新

### 3-3. 動作確認

- デプロイURLにアクセス → Googleログインを求められる
- 許可メアドでログイン → マニュアルが開く
- 許可外メアドでログイン → アクセス拒否画面

---

## 更新手順

マニュアル内容を変更する場合：

1. `public/` 配下のHTMLやCSSを編集
2. `git add . && git commit -m "更新内容" && git push`
3. Vercelが自動で再デプロイ（数分）

---

## アクセス許可ユーザーの追加・削除

1. Vercel ダッシュボード → プロジェクト → **Settings → Environment Variables**
2. `ALLOWED_EMAILS` を編集（カンマ区切り）
3. **Redeploy** ボタンで再デプロイ（環境変数は再デプロイで反映）

---

## トラブルシューティング

**Q: ログインしても「AccessDenied」になる**
→ `ALLOWED_EMAILS` に大文字が混ざっているか、メアド間違いの可能性。すべて小文字で正確に設定。

**Q: 「redirect_uri_mismatch」エラー**
→ Google Cloud Console の Authorized redirect URIs に現在のドメイン `/api/auth/callback/google` を追加。

**Q: 環境変数を変えたのに反映されない**
→ Vercelは環境変数を変更しても自動再デプロイされない。Deployments タブから Redeploy 必要。

---

## ファイル構成

```
manual-vercel/
├── app/
│   ├── layout.js          # 全ページ共通レイアウト
│   ├── page.js            # トップ(ログイン後 manual-easy.html にリダイレクト)
│   ├── signin/page.js     # ログイン画面
│   ├── denied/page.js     # アクセス拒否画面
│   └── api/auth/[...nextauth]/route.js  # NextAuth API
├── lib/
│   └── auth.js            # 認証設定(allowlist)
├── public/                # マニュアルHTML・画像一式
│   ├── manual-easy.html
│   ├── index.html
│   ├── images/
│   └── ...
├── middleware.js          # 全ルートの認証ガード
├── package.json
├── next.config.mjs
├── .env.local.example
└── README.md
```
