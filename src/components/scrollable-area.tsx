const ScrollableAreaComponent = () => {
    return (
       <div className="w-full h-64 overflow-y-auto p-4 border border-gray-300 rounded-lg text-white">
            <p className="text-center mb-3">Buy order !</p>
            <div className="space-y-1 w-full text-sm"> 
                {Array.from({ length: 20 }, (_, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2 bg-deep_purple hover:bg-slate-600">
                        <p className="w-full text-center">0.001 ETH</p>
                        <button className="py-1 px-3 bg-light_green text-black rounded hover:bg-blue-600 focus:outline-none">
                            accept
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScrollableAreaComponent;