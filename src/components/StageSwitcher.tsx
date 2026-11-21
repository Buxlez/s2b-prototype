import { useState } from 'react';
import { useNavigation } from '../app/navigation';
import { ALL_SCREEN_IDS, type ScreenId } from '../app/screens';
import styles from './StageSwitcher.module.css';

export function StageSwitcher() {
  const { current, homeState, setHomeState, navigate } = useNavigation();
  const [collapsed, setCollapsed] = useState(false);

  const handleSelect = (id: ScreenId, nextHomeState?: 'A' | 'B') => {
    if (nextHomeState) {
      setHomeState(nextHomeState);
    }
    navigate(id);
  };

  if (collapsed) {
    return (
      <button
        type="button"
        className={styles.collapsedBtn}
        onClick={() => setCollapsed(false)}
        >
          预览目录 (19 屏)
        </button>
      );
    }

  return (
    <aside className={styles.panel} aria-label="Screen preview switcher">
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>快速跳转 (19 屏)</span>
        <button
          type="button"
          className={styles.collapseBtn}
          onClick={() => setCollapsed(true)}
          title="收起"
        >
          ×
        </button>
      </div>

      <div className={styles.group}>
        <div className={styles.groupLabel}>Home</div>
        <div className={styles.btnGrid}>
          <button
            type="button"
            className={`${styles.itemBtn} ${
              current === 'home' && homeState === 'A' ? styles.active : ''
            }`}
            onClick={() => handleSelect('home', 'A')}
          >
            Home A
          </button>
          <button
            type="button"
            className={`${styles.itemBtn} ${
              current === 'home' && homeState === 'B' ? styles.active : ''
            }`}
            onClick={() => handleSelect('home', 'B')}
          >
            Home B
          </button>
        </div>
      </div>

      {(['payment', 'setup', 'cooperation'] as const).map((groupName) => {
        const prefix = groupName === 'cooperation' ? 'coop-' : `${groupName}-`;
        const ids = ALL_SCREEN_IDS.filter((id) => id.startsWith(prefix));
        return (
          <div key={groupName} className={styles.group}>
            <div className={styles.groupLabel}>{groupName}</div>
            <div className={styles.btnGrid}>
              {ids.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`${styles.itemBtn} ${current === id ? styles.active : ''}`}
                  onClick={() => handleSelect(id)}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
