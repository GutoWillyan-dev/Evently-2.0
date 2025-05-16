
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Edit, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock data for search
import { allEvents } from "@/data/events";

// Mock user state (in a real app, this would come from authentication context)
interface User {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

const Navbar = () => {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Effect to check if user is logged in (using localStorage in this mock implementation)
  useEffect(() => {
    const storedUser = localStorage.getItem("eventlyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("eventlyUser");
    setUser(null);
    setIsLoggedIn(false);
    
    toast({
      title: "Desconectado",
      description: "Você saiu da sua conta com sucesso.",
    });
    
    navigate("/");
  };

  // Handle search
  const handleSearchSelect = (eventId: string) => {
    setIsSearchOpen(false);
    setSearchTerm("");
    navigate(`/eventos/${eventId}`);
  };

  // Filter events based on search term
  const filteredEvents = searchTerm.trim() === "" 
    ? [] 
    : allEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);

  return (
    <nav className="bg-evently w-full py-4">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        <Link to="/" className="text-white text-2xl font-bold transition-transform hover:scale-105">
          Evently
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className="text-white hover:text-gray-200 relative group"
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/eventos" 
            className="text-white hover:text-gray-200 relative group"
          >
            <span>Eventos</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/sobre" 
            className="text-white hover:text-gray-200 relative group"
          >
            <span>Sobre</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Popover open={isSearchOpen && filteredEvents.length > 0} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input 
                    type="text"
                    placeholder="Buscar eventos..."
                    className="pl-10 pr-4 py-2 w-60 rounded-full bg-white transition-all focus:ring-2 focus:ring-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[300px] border-none shadow-lg" align="end">
                <Command>
                  <CommandList>
                    {filteredEvents.length > 0 ? (
                      <CommandGroup heading="Eventos sugeridos">
                        {filteredEvents.map(event => (
                          <CommandItem 
                            key={event.id} 
                            onSelect={() => handleSearchSelect(event.id)}
                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                          >
                            <div className="w-8 h-8 rounded-sm bg-gray-200 overflow-hidden">
                              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm truncate font-medium">{event.title}</p>
                              <p className="text-xs text-gray-500 truncate">{event.location}</p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ) : (
                      <CommandEmpty>Nenhum evento encontrado</CommandEmpty>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 border-2 border-white cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-110">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-evently-light text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 animate-in slide-in-from-top-1 duration-200">
                <DropdownMenuItem onClick={() => navigate("/perfil")} className="cursor-pointer transition-colors hover:bg-gray-100">
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/perfil?tab=profile")} className="cursor-pointer transition-colors hover:bg-gray-100">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer transition-colors hover:bg-gray-100">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-evently-light transition-all duration-200 hover:scale-105">
                  Login
                </Button>
              </Link>
              <span className="text-white">|</span>
              <Link to="/cadastro">
                <Button variant="ghost" className="text-white hover:bg-evently-light transition-all duration-200 hover:scale-105">
                  Cadastre-se
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
