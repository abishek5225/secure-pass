import { form } from "framer-motion/client";

// src/lib/cryptoClient.ts
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/* ---------- small base64 helpers ---------- */
export function bufToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
export function base64ToBuf(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/* ---------- RSA key pair generation & export/import ---------- */
export async function generateRSAKeyPair(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function exportPublicKeyBase64(pub: CryptoKey): Promise<string> {
  const spki = await crypto.subtle.exportKey("spki", pub);
  return bufToBase64(spki);
}
export async function exportPrivateKeyBase64(priv: CryptoKey): Promise<string> {
  const pkcs8 = await crypto.subtle.exportKey("pkcs8", priv);
  return bufToBase64(pkcs8);
}
export async function importPrivateKeyFromBase64(pkcs8B64: string): Promise<CryptoKey> {
  const pkcs8 = base64ToBuf(pkcs8B64);
  return crypto.subtle.importKey("pkcs8", pkcs8, { name: "RSA-OAEP", hash: "SHA-256" }, true, ["decrypt"]);
}
export async function importPublicKeyFromBase64(spkiB64: string): Promise<CryptoKey> {
  const spki = base64ToBuf(spkiB64);
  return crypto.subtle.importKey("spki", spki, { name: "RSA-OAEP", hash: "SHA-256" }, true, ["encrypt"]);
}

export async function deriveKeyFromPassword(
  password: string,
  salt: Uint8Array,
  iterations = 150_000
): Promise<CryptoKey> {
  const encoder = new TextEncoder();

  
  const safeSalt = new Uint8Array(salt); 

  const baseKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: safeSalt, 
      iterations,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  return key;
}



/* ---------- encrypt/decrypt bytes with password-derived key ---------- */
export async function encryptPrivateKeyForStorage(privatePkcs8Base64: string, password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const derived = await deriveKeyFromPassword(password, salt);
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, derived, base64ToBuf(privatePkcs8Base64));
  return {
    ciphertext: bufToBase64(ciphertext),
    iv: bufToBase64(iv.buffer),
    salt: bufToBase64(salt.buffer),
  };
}

export async function decryptPrivateKeyFromStorage(container: { ciphertext: string; iv: string; salt: string }, password: string) {
  const salt = new Uint8Array(base64ToBuf(container.salt));
  const iv = new Uint8Array(base64ToBuf(container.iv));
  const derived = await deriveKeyFromPassword(password, salt);
  const plainBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, derived, base64ToBuf(container.ciphertext));
  return bufToBase64(plainBuf); // base64 pkcs8
}

/* ---------- Local storage helpers (IndexedDB) ---------- */
/*
  We'll use a tiny vanilla IndexedDB wrapper for one key.
  Key: "securepass:encPrivateKey" -> stores JSON string of {ciphertext,iv,salt}
*/
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("secure-pass-store", 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      db.createObjectStore("kv");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveEncryptedPrivateKeyLocally(container: { ciphertext: string; iv: string; salt: string }) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("kv", "readwrite");
    tx.objectStore("kv").put(container, "encPrivateKey");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getEncryptedPrivateKeyLocally(): Promise<{ ciphertext: string; iv: string; salt: string } | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("kv", "readonly");
    const req = tx.objectStore("kv").get("encPrivateKey");
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteLocalEncryptedPrivateKey() {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("kv", "readwrite");
    tx.objectStore("kv").delete("encPrivateKey");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ---------- backup helper: prompt user to download encrypted container JSON ---------- */
export function downloadEncryptedBackup(container: { ciphertext: string; iv: string; salt: string }, username: string) {
  const blob = new Blob([JSON.stringify(container)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${username}_securepass_privatekey_backup.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ---------- import backup from file (reads JSON) ---------- */
export function readBackupFile(file: File): Promise<{ ciphertext: string; iv: string; salt: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result));
        resolve(obj);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
