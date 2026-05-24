import { useEffect, useRef } from "react";

/**
 * Injects floating star <span> elements into every nebula button inside `containerRef`.
 * Call once per page component. Pass no ref to target the whole document.
 *
 * Usage:
 *   const ref = useRef(null);
 *   useNebulaStars(ref);
 *   return <div ref={ref}>...</div>
 *
 * Or at page level (targets document.body):
 *   useNebulaStars();
 */

const NEBULA_CLASSES = [
  "btn-nebula-purple",
  "btn-hero-glass",
  "btn-nebula-ghost",
  "nebula-remove-btn",
];

// Config per button type
const CONFIG = {
  "btn-nebula-purple": { count: 10, minSize: 1.5, maxSize: 2.5, minDur: 2.2, maxDur: 4.0 },
  "btn-hero-glass":    { count: 8,  minSize: 1.0, maxSize: 2.0, minDur: 2.5, maxDur: 4.5 },
  "btn-nebula-ghost":  { count: 7,  minSize: 1.0, maxSize: 1.8, minDur: 2.8, maxDur: 4.2 },
  "nebula-remove-btn": { count: 7,  minSize: 1.2, maxSize: 2.2, minDur: 2.0, maxDur: 3.5 },
};

function rand(min, max) { return Math.random() * (max - min) + min; }

function injectStars(btn) {
  // Don't double-inject
  if (btn.dataset.nebulaStars) return;
  btn.dataset.nebulaStars = "1";

  const cls = NEBULA_CLASSES.find(c => btn.classList.contains(c));
  if (!cls) return;
  const { count, minSize, maxSize, minDur, maxDur } = CONFIG[cls];

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = "neb-star";

    const size = rand(minSize, maxSize);
    const dur  = rand(minDur, maxDur);
    const delay = rand(0, dur);                 // stagger so they don't all start together
    const dx   = rand(-6, 6);                  // sideways drift (CSS var)

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${rand(5, 92)}%;
      top: ${rand(20, 88)}%;
      --dx: ${dx}px;
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
    `;

    btn.appendChild(star);
  }
}

export default function useNebulaStars(containerRef) {
  const observerRef = useRef(null);

  useEffect(() => {
    const getRoot = () =>
      containerRef?.current ?? document.body;

    // Inject into already-mounted buttons
    const root = getRoot();
    NEBULA_CLASSES.forEach(cls => {
      root.querySelectorAll(`.${cls}`).forEach(injectStars);
    });

    // Watch for dynamically added buttons (e.g. new CourseRow)
    observerRef.current = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          NEBULA_CLASSES.forEach(cls => {
            if (node.classList?.contains(cls)) injectStars(node);
            node.querySelectorAll?.(`.${cls}`).forEach(injectStars);
          });
        });
      });
    });

    observerRef.current.observe(root, { childList: true, subtree: true });

    return () => observerRef.current?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}