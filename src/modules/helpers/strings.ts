export function parseLinkedInUsername(url: string): string | null {
  const regex = /^https?:\/\/(?:www\.)?linkedin\.com\/in\/([^\/?]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function normalizeIP(ip: string): string {
  return ip.startsWith("::ffff:") ? ip.substring(7) : ip;
}

export function isLocalIP(ip: string): boolean {
  return ["::1", "127.0.0.1"].includes(ip);
}
