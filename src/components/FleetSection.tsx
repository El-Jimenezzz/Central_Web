import { Car, Crown } from "lucide-react";
import fleetImage from "@/assets/taxi-fleet.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FleetSection = () => {
  const revealRef = useScrollReveal();
  const vehicles = [
    {
      icon: Car,
      name: "Taxi Sedán",
      capacity: "4 pasajeros",
    },
    {
      icon: Crown,
      name: "Taxi Ejecutivo",
      capacity: "4 pasajeros",
    },
  ];

  return (
    <section id="flota" className="section-padding bg-background">
      <div ref={revealRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Nuestra Flota
          </h2>
          <p className="section-subheading">
            Contamos con una flota moderna y versátil para satisfacer todas tus necesidades de transporte
          </p>
        </div>

        {/* Fleet Image */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden mb-12">
          <img 
            src={fleetImage} 
            alt="Flota de taxis" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Vehículos Modernos y Seguros</h3>
            <p className="text-sm opacity-90">Mantenimiento preventivo y revisiones constantes</p>
          </div>
        </div>

        {/* Vehicle Types — horizontal strip */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mt-12">
          {vehicles.map((vehicle, index) => {
            const IconComponent = vehicle.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <IconComponent className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{vehicle.name}</span>
                <span className="text-muted-foreground text-sm">{vehicle.capacity}</span>
              </div>
            );
          })}
        </div>

        {/* CTA — ghost/link style */}
        <div className="text-center mt-12">
          <a href="#contacto" className="text-primary font-medium hover:underline underline-offset-4 inline-flex items-center gap-1">
            Reserva tu taxi <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
