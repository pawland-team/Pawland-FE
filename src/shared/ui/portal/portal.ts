import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { rootId } from '../styles/root-id';

type PortalId = `#${keyof typeof rootId}`;

interface PortalProps extends PropsWithChildren {
  rootId: PortalId;
}

export const Portal = ({ rootId, children }: PortalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    containerRef.current = document.querySelector(rootId);

    return () => setIsMounted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMounted && containerRef.current ? createPortal(children, containerRef.current) : null;
};
