import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { isValidPhone, isAtLeast12HoursAhead } from "@/lib/validation";

const digitArb = fc.constantFrom("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");

describe("Feature: landing-mejoras, Property 1: Validación de teléfono acepta formatos válidos y rechaza inválidos", () => {
  /**
   * Validates: Requirements 18.3, 18.4
   */
  it("acepta strings con 7-15 dígitos", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 7, max: 15 }).chain((len) =>
          fc.array(digitArb, { minLength: len, maxLength: len }).map((arr) => arr.join(""))
        ),
        (digits) => {
          expect(isValidPhone(digits)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("acepta números con prefijo +", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 7, max: 15 }).chain((len) =>
          fc.array(digitArb, { minLength: len, maxLength: len }).map((arr) => arr.join(""))
        ),
        fc.boolean(),
        (digits, hasPlus) => {
          const phone = hasPlus ? `+${digits}` : digits;
          expect(isValidPhone(phone)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("rechaza strings con menos de 7 dígitos", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 6 }).chain((len) =>
          len === 0
            ? fc.constant("")
            : fc.array(digitArb, { minLength: len, maxLength: len }).map((arr) => arr.join(""))
        ),
        (phone) => {
          expect(isValidPhone(phone)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("rechaza strings con caracteres no permitidos (letras, símbolos)", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom("a", "b", "c", "!", "@", "#"), { minLength: 1, maxLength: 10 }).map((arr) =>
          arr.join("")
        ),
        (invalidChars) => {
          expect(isValidPhone(invalidChars)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe("Feature: landing-mejoras, Property 2: Validación de fecha/hora rechaza fechas menores a 12 horas en el futuro", () => {
  /**
   * Validates: Requisito 18.5
   */

  // Helper to format a Date as local YYYY-MM-DD and HH:MM
  // isAtLeast12HoursAhead parses with `new Date(\`${date}T${time}\`)` which is local time
  function toLocalDateAndTime(d: Date): { date: string; time: string } {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}`,
    };
  }

  it("rechaza fechas/horas que están menos de 12 horas en el futuro", () => {
    fc.assert(
      fc.property(
        // 1 minute to 11 hours 59 minutes in ms (avoid 0 which is "now" and can be boundary)
        fc.integer({ min: 60000, max: 11 * 60 * 60 * 1000 + 59 * 60 * 1000 }),
        (offsetMs) => {
          const target = new Date(Date.now() + offsetMs);
          const { date, time } = toLocalDateAndTime(target);
          expect(isAtLeast12HoursAhead(date, time)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("acepta fechas/horas que están 12+ horas en el futuro", () => {
    fc.assert(
      fc.property(
        // 12h + 2min to 30 days (extra buffer to avoid minute-level boundary)
        fc.integer({ min: 12 * 60 * 60 * 1000 + 2 * 60 * 1000, max: 30 * 24 * 60 * 60 * 1000 }),
        (offsetMs) => {
          const target = new Date(Date.now() + offsetMs);
          const { date, time } = toLocalDateAndTime(target);
          expect(isAtLeast12HoursAhead(date, time)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("rechaza fechas/horas inválidas", () => {
    expect(isAtLeast12HoursAhead("invalid", "invalid")).toBe(false);
    expect(isAtLeast12HoursAhead("", "")).toBe(false);
  });
});
