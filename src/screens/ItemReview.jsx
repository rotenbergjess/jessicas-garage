import { useState } from 'react';
import Modal from '../components/Modal';

export default function ItemReview({ state, updateListing, navigate }) {
  const { listing } = state;
  const { photoUrl, detectedItems, selectedItems: initSelected, category } = listing;
  const [selected, setSelected] = useState(initSelected ?? detectedItems.map(i => i.id));
  const [showApproval, setShowApproval] = useState(false);

  const toggle = (id) => setSelected(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );

  const proceed = () => {
    updateListing({ selectedItems: selected });
    setShowApproval(false);
    navigate('condition');
  };

  const selItems = detectedItems.filter(i => selected.includes(i.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <div className="gradient-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 12, width: 36, height: 36, cursor: 'pointer', color: 'white', fontSize: 18 }}
            onClick={() => navigate('camera')}>←</button>
          <h2 style={{ color: 'white', fontSize: 20 }}>Your Stuff, Spotted! 🎯</h2>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
          Our AI found {detectedItems.length} item{detectedItems.length > 1 ? 's' : ''} in your photo. Check or uncheck what you want to sell.
        </p>
      </div>

      <div className="screen" style={{ padding: '16px 16px 16px' }}>
        {/* Photo */}
        {photoUrl && (
          <div className="photo-frame" style={{ marginBottom: 16, maxHeight: 220 }}>
            <img src={photoUrl} alt="Your item" style={{ objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', bottom: 10, left: 10,
              background: 'rgba(0,0,0,0.65)', color: 'white', borderRadius: 100,
              fontSize: 12, fontWeight: 700, padding: '4px 10px',
            }}>
              ✨ AI Cleaned
            </div>
          </div>
        )}

        {/* Items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {detectedItems.map((item, idx) => {
            const isSel = selected.includes(item.id);
            return (
              <div key={item.id} className="card"
                style={{ border: `2.5px solid ${isSel ? 'var(--green)' : 'var(--gray-border)'}`, padding: 14, cursor: 'pointer' }}
                onClick={() => toggle(item.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Item thumbnail placeholder */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: `hsl(${(idx * 67) % 360}, 40%, 85%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0,
                  }}>
                    {['📦','📷','👟','🎮','🛋️','💡','📚','🎸'][idx % 8]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 2 }}>{item.category}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>
                        ~${item.fastPrice}–${item.maxPrice}
                      </span>
                      <span className={`badge ${item.grade === 'A' ? 'badge-green' : item.grade === 'C' ? 'badge-orange' : 'badge-gray'}`}>
                        Grade {item.grade}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: isSel ? 'var(--green)' : 'var(--gray-light)',
                    border: `2px solid ${isSel ? 'var(--green)' : 'var(--gray-border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.18s',
                  }}>
                    {isSel && <span style={{ color: 'white', fontSize: 16, fontWeight: 800 }}>✓</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {selItems.length > 0 && (
          <div className="card" style={{ background: 'var(--green-light)', border: 'none' }}>
            <p style={{ color: 'var(--green-dark)', fontSize: 14 }}>
              🎉 <strong>{selItems.length} item{selItems.length > 1 ? 's' : ''} selected</strong> — estimated range:&nbsp;
              <strong>${selItems.reduce((a, i) => a + i.fastPrice, 0)}–${selItems.reduce((a, i) => a + i.maxPrice, 0)}</strong>
            </p>
          </div>
        )}
      </div>

      <div style={{ padding: '14px 16px 24px', background: 'white', borderTop: '1px solid var(--gray-border)', flexShrink: 0 }}>
        <button className="btn btn-primary" onClick={() => setShowApproval(true)}
          disabled={selected.length === 0}>
          Looks Right! Let's Roll 🚀
        </button>
      </div>

      {showApproval && (
        <Modal icon="🎯" title="Ready to assess condition?"
          subtitle={`We'll deep-dive the condition of your ${selItems.length} item${selItems.length > 1 ? 's' : ''} next.`}
          onClose={() => setShowApproval(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            {selItems.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--gray-light)', borderRadius: 12 }}>
                <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{i.name}</span>
                <span className="badge badge-gray">Grade {i.grade}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowApproval(false)}>Edit</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={proceed}>Confirm & Continue ✓</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
