import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VehicleCard from "@/components/VehicleCard";
import { Vehicle } from "@/lib/vehicleValidation";

const testVehicle: Vehicle = {
  id: "v001",
  marca: "Chevrolet",
  modelo: "Spark GT",
  anio: 2022,
  tipoCombustible: "gasolina" as const,
  foto: "https://example.com/spark.jpg",
  disponible: true,
};

describe("VehicleCard", () => {
  it("muestra marca y modelo en el heading h3", () => {
    render(<VehicleCard vehicle={testVehicle} />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Chevrolet Spark GT");
  });

  it("muestra el año del vehículo", () => {
    render(<VehicleCard vehicle={testVehicle} />);

    expect(screen.getByText(/2022/)).toBeInTheDocument();
  });

  it("muestra el tipo de combustible", () => {
    render(<VehicleCard vehicle={testVehicle} />);

    expect(screen.getByText(/gasolina/)).toBeInTheDocument();
  });

  it('tiene alt text con el formato "marca modelo anio"', () => {
    render(<VehicleCard vehicle={testVehicle} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Chevrolet Spark GT 2022");
  });

  it('muestra "Sin foto disponible" cuando la imagen falla al cargar', () => {
    render(<VehicleCard vehicle={testVehicle} />);

    const img = screen.getByRole("img");
    fireEvent.error(img);

    expect(screen.getByText("Sin foto disponible")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
