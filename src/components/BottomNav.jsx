export default function BottomNav({ active, navigate, offerCount = 0 }) {
  const items = [
    { id: 'home',        icon: '🏠', label: 'Home' },
    { id: 'listings',    icon: '📋', label: 'Listings' },
    { id: 'negotiation', icon: '💬', label: 'Offers', badge: offerCount },
    { id: 'profile',     icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="bottom-nav">
      {items.map(item => (
        <button
          key={item.id}
          className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => navigate(item.id === 'listings' || item.id === 'profile' ? 'home' : item.id)}
          style={{ position: 'relative' }}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label" style={{ color: active === item.id ? 'var(--green)' : undefined }}>
            {item.label}
          </span>
          {item.badge > 0 && (
            <span style={{
              position: 'absolute', top: 2, right: 10,
              background: 'var(--red)', color: 'white',
              borderRadius: '100px', fontSize: 10, fontWeight: 800,
              padding: '1px 5px', lineHeight: '14px',
            }}>
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
