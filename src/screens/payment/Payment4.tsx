import {
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Payment4.module.css';

interface BatchItem {
  num: string;
  name: string;
  account: string;
  amount: string;
}

const BATCH_ITEMS: readonly BatchItem[] = [
  { num: '1', name: 'Pacific Timber', account: '112-890341-5', amount: '24,500.00' },
  { num: '2', name: 'Merlion Print', account: '501-234567-9', amount: '6,450.00' },
  { num: '3', name: 'Orchid Logistics', account: '387-123456-1', amount: '18,750.00' },
  { num: '4', name: 'Kopi Supply Co', account: '019-876543-2', amount: '12,400.00' },
  { num: '5', name: 'Harbour Freight', account: '624-451908-3', amount: '31,200.00' },
  { num: '6', name: 'Raffles Paper', account: '409-772134-0', amount: '9,800.00' },
  { num: '7', name: 'Bayfront Tech', account: '752-338901-6', amount: '15,650.00' },
];

const INITIAL_INDEX = 2; // Row 3: Orchid Logistics
const ITEM_COUNT = BATCH_ITEMS.length;
const DRAG_STEP_PX = 76;
const DRAG_SLOP_PX = 6;
const ROW_HEIGHT = 44;

// Cubic-bezier ease-in-out curves (渐入渐出)
const EASE_IN_OUT_SLOT = [0.42, 0, 0.16, 1] as const;
const EASE_IN_OUT_STEP = [0.42, 0, 0.2, 1] as const;
const EASE_FLICK_OUT = [0.22, 0.68, 0.16, 1] as const;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function smoothstep(t: number): number {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
}

function normalizeIdx(raw: number, count: number): number {
  return ((Math.round(raw) % count) + count) % count;
}

function circularOffset(index: number, pos: number, count: number): number {
  let d = (((index - pos) % count) + count) % count;
  if (d > count / 2) d -= count;
  return d;
}

interface SlotCardProps {
  item: BatchItem;
  index: number;
  reelPos: MotionValue<number>;
  prefersReducedMotion: boolean;
  isActive: boolean;
}

function SlotCard({ item, index, reelPos, prefersReducedMotion, isActive }: SlotCardProps) {
  const y = useTransform(reelPos, (pos) => {
    const d = circularOffset(index, pos, ITEM_COUNT);
    const ad = Math.abs(d);
    const sgn = d < 0 ? -1 : 1;

    if (prefersReducedMotion) {
      if (ad <= 1) return sgn * 18 * smoothstep(ad);
      if (ad <= 2) return sgn * (18 + 18 * smoothstep(ad - 1));
      return sgn * 36;
    }

    // C1 smooth displacement: exact Figma positions (-36, -18, 0, 18, 36) at integer steps
    // with a graceful sine-squared arc peaking smoothly mid-transition
    const baseY = ad <= 1 ? 18 * ad : ad <= 2 ? 18 + 18 * smoothstep(ad - 1) : 36;
    const peelY = ad < 1 ? 42 * Math.sin(Math.PI * ad) ** 2 : 0;
    return sgn * (baseY + peelY);
  });

  const rotateX = useTransform(reelPos, (pos) => {
    if (prefersReducedMotion) return 0;
    const d = circularOffset(index, pos, ITEM_COUNT);
    if (Math.abs(d) >= 1) return 0;
    return -10 * Math.sin(Math.PI * d);
  });

  const scale = useTransform(reelPos, (pos) => {
    const ad = Math.abs(circularOffset(index, pos, ITEM_COUNT));
    if (ad <= 1) return 1 - (1 - 320 / 344) * smoothstep(ad);
    if (ad <= 2) return 320 / 344 - (320 / 344 - 296 / 344) * smoothstep(ad - 1);
    return 296 / 344 - 0.05 * smoothstep((ad - 2) / 1.5);
  });

  const opacity = useTransform(reelPos, (pos) => {
    const ad = Math.abs(circularOffset(index, pos, ITEM_COUNT));
    if (ad <= 1) return 1 - 0.2 * smoothstep(ad);
    if (ad <= 2) return 0.8 - 0.3 * smoothstep(ad - 1);
    if (ad <= 2.65) return 0.5 * (1 - smoothstep((ad - 2) / 0.65));
    return 0;
  });

  const borderRadius = useTransform(reelPos, (pos) => {
    const ad = Math.abs(circularOffset(index, pos, ITEM_COUNT));
    return ad < 1 ? 28 - 4 * smoothstep(ad) : 24;
  });

  const zIndex = useTransform(reelPos, (pos) => {
    const ad = Math.abs(circularOffset(index, pos, ITEM_COUNT));
    return Math.max(1, Math.round(60 - ad * 16));
  });

  // Winner card stays saturated & legible across |d| <= 0.5, easing smoothly to frosted glass by |d| = 0.95
  const heroOpacity = useTransform(reelPos, (pos) => {
    const ad = Math.abs(circularOffset(index, pos, ITEM_COUNT));
    if (ad <= 0.25) return 1;
    if (ad <= 0.95) return 1 - smoothstep((ad - 0.25) / 0.7);
    return 0;
  });

  const darkTextOpacity = useTransform(reelPos, (pos) => {
    if (prefersReducedMotion) return 0;
    const ad = Math.abs(circularOffset(index, pos, ITEM_COUNT));
    if (ad <= 0.35 || ad >= 1) return 0;
    const appear = smoothstep((ad - 0.35) / 0.3);
    const tuckFade = 1 - smoothstep((ad - 0.72) / 0.28);
    return 0.72 * appear * tuckFade;
  });

  return (
    <motion.div
      className={styles.cardSlot}
      data-slot-index={index}
      data-active={isActive ? 'true' : 'false'}
      style={{ y, scale, rotateX, opacity, borderRadius, zIndex }}
      aria-hidden={!isActive}
    >
      <div className={styles.cardGlassSurface} />
      <motion.div className={styles.cardHeroSurface} style={{ opacity: heroOpacity }} />

      <motion.div className={styles.cardContentDark} style={{ opacity: darkTextOpacity }}>
        <p className={styles.drawnTitle}>{item.name}</p>
        <div className={styles.drawnBottomRow}>
          <p className={styles.drawnAccount}>{item.account}</p>
          <p className={styles.drawnAmount}>SGD {item.amount}</p>
        </div>
      </motion.div>

      <motion.div className={styles.cardContent} style={{ opacity: heroOpacity }}>
        <p className={styles.drawnTitle}>{item.name}</p>
        <div className={styles.drawnBottomRow}>
          <p className={styles.drawnAccount}>{item.account}</p>
          <p className={styles.drawnAmount}>SGD {item.amount}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const LOOPED_ROWS = [...BATCH_ITEMS, ...BATCH_ITEMS, ...BATCH_ITEMS] as const;

export function Payment4() {
  const { navigate } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());

  const stackRef = useRef<HTMLDivElement>(null);
  const reelPos = useMotionValue(INITIAL_INDEX);
  const [activeIdx, setActiveIdx] = useState(INITIAL_INDEX);
  const activeIdxRef = useRef(INITIAL_INDEX);
  const [isDragging, setIsDragging] = useState(false);

  // Synchronized continuous vertical scroll in Original file (triple-copy wrap -> zero seam jump)
  const rowsTrackY = useTransform(reelPos, (pos) => {
    const wrapped = ((pos % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT;
    return -(ITEM_COUNT - 1 + wrapped) * ROW_HEIGHT;
  });

  // Highlight frame stays crisp when locked onto a row and softens smoothly mid-spin
  const highlightOpacity = useTransform(reelPos, (pos) => {
    const frac = Math.abs(pos - Math.round(pos)); // 0 at integer lock, 0.5 mid-spin
    return 1 - 0.55 * smoothstep(frac / 0.5);
  });

  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const dragRef = useRef<{
    active: boolean;
    pointerId: number;
    startClientY: number;
    startPos: number;
    startCanvasY: number;
    maxMovedPx: number;
    scale: number;
    samples: Array<{ y: number; t: number }>;
  }>({
    active: false,
    pointerId: -1,
    startClientY: 0,
    startPos: INITIAL_INDEX,
    startCanvasY: 0,
    maxMovedPx: 0,
    scale: 1,
    samples: [],
  });

  useMotionValueEvent(reelPos, 'change', (latest) => {
    const nextIdx = normalizeIdx(latest, ITEM_COUNT);
    if (nextIdx !== activeIdxRef.current) {
      activeIdxRef.current = nextIdx;
      setActiveIdx(nextIdx);
    }
  });

  useEffect(() => {
    return () => {
      animRef.current?.stop();
    };
  }, []);

  const spinToTarget = (
    targetPos: number,
    mode: 'easeInOutSpin' | 'flickOut' | 'step' = 'step',
  ) => {
    animRef.current?.stop();
    if (prefersReducedMotion) {
      reelPos.set(targetPos);
      return;
    }

    const dist = Math.abs(targetPos - reelPos.get());
    if (mode === 'step') {
      animRef.current = animate(reelPos, targetPos, {
        duration: clamp(0.36 + dist * 0.14, 0.42, 0.72),
        ease: EASE_IN_OUT_STEP,
      });
      return;
    }

    animRef.current = animate(reelPos, targetPos, {
      duration: clamp(1.0 + dist * 0.045, 1.08, 1.48),
      ease: mode === 'flickOut' ? EASE_FLICK_OUT : EASE_IN_OUT_SLOT,
    });
  };

  const triggerRandomSlotDraw = (dir: 1 | -1 = 1) => {
    const base = Math.round(reelPos.get());
    const randomOffset = 1 + Math.floor(Math.random() * (ITEM_COUNT - 1));
    const steps = ITEM_COUNT + randomOffset;
    spinToTarget(base + dir * steps, 'easeInOutSpin');
  };

  const selectRowByIndex = (targetIdx: number) => {
    const currentPos = reelPos.get();
    const diff = circularOffset(targetIdx, Math.round(currentPos), ITEM_COUNT);
    if (diff === 0) {
      triggerRandomSlotDraw(1);
      return;
    }
    spinToTarget(Math.round(currentPos) + diff, 'step');
  };

  const handlersRef = useRef({
    spinToTarget,
    triggerRandomSlotDraw,
  });
  handlersRef.current = { spinToTarget, triggerRandomSlotDraw };

  useEffect(() => {
    const pushSample = (y: number) => {
      const now = performance.now();
      const samples = dragRef.current.samples;
      samples.push({ y, t: now });
      while (samples.length > 2 && now - samples[0].t > 90) {
        samples.shift();
      }
    };

    const getVelocityY = () => {
      const samples = dragRef.current.samples;
      if (samples.length < 2) return 0;
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = (last.t - first.t) / 1000;
      if (dt < 0.008) return 0;
      return (last.y - first.y) / dt;
    };

    const onPointerMove = (e: PointerEvent) => {
      const g = dragRef.current;
      if (!g.active || e.pointerId !== g.pointerId) return;

      const rawDy = e.clientY - g.startClientY;
      const dy = rawDy / g.scale;
      g.maxMovedPx = Math.max(g.maxMovedPx, Math.abs(dy));

      const rect = stackRef.current?.getBoundingClientRect();
      const canvasY = rect ? (e.clientY - rect.top) / g.scale : e.clientY;
      pushSample(canvasY);

      if (g.maxMovedPx >= DRAG_SLOP_PX) {
        reelPos.set(g.startPos - dy / DRAG_STEP_PX);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const g = dragRef.current;
      if (!g.active || e.pointerId !== g.pointerId) return;
      g.active = false;
      setIsDragging(false);

      const vy = getVelocityY();
      const velCards = -vy / DRAG_STEP_PX;

      if (g.maxMovedPx < DRAG_SLOP_PX) {
        if (g.startCanvasY < 48) {
          handlersRef.current.spinToTarget(Math.round(reelPos.get()) - 1, 'step');
        } else if (g.startCanvasY > 168) {
          handlersRef.current.spinToTarget(Math.round(reelPos.get()) + 1, 'step');
        } else {
          handlersRef.current.triggerRandomSlotDraw(1);
        }
        return;
      }

      if (Math.abs(velCards) >= 3.4) {
        const dir: 1 | -1 = velCards > 0 ? 1 : -1;
        const speedCards = clamp(Math.round(Math.abs(velCards) * 0.65), 6, 12);
        const curRounded = Math.round(reelPos.get());
        let target = curRounded + dir * speedCards;
        if (normalizeIdx(target, ITEM_COUNT) === normalizeIdx(g.startPos, ITEM_COUNT)) {
          target += dir;
        }
        handlersRef.current.spinToTarget(target, 'flickOut');
      } else {
        const deltaCards = reelPos.get() - g.startPos;
        let target = Math.round(reelPos.get());
        if (Math.abs(deltaCards) >= 0.35 && Math.round(reelPos.get()) === Math.round(g.startPos)) {
          target = Math.round(g.startPos) + (deltaCards > 0 ? 1 : -1);
        }
        handlersRef.current.spinToTarget(target, 'step');
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [reelPos]);

  const handleStackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    animRef.current?.stop();

    const rect = stackRef.current?.getBoundingClientRect();
    const scale = rect && rect.height > 0 ? rect.height / 224 : 1;
    const startCanvasY = rect ? (e.clientY - rect.top) / scale : 108;

    setIsDragging(true);
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startClientY: e.clientY,
      startPos: reelPos.get(),
      startCanvasY,
      maxMovedPx: 0,
      scale,
      samples: [{ y: startCanvasY, t: performance.now() }],
    };
  };

  const activeItem = BATCH_ITEMS[activeIdx];

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />
      <TopCircleButton icon="close" position="right" ariaLabel="Close" />

      <div className={styles.titleBlock}>
        <p className={styles.title}>Random check</p>
        <p className={styles.subtitle}>Check it matches the original file.</p>
      </div>

      {/* Interactive 3D slot-machine card stack */}
      <div
        ref={stackRef}
        className={`${styles.cardStack} ${isDragging ? styles.cardStackDragging : ''}`}
        onPointerDown={handleStackPointerDown}
        role="region"
        aria-label={`Drawn payment ${activeItem.name}, SGD ${activeItem.amount}. Swipe vertically or tap to spin`}
      >
        {BATCH_ITEMS.map((item, idx) => (
          <SlotCard
            key={item.num}
            item={item}
            index={idx}
            reelPos={reelPos}
            prefersReducedMotion={prefersReducedMotion}
            isActive={idx === activeIdx}
          />
        ))}
      </div>

      {/* Original file sheet */}
      <div className={styles.fileSheet}>
        <div className={styles.handleRow}>
          <div className={styles.handle} />
        </div>
        <div className={styles.fileHeader}>
          <p className={styles.fileTitle}>Original file</p>
          <button type="button" className={`${styles.expandBtn} pressable`} aria-label="View full file">
            <img src="./assets/payment-4/icon-expand.svg" alt="" className={styles.expandIcon} />
          </button>
        </div>
        <div className={styles.rowsCard}>
          <div className={styles.rowsViewport}>
            <motion.div
              className={styles.activeRowHighlight}
              style={{ opacity: highlightOpacity }}
              aria-hidden
            />
            <motion.div className={styles.rowsTrack} style={{ y: rowsTrackY }}>
              {LOOPED_ROWS.map((row, vIdx) => {
                const realIdx = vIdx % ITEM_COUNT;
                const isCenterCopy = vIdx >= ITEM_COUNT && vIdx < ITEM_COUNT * 2;
                const isSelected = realIdx === activeIdx;
                return (
                  <button
                    key={`${vIdx}-${row.num}`}
                    type="button"
                    className={`${styles.fileRow} ${isSelected ? styles.fileRowActive : ''}`}
                    onClick={() => selectRowByIndex(realIdx)}
                    aria-pressed={isCenterCopy ? isSelected : undefined}
                    tabIndex={isCenterCopy ? 0 : -1}
                  >
                    <span className={styles.colNum}>{row.num}</span>
                    <span className={styles.colName}>{row.name}</span>
                    <span className={styles.colAcc}>{row.account}</span>
                    <span className={styles.colAmt}>{row.amount}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.progressRow}>
          <div className={styles.segments}>
            <span className={styles.segBlue} />
            <span className={styles.segBlue} />
            <span className={styles.segAmber} />
            <span className={styles.segBlue} />
            <span className={styles.segGray} />
          </div>
          <p className={styles.progressText}>4 of 5 checked · 1 edited</p>
        </div>

        <div className={styles.actionsRow}>
          <button type="button" className={`${styles.editBtn} pressable`}>
            <img src="./assets/payment-4/icon-edit.svg" alt="" className={styles.actionIcon} />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className={`${styles.correctBtn} pressable`}
            onClick={() => navigate('payment-5')}
          >
            <img src="./assets/payment-4/icon-check-white.svg" alt="" className={styles.actionIcon} />
            <span>Correct</span>
          </button>
        </div>
      </div>
    </div>
  );
}
