import { AssetsData } from "@/components/assets-list";
import { useUserStore } from "@/providers/user-store.provider";
import axios from "axios";
import { refreshAccessToken } from "./auth.service";

interface NFTRegistrationBody {
    number: number;
    title: string;
    description: string;
    price: string;
    image: string | null;
    wallet: string | null;
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
        "http://localhost:8000/users/add-numbers",
        {
            "number": nftBody.number,
            "title": nftBody.title,
            "description": nftBody.description,
            "price": nftBody.price,
            "image": nftBody.image,
            "wallet": nftBody.wallet
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

export async function pullNFTS(): Promise<AssetsData[]> {
    const res = await axios.get(
        'http://localhost:8000/get-all-numbers',
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    if (res.data == undefined || res.data == null)
        return [];

    const array = res.data.psaCerts;
    const data: AssetsData[] = [];

    array.map((card: AssetsData) => {
        data.push({
            image: card.image,
            title: card.title,
            price: card.price,
            cert_number: card.cert_number,
            owner_id: card.owner_id
        });
    });

    console.log("PULLING NFTS ", array);
    return data;
}

export async function pullNFT(cert_number: number) {
    const res = await axios.get(
        `http://localhost:8000/get-number/${cert_number}`,
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

export async function pullUserNFTS(user_toks: UserTokens): Promise<AssetsData[]> {
    const res = await axios.get(
        'http://localhost:8000/users/get-numbers',
        {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${user_toks.access_token}`
            }
        }
    );

    if (res.data == undefined || res.data == null)
        return [];

    const array = res.data.psaCerts;
    const data: AssetsData[] = [];

    array.map((card: AssetsData) => {
        data.push({
            image: card.image,
            title: card.title,
            price: card.price,
            cert_number: card.cert_number,
            owner_id: card.owner_id
        });
    });
    console.log("Pull user nfts: ", res);
    return data;
}