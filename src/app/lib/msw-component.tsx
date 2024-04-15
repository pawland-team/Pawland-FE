import { PropsWithChildren, useEffect, useState } from 'react';

const isMockingMode = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
const isProduction = process.env.NODE_ENV === 'production';

export const MSWComponent = ({ children }: PropsWithChildren) => {
  const [mswReady, setMSWReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (isMockingMode) {
        const { initMSW } = await import('@mocks/index');
        await initMSW();
        setMSWReady(true);
      }
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (isProduction) {
    return <>{children}</>;
  }

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
};
