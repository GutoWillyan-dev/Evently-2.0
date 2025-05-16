
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-evently text-white py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Evently</h3>
            <p className="text-sm">
              Sua plataforma completa para descobrir, comprar e gerenciar ingressos para os melhores eventos da sua região.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:underline">Eventos</Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:underline">Sobre</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:underline">FAQ</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Termos de Uso</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Política de Privacidade</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Evently. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
