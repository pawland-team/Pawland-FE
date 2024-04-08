import { CSSProp } from 'styled-components';

import { CustomTheme } from '@shared/ui/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}
