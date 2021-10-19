# ヤンのページ

Astro + Tailwind CSS で構築された個人ポートフォリオ & ブログサイトです。

---

## 目次

- [開発環境](#開発環境)
- [デプロイ](#デプロイ)
- [プロジェクト構造](#プロジェクト構造)
- [設定ファイル一覧](#設定ファイル一覧)
- [トップページのカスタマイズ](#トップページのカスタマイズ)
- [ブログ記事の管理](#ブログ記事の管理)
- [ナビゲーション](#ナビゲーション)
- [SNS リダイレクト](#sns-リダイレクト)
- [テーマ・カラー設定](#テーマカラー設定)
- [コンポーネント一覧](#コンポーネント一覧)

---

## 開発環境

### 前提条件

- Node.js 22+
- Yarn 1.x

### Dev Container（推奨）

`.devcontainer/devcontainer.json` で設定済みです。VS Code の **Reopen in Container** で起動すると：

1. `yarn install` が自動で実行される（`postCreateCommand`）
2. `yarn dev --host 0.0.0.0` が自動で起動する（`postStartCommand`）
3. ポート **4321** が自動フォワードされ、ブラウザでアクセス可能

Dev Container の設定を変更するには：
- **ファイル**: `.devcontainer/devcontainer.json`
- **Docker イメージ**: `.devcontainer/Dockerfile`（Node.js 22 ベース）

### コマンド一覧

すべて `app/` ディレクトリで実行します。

| コマンド | 説明 |
|---|---|
| `yarn install` | 依存関係のインストール |
| `yarn dev` | 開発サーバー起動（http://localhost:4321） |
| `yarn build` | 本番ビルド（`dist/` に出力） |
| `yarn preview` | ビルド結果のプレビュー |

---

## デプロイ

`master` ブランチへの push で GitHub Actions が自動的にビルド & GitHub Pages へデプロイします。

- **ワークフロー**: `.github/workflows/deploy.yml`
- **公開 URL**: https://yangniao23.github.io/
- **手動実行**: GitHub の Actions タブから `workflow_dispatch` で手動トリガー可能

GitHub Pages を有効にするには、リポジトリの **Settings → Pages → Source** を **"GitHub Actions"** に設定してください。

---

## プロジェクト構造

```
app/
├── astro.config.mjs          # Astro 設定
├── tailwind.config.mjs        # Tailwind CSS 設定
├── tsconfig.json              # TypeScript 設定
├── package.json               # 依存関係 & スクリプト
├── public/                    # 静的アセット（そのまま配信）
│   ├── favicon.svg
│   └── icon.png               # プロフィールアイコン
├── src/
│   ├── consts.ts              # 共通定数（POSTS_PER_PAGE など）
│   ├── content.config.ts      # Content Collections スキーマ定義
│   ├── layouts/
│   │   └── Layout.astro       # 共通レイアウト（<html>, <head>, ダークモード）
│   ├── components/            # 再利用コンポーネント
│   │   ├── Header.astro       # グローバルヘッダー & ナビゲーション
│   │   ├── ThemeToggle.astro  # ダークモード切り替えボタン
│   │   ├── Section.astro      # セクション共通ラッパー
│   │   ├── Card.astro         # 汎用カード
│   │   ├── CardGrid.astro     # カードグリッドレイアウト
│   │   ├── ExpandableCard.astro  # 開閉式カード
│   │   ├── ProfileItem.astro  # プロフィール項目（ラベル + 値）
│   │   ├── BlogPostCard.astro # ブログ記事カード（OGP+タイトル+abstract）
│   │   ├── BlogListSection.astro # ブログ一覧セクション（タグフィルタ+ソート+ページネーション）
│   │   └── Pagination.astro   # ページネーション UI
│   ├── content/
│   │   └── blog/              # ブログ記事（Markdown）
│   │       ├── first-post.md
│   │       ├── astro-blog.md
│   │       └── ...
│   └── pages/                 # ページルーティング
│       ├── index.astro                    # トップページ
│       ├── blog/
│       │   ├── [...page].astro            # ブログ一覧（ページネーション）
│       │   ├── [...slug].astro            # ブログ記事詳細
│       │   └── tag/[tag]/[...page].astro  # タグ別一覧（ページネーション）
│       └── sns/
│           ├── twitter.astro  # Twitter へリダイレクト
│           ├── github.astro   # GitHub へリダイレクト
│           └── qiita.astro    # Qiita へリダイレクト
```

---

## 設定ファイル一覧

| ファイル | 用途 | 主な設定項目 |
|---|---|---|
| `app/astro.config.mjs` | Astro 本体 | `site`（公開 URL）、インテグレーション（Tailwind） |
| `app/tailwind.config.mjs` | Tailwind CSS | カラーパレット、フォント、プラグイン |
| `app/tsconfig.json` | TypeScript | `astro/tsconfigs/strict` を継承 |
| `app/package.json` | 依存関係 & スクリプト | `dev`, `build`, `preview` |
| `app/src/consts.ts` | 共通定数 | `POSTS_PER_PAGE`（ブログ1ページあたりの件数） |
| `app/src/content.config.ts` | Content Collections | ブログ記事の frontmatter スキーマ |
| `.devcontainer/devcontainer.json` | Dev Container | ポート、自動コマンド、拡張機能 |
| `.devcontainer/Dockerfile` | Docker イメージ | ベースイメージ（Node.js 22） |

---

## トップページのカスタマイズ

トップページは `app/src/pages/index.astro` で管理されています。以下のセクションがあります。

### ヒーローセクション

ページ最上部のグラデーション帯。サイトタイトルを変更するには：

```astro
<!-- app/src/pages/index.astro 26行目付近 -->
<h1 class="text-4xl md:text-6xl font-bold mb-6">
    ヤンのページ    <!-- ← ここを変更 -->
</h1>
```

### About Me セクション（`id="about"`）

プロフィール情報を変更するには `index.astro` 内の `<ProfileItem>` コンポーネントを編集します：

```astro
<ProfileItem label="名前">
    湯嶋 皓騎 (YUSHIMA Kouki)    <!-- ← 名前 -->
</ProfileItem>
<ProfileItem label="年齢"> 21歳 </ProfileItem>    <!-- ← 年齢 -->
<ProfileItem label="所属">
    <!-- ← 所属を自由に記述 -->
</ProfileItem>
```

プロフィールアイコンを変更するには `public/icon.png` を差し替えます。

### Follow Me セクション

SNS アカウントのリンクと表示名を設定：

```astro
<Card
    title="Twitter"              <!-- 表示名 -->
    description="@yangniao2323"  <!-- アカウント名 -->
    href="/sns/twitter"          <!-- リダイレクト先（後述） -->
/>
```

### Skills & Technologies セクション

`<ExpandableCard>` 内で `<Card>` と詳細リストを編集します。カードの追加・削除は `<CardGrid>` 内で行います。

### Contact セクション（`id="contact"`）

メールアドレスを変更するには：

```astro
<!-- app/src/pages/index.astro 内の Contact セクション -->
<a href="mailto:contact@example.com" ...>    <!-- ← メールアドレスを変更 -->
```

---

## ブログ記事の管理

### 記事の追加

`app/src/content/blog/` ディレクトリに Markdown ファイルを追加するだけで公開されます。

```markdown
---
title: "記事タイトル"                          # 必須
abstract: "ブログ一覧に表示される要約テキスト"    # 任意（デフォルト: ""）
date: 2026-02-26                              # 必須（日付）
tags: ["タグ1", "タグ2"]                       # 任意（デフォルト: []）
ogp: "https://example.com/image.jpg"          # 任意（一覧カードの左側画像 URL）
draft: true                                   # 任意（true で非公開、デフォルト: false）
---

本文を Markdown で記述します。
```

### frontmatter スキーマ

スキーマの定義・変更は `app/src/content.config.ts` で行います：

| フィールド | 型 | 必須 | 説明 |
|---|---|---|---|
| `title` | `string` | Yes | 記事タイトル |
| `abstract` | `string` | No | 一覧ページに表示する要約テキスト |
| `date` | `Date` | Yes | 公開日 |
| `tags` | `string[]` | No | タグ（タグフィルタに使用） |
| `ogp` | `string` | No | OGP 画像 URL（一覧カードの左側に表示） |
| `draft` | `boolean` | No | `true` にすると一覧・ビルドから除外 |

### ページネーション

1ページあたりの表示件数は `app/src/consts.ts` で管理しています：

```typescript
// app/src/consts.ts
export const POSTS_PER_PAGE = 20;  // ← この数値を変更
```

この値は以下の2ファイルから参照されています：
- `app/src/pages/blog/[...page].astro` — ブログ一覧
- `app/src/pages/blog/tag/[tag]/[...page].astro` — タグ別一覧

### URL 構造

ブログ記事の URL は `post.id`（ファイルパスから拡張子を除いたもの）をそのまま使用します。

| ファイル配置 | URL |
|---|---|
| `blog/first-post.md` | `/blog/first-post` |
| `blog/kamakura-3/content.md` | `/blog/kamakura-3/content` |

| URL | ページ |
|---|---|
| `/blog/` | ブログ一覧（1ページ目） |
| `/blog/2/` | ブログ一覧（2ページ目以降） |
| `/blog/tag/Astro/` | 「Astro」タグの記事一覧 |
| `/blog/tag/Astro/2/` | 「Astro」タグの2ページ目 |
| `/blog/first-post` | 個別記事（フラットファイル） |
| `/blog/kamakura-3/content` | 個別記事（ディレクトリ構成） |

### ソート・タグフィルタ

ブログ一覧には以下の機能が組み込まれています：

- **タグフィルタ**: 上部のタグボタンをクリックで絞り込み。実装は静的ページ生成（`tag/[tag]/[...page].astro`）
- **ソート切り替え**: 「新しい順 ↓ / 古い順 ↑」ボタンでページ内の表示順を反転（クライアント JS）

---

## ナビゲーション

ヘッダーのナビゲーション項目を変更するには `app/src/components/Header.astro` の `navItems` 配列を編集します：

```astro
const navItems = [
    { name: "Top", href: "/" },
    { name: "About", href: "/#about" },      // トップページ内のセクションへアンカー
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },   // トップページ内のセクションへアンカー
];
```

ヘッダー左上のサイト名（「ヤンのページ」）も同ファイルで変更できます。

---

## SNS リダイレクト

`app/src/pages/sns/` に各 SNS へのリダイレクトページがあります。`<meta http-equiv="refresh">` による静的リダイレクトで実装されています。

| ファイル | リダイレクト先 |
|---|---|
| `sns/twitter.astro` | `https://twitter.com/yangniao2323` |
| `sns/github.astro` | `https://github.com/yangniao23` |
| `sns/qiita.astro` | `https://qiita.com/yangniao23` |

URL を変更するには各ファイル冒頭の `url` 変数を編集します：

```astro
---
const url = "https://twitter.com/yangniao2323";  // ← ここを変更
---
```

新しい SNS を追加する場合は `sns/` 内に同様のファイルを作成し、`index.astro` の Follow Me セクションにカードを追加します。

---

## テーマ・カラー設定

### ダークモード

- **切り替え**: 右上の `ThemeToggle` ボタン（`app/src/components/ThemeToggle.astro`）
- **初期判定**: OS のカラースキーム → `localStorage` の保存値の順（`app/src/layouts/Layout.astro` のインラインスクリプト）
- **方式**: Tailwind の `darkMode: 'class'` を使用。`<html>` に `dark` クラスを付与

### カラーパレット

`app/tailwind.config.mjs` の `theme.extend.colors` で定義：

```javascript
colors: {
    primary: {    // メインカラー（青紫系）
        50:  '#f0f4ff',
        // ...
        600: '#5a67d8',  // ← ボタン・リンクの基本色
        // ...
    },
    secondary: {  // サブカラー（紫系）
        // ...
        600: '#9333ea',  // ← グラデーションなどに使用
        // ...
    },
}
```

サイト全体のカラーを変更するにはこの2つのカラーパレットを差し替えます。Tailwind のクラス内では `text-primary-600`, `bg-secondary-500` のように参照されます。

### フォント

```javascript
// app/tailwind.config.mjs
fontFamily: {
    sans: ['Inter', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', 'sans-serif'],
},
```

### Typography（ブログ本文）

ブログ記事本文のスタイルは Tailwind の `@tailwindcss/typography` プラグインが適用されています。  
カスタマイズは `app/src/pages/blog/[...slug].astro` 内の `prose` クラスで行います：

```astro
<div class="prose prose-lg dark:prose-invert max-w-none
    prose-headings:text-gray-800 dark:prose-headings:text-white
    prose-a:text-primary-600 dark:prose-a:text-primary-400
    prose-code:text-primary-700 dark:prose-code:text-primary-300
    prose-pre:bg-gray-800 dark:prose-pre:bg-gray-950">
```

---

## コンポーネント一覧

| コンポーネント | Props | 用途 |
|---|---|---|
| `Layout.astro` | `title?: string` | 共通 HTML レイアウト。`title` でページタイトルを設定（デフォルト: `"ヤンのページ"`） |
| `Header.astro` | — | グローバルヘッダー。ナビゲーション項目は内部の `navItems` で管理 |
| `ThemeToggle.astro` | — | ダークモード切り替えボタン（固定位置 右上） |
| `Section.astro` | `title`, `backgroundClass?`, `id?` | セクションラッパー。タイトルの中央表示 + 背景 + アンカー ID |
| `Card.astro` | `icon?`, `title`, `description`, `href?`, `target?` | 汎用カード。アイコンは slot `icon` でもカスタマイズ可能 |
| `CardGrid.astro` | `columns?: 2\|3\|4`, `gap?` | レスポンシブグリッドレイアウト |
| `ExpandableCard.astro` | `defaultOpen?`, `containerClass?`, `triggerClass?`, `panelClass?` | 開閉式カード。slot `trigger` でトリガー部、デフォルト slot で展開コンテンツ |
| `ProfileItem.astro` | `label` | プロフィール表示用（ラベル + slot コンテンツ） |
| `BlogPostCard.astro` | `title`, `abstract`, `date`, `href`, `ogp?`, `tags?` | ブログ一覧用カード（左: OGP 画像、右: タイトル + 要約） |
| `BlogListSection.astro` | `posts`, `allTags`, `activeTag?`, `subtitle?`, `currentPage`, `lastPage`, `baseUrl` | ブログ一覧のメインセクション（タグフィルタ + ソート + 記事リスト + ページネーション） |
| `Pagination.astro` | `currentPage`, `lastPage`, `baseUrl` | ページネーション UI（前へ / ページ番号 / 次へ） |

---

## ライセンス

（未設定）
