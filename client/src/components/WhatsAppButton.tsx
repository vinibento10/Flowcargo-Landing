import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5519982026914"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl animate-in fade-in zoom-in duration-300"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-black/80 px-3 py-1 text-sm text-white backdrop-blur-sm md:group-hover:block">
        Fale conosco
      </span>
    </a>
  );
}
