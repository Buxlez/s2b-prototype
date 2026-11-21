import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAutoRedirect, useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Payment2.module.css';

const STEPS = [
  {
    title: 'Document',
    subtitle: 'Invoice · INV-2291',
    hasDivider: true,
  },
  {
    title: 'Payee',
    subtitle: 'Lim Supplies · •••• 4417',
    hasDivider: true,
  },
  {
    title: 'Payment details',
    subtitle: 'SGD 50,000.00 · FAST · 14 Nov 2026',
    hasDivider: true,
  },
  {
    title: 'Final checks',
    subtitle: 'Verifying required fields and FX…',
    hasDivider: false,
  },
];

const LINE_CLASSES = [styles.lineV1, styles.lineV2, styles.lineV3];

export function Payment2() {
  const { navigate, backOrTo } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [doneCount, setDoneCount] = useState(() => (prefersReducedMotion ? 4 : 0));
  const [cancelled, setCancelled] = useState(false);

  // Auto-advance once loading reaches the final step at the bottom
  useAutoRedirect('payment-2', 'payment-3', 2500, !cancelled);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDoneCount(4);
      return;
    }
    setDoneCount(0);
    const t1 = window.setTimeout(() => setDoneCount(1), 260);
    const t2 = window.setTimeout(() => setDoneCount(2), 780);
    const t3 = window.setTimeout(() => setDoneCount(3), 1320);
    const t4 = window.setTimeout(() => setDoneCount(4), 2050);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [prefersReducedMotion]);

  const handleBack = () => {
    setCancelled(true);
    backOrTo('payment-1');
  };

  const handleCardClick = () => {
    setCancelled(true);
    navigate('payment-3');
  };

  const handleStop = () => {
    setCancelled(true);
  };

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />

      {/* Blurred gradient bg */}
      <div className={styles.bgWrapper}>
        <img src="./assets/payment-2/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      {/* Papers behind the card */}
      <motion.div
        className={styles.papersGroup}
        aria-hidden
        initial={prefersReducedMotion ? false : { y: 18, opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.papersRotate}>
          <img src="./assets/payment-2/papers-behind.webp" alt="" className={styles.papersImg} />
        </div>
        <div className={styles.papersShadowWrap}>
          <div className={styles.papersShadow} />
        </div>
      </motion.div>

      <TopCircleButton
        icon="back"
        position="left"
        ariaLabel="Back"
        onClick={handleBack}
      />
      <TopCircleButton icon="dots" position="right" ariaLabel="More options" />

      {/* Main white notched card (Figma Vector 33 -> Payment-3) */}
      <img src="./assets/payment-2/card-outline.svg" alt="" className={styles.cardOutline} />
      <button
        type="button"
        className={styles.cardClickHotspot}
        aria-label="Continue to select recipients"
        onClick={handleCardClick}
      />

      {/* Bob peeking illustration with subtle inspecting motion */}
      <motion.div
        className={styles.bobIllustration}
        animate={prefersReducedMotion ? undefined : { y: [0, -3.5, 0], rotate: [0, -1.2, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src="./assets/payment-2/bob-inspecting.webp" alt="" className={styles.bobImg} />
      </motion.div>

      <p className={styles.heading}>Bob is preparing your payment</p>
      <p className={styles.subheading}>This usually takes a few seconds</p>

      {/* Vertical connecting lines draw progressively */}
      {LINE_CLASSES.map((cls, i) => (
        <motion.img
          key={cls}
          src="./assets/payment-2/step-line-v.svg"
          alt=""
          className={cls}
          initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0.25 }}
          animate={{
            scaleY: doneCount > i ? 1 : 0.18,
            opacity: doneCount > i ? 1 : 0.25,
          }}
          transition={{ duration: 0.38, ease: [0.42, 0, 0.2, 1] }}
        />
      ))}

      {/* Steps */}
      <div className={styles.stepsList}>
        {STEPS.map((step, idx) => {
          const isChecked = idx < doneCount;
          const isFinalStep = idx === STEPS.length - 1;
          const isSpinningFinal = isFinalStep && !isChecked;

          return (
            <div key={step.title} className={styles.stepRow} style={{ top: 448 + idx * 78 }}>
              <div className={styles.stepIconWrap}>
                {isChecked ? (
                  <motion.div
                    initial={prefersReducedMotion ? false : { scale: 0.55, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                  >
                    <img
                      src="./assets/payment-2/step-circle-blue.svg"
                      alt=""
                      className={styles.circleBg}
                    />
                    <motion.img
                      src="./assets/payment-2/step-check.svg"
                      alt=""
                      className={styles.checkIcon}
                      initial={prefersReducedMotion ? false : { scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.06, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                ) : isSpinningFinal ? (
                  <motion.img
                    src="./assets/payment-2/step-pending.svg"
                    alt=""
                    className={styles.pendingIcon}
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : doneCount >= 3
                          ? { rotate: 360, opacity: 1 }
                          : { opacity: 0.45 }
                    }
                    transition={
                      doneCount >= 3
                        ? { rotate: { duration: 1.25, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.25 } }
                        : { duration: 0.25 }
                    }
                  />
                ) : (
                  <div className={styles.pendingRingPlaceholder} />
                )}
              </div>

              <motion.div
                className={styles.stepTextCol}
                initial={false}
                animate={{
                  opacity: isChecked ? 1 : isFinalStep ? (doneCount >= 3 ? 1 : 0.65) : 0.42,
                }}
                transition={{ duration: 0.28, ease: [0.42, 0, 0.2, 1] }}
              >
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={isFinalStep && !isChecked ? styles.stepSubMuted : styles.stepSub}>
                  {step.subtitle}
                </p>
                {step.hasDivider && (
                  <img
                    src="./assets/payment-2/step-divider.svg"
                    alt=""
                    className={styles.stepDivider}
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      <button type="button" className={`${styles.stopBtn} pressable`} onClick={handleStop}>
        <img src="./assets/payment-2/icon-pause.svg" alt="" className={styles.stopIcon} />
        <span className={styles.stopLabel}>Stop</span>
      </button>
    </div>
  );
}
