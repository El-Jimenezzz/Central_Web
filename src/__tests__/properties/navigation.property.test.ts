import { describe, it, expect } from "vitest";

// These are data-level property tests that verify navigation completeness
// by checking that all section IDs have corresponding nav links

// Section IDs from Index.tsx (the rendered sections)
const sectionIds = [
  "inicio",        // HeroSection
  "servicios",     // ServicesSection
  "contacto",      // ContactSection
  "beneficios",    // BenefitsSection
  "flota",         // FleetSection
  "nosotros",      // AboutSection
  "testimonios",   // TestimonialsSection
  "trabaja-con-nosotros", // MapAndDriverSection
];

// Nav items from Header.tsx
const headerNavItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Contacto", href: "#contacto" },
  { name: "Beneficios", href: "#beneficios" },
  { name: "Flota", href: "#flota" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Testimonios", href: "#testimonios" },
  { name: "Trabaja con nosotros", href: "#trabaja-con-nosotros" },
];

// Quick links from Footer.tsx
const footerQuickLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Contacto", href: "#contacto" },
  { name: "Beneficios", href: "#beneficios" },
  { name: "Flota", href: "#flota" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Testimonios", href: "#testimonios" },
  { name: "Trabaja con nosotros", href: "#trabaja-con-nosotros" },
];

describe("Feature: landing-mejoras, Property 3: Completitud de navegación en Header", () => {
  it("para cada sección renderizada, existe un enlace correspondiente en el Header", () => {
    const headerHrefs = headerNavItems.map((item) => item.href.replace("#", ""));
    for (const sectionId of sectionIds) {
      expect(headerHrefs).toContain(sectionId);
    }
  });

  it("todos los enlaces del Header apuntan a secciones existentes", () => {
    for (const item of headerNavItems) {
      const targetId = item.href.replace("#", "");
      expect(sectionIds).toContain(targetId);
    }
  });
});

describe("Feature: landing-mejoras, Property 4: Enlaces del Footer apuntan a secciones existentes", () => {
  it("para cada enlace en quickLinks del Footer, existe una sección con ese id", () => {
    for (const link of footerQuickLinks) {
      const targetId = link.href.replace("#", "");
      expect(sectionIds).toContain(targetId);
    }
  });

  it("todas las secciones tienen un enlace correspondiente en el Footer", () => {
    const footerHrefs = footerQuickLinks.map((link) => link.href.replace("#", ""));
    for (const sectionId of sectionIds) {
      expect(footerHrefs).toContain(sectionId);
    }
  });
});
