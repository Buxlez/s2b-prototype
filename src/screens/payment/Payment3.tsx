import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Payment3.module.css';

const NEEDS_CHECK = [
  { name: 'Wing Fat Metal', note: 'Payee name unclear', amount: '10,250.00' },
  { name: 'Lumen Utilities', note: 'Amount doesn’t match', amount: '8,800.00' },
];

const READY_ITEMS = [
  { name: 'Supplier payments', count: '4 payments' },
  { name: 'Logistics & packaging', count: '6 payments' },
  { name: 'Tax & utilities', count: '2 payments' },
];

export function Payment3() {
  const { navigate, backOrTo } = useNavigation();

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />
      <TopCircleButton
        icon="back"
        position="left"
        ariaLabel="Back"
        onClick={() => backOrTo('payment-2')}
      />
      <TopCircleButton icon="plus" position="right" ariaLabel="Add agent" />

      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <p className={styles.title}>Select recipients</p>
          <p className={styles.subtitle}>Oct_supplier_batch.xlsx · 14 payments</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTitle}>Needs your check</p>
          </div>
          <div className={styles.glassCard}>
            {NEEDS_CHECK.map((item, idx) => (
              <div key={item.name}>
                {idx > 0 && <div className={styles.divider} />}
                <button type="button" className={`${styles.rowBtn} pressable`}>
                  <div className={styles.warnBadge}>
                    <img src="./assets/payment-3/icon-warn.svg" alt="" className={styles.warnIcon} />
                  </div>
                  <div className={styles.rowTextCol}>
                    <p className={styles.rowTitle}>{item.name}</p>
                    <p className={styles.warnNote}>{item.note}</p>
                  </div>
                  <p className={styles.amount}>{item.amount}</p>
                  <img
                    src="./assets/payment-3/icon-chevron-right.svg"
                    alt=""
                    className={styles.chevron}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionTitle}>Ready to pay</p>
          </div>
          <div className={styles.glassCard}>
            {READY_ITEMS.map((item, idx) => (
              <div key={item.name}>
                {idx > 0 && <div className={styles.divider} />}
                <button type="button" className={`${styles.rowBtn} pressable`}>
                  <div className={styles.checkboxOn}>
                    <img
                      src="./assets/payment-3/icon-check.svg"
                      alt=""
                      className={styles.checkIcon}
                    />
                  </div>
                  <div className={styles.rowTextCol}>
                    <p className={styles.readyTitle}>{item.name}</p>
                    <p className={styles.readyCount}>{item.count}</p>
                  </div>
                  <img
                    src="./assets/payment-3/icon-chevron-right.svg"
                    alt=""
                    className={styles.chevron}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.payBtn} pressable`}
        onClick={() => navigate('payment-4')}
      >
        Pay 12 · SGD 210,150.00
      </button>
    </div>
  );
}
