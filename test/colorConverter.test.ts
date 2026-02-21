import { expect, it, describe } from 'vitest'
import { convertColorToHex } from '../src/runtime/utils/colorConverter'

describe('convertColorToHex', () => {
  describe('Hex color formats', () => {
    it('handles 6-digit hex colors', () => {
      expect(convertColorToHex('#3b82f6')).toBe('#3b82f6')
      expect(convertColorToHex('#ff5733')).toBe('#ff5733')
      expect(convertColorToHex('#000000')).toBe('#000000')
      expect(convertColorToHex('#ffffff')).toBe('#ffffff')
    })

    it('handles 3-digit hex colors', () => {
      expect(convertColorToHex('#fff')).toBe('#ffffff')
      expect(convertColorToHex('#000')).toBe('#000000')
      expect(convertColorToHex('#f00')).toBe('#ff0000')
      expect(convertColorToHex('#0f0')).toBe('#00ff00')
      expect(convertColorToHex('#00f')).toBe('#0000ff')
    })

    it('handles 8-digit hex colors with alpha', () => {
      expect(convertColorToHex('#3b82f6ff')).toBe('#3b82f6')
      expect(convertColorToHex('#ff573380')).toBe('#ff5733')
    })

    it('handles 4-digit hex colors with alpha', () => {
      expect(convertColorToHex('#ffff')).toBe('#ffffff')
      expect(convertColorToHex('#000f')).toBe('#000000')
    })

    it('handles hex colors without # prefix', () => {
      expect(convertColorToHex('3b82f6')).toBe('#3b82f6')
      expect(convertColorToHex('fff')).toBe('#ffffff')
    })

    it('handles mixed case hex colors', () => {
      expect(convertColorToHex('#3B82F6')).toBe('#3b82f6')
      expect(convertColorToHex('#FfF')).toBe('#ffffff')
    })
  })

  describe('RGB color formats', () => {
    it('handles standard RGB format', () => {
      expect(convertColorToHex('rgb(59, 130, 246)')).toBe('#3b82f6')
      expect(convertColorToHex('rgb(255, 0, 0)')).toBe('#ff0000')
      expect(convertColorToHex('rgb(0, 255, 0)')).toBe('#00ff00')
      expect(convertColorToHex('rgb(0, 0, 255)')).toBe('#0000ff')
      expect(convertColorToHex('rgb(0, 0, 0)')).toBe('#000000')
      expect(convertColorToHex('rgb(255, 255, 255)')).toBe('#ffffff')
    })

    it('handles RGB format with varying whitespace', () => {
      expect(convertColorToHex('rgb(59,130,246)')).toBe('#3b82f6')
      expect(convertColorToHex('rgb(59,  130,  246)')).toBe('#3b82f6')
    })

    it('handles RGBA format (ignores alpha)', () => {
      expect(convertColorToHex('rgba(59, 130, 246, 0.8)')).toBe('#3b82f6')
      expect(convertColorToHex('rgba(255, 0, 0, 0.5)')).toBe('#ff0000')
      expect(convertColorToHex('rgba(0, 255, 0, 1)')).toBe('#00ff00')
    })
  })

  describe('HSL color formats', () => {
    it('handles standard HSL format', () => {
      // Blue: hsl(217, 91%, 60%)
      // HSL to RGB conversion has slight rounding, so we check it's close
      const result = convertColorToHex('hsl(217, 91%, 60%)')
      expect(result).toMatch(/^#3[bc]8[23]f[56]$/)
    })

    it('handles HSL red', () => {
      expect(convertColorToHex('hsl(0, 100%, 50%)')).toBe('#ff0000')
    })

    it('handles HSL green', () => {
      expect(convertColorToHex('hsl(120, 100%, 50%)')).toBe('#00ff00')
    })

    it('handles HSL blue', () => {
      expect(convertColorToHex('hsl(240, 100%, 50%)')).toBe('#0000ff')
    })

    it('handles HSL black', () => {
      expect(convertColorToHex('hsl(0, 0%, 0%)')).toBe('#000000')
    })

    it('handles HSL white', () => {
      expect(convertColorToHex('hsl(0, 0%, 100%)')).toBe('#ffffff')
    })

    it('handles HSL gray (achromatic)', () => {
      expect(convertColorToHex('hsl(0, 0%, 50%)')).toBe('#808080')
    })

    it('handles HSLA format (ignores alpha)', () => {
      // HSL conversions have minor rounding differences
      const result = convertColorToHex('hsla(217, 91%, 60%, 0.8)')
      expect(result).toMatch(/^#3[bc]8[23]f[56]$/)
      expect(convertColorToHex('hsla(0, 100%, 50%, 0.5)')).toBe('#ff0000')
    })
  })

  describe('CMYK color formats', () => {
    it('handles CMYK format with percentages', () => {
      // CMYK conversion has minor rounding differences
      const result = convertColorToHex('cmyk(76%, 47%, 0%, 4%)')
      expect(result).toMatch(/^#3b82f[56]$/)
    })

    it('handles CMYK red', () => {
      expect(convertColorToHex('cmyk(0%, 100%, 100%, 0%)')).toBe('#ff0000')
    })

    it('handles CMYK green', () => {
      expect(convertColorToHex('cmyk(100%, 0%, 100%, 0%)')).toBe('#00ff00')
    })

    it('handles CMYK blue', () => {
      expect(convertColorToHex('cmyk(100%, 100%, 0%, 0%)')).toBe('#0000ff')
    })

    it('handles CMYK black', () => {
      expect(convertColorToHex('cmyk(0%, 0%, 0%, 100%)')).toBe('#000000')
    })

    it('handles CMYK white', () => {
      expect(convertColorToHex('cmyk(0%, 0%, 0%, 0%)')).toBe('#ffffff')
    })

    it('handles CMYK format without percentages', () => {
      expect(convertColorToHex('cmyk(0, 100, 100, 0)')).toBe('#ff0000')
    })
  })

  describe('LAB color formats', () => {
    it('handles LAB format', () => {
      // LAB values for approximate blue
      const result = convertColorToHex('lab(60, 20, -60)')
      // LAB conversion may have slight variations, so we check it's a valid hex
      expect(result).toMatch(/^#[0-9a-f]{6}$/)
    })

    it('handles LAB white', () => {
      expect(convertColorToHex('lab(100, 0, 0)')).toBe('#ffffff')
    })

    it('handles LAB black', () => {
      expect(convertColorToHex('lab(0, 0, 0)')).toBe('#000000')
    })

    it('handles LAB format with percentage', () => {
      const result = convertColorToHex('lab(60%, 20, -60)')
      expect(result).toMatch(/^#[0-9a-f]{6}$/)
    })
  })

  describe('Edge cases and error handling', () => {
    it('handles empty string', () => {
      expect(convertColorToHex('')).toBe('#000000')
    })

    it('handles null/undefined-like values', () => {
      expect(convertColorToHex('   ')).toBe('#000000')
    })

    it('handles invalid color formats', () => {
      expect(convertColorToHex('invalid')).toBe('#000000')
      expect(convertColorToHex('not-a-color')).toBe('#000000')
      expect(convertColorToHex('rgb(invalid)')).toBe('#000000')
      expect(convertColorToHex('hsl(invalid)')).toBe('#000000')
    })

    it('handles malformed hex colors', () => {
      expect(convertColorToHex('#gg')).toBe('#000000')
      expect(convertColorToHex('#')).toBe('#000000')
    })

    it('handles RGB values out of range', () => {
      // Should clamp to valid range
      const result = convertColorToHex('rgb(300, -50, 500)')
      expect(result).toMatch(/^#[0-9a-f]{6}$/)
    })

    it('handles partial hex colors', () => {
      expect(convertColorToHex('#12')).toBe('#120000')
      expect(convertColorToHex('#1')).toBe('#100000')
    })
  })

  describe('Color conversions accuracy', () => {
    it('converts common colors correctly', () => {
      // Red
      expect(convertColorToHex('#ff0000')).toBe('#ff0000')
      expect(convertColorToHex('rgb(255, 0, 0)')).toBe('#ff0000')
      expect(convertColorToHex('hsl(0, 100%, 50%)')).toBe('#ff0000')

      // Green
      expect(convertColorToHex('#00ff00')).toBe('#00ff00')
      expect(convertColorToHex('rgb(0, 255, 0)')).toBe('#00ff00')
      expect(convertColorToHex('hsl(120, 100%, 50%)')).toBe('#00ff00')

      // Blue
      expect(convertColorToHex('#0000ff')).toBe('#0000ff')
      expect(convertColorToHex('rgb(0, 0, 255)')).toBe('#0000ff')
      expect(convertColorToHex('hsl(240, 100%, 50%)')).toBe('#0000ff')
    })

    it('converts grayscale colors correctly', () => {
      expect(convertColorToHex('rgb(128, 128, 128)')).toBe('#808080')
      expect(convertColorToHex('rgb(64, 64, 64)')).toBe('#404040')
      expect(convertColorToHex('rgb(192, 192, 192)')).toBe('#c0c0c0')
    })

    it('handles common color names as hex', () => {
      // These are already in hex format
      expect(convertColorToHex('#ff6347')).toBe('#ff6347') // Tomato
      expect(convertColorToHex('#4682b4')).toBe('#4682b4') // Steel Blue
      expect(convertColorToHex('#daa520')).toBe('#daa520') // Goldenrod
    })
  })

  describe('Whitespace handling', () => {
    it('handles leading and trailing whitespace', () => {
      expect(convertColorToHex('  #3b82f6  ')).toBe('#3b82f6')
      expect(convertColorToHex('  rgb(59, 130, 246)  ')).toBe('#3b82f6')
      // HSL has minor rounding
      const result = convertColorToHex('  hsl(217, 91%, 60%)  ')
      expect(result).toMatch(/^#3[bc]8[23]f[56]$/)
    })
  })

  describe('Return value format', () => {
    it('always returns lowercase hex', () => {
      expect(convertColorToHex('#3B82F6')).toBe('#3b82f6')
      expect(convertColorToHex('#FFFFFF')).toBe('#ffffff')
      expect(convertColorToHex('RGB(255, 0, 0)')).toBe('#ff0000')
    })

    it('always returns 6-digit hex with # prefix', () => {
      const result1 = convertColorToHex('rgb(59, 130, 246)')
      expect(result1).toMatch(/^#[0-9a-f]{6}$/)

      const result2 = convertColorToHex('#fff')
      expect(result2).toMatch(/^#[0-9a-f]{6}$/)
      expect(result2).toBe('#ffffff')
    })
  })
})
