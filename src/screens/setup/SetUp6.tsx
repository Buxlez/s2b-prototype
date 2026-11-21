import { motion, useReducedMotion } from 'framer-motion';
import { useNavigation } from '../../app/navigation';
import { SlideButton } from '../../components/SlideButton';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './SetUp6.module.css';

export function SetUp6() {
  const { navigate, back } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />

      <div className={styles.bgWrapper}>
        <img src="./assets/setup-3/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      <TopCircleButton icon="back" position="left" ariaLabel="Back" onClick={back} />

      {/* Stuart hero */}
      <motion.img
        src="./assets/setup-6/stuart-hero.webp"
        alt="Stuart"
        className={styles.stuartImg}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: 12 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, scale: 1, y: [0, -4, 0] }
        }
        transition={{
          opacity: { duration: 0.35 },
          scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
        }}
      />
      <motion.div
        className={styles.heroTextBlock}
        initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.38, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.heroSub}>
          <p>Final step!</p>
          <p>Review your bot</p>
        </div>
        <p className={styles.heroTitle}>I’m Stuart</p>
      </motion.div>

      {/* Pay from */}
      <motion.div
        className={styles.sectionFrom}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.sectionLabel}>Pay from</p>
        <button type="button" className={`${styles.glassCard} pressable`}>
          <img src="./assets/setup-6/icon-bank.svg" alt="" className={styles.rowIcon} />
          <span className={styles.rowMainText}>ABC Trading · CA ••0898</span>
          <img
            src="./assets/setup-6/icon-chevron-right.svg"
            alt=""
            className={styles.chevronIcon}
          />
        </button>
      </motion.div>

      {/* Pay to */}
      <motion.div
        className={styles.sectionTo}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.sectionLabel}>Pay to</p>
        <div className={styles.glassCardMulti}>
          <button type="button" className={`${styles.innerRowBtn} pressable`}>
            <img src="./assets/setup-6/icon-users.svg" alt="" className={styles.rowIcon} />
            <div className={styles.beneficiariesText}>
              <span className={styles.numBold}>26</span>
              <span className={styles.numSub}>beneficiaries</span>
            </div>
            <span className={styles.amountText}>SGD 80,000</span>
            <img
              src="./assets/setup-6/icon-chevron-right.svg"
              alt=""
              className={styles.chevronIcon}
            />
          </button>

          <div className={styles.divider} />

          <button type="button" className={`${styles.sourceBtn} pressable`}>
            <p className={styles.sourceLabel}>Payroll source</p>
            <div className={styles.sourceRow}>
              <div className={styles.sourceTextCol}>
                <p className={styles.sourceFile}>payroll.xlsx</p>
                <p className={styles.sourceHint}>
                  For this run. Stuart asks for a new file each month.
                </p>
              </div>
              <img
                src="./assets/setup-6/icon-chevron-right.svg"
                alt=""
                className={styles.chevronIcon}
              />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Pay on */}
      <motion.div
        className={styles.sectionOn}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.sectionLabel}>Pay on</p>
        <button type="button" className={`${styles.glassCard} pressable`}>
          <img src="./assets/setup-6/icon-calendar.svg" alt="" className={styles.rowIcon} />
          <span className={styles.rowMainText}>Monthly on the 15th</span>
          <img
            src="./assets/setup-6/icon-chevron-right.svg"
            alt=""
            className={styles.chevronIcon}
          />
        </button>
      </motion.div>

      {/* Slide to activate Stuart */}
      <SlideButton
        label="Slide to activate Stuart"
        top={749}
        textLeft={113}
        onConfirm={() => navigate('setup-1')}
      />
    </div>
  );
}
