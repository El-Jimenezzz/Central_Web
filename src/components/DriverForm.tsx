import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Phone, User } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { isValidPhone } from "@/lib/validation";

const DriverForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const phone = formData.get('telefono') as string;
    if (!isValidPhone(phone)) {
      setPhoneError("Ingresa un número de teléfono válido (mínimo 7 dígitos).");
      return;
    }

    setIsLoading(true);
    const data = {
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      telefono: phone,
      tipo: 'conductor_interesado'
    };
    try {
      const params = new URLSearchParams({
        nombre: String(data.nombre ?? ''),
        apellido: String(data.apellido ?? ''),
        telefono: String(data.telefono ?? ''),
        tipo: 'conductor_interesado',
      });
      await fetch(`${import.meta.env.VITE_WEBHOOK_CONDUCTOR}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      });
      toast.success("¡Solicitud enviada! Te contactaremos pronto para más información.");
      if (formRef.current) formRef.current.reset();
      setPhoneError("");
    } catch (error) {
      toast.error("No se pudo enviar la solicitud. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="bg-primary/10 p-4 rounded-lg inline-flex mx-auto mb-4">
          <Car className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">¿Quieres trabajar con nosotros?</CardTitle>
        <CardDescription>
          Si tienes experiencia como conductor y buscas una oportunidad de trabajo estable, 
          déjanos tus datos y te contactaremos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Nombre
              </label>
              <Input 
                id="nombre" 
                name="nombre"
                placeholder="Tu nombre" 
                required
                className="border-0 bg-[hsl(var(--surface))] rounded-xl"
              />
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-foreground mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Apellido
              </label>
              <Input 
                id="apellido" 
                name="apellido"
                placeholder="Tu apellido" 
                required
                className="border-0 bg-[hsl(var(--surface))] rounded-xl"
              />
            </div>
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-2">
              <Phone className="h-4 w-4 inline mr-2" />
              Número de Teléfono
            </label>
            <Input 
              id="telefono" 
              name="telefono"
              type="tel" 
              placeholder="Tu número de teléfono" 
              required
              onChange={() => setPhoneError("")}
              className="border-0 bg-[hsl(var(--surface))] rounded-xl"
            />
            {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Solicitud"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Nos pondremos en contacto contigo en las próximas 24 horas
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverForm;
