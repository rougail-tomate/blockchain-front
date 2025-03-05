import { JSX } from "react";

const cards = [
    { id: 1, name: "Card name", price: "2.45 ETH" },
    { id: 2, name: "Card name", price: "4.72 ETH" },
    { id: 3, name: "Card name", price: "4.72 ETH" },
    { id: 4, name: "Card name", price: "4.72 ETH" },
    { id: 5, name: "Card name", price: "4.72 ETH" },
];

interface AssetsListProps {
    display_text?: string;
    hide_button: boolean;

}

const AssetsList = ({ display_text, hide_button }: AssetsListProps): JSX.Element => {
    return (
        <div className="text-white p-8">
            <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{ display_text }</h2>
                <a href="#" className={ `${hide_button == true ? "hidden" : "" } text-light_orange text-sm` }>view more &gt;</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                { cards.map((card) => (
                    <div key={card.id} className="bg-gray-900 p-4 rounded-lg flex flex-col items-start w-full max-w-56">
                        <div className="w-full h-40 bg-gray-800 rounded-md mb-4"></div>
                        <div className="flex flex-col w-full px-2">
                            <h1 className="text-lg mb-2">{card.name}</h1>
                            <div className="flex justify-between items-center w-full">
                                <button className="border border-light_green text-light_green px-6 py-1 rounded-full text-sm">
                                    Buy
                                </button>
                                <p className="text-light_orange text-xs">{card.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default AssetsList;