import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function get_balance(public_key: string) {
    try {
        const publicKey = new PublicKey(public_key);
        const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

        // @ts-ignore
        const [balanceInLamports] = await Promise.all([connection.getBalance(publicKey)]);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

        console.log(
            `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
        );
    } catch (e) {
        console.log(
            `❌ Problem with loading balance.`
        )
    }
}

let interest_in_wallets = [
    '5raQPd59o8hm8k8unJFzDjXxnfvidaULGgYayENMPSvC', // $MY
    'GgJJRwLg9NzFQ97o1CJLGLp1KLSUMBwFc6eQNVEr4fbW', // $TOLY
    '7RwBWPkpbU2RgHq15rBcee5SgeHZUKY23SZzgfSA2Uxm', // shaq
    // ...
]

for (const interestInWallet of interest_in_wallets) {
    await get_balance(interestInWallet)
}
