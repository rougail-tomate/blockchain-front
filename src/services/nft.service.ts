import { useUserStore } from "@/providers/user-store.provider";
import axios from "axios";

interface NFTRegistrationBody {
    number: number;
    title: string;
    description: string;
    price: string;
    image: string | null;
}

// class PsaNumberCreate(BaseModel):
//     number: int
//     title: str
//     description: str
//     price : str
//     image : str
export async function registerNFT(nftBody: NFTRegistrationBody, toks: UserTokens) {
    console.log(nftBody);

    const res = await axios.post(
        "http://localhost:8000/users/add-numbers",
        {
            "number": nftBody.number,
            "title": nftBody.title,
            "description": nftBody.description,
            "price": nftBody.price,
            "image": nftBody.image
        },
        {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${toks.access_token}`
            }

        }
    )
    console.log(res);
    return res;
}