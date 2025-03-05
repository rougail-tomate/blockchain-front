import { JSX } from "react"; import pikachu from '../../public/pikq.jpg';
import AssetsList from "@/components/assets_list";

const Assets = (): JSX.Element => {
    return (
        <div>
            <div className="text-white flex p-8 items-center justify-center">
                <div className="flex flex-col md:flex-row gap-6 md:gap-[2vw] w-full max-w-5xl">
                    
                    {/* Left image */}
                    <div className="flex-grow flex md:mr-[5vw]">
                        <img src={pikachu.src} alt="Pikachu Card" className="rounded w-full h-auto" />
                    </div>

                    {/* Vertical line */}
                    <div className="hidden md:block w-0.5 bg-neutral-100 dark:bg-white/10"></div>

                    {/* Right section */}
                    <div className="flex-1">
                        {/* User and Card info */}
                        <div>
                            <h1 className="text-lg md:text-xl font-bold">Pikachu</h1>
                            <p className="text-gray-400 mt-2 md:mt-4">posted by: <span className="font-semibold">Jean</span></p>
                        </div>

                        {/* Horizontal line */}
                        <hr className="mt-4 md:mt-5 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

                        {/* Mint + price */}
                        <div className="mt-6 md:mt-10 text-light_orange text-xs w-full md:w-[30vw]">
                            
                            {/* Price */}
                            <div className="flex justify-between w-full">
                                <span>Price:</span>
                                <span className="text-right">4.7 ETH</span>
                            </div>

                            {/* Mint button */}
                            <div className="mt-2">
                                <button className="bg-light_green text-black w-full h-[3.2vh] rounded-sm">
                                    Mint
                                </button>
                            </div>
                        </div>

                        {/* Card details */}
                        <div className="mt-6 md:mt-10">
                            <h3 className="text-xl font-semibold">Details:</h3>
                            <p className="text-gray-400 mt-2 text-sm md:text-base">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis congue mi at aliquet. 
                                Praesent nec mauris in eros porttitor pellentesque. Maecenas vestibulum elit quis sapien pretium.
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
        <AssetsList display_text="Explore other’s pokemon assets:" hide_button={ false }></AssetsList>
        </div>
    );
};

export default Assets;