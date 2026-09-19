import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Thin top-of-page progress bar shown on every route change, so navigation
 * always gives instant visual feedback — independent of how fast the
 * destination page's code chunk loads. See <PageLoader/> in RootLayout for
 * the Suspense fallback that covers genuinely slow chunk loads.
 */
export function RouteProgress() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setVisible(true);
    setWidth(0);
    const raf = requestAnimationFrame(() => setWidth(72));
    const finish = window.setTimeout(() => setWidth(100), 260);
    const hide = window.setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 480);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(finish);
      window.clearTimeout(hide);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-[3px]" aria-hidden>
      <div
        className="h-full bg-accent-500 shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-[width] ease-out motion-reduce:transition-none"
        style={{ width: `${width}%`, transitionDuration: width === 100 ? '150ms' : '260ms' }}
      />
    </div>
  );
}
