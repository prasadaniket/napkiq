import QRCode from 'qrcode'

export type QRFormat = 'svg' | 'dataURL' | 'png'

/**
 * QRService — Generates QR codes for outlet landing pages.
 * OOP Concept: Encapsulation (all QR generation logic contained here)
 *
 * QR URL pattern: {APP_URL}/outlet/{outletCode}
 * When scanned → Next.js outlet page → FingerprintJS runs → visit recorded
 */
class QRService {
  private get baseUrl(): string {
    return process.env.NEXT_PUBLIC_APP_URL ?? 'https://napkiq.in'
  }

  async generateForOutlet(outletCode: string, format: QRFormat = 'svg'): Promise<string | Buffer> {
    const url = `${this.baseUrl}/${outletCode}`
    const options = {
      width: 512,
      margin: 2,
      color: { dark: '#1A1A1A', light: '#FFFFFF' },
      errorCorrectionLevel: 'H' as const,
    }

    if (format === 'svg') return QRCode.toString(url, { ...options, type: 'svg' })
    if (format === 'dataURL') return QRCode.toDataURL(url, options)
    return QRCode.toBuffer(url, options)
  }

  async generateAll(outlets: { code: string; name: string }[], format: QRFormat = 'dataURL') {
    return Promise.all(
      outlets.map(async (o) => ({
        outletCode: o.code,
        outletName: o.name,
        qrCode: await this.generateForOutlet(o.code, format),
        url: `${this.baseUrl}/outlet/${o.code}`,
      }))
    )
  }
}

export const qrService = new QRService()
