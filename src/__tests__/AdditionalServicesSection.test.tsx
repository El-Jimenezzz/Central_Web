import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AdditionalServicesSection from "@/components/AdditionalServicesSection";

// Mock useScrollReveal to avoid IntersectionObserver issues in jsdom
vi.mock("@/hooks/useScrollReveal", () => ({
  useScrollReveal: () => ({ current: null }),
}));

describe("AdditionalServicesSection", () => {
  /**
   * Validates: Requirements 1.1, 1.2
   */
  describe("renderiza 6 tarjetas de servicio con los títulos correctos", () => {
    it("muestra exactamente 6 tarjetas con los títulos esperados", () => {
      render(<AdditionalServicesSection />);

      const expectedTitles = [
        "Venta de vehículos nuevos y usados",
        "Trámites ante el tránsito",
        "Chatarrización",
        "Crédito para compra de vehículo",
        "Venta de SOAT",
        "Seguros todo riesgo",
      ];

      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings).toHaveLength(6);

      expectedTitles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });

  /**
   * Validates: Requirements 1.3, 6.2
   */
  describe("CTA WhatsApp con atributos correctos", () => {
    it("tiene href que comienza con https://wa.me/573183998101", () => {
      render(<AdditionalServicesSection />);

      const link = screen.getByRole("link", {
        name: "Contactar por WhatsApp al 318 3998101",
      });

      expect(link).toHaveAttribute(
        "href",
        expect.stringContaining("https://wa.me/573183998101")
      );
    });

    it('tiene target="_blank"', () => {
      render(<AdditionalServicesSection />);

      const link = screen.getByRole("link", {
        name: "Contactar por WhatsApp al 318 3998101",
      });

      expect(link).toHaveAttribute("target", "_blank");
    });

    it('tiene rel="noopener noreferrer"', () => {
      render(<AdditionalServicesSection />);

      const link = screen.getByRole("link", {
        name: "Contactar por WhatsApp al 318 3998101",
      });

      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("tiene aria-label correcto", () => {
      render(<AdditionalServicesSection />);

      const link = screen.getByRole("link", {
        name: "Contactar por WhatsApp al 318 3998101",
      });

      expect(link).toHaveAttribute(
        "aria-label",
        "Contactar por WhatsApp al 318 3998101"
      );
    });
  });

  /**
   * Validates: Requirements 6.3
   */
  describe("estructura semántica h2/h3", () => {
    it("contiene un h2 para el título de la sección", () => {
      render(<AdditionalServicesSection />);

      const h2 = screen.getAllByRole("heading", { level: 2 });
      expect(h2).toHaveLength(1);
      expect(h2[0]).toHaveTextContent("Más Servicios");
    });

    it("contiene seis h3 para los títulos de cada servicio", () => {
      render(<AdditionalServicesSection />);

      const h3Elements = screen.getAllByRole("heading", { level: 3 });
      expect(h3Elements).toHaveLength(6);
    });
  });
});
