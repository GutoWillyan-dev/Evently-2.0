
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Ticket, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative flex-grow">
        {/* Background Image - Using a Recife event image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1526781100871-d717d3d68151?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")',
            opacity: 0.15,
          }}
        ></div>
        
        <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-evently to-purple-600">
              Sobre a Evently
            </span>
          </motion.h1>
          
          <motion.div 
            className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-md mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-evently text-center">
              Nossa Missão
            </h2>
            <p className="mb-4 text-lg">
              Conectamos pessoas a experiências únicas através de uma plataforma simples e intuitiva para descobrir, comprar e gerenciar ingressos para os melhores eventos do Brasil.
            </p>
            <p className="mb-4">
              Na Evently, acreditamos que momentos especiais merecem ser vividos sem complicações. Nossa plataforma foi criada pensando em você, seja um amante de música, teatro, esportes ou qualquer tipo de evento cultural.
            </p>
          </motion.div>
          
          {/* Features section with animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <motion.div 
              className="bg-white/80 p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="bg-evently/10 p-4 rounded-full mb-4">
                <Ticket size={32} className="text-evently" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Simplificada</h3>
              <p>Adquira ingressos em poucos cliques, com total segurança e praticidade para qualquer evento.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="bg-evently/10 p-4 rounded-full mb-4">
                <Calendar size={32} className="text-evently" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eventos Personalizados</h3>
              <p>Receba recomendações baseadas nos seus interesses e nunca mais perca um evento especial.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="bg-evently/10 p-4 rounded-full mb-4">
                <MapPin size={32} className="text-evently" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cobertura Nacional</h3>
              <p>Encontre eventos em todas as regiões do Brasil, de pequenos shows a grandes festivais.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="bg-evently/10 p-4 rounded-full mb-4">
                <Users size={32} className="text-evently" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunidade Vibrante</h3>
              <p>Conecte-se com outros participantes, compartilhe experiências e faça parte da comunidade Evently.</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-evently text-white p-8 rounded-lg shadow-md text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Pronto para descobrir novos eventos?</h2>
            <p className="mb-6">Junte-se a milhares de pessoas que já estão aproveitando o melhor da cultura brasileira com a Evently.</p>
            <a href="/eventos" className="inline-block bg-white text-evently font-medium px-6 py-3 rounded-full transition-all hover:bg-gray-100 hover:scale-105">
              Explorar Eventos
            </a>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
