import { AssetsData } from "@/components/assets-list";
import { useUserStore } from "@/providers/user-store.provider";
import axios from "axios";
import { refreshAccessToken } from "./auth.service";

interface NFTRegistrationBody {
    number: number;
    title: string;
    description: string;
    // price: string;
    image: string | null;
    wallet: string | null;
    // is_selling: boolean;
}

export interface MarketPlace {
    psa_cert: AssetsData;
    sell_order: NFTSellOrderBody;
}


// class SellOrder(BaseModel):
//     cert_number: int
//     user_id: int
//     taker_pay: float
//     destination: str
export interface NFTSellOrderBody {
    cert_number: number;
    user_id: number;
    taker_pay: number;
    destination: string;
    sell_hash: string;
}

export interface NFTBuyOrderBody {
    sell_hash: string;
}

// class PsaNumberCreate(BaseModel):
//     number: int
//     title: str
//     description: str
//     price : str
//     image : str
//     wallet : str
export async function registerNFT(nftBody: NFTRegistrationBody, toks: UserTokens) {
    const res = await axios.post(
        "https://blockchain.mattisdalleau.com/users/add-numbers",
        {
            "number": nftBody.number,
            "title": nftBody.title,
            "description": nftBody.description,
            // "price": nftBody.price,
            "image": nftBody.image,
            "wallet": nftBody.wallet,
            // "is_selling": nftBody.is_selling
        },
        {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${toks.access_token}`
            }
        }
    )
    console.log("MINTING NFT ", res);
    return res;
}

export async function pullNFTS(): Promise<MarketPlace[]> {
    const res = await axios.get(
        'https://blockchain.mattisdalleau.com/view-marketplace',
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    if (res.data == undefined || res.data == null)
        return [];

    console.log("View market place ", res);
    const array = res.data.market_place;
    const data: MarketPlace[] = [];

    array.map((card: MarketPlace) => {
        data.push({
            psa_cert: card.psa_cert,
            sell_order: card.sell_order
        });
    });

    console.log("PULLING NFTS ", array);
    return data;
}

export async function pullNFT(cert_number: number) {
    const res = await axios.get(
        `https://blockchain.mattisdalleau.com/get-number/${cert_number}`,
        {
            headers: {
                'Content-Type': "application/json"
            }
        }
    )

    console.log("PULLING NFT ", cert_number, res);
    if (res.data == null || res.data == undefined) {
        return  [];
    }
    return res.data;
}

export async function pullUserNFTS(user_toks: UserTokens): Promise<MarketPlace[]> {
    const res = await axios.get(
        'https://blockchain.mattisdalleau.com/users/get-numbers',
        {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${user_toks.access_token}`
            }
        }
    );

    if (res.data == undefined || res.data == null)
        return [];

    console.log(res.data);
    const array = res.data.market_place;
    const data: MarketPlace[] = [];

    array.map((card: MarketPlace) => {
        data.push({
            psa_cert: card.psa_cert,
            sell_order: card.sell_order
        });
    });
    console.log("Pull user nfts: ", res);
    return data;
}

export async function createSellOrder(sell_order: NFTSellOrderBody, toks: UserTokens) {
    const res = await axios.post(
        'https://blockchain.mattisdalleau.com/sell',
        {
            cert_number: sell_order.cert_number,
            destination: sell_order.destination,
            user_id: sell_order.user_id,
            taker_pay: sell_order.taker_pay,
            sell_hash: ""
        },
        {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${toks.access_token}`
            }
        }

    );
    return res;
}

export async function buyNFT(buyBody: NFTBuyOrderBody, token: UserTokens) {
    const res = await axios.post(
        'https://blockchain.mattisdalleau.com/buy',
        {
            sell_hash: buyBody.sell_hash
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            }
        }

    );
    console.log("Res buy nft ", res)
    return res;
}