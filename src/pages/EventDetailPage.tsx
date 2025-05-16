
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Info, Ticket, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for event details
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
  },
};

const EventDetailPage = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get event details from mock data
  const event = id ? events[id as keyof typeof events] : undefined;
  
  const [selectedTicket, setSelectedTicket] = useState(event?.ticketOptions[0]?.id || "");
  const [quantity, setQuantity] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Handle case where event is not found
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
    setIsProcessing(true);
    
    // Simulação de processamento de compra
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Ingresso comprado com sucesso!",
        description: `Você comprou ${quantity} ingresso(s) para ${event.title}.`,
      });
      
      // Redirecionar para a página de perfil (ingressos)
      navigate("/perfil");
    }, 2000);
  };
  
  // Find selected ticket details
  const ticketOption = event.ticketOptions.find(ticket => ticket.id === selectedTicket);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 flex-1">
        {/* Event Hero */}
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
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
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
              
              {/* Event Categories */}
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
            
            {/* Ticket Purchase */}
            <div>
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Ticket className="h-5 w-5 text-evently" />
                    <h2 className="text-xl font-semibold">Ingressos</h2>
                  </div>
                  
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
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>R$ {(parseFloat(ticketOption.price.replace(',', '.')) * parseInt(quantity)).toFixed(2).replace('.', ',')}</span>
                        </div>
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
