
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2834&q=80")',
            opacity: 0.3,
          }}
        ></div>
        
        <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center relative inline-block animate-fade-in">
            <span className="absolute -inset-1 -skew-y-3 bg-evently opacity-30" aria-hidden="true"></span>
            <span className="relative text-evently">Sobre a Evently</span>
          </h1>
          
          <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-sm mb-12 max-w-3xl mx-auto animate-fade-in">
            <p className="mb-4 text-lg">
              A Evently é sua plataforma completa para descobrir, comprar e gerenciar ingressos para os melhores eventos da sua região.
            </p>
            <p className="mb-4">
              Nossa missão é conectar pessoas a experiências únicas, facilitando o acesso a eventos culturais, musicais, esportivos e muito mais no Brasil inteiro. 
              Com uma interface simples e intuitiva, a Evently permite que você encontre rapidamente eventos de seu interesse, faça a compra de ingressos de forma segura e tenha tudo organizado em um só lugar.
            </p>
            <p className="mb-6">
              Seja você um amante de música, um entusiasta de teatro ou alguém em busca de novas experiências, a Evently está aqui para garantir que você não perca nenhum momento especial.
            </p>
            
            <div className="border-l-4 border-evently pl-4 italic bg-gray-50 p-4">
              <p>
                "Nossa sede está localizada no coração do Recife, onde a cultura e a arte pulsam em cada esquina. Acreditamos que a rica diversidade cultural de Pernambuco e do Brasil deve ser celebrada e compartilhada."
              </p>
            </div>
          </div>
          
          {/* História da Empresa */}
          <div className="mb-12 max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center relative inline-block">
              <span className="absolute -inset-1 -skew-y-3 bg-evently opacity-30" aria-hidden="true"></span>
              <span className="relative">Nossa História</span>
            </h2>
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-sm">
              <p className="mb-4">
                A Evently foi fundada em 2022 em Recife, por um grupo de entusiastas de eventos que perceberam a necessidade de uma plataforma moderna e eficiente para conectar pessoas a experiências memoráveis.
              </p>
              <p className="mb-4">
                O que começou como uma pequena startup rapidamente cresceu para se tornar uma referência no mercado de ingressos online, com foco em proporcionar a melhor experiência tanto para os organizadores quanto para os participantes dos eventos.
              </p>
              <p>
                Hoje, a Evently está presente em várias cidades do Brasil, conectando milhares de pessoas a eventos de todas as categorias, desde pequenos workshops até grandes festivais.
              </p>
            </div>
          </div>
          
          {/* Missão e Valores */}
          <div className="mb-12 max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center relative inline-block">
              <span className="absolute -inset-1 -skew-y-3 bg-evently opacity-30" aria-hidden="true"></span>
              <span className="relative">Missão e Valores</span>
            </h2>
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-evently">Missão</h3>
                <p>
                  Conectar pessoas a experiências que transformam vidas, facilitando o acesso à cultura, entretenimento e conhecimento através de uma plataforma simples, segura e confiável.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-evently">Valores</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Inovação:</span> Buscamos constantemente novas formas de melhorar nossa plataforma e serviços.
                  </li>
                  <li>
                    <span className="font-semibold">Acessibilidade:</span> Acreditamos que eventos culturais devem ser acessíveis a todos.
                  </li>
                  <li>
                    <span className="font-semibold">Diversidade:</span> Valorizamos a diversidade cultural brasileira em todas as suas formas.
                  </li>
                  <li>
                    <span className="font-semibold">Confiança:</span> Construímos relacionamentos baseados na transparência e segurança.
                  </li>
                </ul>
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
