import { useState } from 'react';
import Modal from '../components/Modal';

const GRADES = [
  { id: 'A', label: 'Excellent',  color: '#16A34A', bg: '#DCFCE7', desc: 'Like new. No visible flaws.' },
  { id: 'B', label: 'Good',       color: '#2563EB', bg: '#DBEAFE', desc: 'Minor signs of use. Works perfectly.' },
  { id: 'C', label: 'Fair',       color: '#D97706', bg: '#FEF3C7', desc: 'Visible wear. Functional.' },
  { id: 'D', label: 'For Parts',  color: '#DC2626', bg: '#FEE2E2', desc: 'Has issues. Priced accordingly.' },
];

export default function Condition({ state, updateListing, navigate }) {
  const { listing } = state;
  const item = listing.detectedItems.find(i => listing.selectedItems.includes(i.id)) ?? listing.detectedItems[0];
  const [grade, setGrade]       = useState(item?.grade ?? 'B');
  const [damage, setDamage]     = useState(item?.damage ?? []);
  const [note, setNote]         = useState('');
  const [showApproval, setShowApproval] = useState(false);

  const addNote = () => {
    if (note.trim()) {
      setDamage(prev => [...prev, note.trim()]);
      setNote('');
    }
  };

  const removeNote = (i) => setDamage(prev => prev.filter((_, idx) => idx !== i));

  const confirm = () => {
    updateListing({ conditionGrade: grade, damage });
    setShowApproval(false);
    navigate('pricing');
  };

  const selectedGrade = GRADES.find(g => g.id === grade);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <div className="gradient-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 12, width: 36, height: 36, cursor: 'pointer', color: 'white', fontSize: 18 }}
            onClick={() => navigate('item_review')}>←</button>
          <h2 style={{ color: 'white', fontSize: 20 }}>Condition Report 🔬</h2>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
          AI assessed: <strong style={{ color: 'white' }}>{item?.name ?? 'Your item'}</strong>. Review and confirm.
        </p>
      </div>

      <div className="screen" style={{ padding: '20px 16px 16px' }}>

        {/* Grade selector */}
        <h3 style={{ marginBottom: 12 }}>Condition Grade</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {GRADES.map(g => (
            <div key={g.id}
              style={{
                background: grade === g.id ? g.bg : 'white',
                border: `2.5px solid ${grade === g.id ? g.color : 'var(--gray-border)'}`,
                borderRadius: 16, padding: '14px 12px',
                cursor: 'pointer', transition: 'all 0.18s',
              }}
              onClick={() => setGrade(g.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: 22, fontWeight: 800, color: g.color,
                  background: `${g.color}22`, borderRadius: 8, padding: '2px 8px',
                }}>{g.id}</span>
                {grade === g.id && <span style={{ color: g.color, fontSize: 18 }}>✓</span>}
              </div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, marginTop: 8 }}>{g.label}</div>
              <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 2 }}>{g.desc}</div>
            </div>
          ))}
        </div>

        {/* AI damage notes */}
        <h3 style={{ marginBottom: 8 }}>AI-Detected Issues</h3>
        <p style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 12 }}>
          Transparency builds trust with buyers. Our AI noted:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {damage.length === 0 ? (
            <div style={{
              background: 'var(--green-light)', borderRadius: 14, padding: '12px 16px',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <span style={{ fontSize: 20 }}>✅</span>
              <span style={{ color: 'var(--green-dark)', fontWeight: 600, fontSize: 14 }}>
                No issues detected! This one's clean.
              </span>
            </div>
          ) : (
            damage.map((d, i) => (
              <div key={i} style={{
                background: '#FFF9E6', border: '1.5px solid #FCD34D',
                borderRadius: 14, padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                <span style={{ flex: 1, fontSize: 14, color: 'var(--navy)' }}>{d}</span>
                <button onClick={() => removeNote(i)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--gray)', fontSize: 18, padding: 4,
                }}>×</button>
              </div>
            ))
          )}
        </div>

        {/* Add custom note */}
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="input" placeholder="Add a condition note..."
            value={note} onChange={e => setNote(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addNote()}
            style={{ flex: 1, fontSize: 14 }} />
          <button onClick={addNote} style={{
            background: 'var(--navy)', border: 'none', borderRadius: 14,
            color: 'white', padding: '0 18px', cursor: 'pointer', fontWeight: 700, fontSize: 20,
          }}>+</button>
        </div>

        <div className="card" style={{ background: 'var(--green-light)', border: 'none', marginTop: 16 }}>
          <p style={{ color: 'var(--green-dark)', fontSize: 13 }}>
            🤖 <strong>Honesty pays off.</strong> Accurate condition = fewer disputes, faster sales, better reviews.
          </p>
        </div>
      </div>

      <div style={{ padding: '14px 16px 24px', background: 'white', borderTop: '1px solid var(--gray-border)', flexShrink: 0 }}>
        <button className="btn btn-primary" onClick={() => setShowApproval(true)}>
          Condition Confirmed ✓
        </button>
      </div>

      {showApproval && (
        <Modal icon="🔬" title="Confirm this report?"
          subtitle="This will be shown to buyers. You can always edit your listing later."
          onClose={() => setShowApproval(false)}>
          <div style={{ background: selectedGrade.bg, border: `2px solid ${selectedGrade.color}`, borderRadius: 16, padding: '14px 16px', marginBottom: 16, textAlign: 'center' }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: selectedGrade.color }}>{grade}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginLeft: 10 }}>{selectedGrade.label}</span>
            {damage.length > 0 && (
              <p style={{ fontSize: 13, color: 'var(--gray)', marginTop: 6 }}>
                {damage.length} issue{damage.length > 1 ? 's' : ''} noted
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowApproval(false)}>Edit</button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={confirm}>Lock It In 🔒</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
