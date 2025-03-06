import Input from "@/components/layout/Input";
import { JSX } from "react"
import { useState } from "react";
import upload from '../../public/upload-icon.png'
import Navbar from "@/components/layout/Navbar";

const CreateRwaPage = (): JSX.Element => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [psaNumber, setPsaNumber] = useState("");
    const [description, setDescription] = useState("");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
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
                            <img src={image} alt="Uploaded" className="w-full h-full object-contain" />
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
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="border border-light_green bg-transparent text-white p-2 rounded w-full" 
                        />
                        <input 
                            type="text" 
                            placeholder="PSA Number" 
                            value={psaNumber} 
                            onChange={(e) => setPsaNumber(e.target.value)} 
                            className="border border-light_green bg-transparent text-white p-2 rounded w-full" 
                        />
                        <textarea 
                            placeholder="Description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="border border-light_green bg-transparent text-white p-2 rounded w-full" 
                        />
                        <button className="border border-light_green text-white bg-transparent hover:border-light_green px-4 py-2 rounded">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRwaPage;