import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-24 right-6 z-[49] animate-in fade-in slide-in-from-bottom-10 duration-700 delay-1000">
      <a
        href="https://wa.me/5519982026914"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-[55px] h-[55px] md:w-[65px] md:h-[65px] bg-[#25D366] rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all duration-300 group animate-pulse-slow"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="text-white w-7 h-7 md:w-9 md:h-9" />
        <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
          Fale conosco
        </span>
      </a>
    </div>
  );
}
