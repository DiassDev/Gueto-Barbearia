import type { TestimonialCardProps } from "../components/TestimonialCard";
import heroAvatar from "../assets/GuetoHero.png";
import aboutAvatar from "../assets/GuetoAbout.png";

export const DEFAULT_TESTIMONIALS: TestimonialCardProps[] = [
    {
        id: "1",
        name: "Fulano da Silva Junior",
        testimonial: "O melhor né mano! Locs não é só sobre cabelo sabe, é sobre autoestima e aceitação com vc msm, isso mano, vc faz com perfeição!",
        rating: 5,
        avatar: heroAvatar,
        role: "Cliente fiel",
    },
    {
        id: "2",
        name: "Marcus Vinícius",
        testimonial: "Carai mano, tu sarneia muito pprt!",
        rating: 5,
        avatar: aboutAvatar,
        role: "Cliente desde 2025",
    },
    {
        id: "3",
        name: "Pedro Henrique",
        testimonial: "Você tira onda nas manutenções!",
        rating: 5,
        avatar: heroAvatar,
        role: "Cliente fiel",
    },
    {
        id: "4",
        name: "Lucas Andrade",
        testimonial: "Mano eu acho muito brabo os detalhes e o acabamento que tu consegue fazer na manutenção pprt, tu consegue deixar alinhadinho, principalmente a variação de desenhos que tu consegue fazer, acho muito mídia pprt de coração",
        rating: 5,
        avatar: aboutAvatar,
        role: "Cliente desde 2024",
    },
    {
        id: "5",
        name: "Gabriel Santos",
        testimonial: "Trampo brabo irmão. Dá pra ver que você faz as manutenções com capricho, tudo alinhadinho. Gueto vai crescer muito ainda!!!",
        rating: 5,
        avatar: heroAvatar,
        role: "Cliente fiel",
    },
    {
        id: "6",
        name: "Gabriel Santos",
        testimonial: "Negão amassa na manutenção, dois anos e pouco fazendo contigo, zero arrependimento, sempre entregando o melhor serviço (atende em qualquer horário kkkkkkkkk, psicopata), tu é diferenciado, nego, pprt! fechadão contigo, não é de hoje",
        rating: 5,
        avatar: heroAvatar,
        role: "Cliente fiel",
    },
];
