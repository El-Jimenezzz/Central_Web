import { Car, Bus, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ServicesSection = () => {
  const revealRef = useScrollReveal();
  const services = [
    {
      icon: Car,
      title: "Viajes Urbanos",
      description: "Desplázate por toda la ciudad de manera rápida y segura. Conocemos todos los atajos.",
    },
    {
      icon: Bus,
      title: "Traslados a la Terminal de Transporte",
      description: "Llega a tiempo y sin estrés. Te llevamos o recogemos directamente en la Terminal de Transporte de Girardot con puntualidad garantizada.",
    },
    {
      icon: Clock,
      title: "Viajes Programados",
      description: "Agenda tu viaje con anticipación. Ideal para citas médicas, paseos familiares o desplazamientos a municipios cercanos.",
    },
  ];

  return (
    <section id="servicios" className="section-padding bg-[hsl(var(--surface))]">
      <div ref={revealRef} className="container mx-auto">
        <div className="text-center mb-16">
          <p className="overline mb-4">Nuestros Servicios</p>
          <h2 className="section-heading">
            Servicios de Transporte
          </h2>
          <p className="section-subheading">
            Ofrecemos una amplia gama de servicios de transporte adaptados a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="taxi-card group">
                <div className="icon-container mb-4">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
