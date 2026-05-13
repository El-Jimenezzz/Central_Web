import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Contacto", href: "#contacto" },
    { name: "Nosotros", href: "#nosotros" },
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Brand + Address */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h3 className="text-base font-bold">Central de Taxis Girardot</h3>
            <span className="hidden sm:inline text-white/30">·</span>
            <p className="text-sm text-white/60">Cra 4 N. 10-29, Alto de la Cruz · 24/7</p>
          </div>

          {/* Center: Links */}
          <nav className="flex flex-wrap gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/tarifas"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300"
            >
              Tarifas
            </Link>
          </nav>

          {/* Right: Social + Copyright */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/people/Central-De-Taxis-Girardot/100064193255395/"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Central de Taxis Girardot
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
