import * as CryptoJS from 'crypto-js';

const SECRET_KEY = '=guucg=-z_0g%)l7uw-a5#h3-gf%(92e73z(x_rn*-#g11jtvj'; // 🔑 cámbiala por algo propio

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(cipher: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return '';
  }
}
