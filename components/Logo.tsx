interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Sehha-GIS mark — a stylized red-crescent + map-pin glyph in MoH navy.
 * Government-feel, not SaaS-feel.
 */
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill="#0F4C81" />
      {/* map-pin outline */}
      <path
        d="M16 7c-3.6 0-6.5 2.9-6.5 6.5 0 4.6 6.5 11 6.5 11s6.5-6.4 6.5-11C22.5 9.9 19.6 7 16 7Z"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* medical cross inside the pin */}
      <path
        d="M16 10.5v6M13 13.5h6"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* accent dot */}
      <circle cx="16" cy="13.5" r="0.9" fill="#10B981" />
    </svg>
  );
}
