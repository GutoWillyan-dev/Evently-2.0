
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { allEvents } from "@/data/events";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);

  // Add animation effect on component mount
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  // Filtrar eventos
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "all" || event.category === selectedCategory;
    const matchesLocation = selectedLocation === "" || selectedLocation === "all" || event.location.includes(selectedLocation);
    
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
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center md:text-left relative 
                         ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'} 
                         transition-all duration-700 ease-in-out`}>
            <span className="inline-block relative after:content-[''] after:absolute after:w-full after:h-1 
                         after:bg-evently after:bottom-0 after:left-0 after:scale-x-0 after:hover:scale-x-100 
                         after:transition-transform after:duration-300 cursor-pointer">
              Eventos
            </span>
            <span className="inline-block absolute -top-3 -right-3 text-evently text-base animate-pulse">
              em destaque
            </span>
          </h1>
          
          {/* Filter Section */}
          <div className={`bg-white p-6 rounded-lg shadow-sm mb-8 
                        ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'} 
                        transition-all duration-700 ease-in-out delay-300`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Input 
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 transition-all focus:ring-2 focus:ring-evently"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="transition-all hover:border-evently focus:ring-2 focus:ring-evently">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="animate-in fade-in-80 zoom-in-95">
                    <SelectItem value="all">Todas categorias</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="transition-all hover:border-evently focus:ring-2 focus:ring-evently">
                    <SelectValue placeholder="Local" />
                  </SelectTrigger>
                  <SelectContent className="animate-in fade-in-80 zoom-in-95">
                    <SelectItem value="all">Todos locais</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Button 
                  className="w-full bg-evently hover:bg-evently-light transition-all duration-300 transform hover:scale-105"
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
              {filteredEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className={`transition-all duration-500 ease-in-out 
                           ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <EventCard 
                    id={event.id} 
                    title={event.title}
                    image={event.image}
                    date={event.date}
                    location={event.location}
                    price={event.price}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 
                         ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'} 
                         transition-all duration-700 ease-in-out delay-500`}>
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
