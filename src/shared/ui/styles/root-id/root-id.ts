export const rootId = {
  root: 'root',
  modal: 'modal',
} as const;

export type RootId = keyof typeof rootId;
