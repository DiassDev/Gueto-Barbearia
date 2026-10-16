import React from "react";
import "./CtaButton.css";

export interface CtaButtonProps {
    text: string;
    onClick?: () => void;
    href?: string;
    hasArrow?: boolean;
    className?: string;
    ariaLabel?: string;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    target?: string;
    rel?: string;
}

export const CtaButton: React.FC<CtaButtonProps> = ({
    text,
    onClick,
    href,
    hasArrow = false,
    className = "",
    ariaLabel,
    type = "button",
    fullWidth = false,
    target,
    rel,
}) => {
    const combinedClassName = `ctaButton ${fullWidth ? "ctaButton--full" : ""} ${className}`.trim();

    const content = (
        <>
            <span>{text}</span>
            {hasArrow && (
                <span className="ctaButtonArrow" aria-hidden="true">
                    ›
                </span>
            )}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className={combinedClassName}
                onClick={onClick}
                aria-label={ariaLabel || text}
                target={target}
                rel={target === "_blank" ? (rel || "noopener noreferrer") : rel}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={combinedClassName}
            onClick={onClick}
            aria-label={ariaLabel || text}
        >
            {content}
        </button>
    );
};

export default CtaButton;