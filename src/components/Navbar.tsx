
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Edit, LogOut, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Mock user state (in a real app, this would come from authentication context)
interface User {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  subscription?: string;
}

const Navbar = () => {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  return (
    <nav className="bg-evently w-full py-4">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        <Link to="/" className="text-white text-2xl font-bold">
          Evently
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/eventos" className="text-white hover:text-gray-200">
            Eventos
          </Link>
          <Link to="/assinaturas" className="text-white hover:text-gray-200 flex items-center">
            Assinaturas
            {user?.subscription && (
              <Badge className="ml-2 bg-white text-evently">
                {user.subscription === 'premium' ? 'Premium' : 'Standard'}
              </Badge>
            )}
          </Link>
          <Link to="/sobre" className="text-white hover:text-gray-200">
            Sobre
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Input 
              type="text"
              placeholder="Buscar eventos..."
              className="pl-10 pr-4 py-2 w-60 rounded-full bg-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 border-2 border-white cursor-pointer hover:opacity-90 transition-opacity">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-evently-light text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/perfil")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/perfil?tab=profile")}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar Perfil</span>
                </DropdownMenuItem>
                {user?.subscription ? (
                  <DropdownMenuItem onClick={() => navigate("/assinaturas")}>
                    <Star className="mr-2 h-4 w-4" />
                    <span>Gerenciar Assinatura</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => navigate("/assinaturas")}>
                    <Star className="mr-2 h-4 w-4" />
                    <span>Assinar Evently</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-evently-light">
                  Login
                </Button>
              </Link>
              <span className="text-white">|</span>
              <Link to="/cadastro">
                <Button variant="ghost" className="text-white hover:bg-evently-light">
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
