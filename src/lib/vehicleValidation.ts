/**
 * Vehicle catalog validation utilities.
 * Pure functions for validating vehicle entries from the JSON catalog.
 */

const VALID_FUEL_TYPES = ["gasolina", "diesel", "gas", "eléctrico", "híbrido"] as const;

export interface Vehicle {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  tipoCombustible: "gasolina" | "diesel" | "gas" | "eléctrico" | "híbrido";
  foto: string;
  disponible: boolean;
}

/**
 * Validates a single vehicle entry.
 * Returns a Vehicle object if all fields are valid, or null otherwise.
 */
export function validateVehicle(entry: unknown): Vehicle | null {
  if (entry === null || typeof entry !== "object") return null;

  const obj = entry as Record<string, unknown>;

  // id: string, max 36 chars
  if (typeof obj.id !== "string" || obj.id.length === 0 || obj.id.length > 36) return null;

  // marca: string, max 50 chars
  if (typeof obj.marca !== "string" || obj.marca.length === 0 || obj.marca.length > 50) return null;

  // modelo: string, max 50 chars
  if (typeof obj.modelo !== "string" || obj.modelo.length === 0 || obj.modelo.length > 50) return null;

  // anio: integer between 2000 and current year inclusive
  if (typeof obj.anio !== "number" || !Number.isInteger(obj.anio)) return null;
  const currentYear = new Date().getFullYear();
  if (obj.anio < 2000 || obj.anio > currentYear) return null;

  // tipoCombustible: one of the valid values (case-insensitive)
  if (typeof obj.tipoCombustible !== "string") return null;
  const fuelNormalized = obj.tipoCombustible.toLowerCase();
  if (!(VALID_FUEL_TYPES as readonly string[]).includes(fuelNormalized)) return null;

  // foto: URL starting with "http://", "https://", or "/"
  if (typeof obj.foto !== "string") return null;
  if (!obj.foto.startsWith("http://") && !obj.foto.startsWith("https://") && !obj.foto.startsWith("/")) return null;

  // disponible: boolean
  if (typeof obj.disponible !== "boolean") return null;

  return {
    id: obj.id,
    marca: obj.marca,
    modelo: obj.modelo,
    anio: obj.anio,
    tipoCombustible: fuelNormalized as Vehicle["tipoCombustible"],
    foto: obj.foto,
    disponible: obj.disponible,
  };
}

/**
 * Parses a vehicle catalog from unknown data.
 * Validates each entry, filters by disponible === true, and limits to 6 results.
 */
export function parseVehicleCatalog(data: unknown): Vehicle[] {
  if (!Array.isArray(data)) return [];

  const result: Vehicle[] = [];

  for (const entry of data) {
    if (result.length >= 6) break;

    const vehicle = validateVehicle(entry);
    if (vehicle !== null && vehicle.disponible === true) {
      result.push(vehicle);
    }
  }

  return result;
}

/**
 * Generates accessible alt text for a vehicle image.
 * Returns "${marca} ${modelo} ${anio}" truncated to max 125 characters.
 */
export function generateAltText(vehicle: Vehicle): string {
  const text = `${vehicle.marca} ${vehicle.modelo} ${vehicle.anio}`;
  if (text.length <= 125) return text;
  return text.slice(0, 125);
}
