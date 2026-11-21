import styles from './TopCircleButton.module.css';

export type TopCircleIconType = 'back' | 'dots' | 'plus' | 'close' | 'close-shadow' | 'share';

interface TopCircleButtonProps {
  icon: TopCircleIconType;
  position: 'left' | 'right';
  onClick?: () => void;
  ariaLabel: string;
}

const BAKED_ASSETS: Partial<Record<TopCircleIconType, string>> = {
  back: './assets/common/btn-back.svg',
  dots: './assets/common/btn-dots.svg',
  plus: './assets/common/btn-plus.svg',
  'close-shadow': './assets/common/btn-close.svg',
};

export function TopCircleButton({
  icon,
  position,
  onClick,
  ariaLabel,
}: TopCircleButtonProps) {
  const posClass = position === 'left' ? styles.left : styles.right;

  if (icon === 'close') {
    return (
      <button
        type="button"
        className={`${styles.glassCircleBtn} ${posClass} pressable`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <img src="./assets/common/icon-x.svg" alt="" className={styles.innerIcon} />
      </button>
    );
  }

  if (icon === 'share') {
    return (
      <button
        type="button"
        className={`${styles.bakedCircleBtn} ${posClass} pressable`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <img src="./assets/common/btn-share-circle.svg" alt="" className={styles.bakedImg} />
        <img src="./assets/common/icon-share.svg" alt="" className={styles.overlayIcon} />
      </button>
    );
  }

  const src = BAKED_ASSETS[icon]!;
  return (
    <button
      type="button"
      className={`${styles.bakedCircleBtn} ${posClass} pressable`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <img src={src} alt="" className={styles.bakedImg} />
    </button>
  );
}
