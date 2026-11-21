import { useNavigation } from '../../app/navigation';
import { SystemBar } from '../../components/SystemBar';
import { TopCircleButton } from '../../components/TopCircleButton';
import styles from './SetUp2.module.css';

export function SetUp2() {
  const { navigate, backOrTo } = useNavigation();

  return (
    <div className={styles.screen}>
      <SystemBar showDynamicIsland />
      <TopCircleButton
        icon="close"
        position="right"
        ariaLabel="Close"
        onClick={() => backOrTo('setup-1')}
      />

      <p className={styles.title}>Bots</p>

      <div className={styles.cardsList}>
        {/* Kevin card */}
        <div className={styles.botCard}>
          <div className={styles.botGlass} />
          <img src="./assets/setup-2/avatar-kevin.webp" alt="Kevin" className={styles.kevinAvatar} />
          <div className={styles.botInfo}>
            <div className={styles.nameRow}>
              <span className={styles.botName}>Kevin</span>
              <span className={styles.ownerPill}>
                <span>Samuel</span>
                <img src="./assets/setup-2/icon-user-share.svg" alt="" className={styles.ownerIcon} />
              </span>
            </div>
            <p className={styles.botDesc}>
              Kevin monitors cash flow, flags payment conflicts...
            </p>
          </div>
          <button type="button" className={`${styles.actionCircle} pressable`} aria-label="Kevin added">
            <img src="./assets/setup-2/circle-gray.svg" alt="" className={styles.actionCircleBg} />
            <img src="./assets/setup-2/icon-added-check.svg" alt="" className={styles.actionIcon} />
          </button>
        </div>

        {/* Stuart card */}
        <div className={styles.botCard}>
          <div className={styles.botGlass} />
          <img src="./assets/setup-2/avatar-stuart.webp" alt="Stuart" className={styles.stuartAvatar} />
          <div className={styles.botInfo}>
            <div className={styles.nameRow}>
              <span className={styles.botName}>Stuart</span>
              <span className={styles.ownerPill}>
                <span>Kayla</span>
                <img src="./assets/setup-2/icon-user-share.svg" alt="" className={styles.ownerIcon} />
              </span>
            </div>
            <p className={styles.botDesc}>
              Stuart runs your payroll and recurring payments on schedule.
            </p>
          </div>
          <button type="button" className={`${styles.actionCircle} pressable`} aria-label="Add Stuart">
            <img src="./assets/setup-2/circle-dark.svg" alt="" className={styles.actionCircleBg} />
            <img src="./assets/setup-2/plus-white.svg" alt="" className={styles.plusH} />
            <img src="./assets/setup-2/plus-white.svg" alt="" className={styles.plusV} />
          </button>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className={styles.bottomActions}>
        <button
          type="button"
          className={`${styles.usersPlusBtn} pressable`}
          aria-label="Invite user"
          onClick={() => navigate('setup-3')}
        >
          <img src="./assets/setup-2/icon-users-plus.svg" alt="" className={styles.btnIcon} />
        </button>

        <button
          type="button"
          className={`${styles.agentBtn} pressable`}
          onClick={() => navigate('setup-3')}
        >
          <img src="./assets/setup-2/icon-plus-filled.svg" alt="" className={styles.btnIcon} />
          <span>Agent</span>
        </button>
      </div>

      <button type="button" className={`${styles.helpLink} pressable`}>
        Need help？
      </button>
    </div>
  );
}
