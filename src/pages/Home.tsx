import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { N8nChat } from "@/components/N8nChat";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ArrowRight, CheckCircle2, Clock, MessageSquare, Truck, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { motion } from "framer-motion";
import { MobileCTA } from "@/components/MobileCTA";
import { ROICalculator } from "@/components/ROICalculator";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
    empresa: "" // Added empresa field to state as it might be useful, though not in current form UI shown in snippet but good practice or if we add it back
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^(\+55)?[\s]?(\d{2})[\s]?(\d{4,5})[\s]?(\d{4})$/;
    return re.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    if (!validatePhone(formData.telefone)) {
      toast.error("Por favor, insira um telefone válido com DDD.");
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error("Webhook URL not configured");
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "landing_page_contact_form",
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        setFormData({ nome: "", email: "", telefone: "", mensagem: "", empresa: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente ou contate-nos via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <div className="min-h-screen bg-[#040406] text-foreground overflow-x-hidden font-sans selection:bg-[#7b61ff]/30 selection:text-white">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#7b61ff]/20 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[#18d4d4]/10 rounded-full blur-[120px] -z-10 opacity-30 pointer-events-none" />
          
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#18d4d4] text-sm font-medium mb-6 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18d4d4] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#18d4d4]"></span>
                  </span>
                  Solução para transportadoras e terminais
                </div>
                
                <motion.h1 
                  className="font-space text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Elimine filas, <br />
                  <span className="text-gradient-brand">automatize o pátio</span> e <br />
                  reduza custos logísticos.
                </motion.h1>
                
                <motion.h2 
                  className="text-xl md:text-2xl font-medium text-[#18d4d4] mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Automação Logística Inteligente
                </motion.h2>
                <motion.p 
                  className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  A plataforma completa para gestão de pátio e agendamento de docas. Reduza o tempo de espera em até 40% e integre toda a comunicação com motoristas via WhatsApp automaticamente.
                </motion.p>               
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-brand hover:opacity-90 text-white font-bold h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(123,97,255,0.3)] hover:shadow-[0_0_30px_rgba(123,97,255,0.5)] transition-all duration-300 hover:-translate-y-1"
                    asChild
                  >
                    <a href="#contact">Agendar demonstração grátis</a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 px-8 rounded-xl backdrop-blur-sm transition-all duration-300"
                    asChild
                  >
                    <a href="#how" className="flex items-center gap-2">
                      Ver tour do produto <ArrowRight size={16} />
                    </a>
                  </Button>
                </motion.div>

                <motion.div 
                  className="mt-12 flex items-center gap-6 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#18d4d4]" />
                    <span>Setup rápido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#18d4d4]" />
                    <span>Suporte 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#18d4d4]" />
                    <span>Cancelamento grátis</span>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative perspective-1000"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#0b0b0f]/80 backdrop-blur-xl group transform transition-all duration-700 hover:rotate-y-2 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7b61ff]/20 to-[#18d4d4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                  
                  {/* Neon Glow Borders */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#7b61ff]/50 transition-colors duration-500 z-20 pointer-events-none box-shadow-[0_0_30px_rgba(123,97,255,0.2)]" />
                  
                  <img 
                    src="/images/hero-logistics-futuristic.webp" 
                    alt="FlowCargo Dashboard 3D Mockup" 
                    loading="lazy"
                    width="800"
                    height="600"
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating KPI Card 1 - 3D Effect */}
                  <motion.div 
                    className="absolute top-6 right-6 glass-panel p-4 rounded-xl flex flex-col gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-md transform transition-transform hover:translate-z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Tempo médio</span>
                    <span className="text-2xl font-bold text-white">18 min</span>
                    <span className="text-xs text-[#18d4d4] flex items-center gap-1">
                      <ArrowRight size={10} className="rotate-45" /> -35% vs ontem
                    </span>
                  </motion.div>

                  {/* Floating KPI Card 2 - 3D Effect */}
                  <motion.div 
                    className="absolute bottom-6 left-6 glass-panel p-4 rounded-xl flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-md transform transition-transform hover:translate-z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-[#25D366]/20 animate-pulse">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Notificação enviada</div>
                      <div className="text-xs text-muted-foreground">Motorista João • Placa ABC-1234</div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Enhanced Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#7b61ff] rounded-full blur-[100px] opacity-30 animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#18d4d4] rounded-full blur-[100px] opacity-30 animate-pulse delay-1000" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* NUMBERS SECTION */}
        <section id="numbers" className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Km otimizados", value: "+120k", icon: Truck },
                { label: "Notificações entregues", value: "98%", icon: MessageSquare },
                { label: "Tempo de pátio", value: "-35%", icon: Clock },
                { label: "Terminais ativos", value: "+50", icon: ShieldCheck },
              ].map((stat, i) => (
                <div key={i} className="reveal text-center group p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="mb-4 mx-auto h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-[#7b61ff] group-hover:scale-110 group-hover:bg-[#7b61ff] group-hover:text-white transition-all duration-300">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 relative">
          <div className="container">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-4">
                Tecnologia que <span className="text-gradient-brand">transforma</span> sua operação
              </h2>
              <p className="text-muted-foreground text-lg">
                Uma suíte completa de ferramentas para automatizar processos manuais e dar visibilidade total à sua logística.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="glass-panel rounded-[24px] p-1 overflow-hidden group hover:border-[#7b61ff]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-[#0b0b0f] rounded-[20px] h-full overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] to-transparent z-10" />
                    <ImageWithSkeleton 
                      src="/images/feature-automation.webp" 
                      alt="Agendamento Automatizado" 
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 relative z-20 -mt-12">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mb-6 shadow-lg shadow-[#7b61ff]/20 group-hover:scale-110 transition-transform duration-300">
                      <Clock size={28} />
                    </div>
                    <h3 className="text-[22px] font-bold text-white mb-3 group-hover:text-[#18d4d4] transition-colors">Agendamento Automatizado</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Reduza o tempo de espera e elimine filas com nosso sistema inteligente de slots e janelas de tempo.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                className="glass-panel rounded-[24px] p-1 overflow-hidden group hover:border-[#18d4d4]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(24,212,212,0.15)]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-[#0b0b0f] rounded-[20px] h-full overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] to-transparent z-10" />
                    <ImageWithSkeleton 
                      src="/images/feature-whatsapp-notification.webp" 
                      alt="Notificações WhatsApp" 
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 relative z-20 -mt-12">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mb-6 shadow-lg shadow-[#18d4d4]/20 group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare size={28} />
                    </div>
                    <h3 className="text-[22px] font-bold text-white mb-3 group-hover:text-[#18d4d4] transition-colors">Notificações WhatsApp</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Comunique-se automaticamente com motoristas. Envie documentos, status e previsões de chegada sem intervenção manual.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                className="glass-panel rounded-[24px] p-1 overflow-hidden group hover:border-[#7b61ff]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-[#0b0b0f] rounded-[20px] h-full overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] to-transparent z-10" />
                    <ImageWithSkeleton 
                      src="/images/logistics-terminal-night.webp" 
                      alt="Gestão de Filas" 
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 relative z-20 -mt-12">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mb-6 shadow-lg shadow-[#7b61ff]/20 group-hover:scale-110 transition-transform duration-300">
                      <Truck size={28} />
                    </div>
                    <h3 className="text-[22px] font-bold text-white mb-3 group-hover:text-[#18d4d4] transition-colors">Gestão de Filas</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Controle total do pátio. Saiba exatamente onde cada veículo está e otimize a movimentação interna.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-24 bg-white/[0.02] border-y border-white/5">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-6">
                  Como funciona
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Integração simples, regras inteligentes e comunicação automática. O FlowCargo se adapta ao seu fluxo, não o contrário.
                </p>

                <div className="space-y-8">
                  {[
                    { 
                      step: "01", 
                      title: "Conexão", 
                      desc: "Integre seu ERP, planilhas ou TMS rapidamente através da nossa API ou conectores prontos." 
                    },
                    { 
                      step: "02", 
                      title: "Regras", 
                      desc: "Defina suas prioridades, janelas de agendamento e políticas de acesso ao pátio." 
                    },
                    { 
                      step: "03", 
                      title: "Operação", 
                      desc: "O FlowCargo assume o controle: agenda, notifica e monitora tudo automaticamente." 
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex gap-6 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-bold text-[#18d4d4] group-hover:bg-[#18d4d4] group-hover:text-black transition-colors duration-300">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#18d4d4] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Zap size={120} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-6">Casos de Uso</h3>
                  
                  <ul className="space-y-4">
                    {[
                      "Terminais portuários controlando entrada/saída",
                      "Indústrias com alto volume de recebimento",
                      "Transportadoras reduzindo tempo ocioso",
                      "Operadores logísticos (3PL) integrados",
                      "Centros de distribuição varejistas"
                    ].map((useCase, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <CheckCircle2 size={20} className="text-[#7b61ff]" />
                        {useCase}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0b0b0f] bg-gray-700 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                          </div>
                        ))}
                      </div>
                      <div className="text-sm">
                        <span className="text-white font-bold block">Junte-se a líderes</span>
                        <span className="text-muted-foreground">que modernizaram sua logística</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24">
          <div className="container">
            <motion.h2 
              className="font-space text-3xl md:text-4xl font-bold text-white text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              O que nossos clientes dizem
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  company: "Transportes Alfa",
                  text: "Reduzimos o tempo no pátio em 40%. A integração foi surpreendentemente rápida e o suporte é excelente.",
                  stars: 5
                },
                {
                  company: "Terminal Beta",
                  text: "A gestão de filas ficou previsível. Acabaram as reclamações de motoristas parados na portaria sem informação.",
                  stars: 5
                },
                {
                  company: "Logística Gamma",
                  text: "As notificações automáticas no WhatsApp mudaram tudo. A comunicação flui sem que minha equipe precise ligar.",
                  stars: 5
                }
              ].map((t, i) => (
                <motion.div 
                  key={i} 
                  className="glass-panel p-8 rounded-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="font-bold text-white border-l-4 border-[#7b61ff] pl-3">
                    {t.company}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI CALCULATOR */}
        <ROICalculator />

        {/* CONTACT / CTA */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#7b61ff]/10 pointer-events-none" />
          
          <div className="container relative z-10">
            <motion.div 
              className="glass-panel rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto border-[#7b61ff]/30 shadow-[0_0_50px_rgba(123,97,255,0.1)]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-6">
                    Transforme sua operação logística hoje
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Junte-se a líderes do setor que reduziram custos operacionais em 30% no primeiro mês. Implementação guiada e suporte especialista.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-white">
                      <div className="h-6 w-6 rounded-full bg-[#18d4d4]/20 flex items-center justify-center text-[#18d4d4]">✓</div>
                      Onboarding dedicado
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <div className="h-6 w-6 rounded-full bg-[#18d4d4]/20 flex items-center justify-center text-[#18d4d4]">✓</div>
                      Integração via API
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <div className="h-6 w-6 rounded-full bg-[#18d4d4]/20 flex items-center justify-center text-[#18d4d4]">✓</div>
                      Treinamento para equipe
                    </li>
                  </ul>
                </motion.div>

                <motion.div 
                  className="bg-[#040406] p-8 rounded-2xl border border-white/10 shadow-xl"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">Nome completo</label>
                      <input 
                        type="text" 
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7b61ff] focus:ring-1 focus:ring-[#7b61ff] transition-all"
                        placeholder="Seu nome"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">Empresa</label>
                      <input 
                        type="text" 
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7b61ff] focus:ring-1 focus:ring-[#7b61ff] transition-all"
                        placeholder="Nome da empresa"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">E-mail profissional</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7b61ff] focus:ring-1 focus:ring-[#7b61ff] transition-all"
                        placeholder="seu@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">Telefone / WhatsApp</label>
                      <input 
                        type="tel" 
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7b61ff] focus:ring-1 focus:ring-[#7b61ff] transition-all"
                        placeholder="(00) 00000-0000"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1 block">Mensagem (opcional)</label>
                      <textarea 
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7b61ff] focus:ring-1 focus:ring-[#7b61ff] transition-all resize-none"
                        placeholder="Conte um pouco sobre sua operação..."
                        disabled={isSubmitting}
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-brand hover:opacity-90 text-white font-bold h-12 rounded-lg shadow-lg mt-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar demonstração"}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <MobileCTA />
      <N8nChat />
    </div>
  );
}
