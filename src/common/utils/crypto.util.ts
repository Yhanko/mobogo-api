import {
  randomBytes,
  createHash,
  createHmac,
  timingSafeEqual,
  scrypt,
} from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

// ── Hashing de password/PIN ──────────────────────────────────────────────────

/**
 * Faz hash de password usando scrypt (mais seguro que bcrypt para este caso).
 * Formato do resultado: salt:hash
 */
export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derived = (await scryptAsync(plain, salt, 64)) as Buffer;
  return `${salt}:${derived.toString('hex')}`;
}

/**
 * Verifica password contra o hash guardado.
 * Usa timingSafeEqual para prevenir timing attacks.
 */
export async function verifyPassword(
  plain: string,
  stored: string,
): Promise<boolean> {
  const [salt, hash] = stored.split(':');
  const derived = (await scryptAsync(plain, salt, 64)) as Buffer;
  const storedBuf = Buffer.from(hash, 'hex');
  return timingSafeEqual(derived, storedBuf);
}

// ── Display ID ───────────────────────────────────────────────────────────────

/**
 * Gera um ID legível para passageiros sem telefone.
 * Formato: TAX-XXXXXXXX (8 chars hex maiúsculos)
 * Ex: TAX-3F2A91BC
 */
export function generateDisplayId(): string {
  return `TAX-${randomBytes(4).toString('hex').toUpperCase()}`;
}

// ── Short code numérico ──────────────────────────────────────────────────────

/**
 * Gera código numérico criptograficamente seguro.
 * Não usa Math.random() — usa randomBytes para distribuição uniforme.
 */
export function generateShortCode(digits = 6): string {
  const max = 10 ** digits;
  const bytes = randomBytes(4);
  const num = bytes.readUInt32BE(0) % max;
  return num.toString().padStart(digits, '0');
}

// ── HMAC ─────────────────────────────────────────────────────────────────────

export function hmacSha256(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}

export function sha256(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

// ── Comparação segura ────────────────────────────────────────────────────────

export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

// ── Referência de lotador ────────────────────────────────────────────────────

/**
 * Gera código de referência único para parceria taxista-lotador.
 * Formato: LOT-XXXX-XXXX (alfanumérico maiúsculo, sem ambíguos 0/O 1/I)
 */
export function generateLotadorReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const pick = () =>
    Array.from(
      { length: 4 },
      () => chars[randomBytes(1)[0] % chars.length],
    ).join('');
  return `LOT-${pick()}-${pick()}`;
}
