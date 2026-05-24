import { useEffect, useRef } from "react";

const NEBULA_CLASSES = [
  "btn-nebula-purple",
  "btn-hero-glass",
  "btn-nebula-ghost",
  "nebula-remove-btn",
];

const CONFIG = {
  "btn-nebula-purple": { count: 10, minSize: 1.5, maxSize: 2.5, minDur: 2.2, maxDur: 4.0 },
  "btn-hero-glass":    { count: 8,  minSize: 1.0, maxSize: 2.0, minDur: 2.5, maxDur: 4.5 },
  "btn-nebula-ghost":  { count: 7,  minSize: 1.0, maxSize: 1.8, minDur: 2.8, maxDur: 4.2 },
  "nebula-remove-btn": { count: 7,  minSize: 1.2, maxSize: 2.2, minDur: 2.0, maxDur: 3.5 },
};

function rand(min, max) { return Math.random() * (max - min) + min; }

function injectStars(btn) {
  if (btn.dataset.nebulaStars) return;
  btn.dataset.nebulaStars = "1";
  const cls = NEBULA_CLASSES.find(c => btn.classList.contains(c));
  if (!cls) return;
  const { count, minSize, maxSize, minDur, maxDur } = CONFIG[cls];
  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = "neb-star";
    const size = rand(minSize, maxSize), dur = rand(minDur, maxDur);
    star.style.cssText = `width:${size}px;height:${size}px;left:${rand(5,92)}%;top:${rand(20,88)}%;--dx:${rand(-6,6)}px;animation-duration:${dur}s;animation-delay:-${rand(0,dur)}s;`;
    btn.appendChild(star);
  }
}

function injectAll(root) {
  NEBULA_CLASSES.forEach(cls => root.querySelectorAll(`.${cls}`).forEach(injectStars));
}

export default function useNebulaStars(containerRef) {
  const observerRef = useRef(null);

  useEffect(() => {
    const root = containerRef?.current ?? document.body;

    // Immediate pass
    injectAll(root);
    // Delayed pass — catches buttons rendered in same JS tick as useEffect
    const t = setTimeout(() => injectAll(root), 50);

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

    return () => { clearTimeout(t); observerRef.current?.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}