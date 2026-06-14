import crypto from "crypto"

const ALGORITHM = "aes-256-cbc"
const KEY = Buffer.from(process.env.ENCRYPTION_KEY ?? "", "hex")
const IV_LENGTH = 16

export function encryptToken(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()])
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`
}

export function decryptToken(encrypted: string): string {
  const [ivHex, encryptedHex] = encrypted.split(":")
  const iv = Buffer.from(ivHex, "hex")
  const encryptedBuf = Buffer.from(encryptedHex, "hex")
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
  const decrypted = Buffer.concat([decipher.update(encryptedBuf), decipher.final()])
  return decrypted.toString("utf8")
}
