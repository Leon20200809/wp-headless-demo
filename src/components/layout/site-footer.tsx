export function SiteFooter() {
  const current_year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <p className="text-center text-sm text-slate-500">
          &copy; {current_year} Headless WP Demo. Powered by WordPress REST API
          and Next.js.
        </p>
      </div>
    </footer>
  );
}