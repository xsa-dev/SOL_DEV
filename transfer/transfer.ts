import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import "dotenv/config"
import {getKeypairFromEnvironment} from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

// Airdrop SOL if needed here: https://faucet.solana.com

// @ts-ignore
const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);

/*
➜  transfer git:(main) ✗ npx esrun transfer.ts 5Ht1bAHyEAqdRUr93eusddhRtdQwcZxQLdRwkFGyK4zW
suppliedToPubkey: 5Ht1bAHyEAqdRUr93eusddhRtdQwcZxQLdRwkFGyK4zW
✅ Loaded our own keypair, the destination public key, and connected to Solana
💸 Finished! Sent 5000 to the address 5Ht1bAHyEAqdRUr93eusddhRtdQwcZxQLdRwkFGyK4zW.
Transaction signature is jnAX1dJGV9Zxxs39mAi6dFHSWRAJbGEAnKfnRumic1y6yxB4SAYbAx3BnSgYnNJX95ciV3BstgntLtZxg3TQMoD!
https://solscan.io/tx/jnAX1dJGV9Zxxs39mAi6dFHSWRAJbGEAnKfnRumic1y6yxB4SAYbAx3BnSgYnNJX95ciV3BstgntLtZxg3TQMoD?cluster=devnet
 */