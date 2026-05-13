import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/ScrollToTop";
import { Search, Moon, Snowflake, MapPin, Info, ArrowLeft } from "lucide-react";

// Scroll al top al montar la página
const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
};

// ─── Datos de tarifas ────────────────────────────────────────────────────────

const tarifaZonas = [
  {
    precio: 8000,
    destinos: [
      "Acacias", "Alamedas", "Alicante", "Almendros", "Alto de la Cruz",
      "Alto del Rosario", "Barrio Blanco", "Brisas Bogotá", "Cámbulos",
      "Centenario", "Clínica Colsubsidio", "Clínica Especialistas",
      "Clínica Junical", "Coliseo Ferias", "Coliseo Martha Catalina",
      "Conj. Barlovento", "Conj. Colina Campestre", "Conj. Colinas del Viento",
      "Conj. La Maravilla", "Conj. Las Mercedes", "Conj. Nogal",
      "Cementerio Católico", "Conj. Reservas Nogal", "Estación",
      "Estadio Luis A. Duque Peña", "Gaitán", "Golgota", "Granada",
      "Hospital Dumian", "IPS Las Américas", "La Colina", "La Magdalena",
      "Miraflores", "Murillo Toro", "Obrero", "Meneses", "Porvenir",
      "Puerto Montero", "Las Quintas", "Salsipuedes", "San Antonio",
      "San Jorge", "San Miguel", "Santa Helena", "Santafé", "Santander",
      "Santa Isabel", "Sucre", "Conj. Toledo", "U. Cundinamarca",
      "U. Piloto", "Uniminuto",
      "10 de Mayo", "20 de Julio", "Bocas del Bogotá", "Arrayanes",
      "Diamante", "Buenos Aires", "Conj. Bali", "Conj. Los Mangos",
      "Conj. Madeira", "Conj. Aguablanca", "Conj. Balcones Casaloma",
      "Conj. Brisas Guadalquivir", "Conj. Colina de Casas",
      "Conj. Condado San Luis", "Conj. Los Ángeles", "Conj. Montecarlo",
      "Conj. Vento", "Conj. Portal Casaloma", "Esmeralda I, II, III, IV",
      "Juan Pablo II", "Cond. La Fontana", "Magdalena III", "Rosa Blanca",
      "Conj. Parques Andalucía", "Conj. Portal Mirador",
      "Conj. Portal San Pablo", "Puerto Mongui",
      "Conj. Senderos Guayacán", "Conj. Terrazas Guadalquivir",
      "Conj. Villa Tatiana", "Conj. Villas Guadalquivir", "Divino Niño",
      "La Esperanza", "Alto de las Rosas", "Santa Rita", "Seminario",
      "Santa Mónica", "Villa del Río", "Villampis", "Vivisol",
      "Brisas Agua Blanca", "Urb. Hacienda Girardot",
    ],
  },
  {
    precio: 8500,
    destinos: [
      "Conj. Alcatraz", "Conj. Algarrobos", "Altos del Peñón",
      "Cafam del Sol", "Ciudad Montes", "Conj. Bello Horizonte",
      "Conj. El Molino", "Corazón de Cundinamarca", "El Triunfo",
      "Esperanza Norte", "Jardines del Señor", "Kennedy",
      "Conj. La Campiña", "La Victoria", "Conj. Montana",
      "Conj. Parque Central", "Ramón Bueno", "Solaris",
      "Valle del Sol", "Conj. Volver a Vivir", "Conj. Bosques del Norte",
      "Bosques Vizcaya", "Conj. Aqua", "Conj. La Arboleda",
      "Conj. Mi Futuro I, II y III", "Conj. Refugio",
      "San Fernando", "Villas del Sol",
    ],
  },
  {
    precio: 9000,
    destinos: [
      "Primero de Enero", "Cedro", "Conj. Altavista", "Conj. Aqualinas",
      "Conj. Park", "Conj. Atlantis", "Conj. Brisas Girardot I y II",
      "Conj. Celeste", "Conj. Girasoles", "Conj. Horizontes",
      "Conj. Turquesa", "La Milagrosa", "Nuestra Señora Carmen",
      "Patinodromo", "Portachuelo", "Senderos Acacias", "Capri",
      "Villa Alexander", "Villa Cecilia", "Villa Keneddy", "Villa Olarte",
      "Conj. Villa Magdalena", "Conj. Res Altavista",
    ],
  },
];

const tarifasEspeciales = [
  {
    precio: 16000,
    label: "Zona Lejana",
    destinos: [
      "Conj. Tulipán", "Conj. Talisman", "Conj. Tierra Linda",
      "Conj. Guabinal Plano", "V. Barzaloza-Cementerio",
      "Conj. Tamarindos", "Conj. Villa María Vía", "Urb. Prado I y II",
    ],
  },
  {
    precio: 21000,
    label: "Zona Muy Lejana",
    destinos: [
      "V. Piamonte", "V. Berlín", "V. San Lorenzo",
      "Cond. El Paso", "Conj. Senderos del Sol",
    ],
  },
  {
    precio: 20000,
    label: "Zona Especial",
    destinos: ["B. Luis Carlos Galán Barzaloza Centro"],
  },
  {
    precio: 30000,
    label: "Zona Remota",
    destinos: ["V. Acapulco (Zumbanmicos)", "El Buche"],
  },
];

const sitiosTuristicos = [
  { precio: 8000, nombre: "Unicentro" },
  { precio: 8000, nombre: "Parque de las Olas" },
  { precio: 8000, nombre: "Embarcadero Prt Los Guamos" },
  { precio: 8000, nombre: "Mirador del Alto" },
  { precio: 8000, nombre: "Parque Locomotora" },
  { precio: 8000, nombre: "Plaza de Mercado" },
  { precio: 16000, nombre: "Cond. El Peñón" },
  { precio: 16000, nombre: "Lagomar El Peñón" },
  { precio: 21000, nombre: "El Arbolito" },
  { precio: 21000, nombre: "Mirador - Keops" },
  { precio: 25000, nombre: "Mirador Aquí Toy" },
  { precio: 25000, nombre: "V. Guabinal Cerro" },
];

// ─── Componente principal ────────────────────────────────────────────────────

const Tarifas = () => {
  useScrollToTop();
  const [busqueda, setBusqueda] = useState("");

  const normalizar = (texto: string) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const terminoBusqueda = normalizar(busqueda);

  const filtrarDestinos = (destinos: string[]) =>
    terminoBusqueda
      ? destinos.filter((d) => normalizar(d).includes(terminoBusqueda))
      : destinos;

  const hayResultados =
    terminoBusqueda === "" ||
    tarifaZonas.some((z) => filtrarDestinos(z.destinos).length > 0) ||
    tarifasEspeciales.some((z) => filtrarDestinos(z.destinos).length > 0) ||
    sitiosTuristicos.some((s) => normalizar(s.nombre).includes(terminoBusqueda));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="bg-foreground text-white py-14 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            <div className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              Decreto No. 0030 · Enero 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tarifas Oficiales
            </h1>
            <p className="text-white/60 text-lg">
              Fijadas por la Alcaldía de Girardot — Secretaría de Tránsito y Transporte Municipal.
              Vigentes desde el centro de la ciudad hacia y viceversa.
            </p>
          </div>
        </section>

        {/* ── Recargos ── */}
        <section className="bg-primary py-8 px-4">
          <div className="container mx-auto">
            <p className="text-center text-primary-foreground/70 text-xs font-semibold uppercase tracking-widest mb-5">
              Recargos adicionales sobre la tarifa base
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl p-4">
                <Moon className="h-7 w-7 text-primary-foreground shrink-0" />
                <div>
                  <p className="font-bold text-primary-foreground text-lg leading-none">+ $1.500</p>
                  <p className="text-primary-foreground/70 text-sm mt-0.5">Recargo nocturno</p>
                  <p className="text-primary-foreground/50 text-xs">7:00 PM – 6:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl p-4">
                <Snowflake className="h-7 w-7 text-primary-foreground shrink-0" />
                <div>
                  <p className="font-bold text-primary-foreground text-lg leading-none">+ $1.000</p>
                  <p className="text-primary-foreground/70 text-sm mt-0.5">Recarga navideña</p>
                  <p className="text-primary-foreground/50 text-xs">Temporada diciembre</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl p-4">
                <MapPin className="h-7 w-7 text-primary-foreground shrink-0" />
                <div>
                  <p className="font-bold text-primary-foreground text-lg leading-none">+ $2.000</p>
                  <p className="text-primary-foreground/70 text-sm mt-0.5">Tarifa entre zonas</p>
                  <p className="text-primary-foreground/50 text-xs">Viajes entre sectores</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Buscador ── */}
        <section className="py-10 px-4 bg-[hsl(var(--surface))]">
          <div className="container mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Busca tu barrio o sector..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 text-base shadow-sm"
              />
            </div>
            {!hayResultados && (
              <p className="text-center text-muted-foreground mt-4 text-sm">
                No encontramos ese sector. Contáctanos al{" "}
                <a href="tel:6018889828" className="text-primary font-semibold">
                  601 888 9828
                </a>{" "}
                para más información.
              </p>
            )}
          </div>
        </section>

        {/* ── Tarifas por zona ── */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <span className="overline">Zonas principales</span>
              <h2 className="section-heading mt-2">
                Tarifas por <span className="text-primary">Zona</span>
              </h2>
              <p className="section-subheading">
                Tarifa mínima: <strong>$8.000</strong>
              </p>
            </div>

            <div className="space-y-6">
              {tarifaZonas.map((zona) => {
                const destinosFiltrados = filtrarDestinos(zona.destinos);
                if (terminoBusqueda && destinosFiltrados.length === 0) return null;

                return (
                  <div key={zona.precio} className="taxi-card p-0 overflow-hidden">
                    {/* Cabecera */}
                    <div className="flex items-center gap-4 bg-foreground px-6 py-4">
                      <span className="text-primary text-3xl font-extrabold">
                        ${zona.precio.toLocaleString("es-CO")}
                      </span>
                      <div className="h-6 w-px bg-white/20" />
                      <span className="text-white/50 text-sm">
                        {zona.destinos.length} sectores
                      </span>
                    </div>
                    {/* Chips */}
                    <div className="p-5 flex flex-wrap gap-2">
                      {destinosFiltrados.map((destino) => (
                        <span
                          key={destino}
                          className="text-sm px-3 py-1 rounded-full bg-[hsl(var(--primary-soft))] text-[hsl(var(--primary-text))] font-medium border border-primary/20"
                        >
                          {destino}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Zonas especiales ── */}
        <section className="section-padding bg-[hsl(var(--surface))]">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <span className="overline">Sectores alejados</span>
              <h2 className="section-heading mt-2">
                Zonas <span className="text-primary">Especiales</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tarifasEspeciales.map((zona) => {
                const destinosFiltrados = filtrarDestinos(zona.destinos);
                if (terminoBusqueda && destinosFiltrados.length === 0) return null;

                return (
                  <div key={zona.precio + zona.label} className="taxi-card p-0 overflow-hidden">
                    <div className="bg-foreground px-5 py-4">
                      <p className="text-primary text-2xl font-extrabold">
                        ${zona.precio.toLocaleString("es-CO")}
                      </p>
                      <p className="text-white/50 text-xs font-medium mt-0.5">
                        {zona.label}
                      </p>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {destinosFiltrados.map((d) => (
                          <li key={d} className="text-sm text-foreground/80 flex items-start gap-2">
                            <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Sitios turísticos ── */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <span className="overline">Turismo</span>
              <h2 className="section-heading mt-2">
                Sitios <span className="text-primary">Turísticos</span>
              </h2>
              <p className="section-subheading">
                Tarifas especiales hacia los principales atractivos de Girardot
              </p>
            </div>

            {(() => {
              const filtrados = sitiosTuristicos.filter((s) =>
                terminoBusqueda ? normalizar(s.nombre).includes(terminoBusqueda) : true
              );
              if (terminoBusqueda && filtrados.length === 0) return null;

              const grupos: Record<number, string[]> = {};
              filtrados.forEach(({ precio, nombre }) => {
                if (!grupos[precio]) grupos[precio] = [];
                grupos[precio].push(nombre);
              });

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {Object.entries(grupos).map(([precio, nombres]) => (
                    <div key={precio} className="taxi-card p-0 overflow-hidden">
                      <div className="bg-foreground px-5 py-4">
                        <p className="text-primary text-2xl font-extrabold">
                          ${Number(precio).toLocaleString("es-CO")}
                        </p>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {nombres.map((n) => (
                            <li key={n} className="text-sm text-foreground/80 flex items-start gap-2">
                              <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                              {n}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── Nota legal ── */}
        <section className="px-4 pb-10">
          <div className="container mx-auto max-w-2xl">
            <div className="flex gap-3 bg-[hsl(var(--primary-soft))] border border-primary/20 rounded-xl p-4">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-[hsl(var(--primary-text))]">
                Tarifas establecidas mediante{" "}
                <strong>Decreto No. 0030 del 28 de enero de 2026</strong>, expedido por la
                Alcaldía Especial de Girardot — Secretaría de Tránsito y Transporte Municipal.
                Aplica exclusivamente para vehículos afiliados a Central de Taxis S.A.S.
                (Cra 4 N° 10-29, Alto de la Cruz).
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding bg-[hsl(var(--surface))] text-center">
          <div className="container mx-auto max-w-xl">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              ¿Listo para viajar?
            </h3>
            <p className="text-muted-foreground mb-8">
              Pide tu taxi ahora por WhatsApp o llámanos directamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/573228331111?text=Hola%2C%20necesito%20un%20taxi%20desde..."
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Pedir por WhatsApp
              </a>
              <a
                href="tel:6018889828"
                className="taxi-button inline-flex items-center justify-center"
              >
                Llamar: 601 888 9828
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </div>
  );
};

export default Tarifas;
