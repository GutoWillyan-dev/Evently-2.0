
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Navbar = () => {
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

          <Link to="/perfil" className="text-white">
            <Button variant="ghost" className="rounded-full p-2 hover:bg-evently-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
