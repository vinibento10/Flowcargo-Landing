import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, DollarSign, TrendingDown, Clock, Truck, Download, X, CheckCircle2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ROICalculator() {
  const [trucksPerDay, setTrucksPerDay] = useState([50]);
  const [waitTime, setWaitTime] = useState([60]); // minutes
  const [hourlyCost, setHourlyCost] = useState([150]); // R$ per hour (demurrage + driver + opportunity)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [savings, setSavings] = useState({
    monthly: 0,
    yearly: 0,
    time: 0
  });

  useEffect(() => {
    // Calculation logic:
    // FlowCargo promises ~40% reduction in wait time
    const reductionFactor = 0.40;
    const currentMonthlyCost = trucksPerDay[0] * (waitTime[0] / 60) * hourlyCost[0] * 22; // 22 working days
    const savedMonthly = currentMonthlyCost * reductionFactor;
    
    // Time saved in hours per month
    const timeSavedMonthly = trucksPerDay[0] * (waitTime[0] / 60) * reductionFactor * 22;

    setSavings({
      monthly: Math.round(savedMonthly),
      yearly: Math.round(savedMonthly * 12),
      time: Math.round(timeSavedMonthly)
    });
  }, [trucksPerDay, waitTime, hourlyCost]);

  const handleDownloadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            source: "roi_calculator_report",
            data: {
              trucksPerDay: trucksPerDay[0],
              waitTime: waitTime[0],
              hourlyCost: hourlyCost[0],
              savings
            },
            timestamp: new Date().toISOString()
          }),
        });
      }

      // Simulate PDF generation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Relatório enviado para seu e-mail com sucesso!");
      setIsModalOpen(false);
      setEmail('');
    } catch (error) {
      console.error("Error sending report request:", error);
      toast.error("Erro ao processar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic Social Proof based on savings range
  const getSocialProof = () => {
    if (savings.monthly > 100000) {
      return {
        company: "TransLog Brasil",
        logo: "TB",
        text: "A TransLog economizou R$ 1.2M no primeiro ano com volume similar."
      };
    } else if (savings.monthly > 50000) {
      return {
        company: "Porto Seco Sul",
        logo: "PS",
        text: "O Porto Seco Sul reduziu custos em 35% em 3 meses de operação."
      };
    } else {
      return {
        company: "Logística Express",
        logo: "LE",
        text: "A Logística Express eliminou 90% das filas na portaria em 30 dias."
      };
    }
  };

  const socialProof = getSocialProof();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7b61ff]/10 border border-[#7b61ff]/20 text-[#7b61ff] text-sm font-medium mb-6">
            <Calculator size={14} />
            Calculadora de Economia
          </div>
          <h2 className="font-space text-3xl md:text-4xl font-bold text-white mb-4">
            Quanto sua operação perde com filas?
          </h2>
          <p className="text-muted-foreground text-lg">
            Simule a economia potencial implementando o FlowCargo na sua gestão de pátio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Inputs Panel */}
          <motion.div 
            className="glass-panel p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Truck size={18} className="text-[#18d4d4]" />
                    Caminhões por dia
                  </label>
                  <span className="text-[#18d4d4] font-bold text-xl">{trucksPerDay[0]}</span>
                </div>
                <Slider 
                  value={trucksPerDay} 
                  onValueChange={setTrucksPerDay} 
                  max={500} 
                  step={10}
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground mt-2">Volume médio diário de recebimento/expedição</p>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-white font-medium flex items-center gap-2">
                    <Clock size={18} className="text-[#7b61ff]" />
                    Tempo médio de espera (min)
                  </label>
                  <span className="text-[#7b61ff] font-bold text-xl">{waitTime[0]} min</span>
                </div>
                <Slider 
                  value={waitTime} 
                  onValueChange={setWaitTime} 
                  max={240} 
                  step={5}
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground mt-2">Tempo médio atual do check-in até a doca</p>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-white font-medium flex items-center gap-2">
                    <DollarSign size={18} className="text-yellow-400" />
                    Custo hora parada (R$)
                  </label>
                  <span className="text-yellow-400 font-bold text-xl">R$ {hourlyCost[0]}</span>
                </div>
                <Slider 
                  value={hourlyCost} 
                  onValueChange={setHourlyCost} 
                  max={500} 
                  step={10}
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground mt-2">Estadia + Motorista + Custo de Oportunidade</p>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7b61ff]/20 to-[#18d4d4]/20 blur-3xl -z-10 rounded-full opacity-50" />
            
            <div className="bg-[#0b0b0f] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingDown size={120} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-8 relative z-10">Economia Projetada com FlowCargo</h3>

              <div className="space-y-6 relative z-10">
                <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                  <p className="text-muted-foreground text-sm mb-1">Economia Mensal</p>
                  <div className="text-4xl font-bold text-white flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    {savings.monthly.toLocaleString('pt-BR')}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#7b61ff]/20 to-[#18d4d4]/20 rounded-xl p-6 border border-[#7b61ff]/30">
                  <p className="text-[#18d4d4] text-sm mb-1 font-medium">Economia Anual</p>
                  <div className="text-5xl font-bold text-white flex items-baseline gap-1">
                    <span className="text-lg text-[#18d4d4]">R$</span>
                    {savings.yearly.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    *Baseado em uma redução média de 40% no tempo de espera
                  </p>
                </div>

                {/* Dynamic Social Proof */}
                <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="h-10 w-10 rounded-full bg-[#7b61ff] flex items-center justify-center text-white font-bold text-xs">
                    {socialProof.logo}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{socialProof.company}</p>
                    <p className="text-xs text-muted-foreground">{socialProof.text}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-white hover:bg-gray-100 text-black font-bold h-12 rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Baixar Relatório Completo (PDF)
                </Button>
                <a 
                  href="#contact" 
                  className="block w-full text-center text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Agendar demonstração sem compromisso
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0b0f] border border-white/10 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="h-12 w-12 bg-[#18d4d4]/20 rounded-full flex items-center justify-center text-[#18d4d4] mx-auto mb-4">
                  <Download size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Seu relatório está pronto</h3>
                <p className="text-muted-foreground text-sm">
                  Insira seu e-mail profissional para receber o detalhamento completo da economia projetada.
                </p>
              </div>

              <form onSubmit={handleDownloadReport} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">E-mail profissional</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7b61ff] focus:ring-1 focus:ring-[#7b61ff] transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-brand hover:opacity-90 text-white font-bold h-12 rounded-lg shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Receber Relatório Agora"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Seus dados estão seguros. Não enviamos spam.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
