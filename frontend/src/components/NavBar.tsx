import { useState, useEffect } from "react";
import "./NavBar.css";
import CtaButton from "./CtaButton";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Bloqueia o scroll do body quando o menu mobile está aberto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    // Fecha o menu ao pressionar a tecla Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMenuOpen(false);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="navigationContainer">
            {/* Coluna Esquerda: Logo */}
            <div className="navLogoWrapper">
                <div
                    className="navLogo"
                    onClick={scrollToTop}
                    role="button"
                    tabIndex={0}
                    aria-label="Ir para o início"
                />
            </div>

            {/* Coluna Central: Links (Centralizados matematicamente) */}
            <nav className="navBarElements" aria-label="Navegação principal">
                <a href="#heroSection">Home</a>
                <a href="#services">Serviços</a>
                <a href="#about">Sobre</a>
                <a href="#booking">Agenda</a>
            </nav>

            {/* Coluna Direita: CTA Desktop */}
            <div className="navCtaWrapper">
                <CtaButton text="Agendar meu horário" />
            </div>

            {/* Botão Hambúrguer para telas menores */}
            <button
                className={`navHamburger ${isMenuOpen ? "is-active" : ""}`}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={isMenuOpen}
                type="button"
            >
                <span className="hamburgerLine"></span>
                <span className="hamburgerLine"></span>
                <span className="hamburgerLine"></span>
            </button>

            {/* Overlay e Drawer Mobile */}
            <div
                className={`mobileMenuOverlay ${isMenuOpen ? "is-open" : ""}`}
                onClick={() => setIsMenuOpen(false)}
                aria-hidden={!isMenuOpen}
            >
                <div
                    className="mobileMenuDrawer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mobileDrawerHeader">
                        <div
                            className="mobileNavLogo"
                            onClick={scrollToTop}
                            role="button"
                            tabIndex={0}
                            aria-label="Ir para o início"
                        />
                        <button
                            className="mobileCloseButton"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Fechar menu"
                            type="button"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="mobileNavLinks" aria-label="Navegação mobile">
                        <a href="#heroSection" onClick={handleLinkClick}>Home</a>
                        <a href="#services" onClick={handleLinkClick}>Serviços</a>
                        <a href="#about" onClick={handleLinkClick}>Sobre</a>
                        <a href="#booking" onClick={handleLinkClick}>Agenda</a>
                    </nav>

                    <div className="mobileDrawerCta" onClick={handleLinkClick}>
                        <CtaButton text="Agendar meu horário" fullWidth />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;