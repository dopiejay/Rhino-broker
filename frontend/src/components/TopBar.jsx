import { useSiteContent } from "../site/SiteContentContext";

export default function TopBar() {
  const { site } = useSiteContent();
  return (
    <div className="bg-charcoal text-white/70 text-xs">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-11 flex items-center justify-between gap-6">
        <a
          href={site.phoneHref}
          className="hover:text-white transition-colors focus-ring rounded"
        >
          {site.phone}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="hover:text-white transition-colors focus-ring rounded"
        >
          {site.email}
        </a>
      </div>
    </div>
  );
}