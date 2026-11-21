import React, { useEffect, useState } from 'react';
import { StageSwitcher } from '../components/StageSwitcher';
import styles from './PhoneFrame.module.css';

const CANVAS_WIDTH = 402;
const CANVAS_HEIGHT = 874;
const DESKTOP_BREAKPOINT = 500;
const BEZEL_PADDING = 12;
const OUTER_WIDTH = CANVAS_WIDTH + BEZEL_PADDING * 2; // 426
const OUTER_HEIGHT = CANVAS_HEIGHT + BEZEL_PADDING * 2; // 898

interface Viewport {
  width: number;
  height: number;
}

function getViewport(): Viewport {
  if (typeof window === 'undefined') {
    return { width: 1280, height: 800 };
  }
  const vv = window.visualViewport;
  return {
    width: vv ? vv.width : window.innerWidth,
    height: vv ? vv.height : window.innerHeight,
  };
}

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [viewport, setViewport] = useState<Viewport>(getViewport);

  useEffect(() => {
    const update = () => setViewport(getViewport());
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, []);

  const isMobile = viewport.width < DESKTOP_BREAKPOINT;

  if (isMobile) {
    const scale = Math.min(
      viewport.width / CANVAS_WIDTH,
      viewport.height / CANVAS_HEIGHT,
    );

    return (
      <div className={styles.mobileStage}>
        <div
          className={styles.scaledCanvasWrapper}
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <div className={styles.canvasMobile}>{children}</div>
        </div>
      </div>
    );
  }

  const desktopPad = 40;
  const rawScale = Math.min(
    (viewport.width - desktopPad) / OUTER_WIDTH,
    (viewport.height - desktopPad) / OUTER_HEIGHT,
  );
  const scale = Math.min(Math.max(rawScale, 0.35), 1.15);

  return (
    <div className={styles.desktopStage}>
      <StageSwitcher />
      <div
        className={styles.scaledBezelWrapper}
        style={{
          width: OUTER_WIDTH,
          height: OUTER_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        <div className={styles.iphoneBezel}>
          <div className={styles.sideButtonLeftMute} aria-hidden />
          <div className={styles.sideButtonLeftVolUp} aria-hidden />
          <div className={styles.sideButtonLeftVolDown} aria-hidden />
          <div className={styles.sideButtonRightPower} aria-hidden />
          <div className={styles.canvasDesktop}>{children}</div>
        </div>
      </div>
    </div>
  );
}
