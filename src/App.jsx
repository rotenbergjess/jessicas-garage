import { useState, useCallback } from 'react';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Camera from './screens/Camera';
import Processing from './screens/Processing';
import ItemReview from './screens/ItemReview';
import Condition from './screens/Condition';
import Pricing from './screens/Pricing';
import ListingPreview from './screens/ListingPreview';
import Publishing from './screens/Publishing';
import Success from './screens/Success';
import Negotiation from './screens/Negotiation';

const INITIAL_STATE = {
  profile: { name: '', email: '', zip: '' },
  marketplaces: {
    facebook: true, ebay: false, offerup: true,
    craigslist: false, poshmark: false, mercari: false,
  },
  pricingPreference: 'negotiate',
  minPrice: '',
  negotiationStyle: 'negotiate_to_sell',
  availability: { days: ['Saturday', 'Sunday'], startTime: '10:00', endTime: '18:00', location: '' },
  listing: {
    photoUrl: null, photoFile: null, category: null,
    detectedItems: [], selectedItems: [],
    conditionGrade: null, damage: [],
    pricingStrategy: null, fastPrice: null, maxPrice: null, finalPrice: null,
    title: '', description: '',
  },
  listings: [
    { id: 1, title: 'Sony PlayStation 5',     price: 380, status: 'active',       markets: ['facebook','offerup'],   views: 47, offers: 3, emoji: '🎮' },
    { id: 2, title: 'IKEA Kallax Shelf Unit', price: 65,  status: 'negotiating',  markets: ['facebook','craigslist'],views: 23, offers: 2, emoji: '📦' },
    { id: 3, title: 'Lululemon Yoga Mat',     price: 45,  status: 'active',       markets: ['poshmark','offerup'],   views: 31, offers: 1, emoji: '🧘' },
  ],
  negotiations: [
    {
      id: 1, item: 'Sony PlayStation 5', listPrice: 380, currentOffer: 355, status: 'agreed',
      buyer: { name: 'Mike T.', trustScore: 94, initials: 'MT' },
      messages: [
        { from: 'buyer', text: 'Is this still available? Will you take $280?' },
        { from: 'ai', text: 'Hi! Yes, still available. Best I can do is $360 — includes 2 controllers and 3 games.' },
        { from: 'buyer', text: 'How about $320?' },
        { from: 'ai', text: 'Thanks for the offer! The best I can do is $355 — it\'s in perfect condition. Can you meet me there?' },
        { from: 'buyer', text: 'Deal! When can I pick it up?' },
      ],
    },
    {
      id: 2, item: 'IKEA Kallax Shelf Unit', listPrice: 65, currentOffer: 55, status: 'countered',
      buyer: { name: 'Sarah K.', trustScore: 87, initials: 'SK' },
      messages: [
        { from: 'buyer', text: 'Will you take $50 for the shelf?' },
        { from: 'ai', text: 'Hi Sarah! It\'s in great shape. My floor is $60 — sound good? 📦' },
        { from: 'buyer', text: 'How about $55?' },
      ],
    },
  ],
  stats: { sold: 12, rating: 4.8, earnings: 1247, active: 3 },
};

export default function App() {
  const [screen, setScreen]   = useState('splash');
  const [state, setState]     = useState(INITIAL_STATE);

  const navigate = useCallback((s) => {
    setScreen(s);
    // small scroll reset trick for full-height screens
    setTimeout(() => {
      const el = document.querySelector('.screen');
      if (el) el.scrollTop = 0;
    }, 50);
  }, []);

  const updateState   = useCallback((u) => setState(p => ({ ...p, ...u })), []);
  const updateListing = useCallback((u) => setState(p => ({ ...p, listing: { ...p.listing, ...u } })), []);

  const p = { state, updateState, updateListing, navigate };

  const screens = {
    splash:          <Splash          navigate={navigate} />,
    onboarding:      <Onboarding      {...p} />,
    home:            <Home            {...p} />,
    camera:          <Camera          {...p} />,
    processing:      <Processing      {...p} />,
    item_review:     <ItemReview      {...p} />,
    condition:       <Condition       {...p} />,
    pricing:         <Pricing         {...p} />,
    listing_preview: <ListingPreview  {...p} />,
    publishing:      <Publishing      {...p} />,
    success:         <Success         {...p} />,
    negotiation:     <Negotiation     {...p} />,
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {screens[screen] ?? screens.home}
      </div>
    </div>
  );
}
