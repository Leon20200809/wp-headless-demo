type WpPost = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

/**
 * WordPress REST API から指定した投稿データを取得する。
 *
 * `.env.local` に定義した以下の環境変数を使用する。
 *
 * - WP_API_BASE_URL: WordPress REST API のベースURL
 * - WP_POST_ID: 取得したい投稿ID
 *
 * MVP段階では、投稿IDを固定して1記事だけ取得する。
 */
async function fetchWpPost(): Promise<WpPost> {
  const wp_api_base_url = process.env.WP_API_BASE_URL;
  const wp_post_id = process.env.WP_POST_ID;

  if (!wp_api_base_url) {
    throw new Error("WP_API_BASE_URL is not defined");
  }

  if (!wp_post_id) {
    throw new Error("WP_POST_ID is not defined");
  }

  const response = await fetch(`${wp_api_base_url}/posts/${wp_post_id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress post");
  }

  return response.json();
}

/**
 * WordPressから取得した投稿を表示するブログページ。
 *
 * Server Component として動作し、サーバー側で WordPress REST API から
 * 投稿データを取得してからHTMLを生成する。
 *
 * WordPress本文は `content.rendered` にHTML文字列として入っているため、
 * `dangerouslySetInnerHTML` を使って画面に出力する。
 */
export default async function BlogPage() {
  const post = await fetchWpPost();

  const formatted_date = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  return (
  <section className="bg-slate-950 px-6 py-12 text-slate-100">
    <article className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-10 shadow-2xl sm:px-10">
      <header className="mb-10 border-b border-slate-700 pb-8">
        <p className="mb-4 text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">
          WordPress Headless Article
        </p>

        <h1
          className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <p className="mt-5 text-sm text-slate-400">{formatted_date}</p>
      </header>

      <div
        className="
          [&_h2]:mt-12
          [&_h2]:border-l-4
          [&_h2]:border-cyan-400
          [&_h2]:pl-4
          [&_h2]:text-2xl
          [&_h2]:font-bold
          [&_h2]:text-white

          [&_h3]:mt-8
          [&_h3]:text-xl
          [&_h3]:font-bold
          [&_h3]:text-slate-100

          [&_p]:mt-5
          [&_p]:leading-8
          [&_p]:text-slate-300

          [&_strong]:font-bold
          [&_strong]:text-cyan-300

          [&_ul]:mt-5
          [&_ul]:space-y-2
          [&_ul]:pl-6

          [&_li]:list-disc
          [&_li]:leading-8
          [&_li]:text-slate-300

          [&_a]:text-cyan-300
          [&_a]:underline
          [&_a]:underline-offset-4

          [&_hr]:my-10
          [&_hr]:border-slate-700
        "
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  </section>
);
}
