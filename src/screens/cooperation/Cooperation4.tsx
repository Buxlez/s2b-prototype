import { useNavigation } from '../../app/navigation';
import { BotCircleAvatar } from '../../components/BotCircleAvatar';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Cooperation4.module.css';

export function Cooperation4() {
  const { navigate, backOrTo } = useNavigation();

  return (
    <div className={styles.screen}>
      <div className={styles.bgWrapper}>
        <img src="./assets/home/bg-gradient.webp" alt="" className={styles.bgImg} />
      </div>

      <SystemBar showDynamicIsland />
      <TopCircleButton
        icon="back"
        position="left"
        ariaLabel="Back"
        onClick={() => backOrTo('setup-1')}
      />

      <div className={styles.agentChip}>
        <BotCircleAvatar bot="kevin" size={40} />
        <span className={styles.agentChipName}>Kevin</span>
      </div>

      <TopCircleButton
        icon="share"
        position="right"
        ariaLabel="Share"
        onClick={() => navigate('coop-5')}
      />

      {/* Ongoing task card */}
      <button type="button" className={`${styles.ongoingCard} pressable`}>
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
      </button>

      {/* User bubble */}
      <div className={styles.userBubbleRow}>
        <div className={styles.userBubble}>
          <p className={styles.userBubbleText}>Pay the Lim Supplies invoice this week.</p>
        </div>
      </div>

      <div className={styles.timestampRow}>
        <p className={styles.timestampText}>Today 14:37</p>
      </div>

      <div className={styles.threadLinkRow}>
        <button type="button" className={`${styles.threadLinkPill} pressable`}>
          <span className={styles.threadCountGroup}>
            <img src="./assets/common/icon-message.svg" alt="" className={styles.icon18} />
            <span className={styles.threadCountText}>6</span>
          </span>
          <BotCircleAvatar bot="kevin" size={18} />
          <span className={styles.threadLabel}>Kevin</span>
          <img src="./assets/common/icon-chevron-sm.svg" alt="" className={styles.chevron14} />
        </button>
      </div>

      <div className={styles.agentBubble}>
        <p className={styles.agentBubbleText}>
          Kevin spotted a payroll conflict, so I switched the source account. Please review.
        </p>
      </div>

      <div className={styles.approvalCard}>
        <div className={styles.kvRows}>
          <div className={styles.kvRow}>
            <span className={styles.kvKey}>Payee</span>
            <span className={styles.kvValue}>Lim Supplies</span>
          </div>
          <div className={styles.kvRow}>
            <span className={styles.kvKey}>Amount</span>
            <span className={styles.kvValue}>SGD 50,000.00</span>
          </div>
          <div className={styles.kvRow}>
            <span className={styles.kvKey}>From</span>
            <span className={styles.kvValueBold}>SA ••2210</span>
            <span className={styles.changedBadge}>Changed</span>
          </div>
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

      <div className={styles.bottomFade} />

      <button type="button" className={`${styles.addCircleBtn} pressable`} aria-label="Add attachment">
        <img src="./assets/common/icon-plus-composer.svg" alt="" className={styles.addIcon22} />
      </button>

      <div className={styles.composerPill}>
        <span className={styles.composerPlaceholder}>Ask Bob…</span>
        <span className={styles.spacer} />
        <button type="button" className={`${styles.voiceBtn} pressable`} aria-label="Voice input">
          <img src="./assets/common/icon-voice-bars.svg" alt="" className={styles.voiceIcon20} />
        </button>
      </div>
    </div>
  );
}
