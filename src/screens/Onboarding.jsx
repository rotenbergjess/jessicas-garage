import { useState } from 'react';
import { HandledWordmark } from '../components/HandledLogo';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MARKETPLACES = [
  { id: 'facebook',  label: 'Facebook Marketplace', emoji: '👥', color: '#1877F2' },
  { id: 'ebay',      label: 'eBay',                 emoji: '🛒', color: '#E53238' },
  { id: 'offerup',   label: 'OfferUp',               emoji: '📲', color: '#18A0FB' },
  { id: 'craigslist',label: 'Craigslist',            emoji: '📰', color: '#6B4DBA' },
  { id: 'poshmark',  label: 'Poshmark',              emoji: '👗', color: '#CC0033' },
  { id: 'mercari',   label: 'Mercari',               emoji: '📦', color: '#FF5E4B' },
];

const NEG_STYLES = [
  { id: 'tough',              emoji: '💪', label: 'Tough Negotiator',   sub: 'Hold firm — you might lose some sales but max your price.' },
  { id: 'negotiate_to_sell',  emoji: '🤝', label: 'Negotiate to Sell',  sub: 'Smart give-and-take. Best balance of speed and price.' },
  { id: 'no_negotiate',       emoji: '🏷️', label: 'No Negotiation',     sub: 'Price is final. Fast, no hassle, take it or leave it.' },
];

export default function Onboarding({ state, updateState, navigate }) {
  const [step, setStep]       = useState(0);
  const [profile, setProfile] = useState({ name: '', email: '', zip: '' });
  const [markets, setMarkets] = useState(state.marketplaces);
  const [pricing, setPricing] = useState(state.pricingPreference);
  const [minPrice, setMinPrice] = useState(state.minPrice);
  const [negStyle, setNegStyle] = useState(state.negotiationStyle);
  const [days, setDays]       = useState(state.availability.days);
  const [location, setLocation] = useState(state.availability.location);
  const [startTime, setStartTime] = useState(state.availability.startTime);
  const [endTime, setEndTime]   = useState(state.availability.endTime);

  const totalSteps = 5;

  const next = () => {
    if (step < totalSteps - 1) setStep(s => s + 1);
    else {
      updateState({
        profile,
        marketplaces: markets,
        pricingPreference: pricing,
        minPrice,
        negotiationStyle: negStyle,
        availability: { days, startTime, endTime, location },
        isOnboarded: true,
      });
      navigate('home');
    }
  };

  const toggleDay = (d) => setDays(prev =>
    prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
  );

  const stepTitles = [
    'First things first 👋',
    'Connect your marketplaces 🌐',
    'How do you want to price? 💰',
    'What\'s your deal style? 🤝',
    'When are you available? 📅',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <div className="gradient-header">
        <HandledWordmark size={22} light />
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600 }}>
              Step {step + 1} of {totalSteps}
            </span>
            {step > 0 && (
              <button className="btn-ghost" style={{ color: 'rgba(255,255,255,0.5)', padding: 4 }}
                onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
          </div>
          <h2 style={{ color: 'white', marginTop: 14, fontSize: 20 }}>{stepTitles[step]}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="screen" style={{ padding: '24px 20px 16px', flex: 1 }}>

        {/* Step 0: Profile */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ marginBottom: 4 }}>Let's set you up so we can handle everything for you!</p>
            <div className="input-group">
              <label className="label">Your Name</label>
              <input className="input" placeholder="e.g. Alex Johnson" value={profile.name}
                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@email.com" value={profile.email}
                onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="label">Zip / Postal Code</label>
              <input className="input" placeholder="e.g. 10001" value={profile.zip}
                onChange={e => setProfile(p => ({ ...p, zip: e.target.value }))} />
              <span style={{ fontSize: 12, color: 'var(--gray)' }}>We use this for hyper-local pricing magic ✨</span>
            </div>
          </div>
        )}

        {/* Step 1: Marketplaces */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ marginBottom: 6 }}>Connect once — we list everywhere at the same time. 🚀</p>
            {MARKETPLACES.map(m => (
              <div key={m.id} className={`marketplace-chip ${markets[m.id] ? 'connected' : ''}`}
                onClick={() => setMarkets(p => ({ ...p, [m.id]: !p[m.id] }))}>
                <span style={{ fontSize: 24 }}>{m.emoji}</span>
                <span style={{ flex: 1, fontWeight: 600, color: 'var(--navy)', fontSize: 15 }}>{m.label}</span>
                <div className={`toggle ${markets[m.id] ? 'on' : ''}`} />
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'var(--gray)', textAlign: 'center', marginTop: 4 }}>
              Don't worry — you can connect accounts later too.
            </p>
          </div>
        )}

        {/* Step 2: Pricing */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ marginBottom: 4 }}>Set your default strategy. You can always override per item.</p>
            {[
              { id: 'fast',      emoji: '⚡', label: 'Sell Fast',       sub: 'Price below market — gone in 24-48 hrs.' },
              { id: 'negotiate', emoji: '🤝', label: 'Negotiate',       sub: 'Start high, let AI find the sweet spot.' },
              { id: 'maximum',   emoji: '💎', label: 'Maximum Value',   sub: 'Hold out for top dollar. Worth the wait.' },
            ].map(opt => (
              <div key={opt.id} className={`select-card ${pricing === opt.id ? 'selected' : ''}`}
                onClick={() => setPricing(opt.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16 }}>{opt.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 2 }}>{opt.sub}</div>
                  </div>
                  {pricing === opt.id && (
                    <span style={{ marginLeft: 'auto', color: 'var(--green)', fontSize: 20 }}>✓</span>
                  )}
                </div>
              </div>
            ))}
            <div className="input-group" style={{ marginTop: 6 }}>
              <label className="label">I Will NOT Take Less Than ($)</label>
              <input className="input" type="number" placeholder="e.g. 20 (leave blank for no minimum)"
                value={minPrice} onChange={e => setMinPrice(e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 3: Negotiation style */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ marginBottom: 4 }}>Our AI negotiates 24/7 so you never have to. Pick your style:</p>
            {NEG_STYLES.map(n => (
              <div key={n.id} className={`select-card ${negStyle === n.id ? 'selected' : ''}`}
                onClick={() => setNegStyle(n.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{n.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{n.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 2 }}>{n.sub}</div>
                  </div>
                  {negStyle === n.id && (
                    <span style={{ marginLeft: 'auto', color: 'var(--green)', fontSize: 20 }}>✓</span>
                  )}
                </div>
              </div>
            ))}
            <div className="card" style={{ background: 'var(--green-light)', border: 'none', marginTop: 4 }}>
              <p style={{ color: 'var(--green-dark)', fontSize: 13 }}>
                🤖 <strong>Your AI agent works around the clock.</strong> Buyers get instant responses — even at 3am. You wake up to deals done.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Schedule */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ marginBottom: 4 }}>When are you free to hand off your stuff?</p>

            <div>
              <label className="label" style={{ marginBottom: 10, display: 'block' }}>Available Days</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {DAYS.map(d => (
                  <button key={d} className={`day-pill ${days.includes(d) ? 'selected' : ''}`}
                    onClick={() => toggleDay(d)}>{d}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="input-group">
                <label className="label">From</label>
                <input className="input" type="time" value={startTime}
                  onChange={e => setStartTime(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="label">To</label>
                <input className="input" type="time" value={endTime}
                  onChange={e => setEndTime(e.target.value)} />
              </div>
            </div>

            <div className="input-group">
              <label className="label">Pickup Location / Area</label>
              <input className="input" placeholder="e.g. Front porch, parking lot at 5th & Main..."
                value={location} onChange={e => setLocation(e.target.value)} />
            </div>

            <div className="card" style={{ background: 'var(--green-light)', border: 'none' }}>
              <p style={{ color: 'var(--green-dark)', fontSize: 13 }}>
                📍 <strong>No-show protection is built in.</strong> We auto-re-list if a buyer ghosts you. Your time is worth it.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* CTA */}
      <div style={{ padding: '16px 20px 24px', background: 'white', borderTop: '1px solid var(--gray-border)', flexShrink: 0 }}>
        <button className="btn btn-primary" onClick={next}
          disabled={step === 0 && !profile.name.trim()}>
          {step === totalSteps - 1 ? "Open the Garage! 🚀" : 'Continue →'}
        </button>
      </div>
    </div>
  );
}
