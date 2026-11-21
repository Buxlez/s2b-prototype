import styles from './BotCircleAvatar.module.css';

export interface BotCircleAvatarProps {
  bot: 'bob' | 'kevin';
  size?: 14 | 18 | 32 | 40;
  bare?: boolean;
  className?: string;
}

export function BotCircleAvatar({
  bot,
  size = 32,
  bare = false,
  className = '',
}: BotCircleAvatarProps) {
  const rootClass = [
    bare ? styles.bare : styles.circle,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (bot === 'kevin') {
    return (
      <div
        className={rootClass}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      >
        <img
          src="./assets/common/avatars/kevin-glow.svg"
          alt=""
          className={styles.kevinGlow}
        />
        <img
          src="./assets/common/avatars/kevin-shape.svg"
          alt=""
          className={styles.kevinBody}
        />
        <img
          src="./assets/common/avatars/kevin-grad.svg"
          alt=""
          className={styles.kevinBody}
        />
        <img
          src="./assets/common/avatars/kevin-eyes.svg"
          alt=""
          className={styles.kevinEyes}
        />
      </div>
    );
  }

  return (
    <div
      className={rootClass}
      style={{ width: size, height: size, borderRadius: bare ? 0 : size / 2 }}
    >
      <img
        src="./assets/common/avatars/bob-glow.svg"
        alt=""
        className={styles.bobGlow}
      />
      {bare ? (
        <img
          src="./assets/common/avatars/bob-mini.webp"
          alt=""
          className={styles.bobMiniPng}
        />
      ) : (
        <>
          <img
            src="./assets/common/avatars/bob-body.svg"
            alt=""
            className={styles.bobBody}
          />
          <img
            src="./assets/common/avatars/bob-eyes.svg"
            alt=""
            className={styles.bobEyes}
          />
        </>
      )}
    </div>
  );
}
