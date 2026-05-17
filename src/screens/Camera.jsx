import { useRef, useState } from 'react';

const CATEGORIES = [
  { id: 'single',   emoji: '📦', label: 'Single Item',        sub: 'One thing to sell' },
  { id: 'multiple', emoji: '📦📦', label: 'Multiple Items',   sub: 'A few things at once' },
  { id: 'room',     emoji: '🏠', label: 'Room Cleanout',      sub: 'Clear out a whole room' },
];

export default function Camera({ updateListing, navigate }) {
  const fileRef     = useRef(null);
  const [category, setCategory] = useState('single');
  const [preview, setPreview]   = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    updateListing({ photoUrl: url, photoFile: file, category });
  };

  const handleGo = () => {
    if (!preview) {
      fileRef.current?.click();
      return;
    }
    updateListing({ category });
    navigate('processing');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <div className="gradient-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 12, width: 36, height: 36, cursor: 'pointer', color: 'white', fontSize: 18 }}
            onClick={() => navigate('home')}>←</button>
          <h2 style={{ color: 'white', fontSize: 20 }}>Point & Shoot 📷</h2>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginTop: 6 }}>
          Take a photo — we'll handle literally everything else.
        </p>
      </div>

      <div className="screen" style={{ padding: '20px 16px 16px' }}>

        {/* Photo area */}
        <div className="photo-frame" style={{
          background: preview ? 'black' : 'linear-gradient(160deg, #1C2B4A, #274070)',
          cursor: 'pointer',
          border: preview ? 'none' : '3px dashed rgba(255,255,255,0.2)',
        }}
          onClick={() => !preview && fileRef.current?.click()}>
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>📷</div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 17 }}>Tap to take a photo</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 6 }}>
                or browse your camera roll
              </div>
            </div>
          )}
          {preview && (
            <button
              style={{
                position: 'absolute', top: 10, right: 10,
                background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: 100,
                color: 'white', fontSize: 13, padding: '5px 12px', cursor: 'pointer', fontWeight: 700,
              }}
              onClick={(e) => { e.stopPropagation(); setPreview(null); fileRef.current.value = ''; }}>
              Retake
            </button>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleFile}
        />

        {/* Pro tip */}
        <div style={{ background: 'var(--navy)', borderRadius: 14, padding: '10px 14px', marginTop: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--green)' }}>Pro tip:</strong> Good lighting = better AI = higher price. Natural light is your best friend!
          </p>
        </div>

        {/* Category */}
        <h3 style={{ marginTop: 20, marginBottom: 12 }}>What are you selling?</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CATEGORIES.map(c => (
            <div key={c.id} className={`select-card ${category === c.id ? 'selected' : ''}`}
              onClick={() => setCategory(c.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 26 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 1 }}>{c.sub}</div>
                </div>
                {category === c.id && <span style={{ marginLeft: 'auto', color: 'var(--green)', fontSize: 20 }}>✓</span>}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div style={{ padding: '14px 16px 24px', background: 'white', flexShrink: 0, borderTop: '1px solid var(--gray-border)' }}>
        <button className="btn btn-primary" onClick={handleGo}>
          {preview ? '🚀 Let the AI Loose!' : '📷 Take a Photo'}
        </button>
      </div>
    </div>
  );
}
