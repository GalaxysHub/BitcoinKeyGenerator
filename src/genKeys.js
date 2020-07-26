const secureRandom = require("secure-random");
const sha256 = require("js-sha256");
const ripemd160 = require("ripemd160");
var EC = require("elliptic").ec;
const bs58 = require("bs58");

var ec = new EC("secp256k1");

const genPrivateKey = () => {
  const max = Buffer.from(
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140",
    "hex"
  );
  let isInvalid = true;
  let privateKey;
  while (isInvalid) {
    privateKey = secureRandom.randomBuffer(32);
    if (Buffer.compare(max, privateKey) === 1) {
      isInvalid = false;
    }
  }
  console.log("> Private key created: ", privateKey.toString("hex"));
  return privateKey;
};

const genPublicKey = (privateKey) => {
  const keys = ec.keyFromPrivate(privateKey);
  const publicKey = keys.getPublic("hex");
  console.log("> Public key created: ", publicKey);
  return publicKey;
};

const createPublicAddress = (publicKey) => {
  //!built in crypto library cannot be used because it will hash the string representation not the number representation
  let hash = sha256(Buffer.from(publicKey, "hex"));
  let publicKeyHash = new ripemd160().update(Buffer.from(hash, "hex")).digest();

  console.log("publicKeyHash: ", publicKeyHash);

  const step1 = Buffer.from("00" + publicKeyHash.toString("hex"), "hex");
  console.log("step 1", step1);
  const step2 = sha256(step1);
  const step3 = sha256(Buffer.from(step2, "hex"));
  const checksum = step3.substring(0, 8);
  const step4 = step1.toString("hex") + checksum;
  console.log("step 4", step4);
  const address = bs58.encode(Buffer.from(step4, "hex"));
  return address;
};

const createPrivateKeyWIF = (privateKey) => {
  const step1 = Buffer.from("80" + privateKey.toString("hex"), "hex");
  const step2 = sha256(step1);
  const step3 = sha256(Buffer.from(step2, "hex"));
  const checksum = step3.substring(0, 8);
  const step4 = step1.toString("hex") + checksum;
  const privateKeyWIF = bs58.encode(Buffer.from(step4, "hex"));
  return privateKeyWIF;
};

module.exports = {
  genPrivateKey,
  genPublicKey,
  createPublicAddress,
  createPrivateKeyWIF,
};
