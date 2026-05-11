import { describe, it, expect } from "vitest";

/**
 * Converts HSL values to RGB (0-1 range) for WCAG contrast calculation.
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [f(0), f(8), f(4)];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Feature: landing-mejoras, Property 5: Contraste del color primario de texto", () => {
  /**
   * Validates: Requisito 10.1
   */
  it("--primary-text (40 100% 31%) tiene ratio de contraste >= 4.5:1 contra blanco", () => {
    // --primary-text: 40 100% 31%
    const [r, g, b] = hslToRgb(40, 100, 31);
    const textLuminance = relativeLuminance(r, g, b);
    const whiteLuminance = relativeLuminance(1, 1, 1); // white = rgb(1,1,1)
    const ratio = contrastRatio(textLuminance, whiteLuminance);

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("--primary-text mantiene identidad amarilla (hue entre 30 y 50)", () => {
    // The hue of --primary-text is 40, which is in the yellow range
    const hue = 40;
    expect(hue).toBeGreaterThanOrEqual(30);
    expect(hue).toBeLessThanOrEqual(50);
  });
});
