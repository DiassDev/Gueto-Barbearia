import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import aboutImg from "../assets/GuetoAbout.png";
import CtaButton from "./CtaButton";
import "./About.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface AboutProps {
    subtitle?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}

export const About: React.FC<AboutProps> = ({
    subtitle = "Sobre o Gueto",
    ctaText = "Conhecer o Gueto",
    onCtaClick,
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!contentRef.current || !imageRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 30%",
                    toggleActions: "play none none none",
                },
            });

            // Animação do conteúdo textual à esquerda
            tl.fromTo(
                contentRef.current,
                { opacity: 0, x: -35 },
                { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
            );

            // Animação da imagem à direita
            tl.fromTo(
                imageRef.current,
                { opacity: 0, x: 35, scale: 0.96 },
                { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            );
        },
        { scope: sectionRef }
    );

    return (
        <section className="aboutSection" ref={sectionRef}>
            <div className="aboutContainer">
                {/* Coluna da Esquerda: Textos e CTA */}
                <div className="aboutContent" ref={contentRef}>
                    <span className="aboutSubtitle">{subtitle}</span>

                    <h2 className="aboutTitle">
                        Feito pra quem <span className="aboutHighlight">tem</span>
                        <br />
                        <span className="aboutHighlight">presença.</span>
                    </h2>

                    <div className="aboutDescription">
                        <p className="aboutText">
                            O Gueto nasceu para transformar cabelo em identidade.
                            Aqui, cada trança, braid ou lock é pensado de acordo com o seu estilo, seu cabelo e a imagem que você quer transmitir.
                        </p>

                        <p className="aboutEmphasis">
                            <strong className="aboutStatement">
                                Seu cabelo. Sua referência. Seu corre.
                            </strong>
                        </p>
                    </div>

                    <div className="aboutCtaWrapper">
                        <CtaButton
                            text={ctaText}
                            hasArrow={true}
                            onClick={onCtaClick}
                            ariaLabel={ctaText}
                        />
                    </div>
                </div>

                {/* Coluna da Direita: Imagem */}
                <div className="aboutImageWrapper" ref={imageRef}>
                    <img
                        src={aboutImg}
                        alt="Cliente do Gueto Barbearia sorrindo com tranças e óculos escuros"
                        className="aboutImage"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
