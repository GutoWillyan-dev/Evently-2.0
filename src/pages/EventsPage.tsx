
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

// Mock data for events
const allEvents = [
  {
    id: "1",
    title: "Festival de Música 2025",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "15 Mar 2025",
    location: "São Paulo, SP",
    price: "150,00",
    category: "Música",
  },
  {
    id: "2",
    title: "Teatro Nacional",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    date: "20 Mar 2025",
    location: "Rio de Janeiro, RJ",
    price: "80,00",
    category: "Teatro",
  },
  {
    id: "3",
    title: "Exposição de Arte Moderna",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "25 Mar 2025",
    location: "Curitiba, PR",
    price: "45,00",
    category: "Arte",
  },
  {
    id: "4",
    title: "Conferência de Tecnologia",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80",
    date: "10 Abr 2025",
    location: "Belo Horizonte, MG",
    price: "200,00",
    category: "Negócios",
  },
  {
    id: "5",
    title: "Stand-up Comedy",
    image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "5 Mai 2025",
    location: "São Paulo, SP",
    price: "60,00",
    category: "Comédia",
  },
  {
    id: "6",
    title: "Festival Gastronômico",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1187&q=80",
    date: "12 Jun 2025",
    location: "Brasília, DF",
    price: "75,00",
    category: "Gastronomia",
  },
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Filtrar eventos
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || event.category === selectedCategory;
    const matchesLocation = selectedLocation === "" || event.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Extrair categorias únicas
  const categories = Array.from(new Set(allEvents.map(event => event.category)));
  
  // Extrair locais únicos
  const locations = Array.from(new Set(allEvents.map(event => event.location.split(", ")[0])));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Eventos</h1>
          
          {/* Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Input 
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas categorias</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos locais</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Button 
                  className="w-full bg-evently hover:bg-evently-light"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setSelectedLocation("");
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </div>
          
          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  id={event.id}
                  title={event.title}
                  image={event.image}
                  date={event.date}
                  location={event.location}
                  price={event.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold">Nenhum evento encontrado</h3>
              <p className="text-gray-500">Tente ajustar seus filtros de busca</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default EventsPage;
