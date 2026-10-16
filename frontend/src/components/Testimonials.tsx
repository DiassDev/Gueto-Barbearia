import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TestimonialCard from "./TestimonialCard";
import type { TestimonialCardProps } from "./TestimonialCard";
import { DEFAULT_TESTIMONIALS } from "../data/testimonialsData";
import "./Testimonials.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface TestimonialsProps {
    subtitle?: string;
    titleFirstLine?: string;
    titleSecondLine?: string;
    testimonials?: TestimonialCardProps[];
    speedSeconds?: number;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
    subtitle = "Quem já passou pelo Gueto.",
    titleFirstLine = "Não é só a gente",
    titleSecondLine = "que fala.",
    testimonials = DEFAULT_TESTIMONIALS,
    speedSeconds = 35,
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!headerRef.current || !carouselRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 30%",
                    toggleActions: "play none none none",
                },
            });

            // Animação de entrada do cabeçalho
            tl.fromTo(
                headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );

            // Animação de entrada do carrossel
            tl.fromTo(
                carouselRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
                "-=0.3"
            );
        },
        { scope: sectionRef }
    );

    return (
        <section className="testimonialsSection" ref={sectionRef}>
            <div className="testimonialsContainer">
                <header className="testimonialsHeader" ref={headerRef}>
                    <span className="testimonialsSubtitle">{subtitle}</span>
                    <h2 className="testimonialsTitle">
                        {titleFirstLine}
                        <br />
                        {titleSecondLine}
                    </h2>
                </header>

                <div
                    className="testimonialsViewport"
                    ref={carouselRef}
                    aria-label="Carrossel de depoimentos"
                >
                    <div
                        className="testimonialsTrack"
                        style={{ animationDuration: `${speedSeconds}s` }}
                    >
                        {[0, 1].map((groupIndex) => (
                            <div
                                key={groupIndex}
                                className="testimonialsGroup"
                                aria-hidden={groupIndex === 1 ? true : undefined}
                            >
                                {testimonials.map((item, index) => (
                                    <TestimonialCard
                                        key={item.id ? `${item.id}-${groupIndex}` : `t-${groupIndex}-${index}`}
                                        name={item.name}
                                        testimonial={item.testimonial}
                                        rating={item.rating}
                                        avatar={item.avatar}
                                        avatarAlt={item.avatarAlt}
                                        role={item.role}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
