import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { SetUp1 } from '../setup/SetUp1';
import styles from './Home.module.css';

const AB_DRAG_DISTANCE = 320;
const AB_THRESHOLD = 0.35;
const AB_VELOCITY_THRESHOLD = 500;
const DRAWER_HEIGHT = 874;
const DRAWER_TOP_ZONE_MAX_Y = 154;
const DRAG_SLOP_PX = 6;

const HOME_SPRING = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 32,
  mass: 0.9,
  restDelta: 0.5,
  restSpeed: 5,
};
const DRAWER_SPRING = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 34,
  mass: 0.85,
  restDelta: 2,
  restSpeed: 20,
};

type GestureMode = 'idle' | 'a-to-b' | 'b-to-a' | 'b-to-setup' | 'mouse-scroll-b';

interface VelocitySample {
  y: number;
  t: number;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function Home() {
  const { homeState, setHomeState, navigate } = useNavigation();
  const isB = homeState === 'B';
  const prefersReducedMotion = Boolean(useReducedMotion());

  const screenRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const abProgress = useMotionValue(isB ? 1 : 0);
  const setupY = useMotionValue(-DRAWER_HEIGHT);
  const scrollY = useMotionValue(0);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const lastHomeStateRef = useRef(homeState);
  const internalHomeCommitRef = useRef(false);
  const abAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const drawerAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  const gestureRef = useRef<{
    active: boolean;
    pointerId: number;
    mode: GestureMode;
    startClientX: number;
    startClientY: number;
    startCanvasY: number;
    startScrollTop: number;
    handoffCanvasY: number | null;
    scale: number;
    samples: VelocitySample[];
  }>({
    active: false,
    pointerId: -1,
    mode: 'idle',
    startClientX: 0,
    startClientY: 0,
    startCanvasY: 0,
    startScrollTop: 0,
    handoffCanvasY: null,
    scale: 1,
    samples: [],
  });
  const preventClickRef = useRef(false);

  // Sync abProgress when homeState changes externally (StageSwitcher or navigation)
  useEffect(() => {
    if (homeState === lastHomeStateRef.current) return;
    lastHomeStateRef.current = homeState;
    if (internalHomeCommitRef.current) {
      internalHomeCommitRef.current = false;
      return;
    }
    abAnimRef.current?.stop();
    const target = homeState === 'B' ? 1 : 0;
    abAnimRef.current = animate(
      abProgress,
      target,
      prefersReducedMotion ? { duration: 0.3, ease: [0, 0, 0.2, 1] } : HOME_SPRING,
    );
    if (homeState === 'A' && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      scrollY.set(0);
    }
  }, [homeState, abProgress, scrollY, prefersReducedMotion]);

  // Ensure scrollTop resets when returning to State A
  useEffect(() => {
    if (!isB && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      scrollY.set(0);
    }
  }, [isB, scrollY]);

  // Continuous MotionValue transforms (no setState during drag)
  const bgImageOpacity = useTransform(abProgress, [0, 1], [1, 0.1]);
  const bgTintBOpacity = useTransform(abProgress, [0, 1], [0, 1]);
  const bottomGlowAOpacity = useTransform(abProgress, [0, 0.45], [1, 0]);

  const greetingOpacity = useTransform(abProgress, [0, 0.45], [1, 0]);
  const greetingY = useTransform(abProgress, (v) =>
    prefersReducedMotion ? 0 : -64 * Math.min(1, v / 0.6),
  );

  const summaryLeft = useTransform(abProgress, (v) => (prefersReducedMotion ? (v >= 0.5 ? 17 : 4) : 4 + 13 * v));
  const summaryTop = useTransform(abProgress, (v) => (prefersReducedMotion ? (v >= 0.5 ? 154 : 512) : 512 - 358 * v));
  const summaryWidth = useTransform(abProgress, (v) => (prefersReducedMotion ? (v >= 0.5 ? 368 : 393) : 393 - 25 * v));
  const summaryHeight = useTransform(abProgress, (v) => (prefersReducedMotion ? (v >= 0.5 ? 233 : 244) : 244 - 11 * v));
  const summaryShadowOpacity = useTransform(abProgress, [0, 1], [0, 1]);
  const summaryFadeAOpacity = useTransform(abProgress, [0, 0.6], [1, 0]);
  const summaryFadeBOpacity = useTransform(abProgress, [0.4, 1], [0, 1]);
  const summaryTextLeft = useTransform(abProgress, [0, 1], [32, 33]);
  const summaryPlusLeft = useTransform(abProgress, [0, 1], [104, 105]);
  const summaryFooterTop = useTransform(abProgress, [0, 1], [178, 176]);
  const refChipLeft = useTransform(abProgress, [0, 1], [32, 27]);
  const refChipBg = useTransform(abProgress, [0, 1], ['#dbe8f9', '#edf0f7']);
  const progressBarsLeft = useTransform(abProgress, [0, 1], [134, 121]);
  const statusWrapLeft = useTransform(abProgress, [0, 1], [293, 272]);
  const adGroupOpacity = useTransform(abProgress, [0.35, 1], [0, 1]);
  const adGroupScale = useTransform(abProgress, (v) =>
    prefersReducedMotion ? 1 : 0.86 + 0.14 * clamp((v - 0.35) / 0.65, 0, 1),
  );

  const stateBOpacity = useTransform(abProgress, [0.22, 0.88], [0, 1]);
  const stateBY = useTransform(abProgress, (v) => (prefersReducedMotion ? 0 : 160 * (1 - v)));
  const bottomFadeBOpacity = useTransform(abProgress, [0.35, 1], [0, 1]);
  const topFadeBOpacity = useTransform([abProgress, scrollY], (latest: number[]) => {
    const p = latest[0] ?? 0;
    const sy = latest[1] ?? 0;
    const stateWeight = clamp((p - 0.35) / 0.65, 0, 1);
    const scrollWeight = clamp(sy / 10, 0, 1);
    return stateWeight * scrollWeight;
  });
  const summaryGlassBoxShadow = useTransform(
    summaryShadowOpacity,
    (o) => `0px 1px 10.6px 0px rgba(0, 0, 0, ${0.03 * o})`,
  );

  const drawerBackdropOpacity = useTransform(setupY, [-DRAWER_HEIGHT, 0], [0, 0.22]);
  const homeScaleDuringDrawer = useTransform(setupY, (v) =>
    prefersReducedMotion ? 1 : 1 - 0.04 * clamp((v + DRAWER_HEIGHT) / DRAWER_HEIGHT, 0, 1),
  );
  const drawerReducedOpacity = useTransform(setupY, [-DRAWER_HEIGHT, 0], [0, 1]);
  const drawerRenderY = useTransform(setupY, (v) => (prefersReducedMotion ? 0 : v));

  // Prevent browser native touch scroll / rubber-band only when our custom gesture owns the drag
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const onTouchMove = (ev: TouchEvent) => {
      const m = gestureRef.current.mode;
      if (m === 'a-to-b' || m === 'b-to-a' || m === 'b-to-setup') {
        if (ev.cancelable) ev.preventDefault();
      }
    };
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMove);
  }, []);

  // Attach global pointermove / pointerup listeners for rock-solid drag tracking across the frame
  useEffect(() => {
    const pushSample = (canvasY: number) => {
      const now = performance.now();
      const s = gestureRef.current.samples;
      s.push({ y: canvasY, t: now });
      while (s.length > 2 && now - s[0].t > 90) {
        s.shift();
      }
    };

    const getVelocityY = (): number => {
      const s = gestureRef.current.samples;
      if (s.length < 2) return 0;
      const first = s[0];
      const last = s[s.length - 1];
      const dt = (last.t - first.t) / 1000;
      if (dt < 0.008) return 0;
      return (last.y - first.y) / dt;
    };

    const onPointerMove = (e: PointerEvent) => {
      const g = gestureRef.current;
      if (!g.active || e.pointerId !== g.pointerId) return;

      const rawDx = e.clientX - g.startClientX;
      const rawDy = e.clientY - g.startClientY;
      const dx = rawDx / g.scale;
      const dy = rawDy / g.scale;

      const rect = screenRef.current?.getBoundingClientRect();
      const canvasY = rect ? (e.clientY - rect.top) / g.scale : e.clientY;
      pushSample(canvasY);

      if (g.mode === 'idle') {
        if (Math.hypot(dx, dy) < DRAG_SLOP_PX) return;
        if (Math.abs(dy) < Math.abs(dx)) {
          g.active = false;
          return;
        }

        if (homeState === 'A') {
          if (dy < 0) {
            abAnimRef.current?.stop();
            g.mode = 'a-to-b';
            preventClickRef.current = true;
          } else {
            g.active = false;
            return;
          }
        } else {
          // State B: top zone pull-down triggers Set up-1 负一屏 drawer
          if (g.startCanvasY <= DRAWER_TOP_ZONE_MAX_Y && dy > 0) {
            drawerAnimRef.current?.stop();
            g.mode = 'b-to-setup';
            preventClickRef.current = true;
            setDrawerVisible(true);
          } else if (g.startScrollTop <= 1 && dy > 0) {
            abAnimRef.current?.stop();
            g.mode = 'b-to-a';
            preventClickRef.current = true;
          } else if (e.pointerType === 'mouse') {
            g.mode = 'mouse-scroll-b';
            preventClickRef.current = true;
          } else {
            // Native touch scroll in State B
            g.active = false;
            return;
          }
        }
      }

      if (g.mode === 'a-to-b') {
        const nextP = clamp(-dy / AB_DRAG_DISTANCE, 0, 1);
        abProgress.set(nextP);
      } else if (g.mode === 'b-to-setup') {
        const nextY = clamp(-DRAWER_HEIGHT + dy, -DRAWER_HEIGHT, 0);
        setupY.set(nextY);
      } else if (g.mode === 'mouse-scroll-b') {
        const scroller = scrollRef.current;
        if (!scroller) return;
        const targetScroll = g.startScrollTop - dy;
        if (targetScroll <= 0) {
          scroller.scrollTop = 0;
          scrollY.set(0);
          g.mode = 'b-to-a';
          g.handoffCanvasY = canvasY;
          abAnimRef.current?.stop();
        } else {
          scroller.scrollTop = targetScroll;
          scrollY.set(targetScroll);
        }
      } else if (g.mode === 'b-to-a') {
        const baseY = g.handoffCanvasY !== null ? canvasY - g.handoffCanvasY : dy;
        const nextP = clamp(1 - Math.max(0, baseY) / AB_DRAG_DISTANCE, 0, 1);
        abProgress.set(nextP);
      }
    };

    const finishDrag = (e: PointerEvent) => {
      const g = gestureRef.current;
      if (!g.active || e.pointerId !== g.pointerId) return;
      const mode = g.mode;
      g.active = false;
      g.mode = 'idle';

      const vy = getVelocityY();

      if (mode === 'a-to-b') {
        const p = abProgress.get();
        const shouldOpenB = p >= AB_THRESHOLD || -vy >= AB_VELOCITY_THRESHOLD;
        internalHomeCommitRef.current = true;
        lastHomeStateRef.current = shouldOpenB ? 'B' : 'A';
        setHomeState(shouldOpenB ? 'B' : 'A');
        abAnimRef.current = animate(
          abProgress,
          shouldOpenB ? 1 : 0,
          prefersReducedMotion ? { duration: 0.3, ease: [0, 0, 0.2, 1] } : HOME_SPRING,
        );
      } else if (mode === 'b-to-a') {
        const p = abProgress.get();
        const shouldReturnA = p <= 1 - AB_THRESHOLD || vy >= AB_VELOCITY_THRESHOLD;
        internalHomeCommitRef.current = true;
        lastHomeStateRef.current = shouldReturnA ? 'A' : 'B';
        setHomeState(shouldReturnA ? 'A' : 'B');
        abAnimRef.current = animate(
          abProgress,
          shouldReturnA ? 0 : 1,
          prefersReducedMotion ? { duration: 0.3, ease: [0, 0, 0.2, 1] } : HOME_SPRING,
        );
      } else if (mode === 'b-to-setup') {
        const curY = setupY.get();
        const progress = (curY + DRAWER_HEIGHT) / DRAWER_HEIGHT;
        const shouldOpenSetup =
          progress >= 0.22 || vy >= 420;
        drawerAnimRef.current?.stop();
        if (shouldOpenSetup) {
          drawerAnimRef.current = animate(setupY, 0, {
            ...(prefersReducedMotion
              ? { duration: 0.3, ease: [0, 0, 0.2, 1] }
              : { ...DRAWER_SPRING, velocity: clamp(vy, 0, 2200) }),
            onComplete: () => {
              if (Math.abs(setupY.get()) < 3) {
                navigate('setup-1', { instant: true });
              }
            },
          });
        } else {
          drawerAnimRef.current = animate(setupY, -DRAWER_HEIGHT, {
            ...(prefersReducedMotion ? { duration: 0.25, ease: [0, 0, 0.2, 1] } : DRAWER_SPRING),
            onComplete: () => {
              if (setupY.get() <= -DRAWER_HEIGHT + 2) {
                setDrawerVisible(false);
              }
            },
          });
        }
      }

      if (preventClickRef.current) {
        window.setTimeout(() => {
          preventClickRef.current = false;
        }, 60);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', finishDrag);
    window.addEventListener('pointercancel', finishDrag);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', finishDrag);
      window.removeEventListener('pointercancel', finishDrag);
    };
  }, [homeState, setHomeState, navigate, abProgress, setupY, prefersReducedMotion]);

  const handlePointerDownCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const rect = screenRef.current?.getBoundingClientRect();
    const scale = rect && rect.height > 0 ? rect.height / 874 : 1;
    const startCanvasY = rect ? (e.clientY - rect.top) / scale : e.clientY;
    preventClickRef.current = false;

    gestureRef.current = {
      active: true,
      pointerId: e.pointerId,
      mode: 'idle',
      startClientX: e.clientX,
      startClientY: e.clientY,
      startCanvasY,
      startScrollTop: scrollRef.current?.scrollTop ?? 0,
      handoffCanvasY: null,
      scale,
      samples: [{ y: startCanvasY, t: performance.now() }],
    };
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (preventClickRef.current) {
      preventClickRef.current = false;
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={screenRef}
      className={styles.screen}
      onPointerDownCapture={handlePointerDownCapture}
      onClickCapture={handleClickCapture}
    >
      <motion.div
        className={styles.stageContainer}
        style={{ scale: homeScaleDuringDrawer }}
      >
        <SystemBar showDynamicIsland={false} />

        {/* Background layer */}
        <div className={styles.bgWrapper}>
          <motion.img
            src="./assets/home/bg-gradient.webp"
            alt=""
            className={styles.bgImage}
            style={{ opacity: bgImageOpacity }}
            fetchPriority="high"
            decoding="sync"
          />
          <motion.div className={styles.bgTintB} style={{ opacity: bgTintBOpacity }} />
        </div>

        {/* State A bottom glow behind search bar */}
        <motion.div
          className={styles.bottomGlowA}
          style={{ opacity: bottomGlowAOpacity }}
          aria-hidden
        />

        {/* True 7-tier iOS progressive blur header veil in State B when scrolled */}
        <motion.div
          className={styles.topFadeLayer}
          style={{ opacity: topFadeBOpacity }}
          aria-hidden
        >
          <div className={`${styles.topBlurSlice} ${styles.topBlur1}`} />
          <div className={`${styles.topBlurSlice} ${styles.topBlur2}`} />
          <div className={`${styles.topBlurSlice} ${styles.topBlur3}`} />
          <div className={`${styles.topBlurSlice} ${styles.topBlur4}`} />
          <div className={`${styles.topBlurSlice} ${styles.topBlur5}`} />
          <div className={`${styles.topBlurSlice} ${styles.topBlur6}`} />
          <div className={`${styles.topBlurSlice} ${styles.topBlur7}`} />
          <div className={styles.topTintOverlay} />
        </motion.div>

        {/* Fixed Top Bar (y 67..133) */}
        <div className={styles.topBar}>
          <button type="button" className={`${styles.bellBtn} pressable`} aria-label="Notifications">
            <img src="./assets/home/top-bell-bg.svg" alt="" className={styles.bellBgImg} />
            <img src="./assets/home/icon-bell-alert.svg" alt="" className={styles.bellIcon} />
          </button>

          <div className={styles.centerPill}>
            <div className={styles.botCircleBg}>
              <img src="./assets/home/top-bot-bg.svg" alt="" className={styles.fullImg} />
            </div>

            <button
              type="button"
              className={`${styles.botBtn} pressable`}
              aria-label="AI Agents"
            >
              <div className={styles.botGlow}>
                <img src="./assets/home/bot-glow.svg" alt="" className={styles.fullImg} />
              </div>
              <div className={styles.botCharacter}>
                <div
                  className={styles.botBodyMask}
                  style={{
                    maskImage: 'url("./assets/home/bot-mask.svg")',
                    WebkitMaskImage: 'url("./assets/home/bot-mask.svg")',
                  }}
                >
                  <div className={styles.botBodyInner}>
                    <img src="./assets/home/bot-body.svg" alt="" className={styles.fullImg} />
                  </div>
                </div>
                <div className={styles.botEyes}>
                  <img src="./assets/home/bot-eyes.svg" alt="" className={styles.fullImg} />
                </div>
              </div>
            </button>

            <button type="button" className={`${styles.alarmBtn} pressable`} aria-label="Reminders">
              <div className={styles.alarmRingWrap}>
                <img src="./assets/home/top-alarm-ring.svg" alt="" className={styles.fullImg} />
              </div>
              <img src="./assets/home/top-alarm-bg.svg" alt="" className={styles.fullImg} />
              <div className={styles.alarmIconWrap}>
                <img src="./assets/home/icon-alarm.svg" alt="" className={styles.fullImg} />
              </div>
            </button>
          </div>

          <button type="button" className={`${styles.avatarBtn} pressable`} aria-label="Samuel profile">
            <div className={styles.avatarShadowWrap}>
              <img src="./assets/home/avatar-samuel.webp" alt="Samuel" className={styles.fullImg} />
            </div>
          </button>
        </div>

        {/* State A Greeting */}
        <motion.div
          className={styles.greeting}
          style={{
            opacity: greetingOpacity,
            y: greetingY,
            pointerEvents: isB ? 'none' : 'auto',
          }}
        >
          <p className={styles.dateText}>Wed, Aug 23</p>
          <div className={styles.greetingTitle}>
            <p>Good Morning,</p>
            <p>Samuel</p>
          </div>
        </motion.div>

        {/* Unified Content / Scrollable Area for State A -> B */}
        <div
          ref={scrollRef}
          className={styles.contentViewport}
          style={{
            overflowY: isB ? 'auto' : 'hidden',
            touchAction: isB ? 'pan-y' : 'none',
          }}
          onScroll={(e) => {
            scrollY.set(e.currentTarget.scrollTop);
          }}
        >
          <div className={`${styles.contentInner} ${isB ? styles.contentInnerB : ''}`}>
            {/* Shared AI Summary Card */}
            <motion.div
              className={styles.summaryCard}
              style={{
                left: summaryLeft,
                top: summaryTop,
                width: summaryWidth,
                height: summaryHeight,
              }}
            >
              <motion.div
                className={styles.summaryGlass}
                style={{ boxShadow: summaryGlassBoxShadow }}
              />
              <div className={styles.summaryMaskClip}>
                <motion.div
                  className={`${styles.summaryFade} ${styles.summaryFadeA}`}
                  style={{ opacity: summaryFadeAOpacity }}
                />
                <motion.div
                  className={`${styles.summaryFade} ${styles.summaryFadeB}`}
                  style={{ opacity: summaryFadeBOpacity }}
                />
              </div>

              <div className={styles.summaryLabelRow}>
                <motion.span className={styles.summaryLabel} style={{ left: summaryTextLeft }}>
                  AI Summary
                </motion.span>
                <motion.span className={styles.summaryPlus} style={{ left: summaryPlusLeft }}>
                  +
                </motion.span>
              </div>

              <motion.p className={styles.summaryTitle} style={{ left: summaryTextLeft }}>
                The payment date needs to be corrected
              </motion.p>
              <motion.p className={styles.summaryAuthor} style={{ left: summaryTextLeft }}>
                By Ajith
              </motion.p>

              {/* AD + Ajith Avatar Group (fades in for State B) */}
              <motion.div
                className={styles.adGroup}
                style={{ opacity: adGroupOpacity, scale: adGroupScale }}
              >
                <div className={styles.adCircleWrap}>
                  <img src="./assets/home/ad-circle.svg" alt="" className={styles.fullImg} />
                </div>
                <span className={styles.adText}>AD</span>
                <div className={styles.adConnectorWrap}>
                  <img src="./assets/home/ad-connector.svg" alt="" className={styles.fullImg} />
                </div>
                <div className={styles.ajithAvatarWrap}>
                  <img src="./assets/home/avatar-ajith.webp" alt="Ajith" className={styles.fullImg} />
                </div>
              </motion.div>

              <motion.div className={styles.summaryFooter} style={{ top: summaryFooterTop }}>
                <motion.div
                  className={styles.refChip}
                  style={{ left: refChipLeft, backgroundColor: refChipBg }}
                >
                  # REF00192
                </motion.div>

                <motion.div className={styles.progressBars} style={{ left: progressBarsLeft }}>
                  <span className={styles.barBlue} style={{ width: 29.74 }} />
                  <span className={styles.barBlue} style={{ width: 29.74 }} />
                  <span className={styles.barWhite} style={{ width: 28.78 }} />
                  <span className={styles.barWhite} style={{ width: 30.7 }} />
                </motion.div>

                <motion.div className={styles.statusWrap} style={{ left: statusWrapLeft }}>
                  <img src="./assets/home/dot-rejected.svg" alt="" className={styles.statusDot} />
                  <div>
                    <p className={styles.statusTitle}>Rejected</p>
                    <p className={styles.statusTime}>06:30 PM</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* State B Sections (For You + AI Suggestions) */}
            <motion.div
              className={styles.stateBSections}
              style={{
                opacity: stateBOpacity,
                y: stateBY,
                pointerEvents: isB ? 'auto' : 'none',
              }}
            >
              <p className={styles.forYouHeading}>For You</p>

              {/* Three Tilted For You Cards */}
              <div className={styles.forYouCardsWrap}>
                {/* Card 1: Initiate payment (-6.44deg) */}
                <button
                  type="button"
                  className={`${styles.cardInitiateWrap} pressable`}
                  aria-label="Initiate payment"
                  onClick={() => navigate('payment-1')}
                >
                  <div className={styles.cardInitiateInner}>
                    <div className={styles.forYouGlassCard} />
                    <div className={styles.initiateSpriteBox}>
                      <img
                        src="./assets/home/cards-sprite.webp"
                        alt=""
                        className={styles.initiateSpriteImg}
                      />
                    </div>
                    <p className={styles.initiateTitle}>Initiate payment</p>
                    <div className={styles.startPill}>
                      <span className={styles.startPillText}>Start</span>
                      <img
                        src="./assets/home/icon-arrow-down.svg"
                        alt=""
                        className={styles.startArrow}
                      />
                    </div>
                  </div>
                </button>

                {/* Card 2: Cash Service (+7.9deg) */}
                <button
                  type="button"
                  className={`${styles.cardCashWrap} pressable`}
                  aria-label="Cash Service"
                >
                  <div className={styles.cardCashInner}>
                    <div className={styles.forYouGlassCard} />
                    <div className={styles.cashSpriteBox}>
                      <img
                        src="./assets/home/cards-sprite.webp"
                        alt=""
                        className={styles.cashSpriteImg}
                      />
                    </div>
                    <div className={styles.cashTitle}>
                      <p>Cash</p>
                      <p>Service</p>
                    </div>
                    <div className={styles.startPill}>
                      <span className={styles.startPillText}>Start</span>
                      <img
                        src="./assets/home/icon-arrow-down.svg"
                        alt=""
                        className={styles.startArrow}
                      />
                    </div>
                  </div>
                </button>

                {/* Card 3: Account Balance (-7.3deg) */}
                <button
                  type="button"
                  className={`${styles.cardBalanceWrap} pressable`}
                  aria-label="Account Balance"
                >
                  <div className={styles.cardBalanceInner}>
                    <div className={styles.balanceGlassCard} />
                    <span className={styles.balanceCurrency}>SGD</span>
                    <span className={styles.balanceValue}>900 M</span>
                    <div className={styles.balanceChartBox}>
                      <img
                        src="./assets/home/chart-balance.webp"
                        alt=""
                        className={styles.balanceChartImg}
                      />
                    </div>
                    <p className={styles.balanceTitle}>Account Balance</p>
                  </div>
                </button>
              </div>

              {/* AI Suggestions */}
              <div className={styles.suggestionsHeadingRow}>
                <p className={styles.suggestionsHeading}>AI Suggestions</p>
                <span className={styles.suggestionsPlus}>+</span>
              </div>

              <div className={styles.suggestionCard}>
                <div className={styles.suggestionTopRow}>
                  <div>
                    <p className={styles.suggestionVendor}>Lim Supplies</p>
                    <p className={styles.suggestionAmount}>SGD 50,000</p>
                  </div>
                  <div className={styles.suggestionDate}>
                    <img src="./assets/home/icon-clock.svg" alt="" className={styles.clockIcon} />
                    <span>14 Nov</span>
                  </div>
                </div>

                <img src="./assets/home/line-divider.svg" alt="" className={styles.suggestionDivider} />

                <div className={styles.suggestionPayToRow}>
                  <div className={styles.suggestionAvatarWrap}>
                    <img
                      src="./assets/home/avatar-samuel.webp"
                      alt=""
                      className={styles.fullImg}
                    />
                  </div>
                  <div className={styles.suggestionPayToText}>
                    <p className={styles.payToLabel}>PAY TO</p>
                    <p className={styles.payToName}>Greenwood Properties</p>
                  </div>
                </div>

                <div className={styles.suggestionActions}>
                  <button type="button" className={`${styles.suggestionBtn} pressable`}>
                    <span>Remind me later</span>
                    <img src="./assets/home/icon-bell-white.svg" alt="" className={styles.btnIcon} />
                  </button>
                  <button type="button" className={`${styles.suggestionBtn} pressable`}>
                    <span>Prepare the payment</span>
                    <img src="./assets/home/icon-arrow-right.svg" alt="" className={styles.btnIcon} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Search Bar + Mic (fixed) */}
        <div className={styles.bottomBar}>
          <motion.div
            className={styles.bottomFadeB}
            style={{ opacity: bottomFadeBOpacity }}
            aria-hidden
          />
          <button type="button" className={`${styles.searchPill} pressable`}>
            <span className={styles.searchPlaceholder}>Search or get things done…</span>
          </button>
          <button type="button" className={`${styles.micBtn} pressable`} aria-label="Voice input">
            <img src="./assets/home/mic-circle.svg" alt="" className={styles.micCircleBg} />
            <img src="./assets/home/icon-mic.svg" alt="" className={styles.micIcon} />
          </button>
        </div>
      </motion.div>

      {/* Top Pull-Down Drawer ("负一屏") revealing Set up-1 from Homepage-2 top */}
      {drawerVisible && (
        <>
          <motion.div
            className={styles.drawerBackdrop}
            style={{ opacity: drawerBackdropOpacity }}
            aria-hidden
          />
          <motion.div
            className={styles.drawerLayer}
            style={{
              y: drawerRenderY,
              opacity: prefersReducedMotion ? drawerReducedOpacity : 1,
            }}
            aria-hidden
          >
            <SetUp1 />
          </motion.div>
        </>
      )}
    </div>
  );
}
