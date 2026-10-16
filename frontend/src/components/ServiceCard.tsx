import React from "react";
import "./ServiceCard.css";

export interface ServiceCardProps {
    id?: string | number;
    title: string;
    description: string;
    price: string;
    icon?: string;
    iconAlt?: string;
    badge?: string;
    onClick?: () => void;
    className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    price,
    icon,
    iconAlt,
    badge,
    onClick,
    className = "",
}) => {
    return (
        <article
            className={`serviceCard ${className}`}
            onClick={onClick}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? "button" : undefined}
        >
            {icon && (
                <div className="serviceCardIconWrapper">
                    <img
                        src={icon}
                        alt={iconAlt || title}
                        className="serviceCardIcon"
                        loading="lazy"
                    />
                </div>
            )}

            {badge && <span className="serviceCardBadge">{badge}</span>}

            <h3 className="serviceCardTitle">{title}</h3>
            <p className="serviceCardDescription">{description}</p>
            <div className="serviceCardPrice">{price}</div>
        </article>
    );
};

export default ServiceCard;
