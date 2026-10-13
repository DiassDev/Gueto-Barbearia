import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Manifest.css";

gsap.registerPlugin(ScrollTrigger);

function Manifest() {
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const chars = el.querySelectorAll(".char");

        const anim = gsap.fromTo(
            chars,
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.03,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "bottom 40%",
                    scrub: false,
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            anim.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    // Função auxiliar para transformar uma frase em spans de palavras e letras protegidas
    const renderWrappedText = (text, isHighlight = false) => {
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
        <>
            <div className="manifestWrapper">
                <div className="manifestLogoWrapper">
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
        </>
    );
}

export default Manifest;