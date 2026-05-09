# Headless WordPress Demo

WordPressをヘッドレスCMSとして利用し、WordPress REST APIから取得した投稿データをNext.jsで表示するMVPデモです。

既存のWordPress資産を活かしながら、Next.jsで表示部分を分離する構成には実務需要があると考え、Headless WordPressの検証用プロジェクトとして作成しました。

## 使用技術

- Next.js
- React
- TypeScript
- Tailwind CSS
- WordPress REST API
- Vercel

## 実装内容

- WordPress REST APIから投稿データを取得
- Next.jsのServer Componentで記事ページを表示
- `layout.tsx` による共通ヘッダー・フッターの実装
- Tailwind CSSによる記事本文の装飾
- WordPressから返るHTML文字列を `dangerouslySetInnerHTML` で表示
- `.env.local` によるAPI URLと投稿IDの管理

## WordPress REST APIの扱い

WordPress REST APIでは、投稿タイトルや本文が以下のようなHTML文字列として返ります。

- `title.rendered`
- `content.rendered`

そのため、Next.js側では `dangerouslySetInnerHTML` を使って、WordPress本文をHTMLとして描画しています。

また、WordPress本文内の `h2`、`p`、`ul`、`li` などには直接 `className` を付与できないため、親要素にTailwind CSSの任意セレクタを指定して装飾しています。

例：

`[&_h2]:text-2xl`  
`[&_p]:leading-8`  
`[&_li]:list-disc`

これは「この要素の中にある h2 / p / li に対してTailwindのスタイルを適用する」という意味です。

## 注意点

`dangerouslySetInnerHTML` はHTML文字列をそのまま描画するため、XSSリスクに注意が必要です。

今回のMVPでは、自分で管理しているWordPressの公開済み投稿のみを表示対象としているため使用しています。

実務でユーザー投稿や外部入力を扱う場合は、サニタイズ処理や表示対象の制限を検討する必要があります。

## デプロイ時の注意点

Vercelのビルド環境は海外リージョンで実行される場合があります。

WordPress側で国外からのREST APIアクセス制限を有効にしていると、ローカル環境では取得できても、Vercelのビルド時にWordPress REST APIへのアクセスが失敗することがあります。

今回のMVPでは、公開済み投稿を取得するため、REST APIアクセス制限を解除してVercelから取得できるようにしました。

管理画面、XML-RPC、ログイン試行制限などは不要なため、引き続き制限を有効にしています。

## 学習・検証ポイント

このプロジェクトでは、以下を検証しました。

- WordPressをCMSとして使い、Next.js側で表示する構成
- Server Componentで外部APIからデータ取得する流れ
- 環境変数によるAPI URL管理
- WordPress本文HTMLの表示方法
- Tailwind CSSでCMS由来のHTMLを装飾する方法
- Headless WordPress構成のMVP実装

## 今後の拡張案

- 投稿一覧ページの作成
- slugを使った記事詳細ページの動的ルーティング
- アイキャッチ画像の表示
- カテゴリー・タグ表示
- OGP設定
- ISR / revalidate の調整
- サニタイズ処理の検討