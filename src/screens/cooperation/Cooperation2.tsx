import { useNavigation } from '../../app/navigation';
import { BotCircleAvatar } from '../../components/BotCircleAvatar';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Cooperation2.module.css';

export function Cooperation2() {
  const { navigate, back, backOrTo } = useNavigation();

  return (
    <div className={styles.screen}>
      <div className={styles.bgWrapper}>
        <img src="./assets/home/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      <SystemBar showDynamicIsland />

      <div className={styles.topHeaderRow}>
        <div className={styles.topBackSlot}>
          <TopCircleButton
            icon="back"
            position="left"
            ariaLabel="Back"
            onClick={() => backOrTo('setup-1')}
          />
        </div>

        <div className={styles.groupChip}>
          <div className={styles.overlapAvatars40}>
            <BotCircleAvatar bot="kevin" size={40} className={styles.overlapFirst40} />
            <BotCircleAvatar bot="bob" size={40} />
          </div>
          <span className={styles.groupChipName}>Kevin &amp; Bob</span>
        </div>

        <button
          type="button"
          className={`${styles.historyBtn} pressable`}
          aria-label="History"
          onClick={() => navigate('coop-3')}
        >
          <img src="./assets/coop-2/icon-history.svg" alt="" className={styles.historyIcon} />
        </button>
      </div>

      <div className={styles.timestampRow}>
        <p className={styles.timestampText}>Today 14:31</p>
      </div>

      <div className={styles.threadLinkRow}>
        <div className={styles.threadLinkPill}>
          <span className={styles.threadCountGroup}>
            <img src="./assets/common/icon-message.svg" alt="" className={styles.icon18} />
            <span className={styles.threadCountText}>3</span>
          </span>
          <div className={styles.overlapAvatars14}>
            <BotCircleAvatar bot="kevin" size={14} className={styles.overlapFirst14} />
            <BotCircleAvatar bot="bob" size={14} />
          </div>
          <span className={styles.threadLabel}>Kevin &amp; Bob</span>
          <img src="./assets/common/icon-chevron-sm.svg" alt="" className={styles.chevron14} />
        </div>
      </div>

      {/* Kevin message */}
      <div className={styles.kevinMessageWrap}>
        <p className={styles.senderLabel}>Kevin</p>
        <div className={styles.messageRow}>
          <BotCircleAvatar bot="kevin" size={32} />
          <div className={styles.messageBubble}>
            <p className={styles.messageText}>
              I paused Bob’s payment. CA ••0898 would fall below your SGD 80,000 payroll reserve.
            </p>
          </div>
        </div>
      </div>

      {/* Bob message */}
      <div className={styles.bobMessageWrap}>
        <p className={styles.senderLabel}>Bob</p>
        <div className={styles.messageRow}>
          <BotCircleAvatar bot="bob" size={32} />
          <div className={styles.messageBubble}>
            <p className={styles.messageText}>
              SA ••2210 has SGD 60,000, so I moved the draft there.
            </p>
          </div>
        </div>
      </div>

      {/* Bob needs you card */}
      <div className={styles.bobNeedsCard}>
        <div className={styles.cardHeaderCol}>
          <div className={styles.needsRow}>
            <img src="./assets/coop-2/dot-blue.svg" alt="" className={styles.dot6} />
            <span className={styles.needsLabel}>Bob · needs you</span>
          </div>
          <p className={styles.cardTitle}>Approve SGD 50,000 to Lim Supplies</p>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaKey}>From</span>
          <span className={styles.metaValue}>SA ••2210</span>
          <span className={styles.changedBadge}>Changed</span>
        </div>

        <div className={styles.actionsRow}>
          <button type="button" className={`${styles.secondaryBtn} pressable`}>
            Edit
          </button>
          <button type="button" className={`${styles.primaryBtn} pressable`}>
            Approve
          </button>
        </div>
      </div>

      {/* Kevin needs you card */}
      <div className={styles.kevinNeedsCard}>
        <div className={styles.cardHeaderCol}>
          <div className={styles.needsRow}>
            <img src="./assets/coop-2/dot-blue.svg" alt="" className={styles.dot6} />
            <span className={styles.needsLabel}>Kevin · needs you</span>
          </div>
          <p className={styles.cardTitle}>Keep SGD 80,000 reserve till 15 Nov?</p>
        </div>

        <div className={styles.actionsRow}>
          <button type="button" className={`${styles.secondaryBtn} pressable`}>
            Change
          </button>
          <button type="button" className={`${styles.primaryBtn} pressable`}>
            Keep
          </button>
        </div>
      </div>

      <div className={styles.bottomFade} />

      <button type="button" className={`${styles.stopBtn} pressable`} onClick={back}>
        <img src="./assets/coop-2/icon-pause.svg" alt="" className={styles.stopIcon} />
        <span className={styles.stopText}>Stop</span>
      </button>
    </div>
  );
}
