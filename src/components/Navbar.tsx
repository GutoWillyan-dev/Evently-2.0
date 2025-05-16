
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Mock user state (in a real app, this would come from authentication context)
interface User {
  name: string;
  email: string;
  avatar?: string;
}

const Navbar = () => {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Effect to check if user is logged in (using localStorage in this mock implementation)
  useEffect(() => {
    const storedUser = localStorage.getItem("eventlyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

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
            <Link to="/perfil" className="flex items-center space-x-2">
              <Avatar className="h-9 w-9 border-2 border-white">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="bg-evently-light text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
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
