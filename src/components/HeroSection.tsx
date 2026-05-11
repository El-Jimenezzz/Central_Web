import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-taxi.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Taxi en la ciudad" 
          className="w-full h-full object-cover" style={{ objectPosition: '50% 70%' }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Tu Taxi en <span className="text-primary">Minutos</span>, Siempre Disponible
          </h1>
          
          <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
            Central de Taxis Girardot, transporte rápido, seguro y confiable 24/7. 
            Te llevamos a donde necesites ir.
          </p>

          {/* Primary CTA — WhatsApp */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <Button variant="whatsapp" size="lg" asChild className="text-xl px-8 py-6 h-auto rounded-full">
              <a href="https://wa.me/573228331111?text=Hola%2C%20necesito%20un%20taxi%20desde...">
                <MessageCircle className="h-6 w-6" />
                Pide tu Taxi por WhatsApp
              </a>
            </Button>
          </div>

          {/* Secondary phone link */}
          <a href="tel:+573228111111" className="text-white/70 hover:text-white text-sm transition-colors duration-300">
            O llámanos al 322 811 1111
          </a>

          {/* Stats strip */}
          <div className="flex gap-8 sm:gap-12 mt-12">
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-white/70 text-xs uppercase tracking-wider">Disponible siempre</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">5min</div>
              <div className="text-white/70 text-xs uppercase tracking-wider">Tiempo promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-white/70 text-xs uppercase tracking-wider">Confiable</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
