import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  given_name: string;
  family_name: string;
  CompanyIdentification: string;
  CompanyName: string;
  Role: string;
  image_url?: string; // coincide con el claim del backend
  // puedes agregar otros claims opcionales si los necesitas
}

export function getCompanyIdentificationFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.CompanyIdentification || null;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}

export function getUserRoleFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.Role || null;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}

export function getCompanyNameFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.CompanyName || null;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}
