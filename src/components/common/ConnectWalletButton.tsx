import { useSDK } from '@metamask/sdk-react';
import { useUserStore } from "@/providers/user-store.provider";
import { formatAddress } from '@utils/utils';

export function ConnectWalletButton() {
  const store = useUserStore((state) => state)
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect().then((account) => store.setMetamaskId(account[0]));
    } catch (err) {
      console.log(account);
      console.warn(`No accounts found`, err);
    }
  };
  
  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div>
      {connected ? (
        <div>
          <button onClick={disconnect}>Disconnect</button>
          <p>{formatAddress(account)}</p>
        </div>
      ) : (
        <div>
          <button disabled={connecting} onClick={connect}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  )
}