import { Star } from "lucide-react";
import testimonialMaria from "@/assets/testimonial-maria.jpg";
import testimonialCarlos from "@/assets/testimonial-carlos.jpg";
import testimonialAna from "@/assets/testimonial-ana.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TestimonialsSection = () => {
  const revealRef = useScrollReveal();
  const testimonials = [
    {
      name: "María González",
      role: "Ejecutiva",
      rating: 5,
      comment: "Excelente servicio, siempre puntuales y conductores muy amables. Los uso para ir al trabajo todos los días.",
      image: testimonialMaria,
    },
    {
      name: "Carlos Rodríguez",
      role: "Empresario",
      rating: 5,
      comment: "Muy confiables para traslados a la terminal. Nunca he perdido un bus gracias a Central de Taxis.",
      image: testimonialCarlos,
    },
    {
      name: "Ana Martínez",
      role: "Estudiante",
      rating: 5,
      comment: "Precios justos y servicio 24/7. Perfecto para cuando salgo tarde de la universidad. Me siento muy segura.",
      image: testimonialAna,
    },
  ];

  return (
    <section id="testimonios" className="section-padding bg-background">
      <div ref={revealRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Lo que dicen nuestros clientes
          </h2>
          <p className="section-subheading">
            La satisfacción de nuestros pasajeros es nuestra mayor recompensa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 border-b border-border/30">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-xl lg:text-2xl italic text-foreground leading-relaxed mb-6">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
