import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../../app/navigation';
import { BotCircleAvatar } from '../../components/BotCircleAvatar';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Cooperation5.module.css';

const SHEET_SPRING = { type: 'spring' as const, stiffness: 300, damping: 31, mass: 0.9 };
const DISMISS_MS = 200;

const MEMOJIS = [
  { src: './assets/coop-5/memoji-1.webp', alt: 'Contact 1', left: 30, width: 70 },
  { src: './assets/coop-5/memoji-2.webp', alt: 'Contact 2', left: 110, width: 70 },
  { src: './assets/coop-5/memoji-3.webp', alt: 'Contact 3', left: 190, width: 71 },
  { src: './assets/coop-5/memoji-4.webp', alt: 'Contact 4', left: 271, width: 70 },
  { src: './assets/coop-5/memoji-5.webp', alt: 'Contact 5', left: 351, width: 70 },
] as const;

export function Cooperation5() {
  const { backOrTo } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [closing, setClosing] = useState(false);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [permission, setPermission] = useState<'Can edit' | 'Can view'>('Can edit');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const dismiss = () => {
    if (closing) return;
    if (prefersReducedMotion) {
      backOrTo('coop-4');
      return;
    }
    setClosing(true);
    timerRef.current = window.setTimeout(() => {
      backOrTo('coop-4');
    }, DISMISS_MS);
  };

  return (
    <div className={styles.screen}>
      {/* Underlying Cooperation-4 layer */}
      <div className={styles.bgWrapper}>
        <img src="./assets/home/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      <div className={styles.agentChip} aria-hidden>
        <BotCircleAvatar bot="kevin" size={40} />
        <span className={styles.agentChipName}>Kevin</span>
      </div>

      <TopCircleButton icon="share" position="right" ariaLabel="Share" />

      <div className={styles.ongoingCard} aria-hidden>
        <div className={styles.ongoingTopRow}>
          <div className={styles.ongoingTitleCol}>
            <span className={styles.ongoingOverline}>Ongoing task</span>
            <span className={styles.ongoingTitle}>Supplier payment · INV-2291</span>
          </div>
          <span className={styles.spacer} />
          <span className={styles.statusPill}>
            <img src="./assets/coop-4/dot-amber.svg" alt="" className={styles.dot6} />
            <span className={styles.statusText}>On hold</span>
          </span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.segBlue} />
          <div className={styles.segBlue} />
          <div className={styles.segAmber} />
          <div className={styles.segGray} />
        </div>
        <div className={styles.currentStepRow}>
          <span className={styles.stepIconCircle}>
            <img src="./assets/coop-4/icon-excl.svg" alt="" className={styles.exclIcon} />
          </span>
          <span className={styles.stepLabel}>Balance check</span>
          <span className={styles.spacer} />
          <img src="./assets/coop-4/icon-chevron-down.svg" alt="" className={styles.expandRight} />
        </div>
      </div>

      <div className={styles.userBubbleRow} aria-hidden>
        <div className={styles.userBubble}>
          <p className={styles.userBubbleText}>Pay the Lim Supplies invoice this week.</p>
        </div>
      </div>

      <div className={styles.timestampRow} aria-hidden>
        <p className={styles.timestampText}>Today 14:37</p>
      </div>

      <div className={styles.threadLinkRow} aria-hidden>
        <div className={styles.threadLinkPill}>
          <span className={styles.threadCountGroup}>
            <img src="./assets/common/icon-message.svg" alt="" className={styles.icon18} />
            <span className={styles.threadCountText}>6</span>
          </span>
          <BotCircleAvatar bot="kevin" size={18} />
          <span className={styles.threadLabel}>Kevin</span>
          <img src="./assets/common/icon-chevron-sm.svg" alt="" className={styles.chevron14} />
        </div>
      </div>

      <div className={styles.agentBubble} aria-hidden>
        <p className={styles.agentBubbleText}>
          Kevin spotted a payroll conflict, so I switched the source account. Please review.
        </p>
      </div>

      {/* Blurred Backdrop (clickable to dismiss) */}
      <motion.div
        className={styles.backdropOverlay}
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: closing ? 0.18 : 0.25, ease: [0.4, 0, 0.2, 1] }}
        onClick={dismiss}
      />

      {/* Share Sheet */}
      <motion.div
        className={styles.sheet}
        initial={prefersReducedMotion ? false : { y: 540 }}
        animate={{ y: closing ? 540 : 0 }}
        transition={
          closing
            ? { duration: DISMISS_MS / 1000, ease: [0.4, 0, 1, 1] }
            : SHEET_SPRING
        }
        drag={prefersReducedMotion ? false : 'y'}
        dragConstraints={{ top: 0, bottom: 540 }}
        dragElastic={{ top: 0.06, bottom: 0.35 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 420) {
            dismiss();
          }
        }}
      >
        <div className={styles.sheetBgFill} />
        <img src="./assets/coop-5/sheet-bg-texture.webp" alt="" className={styles.sheetTexture} />

        <img src="./assets/coop-5/handle-bar.svg" alt="" className={styles.handleBar} />

        <div className={styles.sheetHeaderRow}>
          <p className={styles.sheetTitle}>Share to</p>
          <button type="button" className={`${styles.linkBtn} pressable`} aria-label="Copy link">
            <img src="./assets/coop-5/icon-link.svg" alt="" className={styles.icon24} />
          </button>
        </div>

        <p className={styles.settingLabel}>Setting</p>
        <button
          type="button"
          className={`${styles.settingBox} pressable`}
          onClick={() => setPermission((p) => (p === 'Can edit' ? 'Can view' : 'Can edit'))}
        >
          <span className={styles.settingValue}>{permission}</span>
          <img src="./assets/coop-5/icon-chevron-down.svg" alt="" className={styles.icon24} />
        </button>

        <p className={styles.toLabel}>to</p>
        <div className={styles.memojisRow}>
          {MEMOJIS.map((m, idx) => (
            <motion.button
              key={m.alt}
              type="button"
              className={`${styles.memojiBtn} ${selectedContact === idx ? styles.memojiSelected : ''}`}
              style={{ left: m.left, width: m.width }}
              aria-label={m.alt}
              aria-pressed={selectedContact === idx}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: selectedContact === idx ? 1.07 : 1 }}
              transition={{
                opacity: { duration: 0.25, delay: 0.08 + idx * 0.04 },
                y: { duration: 0.32, delay: 0.08 + idx * 0.04, ease: [0.22, 1, 0.36, 1] },
                scale: { type: 'spring', stiffness: 420, damping: 26 },
              }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setSelectedContact((cur) => (cur === idx ? null : idx))}
            >
              <img src={m.src} alt="" className={styles.memoji} />
            </motion.button>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.sendBtn} pressable`}
          onClick={dismiss}
        >
          Send
        </button>
      </motion.div>

      {/* Light System Bar sits above blur */}
      <SystemBar showDynamicIsland variant="light" />
    </div>
  );
}
