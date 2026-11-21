import { motion, useReducedMotion } from 'framer-motion';
import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Payment5.module.css';

const RECIPIENTS = [
  { name: 'Orchid Logistics', amount: '18,750', avatar: './assets/payment-5/avatar-to-1.png', opacity: 1 },
  { name: 'Merlion Print', amount: '6,450', avatar: './assets/payment-5/avatar-to-2.png', opacity: 1 },
  { name: 'Wing Fat Metal', amount: '10,250', avatar: './assets/payment-5/avatar-to-3.png', opacity: 0.5 },
  { name: 'Kopi Supply Co', amount: '12,400', avatar: './assets/payment-5/avatar-to-4.png', opacity: 0.5 },
  { name: 'Lumen Utilities', amount: '8,800', avatar: './assets/payment-5/avatar-to-5.png', opacity: 0.3 },
  { name: 'Harbour Packing', amount: '21,300', avatar: './assets/payment-5/avatar-to-6.png', opacity: 0.3 },
];

export function Payment5() {
  const { navigate, backOrTo } = useNavigation();
  const prefersReducedMotion = Boolean(useReducedMotion());

  const handleBack = () => {
    backOrTo('payment-4');
  };

  const handleContinueToConfirm = () => {
    navigate('payment-6');
  };

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />
      <TopCircleButton icon="back" position="left" ariaLabel="Back" onClick={handleBack} />
      <TopCircleButton icon="dots" position="right" ariaLabel="More options" />

      <div className={styles.titleRow}>
        <p className={styles.title}>AI is double Checking</p>
        <span className={styles.titlePlus}>+</span>
      </div>

      {/* Receipt printer slot sits behind emerging paper (paper appears above the lower housing rim) */}
      <div className={styles.slotWrap} aria-hidden>
        <img src="./assets/payment-5/slot-shadow.svg" alt="" className={styles.slotShadow} />
        <img src="./assets/payment-5/slot-housing.svg" alt="" className={styles.slotHousing} />
        <img src="./assets/payment-5/slot-opening.svg" alt="" className={styles.slotOpening} />
        <img src="./assets/payment-5/slot-front-lip.svg" alt="" className={styles.slotFrontLip} />
      </div>

      {/* Bottom white glow behind receipt */}
      <div className={styles.receiptGlow} aria-hidden />

      {/* Receipt paper emerges above the printer lip from inside the slot mouth */}
      <div className={styles.receiptViewport}>
        <motion.div
          className={styles.receiptGroup}
          initial={prefersReducedMotion ? false : { y: -260 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="./assets/payment-5/receipt-paper.svg" alt="" className={styles.receiptPaper} />

          <p className={styles.totalLabel}>TOTAL AMOUNT</p>
          <p className={styles.totalValue}>
            <span className={styles.totalCurrency}>SGD</span>
            <span className={styles.totalAmount}> 229,200.00</span>
          </p>

          <p className={styles.fromLabel}>FROM</p>
          <img src="./assets/payment-5/avatar-from.png" alt="" className={styles.fromAvatar} />
          <p className={styles.fromName}>Company A payment account</p>
          <div className={styles.fromBank}>
            <p>8877********3256</p>
            <p>Standard Chartered Singapore</p>
          </div>

          <p className={styles.toLabel}>TO</p>
          <div className={styles.toList}>
            {RECIPIENTS.map((item, idx) => (
              <motion.div
                key={item.name}
                className={styles.toRow}
                initial={prefersReducedMotion ? { opacity: item.opacity } : { opacity: 0, y: 10 }}
                animate={{ opacity: item.opacity, y: 0 }}
                transition={{
                  duration: 0.36,
                  delay: prefersReducedMotion ? 0 : 0.25 + idx * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img src={item.avatar} alt="" className={styles.toAvatar} />
                <div className={styles.toInfo}>
                  <p className={styles.toName}>{item.name}</p>
                  <p className={styles.toAcc}>***88293</p>
                </div>
                <p className={styles.toAmt}>
                  <span className={styles.toCurr}>SGD</span>
                  <span className={styles.toNum}>{item.amount}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade + full-screen tap hotspot (except top nav buttons at z-30) */}
      <div className={styles.bottomFade} aria-hidden />
      <button
        type="button"
        className={styles.receiptHotspot}
        aria-label="Open creating payment receipt"
        onClick={handleContinueToConfirm}
      />
      <div className={styles.loadingWrap}>
        <p className={styles.loadingText}>Loading</p>
        <div className={styles.dotsRow}>
          {[1, 2, 3].map((dotNum, idx) => (
            <motion.img
              key={dotNum}
              src={`/assets/payment-5/dot-${dotNum}.svg`}
              alt=""
              className={styles.dot}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -5, 0], scale: [1, 1.18, 1], opacity: [0.45, 1, 0.45] }
              }
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: idx * 0.16,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
