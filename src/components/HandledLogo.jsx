export function HandledMark({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical stem */}
      <rect x="10" y="6" width="14" height="68" rx="7" fill="#1C2B4A" />
      {/* Arch + right leg */}
      <path
        d="M17 40 C17 26 66 22 66 42 L66 68 C66 75 58 75 58 68 L58 44 C58 34 24 34 24 44"
        stroke="#1C2B4A" strokeWidth="14" strokeLinecap="round" fill="none"
      />
      {/* Green arrow */}
      <line x1="59" y1="65" x2="74" y2="50" stroke="#3DBE82" strokeWidth="8" strokeLinecap="round" />
      <polyline points="66,46 74,50 70,60" stroke="#3DBE82" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function HandledWordmark({ size = 28, light = false }) {
  const color = light ? '#FFFFFF' : '#1C2B4A';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <HandledMark size={size * 1.4} />
      <span style={{
        fontSize: size,
        fontWeight: 800,
        color,
        letterSpacing: '-0.5px',
        lineHeight: 1,
      }}>
        jessica's garage
      </span>
    </div>
  );
}

export function HandledLogoFull({ light = false }) {
  const color = light ? '#FFFFFF' : '#1C2B4A';
  const greenColor = '#3DBE82';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <HandledMark size={72} />
      <div style={{ fontSize: 38, fontWeight: 800, color, letterSpacing: '-1px', lineHeight: 1, textAlign: 'center' }}>
        jessica's<br />garage
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: light ? 'rgba(255,255,255,0.7)' : '#8896A5', letterSpacing: '2px', textTransform: 'uppercase' }}>
        WE LIST.{' '}
        <span style={{ color: greenColor }}>YOU RELAX.</span>
        {' '}YOU SELL.
      </div>
    </div>
  );
}
