import styles from './SystemBar.module.css';

interface SystemBarProps {
  showDynamicIsland?: boolean;
  variant?: 'dark' | 'light';
}

export function SystemBar({
  showDynamicIsland = false,
  variant = 'dark',
}: SystemBarProps) {
  const color = variant === 'light' ? '#ffffff' : '#000000';

  return (
    <div className={styles.systemBar} style={{ color }} aria-hidden>
      <div className={styles.time}>9:41</div>
      {showDynamicIsland && <div className={styles.dynamicIsland} />}
      <div className={styles.levels}>
        {/* Cellular signal */}
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <rect x="0.5" y="7.5" width="3" height="4.5" rx="1" fill={color} />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill={color} />
          <rect x="9.5" y="3" width="3" height="9" rx="1" fill={color} />
          <rect x="14" y="0.5" width="3" height="11.5" rx="1" fill={color} />
        </svg>
        {/* Wi-Fi */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path
            d="M9 9.5C9.83 9.5 10.5 10.17 10.5 11C10.5 11.83 9.83 12.5 9 12.5C8.17 12.5 7.5 11.83 7.5 11C7.5 10.17 8.17 9.5 9 9.5Z"
            transform="translate(0 -0.5)"
            fill={color}
          />
          <path
            d="M5.6 7.4C7.48 5.65 10.52 5.65 12.4 7.4"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M3.1 4.9C6.36 1.85 11.64 1.85 14.9 4.9"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M0.8 2.5C5.33 -1.65 12.67 -1.65 17.2 2.5"
            transform="translate(0 1)"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        {/* Battery */}
        <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="24"
            height="12"
            rx="3.8"
            stroke={color}
            strokeOpacity="0.35"
          />
          <rect x="2.2" y="2.2" width="20.6" height="8.6" rx="2.2" fill={color} />
          <path
            d="M26 4.5V8.5C26.8 8.15 27.3 7.35 27.3 6.5C27.3 5.65 26.8 4.85 26 4.5Z"
            fill={color}
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
