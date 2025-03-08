import AssetsList, { AssetsData } from "@/components/assets-list";
import Navbar from "@/components/layout/Navbar";
import { useUserStore } from "@/providers/user-store.provider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { refreshAccessToken } from "services/auth.service";
import { MarketPlace, pullNFTS, pullUserNFTS } from "services/nft.service";

export default function OwnedAssetsPage() {

    const [cards, setCards] = useState<MarketPlace[]>([]);
    //const store = useUserStore((state) => state);
    
    const router = useRouter();

    useEffect(() => {
        const fetchNFT = async () => {
            try {
                const refresh_token = localStorage.getItem("refresh_token");
                const new_access_token = await refreshAccessToken(refresh_token as string);

                if (new_access_token === "") {
                    console.log("Access token is empty");
                    return;
                }
                const access_token = new_access_token.access_token;

                localStorage.setItem("access_token", access_token);
                const res = await pullUserNFTS({
                    access_token,
                    refresh_token
                });

                setCards(res);
            } catch(error) {
                console.error("Error fetching nft: ", error);
            }
        };

        fetchNFT();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <AssetsList 
                display_text="Your assets: "
                show_own_assets={ true }
                hide_button={ false }
                button_text="View"
                router={ router }
                cards={ cards }>
            </AssetsList>
        </div>
    );
}