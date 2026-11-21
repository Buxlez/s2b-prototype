import { useNavigation } from '../../app/navigation';
import { BotCircleAvatar } from '../../components/BotCircleAvatar';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './Cooperation1.module.css';

export function Cooperation1() {
  const { backOrTo } = useNavigation();

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
        <BotCircleAvatar bot="bob" size={40} />
        <span className={styles.agentChipName}>Bob</span>
      </div>

      <TopCircleButton icon="share" position="right" ariaLabel="Share" />

      <div className={styles.timestampRow}>
        <p className={styles.timestampText}>Today 14:20</p>
      </div>

      <div className={styles.userBubbleRow}>
        <div className={styles.userBubble}>
          <p className={styles.userBubbleText}>
            Keep at least SGD 80,000 in CA ••0898 for payroll on 15 Nov.
          </p>
        </div>
      </div>

      <div className={styles.agentBubbleRow1}>
        <div className={styles.agentBubble}>
          <p className={styles.agentBubbleText}>
            Bob was about to pay SGD 50,000 to Lim Supplies from CA ••0898. That would leave SGD 50,000, below your payroll reserve, so I paused it.
          </p>
        </div>
      </div>

      <div className={styles.threadLinkRow}>
        <button type="button" className={`${styles.threadLinkPill} pressable`}>
          <span className={styles.threadCountGroup}>
            <img src="./assets/common/icon-message.svg" alt="" className={styles.icon18} />
            <span className={styles.threadCountText}>3</span>
          </span>
          <BotCircleAvatar bot="bob" size={18} bare />
          <span className={styles.threadLabel}>Bob</span>
          <img src="./assets/common/icon-chevron-sm.svg" alt="" className={styles.chevron14} />
        </button>
      </div>

      <div className={styles.agentBubbleRow2}>
        <div className={styles.agentBubble}>
          <p className={styles.agentBubbleText}>
            Bob found SGD 60,000 in SA ••2210 and updated the draft. Which way do you want to go?
          </p>
        </div>
      </div>

      <div className={styles.questionCard}>
        <div className={styles.questionHeader}>
          <p className={styles.questionTitle}>How should this payment go out?</p>
          <button type="button" className={`${styles.cardCloseBtn} pressable`} aria-label="Dismiss">
            <img src="./assets/common/icon-x-sm.svg" alt="" className={styles.closeIcon18} />
          </button>
        </div>

        <button type="button" className={`${styles.optionA} pressable`}>
          <span className={styles.badgeActive}>A</span>
          <span className={styles.optionText}>Pay from SA ••2210</span>
          <span className={styles.spacer} />
          <span className={styles.recommendedPill}>Recommended</span>
        </button>

        <button type="button" className={`${styles.optionDefault} pressable`}>
          <span className={styles.badgeMuted}>B</span>
          <span className={styles.optionText}>Pay after payroll on 16 Nov</span>
        </button>

        <button type="button" className={`${styles.optionDefault} pressable`}>
          <span className={styles.badgeMuted}>C</span>
          <span className={styles.optionText}>Keep CA ••0898, ignore the reserve</span>
        </button>
      </div>

      <div className={styles.bottomFade} />

      <button type="button" className={`${styles.addCircleBtn} pressable`} aria-label="Add attachment">
        <img src="./assets/common/icon-plus-composer.svg" alt="" className={styles.addIcon22} />
      </button>

      <div className={styles.composerPill}>
        <span className={styles.composerPlaceholder}>Ask Kevin…</span>
        <span className={styles.spacer} />
        <button type="button" className={`${styles.voiceBtn} pressable`} aria-label="Voice input">
          <img src="./assets/common/icon-voice-bars.svg" alt="" className={styles.voiceIcon20} />
        </button>
      </div>
    </div>
  );
}
