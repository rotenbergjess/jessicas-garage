import BottomNav from '../components/BottomNav';

const MARKET_LABELS = {
  facebook: 'FB', ebay: 'eBay', offerup: 'OU',
  craigslist: 'CL', poshmark: 'PM', mercari: 'MC',
};

export default function Home({ state, navigate }) {
  const { profile, stats, listings, negotiations } = state;
  const name = profile.name || 'there';
  const pendingOffers = negotiations.filter(n => n.status !== 'agreed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <div className="gradient-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
              👋 Hey {name}!
            </p>
            <h2 style={{ color: 'white', fontSize: 22 }}>It's in the <span style={{ color: 'var(--green)' }}>garage.</span></h2>
          </div>
          <div className="avatar" style={{ width: 44, height: 44, fontSize: 16, background: 'rgba(255,255,255,0.15)', color: 'white' }}>
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10, marginTop: 20, background: 'rgba(255,255,255,0.08)',
          borderRadius: 16, padding: '14px 12px',
        }}>
          {[
            { label: 'Sold', value: stats.sold, emoji: '✅' },
            { label: 'Active', value: stats.active, emoji: '📋' },
            { label: 'Rating', value: stats.rating + '★', emoji: '⭐' },
            { label: 'Earned', value: '$' + stats.earnings, emoji: '💵' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'white' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="screen" style={{ padding: '20px 16px 100px' }}>

        {/* AI Negotiations alert */}
        {negotiations.length > 0 && (
          <button onClick={() => navigate('negotiation')}
            style={{
              width: '100%', background: 'var(--green-light)', border: '2px solid var(--green)',
              borderRadius: 18, padding: '14px 16px', cursor: 'pointer', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            }}>
            <span style={{ fontSize: 28 }}>🤖</span>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>
                AI is negotiating for you!
              </div>
              <div style={{ fontSize: 13, color: 'var(--green-dark)', marginTop: 2 }}>
                {negotiations.length} active deal{negotiations.length > 1 ? 's' : ''} — tap to review →
              </div>
            </div>
          </button>
        )}

        {/* Active Listings */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3>Active Listings</h3>
          <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 700 }}>{listings.length} live</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {listings.map(l => (
            <div key={l.id} className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, background: 'var(--gray-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
                }}>
                  {l.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {l.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ fontWeight: 800, color: 'var(--green)', fontSize: 16 }}>${l.price}</span>
                    <span className={`badge ${l.status === 'negotiating' ? 'badge-orange' : 'badge-green'}`}>
                      {l.status === 'negotiating' ? '🔥 Offers In' : '● Live'}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--gray)' }}>👁 {l.views}</div>
                  <div style={{ fontSize: 13, color: l.offers > 0 ? 'var(--orange)' : 'var(--gray)', fontWeight: l.offers > 0 ? 700 : 400 }}>
                    {l.offers > 0 ? `💬 ${l.offers}` : '—'}
                  </div>
                </div>
              </div>
              {/* Marketplace tags */}
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {l.markets.map(m => (
                  <span key={m} style={{
                    fontSize: 11, fontWeight: 700, background: 'var(--gray-light)',
                    color: 'var(--gray-dark)', borderRadius: 6, padding: '2px 7px',
                  }}>
                    {MARKET_LABELS[m] || m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="card">
          <h3 style={{ marginBottom: 14 }}>How Jessica's Garage works ✨</h3>
          {[
            { e: '📷', t: 'Snap a photo'         },
            { e: '🤖', t: 'AI does everything'    },
            { e: '💬', t: 'We negotiate for you'  },
            { e: '💰', t: 'You collect the cash'  },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 3 ? 10 : 0 }}>
              <span style={{ fontSize: 22 }}>{s.e}</span>
              <span style={{ fontSize: 14, color: 'var(--gray-dark)', fontWeight: 600 }}>{s.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="fab" onClick={() => navigate('camera')} style={{ position: 'absolute' }}>
        📷 List Something
      </button>

      <BottomNav active="home" navigate={navigate} offerCount={pendingOffers} />
    </div>
  );
}
