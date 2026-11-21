import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './SetUp1.module.css';

export function SetUp1() {
  const { navigate, backOrTo } = useNavigation();

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />
      <TopCircleButton
        icon="back"
        position="left"
        ariaLabel="Back"
        onClick={() => backOrTo('home', 'B')}
      />
      <TopCircleButton
        icon="plus"
        position="right"
        ariaLabel="Add agent"
        onClick={() => navigate('setup-2')}
      />

      {/* Office scene */}
      <div className={styles.officeScene} aria-hidden>
        {/* Coffee station & plant */}
        <img src="./assets/setup-1/coffee-station.svg" alt="" className={styles.coffeeStation} />
        <img src="./assets/setup-1/corner-plant.svg" alt="" className={styles.cornerPlant} />

        {/* Bob workstation (top-left) */}
        <img src="./assets/setup-1/bob-floor-shadow.svg" alt="" className={styles.bobShadow} />
        <img src="./assets/setup-1/bob-desk-legs.svg" alt="" className={styles.bobLegs} />
        <img src="./assets/setup-1/bob-desktop.svg" alt="" className={styles.bobDesktop} />
        <img src="./assets/setup-1/bob-kb-shadow.svg" alt="" className={styles.bobKbShadow} />
        <img src="./assets/setup-1/bob-stand.svg" alt="" className={styles.bobStand} />
        <img src="./assets/setup-1/bob-kb.svg" alt="" className={styles.bobKb} />
        <img src="./assets/setup-1/bob-kb-line.svg" alt="" className={styles.bobKbLine} />
        <img src="./assets/setup-1/bob-screen.svg" alt="" className={styles.bobScreen} />
        <img src="./assets/setup-1/bob-screen-line1.svg" alt="" className={styles.bobScreenLine1} />
        <img src="./assets/setup-1/bob-screen-line2.svg" alt="" className={styles.bobScreenLine2} />
        <img src="./assets/setup-1/bob-workstation-bot.webp" alt="" className={styles.bobWorkstationBot} />
        <img src="./assets/setup-1/bob-chair.svg" alt="" className={styles.bobChair} />

        {/* Speech bubble "1 Payment" */}
        <div className={styles.speechWrap}>
          <img src="./assets/setup-1/speech-bubble.svg" alt="" className={styles.speechImg} />
          <span className={styles.speechText}>1 Payment</span>
        </div>

        {/* Vacant workstation top-right */}
        <img src="./assets/setup-1/vacant-tr-shadow.svg" alt="" className={styles.trShadow} />
        <img src="./assets/setup-1/vacant-tr-legs.svg" alt="" className={styles.trLegs} />
        <img src="./assets/setup-1/vacant-tr-desktop.svg" alt="" className={styles.trDesktop} />
        <img src="./assets/setup-1/vacant-tr-monitor.svg" alt="" className={styles.trMonitor} />
        <img src="./assets/setup-1/vacant-tr-chair.svg" alt="" className={styles.trChair} />

        {/* Vacant workstation bottom-left */}
        <img src="./assets/setup-1/vacant-bl-shadow.svg" alt="" className={styles.blShadow} />
        <img src="./assets/setup-1/vacant-bl-legs.svg" alt="" className={styles.blLegs} />
        <img src="./assets/setup-1/vacant-bl-desktop.svg" alt="" className={styles.blDesktop} />
        <img src="./assets/setup-1/vacant-bl-monitor.svg" alt="" className={styles.blMonitor} />
        <img src="./assets/setup-1/vacant-bl-chair.svg" alt="" className={styles.blChair} />

        {/* Kevin workstation (bottom-right) */}
        <img src="./assets/setup-1/kevin-shadow.svg" alt="" className={styles.kevinShadow} />
        <img src="./assets/setup-1/kevin-legs.svg" alt="" className={styles.kevinLegs} />
        <img src="./assets/setup-1/kevin-desktop.svg" alt="" className={styles.kevinDesktop} />
        <img src="./assets/setup-1/kevin-monitor.svg" alt="" className={styles.kevinMonitor} />
        <img src="./assets/setup-1/avatar-kevin-3d.webp" alt="" className={styles.kevinWorkstationBot} />
        <img src="./assets/setup-1/kevin-chair.svg" alt="" className={styles.kevinChair} />
      </div>

      {/* Stats cards */}
      <img src="./assets/setup-1/card-left-bg.svg" alt="" className={styles.cardLeftBg} />
      <img src="./assets/setup-1/progress-ring.svg" alt="" className={styles.progressRing} />
      <img src="./assets/setup-1/icon-input-ai.svg" alt="" className={styles.inputAiIcon} />

      <img src="./assets/setup-1/card-right-bg.svg" alt="" className={styles.cardRightBg} />
      <img src="./assets/setup-1/stat-divider.svg" alt="" className={styles.statDivider} />

      <div className={styles.ongoingTasksBlock}>
        <p className={styles.statNum}>12</p>
        <div className={styles.statLabel}>
          <p>Ongoing</p>
          <p>Tasks</p>
        </div>
      </div>

      <div className={styles.taskProgressBlock}>
        <div className={styles.percentRow}>
          <span className={styles.statNum}>80</span>
          <span className={styles.statPct}>%</span>
        </div>
        <p className={styles.statLabel}>Task Progress</p>
      </div>

      {/* Bottom White Sheet */}
      <img src="./assets/setup-1/sheet-bg.svg" alt="" className={styles.sheetBg} />

      {/* Tabs */}
      <div className={styles.tabsRow}>
        <button type="button" className={`${styles.tabAll} pressable`}>
          All
        </button>
        <button type="button" className={`${styles.tabWorking} pressable`}>
          Working
        </button>
        <button type="button" className={`${styles.tabFree} pressable`}>
          Free
        </button>
        <button type="button" className={`${styles.filterBtn} pressable`} aria-label="Filter">
          <img src="./assets/setup-1/icon-filter.svg" alt="" className={styles.filterIcon} />
        </button>
      </div>

      <img src="./assets/setup-1/tab-divider.svg" alt="" className={styles.tabDivider} />
      <img src="./assets/setup-1/active-tab-line.svg" alt="" className={styles.activeTabLine} />

      {/* Row 1: Bob */}
      <button
        type="button"
        className={`${styles.rowHotspot1} pressable`}
        aria-label="Bob task"
        onClick={() => navigate('coop-1')}
      >
        <div className={styles.rowAvatar}>
          <img src="./assets/setup-1/bob-avatar-bg.svg" alt="" className={styles.avatarCircleBg} />
          <img src="./assets/setup-1/bob-progress-arc.svg" alt="" className={styles.bobArc} />
          <div className={styles.bob3dWrap}>
            <img src="./assets/setup-1/avatar-bob-3d.webp" alt="" className={styles.bob3dImg} />
          </div>
          <img src="./assets/setup-1/dot-green.svg" alt="" className={styles.statusDot} />
        </div>
        <div className={styles.rowBody}>
          <div className={styles.rowTop}>
            <span className={styles.rowName}>Bob</span>
            <span className={styles.badgeBlue}>2D Left</span>
            <span className={styles.badgeGreen}>Payment INV–2291</span>
            <span className={styles.rowTime}>2 min ago</span>
          </div>
          <p className={styles.rowDesc}>Preparing payment to Lim Supplies</p>
        </div>
      </button>

      <img src="./assets/setup-1/row-divider.svg" alt="" className={styles.rowDivider1} />

      {/* Row 2: Kevin */}
      <button
        type="button"
        className={`${styles.rowHotspot2} pressable`}
        aria-label="Kevin task"
        onClick={() => navigate('coop-4')}
      >
        <div className={styles.rowAvatar}>
          <img src="./assets/setup-1/kevin-avatar-bg.svg" alt="" className={styles.avatarCircleBg} />
          <img src="./assets/setup-1/avatar-kevin-3d.webp" alt="" className={styles.kevin3dImg} />
          <img src="./assets/setup-1/dot-gray.svg" alt="" className={styles.statusDot} />
        </div>
        <div className={styles.rowBody}>
          <div className={styles.rowTop}>
            <span className={styles.rowName}>Kevin</span>
            <span className={styles.rowTime}>12 min ago</span>
          </div>
          <p className={styles.rowDesc}>Guarding the payroll reserve.</p>
        </div>
      </button>

      <img src="./assets/setup-1/row-divider.svg" alt="" className={styles.rowDivider2} />

      {/* Row 3: Oct supplier batch */}
      <button
        type="button"
        className={`${styles.rowHotspot3} pressable`}
        aria-label="Oct supplier batch"
        onClick={() => navigate('coop-2')}
      >
        <div className={styles.rowAvatar}>
          <img src="./assets/setup-1/bob-avatar-bg.svg" alt="" className={styles.avatarCircleBg} />
          <img src="./assets/setup-1/group-mini-bots.png" alt="" className={styles.miniBotsImg} />
          <img src="./assets/setup-1/dot-green.svg" alt="" className={styles.statusDot} />
        </div>
        <div className={styles.rowBody}>
          <div className={styles.rowTop}>
            <span className={styles.rowName}>Oct supplier batch</span>
            <span className={styles.rowTime}>2d ago</span>
          </div>
          <p className={styles.rowDesc}>Bob · Kevin</p>
        </div>
      </button>
    </div>
  );
}
