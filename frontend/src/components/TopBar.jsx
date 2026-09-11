import { Mail, Clock, MapPin, Phone } from "lucide-react";
import { useSiteContent } from "../site/SiteContentContext";

export default function TopBar() {
  const { site } = useSiteContent();
  return (
    <div className="bg-navy-deep text-white/70 text-xs">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-11 flex items-center justify-between gap-6">
        <div className="flex items-center gap-5 sm:gap-7">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 hover:text-white transition-colors focus-ring rounded"
          >
            <span className="hidden sm:flex items-center gap-2">
              <Phone size={13} className="text-gold" />
              {site.phone}
            </span>
            <span className="sm:hidden flex items-center gap-2">
              <Phone size={13} className="text-gold" />
              Call Us
            </span>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hidden sm:flex items-center gap-2 hover:text-white transition-colors focus-ring rounded"
          >
            <Mail size={13} className="text-gold" />
            {site.email}
          </a>
        </div>
        <div className="flex items-center gap-5 sm:gap-7">
          <span className="hidden md:flex items-center gap-2">
            <MapPin size={13} className="text-gold" />
            {site.address}, {site.city}
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <Clock size={13} className="text-gold" />
            {site.hours}
          </span>
        </div>
      </div>
    </div>
  );
}