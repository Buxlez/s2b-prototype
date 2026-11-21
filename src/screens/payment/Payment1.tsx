import { motion, useReducedMotion } from 'framer-motion';
import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Payment1.module.css';

export function Payment1() {
  const { navigate, backOrTo } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />
      <TopCircleButton
        icon="back"
        position="left"
        ariaLabel="Back"
        onClick={() => backOrTo('home', 'B')}
      />
      <TopCircleButton icon="dots" position="right" ariaLabel="More options" />

      <motion.div
        className={styles.centerGroup}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className={`${styles.uploadCard} pressable`}
          onClick={() => navigate('payment-2')}
        >
          <div className={styles.uploadGlass} />
          <div className={styles.uploadContent}>
            <p className={styles.title}>AI auto - fill</p>
            <motion.img
              src="./assets/payment-1/plus-large.svg"
              alt=""
              className={styles.plusIcon}
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.07, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className={styles.captionWrap}>
              <p className={styles.selectFiles}>Select files</p>
              <p className={styles.hint}>eg. Invoice, contract, text, etc.</p>
            </div>
          </div>
        </button>

        <motion.img
          src="./assets/payment-1/folder-illustration.webp"
          alt=""
          className={styles.folderImg}
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -5, 0], rotate: [0, 1.2, 0] }
          }
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <button type="button" className={`${styles.manualBtn} pressable`}>
        Skip to manual entry
      </button>
    </div>
  );
}
