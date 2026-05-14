import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Si estamos en home, usamos anclas directas; si no, prefijamos con /
  const href = (anchor: string) => (isHome ? anchor : `/${anchor}`);

  const navItems = [
    { name: "Inicio", anchor: "#inicio" },
    { name: "Servicios", anchor: "#servicios" },
    { name: "Contacto", anchor: "#contacto" },
    { name: "Nosotros", anchor: "#nosotros" },
  ];

  const allNavItems = [
    ...navItems,
    { name: "Beneficios", anchor: "#beneficios" },
    { name: "Testimonios", anchor: "#testimonios" },
    { name: "Trabaja con nosotros", anchor: "#trabaja-con-nosotros" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Navigation */}
          <div className="flex items-center gap-4">
            <img src="/logo_taxis_transparente.png" alt="Empresa de Transporte Central de Taxis Girardot" className="h-16 w-auto" />
            <nav className="hidden lg:flex items-center space-x-6 ml-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={href(item.anchor)}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
              <Link
                to="/tarifas"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                Tarifas
              </Link>
            </nav>
          </div>

          {/* CTA Button — single CTA on desktop */}
          <div className="hidden lg:flex items-center">
            <Button variant="hero" size="sm" asChild>
              <a href="https://wa.me/573228331111?text=Hola%2C%20necesito%20un%20taxi%20desde...">
                Pide tu Taxi
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {allNavItems.map((item) => (
                <a
                  key={item.name}
                  href={href(item.anchor)}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link
                to="/tarifas"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifas
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="call" size="sm" asChild>
                  <a href="tel:+573228111111">
                    <Phone className="h-4 w-4" />
                    Llama Ahora
                  </a>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <a href="https://wa.me/573228331111?text=Hola%2C%20necesito%20un%20taxi%20desde...">
                    Pide tu Taxi
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
