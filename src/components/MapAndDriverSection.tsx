import DriverForm from "./DriverForm";
import { MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MapAndDriverSection = () => {
  const revealRef = useScrollReveal();
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section id="trabaja-con-nosotros" className="section-padding bg-[hsl(var(--surface))]">
      <div ref={revealRef} className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-1">Nuestra Ubicación</h3>
                <p className="text-muted-foreground">
                  Carrera 4 N. 10 29 Alto de la Cruz Girardot
                </p>
              </div>
            </div>
            
            <div ref={mapRef} className="bg-muted rounded-2xl border border-border/50 h-96 flex items-center justify-center overflow-hidden">
              {isMapVisible ? (
                <iframe
                  title="Ubicación Central de Taxis Girardot"
                  src="https://www.google.com/maps?q=4.289175,-74.804690&output=embed&z=18"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.75rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mr-2" />
                  Cargando mapa...
                </div>
              )}
            </div>
            
            {/* Servicio Activo 24/7 */}
            <div className="flex flex-col items-center justify-center mt-6">
              <div className="inline-flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-primary">SERVICIO ACTIVO 24/7</span>
              </div>
              <p className="text-secondary-foreground/80 mt-2 text-center">
                Siempre disponibles para llevarte a donde necesites
              </p>
            </div>
          </div>

          {/* Driver Form */}
          <div>
            <DriverForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapAndDriverSection;
