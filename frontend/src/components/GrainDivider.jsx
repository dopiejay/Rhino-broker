// Signature element: a wood-grain ring line, standing in for the generic
// hairline rule. Echoes both the company's namesake material and the idea
// of years/rings of experience -- used sparingly, only between major sections.
export default function GrainDivider({ flip = false, className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className={`w-full h-6 md:h-8 ${flip ? "scale-y-[-1]" : ""}`}
      >
        <path
          d="M0,20 C150,5 300,35 450,20 C600,5 750,35 900,20 C1000,10 1100,30 1200,20"
          fill="none"
          stroke="#B8874A"
          strokeWidth="1"
          opacity="0.5"
        />
        <path
          d="M0,24 C150,12 300,32 450,24 C600,14 750,30 900,24 C1000,16 1100,28 1200,24"
          fill="none"
          stroke="#4F8F52"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
