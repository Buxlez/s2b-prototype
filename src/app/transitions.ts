export const DISSOLVE_TRANSITION = {
  duration: 0.3,
  ease: [0, 0, 0.2, 1] as const,
};

export const HOME_SPRING = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 34,
  mass: 1,
};

export const SHEET_SPRING = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 36,
  mass: 0.9,
};
