/**
 * Utility function to recursively normalize brand names in data.
 * Replaces "Stone Oven" with "Napkiq" case-insensitively.
 */
export function replaceStoneOven(val: any): any {
  if (typeof val === 'string') {
    return val
      .replace(/Stone Oven/g, 'Napkiq')
      .replace(/stone oven/g, 'napkiq')
      .replace(/STONE OVEN/g, 'NAPKIQ')
  }
  if (Array.isArray(val)) {
    return val.map(replaceStoneOven)
  }
  if (val !== null && typeof val === 'object') {
    const newVal: any = {}
    for (const key of Object.keys(val)) {
      newVal[key] = replaceStoneOven(val[key])
    }
    return newVal
  }
  return val
}
