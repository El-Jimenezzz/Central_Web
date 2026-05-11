import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { isValidPhone, isAtLeast12HoursAhead } from "@/lib/validation";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const revealRef = useScrollReveal();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [dateTimeError, setDateTimeError] = useState("");
  const reservaFormRef = useRef<HTMLFormElement>(null);
  
  // Calculate minimum date/time for browser-level date picker constraints
  const now = new Date();
  const minDateTime = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  const minDate = minDateTime.toISOString().split('T')[0];
  const minTime = minDateTime.toTimeString().slice(0, 5);
  const isToday = minDateTime.toDateString() === now.toDateString();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const phone = formData.get('phone') as string;
    if (!isValidPhone(phone)) {
      setPhoneError("Ingresa un número de teléfono válido (mínimo 7 dígitos).");
      return;
    }

    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    if (!isAtLeast12HoursAhead(date, time)) {
      setDateTimeError("La fecha y hora deben ser al menos 12 horas en el futuro.");
      return;
    }

    const data = {
      nombre: formData.get('name'),
      telefono: phone,
      recogida: formData.get('pickup'),
      destino: formData.get('destination'),
      fecha: date,
      hora: time,
      notas: formData.get('message'),
      tipo: 'reserva'
    };
    setIsLoading(true);
    try {
      await fetch(import.meta.env.VITE_WEBHOOK_RESERVA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      toast.success('¡Reserva enviada! Te contactaremos pronto para confirmar.');
      if (reservaFormRef.current) reservaFormRef.current.reset();
      setPhoneError("");
      setDateTimeError("");
    } catch (error) {
      toast.error('Error al enviar la reserva. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacto" className="section-padding bg-background">
      <div ref={revealRef} className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Información de Contacto
            </h3>

            <div className="space-y-6">
              {/* Teléfonos */}
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Teléfonos</h4>
                  <p className="text-muted-foreground mb-2">Llama directamente para servicio inmediato</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="call" size="sm" asChild>
                      <a href="tel:6018889828">601 888 9828 (Llama ahora)</a>
                    </Button>
                    <Button variant="call" size="sm" asChild>
                      <a href="tel:3228111111">322 811 1111</a>
                    </Button>
                    <Button variant="call" size="sm" asChild>
                      <a href="tel:3228331111">322 833 1111</a>
                    </Button>
                    <Button variant="call" size="sm" asChild>
                      <a href="tel:3228311111">322 831 1111</a>
                    </Button>
                    <Button variant="call" size="sm" asChild>
                      <a href="tel:3222122222">322 212 2222</a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">WhatsApp</h4>
                  <p className="text-muted-foreground mb-2">Reserva rápida por mensaje</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="whatsapp" size="sm" asChild>
                      <a href="https://wa.me/573228111111?text=Hola%2C%20necesito%20un%20taxi">322 811 1111</a>
                    </Button>
                    <Button variant="whatsapp" size="sm" asChild>
                      <a href="https://wa.me/573228331111?text=Hola%2C%20necesito%20un%20taxi">322 833 1111</a>
                    </Button>
                    <Button variant="whatsapp" size="sm" asChild>
                      <a href="https://wa.me/573228311111?text=Hola%2C%20necesito%20un%20taxi">322 831 1111</a>
                    </Button>
                    <Button variant="whatsapp" size="sm" asChild>
                      <a href="https://wa.me/573222122222?text=Hola%2C%20necesito%20un%20taxi">322 212 2222</a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Dirección</h4>
                  <p className="text-muted-foreground">
                    Carrera 4 N. 10 29 Alto de la Cruz Girardot
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Horarios</h4>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-primary">24 horas, 7 días a la semana</span><br />
                    Siempre disponibles para ti
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="taxi-card p-10 lg:p-12">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Solicitud de Reserva
              </h3>
              <form ref={reservaFormRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre
                    </label>
                    <Input id="name" name="name" placeholder="Tu nombre completo" required className="border-0 bg-[hsl(var(--surface))] rounded-xl" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <Input id="phone" name="phone" type="tel" placeholder="Tu número de teléfono" required onChange={() => setPhoneError("")} className="border-0 bg-[hsl(var(--surface))] rounded-xl" />
                    {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pickup" className="block text-sm font-medium text-foreground mb-2">
                      Punto de Recogida
                    </label>
                    <Input id="pickup" name="pickup" placeholder="Dirección de origen" required className="border-0 bg-[hsl(var(--surface))] rounded-xl" />
                  </div>
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-foreground mb-2">
                      Destino
                    </label>
                    <Input id="destination" name="destination" placeholder="Dirección de destino" required className="border-0 bg-[hsl(var(--surface))] rounded-xl" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
                      Fecha
                    </label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      min={minDate}
                      required
                      onChange={() => setDateTimeError("")}
                      className="border-0 bg-[hsl(var(--surface))] rounded-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-foreground mb-2">
                      Hora
                    </label>
                    <Input 
                      id="time" 
                      name="time" 
                      type="time" 
                      min={isToday ? minTime : undefined}
                      required
                      onChange={() => setDateTimeError("")}
                      className="border-0 bg-[hsl(var(--surface))] rounded-xl"
                    />
                  </div>
                </div>
                {dateTimeError && <p className="text-sm text-destructive mt-1">{dateTimeError}</p>}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Notas adicionales
                  </label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Información adicional sobre tu viaje..." 
                    rows={3}
                    className="border-0 bg-[hsl(var(--surface))] rounded-xl"
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Solicitar Reserva"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Te contactaremos en los próximos minutos para confirmar tu reserva
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
