import AssetsList, { AssetsData } from "@/components/assets-list";
import Navbar from "@/components/layout/Navbar";
import { useUserStore } from "@/providers/user-store.provider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MarketPlace, pullNFTS } from "services/nft.service";

export default function Home() {
    //const store = useUserStore((state) => state);
    const [cards, setCards] = useState<MarketPlace[]>([]);

    const router = useRouter();
    //console.log(store)

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const response: MarketPlace[] = await pullNFTS();

                if (response) setCards(response);
            } catch (error) {
                console.error("Error fetching NFTs:", error);
            }
        };
        fetchNFTs();
    }, [])

    return (
        <div className="">
            <Navbar />
            <AssetsList 
                display_text="Explore pokemon assets:" 
                hide_button={ true }
                show_own_assets= { false }
                router={ router }
                cards={ cards }>
            </AssetsList>
        </div>
    );
}