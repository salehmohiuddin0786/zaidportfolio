/** Minimal inline brand marks (lucide no longer ships brand icons). */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function InstagramMark({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeMark({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="2" y="5" width="20" height="14" rx="4.5" />
      <path d="M10.5 9.2v5.6l4.6-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XMark({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 3.5l7.2 9.1L4.4 20.5h2.2l5.7-6.6 5 6.6H20L12.6 11 19 3.5h-2.2l-5.2 6-4.4-6z" />
    </svg>
  );
}