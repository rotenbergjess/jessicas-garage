import { useState } from 'react';
import Modal from '../components/Modal';
import BottomNav from '../components/BottomNav';

export default function Negotiation({ state, updateState, navigate }) {
  const { negotiations } = state;
  const [activeId, setActiveId]     = useState(null);
  const [overrideId, setOverrideId] = useState(null);
  const [manualMsg, setManualMsg]   = useState('');

  const active = negotiations.find(n => n.id === activeId);
  const override = negotiations.find(n => n.id === overrideId);

  const sendManual = () => {
    if (!manualMsg.trim() || !override) return;
    updateState({
      negotiations: state.negotiations.map(n =>
        n.id === override.id
          ? { ...n, messages: [...n.messages, { from: 'seller', text: manualMsg.trim() }] }
          : n
      ),
    });
    setManualMsg('');
    setOverrideId(null);
  };

  const acceptDeal = (id) => {
    updateState({
      negotiations: state.negotiations.map(n =>
        n.id === id ? { ...n, status: 'agreed' } : n
      ),
    });
    setActiveId(null);
  };

  const statusLabel = { countered: '🔄 Countered', agreed: '✅ Agreed', waiting: '⏳ Waiting' };
  const statusColor = { countered: 'badge-orange', agreed: 'badge-green', waiting: 'badge-gray' };

  const trustColor = (score) => score >= 90 ? 'var(--green)' : score >= 70 ? 'var(--orange)' : 'var(--red)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <div className="gradient-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: 20 }}>AI Negotiations 🤖</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginTop: 4 }}>
              {negotiations.length} active deal{negotiations.length !== 1 ? 's' : ''} — your agent is on it
            </p>
          </div>
          <div style={{
            background: 'rgba(61,190,130,0.2)', border: '1.5px solid rgba(61,190,130,0.4)',
            borderRadius: 12, padding: '6px 12px', textAlign: 'center',
          }}>
            <div style={{ color: 'var(--green)', fontWeight: 800, fontSize: 16 }}>🟢</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 700 }}>LIVE</div>
          </div>
        </div>
      </div>

      <div className="screen" style={{ padding: '16px 16px 80px' }}>

        {negotiations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>💬</div>
            <h3 style={{ marginBottom: 8 }}>No negotiations yet</h3>
            <p>When buyers send offers, your AI agent handles them here. List something to get started!</p>
            <button className="btn btn-primary" onClick={() => navigate('camera')} style={{ marginTop: 20 }}>
              List Something 📷
            </button>
          </div>
        ) : (
          negotiations.map(neg => (
            <div key={neg.id} className="card" style={{ marginBottom: 12, padding: 14 }}>
              {/* Buyer header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div className="avatar" style={{ width: 44, height: 44, fontSize: 16 }}>
                  {neg.buyer.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{neg.buyer.name}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 3 }}>
                    <div className="trust-badge" style={{ fontSize: 12 }}>
                      <div className="trust-dot" style={{ background: trustColor(neg.buyer.trustScore) }} />
                      Trust {neg.buyer.trustScore}
                    </div>
                    <span className={`badge ${statusColor[neg.status]}`}>{statusLabel[neg.status]}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--gray)', fontWeight: 600 }}>Listed</div>
                  <div style={{ fontWeight: 800, color: 'var(--navy)' }}>${neg.listPrice}</div>
                  <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>Offer ${neg.currentOffer}</div>
                </div>
              </div>

              {/* Item */}
              <div style={{ background: 'var(--gray-light)', borderRadius: 10, padding: '8px 12px', marginBottom: 12, fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>
                📦 {neg.item}
              </div>

              {/* Chat preview */}
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveId(neg.id)}>
                {neg.messages.slice(-2).map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: m.from === 'buyer' ? 'flex-start' : 'flex-end',
                    marginBottom: 6,
                  }}>
                    <div style={{
                      maxWidth: '82%',
                      background: m.from === 'buyer' ? 'var(--gray-light)' : m.from === 'ai' ? 'var(--green-light)' : 'var(--navy)',
                      color: m.from === 'seller' ? 'white' : 'var(--navy)',
                      borderRadius: m.from === 'buyer' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                      padding: '8px 12px', fontSize: 13, lineHeight: 1.4,
                    }}>
                      {m.from === 'ai' && <span style={{ color: 'var(--green-dark)', fontWeight: 700 }}>🤖 AI: </span>}
                      {m.text}
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700, textAlign: 'center', marginTop: 6 }}>
                  Tap to see full conversation →
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--gray-border)' }}>
                {neg.status !== 'agreed' && (
                  <button className="btn" onClick={() => acceptDeal(neg.id)}
                    style={{ flex: 1, background: 'var(--green-light)', color: 'var(--green-dark)', border: 'none', borderRadius: 12, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                    ✓ Accept ${neg.currentOffer}
                  </button>
                )}
                <button className="btn" onClick={() => setOverrideId(neg.id)}
                  style={{ flex: 1, background: 'var(--gray-light)', color: 'var(--navy)', border: 'none', borderRadius: 12, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  ✏️ Override AI
                </button>
                {neg.status !== 'agreed' && (
                  <button className="btn" onClick={() => updateState({ negotiations: state.negotiations.filter(n => n.id !== neg.id) })}
                    style={{ width: 40, background: 'var(--red-light)', color: 'var(--red)', border: 'none', borderRadius: 12, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                    ✗
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Full chat modal */}
      {active && (
        <div className="modal-overlay" onClick={() => setActiveId(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '80dvh' }}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 4 }}>{active.item}</h3>
            <p style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 16 }}>
              with {active.buyer.name} · Trust {active.buyer.trustScore}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', maxHeight: '40dvh', paddingBottom: 8 }}>
              {active.messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.from === 'buyer' ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    maxWidth: '82%',
                    background: m.from === 'buyer' ? 'var(--gray-light)' : m.from === 'ai' ? 'var(--green-light)' : 'var(--navy)',
                    color: m.from === 'seller' ? 'white' : 'var(--navy)',
                    borderRadius: m.from === 'buyer' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    padding: '10px 14px', fontSize: 14, lineHeight: 1.5,
                  }}>
                    {m.from === 'ai' && <div style={{ color: 'var(--green-dark)', fontWeight: 700, fontSize: 12, marginBottom: 2 }}>🤖 AI Agent</div>}
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button className="btn btn-secondary" onClick={() => setActiveId(null)}>Close</button>
              {active.status !== 'agreed' && (
                <button className="btn btn-primary" onClick={() => { acceptDeal(active.id); }}>✓ Accept Deal</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Override AI modal */}
      {override && (
        <div className="modal-overlay" onClick={() => setOverrideId(null)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 6 }}>Override Your AI Agent</h3>
            <p style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 16 }}>
              Send a custom message to {override.buyer.name} as yourself.
            </p>
            <textarea className="input" value={manualMsg} onChange={e => setManualMsg(e.target.value)}
              placeholder={`e.g. "I can do $${override.currentOffer + 5} — final offer!"`}
              style={{ minHeight: 80, resize: 'none', marginBottom: 12 }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setOverrideId(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={sendManual} disabled={!manualMsg.trim()}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="negotiation" navigate={navigate} offerCount={negotiations.filter(n => n.status !== 'agreed').length} />
    </div>
  );
}
