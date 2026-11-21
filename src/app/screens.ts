export type ScreenId =
  | 'home'
  | 'setup-1'
  | 'setup-2'
  | 'setup-3'
  | 'setup-4'
  | 'setup-5'
  | 'setup-6'
  | 'payment-1'
  | 'payment-2'
  | 'payment-3'
  | 'payment-4'
  | 'payment-5'
  | 'payment-6'
  | 'coop-1'
  | 'coop-2'
  | 'coop-3'
  | 'coop-4'
  | 'coop-5';

export interface ScreenMeta {
  id: ScreenId;
  figmaName: string;
  nodeId: string;
  description: string;
  group: 'home' | 'payment' | 'setup' | 'cooperation';
  overlayParent?: ScreenId;
}

export const SCREENS: Record<ScreenId, ScreenMeta> = {
  home: {
    id: 'home',
    figmaName: 'Homepage-1 / Homepage-2',
    nodeId: '1259:1323 / 1259:1423',
    description: '问候语 + AI Summary / AI Summary 在顶部 + For You + AI Suggestions',
    group: 'home',
  },
  'payment-1': {
    id: 'payment-1',
    figmaName: 'Payment-1',
    nodeId: '1259:1398',
    description: 'AI auto-fill',
    group: 'payment',
  },
  'payment-2': {
    id: 'payment-2',
    figmaName: 'Payment-2',
    nodeId: '1259:1552',
    description: 'Bob is preparing your payment',
    group: 'payment',
  },
  'payment-3': {
    id: 'payment-3',
    figmaName: 'Payment-3',
    nodeId: '1259:2782',
    description: 'Select recipients',
    group: 'payment',
  },
  'payment-4': {
    id: 'payment-4',
    figmaName: 'Payment-4',
    nodeId: '1259:2858',
    description: 'Random check',
    group: 'payment',
  },
  'payment-5': {
    id: 'payment-5',
    figmaName: 'Payment-5',
    nodeId: '1259:2538',
    description: 'AI is double Checking',
    group: 'payment',
  },
  'payment-6': {
    id: 'payment-6',
    figmaName: 'Payment-6',
    nodeId: '1259:5246',
    description: 'Creating payment · Slide to confirm',
    group: 'payment',
  },
  'setup-1': {
    id: 'setup-1',
    figmaName: 'Set up-1',
    nodeId: '1259:1600',
    description: 'Agent 办公室 + 任务列表',
    group: 'setup',
  },
  'setup-2': {
    id: 'setup-2',
    figmaName: 'Set up-2',
    nodeId: '1259:2620',
    description: 'Bots 列表',
    group: 'setup',
  },
  'setup-3': {
    id: 'setup-3',
    figmaName: 'Set up-3',
    nodeId: '1259:1294',
    description: 'What work do you want the agent to do?',
    group: 'setup',
  },
  'setup-4': {
    id: 'setup-4',
    figmaName: 'Set up-4',
    nodeId: '1259:1849',
    description: 'What kind of draft you want to prepare?',
    group: 'setup',
  },
  'setup-5': {
    id: 'setup-5',
    figmaName: 'Set up-5',
    nodeId: '1259:1805',
    description: '底部面板：On Schedule Under Your Control',
    group: 'setup',
    overlayParent: 'setup-4',
  },
  'setup-6': {
    id: 'setup-6',
    figmaName: 'Set up-6',
    nodeId: '1259:2711',
    description: "Review your bot — I'm Stuart",
    group: 'setup',
  },
  'coop-1': {
    id: 'coop-1',
    figmaName: 'Cooperation-1',
    nodeId: '1259:2136',
    description: '和 Bob 的聊天 + 选项卡',
    group: 'cooperation',
  },
  'coop-2': {
    id: 'coop-2',
    figmaName: 'Cooperation-2',
    nodeId: '1259:2229',
    description: 'Kevin & Bob 群聊 + 待审批卡片',
    group: 'cooperation',
  },
  'coop-3': {
    id: 'coop-3',
    figmaName: 'Cooperation-3',
    nodeId: '1259:2405',
    description: 'History',
    group: 'cooperation',
  },
  'coop-4': {
    id: 'coop-4',
    figmaName: 'Cooperation-4',
    nodeId: '1259:1883',
    description: '和 Kevin 的聊天 + Ongoing task',
    group: 'cooperation',
  },
  'coop-5': {
    id: 'coop-5',
    figmaName: 'Cooperation-5',
    nodeId: '1259:1995',
    description: '底部面板：Share to',
    group: 'cooperation',
    overlayParent: 'coop-4',
  },
};

export const ALL_SCREEN_IDS = Object.keys(SCREENS) as ScreenId[];

export function parseHashToScreenId(rawHash: string): ScreenId {
  const cleaned = rawHash.replace(/^#\/?/, '').trim().toLowerCase();
  if (!cleaned || cleaned === 'home') {
    return 'home';
  }
  if (cleaned in SCREENS) {
    return cleaned as ScreenId;
  }
  return 'home';
}

export function screenIdToHash(id: ScreenId): string {
  return id === 'home' ? '#/' : `#/${id}`;
}
