import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `✅ Finished! We've loaded our secret key securely, using an env file!`
);

// npx esrun generate-keypair.ts
// https://www.soldev.app/course/intro-to-cryptography