import { useNavigation } from '../../app/navigation';
import { BotCircleAvatar } from '../../components/BotCircleAvatar';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Cooperation3.module.css';

export function Cooperation3() {
  const { backOrTo } = useNavigation();

  return (
    <div className={styles.screen}>
      <div className={styles.bgWrapper}>
        <img src="./assets/home/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      <SystemBar showDynamicIsland />

      <div className={styles.titleBlock}>
        <p className={styles.title}>History</p>
        <p className={styles.subtitle}>Supplier payment INV-2291</p>
      </div>

      <TopCircleButton
        icon="close-shadow"
        position="right"
        ariaLabel="Close"
        onClick={() => backOrTo('coop-2')}
      />

      <div className={styles.segmentedControl}>
        <button type="button" className={`${styles.segTabActive} pressable`}>
          Decisions
        </button>
        <button type="button" className={`${styles.segTabMuted} pressable`}>
          All messages · 8
        </button>
      </div>

      {/* Timeline Event 1 */}
      <div className={styles.eventRow} style={{ top: 213 }}>
        <div className={styles.railCol}>
          <div className={styles.youCircle}>S</div>
          <div className={styles.railLine} />
        </div>
        <div className={styles.contentCol}>
          <div className={styles.titleLine}>
            <span className={styles.itemTitle}>You asked Bob to pay INV-2291</span>
            <span className={styles.spacer} />
            <span className={styles.itemTime}>Mon 09:12</span>
          </div>
          <p className={styles.itemDescLight}>Lim Supplies</p>
        </div>
      </div>

      {/* Timeline Event 2 */}
      <div className={styles.eventRow} style={{ top: 284 }}>
        <div className={styles.railCol}>
          <BotCircleAvatar bot="bob" size={32} />
          <div className={styles.railLine} />
        </div>
        <div className={styles.contentCol}>
          <div className={styles.titleLine}>
            <span className={styles.itemTitle}>Created draft from CA ••0898</span>
            <span className={styles.spacer} />
            <span className={styles.itemTime}>14:31</span>
          </div>
          <p className={styles.itemDescRegular}>SGD 50,000 → Lim Supplies</p>
        </div>
      </div>

      {/* Timeline Event 3 */}
      <div className={styles.eventRow} style={{ top: 355 }}>
        <div className={styles.railCol}>
          <BotCircleAvatar bot="kevin" size={32} />
          <div className={styles.railLine} />
        </div>
        <div className={styles.contentCol}>
          <div className={styles.titleLine}>
            <span className={styles.itemTitle}>Flagged a payroll conflict</span>
            <span className={styles.spacer} />
            <span className={styles.itemTime}>14:32</span>
          </div>
          <p className={styles.itemDescWrap}>
            Balance after payment SGD 50,000 &lt; reserve SGD 80,000
          </p>
          <div className={styles.toggleWrap}>
            <button type="button" className={`${styles.countPill} pressable`}>
              <img src="./assets/common/icon-message.svg" alt="" className={styles.icon14} />
              <span className={styles.countText}>1</span>
              <img src="./assets/coop-3/icon-chevron-down.svg" alt="" className={styles.icon12} />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Event 4 */}
      <div className={styles.eventRow} style={{ top: 479 }}>
        <div className={styles.railCol}>
          <BotCircleAvatar bot="bob" size={32} />
          <div className={styles.railLine} />
        </div>
        <div className={styles.contentCol}>
          <div className={styles.titleLine}>
            <span className={styles.itemTitle}>Paused the payment</span>
            <span className={styles.spacer} />
            <span className={styles.itemTime}>14:33</span>
          </div>
          <p className={styles.itemDescLight}>Status: on hold</p>
        </div>
      </div>

      {/* Timeline Event 5 */}
      <div className={styles.eventRow} style={{ top: 550 }}>
        <div className={styles.railCol}>
          <BotCircleAvatar bot="bob" size={32} />
          <img src="./assets/coop-3/dashed-line.svg" alt="" className={styles.dashedLine} />
        </div>
        <div className={styles.contentCol}>
          <div className={styles.titleLine}>
            <span className={styles.itemTitle}>Switched to SA ••2210</span>
            <span className={styles.spacer} />
            <span className={styles.itemTime}>14:36</span>
          </div>
          <p className={styles.itemDescLight}>
            SA ••2210 has SGD 60,000 · enough to pay
          </p>
          <div className={styles.toggleWrap}>
            <button type="button" className={`${styles.countPill} pressable`}>
              <img src="./assets/common/icon-message.svg" alt="" className={styles.icon14} />
              <span className={styles.countText}>3</span>
              <img src="./assets/coop-3/icon-chevron-down.svg" alt="" className={styles.icon12} />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Event 6 */}
      <button type="button" className={`${styles.pendingEventBtn} pressable`}>
        <div className={styles.pendingRail}>
          <div className={styles.pendingCircle}>
            <img src="./assets/coop-3/pending-ring.png" alt="" className={styles.pendingRing} />
          </div>
        </div>
        <div className={styles.pendingContent}>
          <div className={styles.titleLine}>
            <span className={styles.pendingTitle}>Waiting for your approval</span>
            <span className={styles.spacer} />
            <span className={styles.itemTime}>Now</span>
          </div>
          <p className={styles.itemDescLight}>Open task card</p>
        </div>
      </button>
    </div>
  );
}
