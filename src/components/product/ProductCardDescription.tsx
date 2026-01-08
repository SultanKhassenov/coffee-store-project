"use client";
import React, { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { ChevronDown } from "lucide-react";

type DescriptionProps = {
    text: string;
};

export default function ProductCardDescription({ text }: DescriptionProps) {
    const isMobile = useIsMobile();
    const [expanded, setExpanded] = useState(false);
    
    // простой текст на десктопе
    if (!isMobile) {
        return <p className="text-[#a6a19d] lg:text-[1vw] md:text-[1.6vw]">{text}</p>;
    }
  
    // с раскрытием на мобилках
    return (
        <div className="text-[#a6a19d] text-[3vw] relative">
            <p className={`${expanded ? "" : "line-clamp-3"}`}>
                {text}
            </p>
            <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm font-medium text-coffee underline flex flex-row items-end"
            >
                {expanded ? "Cкрыть" : "Подробнее"}
                <ChevronDown className={`size-4 transition-all duration-300 ${expanded && "rotate-180"}`} />
            </button>
        </div>
    );
}
