import { MessageCircle, Facebook } from "lucide-react";

const WhatsAppFloat = () => {
  const whatsappMessage = encodeURIComponent("Hola, necesito un taxi desde...");

  return (
    <>
      {/* Facebook floating button */}
      <a
        href="https://www.facebook.com/people/Central-De-Taxis-Girardot/100064193255395/"
        className="fixed bottom-24 right-8 z-50 bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-500"
        aria-label="Ir a Facebook"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook className="h-5 w-5" />
      </a>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/573228331111?text=${whatsappMessage}`}
        className="fixed bottom-8 right-8 z-50 bg-green-500/90 backdrop-blur-sm text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-500"
        aria-label="Contactar por WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
};

export default WhatsAppFloat;
