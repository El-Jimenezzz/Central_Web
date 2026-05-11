import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  const revealRef = useScrollReveal();
  const stats = [
    { number: "15", label: "Años de experiencia" },
    { number: "50+", label: "Conductores certificados" },
    { number: "1000+", label: "Clientes satisfechos" },
    { number: "24/7", label: "Servicio disponible" },
  ];

  return (
    <section id="nosotros" className="section-padding bg-[hsl(var(--surface))]">
      <div ref={revealRef} className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            ¿Quiénes Somos?
          </h2>
          <p className="section-subheading">
            Central de Taxis Girardot es una empresa familiar con más de 15 años de experiencia 
            brindando servicios de transporte confiable y seguro en Girardot y sus alrededores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Nuestra Historia
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Comenzamos como una pequeña central de taxis con el sueño de ofrecer un servicio 
              de transporte que realmente pusiera al cliente en el centro. A lo largo de los años, 
              hemos crecido manteniendo siempre nuestros valores fundamentales: seguridad, 
              puntualidad y trato humano.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Hoy somos reconocidos como una de las centrales de taxi más confiables de Girardot, 
              con una flota moderna y conductores comprometidos con brindar la mejor experiencia 
              de viaje a nuestros pasajeros.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center"
              >
                <div className="text-5xl font-extrabold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Misión */}
          <div className="taxi-card h-full">
            <div className="text-center max-w-4xl mx-auto py-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Nuestra Misión
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Contribuir al desarrollo de la ciudad de las Acacías, ciudad turística por excelencia, mediante la prestación del servicio de taxis, camionetas y Aerovans a todos los habitantes de nuestra ciudad y la región, así como a los turistas que nos visitan y en especial a los capitalinos, quienes cada fin de semana colman nuestras calles y disfrutan los encantos que esta tierra les brinda, ofreciendo confortables vehículos con aire acondicionado y un excelente recurso humano brindando así seguridad y calidad del servicio a nuestros clientes.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="taxi-card h-full">
            <div className="text-center max-w-4xl mx-auto py-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Nuestra Visión
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Somos la Empresa líder en Comunicaciones y Transporte, reconocida por su capacidad innovadora en el ámbito de las Radio Comunicaciones a nivel regional y Nacional, contribuyendo de esta manera al desarrollo de la población Girardoteña, utilizando para ello, tecnología avanzada en Comunicaciones, personal calificado como Radio Operadoras, con excelente hoja de vida, habilidad y compromiso con los usuarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
