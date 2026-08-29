import { MessageCircle, Phone } from "lucide-react";
import { useSiteContent } from "../site/SiteContentContext";

export default function FloatingActions() {
  const { site } = useSiteContent();
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={site.phoneHref}
        aria-label={`Call ${site.name} on ${site.phone}`}
        className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center shadow-lift hover:scale-105 transition-transform focus-ring"
      >
        <Phone size={19} />
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lift hover:scale-105 transition-transform focus-ring"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
