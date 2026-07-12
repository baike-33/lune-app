/* Status bar light wrapper for direct screens */
export function PhoneStatus({ time = '9:41', dark = true, color }) {
  const c = color || (dark ? 'rgba(255,255,255,0.94)' : '#000');
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px 8px', fontSize: 14, fontWeight: 600, color: c, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <span>{time}</span>
      <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', fontSize: 12 }}>
        <span>•••</span><span>📶</span><span style={{ fontSize: 11 }}>100</span>
      </span>
    </div>
  );
}

/* Bottom home indicator */
export function HomeBar({ color = 'rgba(255,255,255,0.5)' }) {
  return <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: color, zIndex: 5 }} />;
}
