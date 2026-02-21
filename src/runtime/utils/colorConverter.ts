/**
 * Converts various color formats to hex
 * Supports: hex, rgb, rgba, hsl, hsla, cmyk, lab
 */
export function convertColorToHex(color: string): string {
  if (!color)
    return '#000000'

  const trimmedColor = color.trim()

  // Already hex format
  if (trimmedColor.startsWith('#')) {
    return normalizeHex(trimmedColor)
  }

  // RGB/RGBA format
  if (trimmedColor.startsWith('rgb')) {
    return rgbToHex(trimmedColor)
  }

  // HSL/HSLA format
  if (trimmedColor.startsWith('hsl')) {
    return hslToHex(trimmedColor)
  }

  // CMYK format
  if (trimmedColor.startsWith('cmyk')) {
    return cmykToHex(trimmedColor)
  }

  // LAB format
  if (trimmedColor.startsWith('lab')) {
    return labToHex(trimmedColor)
  }

  // Fallback: try to parse as hex without #
  if (/^[\da-f]{3,8}$/i.test(trimmedColor)) {
    return normalizeHex(`#${trimmedColor}`)
  }

  // Default fallback
  return '#000000'
}

/**
 * Normalizes hex color to 6-digit format
 */
function normalizeHex(hex: string): string {
  const cleaned = hex.replace('#', '')

  // 3-digit hex to 6-digit
  if (cleaned.length === 3) {
    return `#${cleaned[0]}${cleaned[0]}${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}`
  }

  // 4-digit hex with alpha to 6-digit (ignore alpha)
  if (cleaned.length === 4) {
    return `#${cleaned[0]}${cleaned[0]}${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}`
  }

  // 8-digit hex with alpha to 6-digit (ignore alpha)
  if (cleaned.length === 8) {
    return `#${cleaned.substring(0, 6)}`
  }

  return `#${cleaned.substring(0, 6).padEnd(6, '0')}`
}

/**
 * Converts RGB/RGBA to hex
 */
function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
  if (!match)
    return '#000000'

  const r = Number.parseInt(match[1]!, 10)
  const g = Number.parseInt(match[2]!, 10)
  const b = Number.parseInt(match[3]!, 10)

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

/**
 * Converts HSL/HSLA to hex
 */
function hslToHex(hsl: string): string {
  const match = hsl.match(/hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*[\d.]+)?\)/)
  if (!match)
    return '#000000'

  const h = Number.parseInt(match[1]!, 10) / 360
  const s = Number.parseFloat(match[2]!) / 100
  const l = Number.parseFloat(match[3]!) / 100

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l // achromatic
  }
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0)
        t += 1
      if (t > 1)
        t -= 1
      if (t < 1 / 6)
        return p + (q - p) * 6 * t
      if (t < 1 / 2)
        return q
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return `#${componentToHex(Math.round(r * 255))}${componentToHex(Math.round(g * 255))}${componentToHex(Math.round(b * 255))}`
}

/**
 * Converts CMYK to hex
 */
function cmykToHex(cmyk: string): string {
  const match = cmyk.match(/cmyk\(([\d.]+)%?,\s*([\d.]+)%?,\s*([\d.]+)%?,\s*([\d.]+)%?\)/)
  if (!match)
    return '#000000'

  const c = Number.parseFloat(match[1]!) / 100
  const m = Number.parseFloat(match[2]!) / 100
  const y = Number.parseFloat(match[3]!) / 100
  const k = Number.parseFloat(match[4]!) / 100

  const r = Math.round(255 * (1 - c) * (1 - k))
  const g = Math.round(255 * (1 - m) * (1 - k))
  const b = Math.round(255 * (1 - y) * (1 - k))

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

/**
 * Converts LAB to hex
 */
function labToHex(lab: string): string {
  const match = lab.match(/lab\(([\d.]+)%?,\s*([-\d.]+),\s*([-\d.]+)\)/)
  if (!match)
    return '#000000'

  const l = Number.parseFloat(match[1]!)
  const a = Number.parseFloat(match[2]!)
  const b = Number.parseFloat(match[3]!)

  // LAB to XYZ
  let y = (l + 16) / 116
  let x = a / 500 + y
  let z = y - b / 200

  const labToXyzHelper = (t: number) => {
    return t > 0.206897 ? t ** 3 : (t - 16 / 116) / 7.787
  }

  x = 95.047 * labToXyzHelper(x)
  y = 100.000 * labToXyzHelper(y)
  z = 108.883 * labToXyzHelper(z)

  // XYZ to RGB
  x = x / 100
  y = y / 100
  z = z / 100

  let r = x * 3.2406 + y * -1.5372 + z * -0.4986
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415
  let bl = x * 0.0557 + y * -0.2040 + z * 1.0570

  const xyzToRgbHelper = (t: number) => {
    return t > 0.0031308 ? 1.055 * (t ** (1 / 2.4)) - 0.055 : 12.92 * t
  }

  r = xyzToRgbHelper(r)
  g = xyzToRgbHelper(g)
  bl = xyzToRgbHelper(bl)

  return `#${componentToHex(Math.max(0, Math.min(255, Math.round(r * 255))))}${componentToHex(Math.max(0, Math.min(255, Math.round(g * 255))))}${componentToHex(Math.max(0, Math.min(255, Math.round(bl * 255))))}`
}

/**
 * Converts a color component to hex
 */
function componentToHex(c: number): string {
  const hex = Math.max(0, Math.min(255, c)).toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}
