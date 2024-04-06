import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function get_balance(public_key: string) {
    try {
        const publicKey = new PublicKey(public_key);
        // const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");


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
    'CBd5NnFCNhJSLyuYYG5hJFqziwpkSrZieUvVcXxQ2nSv', // $MY
    // ...
]

for (const interestInWallet of interest_in_wallets) {
    // @ts-ignore
    await get_balance(interestInWallet)
}
