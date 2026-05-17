import { useEffect } from 'react';
import { HandledLogoFull } from '../components/HandledLogo';

export default function Splash({ navigate }) {
  useEffect(() => {
    const t = setTimeout(() => navigate('onboarding'), 2400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{
      height: '100dvh',
      background: 'linear-gradient(160deg, #1C2B4A 0%, #1a3d6b 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      padding: 32,
      animation: 'fadeIn 0.5s ease',
    }}>
      <div style={{ animation: 'bounce 1.8s ease-in-out infinite' }}>
        <HandledLogoFull light />
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 20,
      }}>
        <div style={{
          display: 'flex', gap: 8,
        }}>
          {['📷', '✍️', '☁️', '🏷️', '💰'].map((e, i) => (
            <span key={i} style={{
              fontSize: 22,
              opacity: 0,
              animation: `fadeIn 0.4s ease ${0.5 + i * 0.12}s forwards`,
            }}>{e}</span>
          ))}
        </div>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 13,
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease 1.2s forwards',
          opacity: 0,
        }}>
          Point. Shoot. Sold.
        </p>
      </div>

      {/* loading dots */}
      <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'rgba(255,255,255,0.35)',
            animation: `pulse 1s ease ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}
