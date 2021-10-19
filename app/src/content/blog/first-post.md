---
title: "このサイトの技術スタック"
abstract: "Astro・TypeScript・Tailwind CSS を中心に、このサイトの構成をまとめました。フロントエンドフレームワークの選定理由から、ブログ機能の実装・GitHub Pages へのデプロイまで解説します。"
date: 2026-03-15
tags: ["Astro", "TypeScript", "Tailwind CSS", "GitHub Pages"]
ogp: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=600&h=400&fit=crop"
---

## 概要

このサイトはポートフォリオ兼ブログとして運用しています。シンプルかつ高速な構成を目指し、以下の技術スタックを採用しました。

## フレームワーク: Astro

[Astro](https://astro.build) v5 を採用しています。

Astro の最大の特徴は **Islands Architecture** です。デフォルトではほぼすべてのページを静的 HTML として出力するため、JavaScript の送信量を最小限に抑えられます。ポートフォリオのような静的コンテンツ中心のサイトとの相性が非常に良く、選定しました。

## 言語: TypeScript

Astro の設定は `astro/tsconfigs/strict` を継承した TypeScript strict モードで記述しています。コンポーネントの Props 型定義や Content Collections のスキーマ定義など、型の恩恵を全体的に受けられる構成になっています。

## スタイリング: Tailwind CSS

[Tailwind CSS](https://tailwindcss.com) v3 をユーティリティクラスとして使用しています。

- **ダークモード対応**: `dark:` プレフィックスで各コンポーネントに対応
- **レスポンシブ対応**: ブレークポイントプレフィックスで画面幅に応じたレイアウト
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)**: ブログ記事の Markdown 本文を美しく整形するプラグインとして採用

## ブログ: Content Collections

記事は `src/content/blog/` ディレクトリに Markdown ファイルとして置くだけで自動的に公開されます。Astro の **Content Collections** 機能により、frontmatter のスキーマを TypeScript で定義し、型安全なデータアクセスが可能です。

```ts
// src/content.config.ts
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    // ...
  }),
});
```

## QR コード: qrcode

Twitter カードに QR コードを表示するため、[qrcode](https://www.npmjs.com/package/qrcode) ライブラリを使用しています。ビルド時に PNG の Data URI として生成することで、Tailwind の CSS リセットによる SVG の意図しない崩れを回避しています。

## ホスティング: GitHub Pages + GitHub Actions

GitHub Actions を使ってメインブランチへの push 時に自動ビルド・デプロイを行っています。

```
push to master
  → astro build
  → GitHub Pages にデプロイ
```

静的サイトジェネレータである Astro との相性が良く、追加コストなしで運用できます。

## まとめ

| 項目 | 採用技術 |
|---|---|
| フレームワーク | Astro v5 |
| 言語 | TypeScript (strict) |
| スタイリング | Tailwind CSS v3 |
| ブログ | Content Collections (Markdown) |
| QR コード生成 | qrcode |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |
