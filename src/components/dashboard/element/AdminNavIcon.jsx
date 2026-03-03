const iconStroke = "currentColor";

function IconBase({ className, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      stroke={iconStroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export default function AdminNavIcon({ icon = "flaticon-home", className = "" }) {
  switch (icon) {
    case "flaticon-user":
      return (
        <IconBase className={className}>
          <circle cx="12" cy="7.5" r="3.5" />
          <path d="M5 19c0-3.2 3.1-5 7-5s7 1.8 7 5" />
        </IconBase>
      );
    case "flaticon-briefcase":
      return (
        <IconBase className={className}>
          <rect x="3.5" y="7.5" width="17" height="11" rx="2" />
          <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5" />
          <path d="M3.5 12.5h17" />
        </IconBase>
      );
    case "flaticon-dollar":
      return (
        <IconBase className={className}>
          <path d="M12 4v16" />
          <path d="M16 7.5a3.8 3.8 0 0 0-3.6-2.2c-2 0-3.4 1-3.4 2.5 0 1.8 1.5 2.4 3.8 3 2.3.6 3.8 1.2 3.8 3 0 1.7-1.5 2.7-3.8 2.7a4.9 4.9 0 0 1-4.8-2.8" />
        </IconBase>
      );
    case "flaticon-web":
      return (
        <IconBase className={className}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.8 12h16.4" />
          <path d="M12 3.5c2.4 2.3 2.4 14.7 0 17" />
          <path d="M12 3.5c-2.4 2.3-2.4 14.7 0 17" />
        </IconBase>
      );
    case "flaticon-logout":
      return (
        <IconBase className={className}>
          <path d="M14 4h2.5A2.5 2.5 0 0 1 19 6.5v11a2.5 2.5 0 0 1-2.5 2.5H14" />
          <path d="M10 12h9" />
          <path d="M16 8l4 4-4 4" />
          <path d="M10 4H7.5A2.5 2.5 0 0 0 5 6.5v11A2.5 2.5 0 0 0 7.5 20H10" />
        </IconBase>
      );
    case "flaticon-home":
    default:
      return (
        <IconBase className={className}>
          <path d="M4 11.5 12 5l8 6.5" />
          <path d="M6 10.8V19h12v-8.2" />
          <path d="M10 19v-4.5h4V19" />
        </IconBase>
      );
  }
}
