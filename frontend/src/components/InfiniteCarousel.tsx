import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./InfiniteCarousel.css";

gsap.registerPlugin(useGSAP);

export interface InfiniteCarouselProps {
  /** Elementos do carrossel (texto ou JSX). */
  items: ReactNode[];
  /** Título opcional acima do carrossel, com linhas nas laterais. */
  title?: string;
  /** Velocidade em pixels por segundo. */
  speed?: number;
  /** Direção do movimento. */
  direction?: "left" | "right";
  /** Desacelera até parar quando o mouse está sobre o carrossel. */
  pauseOnHover?: boolean;
  /** Suaviza as bordas laterais com um fade. */
  fade?: boolean;
  className?: string;
}

export default function InfiniteCarousel({
  items,
  title,
  speed = 50,
  direction = "left",
  pauseOnHover = false,
  fade = false,
  className = "",
}: InfiniteCarouselProps) {
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef(0);

  // reps: quantas vezes a lista se repete em cada grupo
  // distance: largura de um grupo (quanto a esteira percorre por ciclo)
  const [reps, setReps] = useState(1);
  const [distance, setDistance] = useState(0);

  /* ---------- Mede e calcula quantas repetições são necessárias ---------- */
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const set = setRef.current;
    if (!viewport || !set) return;

    const setW = set.getBoundingClientRect().width;
    const viewW = viewport.getBoundingClientRect().width;
    if (!setW || !viewW) return;

    // cada grupo precisa ser ao menos tão largo quanto a tela
    const nextReps = Math.max(1, Math.ceil(viewW / setW));
    setReps(nextReps);
    setDistance(setW * nextReps);
  }, []);

  useEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (setRef.current) ro.observe(setRef.current);
    document.fonts?.ready.then(measure); // refaz a conta quando a fonte carrega

    return () => ro.disconnect();
  }, [measure]);

  /* ---------- Animação ---------- */
  useGSAP(
    () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport || !distance) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const toLeft = direction === "left";

        let tween: gsap.core.Tween;

        tween = gsap.fromTo(
            track,
            { x: toLeft ? 0 : -distance },
            {
                x: toLeft ? -distance : 0,
                duration: distance / speed,
                ease: "none",
                repeat: -1,

                onUpdate: () => {
                    if (tween) {
                    progressRef.current = tween.progress();
                    }
                },
            }
        );

        tween.progress(progressRef.current);

        const slow = () =>
          gsap.to(tween, { timeScale: 0, duration: 0.5, overwrite: true });
        const resume = () =>
          gsap.to(tween, { timeScale: 1, duration: 0.5, overwrite: true });

        if (pauseOnHover) {
          viewport.addEventListener("mouseenter", slow);
          viewport.addEventListener("mouseleave", resume);
        }

        return () => {
          viewport.removeEventListener("mouseenter", slow);
          viewport.removeEventListener("mouseleave", resume);
        };
      });
    },
    {
      scope: rootRef,
      dependencies: [distance, speed, direction, pauseOnHover],
      revertOnUpdate: true,
    }
  );

  /* ---------- Render ---------- */
  const classes = ["carousel", fade ? "carousel--fade" : "", className]
    .filter(Boolean)
    .join(" ");


console.log("InfiniteCarousel:", {
  items: items.length,
  viewport: viewportRef.current?.getBoundingClientRect(),
  set: setRef.current?.getBoundingClientRect(),
  reps,
  distance,
});


  return (
    <section className={classes} ref={rootRef}>
      {title && <p className="carousel__title">{title}</p>}

      <div className="carousel__viewport" ref={viewportRef}>
        <div className="carousel__track" ref={trackRef}>
          {/* Dois grupos idênticos: enquanto um sai, o outro já está entrando */}
          {[0, 1].map((group) => (
            <div className="carousel__group" key={group}>
              {Array.from({ length: reps }).map((_, rep) => {
                const isOriginal = group === 0 && rep === 0;
                return (
                  <ul
                    className="carousel__set"
                    key={rep}
                    ref={isOriginal ? setRef : undefined}
                    aria-hidden={isOriginal ? undefined : true}
                  >
                    {items.map((item, i) => (
                      <li className="carousel__item" key={i}>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}