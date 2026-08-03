import { ImageIcon } from "lucide-react";

// Reusable placeholder for spots where real photography should go.
// Dashed border + label so it's obvious this is a "drop an image here" slot,
// not a finished design element. `dark` variant is for use on navy backgrounds.
export default function ImagePlaceholder({ label, aspect = "aspect-[4/3]", dark = false, className = "" }) {
  return (
    <div
      className={`${aspect} w-full rounded-sm border-2 border-dashed flex flex-col items-center justify-center gap-2 px-6 text-center ${
        dark ? "border-white/25 bg-white/5" : "border-navy/20 bg-navy/[0.03]"
      } ${className}`}
    >
      <ImageIcon size={26} className={dark ? "text-white/40" : "text-navy/30"} strokeWidth={1.5} />
      <p className={`text-xs font-medium leading-snug ${dark ? "text-white/50" : "text-ink/45"}`}>
        {label}
      </p>
    </div>
  );
}
