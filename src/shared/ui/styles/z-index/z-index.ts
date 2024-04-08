import { RootId } from '../root-id';

type ZIndexObject = {
  [key in RootId]: number;
} & Record<string, number>;

type ZIndex<T extends ZIndexObject> = Readonly<T>;

export const zIndex: ZIndex<{ root: 1; floatingButton: 2; nav: 3; sidebar: 4; modal: 5 }> = {
  root: 1,
  floatingButton: 2,
  nav: 3,
  sidebar: 4,
  modal: 5,
};
