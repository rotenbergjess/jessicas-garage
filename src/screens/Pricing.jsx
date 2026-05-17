import { useState } from 'react';

const COMPS = [
  { name: 'Same model, Good condition', price: 210, distance: '2.1 mi', sold: true },
  { name: 'Similar — Fair condition',   price: 145, distance: '5.4 mi', sold: true },
  { name: 'Currently listed nearby',    price: 240, distance: '1.8 mi', sold: false },
  { name: 'Sold on eBay (avg last 30d)',price: 195, distance: 'Online',  sold: true },
];

export default function Pricing({ state, updateListing, navigate }) {
  const { listing } = state;
  const item = listing.detectedItems.find(i => listing.selectedItems.includes(i.id)) ?? listing.detectedItems[0];
  const fast = item?.fastPrice ?? 80;
  const max  = item?.maxPrice  ?? 130;

  const [strategy, setStrategy] = useState(state.pricingPreference === 'fast' ? 'fast' : 'max');
  const [customPrice, setCustomPrice] = useState('');

  const displayPrice = customPrice || (strategy === 'fast' ? fast : max);

  const proceed = () => {
    updateListing({ pricingStrategy: strategy, fastPrice: fast, maxPrice: max, finalPrice: Number(displayPrice) });
    navigate('listing_preview');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <div className="gradient-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 12, width: 36, height: 36, cursor: 'pointer', color: 'white', fontSize: 18 }}
            onClick={() => navigate('condition')}>←</button>
          <h2 style={{ color: 'white', fontSize: 20 }}>Price It Right 💰</h2>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
          Based on <strong style={{ color: 'white' }}>47 nearby sales</strong> in your area. Our AI knows the market.
        </p>
      </div>

      <div className="screen" style={{ padding: '20px 16px 16px' }}>

        {/* Local comps */}
        <h3 style={{ marginBottom: 10 }}>What Others Got Nearby</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {COMPS.map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'white', borderRadius: 14, padding: '10px 14px',
              boxShadow: '0 1px 6px rgba(28,43,74,0.06)',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 2 }}>📍 {c.distance}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: c.sold ? 'var(--green)' : 'var(--navy)' }}>
                  ${c.price}
                </div>
                <div style={{ fontSize: 11, color: c.sold ? 'var(--green)' : 'var(--orange)', fontWeight: 700 }}>
                  {c.sold ? '✓ SOLD' : '● Active'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy cards */}
        <h3 style={{ marginBottom: 12 }}>Your Play</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
          {[
            { id: 'fast', emoji: '⚡', label: 'Sell Fast',     price: fast, sub: 'Usually gone in 24-48 hrs', color: '#2563EB', bg: '#DBEAFE' },
            { id: 'max',  emoji: '💎', label: 'Max Profit',    price: max,  sub: 'Worth the wait (1-2 weeks)', color: '#7C3AED', bg: '#EDE9FE' },
          ].map(opt => (
            <div key={opt.id}
              style={{
                background: strategy === opt.id ? opt.bg : 'white',
                border: `2.5px solid ${strategy === opt.id ? opt.color : 'var(--gray-border)'}`,
                borderRadius: 18, padding: '16px 14px',
                cursor: 'pointer', transition: 'all 0.18s',
                textAlign: 'center',
              }}
              onClick={() => { setStrategy(opt.id); setCustomPrice(''); }}>
              <span style={{ fontSize: 28 }}>{opt.emoji}</span>
              <div style={{ fontSize: 26, fontWeight: 900, color: opt.color, margin: '6px 0 2px' }}>${opt.price}</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14 }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 3 }}>{opt.sub}</div>
              {strategy === opt.id && (
                <div style={{ color: opt.color, fontWeight: 800, fontSize: 13, marginTop: 6 }}>Selected ✓</div>
              )}
            </div>
          ))}
        </div>

        {/* Custom override */}
        <div style={{ background: 'white', borderRadius: 18, padding: '14px 16px', border: '2px solid var(--gray-border)' }}>
          <label className="label" style={{ marginBottom: 8, display: 'block' }}>Or Set Your Own Price ($)</label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)' }}>$</span>
            <input
              className="input" type="number" placeholder={`e.g. ${fast}`}
              value={customPrice} onChange={e => setCustomPrice(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          <p style={{ fontSize: 12, color: 'var(--gray)', marginTop: 8 }}>
            🤖 AI will start negotiation from this price and protect your floor (${state.minPrice || 'none set'}).
          </p>
        </div>

        {/* Price display */}
        <div style={{
          textAlign: 'center', padding: '20px 0 4px',
          fontWeight: 900, fontSize: 44, color: 'var(--green)',
        }}>
          ${displayPrice}
        </div>
        <p style={{ textAlign: 'center', color: 'var(--gray)', fontSize: 14, marginBottom: 4 }}>
          Your listing price for <strong style={{ color: 'var(--navy)' }}>{item?.name}</strong>
        </p>
      </div>

      <div style={{ padding: '14px 16px 24px', background: 'white', borderTop: '1px solid var(--gray-border)', flexShrink: 0 }}>
        <button className="btn btn-primary" onClick={proceed}>
          Set the Price! 🏷️
        </button>
      </div>
    </div>
  );
}
