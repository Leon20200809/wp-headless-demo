import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Headless WP Demo
        </Link>

        <nav aria-label="メインナビゲーション">
          <ul className="flex items-center gap-4 text-sm font-medium">
            <li>
              <Link href="/" className="text-slate-700 hover:text-slate-950">
                Top
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-slate-700 hover:text-slate-950">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}