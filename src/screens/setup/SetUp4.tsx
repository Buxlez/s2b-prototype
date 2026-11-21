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
import styles from './SetUp4.module.css';

interface DraftCardItem {
  id: string;
  slotIndex: number;
  label: string;
  icon?: string;
  hasDoublePlate?: boolean;
  decorativeOnly?: boolean;
}

const DRAFT_ITEMS: readonly DraftCardItem[] = [
  { id: 'far-left', slotIndex: -1, label: '', decorativeOnly: true },
  {
    id: 'supplier',
    slotIndex: 0,
    label: 'Supplier payments',
    icon: './assets/setup-4/icon-supplier.webp',
    hasDoublePlate: true,
  },
  {
    id: 'payroll',
    slotIndex: 1,
    label: 'Payroll',
    icon: './assets/setup-4/icon-payroll.webp',
  },
  {
    id: 'company',
    slotIndex: 2,
    label: 'Company transfers',
    icon: './assets/setup-4/icon-company.webp',
  },
  {
    id: 'expense',
    slotIndex: 3,
    label: 'Expense reimbursements',
  },
];

const INITIAL_INDEX = 1; // Payroll centered
const MIN_INDEX = 0;
const MAX_INDEX = 3;
const DRAG_STEP_PX = 128;
const DRAG_SLOP_PX = 6;
const EASE_ARC = [0.42, 0, 0.2, 1] as const;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function ArcCard({
  item,
  arcPos,
  prefersReducedMotion,
  isActive,
  onSelect,
}: {
  item: DraftCardItem;
  arcPos: MotionValue<number>;
  prefersReducedMotion: boolean;
  isActive: boolean;
  onSelect: () => void;
}) {
  const x = useTransform(arcPos, (pos) => {
    const k = item.slotIndex - pos;
    const ak = Math.abs(k);
    const sgn = k < 0 ? -1 : 1;
    const base = 132 * ak - 10 * Math.max(0, ak - 1);
    return sgn * base;
  });

  const y = useTransform(arcPos, (pos) => {
    const k = item.slotIndex - pos;
    return 19 * k * k;
  });

  const rotate = useTransform(arcPos, (pos) => {
    const k = item.slotIndex - pos;
    return 22.5 * k;
  });

  const scale = useTransform(arcPos, (pos) => {
    const ak = Math.abs(item.slotIndex - pos);
    return 1 - 0.035 * Math.min(2, ak);
  });

  const opacity = useTransform(arcPos, (pos) => {
    const ak = Math.abs(item.slotIndex - pos);
    if (ak <= 2.15) return 1 - 0.14 * Math.max(0, ak - 1);
    return Math.max(0, 0.85 * (1 - (ak - 2.15) / 0.85));
  });

  const zIndex = useTransform(arcPos, (pos) => {
    const ak = Math.abs(item.slotIndex - pos);
    return Math.max(1, Math.round(30 - ak * 8));
  });

  const shadow = useTransform(arcPos, (pos) => {
    const ak = Math.abs(item.slotIndex - pos);
    const glow = Math.max(0, 1 - ak);
    return `0px 10px 28px rgba(35, 131, 255, ${(0.14 * glow).toFixed(3)})`;
  });

  if (item.decorativeOnly) {
    return (
      <motion.div
        className={styles.arcCardAnchor}
        style={{
          x,
          y,
          rotate,
          scale,
          opacity,
          zIndex,
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        <div className={styles.arcCardGlass} />
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      className={styles.arcCardAnchor}
      data-draft-id={item.id}
      data-draft-active={isActive ? 'true' : 'false'}
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex,
      }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
      onClick={onSelect}
      aria-label={item.label}
      aria-pressed={isActive}
    >
      {item.hasDoublePlate && <div className={styles.arcCardBackPlate} aria-hidden />}
      <motion.div className={styles.arcCardGlass} style={{ boxShadow: shadow }} aria-hidden />
      {item.icon && <img src={item.icon} alt="" className={styles.arcCardIcon} />}
      <p className={styles.arcCardLabel}>{item.label}</p>
    </motion.button>
  );
}

export function SetUp4() {
  const { navigate, back } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());

  const stageRef = useRef<HTMLDivElement>(null);
  const arcPos = useMotionValue(INITIAL_INDEX);
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const activeRef = useRef(INITIAL_INDEX);
  const [isDragging, setIsDragging] = useState(false);

  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const dragRef = useRef<{
    active: boolean;
    pointerId: number;
    startX: number;
    startPos: number;
    maxMoved: number;
    scale: number;
  }>({
    active: false,
    pointerId: -1,
    startX: 0,
    startPos: INITIAL_INDEX,
    maxMoved: 0,
    scale: 1,
  });

  const arcGlowRotate = useTransform(arcPos, (p) => 180 + (1 - p) * 5);

  useMotionValueEvent(arcPos, 'change', (latest) => {
    const next = clamp(Math.round(latest), MIN_INDEX, MAX_INDEX);
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActiveIndex(next);
    }
  });

  useEffect(() => {
    return () => animRef.current?.stop();
  }, []);

  const snapToIndex = (targetIdx: number) => {
    const clamped = clamp(targetIdx, MIN_INDEX, MAX_INDEX);
    animRef.current?.stop();
    if (prefersReducedMotion) {
      arcPos.set(clamped);
      return;
    }
    animRef.current = animate(arcPos, clamped, {
      duration: 0.48,
      ease: EASE_ARC,
    });
  };

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const g = dragRef.current;
      if (!g.active || e.pointerId !== g.pointerId) return;
      const dx = (e.clientX - g.startX) / g.scale;
      g.maxMoved = Math.max(g.maxMoved, Math.abs(dx));
      if (g.maxMoved >= DRAG_SLOP_PX) {
        const raw = g.startPos - dx / DRAG_STEP_PX;
        // Soft rubber-band past endpoints
        const bounded =
          raw < MIN_INDEX
            ? MIN_INDEX + (raw - MIN_INDEX) * 0.25
            : raw > MAX_INDEX
              ? MAX_INDEX + (raw - MAX_INDEX) * 0.25
              : raw;
        arcPos.set(bounded);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const g = dragRef.current;
      if (!g.active || e.pointerId !== g.pointerId) return;
      g.active = false;
      setIsDragging(false);
      if (g.maxMoved >= DRAG_SLOP_PX) {
        const delta = arcPos.get() - g.startPos;
        let next = Math.round(arcPos.get());
        if (Math.abs(delta) >= 0.25 && next === Math.round(g.startPos)) {
          next = clamp(Math.round(g.startPos) + (delta > 0 ? 1 : -1), MIN_INDEX, MAX_INDEX);
        }
        snapToIndex(next);
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
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    animRef.current?.stop();
    const rect = stageRef.current?.getBoundingClientRect();
    const scale = rect && rect.width > 0 ? rect.width / 402 : 1;
    setIsDragging(true);
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startPos: arcPos.get(),
      maxMoved: 0,
      scale,
    };
  };

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />

      <div className={styles.bgWrapper}>
        <img src="./assets/setup-3/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      {/* Arc glow + interactive horizontally swipeable parabolic arc carousel */}
      <div
        ref={stageRef}
        className={`${styles.cardsStage} ${isDragging ? styles.cardsStageDragging : ''}`}
        onPointerDown={handlePointerDown}
      >
        <motion.div
          className={styles.arcGlowWrap}
          style={{ rotate: arcGlowRotate }}
          aria-hidden
        >
          <img src="./assets/setup-4/arc-glow.svg" alt="" className={styles.arcGlowImg} />
        </motion.div>

        {DRAFT_ITEMS.map((item) => (
          <ArcCard
            key={item.id}
            item={item}
            arcPos={arcPos}
            prefersReducedMotion={prefersReducedMotion}
            isActive={item.slotIndex === activeIndex}
            onSelect={() => {
              if (dragRef.current.maxMoved < DRAG_SLOP_PX) {
                snapToIndex(item.slotIndex);
              }
            }}
          />
        ))}
      </div>

      <TopCircleButton icon="back" position="left" ariaLabel="Back" onClick={back} />
      <TopCircleButton icon="dots" position="right" ariaLabel="More options" />

      <p className={styles.title}>What kind of draft you want to prepare?</p>

      <button
        type="button"
        className={`${styles.nextBtn} pressable`}
        onClick={() => navigate('setup-5')}
      >
        Next
      </button>
      <button type="button" className={`${styles.helpLink} pressable`}>
        Need help？
      </button>
    </div>
  );
}
