import './CtaButton.css';


interface CtaProps {
    text: string;
}


function CtaButton({ text }: CtaProps) {
    return (
        <>
            <button className='navigationCta'>{text}</button>
        </>
    )
}

export default CtaButton;