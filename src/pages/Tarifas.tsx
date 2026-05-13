import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/ScrollToTop";
import { Search, Moon, Snowflake, MapPin, Info } from "lucide-react";

// ─── Datos de tarifas ────────────────────────────────────────────────────────

const tarifaZonas = [
  {
    precio: 8000,
    color: "from-yellow-400 to-yellow-500",
    textColor: "text-yellow-600",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-300",
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
      // Segunda franja $8.000
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
    color: "from-orange-400 to-orange-500",
    textColor: "text-orange-600",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-300",
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
    color: "from-red-400 to-red-500",
    textColor: "text-red-600",
    bgLight: "bg-red-50",
    borderColor: "border-red-300",
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
    color: "from-purple-500 to-purple-600",
    destinos: [
      "Conj. Tulipán", "Conj. Talisman", "Conj. Tierra Linda",
      "Conj. Guabinal Plano", "V. Barzaloza-Cementerio",
      "Conj. Tamarindos", "Conj. Villa María Vía", "Urb. Prado I y II",
    ],
  },
  {
    precio: 21000,
    label: "Zona Muy Lejana",
    color: "from-pink-500 to-pink-600",
    destinos: [
      "V. Piamonte", "V. Berlín", "V. San Lorenzo",
      "Cond. El Paso", "Conj. Senderos del Sol",
    ],
  },
  {
    precio: 20000,
    label: "Zona Especial",
    color: "from-indigo-500 to-indigo-600",
    destinos: ["B. Luis Carlos Galán Barzaloza Centro"],
  },
  {
    precio: 30000,
    label: "Zona Remota",
    color: "from-gray-600 to-gray-700",
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
    filtrarDestinos(sitiosTuristicos.map((s) => s.nombre)).length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Decreto No. 0030 · Enero 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tarifas Oficiales de Girardot
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              Tarifas fijadas por la Alcaldía Especial de Girardot — Secretaría de Tránsito y Transporte Municipal.
              Vigentes desde el centro de la ciudad hacia y viceversa.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Exclusivas para vehículos afiliados a Central de Taxis S.A.S.
            </p>
          </div>
        </section>

        {/* ── Recargos ── */}
        <section className="bg-foreground text-white py-8 px-4">
          <div className="container mx-auto">
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-white/50 mb-6">
              Recargos adicionales sobre la tarifa base
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                <Moon className="h-8 w-8 text-blue-300 shrink-0" />
                <div>
                  <p className="font-bold text-lg">+ $1.500</p>
                  <p className="text-sm text-white/70">Recargo nocturno</p>
                  <p className="text-xs text-white/50">7:00 PM – 6:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                <Snowflake className="h-8 w-8 text-cyan-300 shrink-0" />
                <div>
                  <p className="font-bold text-lg">+ $1.000</p>
                  <p className="text-sm text-white/70">Recarga navideña</p>
                  <p className="text-xs text-white/50">Temporada diciembre</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                <MapPin className="h-8 w-8 text-yellow-300 shrink-0" />
                <div>
                  <p className="font-bold text-lg">+ $2.000</p>
                  <p className="text-sm text-white/70">Tarifa entre zonas</p>
                  <p className="text-xs text-white/50">Viajes entre sectores</p>
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
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-base shadow-sm"
              />
            </div>
            {!hayResultados && (
              <p className="text-center text-muted-foreground mt-4 text-sm">
                No encontramos ese sector. Contáctanos al{" "}
                <a href="tel:6018889828" className="text-primary font-medium">
                  601 888 9828
                </a>{" "}
                para más información.
              </p>
            )}
          </div>
        </section>

        {/* ── Tarifas por zona ── */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">
              Tarifas por Zona
            </h2>
            <p className="text-muted-foreground text-center mb-10 text-sm">
              Tarifa mínima: <span className="font-semibold text-foreground">$8.000</span>
            </p>

            <div className="space-y-8">
              {tarifaZonas.map((zona) => {
                const destinosFiltrados = filtrarDestinos(zona.destinos);
                if (terminoBusqueda && destinosFiltrados.length === 0) return null;

                return (
                  <div
                    key={zona.precio}
                    className={`rounded-2xl border ${zona.borderColor} ${zona.bgLight} overflow-hidden`}
                  >
                    {/* Cabecera de zona */}
                    <div className={`bg-gradient-to-r ${zona.color} px-6 py-4 flex items-center gap-3`}>
                      <span className="text-white text-2xl font-extrabold">
                        ${zona.precio.toLocaleString("es-CO")}
                      </span>
                      <span className="text-white/80 text-sm font-medium">
                        · {zona.destinos.length} sectores
                      </span>
                    </div>

                    {/* Lista de destinos */}
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {destinosFiltrados.map((destino) => (
                          <span
                            key={destino}
                            className={`text-sm px-3 py-1 rounded-full border ${zona.borderColor} ${zona.textColor} bg-white font-medium`}
                          >
                            {destino}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Tarifas especiales ── */}
        <section className="py-12 px-4 bg-[hsl(var(--surface))]">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">
              Zonas Especiales
            </h2>
            <p className="text-muted-foreground text-center mb-10 text-sm">
              Sectores alejados del centro con tarifa diferenciada
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tarifasEspeciales.map((zona) => {
                const destinosFiltrados = filtrarDestinos(zona.destinos);
                if (terminoBusqueda && destinosFiltrados.length === 0) return null;

                return (
                  <div
                    key={zona.precio + zona.label}
                    className="rounded-2xl overflow-hidden shadow-sm border border-border"
                  >
                    <div className={`bg-gradient-to-br ${zona.color} px-5 py-4`}>
                      <p className="text-white text-2xl font-extrabold">
                        ${zona.precio.toLocaleString("es-CO")}
                      </p>
                      <p className="text-white/80 text-xs font-medium mt-0.5">
                        {zona.label}
                      </p>
                    </div>
                    <div className="bg-white p-4">
                      <ul className="space-y-1.5">
                        {destinosFiltrados.map((d) => (
                          <li key={d} className="text-sm text-foreground/80 flex items-start gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
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
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">
              Sitios Turísticos
            </h2>
            <p className="text-muted-foreground text-center mb-10 text-sm">
              Tarifas especiales hacia los principales atractivos de Girardot
            </p>

            {(() => {
              const filtrados = sitiosTuristicos.filter((s) =>
                terminoBusqueda ? normalizar(s.nombre).includes(terminoBusqueda) : true
              );
              if (terminoBusqueda && filtrados.length === 0) return null;

              // Agrupar por precio
              const grupos: Record<number, string[]> = {};
              filtrados.forEach(({ precio, nombre }) => {
                if (!grupos[precio]) grupos[precio] = [];
                grupos[precio].push(nombre);
              });

              const colores: Record<number, string> = {
                8000: "from-emerald-400 to-emerald-500",
                16000: "from-teal-500 to-teal-600",
                21000: "from-cyan-500 to-cyan-600",
                25000: "from-sky-500 to-sky-600",
              };

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {Object.entries(grupos).map(([precio, nombres]) => (
                    <div
                      key={precio}
                      className="rounded-2xl overflow-hidden shadow-sm border border-border"
                    >
                      <div className={`bg-gradient-to-br ${colores[Number(precio)] ?? "from-gray-400 to-gray-500"} px-5 py-4`}>
                        <p className="text-white text-2xl font-extrabold">
                          ${Number(precio).toLocaleString("es-CO")}
                        </p>
                      </div>
                      <div className="bg-white p-4">
                        <ul className="space-y-1.5">
                          {nombres.map((n) => (
                            <li key={n} className="text-sm text-foreground/80 flex items-start gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
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
        <section className="py-8 px-4 bg-[hsl(var(--surface))]">
          <div className="container mx-auto max-w-2xl">
            <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
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
        <section className="py-12 px-4 text-center">
          <div className="container mx-auto max-w-xl">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ¿Listo para viajar?
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Pide tu taxi ahora por WhatsApp o llámanos directamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/573228331111?text=Hola%2C%20necesito%20un%20taxi%20desde..."
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Pedir por WhatsApp
              </a>
              <a
                href="tel:6018889828"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Llamar: 601 888 9828
              </a>
            </div>
            <div className="mt-6">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                ← Volver al inicio
              </Link>
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
