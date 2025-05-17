
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import FeatureCard from "@/components/FeatureCard";

// Mock data for events
const featuredEvents = [
  {
    id: "1",
    title: "Festival de Música 2025",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "15 Mar 2025",
    location: "São Paulo, SP",
    price: "150,00",
  },
  {
    id: "2",
    title: "Teatro Nacional",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    date: "20 Mar 2025",
    location: "Rio de Janeiro, RJ",
    price: "80,00",
  },
  {
    id: "3",
    title: "Exposição de Arte Moderna",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    date: "25 Mar 2025",
    location: "Curitiba, PR",
    price: "45,00",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[500px] flex items-center" 
               style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')" }}>
        <div className="container mx-auto px-4 lg:px-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubra eventos incríveis</h1>
            <p className="text-xl mb-6">Encontre e compre ingressos para os melhores eventos da sua região</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/eventos">
                <Button size="lg" className="bg-evently hover:bg-evently-light text-white">
                  Explorar Eventos
                </Button>
              </Link>
              <Link to="/assinaturas">
                <Button size="lg" variant="outline" className="bg-white text-evently hover:bg-gray-100 border-2 border-evently">
                  <Star className="mr-1" /> Assine e Economize
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      <section className="bg-evently text-white py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-xl">Assine a Evently e economize em todos os eventos!</h3>
              <p>Descontos exclusivos, benefícios especiais e muito mais.</p>
            </div>
            <Link to="/assinaturas">
              <Button className="bg-white text-evently hover:bg-gray-100">
                <Star className="mr-1" /> Ver planos a partir de R$ 15,90
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Eventos em Destaque</h2>
            <Link to="/eventos" className="text-evently hover:underline">Ver todos</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a Evently?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Ticket />}
              title="Compra Segura"
              description="Garantimos a segurança de todas as suas transações com os melhores sistemas de pagamento"
            />
            <FeatureCard 
              icon={<Calendar />}
              title="Lembretes"
              description="Receba notificações personalizadas sobre seus eventos favoritos"
            />
            <FeatureCard 
              icon={<MapPin />}
              title="Eventos Locais"
              description="Descubra os melhores eventos próximos a você com recomendações personalizadas"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
