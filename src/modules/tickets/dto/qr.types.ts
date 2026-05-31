export interface QrPayload {
  tid: string; // ticket id
  sig: string; // assinatura HMAC-SHA256
  exp: number; // unix ms de expiração
}

export interface ScanResult {
  ticketId: string;
  isValid: boolean;
}
