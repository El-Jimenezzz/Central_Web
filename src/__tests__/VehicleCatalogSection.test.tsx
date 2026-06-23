import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import VehicleCatalogSection from "@/components/VehicleCatalogSection";

// Mock useScrollReveal to avoid IntersectionObserver issues in jsdom
vi.mock("@/hooks/useScrollReveal", () => ({
  useScrollReveal: () => ({ current: null }),
}));

const validVehicles = [
  { id: "v001", marca: "Chevrolet", modelo: "Spark GT", anio: 2022, tipoCombustible: "gasolina", foto: "https://example.com/spark.jpg", disponible: true },
  { id: "v002", marca: "Kia", modelo: "Picanto", anio: 2021, tipoCombustible: "gasolina", foto: "https://example.com/picanto.jpg", disponible: true },
  { id: "v003", marca: "Renault", modelo: "Logan", anio: 2023, tipoCombustible: "gasolina", foto: "https://example.com/logan.jpg", disponible: true },
];

describe("VehicleCatalogSection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders vehicle cards when fetch returns valid data", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => validVehicles,
    } as Response);

    render(<VehicleCatalogSection />);

    // Wait for async fetch to complete and cards to render
    await waitFor(() => {
      expect(screen.getByText("Chevrolet Spark GT")).toBeInTheDocument();
    });

    expect(screen.getByText("Kia Picanto")).toBeInTheDocument();
    expect(screen.getByText("Renault Logan")).toBeInTheDocument();

    // Verify vehicle details are shown
    expect(screen.getByText("Año: 2022 · Combustible: gasolina")).toBeInTheDocument();
    expect(screen.getByText("Año: 2021 · Combustible: gasolina")).toBeInTheDocument();
    expect(screen.getByText("Año: 2023 · Combustible: gasolina")).toBeInTheDocument();
  });

  it("shows empty state message when fetch returns invalid JSON (non-array)", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ notAnArray: true }),
    } as Response);

    render(<VehicleCatalogSection />);

    await waitFor(() => {
      expect(
        screen.getByText("No hay vehículos disponibles en este momento")
      ).toBeInTheDocument();
    });
  });

  it("shows empty state message when fetch returns an empty array", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    render(<VehicleCatalogSection />);

    await waitFor(() => {
      expect(
        screen.getByText("No hay vehículos disponibles en este momento")
      ).toBeInTheDocument();
    });
  });

  it("shows empty state message when fetch rejects (network error)", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

    render(<VehicleCatalogSection />);

    await waitFor(() => {
      expect(
        screen.getByText("No hay vehículos disponibles en este momento")
      ).toBeInTheDocument();
    });
  });
});
