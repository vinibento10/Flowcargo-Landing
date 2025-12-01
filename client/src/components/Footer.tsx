import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#040406] pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <img 
                src="/images/logo-flowcargo-v2.png" 
                alt="FlowCargo Logo" 
                className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(123,97,255,0.3)]"
                onError={(e) => {
                  e.currentTarget.src = "/images/logo-flowcargo.png";
                }}
              />
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              A solução completa para empresas que precisam descomplicar a gestão de transporte, reduzir custos e integrar sua operação logística com eficiência e tecnologia.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/mindlink.lab"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-[#7b61ff] hover:text-white transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:viniciusalves@mindlinklab.com.br"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-muted-foreground hover:bg-[#18d4d4] hover:text-white transition-all duration-300 text-sm"
              >
                <Mail size={18} />
                <span>viniciusalves@mindlinklab.com.br</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Produto</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-muted-foreground hover:text-[#18d4d4] transition-colors">Funcionalidades</a></li>
              <li><a href="#how" className="text-muted-foreground hover:text-[#18d4d4] transition-colors">Como funciona</a></li>
              <li><a href="#numbers" className="text-muted-foreground hover:text-[#18d4d4] transition-colors">Resultados</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-[#18d4d4] transition-colors">Demonstração</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/termos.html" className="text-muted-foreground hover:text-[#18d4d4] transition-colors">Termos de Uso</a></li>
              <li><a href="/privacidade.html" className="text-muted-foreground hover:text-[#18d4d4] transition-colors">Privacidade</a></li>
              <li><a href="/cookies.html" className="text-muted-foreground hover:text-[#18d4d4] transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 FlowCargo — Developed by <a href="https://mindlinklab.com.br" className="text-white hover:underline">Mindlink Lab</a>.
          </div>
          <div className="text-sm text-muted-foreground">
            Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
