import { useEffect, useState } from 'react';
import { HandledMark } from '../components/HandledLogo';

const MOCK_ITEMS = [
  { id: 1, name: 'DSLR Camera',          category: 'Electronics',    grade: 'B',  fastPrice: 175, maxPrice: 260, damage: ['Minor scratches on lens barrel'], description: 'Canon EOS DSLR camera in good working condition. Perfect for photography enthusiasts. Includes original strap.' },
  { id: 2, name: 'Leather Handbag',      category: 'Fashion',        grade: 'A',  fastPrice: 42,  maxPrice: 78,  damage: [], description: 'Stylish leather handbag, barely used. Interior is clean with no stains. Perfect everyday carry.' },
  { id: 3, name: 'Running Shoes',        category: 'Clothing & Shoes',grade: 'B', fastPrice: 28,  maxPrice: 52,  damage: ['Normal wear on soles'], description: 'Nike running shoes, size 10. Good condition with plenty of life left. Clean and ready to run.' },
  { id: 4, name: 'Gaming Console',       category: 'Electronics',    grade: 'B',  fastPrice: 130, maxPrice: 195, damage: ['Small scratch on top panel'], description: 'Game console with all cables included. Tested and fully functional. Great for gaming.' },
  { id: 5, name: 'Coffee Table',         category: 'Furniture',      grade: 'C',  fastPrice: 55,  maxPrice: 95,  damage: ['Ring marks on surface', 'Small chip on corner'], description: 'Wood coffee table in fair condition. Ring marks can be refinished. Solid and sturdy frame.' },
  { id: 6, name: 'Vintage Floor Lamp',   category: 'Home Decor',     grade: 'A',  fastPrice: 30,  maxPrice: 55,  damage: [], description: 'Vintage-style floor lamp in excellent condition. Warm ambient light. Works perfectly, all original parts.' },
  { id: 7, name: 'Bookshelf',            category: 'Furniture',      grade: 'B',  fastPrice: 38,  maxPrice: 68,  damage: ['Assembly marks on sides'], description: 'Four-shelf bookcase, solid and clean. Minor assembly marks on side panels. Easy to disassemble.' },
  { id: 8, name: 'Acoustic Guitar',      category: 'Musical Instruments', grade: 'B', fastPrice: 90, maxPrice: 160, damage: ['Small surface ding on body'], description: 'Full-size acoustic guitar with good tone. Plays well, tuners work smoothly. Great for beginners or practice.' },
];

const STEPS = [
  { msg: 'Sizing up your photo...',          icon: '🔍' },
  { msg: 'AI cleaning up that background...', icon: '✨' },
  { msg: 'Identifying what you\'ve got...',   icon: '🧠' },
  { msg: 'Checking for damage & condition...', icon: '🔬' },
  { msg: 'Scanning local prices...',          icon: '📊' },
  { msg: 'Drafting a killer listing...',      icon: '✍️' },
];

export default function Processing({ state, updateListing, navigate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone]               = useState(false);

  useEffect(() => {
    let step = 0;
    const advance = () => {
      if (step < STEPS.length - 1) {
        step++;
        setCurrentStep(step);
        setTimeout(advance, 700 + Math.random() * 400);
      } else {
        setTimeout(() => {
          setDone(true);
          // Pick mock item(s) based on category
          const pool = [...MOCK_ITEMS];
          const shuffle = (a) => a.sort(() => Math.random() - 0.5);
          const count = state.listing.category === 'multiple' ? 3
                      : state.listing.category === 'room'     ? 5
                      : 1;
          const items = shuffle(pool).slice(0, count);
          updateListing({ detectedItems: items, selectedItems: items.map(i => i.id) });
          setTimeout(() => navigate('item_review'), 900);
        }, 500);
      }
    };
    const t = setTimeout(advance, 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      height: '100dvh',
      background: 'linear-gradient(160deg, #1C2B4A 0%, #1a3d6b 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 32, gap: 32,
    }}>
      {/* Animated logo */}
      <div style={{ animation: done ? 'bounce 0.5s ease' : 'none', textAlign: 'center' }}>
        <div style={{ animation: done ? 'none' : 'spin 2s linear infinite', display: 'inline-block' }}>
          <HandledMark size={72} />
        </div>
        <div style={{
          fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-0.5px',
          marginTop: 12,
        }}>
          {done ? 'Done! 🎉' : 'Working magic...'}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 6, fontSize: 14 }}>
          {done ? 'We spotted your stuff!' : 'Sit back — this part\'s on us.'}
        </p>
      </div>

      {/* Steps */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: i <= currentStep ? 1 : 0.3,
            transition: 'opacity 0.4s ease',
            padding: '8px 0',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: i < currentStep ? 'var(--green)'
                        : i === currentStep ? 'rgba(61,190,130,0.25)'
                        : 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              transition: 'background 0.3s',
            }}>
              {i < currentStep ? '✓' : s.icon}
            </div>
            <span style={{
              fontSize: 15,
              color: i < currentStep ? 'rgba(255,255,255,0.8)' : i === currentStep ? 'white' : 'rgba(255,255,255,0.35)',
              fontWeight: i === currentStep ? 700 : 500,
              transition: 'color 0.3s',
            }}>
              {s.msg}
            </span>
            {i === currentStep && !done && (
              <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)', borderTopColor: 'var(--green)', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
