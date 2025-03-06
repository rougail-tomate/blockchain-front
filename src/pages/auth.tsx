import React from "react";
import { MetaMaskProvider } from '@metamask/sdk-react';
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import { useUserStore } from "@/providers/user-store.provider";

export default function Auth() {
    const store = useUserStore(
        (state) => state
    )
    const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";
    const sdkOptions = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Next-Metamask-Boilerplate",
          url: host, // using the host constant defined above
        },
    };

    console.log(store.metamaskId)
    return (
        <div>
            <p>This is the auth page</p>
            <MetaMaskProvider sdkOptions={sdkOptions}>
                <ConnectWalletButton />
            </MetaMaskProvider>
        </div>
    )
}