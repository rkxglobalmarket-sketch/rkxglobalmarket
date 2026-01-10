import React from "react";

interface CardProps {
    image: React.ReactNode;
    title: string;
    content: string;
}

const BrokerCard: React.FC<CardProps> = ({ image, title, content }) => (
    <div className="border border-gray-300 hover:border-black transition-all p-10 bg-white flex flex-col items-center text-center h-[480px] w-[300px]">
        <div className="mb-4 max-h-[130px] max-w-[160px]">
            {image}
        </div>
        <h2 className="text-xl font-bold text-[#0b455b] mb-3 sm:text-2xl">
            {title}
        </h2>
        <p className="text-[14px] text-gray-700 mb-8">
            {content}
        </p>
    </div>
);

export default BrokerCard;

