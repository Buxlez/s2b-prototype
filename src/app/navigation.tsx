import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  parseHashToScreenId,
  screenIdToHash,
  type ScreenId,
} from './screens';

export type HomeState = 'A' | 'B';

export interface NavigateOptions {
  instant?: boolean;
}

interface NavigationContextValue {
  history: ScreenId[];
  current: ScreenId;
  canGoBack: boolean;
  homeState: HomeState;
  setHomeState: (state: HomeState) => void;
  navigate: (id: ScreenId, options?: NavigateOptions) => void;
  back: () => void;
  backOrTo: (target: ScreenId, nextHomeState?: HomeState) => void;
  transitionInstant: boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

function getInitialScreen(): ScreenId {
  if (typeof window === 'undefined') return 'home';
  return parseHashToScreenId(window.location.hash);
}

function getInitialHomeState(): HomeState {
  if (typeof window === 'undefined') return 'A';
  const cleaned = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  return cleaned === 'home-b' ? 'B' : 'A';
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = useState<ScreenId[]>(() => [getInitialScreen()]);
  const [homeState, setHomeState] = useState<HomeState>(getInitialHomeState);
  const [transitionInstant, setTransitionInstant] = useState(false);
  const ignoreHashChangeRef = useRef(false);
  const isFirstRenderRef = useRef(true);

  const current = history[history.length - 1];

  // Normalize initial hash or sync URL hash whenever `current` changes
  useEffect(() => {
    const rawCleaned = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      if (rawCleaned === 'home-b') return;
    }
    if (parseHashToScreenId(window.location.hash) === current && window.location.hash.startsWith('#/')) {
      return;
    }
    const targetHash = screenIdToHash(current);
    if (window.location.hash !== targetHash) {
      ignoreHashChangeRef.current = true;
      window.location.hash = targetHash;
      requestAnimationFrame(() => {
        ignoreHashChangeRef.current = false;
      });
    }
  }, [current]);

  // Sync manual hash edits or browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      if (ignoreHashChangeRef.current) {
        ignoreHashChangeRef.current = false;
        return;
      }
      setTransitionInstant(false);
      const rawCleaned = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
      if (rawCleaned === 'home-b') {
        setHomeState('B');
      } else if (rawCleaned === 'home-a') {
        setHomeState('A');
      }
      const nextId = parseHashToScreenId(window.location.hash);
      setHistory((prev) => {
        const top = prev[prev.length - 1];
        if (top === nextId) return prev;
        if (prev.length >= 2 && prev[prev.length - 2] === nextId) {
          return prev.slice(0, -1);
        }
        return [...prev, nextId];
      });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((id: ScreenId, options?: NavigateOptions) => {
    setTransitionInstant(Boolean(options?.instant));
    setHistory((prev) => {
      if (prev[prev.length - 1] === id) return prev;
      return [...prev, id];
    });
  }, []);

  const back = useCallback(() => {
    setTransitionInstant(false);
    setHistory((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  const backOrTo = useCallback((target: ScreenId, nextHomeState?: HomeState) => {
    setTransitionInstant(false);
    if (nextHomeState) {
      setHomeState(nextHomeState);
    }
    setHistory((prev) => {
      if (prev.length > 1 && prev[prev.length - 2] === target) {
        return prev.slice(0, -1);
      }
      if (prev[prev.length - 1] === target) return prev;
      return [...prev, target];
    });
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({
      history,
      current,
      canGoBack: history.length > 1,
      homeState,
      setHomeState,
      navigate,
      back,
      backOrTo,
      transitionInstant,
    }),
    [history, current, homeState, navigate, back, backOrTo, transitionInstant],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used inside NavigationProvider');
  }
  return ctx;
}

export function useAutoRedirect(
  from: ScreenId,
  target: ScreenId,
  delayMs: number,
  enabled = true,
) {
  const { current, navigate } = useNavigation();
  const isActive = enabled && current === from;

  useEffect(() => {
    if (!isActive) return;
    const timer = window.setTimeout(() => {
      navigate(target);
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [isActive, target, delayMs, navigate]);
}
