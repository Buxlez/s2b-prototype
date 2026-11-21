import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './SetUp5.module.css';

const SHEET_SPRING = { type: 'spring' as const, stiffness: 290, damping: 30, mass: 0.9 };
const DISMISS_MS = 200;

export function SetUp5() {
  const { navigate, back } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleDismiss = () => {
    if (closing) return;
    if (prefersReducedMotion) {
      back();
      return;
    }
    setClosing(true);
    timerRef.current = window.setTimeout(() => {
      back();
    }, DISMISS_MS);
  };

  return (
    <div className={styles.screen}>
      {/* Dimmed / Blurred Set up-4 underlying layer */}
      <div className={styles.bgWrapper}>
        <img src="./assets/setup-3/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      <p className={styles.bgTitle}>What kind of draft you want to prepare?</p>
      <TopCircleButton icon="back" position="left" ariaLabel="Back" onClick={handleDismiss} />
      <TopCircleButton icon="dots" position="right" ariaLabel="More options" />

      <div className={styles.bgCardsGroup} aria-hidden>
        <div className={styles.bgArcGlowWrap}>
          <img src="./assets/setup-4/arc-glow.svg" alt="" className={styles.fullImg} />
        </div>
        <div className={styles.bgCardLeftWrap}>
          <div className={styles.bgCardLeftInner} />
        </div>
        <div className={styles.bgSupplierIconWrap}>
          <img src="./assets/setup-4/icon-supplier.webp" alt="" className={styles.bgSupplierIcon} />
        </div>
        <p className={styles.bgSupplierText}>Supplier payments</p>

        <div className={styles.bgCardPayrollWrap}>
          <div className={styles.bgCardPayrollInner} />
        </div>
        <img src="./assets/setup-4/icon-payroll.webp" alt="" className={styles.bgPayrollIcon} />
        <p className={styles.bgPayrollText}>Payroll</p>

        <div className={styles.bgCardCompanyWrap}>
          <div className={styles.bgCardCompanyInner} />
        </div>
        <div className={styles.bgCompanyIconWrap}>
          <img src="./assets/setup-4/icon-company.webp" alt="" className={styles.bgCompanyIcon} />
        </div>
        <p className={styles.bgCompanyText}>Company transfers</p>
      </div>

      {/* Backdrop Blur Mask (clickable to dismiss) */}
      <motion.div
        className={styles.backdropOverlay}
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: closing ? 0.18 : 0.28, ease: [0.4, 0, 0.2, 1] }}
        onClick={handleDismiss}
      />
      <button
        type="button"
        className={styles.backHotspot}
        aria-label="Back"
        onClick={handleDismiss}
      />

      {/* Bottom Sheet */}
      <motion.div
        className={styles.sheetContainer}
        initial={prefersReducedMotion ? false : { y: 540 }}
        animate={{ y: closing ? 540 : 0 }}
        transition={
          closing
            ? { duration: DISMISS_MS / 1000, ease: [0.4, 0, 1, 1] }
            : SHEET_SPRING
        }
      >
        <motion.div
          className={styles.blueBackCardWrap}
          aria-hidden
          initial={prefersReducedMotion ? false : { y: 36, opacity: 0.7 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.blueBackCard} />
        </motion.div>
        <div className={styles.whiteFrontCardWrap} aria-hidden>
          <div className={styles.whiteFrontCard} />
        </div>

        <motion.div
          className={styles.headerBlock}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.sheetTitle}>
            <p>On Schedule</p>
            <p>Under Your Control</p>
          </div>
          <span className={styles.titlePlus}>+</span>
          <p className={styles.sheetDesc}>
            AI prepares your recurring payroll payments based on your rules. You review and approve.
          </p>
        </motion.div>

        <motion.img
          src="./assets/setup-5/circle-blue.svg"
          alt=""
          className={styles.circleBlue}
          animate={prefersReducedMotion ? undefined : { y: [0, -6, 0], x: [0, 3, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src="./assets/setup-5/circle-purple.svg"
          alt=""
          className={styles.circlePurple}
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0], x: [0, -3, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src="./assets/setup-5/envelope-illustration.webp"
          alt=""
          className={styles.envelopeImg}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 18 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -5, 0],
                }
          }
          transition={{
            opacity: { duration: 0.4, delay: 0.12 },
            scale: { duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
        />

        <p className={styles.metaCaption}>Scheduled · Multi-payment · Human-approved</p>

        <button
          type="button"
          className={`${styles.confirmBtn} pressable`}
          onClick={() => navigate('setup-6')}
        >
          Confirm
        </button>
      </motion.div>

      <SystemBar showDynamicIsland variant="light" />
    </div>
  );
}
