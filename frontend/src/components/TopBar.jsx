import { Phone, Mail, Clock } from "lucide-react";
import { useSiteContent } from "../site/SiteContentContext";

export default function TopBar() {
  const { site } = useSiteContent();
  return (
    <div className="bg-navy-deep text-white/60 text-xs">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-10 flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Clock size={13} className="text-emerald-ink" />
            {site.hours}
          </span>
          <span className="flex items-center gap-2">
            <Mail size={13} className="text-emerald-ink" />
            <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
              {site.email}
            </a>
          </span>
          <span className="hidden lg:flex items-center gap-2 text-white/40">
            {site.address}, {site.city}
          </span>
        </div>
        
      </div>
    </div>
  );
}
