'use client'
import { useSDK } from '@metamask/sdk-react';
import { useUserStore } from "@/providers/user-store.provider";

interface ConnectWalletButtonProps {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConnectWalletButton({setConnected}: ConnectWalletButtonProps) {
  const store = useUserStore((state) => state)
  const { sdk, connected, connecting, account } = useSDK();

  if (store.metamaskId)
    setConnected(true)
  const connect = async () => {
    try {
      await sdk?.connect().then((account) => store.metamaskId = account[0]);
      setConnected(true)
    } catch (err) {
      console.log(account);
      console.warn(`No accounts found`, err);
    }
  };
  
  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setConnected(false);
    }
  };

  return (
    <div>
      {connected ? (
        <div>
          <button className="flex justify-center items-center border border-light_green
            bg-transparent rounded-full p-3
          hover:bg-light_green hover:text-light_orange" onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button className="flex justify-center items-center border border-light_green
            bg-transparent rounded-full p-3
          hover:bg-light_green hover:text-light_orange"
            disabled={connecting} 
            onClick={connect}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  )
}