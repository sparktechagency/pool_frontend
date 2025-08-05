import { BASE_ENDPOINT } from "./config/data";

export const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });


export function encrypt(text:string, shift = 1) {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(code + shift);
    })
    .join("");
}

export function decrypt(text:string, shift = 1) {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(code - shift);
    })
    .join("");
}

export const serverImageBuilder = (x:string)=>{
  return `${BASE_ENDPOINT}${x}`
}