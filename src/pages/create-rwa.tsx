import Input from "@/components/layout/Input";
import { JSX } from "react"
import { useState } from "react";
import upload from '../../public/upload-icon.png'
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/common/Button";
import InputFloat from "@/components/layout/Input-float";
import { registerNFT } from "services/nft.service";
import { useUserStore } from "@/providers/user-store.provider";
import { refreshAccessToken } from "services/auth.service";
import CircularLoader from "@/components/loading";

export default function CreateRwaPage(): JSX.Element {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [psaNumber, setPsaNumber] = useState("");
    const [description, setDescription] = useState("");
    const [start_price, setStartingPrice] = useState("");
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState(true);

    //const store = useUserStore((state) => state);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            // Create a FileReader to convert the image to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setBase64Image(base64String);  // Store Base64 string
                setImage(URL.createObjectURL(file));  // For image preview
            };
            reader.readAsDataURL(file);  // Convert the file to Base64
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setStartingPrice(value);
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col items-center min-h-screen text-white">
                <h1 className="text-3xl font-bold mb-2">Create NFT</h1>
                <p className="text-gray-400 mb-6">Once the NFT is created, you cannot change the information.</p>
                <div className="flex flex-row items-start gap-8 w-full max-w-4xl">
                    {/* Left: Image Upload */}

                    <div className="w-1/2 h-64 flex items-center justify-center border border-light_green rounded-lg relative overflow-hidden">
                        { image ? (
                            <img src={ image } alt="Uploaded" className="w-full h-full object-contain" />
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center">
                                <img src={ upload.src } className="w-12 h-12 text-gray-400" />
                                <span className="text-gray-400">Upload an Image</span>
                                <input type="file" className="hidden" onChange={handleImageUpload} />
                            </label>
                        )}
                    </div>

                    {/* Right: Form Fields */}
                    <div className="flex flex-col gap-4 w-1/2">
                        <Input 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full" 
                        />
                        <Input 
                            placeholder="PSA Number" 
                            value={psaNumber} 
                            onChange={(e) => setPsaNumber(e.target.value)} 
                            className="w-full" 
                        />

                        <InputFloat
                            placeholder="Starting Price ETH" 
                            value={ start_price.toString() } 
                            onChange={ handlePriceChange } 
                            className="w-full" 
                        />

                        <textarea 
                            placeholder="Description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="border border-light_green bg-transparent focus:ring-2 focus:ring-light_green text-white p-2 rounded w-full" 
                        />

                        <div className="flex items-center space-x-2">
                            <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleChange}
                                className="h-5 w-5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <label className="text-white">I wan't to sell this nft</label>
                        </div>

                        <div className="flex justify-center items-center">
                        { 
                            (!isLoading) ? 
                                <Button onClick={ async () => {
                                    const refresh_token = localStorage.getItem("refresh_token") as string;
                                    const new_access_token = await refreshAccessToken(refresh_token as string);

                                    if (new_access_token === "") {
                                        console.log("Access token is empty");
                                        return;
                                    }
                                    const access_token = new_access_token.access_token;

                                    await registerNFT({
                                        description: description,
                                        number: parseInt(psaNumber),
                                        image: base64Image,
                                        price: start_price,
                                        title: name,
                                        wallet: localStorage.getItem("metamaskId"),
                                        is_selling: isChecked
                                    },
                                    {
                                        access_token,
                                        refresh_token
                                    });
                                    setLoading(true); 
                                } }>Submit</Button>
                             :
                            <CircularLoader></CircularLoader>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
