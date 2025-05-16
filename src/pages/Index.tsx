
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import FeatureCard from "@/components/FeatureCard";
import { useState, useEffect } from "react";
import { allEvents } from "@/data/events";

const HomePage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Featured events - take the first 3 from our shared data
  const featuredEvents = allEvents.slice(0, 3);

  // Add animation effect on component mount
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section 
        className={`relative bg-cover bg-center h-[500px] flex items-center 
                  ${isAnimated ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')" }}>
        <div className="container mx-auto px-4 lg:px-8 text-white">
          <div className={`max-w-2xl ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000 delay-300`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Descubra eventos incríveis</h1>
            <p className="text-xl mb-6">Encontre e compre ingressos para os melhores eventos da sua região</p>
            <Link to="/eventos">
              <Button size="lg" className="bg-evently hover:bg-evently-light text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Explorar Eventos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`flex justify-between items-center mb-8 
                        ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                        transition-all duration-700 delay-400`}>
            <h2 className="text-3xl font-bold">Eventos em Destaque</h2>
            <Link to="/eventos" className="text-evently hover:underline relative group">
              Ver todos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-evently transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                         transition-all duration-700`}
                style={{ transitionDelay: `${500 + (index * 150)}ms` }}
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 
                      ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                      transition-all duration-700 delay-700`}>
            Por que escolher a Evently?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                         transition-all duration-700 delay-800`}>
              <FeatureCard 
                icon={<Ticket className="transition-transform group-hover:scale-125 duration-300" />}
                title="Compra Segura"
                description="Garantimos a segurança de todas as suas transações com os melhores sistemas de pagamento"
              />
            </div>
            <div className={`${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                         transition-all duration-700 delay-900`}>
              <FeatureCard 
                icon={<Calendar className="transition-transform group-hover:scale-125 duration-300" />}
                title="Lembretes"
                description="Receba notificações personalizadas sobre seus eventos favoritos"
              />
            </div>
            <div className={`${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                         transition-all duration-700 delay-1000`}>
              <FeatureCard 
                icon={<MapPin className="transition-transform group-hover:scale-125 duration-300" />}
                title="Eventos Locais"
                description="Descubra os melhores eventos próximos a você com recomendações personalizadas"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
