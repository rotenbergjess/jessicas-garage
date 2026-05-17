import { useEffect, useState } from 'react';

const MARKET_INFO = {
  facebook:  { label: 'Facebook Marketplace', emoji: '👥', msg: 'Telling Facebook about your treasure...' },
  ebay:      { label: 'eBay',                 emoji: '🛒', msg: 'eBay is about to be blessed...' },
  offerup:   { label: 'OfferUp',               emoji: '📲', msg: 'OfferUp buyers incoming...' },
  craigslist:{ label: 'Craigslist',            emoji: '📰', msg: 'Craigslist getting the memo...' },
  poshmark:  { label: 'Poshmark',              emoji: '👗', msg: 'Poshmark runway, activated...' },
  mercari:   { label: 'Mercari',               emoji: '📦', msg: 'Mercari listing, loading...' },
};

export default function Publishing({ state, navigate }) {
  const { marketplaces, listing } = state;
  const activeMarkets = Object.entries(marketplaces).filter(([, v]) => v).map(([k]) => k);
  const markets = activeMarkets.length > 0 ? activeMarkets : ['facebook', 'offerup'];

  const [statuses, setStatuses] = useState(
    Object.fromEntries(markets.map(m => [m, 'pending']))
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    const publishNext = () => {
      if (idx >= markets.length) {
        setTimeout(() => setDone(true), 400);
        return;
      }
      const m = markets[idx];
      setStatuses(p => ({ ...p, [m]: 'loading' }));
      setTimeout(() => {
        setStatuses(p => ({ ...p, [m]: 'done' }));
        idx++;
        setTimeout(publishNext, 300);
      }, 900 + Math.random() * 500);
    };
    const t = setTimeout(publishNext, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => navigate('success'), 1400);
      return () => clearTimeout(t);
    }
  }, [done]);

  const item = listing.detectedItems.find(i => listing.selectedItems?.includes(i.id)) ?? listing.detectedItems?.[0];
  const price = listing.finalPrice ?? item?.fastPrice ?? 0;

  return (
    <div style={{
      height: '100dvh',
      background: 'linear-gradient(160deg, #1C2B4A 0%, #1a3d6b 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px',
    }}>
      {!done ? (
        <>
          <div style={{ fontSize: 56, marginBottom: 16, animation: 'pulse 1.2s ease infinite' }}>📡</div>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: 8 }}>Going Live!</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: 32 }}>
            Broadcasting your listing everywhere at once...
          </p>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {markets.map(m => {
              const info = MARKET_INFO[m] ?? { label: m, emoji: '🛒', msg: 'Listing...' };
              const status = statuses[m];
              return (
                <div key={m} style={{
                  background: status === 'done' ? 'rgba(61,190,130,0.15)' : status === 'loading' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${status === 'done' ? 'rgba(61,190,130,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 16, padding: '14px 18px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  transition: 'all 0.3s',
                }}>
                  <span style={{ fontSize: 24 }}>{info.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: 14 }}>{info.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                      {status === 'done' ? 'Live and running! 🟢' : status === 'loading' ? info.msg : 'Queued...'}
                    </div>
                  </div>
                  <div>
                    {status === 'done' && <span style={{ color: 'var(--green)', fontSize: 22 }}>✓</span>}
                    {status === 'loading' && (
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)', borderTopColor: 'var(--green)', animation: 'spin 0.7s linear infinite' }} />
                    )}
                    {status === 'pending' && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>○</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
          <div style={{ fontSize: 72, marginBottom: 16, animation: 'bounce 0.6s ease' }}>🎉</div>
          <h1 style={{ color: 'white', fontSize: 32, marginBottom: 8 }}>IT'S LISTED!</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16 }}>
            Listed on {markets.length} marketplace{markets.length > 1 ? 's' : ''} at ${price} 🔥
          </p>
          <p style={{ color: 'var(--green)', fontWeight: 700, fontSize: 14, marginTop: 12 }}>
            AI negotiator is now on duty 24/7...
          </p>
        </div>
      )}
    </div>
  );
}
