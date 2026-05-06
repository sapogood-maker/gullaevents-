import QRCode from 'qrcode';
import crypto from 'crypto';
import { env } from '@config/env';

export interface QRData {
  ticketId: string;
  userId: string;
  timestamp: number;
  signature: string;
}

export function generateQRSignature(data: Omit<QRData, 'signature'>): string {
  const payload = JSON.stringify({
    ticketId: data.ticketId,
    userId: data.userId,
    timestamp: data.timestamp,
  });

  return crypto.createHmac('sha256', env.QR_SECRET_KEY).update(payload).digest('hex');
}

export function verifyQRSignature(data: QRData): boolean {
  const expectedSignature = generateQRSignature({
    ticketId: data.ticketId,
    userId: data.userId,
    timestamp: data.timestamp,
  });

  return crypto.timingSafeEqual(Buffer.from(data.signature), Buffer.from(expectedSignature));
}

export async function generateQRCode(data: QRData): Promise<string> {
  return QRCode.toDataURL(JSON.stringify(data), {
    width: 300,
    margin: 2,
    color: { dark: '#000000', light: '#FFFFFF' },
  });
}

export function createQRData(
  ticketId: string,
  userId: string,
  timestamp: number = Date.now(),
): QRData {
  return {
    ticketId,
    userId,
    timestamp,
    signature: generateQRSignature({ ticketId, userId, timestamp }),
  };
}

export function parseQRCode(qrString: string): QRData {
  try {
    return JSON.parse(qrString);
  } catch (error) {
    throw new Error('Invalid QR code format');
  }
}
