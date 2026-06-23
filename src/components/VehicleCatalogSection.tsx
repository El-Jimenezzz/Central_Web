import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { parseVehicleCatalog, Vehicle } from "@/lib/vehicleValidation";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";

const VehicleCatalogSection: React.FC = () => {
  const revealRef = useScrollReveal();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/data/vehiculos.json");
        if (!response.ok) {
          setVehicles([]);
          return;
        }
        const data = await response.json();
        const validated = parseVehicleCatalog(data);
        setVehicles(validated);
      } catch {
        setVehicles([]);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section id="catalogo-vehiculos" className="section-padding bg-background">
      <div ref={revealRef} className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Vehículos en Venta</h2>
          <p className="section-subheading">
            Encuentra tu próximo vehículo con nosotros. Opciones seleccionadas con la
            confianza de Central de Taxis Girardot.
          </p>
        </div>

        {/* Vehicle Grid or Empty State */}
        {vehicles.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No hay vehículos disponibles en este momento
          </p>
        ) : (
          <div className={`grid gap-8 ${
            vehicles.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : vehicles.length === 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}>
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        {/* CTA WhatsApp */}
        <div className="text-center mt-12">
          <Button variant="whatsapp" size="lg" asChild>
            <a
              href="https://wa.me/573183998101?text=Hola%2C%20estoy%20interesado%20en%20un%20veh%C3%ADculo%20del%20cat%C3%A1logo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp al 318 3998101"
            >
              <MessageCircle className="h-5 w-5" />
              Consultar por un vehículo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VehicleCatalogSection;
