export interface ResetPasswordByIdentityRequest {
  identification: string;
  userName:       string;
  birthDate:      string;  // ISO date string
  newPassword:    string;
}