import { useState } from 'react';
import Modal from '../components/Modal';

export default function Success({ state, updateState, navigate }) {
  const { listing, marketplaces, stats } = state;
  const item = listing.detectedItems?.find(i => listing.selectedItems?.includes(i.id)) ?? listing.detectedItems?.[0];
  const price = listing.finalPrice ?? item?.fastPrice ?? 0;
  const activeMarkets = Object.entries(marketplaces).filter(([,v]) => v).map(([k]) => k);
  const count = activeMarkets.length || 2;

  const [showSchedule, setShowSchedule] = useState(false);

  const handleWatchOffers = () => {
    // Add the new listing to active listings
    if (item) {
      updateState({
        listings: [
          ...state.listings,
          {
            id: Date.now(),
            title: listing.title || item.name,
            price,
            status: 'active',
            markets: activeMarkets,
            views: 0,
            offers: 0,
            emoji: '📦',
          },
        ],
      });
    }
    navigate('negotiation');
  };

  const handleListAnother = () => {
    // Add to listings and go back to camera
    if (item) {
      updateState({
        listings: [
          ...state.listings,
          {
            id: Date.now(),
            title: listing.title || item.name,
            price,
            status: 'active',
            markets: activeMarkets,
            views: 0,
            offers: 0,
            emoji: '📦',
          },
        ],
        listing: {
          photoUrl: null, photoFile: null, category: null,
          detectedItems: [], selectedItems: [],
          conditionGrade: null, damage: [],
          pricingStrategy: null, fastPrice: null, maxPrice: null, finalPrice: null,
          title: '', description: '',
        },
      });
    }
    navigate('camera');
  };

  return (
    <div style={{
      height: '100dvh',
      background: 'linear-gradient(160deg, #1C2B4A 0%, #1a3d6b 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '32px 20px',
    }}>
      {/* Celebration */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 80, marginBottom: 16, lineHeight: 1 }}>🎉</div>
        <h1 style={{ color: 'white', fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
          It's In The<br /><span style={{ color: 'var(--green)' }}>GARAGE!</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.5 }}>
          Your stuff is as good as sold. 🚀
        </p>
      </div>

      {/* Stats card */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        border: '1.5px solid rgba(255,255,255,0.15)',
        borderRadius: 24, padding: '20px 24px', width: '100%', marginBottom: 24,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, textAlign: 'center', marginBottom: 16 }}>
          {[
            { label: 'Platforms', value: count, icon: '🌐' },
            { label: 'List Price', value: `$${price}`, icon: '💰' },
            { label: 'Listed In', value: '< 1 min', icon: '⚡' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: 'white', marginTop: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🤖</span>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--green)' }}>AI Agent is ON.</strong> Responding to buyers 24/7 within your price guardrails.
          </p>
        </div>
      </div>

      {/* What happens next */}
      <div style={{ width: '100%', marginBottom: 28 }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, textAlign: 'center' }}>
          What Happens Next
        </p>
        {[
          { e: '💬', t: 'Buyers message us', d: 'We respond instantly, you rest' },
          { e: '🤝', t: 'Deals get made',    d: 'Within your price guardrails' },
          { e: '💅', t: 'Pickup scheduled',  d: 'Based on your availability' },
          { e: '💵', t: 'You collect cash',  d: 'Zero effort on your part' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
            borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}>
            <span style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{s.e}</span>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{s.t}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 1 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary" onClick={handleWatchOffers} style={{ fontSize: 16 }}>
          Watch Offers Roll In 💬
        </button>
        <button className="btn" onClick={handleListAnother}
          style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          📷 List Another Item
        </button>
        <button className="btn-ghost" onClick={() => navigate('home')}
          style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          Back to Home
        </button>
      </div>

      {showSchedule && (
        <Modal icon="📅" title="Schedule a Pickup?" subtitle="Set your availability and we'll handle the meeting too."
          onClose={() => setShowSchedule(false)}>
          <button className="btn btn-primary" onClick={() => { setShowSchedule(false); navigate('home'); }}>
            Set Pickup Schedule
          </button>
        </Modal>
      )}
    </div>
  );
}
