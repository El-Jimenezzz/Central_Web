import { Car, FileText, Recycle, CreditCard, Shield, ShieldCheck, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
}

const services: ServiceItem[] = [
  { icon: Car, title: "Venta de vehículos nuevos y usados" },
  { icon: FileText, title: "Trámites ante el tránsito" },
  { icon: Recycle, title: "Chatarrización" },
  { icon: CreditCard, title: "Financiación para compra de vehículos" },
  { icon: Shield, title: "Venta de SOAT" },
  { icon: ShieldCheck, title: "Seguros todo riesgo" },
];

const AdditionalServicesSection = () => {
  const revealRef = useScrollReveal();

  return (
    <section id="mas-servicios" className="section-padding bg-[hsl(var(--surface))]">
      <div ref={revealRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Más Servicios
          </h2>
          <p className="section-subheading">
            Además del transporte, te ofrecemos soluciones integrales para tu vehículo y trámites de tránsito
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center gap-4 p-0">
                  <div className="icon-container">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="whatsapp" size="lg" asChild>
            <a
              href="https://wa.me/573183998101?text=Hola%2C%20estoy%20interesado%20en%20los%20servicios%20adicionales%20de%20Central%20de%20Taxis%20Girardot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp al 318 3998101"
            >
              <MessageCircle className="h-5 w-5" />
              Contáctanos por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServicesSection;
