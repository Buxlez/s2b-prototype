import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styles from './SlideButton.module.css';

const TRACK_WIDTH = 368;
const TRACK_PADDING = 6;
const KNOB_SIZE = 46;
const MAX_X = TRACK_WIDTH - TRACK_PADDING * 2 - KNOB_SIZE; // 310px
const TRIGGER_RATIO = 0.85;
const DRAG_THRESHOLD_PX = 5;

export interface SlideButtonProps {
  label: string;
  onConfirm: () => void;
  top: number;
  left?: number;
  textLeft?: number;
}

export function SlideButton({
  label,
  onConfirm,
  top,
  left = 17,
  textLeft,
}: SlideButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const textOpacity = useTransform(x, [0, MAX_X * 0.65], [1, 0]);
  const textShift = useTransform(x, [0, MAX_X], [0, 14]);
  const shimmerScaleX = useTransform(x, [0, MAX_X], [0, 1]);

  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const confirmedRef = useRef(false);
  const startClientXRef = useRef(0);
  const startKnobXRef = useRef(0);
  const scaleFactorRef = useRef(1);
  const maxMovedRef = useRef(0);

  const completeConfirm = () => {
    if (confirmedRef.current) return;
    confirmedRef.current = true;
    animate(x, MAX_X, {
      type: 'spring',
      stiffness: 420,
      damping: 32,
      duration: prefersReducedMotion ? 0.05 : undefined,
    });
    window.setTimeout(() => {
      onConfirm();
    }, prefersReducedMotion ? 0 : 120);
  };

  const resetKnob = () => {
    animate(x, 0, {
      type: 'spring',
      stiffness: 450,
      damping: 30,
      duration: prefersReducedMotion ? 0.05 : undefined,
    });
  };

  const handleKnobPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (confirmedRef.current) return;
    e.stopPropagation();
    const rect = trackRef.current?.getBoundingClientRect();
    const currentScale = rect && rect.width > 0 ? rect.width / TRACK_WIDTH : 1;
    scaleFactorRef.current = currentScale;
    startClientXRef.current = e.clientX;
    startKnobXRef.current = x.get();
    maxMovedRef.current = 0;
    draggingRef.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleKnobPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || confirmedRef.current) return;
    const rawDelta = (e.clientX - startClientXRef.current) / scaleFactorRef.current;
    maxMovedRef.current = Math.max(maxMovedRef.current, Math.abs(e.clientX - startClientXRef.current));
    const nextX = Math.max(0, Math.min(MAX_X, startKnobXRef.current + rawDelta));
    x.set(nextX);
  };

  const handleKnobPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (confirmedRef.current) return;
    const currentX = x.get();
    if (currentX >= MAX_X * TRIGGER_RATIO) {
      completeConfirm();
    } else if (maxMovedRef.current < DRAG_THRESHOLD_PX) {
      // Fallback tap on knob without dragging
      completeConfirm();
    } else {
      resetKnob();
    }
  };

  const handleTrackClick = () => {
    if (confirmedRef.current) return;
    if (maxMovedRef.current >= DRAG_THRESHOLD_PX) {
      maxMovedRef.current = 0;
      return;
    }
    completeConfirm();
  };

  return (
    <div
      ref={trackRef}
      role="button"
      tabIndex={0}
      aria-label={label}
      className={styles.sliderTrack}
      style={{ top, left }}
      onClick={handleTrackClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          completeConfirm();
        }
      }}
    >
      <motion.div
        className={styles.progressFill}
        style={{ scaleX: shimmerScaleX }}
        aria-hidden
      />

      <motion.span
        className={textLeft !== undefined ? styles.sliderTextLeft : styles.sliderTextCentered}
        style={{
          opacity: textOpacity,
          x: textShift,
          ...(textLeft !== undefined ? { left: textLeft } : {}),
        }}
      >
        {label}
      </motion.span>

      <motion.div
        className={`${styles.sliderKnob} ${isDragging ? styles.sliderKnobActive : ''}`}
        style={{ x }}
        onPointerDown={handleKnobPointerDown}
        onPointerMove={handleKnobPointerMove}
        onPointerUp={handleKnobPointerEnd}
        onPointerCancel={handleKnobPointerEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <img src="./assets/setup-6/icon-arrow-right.svg" alt="" className={styles.knobArrow} />
      </motion.div>
    </div>
  );
}
