import { JSX, useEffect, useState } from "react";
import pikachu from '../../public/pikq.jpg';
import AssetsList, { AssetsData, FullAssetData } from "@/components/assets-list";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import { pullNFT, pullNFTS } from "services/nft.service";
import { useRouter } from "next/router";

const Assets = (): JSX.Element => {
    const [cards, setCards] = useState<AssetsData[]>([]);
    const [selectedCard, setCard] = useState<FullAssetData>();

    const router = useRouter();

    useEffect(() => {
        const getCertNumber = () => {
            const queryParams = new URLSearchParams(window.location.search);
            const psa_cert = queryParams.get("CertNumber");

            if (psa_cert) {
                console.log("PSA CERT", parseInt(psa_cert));
                return (parseInt(psa_cert));
            }
        };

        const fetchNFT = async () => {
            try {
                const psaCert = getCertNumber();
                const res = await pullNFT(psaCert as number);

                console.log("REs ", psaCert);
                setCard({
                    cert_number: psaCert as number,
                    description: res.description,
                    image: res.image,
                    price: res.price,
                    title: res.title,
                    user_id: res.user_id
                });
            } catch(error) {
                console.error("Error fetching nft: ", error);
            }
        };

        const fetchNFTs = async () => {
            try {
                const response: AssetsData[] = await pullNFTS();

                if (response) setCards(response);
            } catch (error) {
                console.error("Error fetching NFTs:", error);
            }
        };

        Promise.all([
            fetchNFT(),
            fetchNFTs()
        ]);
    }, [])

   return (
        <div>
            <Navbar />
            <div className="text-white flex p-8 items-center justify-center">
                <div className="flex flex-col md:flex-row gap-6 md:gap-[2vw] w-full max-w-5xl">

                    {/* Left image */}
                    <div className="flex-grow flex md:mr-[5vw]">
                        <img 
                            src={ selectedCard?.image } 
                            alt="Card Image" 
                            className="rounded w-full h-[350px] object-cover" // Fixed height and object-cover to ensure proper scaling
                        />
                    </div>

                    {/* Vertical line */}
                    <div className="hidden md:block w-0.5 bg-neutral-100 dark:bg-white/10"></div>

                    {/* Right section */}
                    <div className="flex-1">
                        {/* User and Card info */}
                        <div>
                            <h1 className="text-lg md:text-xl font-bold">{ selectedCard?.title }</h1>
                            <p className="text-gray-400 mt-2 md:mt-4">posted by: <span className="font-semibold">Jean</span></p>
                        </div>

                        {/* Horizontal line */}
                        <hr className="mt-4 md:mt-5 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

                        {/* Mint + price */}
                        <div className="mt-6 md:mt-10 text-light_orange text-xs w-full md:w-[30vw]">
                            {/* Price */}
                            <div className="flex justify-between w-full">
                                <span>Price:</span>
                                <span className="text-right">{ selectedCard?.price + " ETH" }</span>
                            </div>

                            {/* Mint button */}
                            <div className="mt-2">
                                {
                                    ((selectedCard?.user_id) as number == parseInt(localStorage.getItem("userId") as string)) ?
                                        // Other nft
                                        <button className="bg-salmon text-black w-full h-[3.2vh] rounded-sm">
                                            Sell
                                        </button> :
                                        
                                        // My nft
                                        <button className="bg-light_green text-black w-full h-[3.2vh] rounded-sm">
                                            Buy
                                        </button>
                                }
                            </div>
                        </div>

                        {/* Card details */}
                        <div className="mt-6 md:mt-10">
                            <h3 className="text-xl font-semibold">Details:</h3>
                            <p className="text-gray-400 mt-2 text-sm md:text-base">
                                { selectedCard?.description }
                            </p>
                        </div>

                        {/* Card Data */}
                        <div className="mt-6 text-salmon text-sm">
                            <div className="grid grid-cols-2 gap-y-2 w-full md:w-[30vw]">
                                <span>File type:</span> <span className="text-right">IMAGE (PNG)</span>
                                <span>File Size:</span> <span className="text-right">142kb</span>
                                <span>Contract address:</span> <span className="text-right">0xaf3fa9...bb</span>
                                <span>Blockchain:</span> <span className="text-right">Ethereum</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AssetsList display_text="Explore other's pokemon assets:" hide_button={ false } cards={ cards } router={ router } />
        </div>
    ); 
};

export default Assets;
