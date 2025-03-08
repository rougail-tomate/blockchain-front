import { NextRouter } from "next/router";
import { JSX, useEffect } from "react";
import { MarketPlace, NFTSellOrderBody } from "services/nft.service";

export interface AssetsData {
    title: string;
    image: string;
    cert_number: number;
    owner_id: number;
}

export interface FullAssetData extends AssetsData {
    description: string;
    user_id: number;
    sell_order: NFTSellOrderBody;
}

interface AssetsListProps {
    display_text?: string;
    hide_button: boolean;
    cards: MarketPlace[];
    router?: NextRouter;
    button_text?: string;
    show_own_assets: boolean;
}

const AssetsList = ({ display_text, hide_button, cards, router, button_text, show_own_assets }: AssetsListProps): JSX.Element => {
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
                        (card.sell_order == undefined && !show_own_assets ) ? <div></div> :
                        <div
                            key={card.psa_cert.cert_number}
                            className="bg-gray-900 p-4 rounded-lg flex flex-col items-start w-full max-w-56 h-full"
                        >
                            <div className="w-full h-48 bg-gray-800 rounded-md mb-4 overflow-hidden">
                                <img src={card.psa_cert.image} alt={card.psa_cert.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col w-full px-2 flex-grow">
                                <h1 className="text-lg mb-2">{card.psa_cert.title}</h1>
                                <div className="flex justify-between items-center w-full mt-auto">
                                    <button
                                        onClick={() => {
                                            console.log(card.psa_cert.cert_number);
                                            router?.push(`/assets?CertNumber=${card.psa_cert.cert_number}`)
                                        }}
                                        className="border border-light_green text-light_green px-6 py-1 rounded-full text-sm"
                                    >
                                        {button_text === undefined ? "View" : button_text}
                                    </button>
                                    <p className="text-light_orange text-xs">{ (card.sell_order?.taker_pay == undefined) ? "Not in sale":  card.sell_order?.taker_pay + "ETH"}</p>
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