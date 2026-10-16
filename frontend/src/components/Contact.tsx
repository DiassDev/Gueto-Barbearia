import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CtaButton from "./CtaButton";
import "./Contact.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface ContactInfoItem {
    label: string;
    value: string;
    href?: string;
}

export interface BookingFormData {
    name: string;
    service: string;
    date: string;
    time: string;
}

export interface ContactProps {
    subtitle?: string;
    titleFirstLine?: string;
    titleHighlight?: string;
    description?: string;
    infoItems?: ContactInfoItem[];
    onSubmitBooking?: (data: BookingFormData) => void;
}

const DEFAULT_INFO_ITEMS: ContactInfoItem[] = [
    {
        label: "WhatsApp",
        value: "+55 (11) 99999-9999",
        href: "https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20Gueto%20Barbearia.",
    },
    {
        label: "Atendimento",
        value: "Ter - Sáb: 9h às 20h",
    },
    {
        label: "Local",
        value: "Volta Redonda, RJ",
        href: "https://maps.google.com/?q=Rua+Augusta+1234+Sao+Paulo",
    },
    {
        label: "Redes sociais",
        value: "@guetobarbearia",
        href: "https://instagram.com/guetobarbearia",
    },
];

export const Contact: React.FC<ContactProps> = ({
    subtitle = "Seu próximo visual",
    titleFirstLine = "Bora deixar esse",
    titleHighlight = "cabelo em dia?",
    description = "Escolha seu serviço, encontre um horário e vem pra Gueto.",
    infoItems = DEFAULT_INFO_ITEMS,
    onSubmitBooking,
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // Estados do Formulário de Agendamento
    const [name, setName] = useState("");
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    useGSAP(
        () => {
            if (!leftColRef.current || !cardRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "bottom 30%",
                    toggleActions: "play none none none",
                },
            });

            // 1. Coluna de texto e informações à esquerda
            tl.fromTo(
                leftColRef.current,
                { opacity: 0, x: -35 },
                { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
            );

            // 2. Card de Agendamento à direita
            tl.fromTo(
                cardRef.current,
                { opacity: 0, x: 35, scale: 0.97 },
                { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            );
        },
        { scope: sectionRef }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bookingData: BookingFormData = {
            name,
            service: service || "Corte de Cabelo",
            date: date || "A combinar",
            time: time || "A combinar",
        };

        if (onSubmitBooking) {
            onSubmitBooking(bookingData);
        } else {
            // Disparo inteligente via WhatsApp mantendo a praticidade
            const message = [
                "👑 *Novo Agendamento - Gueto Barbearia*",
                `*Nome:* ${bookingData.name}`,
                `*Serviço:* ${bookingData.service}`,
                `*Quando:* ${bookingData.date}`,
                `*Horário:* ${bookingData.time}`,
            ].join("\n");

            const waUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
            window.open(waUrl, "_blank", "noopener,noreferrer");
        }

        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <section className="contactSection" ref={sectionRef}>
            <div className="contactContainer">
                {/* Coluna da Esquerda: Textos e Informações de Contato */}
                <div className="contactContent" ref={leftColRef}>
                    <span className="contactSubtitle">{subtitle}</span>

                    <h2 className="contactTitle">
                        {titleFirstLine} <br />
                        <span className="contactHighlight">{titleHighlight}</span>
                    </h2>

                    <p className="contactDescription">{description}</p>

                    <div className="contactInfoGrid">
                        {infoItems.map((item, index) => (
                            <div className="contactInfoItem" key={index}>
                                <span className="contactInfoLabel">{item.label}</span>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contactInfoLink"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <span className="contactInfoValue">{item.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coluna da Direita: Card de Agendamento */}
                <div className="contactCardWrapper" ref={cardRef}>
                    <div className="contactCard">
                        <div className="contactCardHeader">
                            <h3 className="contactCardTitle">AGENDAMENTO</h3>
                            <p className="contactCardSubtitle">Seu próximo visual começa aqui.</p>
                        </div>

                        <form className="contactForm" onSubmit={handleSubmit}>
                            {/* Campo 1: Nome */}
                            <div className="contactFormGroup">
                                <label htmlFor="booking-name" className="contactFormLabel">
                                    SEU NOME
                                </label>
                                <input
                                    id="booking-name"
                                    type="text"
                                    className="contactInput"
                                    placeholder="Como você se chama?"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Campo 2: Qual o serviço */}
                            <div className="contactFormGroup">
                                <label htmlFor="booking-service" className="contactFormLabel">
                                    O QUE VOCÊ VAI FAZER ?
                                </label>
                                <div className="contactSelectWrapper">
                                    <select
                                        id="booking-service"
                                        className="contactSelect"
                                        value={service}
                                        onChange={(e) => setService(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Escolha o serviço
                                        </option>
                                        <option value="Cortes de Cabelo">Cortes de Cabelo — R$ 50,00</option>
                                        <option value="Manutenção">Manutenção — R$ 40,00</option>
                                        <option value="Dreads">Dreads — R$ 120,00</option>
                                        <option value="Locs">Locs — R$ 100,00</option>
                                        <option value="Tranças">Tranças — R$ 110,00</option>
                                        <option value="Braids">Braids — R$ 130,00</option>
                                    </select>
                                    <span className="contactSelectArrow" aria-hidden="true">
                                        ▾
                                    </span>
                                </div>
                            </div>

                            {/* Campo 3: Quando */}
                            <div className="contactFormGroup">
                                <label htmlFor="booking-date" className="contactFormLabel">
                                    QUANDO ?
                                </label>
                                <div className="contactSelectWrapper">
                                    <select
                                        id="booking-date"
                                        className="contactSelect"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Escolha a data
                                        </option>
                                        <option value="Hoje">Hoje</option>
                                        <option value="Amanhã">Amanhã</option>
                                        <option value="Esta semana">Esta semana</option>
                                        <option value="Próxima semana">Próxima semana</option>
                                        <option value="Final de semana">Final de semana</option>
                                        <option value="A combinar no WhatsApp">A combinar no WhatsApp</option>
                                    </select>
                                    <span className="contactSelectArrow" aria-hidden="true">
                                        ▾
                                    </span>
                                </div>
                            </div>

                            {/* Campo 4: Que horas / Horário */}
                            <div className="contactFormGroup">
                                <label htmlFor="booking-time" className="contactFormLabel">
                                    QUAL HORÁRIO ?
                                </label>
                                <div className="contactSelectWrapper">
                                    <select
                                        id="booking-time"
                                        className="contactSelect"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Escolha o horário
                                        </option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                        <option value="19:00">19:00</option>
                                        <option value="20:00">20:00</option>
                                        <option value="Manhã (09h às 12h)">Manhã (09h às 12h)</option>
                                        <option value="Tarde (13h às 17h)">Tarde (13h às 17h)</option>
                                        <option value="Noite (18h às 20h)">Noite (18h às 20h)</option>
                                    </select>
                                    <span className="contactSelectArrow" aria-hidden="true">
                                        ▾
                                    </span>
                                </div>
                            </div>

                            {/* Botão de Envio (Reutilizando CtaButton com padrão DRY) */}
                            <div className="contactSubmitWrapper">
                                <CtaButton
                                    text="Agendar meu horário"
                                    type="submit"
                                    fullWidth={true}
                                    hasArrow={true}
                                    ariaLabel="Confirmar agendamento de horário"
                                />
                            </div>

                            {isSubmitted && (
                                <p className="contactSuccessMsg" role="alert">
                                    ✓ Redirecionando para confirmar seu agendamento no WhatsApp!
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;


