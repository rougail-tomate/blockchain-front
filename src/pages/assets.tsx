import { JSX, useEffect, useState } from "react";
import AssetsList, { AssetsData, FullAssetData } from "@/components/assets-list";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import { buyNFT, createSellOrder, MarketPlace, pullNFT, pullNFTS } from "services/nft.service";
import { useRouter } from "next/router";
import ScrollableAreaComponent from "@/components/scrollable-area";
import InputFloat from "@/components/layout/Input-float";
import { refreshAccessToken } from "services/auth.service";

const Assets = (): JSX.Element => {
    const [cards, setCards] = useState<MarketPlace[]>([]);
    const [selectedCard, setCard] = useState<FullAssetData>();
    const [displayPrice, setDisplayPrice] = useState<boolean>(false);
    const [start_price, setStartingPrice] = useState("");
    const router = useRouter();

    
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setStartingPrice(value);
        }
    };

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

                console.log("REs ", res);
                setCard({
                    cert_number: psaCert as number,
                    description: res.psa_cert.description,
                    image: res.psa_cert.image,
                    sell_order: res.sell_order,
                    title: res.psa_cert.title,
                    user_id: res.psa_cert.user_id,
                    owner_id: res.psa_cert.user_id,
                });
            } catch(error) {
                console.error("Error fetching nft: ", error);
            }
        };

        const fetchNFTs = async () => {
            try {
                const response: MarketPlace[] = await pullNFTS();

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
                   <div className="flex md:mr-[5vw] justify-center items-center">
                        <img 
                            src={selectedCard?.image} 
                            alt="Card Image" 
                            className="rounded w-full h-[350px] object-contain" // Changed to object-contain to ensure the entire image is visible
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
                                <span className="text-right">{ (selectedCard?.sell_order?.taker_pay == undefined) ? "Not in sale": selectedCard?.sell_order?.taker_pay + " ETH" }</span>
                            </div>

                            {/* Mint button */}
                            <div className="mt-2 mb-5">
                                {
                                    ((selectedCard?.user_id) as number == parseInt(localStorage.getItem("userId") as string)) ?
                                        // Other nft
                                        <button className="bg-salmon text-black w-full h-[3.2vh] rounded-sm"
                                            onClick={ async () => {
                                                if (!displayPrice)
                                                    setDisplayPrice(true);
                                                else {
                                                const refresh_token = localStorage.getItem("refresh_token");
                                                const new_access_token = await refreshAccessToken(refresh_token as string);

                                                if (new_access_token === "") {
                                                    console.log("Access token is empty");
                                                    return;
                                                }
                                                const access_token = new_access_token.access_token;

                                                localStorage.setItem("access_token", access_token);
                                                    await createSellOrder({ 
                                                        cert_number: selectedCard?.cert_number as number,
                                                        destination: selectedCard?.description as string,
                                                        taker_pay: parseFloat(start_price) as number,
                                                        user_id: selectedCard?.user_id as number,
                                                        sell_hash: ""
                                                    }, { access_token, refresh_token });
                                                } 
                                            } }>
                                            Sell
                                        </button> :
                                        
                                        // My nft
                                        <button className="bg-light_green text-black w-full h-[3.2vh] rounded-sm"
                                            onClick={ async () => {
                                                const refresh_token = localStorage.getItem("refresh_token");
                                                const new_access_token = await refreshAccessToken(refresh_token as string);

                                                if (new_access_token === "") {
                                                    console.log("Access token is empty");
                                                    return;
                                                }
                                                const access_token = new_access_token.access_token;

                                                localStorage.setItem("access_token", access_token);
                                                await buyNFT({
                                                    sell_hash: selectedCard?.sell_order.sell_hash as string,
                                                }, { access_token, refresh_token });
                                            }}>
                                            Buy
                                        </button>
                                }
                                {
                                    (displayPrice) ? 
                                    <InputFloat
                                            placeholder="Selling Price: ETH" 
                                            value={ start_price } 
                                            onChange={ handlePriceChange } 
                                            className="w-full mt-5"/> :
                                    <div></div>
                                }
                            </div>
                        </div>
                        
                        {/* {
                            ((selectedCard?.user_id) as number != parseInt(localStorage.getItem("userId") as string)) ?
                                <ScrollableAreaComponent sell_order={ [] }></ScrollableAreaComponent> : <div></div>
                        } */}

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
            <AssetsList display_text="Explore other's pokemon assets:" hide_button={ false } cards={ cards } router={ router } show_own_assets={ false } />
        </div>
    ); 
};

export default Assets;
