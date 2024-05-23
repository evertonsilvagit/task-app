import { createContext } from "react";

export const TableContext = createContext([
    {
        isAlterar: false,
        isSelected: false,
        display: "Criar Layout no Figma"
    },
    {
        isAlterar: false,
        isSelected: false,
        display: "Desenvolver Front-End"
    },
    {
        isAlterar: false,
        isSelected: false,
        display: "Desenvolver Back-End"
    },
    {
        isAlterar: false,
        isSelected: false,
        display: "Criar API"
    },
    {
        isAlterar: false,
        isSelected: false,
        display:"Publicar no Github"
    }
]);