import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Manifest.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Manifest() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoWrapperRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            if (!logoWrapperRef.current || !textRef.current) return;

            const chars = textRef.current.querySelectorAll(".char");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: logoWrapperRef.current,
                    start: "top 80%",
                    end: "bottom 40%",
                    toggleActions: "play none none none",
                },
            });

            tl.fromTo(
                logoWrapperRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power2.out",
                }
            ).fromTo(
                chars,
                { opacity: 0, y: 12 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.025,
                    duration: 0.35,
                    ease: "power2.out",
                },
                "-=0.25"
            );
        },
        { scope: containerRef }
    );

    // Função auxiliar para transformar uma frase em spans de palavras e letras protegidas
    const renderWrappedText = (text: string, isHighlight = false) => {
        // Divide o texto por espaços mantendo as palavras intactas
        return text.split(" ").map((word, wordIndex) => (
            <span className={`word ${isHighlight ? "highlight-word" : ""}`} key={wordIndex}>
                {word.split("").map((char, charIndex) => (
                    <span className="char" key={charIndex}>{char}</span>
                ))}&nbsp;{/* Adiciona o espaço em branco tratado */}
            </span>
        ));
    };

    return (
        <div className="manifestWrapper" ref={containerRef}>
            <div className="manifestLogoWrapper" ref={logoWrapperRef}>
                <div className="manifestLogo"></div>
                <h3 className="manifestLogoLabel">since 2026</h3>
            </div>
            
            <h1 className="manifestText" ref={textRef}>
                {renderWrappedText("Cabelo não é só cabelo.")}
                {renderWrappedText("É presença.", true)}
                {renderWrappedText("É identidade.")}
                {renderWrappedText("É cultura.", true)}
                {renderWrappedText("É Chegar sabendo exatamente ")}
                {renderWrappedText("quem você é.", true)}
            </h1>
        </div>
    );
}

export default Manifest;