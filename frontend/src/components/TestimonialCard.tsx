import React from "react";
import "./TestimonialCard.css";

export interface TestimonialCardProps {
    id?: string | number;
    name: string;
    testimonial: string;
    rating?: number;
    avatar?: string;
    avatarAlt?: string;
    role?: string;
    className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
    name,
    testimonial,
    rating = 5,
    avatar,
    avatarAlt,
    role,
    className = "",
}) => {
    return (
        <article className={`testimonialCard ${className}`}>
            <header className="testimonialCardHeader">
                <div className="testimonialAvatarWrapper">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={avatarAlt || name}
                            className="testimonialAvatar"
                            loading="lazy"
                        />
                    ) : (
                        <div className="testimonialAvatarPlaceholder">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>

                <div className="testimonialAuthorInfo">
                    <h4 className="testimonialName">{name}</h4>
                    {role && <span className="testimonialRole">{role}</span>}
                    <div
                        className="testimonialRating"
                        aria-label={`Avaliação de ${rating} de 5 estrelas`}
                    >
                        {Array.from({ length: rating }).map((_, i) => (
                            <span key={i} className="testimonialStar" aria-hidden="true">
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            <blockquote className="testimonialQuote">
                <p className="testimonialText">
                    <span className="quoteSymbol quoteOpen" aria-hidden="true">“</span>
                    {testimonial}
                    <span className="quoteSymbol quoteClose" aria-hidden="true">”</span>
                </p>
            </blockquote>
        </article>
    );
};

export default TestimonialCard;
