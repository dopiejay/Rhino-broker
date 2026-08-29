import { useInView } from "../hooks/useInView";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}) {
  const { ref, inView } = useInView();
  return (
    <Tag
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
