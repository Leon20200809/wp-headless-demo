import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-6">
        <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">
          Headless WordPress Demo
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          WordPressの記事をNext.jsで表示するデモ
        </h1>

        <p className="text-lg leading-8 text-slate-700">
          WordPressをCMSとして使い、REST APIから投稿データを取得して、
          Next.js側で表示する最小構成のデモです。
        </p>

        <div>
          <Link
            href="/blog"
            className="inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
          >
            記事を見る
          </Link>
        </div>
      </div>
    </section>
  );
}