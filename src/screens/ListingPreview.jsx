import { useState } from 'react';
import Modal from '../components/Modal';

const MARKET_INFO = {
  facebook:  { label: 'Facebook Marketplace', emoji: '👥' },
  ebay:      { label: 'eBay',                 emoji: '🛒' },
  offerup:   { label: 'OfferUp',               emoji: '📲' },
  craigslist:{ label: 'Craigslist',            emoji: '📰' },
  poshmark:  { label: 'Poshmark',              emoji: '👗' },
  mercari:   { label: 'Mercari',               emoji: '📦' },
};

export default function ListingPreview({ state, updateListing, navigate }) {
  const { listing, marketplaces, profile } = state;
  const item = listing.detectedItems.find(i => listing.selectedItems.includes(i.id)) ?? listing.detectedItems[0];

  const defaultTitle = item ? `${item.name} — ${item.grade === 'A' ? 'Excellent' : item.grade === 'B' ? 'Good' : 'Fair'} Condition` : 'My Item';
  const defaultDesc  = item?.description ?? 'Great item, clean and ready for pickup. Price is firm. Contact to arrange.';

  const [title, setTitle]     = useState(listing.title || defaultTitle);
  const [desc, setDesc]       = useState(listing.description || defaultDesc);
  const [editing, setEditing] = useState(false);
  const [showApproval, setShowApproval] = useState(false);

  const activeMarkets = Object.entries(marketplaces).filter(([, v]) => v).map(([k]) => k);
  const price = listing.finalPrice ?? item?.fastPrice ?? 0;

  const publish = () => {
    updateListing({ title, description: desc });
    setShowApproval(false);
    navigate('publishing');
  };

  const gradeColors = { A: '#16A34A', B: '#2563EB', C: '#D97706', D: '#DC2626' };
  const grade = listing.conditionGrade ?? item?.grade ?? 'B';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <div className="gradient-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 12, width: 36, height: 36, cursor: 'pointer', color: 'white', fontSize: 18 }}
            onClick={() => navigate('pricing')}>←</button>
          <h2 style={{ color: 'white', fontSize: 20 }}>Listing Preview 👀</h2>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
          This is what buyers will see. Make it shine! ✨
        </p>
      </div>

      <div className="screen" style={{ padding: '16px 16px 16px' }}>

        {/* Listing card preview */}
        <div className="card" style={{ marginBottom: 16 }}>
          {/* Photo */}
          {listing.photoUrl ? (
            <div style={{ margin: '-18px -18px 16px', borderRadius: '18px 18px 0 0', overflow: 'hidden', height: 200 }}>
              <img src={listing.photoUrl} alt="Item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ height: 140, background: 'var(--gray-light)', borderRadius: 14, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
              📦
            </div>
          )}

          {/* Price */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ fontWeight: 900, color: 'var(--green)', fontSize: 32 }}>${price}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <span className="badge badge-gray" style={{ background: `${gradeColors[grade]}22`, color: gradeColors[grade] }}>
                Grade {grade}
              </span>
              {listing.pricingStrategy === 'fast' && <span className="badge badge-orange">⚡ Sell Fast</span>}
              {listing.pricingStrategy === 'max'  && <span className="badge" style={{ background: '#EDE9FE', color: '#7C3AED' }}>💎 Max Profit</span>}
            </div>
          </div>

          {/* Title */}
          {editing ? (
            <input className="input" value={title} onChange={e => setTitle(e.target.value)}
              style={{ marginBottom: 10, fontWeight: 700 }} />
          ) : (
            <h3 style={{ marginBottom: 10, fontSize: 16 }}>{title}</h3>
          )}

          {/* Description */}
          {editing ? (
            <textarea
              className="input" value={desc} onChange={e => setDesc(e.target.value)}
              style={{ minHeight: 80, resize: 'vertical', fontSize: 14, lineHeight: 1.5 }}
            />
          ) : (
            <p style={{ fontSize: 14, color: 'var(--gray-dark)', lineHeight: 1.6 }}>{desc}</p>
          )}

          {/* Damage tags */}
          {(listing.damage?.length > 0) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {listing.damage.map((d, i) => (
                <span key={i} style={{ fontSize: 12, background: '#FFF9E6', color: '#92400E', borderRadius: 8, padding: '3px 8px', fontWeight: 600 }}>
                  ⚠️ {d}
                </span>
              ))}
            </div>
          )}

          {/* Seller info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--gray-border)' }}>
            <div className="avatar" style={{ width: 34, height: 34, fontSize: 14 }}>
              {(profile.name || 'U').charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{profile.name || 'You'}</div>
              <div className="trust-badge" style={{ fontSize: 12, marginTop: 2 }}>
                <div className="trust-dot" />
                Trust Score 96
              </div>
            </div>
          </div>
        </div>

        {/* Edit toggle */}
        <button
          style={{
            width: '100%', background: editing ? 'var(--green-light)' : 'white',
            border: `2px solid ${editing ? 'var(--green)' : 'var(--gray-border)'}`,
            borderRadius: 14, padding: '12px', cursor: 'pointer',
            fontWeight: 700, color: editing ? 'var(--green-dark)' : 'var(--navy)',
            fontSize: 14, marginBottom: 14,
          }}
          onClick={() => setEditing(!editing)}>
          {editing ? '✓ Done Editing' : '✏️ Edit Title / Description'}
        </button>

        {/* Will list on */}
        <h3 style={{ marginBottom: 10 }}>Going Live On</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {activeMarkets.length > 0 ? activeMarkets.map(m => (
            <div key={m} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'white', borderRadius: 12, padding: '8px 12px',
              border: '1.5px solid var(--gray-border)', fontSize: 13, fontWeight: 600, color: 'var(--navy)',
            }}>
              {MARKET_INFO[m]?.emoji} {MARKET_INFO[m]?.label ?? m}
            </div>
          )) : (
            <p style={{ color: 'var(--gray)', fontSize: 14 }}>No marketplaces connected. Go to Profile to connect.</p>
          )}
        </div>

        <div className="card" style={{ background: 'var(--green-light)', border: 'none', marginBottom: 8 }}>
          <p style={{ color: 'var(--green-dark)', fontSize: 13 }}>
            🤖 <strong>AI negotiator is standing by.</strong> The moment an offer comes in, your agent responds — even if you're asleep.
          </p>
        </div>
      </div>

      <div style={{ padding: '14px 16px 24px', background: 'white', borderTop: '1px solid var(--gray-border)', flexShrink: 0 }}>
        <button className="btn btn-primary" onClick={() => setShowApproval(true)}>
          Post It! 🚀
        </button>
      </div>

      {showApproval && (
        <Modal icon="🚀" title="Ready to go live?"
          subtitle={`We'll post your ${item?.name ?? 'item'} to ${activeMarkets.length} marketplace${activeMarkets.length !== 1 ? 's' : ''} right now.`}
          onClose={() => setShowApproval(false)}>
          <div style={{ background: 'var(--gray-light)', borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: 'var(--gray)' }}>Item</span>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{item?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginTop: 8 }}>
              <span style={{ color: 'var(--gray)' }}>List Price</span>
              <span style={{ fontWeight: 800, color: 'var(--green)' }}>${price}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginTop: 8 }}>
              <span style={{ color: 'var(--gray)' }}>Marketplaces</span>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{activeMarkets.length} platforms</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowApproval(false)}>Not Yet</button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={publish}>GO LIVE! 🔥</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
