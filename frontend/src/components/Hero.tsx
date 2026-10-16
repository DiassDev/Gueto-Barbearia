import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heroImg from "../assets/GuetoHero.png";
import crownImg from "../assets/GuetoCrown.png";
import "./Hero.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);


function Typed({ text }: { text: string }) {
  return (
    <span className="hero__line-inner">
      {Array.from(text).map((ch, i) => (
        <span className="hero__char" key={i}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const CHAR_DELAY = 0.05; // segundos por letra
        const LINE_PAUSE = 0.15; // pausa entre linhas

        const chars = gsap.utils.toArray<HTMLElement>(".hero__char");
        const lines = gsap.utils.toArray<HTMLElement>(".hero__line");
        gsap.set(chars, { visibility: "hidden" });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero__label", { autoAlpha: 0, y: -10, duration: 0.6 }, 0).from(
          ".hero__person",
          { autoAlpha: 0, y: 80, scale: 0.96, duration: 1.2 },
          0.1
        );

        /* ---------- Typewriter ---------- */
        let t = 0.5;
        let current: HTMLElement | null = null;

        lines.forEach((line) => {
          line.querySelectorAll<HTMLElement>(".hero__char").forEach((char) => {
            tl.call(
              () => {
                current?.classList.remove("is-caret");
                char.style.visibility = "visible";
                char.classList.add("is-caret");
                current = char;
              },
              [],
              t
            );
            t += CHAR_DELAY;
          });
          t += LINE_PAUSE;
        });

        const end = t - LINE_PAUSE;

        // cursor pisca no final e some
        tl.call(() => current?.classList.add("is-blink"), [], end)
          .call(() => current?.classList.remove("is-caret", "is-blink"), [], end + 1.8)
          .from(
            ".hero__crown",
            { autoAlpha: 0, scale: 0, rotate: -40, duration: 0.8, ease: "back.out(2)" },
            end
          )
          .from(".hero__proof", { autoAlpha: 0, y: 20, duration: 0.6 }, end + 0.2);

        /* ---------- Parallax com o mouse ---------- */
        const layers = gsap.utils.toArray<HTMLElement>(".hero__layer");
        const movers = layers.map((el) => ({
          depth: parseFloat(el.dataset.depth ?? "0"),
          x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" }),
        }));

        const onMove = (e: MouseEvent) => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const nx = e.clientX / w - 0.5;
          const ny = e.clientY / h - 0.5;
          movers.forEach((m) => {
            m.x(nx * w * m.depth);
            m.y(ny * h * m.depth);
          });
        };
        window.addEventListener("mousemove", onMove);

        /* ---------- Parallax de scroll (se houver seções abaixo) ---------- */
        const st = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(".hero__layer--text", { yPercent: -12, ease: "none", scrollTrigger: st });
        gsap.to(".hero__layer--person", { yPercent: 6, ease: "none", scrollTrigger: st });

        return () => {
          window.removeEventListener("mousemove", onMove);
          chars.forEach((c) => {
            c.style.visibility = "";
            c.classList.remove("is-caret", "is-blink");
          });
        };
      });
    },
    { scope: root }
  );

  return (
    <section className="hero" ref={root}>
      <div className="hero__stage">
        {/* Camada de trás: texto */}
        <div className="hero__layer hero__layer--text" data-depth="-0.02">
          <span className="hero__label">O gueto</span>

          <h1 className="hero__title" aria-label="Transforma seu cabelo em uma coroa">
            <span className="hero__stack hero__stack--left" aria-hidden="true">
              <span className="hero__line">
                <Typed text="Transforma" />
              </span>
              <span className="hero__line is-gray">
                <Typed text="Seu cabelo" />
              </span>
            </span>

            <span className="hero__row--bottom" aria-hidden="true">
              <span className="hero__line hero__line--em">
                <Typed text="em" />
              </span>

              <span className="hero__stack hero__stack--right">
                <span className="hero__line">
                  <Typed text="uma" />
                </span>
                <span className="hero__line hero__line--crown">
                  <span className="hero__line-mask is-gray">
                    <Typed text="coroa" />
                  </span>
                  <img className="hero__crown" src={crownImg} alt="" />
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* Camada da frente: pessoa */}
        <div className="hero__layer hero__layer--person" data-depth="0.025">
          <img className="hero__person" src={heroImg} alt="Cliente com tranças sorrindo" />
        </div>

        <div className="hero__proof">
          <div className="hero__avatars">
            <i />
            <i />
            <i />
          </div>
          <span>+200 Clientes e seguidores fiéis</span>
        </div>
      </div>
    </section>
  );
}