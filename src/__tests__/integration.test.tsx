import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Provide a global IntersectionObserver stub for components that use it directly
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}

beforeAll(() => {
  global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

// Mock useScrollReveal to avoid IntersectionObserver issues in jsdom
vi.mock("@/hooks/useScrollReveal", () => ({
  useScrollReveal: () => ({ current: null }),
}));

// Mock global fetch to return valid vehicle data for VehicleCatalogSection
const mockVehicles = [
  {
    id: "v001",
    marca: "Chevrolet",
    modelo: "Spark GT",
    anio: 2020,
    tipoCombustible: "gasolina",
    foto: "https://example.com/spark-gt.jpg",
    disponible: true,
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockVehicles),
    } as Response)
  );
});

describe("Integration: Section order in Index.tsx", () => {
  it("renders sections in order: servicios → mas-servicios → catalogo-vehiculos → beneficios", async () => {
    // Dynamic import to ensure mocks are in place
    const { default: Index } = await import("@/pages/Index");

    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const servicios = container.querySelector('[id="servicios"]');
    const masServicios = container.querySelector('[id="mas-servicios"]');
    const catalogo = container.querySelector('[id="catalogo-vehiculos"]');
    const beneficios = container.querySelector('[id="beneficios"]');

    expect(servicios).toBeInTheDocument();
    expect(masServicios).toBeInTheDocument();
    expect(catalogo).toBeInTheDocument();
    expect(beneficios).toBeInTheDocument();

    // Verify DOM order using compareDocumentPosition
    // Node.DOCUMENT_POSITION_FOLLOWING (4) means the compared node comes after
    expect(
      servicios!.compareDocumentPosition(masServicios!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    expect(
      masServicios!.compareDocumentPosition(catalogo!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    expect(
      catalogo!.compareDocumentPosition(beneficios!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});

describe("Integration: Header navigation link 'Más Servicios'", () => {
  it("contains a link with text 'Más Servicios' and href including '#mas-servicios'", async () => {
    const { default: Header } = await import("@/components/Header");

    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const link = getByText("Más Servicios");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute(
      "href",
      expect.stringContaining("#mas-servicios")
    );
  });
});
