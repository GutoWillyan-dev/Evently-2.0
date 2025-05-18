
import { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SubscriptionPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubscribe = (plan: string) => {
    setIsProcessing(true);
    
    // Simulação de processamento de assinatura
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Assinatura realizada com sucesso!",
        description: `Você assinou o plano ${plan}.`,
      });
      
      // Simular dados do usuário logado com a assinatura e pontos
      const userData = {
        name: "Usuário",
        email: "usuario@exemplo.com",
        subscription: plan.toLowerCase(),
        points: 0 // Inicializa pontos como zero para novos assinantes
      };
      
      localStorage.setItem("eventlyUser", JSON.stringify(userData));
      
      navigate("/");
    }, 2000);
  };
  
  // Função para formatar preço com R$
  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  // Preços dos planos
  const prices = {
    standard: billingCycle === "monthly" ? 18.90 : 18.90 * 10.8, // 10% desconto anual
    premium: billingCycle === "monthly" ? 39.90 : 39.90 * 10.8 // 10% desconto anual
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Planos de Assinatura Evently</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Assine um dos nossos planos e tenha acesso a descontos exclusivos e benefícios especiais em todos os eventos.
            </p>
            
            <div className="mt-8 flex justify-center">
              <RadioGroup 
                value={billingCycle}
                onValueChange={setBillingCycle}
                className="flex items-center space-x-4 bg-white p-1.5 rounded-lg border"
              >
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded cursor-pointer ${billingCycle === "monthly" ? "bg-evently text-white rounded-md" : ""}`}>
                  <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                  <Label htmlFor="monthly" className="cursor-pointer">Mensal</Label>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded cursor-pointer ${billingCycle === "annual" ? "bg-evently text-white rounded-md" : ""}`}>
                  <RadioGroupItem value="annual" id="annual" className="sr-only" />
                  <Label htmlFor="annual" className="cursor-pointer">Anual <Badge variant="outline" className="ml-1 bg-white text-evently">10% OFF</Badge></Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plano Standard */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Standard</CardTitle>
                <CardDescription>Para quem busca descontos e benefícios básicos</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{formatPrice(prices.standard)}</span>
                  <span className="text-gray-500">/{billingCycle === "monthly" ? "mês" : "ano"}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>15% de desconto na compra de 1 ingresso</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>30% de desconto na compra de 2 ou mais ingressos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Recomendações personalizadas de eventos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>
                      Programa de pontos: 1 ponto por R$ 1 gasto
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="h-auto p-0 ml-1">
                            <span className="text-xs underline">(?)</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-4">
                          <p className="text-sm">Cada ponto equivale a R$ 0,10 para descontar em ingressos futuros.</p>
                        </PopoverContent>
                      </Popover>
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-evently hover:bg-evently-light"
                  onClick={() => handleSubscribe("Standard")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processando..." : "Assinar Standard"}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Plano Premium */}
            <Card className="border-2 border-evently ring-2 ring-evently/20 hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <Badge className="bg-evently text-white m-2">Recomendado</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Premium</CardTitle>
                <CardDescription>A experiência completa para fãs de eventos</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{formatPrice(prices.premium)}</span>
                  <span className="text-gray-500">/{billingCycle === "monthly" ? "mês" : "ano"}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span><strong>20% de desconto</strong> em todos os ingressos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span><strong>Na compra de 2 ingressos, o terceiro é gratuito</strong> em eventos selecionados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Acesso a ingressos VIP pelo preço de ingressos normais</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Recomendações personalizadas de eventos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Programa de pontos aprimorado: 1 ponto por R$ 1 gasto</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Participação em sorteios de ingressos gratuitos para eventos especiais</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-evently hover:bg-evently-light"
                  onClick={() => handleSubscribe("Premium")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processando..." : "Assinar Premium"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              Ao assinar, você concorda com nossos <a href="#" className="text-evently hover:underline">Termos de Serviço</a> e <a href="#" className="text-evently hover:underline">Política de Privacidade</a>.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SubscriptionPage;
