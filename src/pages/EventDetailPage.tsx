
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Info, Ticket, Users, Star, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Dados simulados para os detalhes dos eventos
const events = {
  "1": {
    id: "1",
    title: "Festival de Música 2025",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "15 Mar 2025",
    time: "16:00 - 23:00",
    location: "Parque Ibirapuera",
    address: "Avenida Pedro Álvares Cabral - Vila Mariana, São Paulo - SP",
    description: "O maior festival de música do Brasil está de volta! Com mais de 20 artistas nacionais e internacionais, o Festival de Música 2025 promete ser um evento imperdível para os amantes de música. Traga seus amigos e familiares para curtir um dia incrível com muita música boa, comida deliciosa e diversão garantida.",
    organizer: "Eventos Brasil",
    categories: ["Música", "Festival", "Entretenimento"],
    ticketOptions: [
      { id: "t1", type: "Standard", price: "150,00", remaining: 150 },
      { id: "t2", type: "VIP", price: "300,00", remaining: 50 },
      { id: "t3", type: "Premium", price: "500,00", remaining: 20 },
    ],
    specialEvent: true,
  },
  "2": {
    id: "2",
    title: "Teatro Nacional",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    date: "20 Mar 2025",
    time: "20:00 - 22:30",
    location: "Teatro Municipal",
    address: "Praça Floriano, s/n - Centro, Rio de Janeiro - RJ",
    description: "Uma noite especial no Teatro Municipal do Rio de Janeiro com uma apresentação única da peça 'O Fantasma da Ópera', interpretada pelos melhores atores do país. Uma experiência cultural imperdível para os amantes de teatro e música clássica.",
    organizer: "Teatro Municipal RJ",
    categories: ["Teatro", "Cultura", "Música"],
    ticketOptions: [
      { id: "t1", type: "Plateia", price: "80,00", remaining: 100 },
      { id: "t2", type: "Camarote", price: "120,00", remaining: 30 },
    ],
    specialEvent: false,
  },
  "3": {
    id: "3",
    title: "Exposição de Arte Moderna",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "25 Mar 2025",
    time: "10:00 - 18:00",
    location: "Museu de Arte de Curitiba",
    address: "R. Mal. Hermes, 999 - Centro Cívico, Curitiba - PR",
    description: "Uma exposição única com obras de artistas contemporâneos nacionais e internacionais. A exposição traz mais de 100 obras de arte moderna, incluindo pinturas, esculturas e instalações interativas que desafiam a percepção tradicional da arte.",
    organizer: "Museu de Arte de Curitiba",
    categories: ["Arte", "Cultura", "Exposição"],
    ticketOptions: [
      { id: "t1", type: "Entrada Regular", price: "45,00", remaining: 200 },
      { id: "t2", type: "Entrada com Guia", price: "65,00", remaining: 50 },
    ],
    specialEvent: false,
  },
  "5": {
    id: "5",
    title: "Show de Comédia",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "5 Mai 2025",
    time: "20:00 - 23:00",
    location: "Teatro Renault",
    address: "Av. Brigadeiro Luís Antônio, 411 - República, São Paulo - SP",
    description: "Uma noite de muitas risadas com os melhores comediantes do Brasil. Um espetáculo imperdível para quem quer relaxar e se divertir com amigos.",
    organizer: "Risada Produções",
    categories: ["Comédia", "Entretenimento", "Show"],
    ticketOptions: [
      { id: "t1", type: "Entrada Comum", price: "60,00", remaining: 120 },
      { id: "t2", type: "VIP", price: "100,00", remaining: 40 },
    ],
    specialEvent: true,
  },
  "6": {
    id: "6",
    title: "Feira Gastronômica Internacional",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "12 Jun 2025",
    time: "11:00 - 22:00",
    location: "Parque Villa-Lobos",
    address: "Av. Prof. Fonseca Rodrigues, 2001 - Alto de Pinheiros, São Paulo - SP",
    description: "Uma experiência gastronômica incrível com pratos típicos de mais de 20 países. Uma oportunidade única para experimentar sabores de todo o mundo sem sair do Brasil.",
    organizer: "Sabores do Mundo",
    categories: ["Gastronomia", "Feira", "Cultura"],
    ticketOptions: [
      { id: "t1", type: "Entrada Padrão", price: "35,00", remaining: 350 },
      { id: "t2", type: "Pacote Degustação", price: "90,00", remaining: 100 },
    ],
    specialEvent: false,
  },
};

// Função para calcular desconto baseado na assinatura e quantidade de ingressos
const calculateDiscount = (subscription: string | null, quantity: number, originalPrice: number, userPoints: number = 0, usePoints: boolean = false): { 
  discountPercentage: number, 
  finalPrice: number, 
  freeTickets: number,
  isVipUpgrade: boolean,
  specialEvent: boolean,
  pointsDiscount: number,
  remainingPoints: number
} => {
  let discountPercentage = 0;
  let freeTickets = 0;
  let isVipUpgrade = false;
  let specialEvent = false;
  let pointsDiscount = 0;
  let remainingPoints = userPoints;
  
  // Cálculo dos descontos baseados no tipo de assinatura
  if (subscription === "standard") {
    if (quantity === 1) {
      discountPercentage = 15;
    } else if (quantity >= 2) {
      discountPercentage = 30; // Agora todos os ingressos a partir de 2 têm 30% de desconto
    }
  } else if (subscription === "premium") {
    discountPercentage = 20;
    
    // A cada 2 ingressos, o terceiro é grátis (em eventos especiais)
    if (specialEvent && quantity >= 3) {
      freeTickets = Math.floor(quantity / 3);
    }
    
    // Upgrade para VIP pelo preço de ingresso normal
    isVipUpgrade = true;
  }
  
  // Cálculo do desconto baseado na porcentagem
  const discountAmount = (originalPrice * discountPercentage) / 100;
  let finalPrice = originalPrice - discountAmount;
  
  // Aplicar desconto de pontos se solicitado
  if (usePoints && userPoints > 0) {
    // Cada ponto vale R$ 0,10
    const maxPointsDiscount = Math.min(userPoints * 0.10, finalPrice * 0.5); // Limita o desconto a 50% do valor
    pointsDiscount = maxPointsDiscount;
    finalPrice -= pointsDiscount;
    
    // Calcula quantos pontos foram usados (1 ponto = R$ 0,10)
    const pointsUsed = Math.ceil(pointsDiscount / 0.10);
    remainingPoints = Math.max(0, userPoints - pointsUsed);
  }
  
  return { 
    discountPercentage, 
    finalPrice, 
    freeTickets,
    isVipUpgrade,
    specialEvent,
    pointsDiscount,
    remainingPoints
  };
};

const EventDetailPage = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Busca detalhes do evento a partir dos dados simulados
  const event = id ? events[id as keyof typeof events] : undefined;
  
  const [selectedTicket, setSelectedTicket] = useState(event?.ticketOptions[0]?.id || "");
  const [quantity, setQuantity] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; subscription?: string; points?: number } | null>(null);
  const [usePoints, setUsePoints] = useState(false);
  
  // Carregar dados do usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("eventlyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Tratar caso em que o evento não é encontrado
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Evento não encontrado</h2>
            <p className="mb-6">O evento que você está procurando não existe ou foi removido.</p>
            <Button 
              onClick={() => navigate("/eventos")}
              className="bg-evently hover:bg-evently-light"
            >
              Explorar outros eventos
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handlePurchase = () => {
    if (!user && !showSubscriptionPrompt) {
      setShowSubscriptionPrompt(true);
      return;
    }
    
    setIsProcessing(true);
    
    // Simulação de processamento de compra
    setTimeout(() => {
      setIsProcessing(false);
      
      // Obter o ticket selecionado
      const ticketOption = event.ticketOptions.find(ticket => ticket.id === selectedTicket);
      if (!ticketOption) return;
      
      // Calcular o preço com desconto
      const originalPrice = parseFloat(ticketOption.price.replace(',', '.'));
      const quantityNum = parseInt(quantity);
      
      // Calcular desconto com pontos
      const userPoints = user?.points || 0;
      const { finalPrice, remainingPoints } = calculateDiscount(
        user?.subscription || null, 
        quantityNum, 
        originalPrice,
        userPoints,
        usePoints
      );
      
      // Calcular pontos ganhos (1 ponto por real gasto)
      const totalPrice = finalPrice * quantityNum;
      const pointsEarned = Math.floor(totalPrice);
      
      // Atualizar pontos do usuário no localStorage
      if (user) {
        const updatedUser = {
          ...user,
          points: usePoints ? remainingPoints + pointsEarned : (user.points || 0) + pointsEarned
        };
        localStorage.setItem("eventlyUser", JSON.stringify(updatedUser));
        
        // Adicionar o ingresso à lista de ingressos do usuário
        const newTicket = {
          id: `ticket${Date.now()}`,
          eventName: event.title,
          date: event.date,
          time: event.time.split(" - ")[0],
          location: `${event.location}, ${event.address.split(",")[1]}`,
          ticketType: ticketOption.type,
          price: `R$ ${finalPrice.toFixed(2).replace('.', ',')}`,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EVENTLY-TICKET-${Date.now()}`,
          image: event.image,
        };
        
        // Buscar ingressos existentes ou criar nova lista
        const storedTickets = localStorage.getItem("eventlyUserTickets");
        const userTickets = storedTickets ? JSON.parse(storedTickets) : [];
        
        // Adicionar novo ingresso
        userTickets.push(newTicket);
        localStorage.setItem("eventlyUserTickets", JSON.stringify(userTickets));
      }
      
      toast({
        title: "Ingresso comprado com sucesso!",
        description: `Você comprou ${quantity} ingresso(s) para ${event.title}.`,
      });
      
      // Redirecionar para a página de perfil (ingressos)
      navigate("/perfil?tab=tickets");
    }, 2000);
  };
  
  // Encontrar detalhes do ingresso selecionado
  const ticketOption = event.ticketOptions.find(ticket => ticket.id === selectedTicket);
  
  const originalPrice = ticketOption ? parseFloat(ticketOption.price.replace(',', '.')) : 0;
  const quantityNum = parseInt(quantity);
  const userPoints = user?.points || 0;
  
  // Calcular preço com desconto baseado na assinatura
  const { 
    discountPercentage, 
    finalPrice, 
    freeTickets, 
    isVipUpgrade,
    pointsDiscount
  } = calculateDiscount(
    user?.subscription || null, 
    quantityNum, 
    originalPrice,
    userPoints,
    usePoints
  );
  
  // Total sem desconto
  const subtotal = originalPrice * quantityNum;
  
  // Total com desconto (e ingressos grátis)
  let totalWithDiscount = finalPrice * (quantityNum - freeTickets);
  
  // Aplicar desconto de pontos
  if (usePoints && userPoints > 0) {
    totalWithDiscount -= pointsDiscount * (quantityNum - freeTickets);
  }
  
  // Economia total
  const totalSavings = subtotal - totalWithDiscount;
  
  // Pontos que serão ganhos com a compra
  const pointsToEarn = Math.floor(totalWithDiscount);
  
  // Máximo de desconto que pode ser aplicado usando pontos (em reais)
  const maxPointsDiscountValue = userPoints * 0.10;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 flex-1">
        {/* Imagem do Evento */}
        <div 
          className="w-full h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="container mx-auto px-4 lg:px-8 py-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                {event.specialEvent && (
                  <Badge className="bg-yellow-500">Evento Especial</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Conteúdo do Evento */}
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Detalhes do Evento */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-2 mb-4">
                    <Info className="h-5 w-5 text-evently mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Sobre o evento</h2>
                      <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-evently mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Local</h2>
                      <p className="text-gray-700">{event.location}</p>
                      <p className="text-gray-600 text-sm">{event.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-evently mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Organizador</h2>
                      <p className="text-gray-700">{event.organizer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Categorias do Evento */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Categorias</h3>
                <div className="flex flex-wrap gap-2">
                  {event.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Compra de Ingressos */}
            <div>
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Ticket className="h-5 w-5 text-evently" />
                    <h2 className="text-xl font-semibold">Ingressos</h2>
                  </div>
                  
                  {/* Banner de Status da Assinatura */}
                  {user?.subscription && (
                    <div className={`mb-4 p-3 rounded-lg ${user.subscription === 'premium' ? 'bg-purple-100 border border-purple-300' : 'bg-blue-100 border border-blue-300'}`}>
                      <div className="flex items-center">
                        <Star className={`h-4 w-4 ${user.subscription === 'premium' ? 'text-purple-600' : 'text-blue-600'} mr-2`} />
                        <span className="font-medium">
                          Plano {user.subscription === 'premium' ? 'Premium' : 'Standard'} ativo
                        </span>
                      </div>
                      {discountPercentage > 0 && (
                        <div className="text-sm mt-1">
                          {discountPercentage}% de desconto aplicado
                        </div>
                      )}
                      {freeTickets > 0 && (
                        <div className="text-sm mt-1 text-green-700">
                          {freeTickets} ingresso(s) grátis incluído(s)!
                        </div>
                      )}
                      {isVipUpgrade && user.subscription === 'premium' && (
                        <div className="text-sm mt-1">
                          Elegível para upgrade VIP sem custo adicional
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Prompt de Assinatura */}
                  {showSubscriptionPrompt && !user?.subscription && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h3 className="font-semibold flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        Economize com uma assinatura!
                      </h3>
                      <p className="text-sm mt-2">Assinantes economizam até 30% na compra de ingressos e ganham benefícios exclusivos.</p>
                      <div className="mt-3 space-y-2">
                        <Link to="/assinaturas">
                          <Button className="w-full bg-evently hover:bg-evently-light">
                            Ver planos de assinatura
                          </Button>
                        </Link>
                        <Button 
                          variant="outline"
                          className="w-full" 
                          onClick={() => setShowSubscriptionPrompt(false)}
                        >
                          Continuar sem assinar
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo de Ingresso</label>
                      <Select value={selectedTicket} onValueChange={setSelectedTicket}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo de ingresso" />
                        </SelectTrigger>
                        <SelectContent>
                          {event.ticketOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.type} - R$ {option.price} ({option.remaining} disponíveis)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Quantidade</label>
                      <Select value={quantity} onValueChange={setQuantity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a quantidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Opção para usar pontos (apenas para usuários logados com pontos) */}
                    {user && userPoints > 0 && ticketOption && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium flex items-center">
                            <input 
                              type="checkbox" 
                              checked={usePoints} 
                              onChange={() => setUsePoints(!usePoints)}
                              className="mr-2 h-4 w-4"
                            />
                            Usar pontos para desconto
                          </label>
                          <div className="flex items-center text-sm">
                            <Coins className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{userPoints} pontos</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Você pode usar até R$ {maxPointsDiscountValue.toFixed(2).replace('.', ',')} em desconto com seus pontos.
                        </p>
                      </div>
                    )}
                    
                    {ticketOption && (
                      <div className="mt-6 py-4 border-t border-b">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Valor unitário:</span>
                          <span>R$ {ticketOption.price}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Quantidade:</span>
                          <span>{quantity}</span>
                        </div>
                        
                        {/* Detalhes do desconto caso seja assinante */}
                        {user?.subscription && discountPercentage > 0 && (
                          <div className="flex justify-between mb-2 text-green-600">
                            <span>Desconto ({discountPercentage}%):</span>
                            <span>- R$ {totalSavings.toFixed(2).replace('.', ',')}</span>
                          </div>
                        )}
                        
                        {/* Ingressos grátis para assinantes premium */}
                        {user?.subscription === 'premium' && freeTickets > 0 && (
                          <div className="flex justify-between mb-2 text-green-600 font-medium">
                            <span>Ingressos grátis:</span>
                            <span>{freeTickets}</span>
                          </div>
                        )}
                        
                        {/* Desconto dos pontos */}
                        {usePoints && pointsDiscount > 0 && (
                          <div className="flex justify-between mb-2 text-amber-600">
                            <span>Desconto de pontos:</span>
                            <span>- R$ {(pointsDiscount * (quantityNum - freeTickets)).toFixed(2).replace('.', ',')}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
                          <span>Total:</span>
                          <span>
                            {user?.subscription || usePoints ? (
                              <>
                                {subtotal !== totalWithDiscount && (
                                  <span className="line-through text-gray-400 text-sm mr-2">
                                    R$ {subtotal.toFixed(2).replace('.', ',')}
                                  </span>
                                )}
                                R$ {totalWithDiscount.toFixed(2).replace('.', ',')}
                              </>
                            ) : (
                              `R$ ${(parseFloat(ticketOption.price.replace(',', '.')) * parseInt(quantity)).toFixed(2).replace('.', ',')}`
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Informação sobre pontos ganhos */}
                    {user?.subscription && ticketOption && (
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <p className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          Você ganhará aproximadamente {pointsToEarn} pontos com esta compra.
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full bg-evently hover:bg-evently-light"
                      onClick={handlePurchase}
                      disabled={isProcessing || !selectedTicket}
                    >
                      {isProcessing ? "Processando..." : "Comprar Ingresso"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventDetailPage;
