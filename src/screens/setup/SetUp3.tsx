import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './SetUp3.module.css';

export function SetUp3() {
  const { navigate, back } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [selected, setSelected] = useState<string>('bubble-3');

  const toggle = (id: string) => {
    setSelected((cur) => (cur === id ? '' : id));
  };

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />

      <div className={styles.bgWrapper}>
        <img src="./assets/setup-3/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      <TopCircleButton icon="back" position="left" ariaLabel="Back" onClick={back} />
      <TopCircleButton icon="dots" position="right" ariaLabel="More options" />

      <p className={styles.title}>What work do you want the agent to do?</p>

      {/* Bubble 1: Monitor & notify */}
      <motion.button
        type="button"
        className={`${styles.bubble1} pressable ${selected === 'bubble-1' ? styles.bubbleSelected : ''}`}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -5, 0], scale: selected === 'bubble-1' ? 1.05 : 1 }
        }
        transition={{
          y: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
          scale: { type: 'spring', stiffness: 360, damping: 24 },
        }}
        onClick={() => toggle('bubble-1')}
      >
        <img src="./assets/setup-3/bubble-1.svg" alt="" className={styles.bubbleBg} />
        <span className={styles.bubble1Text}>
          Monitor
          <br />
          &amp; notify
        </span>
      </motion.button>

      {/* Bubble 2: Find information */}
      <motion.button
        type="button"
        className={`${styles.bubble2} pressable ${selected === 'bubble-2' ? styles.bubbleSelected : ''}`}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 5, 0], scale: selected === 'bubble-2' ? 1.05 : 1 }
        }
        transition={{
          y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
          scale: { type: 'spring', stiffness: 360, damping: 24 },
        }}
        onClick={() => toggle('bubble-2')}
      >
        <img src="./assets/setup-3/bubble-2.svg" alt="" className={styles.bubbleBg} />
        <span className={styles.bubble2Text}>Find information</span>
      </motion.button>

      {/* Bubble 3: Scheduled Transfer */}
      <motion.button
        type="button"
        className={`${styles.bubble3} pressable ${selected === 'bubble-3' ? styles.bubbleSelected : ''}`}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -6, 0], scale: selected === 'bubble-3' ? 1.05 : 1 }
        }
        transition={{
          y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
          scale: { type: 'spring', stiffness: 360, damping: 24 },
        }}
        onClick={() => toggle('bubble-3')}
      >
        <img src="./assets/setup-3/bubble-3.svg" alt="" className={styles.bubbleBg} />
        <span className={styles.bubble3Text}>Scheduled Transfer</span>
      </motion.button>

      {/* Bubble 4: Check details */}
      <motion.button
        type="button"
        className={`${styles.bubble4} pressable ${selected === 'bubble-4' ? styles.bubbleSelected : ''}`}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 6, 0], scale: selected === 'bubble-4' ? 1.05 : 1 }
        }
        transition={{
          y: { duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 1.3 },
          scale: { type: 'spring', stiffness: 360, damping: 24 },
        }}
        onClick={() => toggle('bubble-4')}
      >
        <img src="./assets/setup-3/bubble-4.svg" alt="" className={styles.bubbleBg} />
        <span className={styles.bubble4Text}>Check details</span>
      </motion.button>

      <button
        type="button"
        className={`${styles.nextBtn} pressable`}
        onClick={() => navigate('setup-4')}
      >
        Next
      </button>

      <button type="button" className={`${styles.helpLink} pressable`}>
        Need help？
      </button>
    </div>
  );
}
