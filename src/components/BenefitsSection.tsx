import { Shield, Clock, DollarSign, HeartHandshake, Smartphone, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import React from "react";

const BenefitsSection = () => {
  const revealRef = useScrollReveal();
  const benefits: {
    icon: React.ElementType;
    title: string;
    description: string;
    cta?: { label: string; href: string };
  }[] = [
    {
      icon: Clock,
      title: "Disponibilidad 24/7",
      description: "Siempre disponibles, todos los días del año. No importa la hora, estamos aquí para ti.",
    },
    {
      icon: Check,
      title: "Conductores Certificados",
      description: "Todos nuestros conductores están licenciados, capacitados y tienen años de experiencia.",
    },
    {
      icon: DollarSign,
      title: "Tarifas Transparentes",
      description: "Sin sorpresas en el precio. Tarifas claras y justas, conoce el costo antes de viajar.",
      cta: { label: "Conócelas", href: "/tarifas" },
    },
    {
      icon: HeartHandshake,
      title: "Atención Inmediata",
      description: "Respuesta rápida a tu llamada. En promedio, nuestros taxis llegan en menos de 5 minutos.",
    },
    {
      icon: Shield,
      title: "Vehículos Modernos y Seguros",
      description: "Nuestra flota cuenta con vehículos en excelente estado, con mantenimiento preventivo y revisiones constantes.",
    },
    {
      icon: Smartphone,
      title: "Reservas Simples y Rápidas",
      description: "Reserva tu taxi en segundos desde nuestra web, por llamada o WhatsApp. Sin esperas ni complicaciones: te conectamos con el conductor más cercano.",
    },
  ];

  return (
    <section id="beneficios" className="section-padding bg-[hsl(var(--surface))]">
      <div ref={revealRef} className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">
            ¿Por qué elegir <span className="text-primary">Central de Taxis Girardot</span>?
          </h2>
          <p className="section-subheading">
            Somos más que un servicio de transporte. Somos tu compañía confiable 
            para llegar seguro a tu destino.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index} 
                className="taxi-card text-left"
              >
                <IconComponent className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
                {benefit.cta && (
                  <Link
                    to={benefit.cta.href}
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
                  >
                    {benefit.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
