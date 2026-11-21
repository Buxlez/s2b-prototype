import { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { PhoneFrame } from './app/PhoneFrame';
import { NavigationProvider, useNavigation } from './app/navigation';
import type { ScreenId } from './app/screens';
import { DISSOLVE_TRANSITION } from './app/transitions';
import { Home } from './screens/home/Home';
import { SetUp1 } from './screens/setup/SetUp1';

const loadPayment1 = () => import('./screens/payment/Payment1').then((m) => ({ default: m.Payment1 }));
const loadPayment2 = () => import('./screens/payment/Payment2').then((m) => ({ default: m.Payment2 }));
const loadPayment3 = () => import('./screens/payment/Payment3').then((m) => ({ default: m.Payment3 }));
const loadPayment4 = () => import('./screens/payment/Payment4').then((m) => ({ default: m.Payment4 }));
const loadPayment5 = () => import('./screens/payment/Payment5').then((m) => ({ default: m.Payment5 }));
const loadPayment6 = () => import('./screens/payment/Payment6').then((m) => ({ default: m.Payment6 }));

const loadSetUp2 = () => import('./screens/setup/SetUp2').then((m) => ({ default: m.SetUp2 }));
const loadSetUp3 = () => import('./screens/setup/SetUp3').then((m) => ({ default: m.SetUp3 }));
const loadSetUp4 = () => import('./screens/setup/SetUp4').then((m) => ({ default: m.SetUp4 }));
const loadSetUp5 = () => import('./screens/setup/SetUp5').then((m) => ({ default: m.SetUp5 }));
const loadSetUp6 = () => import('./screens/setup/SetUp6').then((m) => ({ default: m.SetUp6 }));

const loadCoop1 = () => import('./screens/cooperation/Cooperation1').then((m) => ({ default: m.Cooperation1 }));
const loadCoop2 = () => import('./screens/cooperation/Cooperation2').then((m) => ({ default: m.Cooperation2 }));
const loadCoop3 = () => import('./screens/cooperation/Cooperation3').then((m) => ({ default: m.Cooperation3 }));
const loadCoop4 = () => import('./screens/cooperation/Cooperation4').then((m) => ({ default: m.Cooperation4 }));
const loadCoop5 = () => import('./screens/cooperation/Cooperation5').then((m) => ({ default: m.Cooperation5 }));

const Payment1 = lazy(loadPayment1);
const Payment2 = lazy(loadPayment2);
const Payment3 = lazy(loadPayment3);
const Payment4 = lazy(loadPayment4);
const Payment5 = lazy(loadPayment5);
const Payment6 = lazy(loadPayment6);

const SetUp2 = lazy(loadSetUp2);
const SetUp3 = lazy(loadSetUp3);
const SetUp4 = lazy(loadSetUp4);
const SetUp5 = lazy(loadSetUp5);
const SetUp6 = lazy(loadSetUp6);

const Cooperation1 = lazy(loadCoop1);
const Cooperation2 = lazy(loadCoop2);
const Cooperation3 = lazy(loadCoop3);
const Cooperation4 = lazy(loadCoop4);
const Cooperation5 = lazy(loadCoop5);

const IDLE_PREFETCH_LOADERS = [
  loadPayment1,
  loadSetUp2,
  loadCoop1,
  loadPayment2,
  loadPayment3,
  loadPayment4,
  loadPayment5,
  loadPayment6,
  loadSetUp3,
  loadSetUp4,
  loadSetUp5,
  loadSetUp6,
  loadCoop2,
  loadCoop3,
  loadCoop4,
  loadCoop5,
];

function renderScreen(id: ScreenId) {
  switch (id) {
    case 'home':
      return <Home />;
    case 'payment-1':
      return <Payment1 />;
    case 'payment-2':
      return <Payment2 />;
    case 'payment-3':
      return <Payment3 />;
    case 'payment-4':
      return <Payment4 />;
    case 'payment-5':
      return <Payment5 />;
    case 'payment-6':
      return <Payment6 />;
    case 'setup-1':
      return <SetUp1 />;
    case 'setup-2':
      return <SetUp2 />;
    case 'setup-3':
      return <SetUp3 />;
    case 'setup-4':
      return <SetUp4 />;
    case 'setup-5':
      return <SetUp5 />;
    case 'setup-6':
      return <SetUp6 />;
    case 'coop-1':
      return <Cooperation1 />;
    case 'coop-2':
      return <Cooperation2 />;
    case 'coop-3':
      return <Cooperation3 />;
    case 'coop-4':
      return <Cooperation4 />;
    case 'coop-5':
      return <Cooperation5 />;
  }
}

const screenVariants = {
  initial: (instant: boolean) => ({ opacity: instant ? 1 : 0 }),
  animate: { opacity: 1 },
  exit: (instant: boolean) => ({
    opacity: 0,
    transition: instant ? { duration: 0 } : DISSOLVE_TRANSITION,
  }),
};

function ScreenViewport() {
  const { current, transitionInstant } = useNavigation();
  const activeTransition = transitionInstant ? { duration: 0 } : DISSOLVE_TRANSITION;

  return (
    <div style={{ position: 'relative', width: 402, height: 874, overflow: 'hidden' }}>
      <AnimatePresence initial={false} mode="sync" custom={transitionInstant}>
        <motion.div
          key={current}
          custom={transitionInstant}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={activeTransition}
          style={{
            position: 'absolute',
            inset: 0,
            width: 402,
            height: 874,
          }}
        >
          <Suspense fallback={null}>{renderScreen(current)}</Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const IDLE_PREFETCH_IMAGES = [
  './assets/payment-1/folder-illustration.webp',
  './assets/payment-2/bob-inspecting.webp',
  './assets/payment-2/papers-behind.webp',
  './assets/setup-4/icon-payroll.webp',
  './assets/setup-4/icon-supplier.webp',
  './assets/setup-4/icon-company.webp',
  './assets/setup-5/envelope-illustration.webp',
  './assets/setup-6/stuart-hero.webp',
];

export function App() {
  useEffect(() => {
    const prefetchAll = () => {
      IDLE_PREFETCH_LOADERS.forEach((load) => {
        void load();
      });
      IDLE_PREFETCH_IMAGES.forEach((src) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
      });
    };
    const t = window.setTimeout(prefetchAll, 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <NavigationProvider>
        <PhoneFrame>
          <ScreenViewport />
        </PhoneFrame>
      </NavigationProvider>
    </MotionConfig>
  );
}

export default App;
