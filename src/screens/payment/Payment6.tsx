import { useNavigation } from '../../app/navigation';
import { SlideButton } from '../../components/SlideButton';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Payment6.module.css';

const RECIPIENTS = [
  { name: 'Orchid Logistics', amount: '18,750', avatar: './assets/payment-5/avatar-to-1.png', opacity: 1 },
  { name: 'Merlion Print', amount: '6,450', avatar: './assets/payment-5/avatar-to-2.png', opacity: 1 },
  { name: 'Wing Fat Metal', amount: '10,250', avatar: './assets/payment-5/avatar-to-3.png', opacity: 0.5 },
  { name: 'Kopi Supply Co', amount: '12,400', avatar: './assets/payment-5/avatar-to-4.png', opacity: 0.5 },
  { name: 'Lumen Utilities', amount: '8,800', avatar: './assets/payment-5/avatar-to-5.png', opacity: 0.3 },
  { name: 'Harbour Packing', amount: '21,300', avatar: './assets/payment-5/avatar-to-6.png', opacity: 0.3 },
];

export function Payment6() {
  const { navigate, back, setHomeState } = useNavigation();

  const handleConfirm = () => {
    setHomeState('B');
    navigate('home');
  };

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />
      <TopCircleButton icon="back" position="left" ariaLabel="Back" onClick={back} />
      <TopCircleButton icon="dots" position="right" ariaLabel="More options" />

      <div className={styles.titleRow}>
        <p className={styles.title}>Creating payment</p>
        <span className={styles.titlePlus}>+</span>
      </div>

      {/* Receipt printer slot */}
      <div className={styles.slotWrap} aria-hidden>
        <img src="./assets/payment-5/slot-shadow.svg" alt="" className={styles.slotShadow} />
        <img src="./assets/payment-5/slot-housing.svg" alt="" className={styles.slotHousing} />
        <img src="./assets/payment-5/slot-opening.svg" alt="" className={styles.slotOpening} />
        <img src="./assets/payment-5/slot-front-lip.svg" alt="" className={styles.slotFrontLip} />
      </div>

      {/* Receipt paper + content */}
      <div className={styles.receiptGroup}>
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
          {RECIPIENTS.map((item) => (
            <div key={item.name} className={styles.toRow} style={{ opacity: item.opacity }}>
              <img src={item.avatar} alt="" className={styles.toAvatar} />
              <div className={styles.toInfo}>
                <p className={styles.toName}>{item.name}</p>
                <p className={styles.toAcc}>***88293</p>
              </div>
              <p className={styles.toAmt}>
                <span className={styles.toCurr}>SGD</span>
                <span className={styles.toNum}>{item.amount}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide to confirm */}
      <SlideButton label="Slide to confirm" top={783} onConfirm={handleConfirm} />
    </div>
  );
}
