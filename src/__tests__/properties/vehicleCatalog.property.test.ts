import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  validateVehicle,
  parseVehicleCatalog,
  generateAltText,
  Vehicle,
} from "@/lib/vehicleValidation";

// --- Generators ---

const VALID_FUEL_TYPES = ["gasolina", "diesel", "gas", "eléctrico", "híbrido"] as const;

const currentYear = new Date().getFullYear();

/** Generates a valid Vehicle object conforming to all schema constraints */
const validVehicleArb = fc.record({
  id: fc.string({ minLength: 1, maxLength: 36 }).filter((s) => s.length > 0),
  marca: fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.length > 0),
  modelo: fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.length > 0),
  anio: fc.integer({ min: 2000, max: currentYear }),
  tipoCombustible: fc.constantFrom(...VALID_FUEL_TYPES),
  foto: fc.oneof(
    fc.webUrl().map((url) => url),
    fc.string({ minLength: 1, maxLength: 30 }).map((s) => `/${s.replace(/\//g, "x")}`)
  ),
  disponible: fc.boolean(),
});

/** Generates a valid Vehicle that is always disponible */
const availableVehicleArb = validVehicleArb.map((v) => ({ ...v, disponible: true as const }));

/** Generates a valid Vehicle that is never disponible */
const unavailableVehicleArb = validVehicleArb.map((v) => ({ ...v, disponible: false as const }));

// --- Property 1: Vehicle validation accepts valid entries and rejects invalid ones ---

describe("Feature: servicios-y-catalogo-vehiculos, Property 1: Vehicle validation accepts valid entries and rejects invalid ones", () => {
  /**
   * Validates: Requirements 4.2, 4.5, 4.7
   */

  it("accepts any object that conforms to the Vehicle schema", () => {
    fc.assert(
      fc.property(validVehicleArb, (vehicle) => {
        const result = validateVehicle(vehicle);
        expect(result).not.toBeNull();
        expect(result!.id).toBe(vehicle.id);
        expect(result!.marca).toBe(vehicle.marca);
        expect(result!.modelo).toBe(vehicle.modelo);
        expect(result!.anio).toBe(vehicle.anio);
        expect(result!.tipoCombustible).toBe(vehicle.tipoCombustible);
        expect(result!.foto).toBe(vehicle.foto);
        expect(result!.disponible).toBe(vehicle.disponible);
      }),
      { numRuns: 100 }
    );
  });

  it("rejects objects with missing required fields", () => {
    const requiredFields = ["id", "marca", "modelo", "anio", "tipoCombustible", "foto", "disponible"];

    fc.assert(
      fc.property(
        validVehicleArb,
        fc.constantFrom(...requiredFields),
        (vehicle, fieldToRemove) => {
          const incomplete = { ...vehicle };
          delete (incomplete as Record<string, unknown>)[fieldToRemove];
          expect(validateVehicle(incomplete)).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("rejects objects with incorrect types", () => {
    fc.assert(
      fc.property(validVehicleArb, (vehicle) => {
        // anio as string instead of number
        const withStringAnio = { ...vehicle, anio: String(vehicle.anio) };
        expect(validateVehicle(withStringAnio)).toBeNull();

        // disponible as string instead of boolean
        const withStringDisponible = { ...vehicle, disponible: "true" };
        expect(validateVehicle(withStringDisponible)).toBeNull();

        // id as number instead of string
        const withNumberId = { ...vehicle, id: 123 };
        expect(validateVehicle(withNumberId)).toBeNull();
      }),
      { numRuns: 100 }
    );
  });

  it("rejects objects with out-of-range values", () => {
    fc.assert(
      fc.property(
        validVehicleArb,
        fc.oneof(
          fc.integer({ min: 1900, max: 1999 }),
          fc.integer({ min: currentYear + 1, max: currentYear + 100 })
        ),
        (vehicle, invalidYear) => {
          const withBadYear = { ...vehicle, anio: invalidYear };
          expect(validateVehicle(withBadYear)).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("rejects objects with invalid foto format", () => {
    fc.assert(
      fc.property(
        validVehicleArb,
        fc.string({ minLength: 1, maxLength: 50 }).filter(
          (s) => !s.startsWith("http://") && !s.startsWith("https://") && !s.startsWith("/")
        ),
        (vehicle, badFoto) => {
          const withBadFoto = { ...vehicle, foto: badFoto };
          expect(validateVehicle(withBadFoto)).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("rejects objects with invalid tipoCombustible", () => {
    fc.assert(
      fc.property(
        validVehicleArb,
        fc.string({ minLength: 1, maxLength: 20 }).filter(
          (s) => !(VALID_FUEL_TYPES as readonly string[]).includes(s)
        ),
        (vehicle, badFuel) => {
          const withBadFuel = { ...vehicle, tipoCombustible: badFuel };
          expect(validateVehicle(withBadFuel)).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("rejects non-object values", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(null),
          fc.constant(undefined),
          fc.integer(),
          fc.string(),
          fc.boolean()
        ),
        (value) => {
          expect(validateVehicle(value)).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// --- Property 2: Catalog filtering preserves only available vehicles ---

describe("Feature: servicios-y-catalogo-vehiculos, Property 2: Catalog filtering preserves only available vehicles", () => {
  /**
   * Validates: Requirements 3.1, 4.4
   */

  it("returns only vehicles with disponible === true in the same relative order", () => {
    fc.assert(
      fc.property(
        fc.array(validVehicleArb, { minLength: 0, maxLength: 20 }),
        (vehicles) => {
          const result = parseVehicleCatalog(vehicles);
          const expectedAvailable = vehicles.filter((v) => v.disponible === true);
          // All results should be available
          for (const v of result) {
            expect(v.disponible).toBe(true);
          }
          // No unavailable vehicle should appear
          const resultIds = result.map((v) => v.id);
          const unavailableIds = vehicles
            .filter((v) => v.disponible === false)
            .map((v) => v.id);
          for (const uid of unavailableIds) {
            // Only check if this id is exclusively unavailable
            const isAlsoAvailable = vehicles.some(
              (v) => v.id === uid && v.disponible === true
            );
            if (!isAlsoAvailable) {
              expect(resultIds).not.toContain(uid);
            }
          }
          // Order preservation: result should be a subsequence of expectedAvailable (capped at 6)
          const cappedExpected = expectedAvailable.slice(0, 6);
          expect(result.length).toBe(cappedExpected.length);
          for (let i = 0; i < result.length; i++) {
            expect(result[i].id).toBe(cappedExpected[i].id);
            expect(result[i].marca).toBe(cappedExpected[i].marca);
            expect(result[i].modelo).toBe(cappedExpected[i].modelo);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("never includes a vehicle with disponible === false", () => {
    fc.assert(
      fc.property(
        fc.array(unavailableVehicleArb, { minLength: 1, maxLength: 20 }),
        (unavailableVehicles) => {
          const result = parseVehicleCatalog(unavailableVehicles);
          expect(result).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// --- Property 3: Catalog display is capped at 6 vehicles ---

describe("Feature: servicios-y-catalogo-vehiculos, Property 3: Catalog display is capped at 6 vehicles", () => {
  /**
   * Validates: Requirements 3.3
   */

  it("result length equals min(availableCount, 6)", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 50 }).chain((n) =>
          fc.array(availableVehicleArb, { minLength: n, maxLength: n }).map((arr) => ({
            vehicles: arr,
            count: n,
          }))
        ),
        ({ vehicles, count }) => {
          const result = parseVehicleCatalog(vehicles);
          const expectedLength = Math.min(count, 6);
          expect(result).toHaveLength(expectedLength);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("contains the first 6 of the filtered results", () => {
    fc.assert(
      fc.property(
        fc.array(availableVehicleArb, { minLength: 7, maxLength: 50 }),
        (vehicles) => {
          const result = parseVehicleCatalog(vehicles);
          expect(result).toHaveLength(6);
          // The result should be the first 6 available vehicles
          for (let i = 0; i < 6; i++) {
            expect(result[i].id).toBe(vehicles[i].id);
            expect(result[i].marca).toBe(vehicles[i].marca);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("returns empty array for empty input", () => {
    const result = parseVehicleCatalog([]);
    expect(result).toHaveLength(0);
  });
});

// --- Property 4: Alt text follows the accessibility pattern ---

describe("Feature: servicios-y-catalogo-vehiculos, Property 4: Alt text follows the accessibility pattern", () => {
  /**
   * Validates: Requirements 6.1
   */

  it("alt text follows the pattern '${marca} ${modelo} ${anio}' and has max 125 characters", () => {
    fc.assert(
      fc.property(
        validVehicleArb,
        (vehicle) => {
          const altText = generateAltText(vehicle as Vehicle);
          const expectedFull = `${vehicle.marca} ${vehicle.modelo} ${vehicle.anio}`;

          // Must not exceed 125 characters
          expect(altText.length).toBeLessThanOrEqual(125);

          // If the full pattern is ≤125 chars, it should match exactly
          if (expectedFull.length <= 125) {
            expect(altText).toBe(expectedFull);
          } else {
            // If truncated, it should be the first 125 chars of the pattern
            expect(altText).toBe(expectedFull.slice(0, 125));
            expect(altText.length).toBe(125);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("alt text contains marca, modelo and anio when under 125 chars", () => {
    // Use short strings that guarantee total < 125
    const shortVehicleArb = fc.record({
      id: fc.string({ minLength: 1, maxLength: 10 }).filter((s) => s.length > 0),
      marca: fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.length > 0),
      modelo: fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.length > 0),
      anio: fc.integer({ min: 2000, max: currentYear }),
      tipoCombustible: fc.constantFrom(...VALID_FUEL_TYPES),
      foto: fc.constant("/img/test.jpg"),
      disponible: fc.boolean(),
    });

    fc.assert(
      fc.property(shortVehicleArb, (vehicle) => {
        const altText = generateAltText(vehicle as Vehicle);
        expect(altText).toContain(vehicle.marca);
        expect(altText).toContain(vehicle.modelo);
        expect(altText).toContain(String(vehicle.anio));
      }),
      { numRuns: 100 }
    );
  });
});
