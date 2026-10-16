import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ServiceCard from "./ServiceCard";
import type { ServiceCardProps } from "./ServiceCard";
import CtaButton from "./CtaButton";
import { DEFAULT_SERVICES } from "../data/servicesData";
import "./Services.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface ServicesProps {
    subtitle?: string;
    title?: string;
    services?: ServiceCardProps[];
    ctaText?: string;
    onCtaClick?: () => void;
}

export const Services: React.FC<ServicesProps> = ({
    subtitle = "O que fazemos",
    title = "Serviços",
    services = DEFAULT_SERVICES,
    ctaText = "Escolher o meu estilo",
    onCtaClick,
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!headerRef.current || !gridRef.current) return;

            const cards = gridRef.current.querySelectorAll(".serviceCard");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 30%",
                    toggleActions: "play none none none",
                },
            });

            // 1. Entrada suave do cabeçalho
            tl.fromTo(
                headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );

            // 2. Aparição em cascata dos cards
            if (cards.length > 0) {
                tl.fromTo(
                    cards,
                    { opacity: 0, y: 35, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.1,
                        duration: 0.55,
                        ease: "power2.out",
                    },
                    "-=0.3"
                );
            }

            // 3. Revelação do botão de ação
            if (ctaRef.current) {
                tl.fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                    "-=0.2"
                );
            }
        },
        { scope: sectionRef }
    );

    return (
        <section className="servicesSection" ref={sectionRef}>
            <div className="servicesContainer">
                <header className="servicesHeader" ref={headerRef}>
                    <span className="servicesSubtitle">{subtitle}</span>
                    <h2 className="servicesTitle">{title}</h2>
                </header>

                <div className="servicesGrid" ref={gridRef}>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id ?? `service-${index}`}
                            title={service.title}
                            description={service.description}
                            price={service.price}
                            icon={service.icon}
                            iconAlt={service.iconAlt}
                            badge={service.badge}
                            onClick={service.onClick}
                            className={service.className}
                        />
                    ))}
                </div>

                <div className="servicesCtaWrapper" ref={ctaRef}>
                    <CtaButton
                        text={ctaText}
                        hasArrow={true}
                        onClick={onCtaClick}
                        ariaLabel={ctaText}
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
