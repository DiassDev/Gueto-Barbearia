import type { ServiceCardProps } from "../components/ServiceCard";
import corteIcon from "../assets/GuetoCorteIcon.png";
import manutencaoIcon from "../assets/GuetoManutencaoIcon.png";
import dreadsIcon from "../assets/GuetoDreadsIcon.png";
import trancasIcon from "../assets/GuetoTrancasIcon.png";
import locsIcon from "../assets/GuetoLocsIcon.png";
import braidsIcon from "../assets/GuetoBraidsIcon.png";

// 4 cards padrão conforme solicitado
export const DEFAULT_SERVICES: ServiceCardProps[] = [
    {
        id: "corte",
        title: "Cortes de Cabelo",
        description: "Cortes modernos e clássicos feitos sob medida para valorizar sua identidade e estilo único.",
        price: "R$ 50,00",
        icon: corteIcon,
        iconAlt: "Ícone de tesoura para corte de cabelo",
    },
    {
        id: "manutencao",
        title: "Manutenção",
        description: "Alinhamento e manutenção para manter seu visual sempre impecável e bem cuidado.",
        price: "R$ 40,00",
        icon: manutencaoIcon,
        iconAlt: "Ícone de navalha para manutenção",
    },
    {
        id: "dreads",
        title: "Dreads",
        description: "Criação, retoque e estruturação de dreads com técnicas especializadas e cuidado capilar.",
        price: "R$ 120,00",
        icon: dreadsIcon,
        iconAlt: "Ícone de dreads",
    },
    {
        id: "locs",
        title: "Locs",
        description: "Lorem Ipsum",
        price: "R$ 100,00",
        icon: locsIcon,
        iconAlt: "Ícone de tranças",
    },

];

// Serviços adicionais do design de referência disponíveis para fácil inclusão/troca
export const EXTRA_SERVICES: Record<string, ServiceCardProps> = {
    locks: {
        id: "tranças",
        title: "Tranças",
        description: "Lorem Ipsum",
        price: "R$ 110,00",
        icon: trancasIcon,
        iconAlt: "Ícone de locks",
    },
    braids: {
        id: "braids",
        title: "Braids",
        description: "Estilos trançados com acabamento premium, durabilidade e proteção aos seus fios.",
        price: "R$ 130,00",
        icon: braidsIcon,
        iconAlt: "Ícone de braids",
    },
};
