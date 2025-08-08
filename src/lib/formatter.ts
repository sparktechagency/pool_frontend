import { BASE_ENDPOINT } from "./config/data";

export const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

const SECRET_KEY = process.env.SECRET_KEY??"raven"; // e.g., set in .env file

export function encrypt(text: string): string {
  if (!SECRET_KEY) throw new Error("Secret key is missing");
  const encoded = [];
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCode = SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
    encoded.push(charCode ^ keyCode);
  }
  return Buffer.from(new Uint8Array(encoded)).toString("base64");
}

export function decrypt(base64: string): string {
  if (!SECRET_KEY) throw new Error("Secret key is missing");
  const buffer = Buffer.from(base64, "base64");
  const decoded = [];
  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    const keyCode = SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
    decoded.push(String.fromCharCode(byte ^ keyCode));
  }
  return decoded.join("");
}


export const serverImageBuilder = (x:string)=>{
  return `${BASE_ENDPOINT}${x}`
}