import { useSDK } from '@metamask/sdk-react';

export function ConnectWalletButton() {
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
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
          <p>{account}</p>
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