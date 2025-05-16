
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Sobre a Evently</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
          <p className="mb-4">
            A Evently é sua plataforma completa para descobrir, comprar e gerenciar ingressos para os melhores eventos da sua região.
          </p>
          <p className="mb-4">
            Nossa missão é conectar pessoas a experiências únicas, facilitando o acesso a eventos culturais, musicais, esportivos e muito mais. 
            Com uma interface simples e intuitiva, a Evently permite que você encontre rapidamente eventos de seu interesse, faça a compra de ingressos de forma segura e tenha tudo organizado em um só lugar.
          </p>
          <p>
            Seja você um amante de música, um entusiasta de teatro ou alguém em busca de novas experiências, a Evently está aqui para garantir que você não perca nenhum momento especial.
          </p>
        </div>
        
        {/* História da Empresa */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="mb-4">
              A Evently foi fundada em 2022 por um grupo de entusiastas de eventos que perceberam a necessidade de uma plataforma moderna e eficiente para conectar pessoas a experiências memoráveis.
            </p>
            <p className="mb-4">
              O que começou como uma pequena startup rapidamente cresceu para se tornar uma referência no mercado de ingressos online, com foco em proporcionar a melhor experiência tanto para os organizadores quanto para os participantes dos eventos.
            </p>
            <p>
              Hoje, a Evently está presente em várias cidades do Brasil, conectando milhares de pessoas a eventos de todas as categorias, desde pequenos workshops até grandes festivais.
            </p>
          </div>
        </div>
        
        {/* Equipe */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                     alt="CEO" 
                     className="h-full w-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold">Marcos Silva</h3>
              <p className="text-gray-600">CEO & Co-fundador</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                     alt="COO" 
                     className="h-full w-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold">Ana Oliveira</h3>
              <p className="text-gray-600">COO & Co-fundadora</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                     alt="CTO" 
                     className="h-full w-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold">Lucas Costa</h3>
              <p className="text-gray-600">CTO</p>
            </div>
          </div>
        </div>
        
        {/* Contato */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Entre em Contato</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="mb-4">
              Estamos sempre à disposição para ajudar você com qualquer dúvida ou sugestão.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Informações de Contato</h3>
                <p className="mb-2">Email: contato@evently.com</p>
                <p className="mb-2">Telefone: (11) 3456-7890</p>
                <p>Horário de atendimento: Segunda a Sexta, 9h às 18h</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Endereço</h3>
                <p className="mb-2">Avenida Paulista, 1234</p>
                <p className="mb-2">Bela Vista, São Paulo - SP</p>
                <p>CEP: 01310-100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
