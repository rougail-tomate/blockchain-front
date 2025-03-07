import { NextRouter } from "next/router";
import { JSX, useEffect } from "react";

export interface AssetsData {
    title: string;
    image: string;
    price: string;
    cert_number: number;
}

export interface FullAssetData extends AssetsData {
    description: string;
    user_id: number;
}

interface AssetsListProps {
    display_text?: string;
    hide_button: boolean;
    cards: AssetsData[];
    router?: NextRouter;
    button_text?: string;
}

const AssetsList = ({ display_text, hide_button, cards, router, button_text }: AssetsListProps): JSX.Element => {
    return (
        <div className="text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">{ display_text }</h2>
                    <a href="#" className={`${hide_button === true ? "hidden" : ""} text-light_orange text-sm`}
                       onClick={() => { (!hide_button) ? router?.push("/") : 0; }}>
                        view more &gt;
                    </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                    {cards.map((card) => (
                        <div
                            key={card.cert_number}
                            className="bg-gray-900 p-4 rounded-lg flex flex-col items-start w-full max-w-56 h-full"
                        >
                            <div className="w-full h-48 bg-gray-800 rounded-md mb-4 overflow-hidden">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col w-full px-2 flex-grow">
                                <h1 className="text-lg mb-2">{card.title}</h1>
                                <div className="flex justify-between items-center w-full mt-auto">
                                    <button
                                        onClick={() => {
                                            console.log(card.cert_number);
                                            router?.push(`/assets?CertNumber=${card.cert_number}`)
                                        }}
                                        className="border border-light_green text-light_green px-6 py-1 rounded-full text-sm"
                                    >
                                        {button_text === undefined ? "Buy" : button_text}
                                    </button>
                                    <p className="text-light_orange text-xs">{card.price + " ETH"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default AssetsList;