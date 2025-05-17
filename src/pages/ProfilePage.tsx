
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Ticket, Upload, Check, Mail, AlertTriangle, QrCode, Coins } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Interface para o tipo de ingresso
interface UserTicket {
  id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  price: string;
  qrCode: string;
  image: string;
}

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<UserTicket | null>(null);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [qrCodeExpiry, setQrCodeExpiry] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [userPoints, setUserPoints] = useState(0);
  const [userTickets, setUserTickets] = useState<UserTicket[]>([]);
  const { toast } = useToast();
  const initialTab = searchParams.get('tab') || 'tickets';

  // Carregar dados do usuário do localStorage
  useEffect(() => {
    // Carregar dados de usuário
    const storedUser = localStorage.getItem("eventlyUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setProfileImage(userData.avatar || null);
      setIsEmailVerified(userData.emailVerified || false);
      setUserPoints(userData.points || 0);
    } else {
      // Redirecionar para login se não houver dados de usuário
      navigate('/login');
    }

    // Carregar ingressos do usuário
    const storedTickets = localStorage.getItem("eventlyUserTickets");
    if (storedTickets) {
      setUserTickets(JSON.parse(storedTickets));
    }
  }, [navigate]);

  // Gerenciar contador regressivo para o QR code
  useEffect(() => {
    let timer: number;
    
    if (qrCodeExpiry) {
      timer = window.setInterval(() => {
        const now = new Date();
        const diff = qrCodeExpiry.getTime() - now.getTime();
        
        if (diff <= 0) {
          clearInterval(timer);
          setTicketDialogOpen(false);
          toast({
            title: "QR Code expirado",
            description: "O QR Code expirou. Por favor, gere um novo.",
            variant: "destructive",
          });
          return;
        }
        
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setRemainingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [qrCodeExpiry, toast]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Obter dados atuais do usuário
    const storedUser = localStorage.getItem("eventlyUser");
    if (!storedUser) return;
    
    const userData = JSON.parse(storedUser);
    
    // Atualizar dados do usuário
    const updatedUser = {
      ...userData,
      name,
      email,
      phone,
      avatar: profileImage,
    };
    
    // Salvar dados atualizados do usuário
    localStorage.setItem("eventlyUser", JSON.stringify(updatedUser));
    
    // Simular atraso de chamada de API
    setTimeout(() => {
      setIsUpdating(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }, 1000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      toast({
        title: "Verificação necessária",
        description: "Por favor, verifique seu email antes de alterar sua senha.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem. Por favor, tente novamente.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    
    // Obter dados atuais do usuário
    const storedUser = localStorage.getItem("eventlyUser");
    if (!storedUser) return;
    
    const userData = JSON.parse(storedUser);
    
    // Atualizar senha do usuário (em uma aplicação real, isso seria hasheado)
    const updatedUser = {
      ...userData,
      password: newPassword,
    };
    
    // Salvar dados atualizados do usuário
    localStorage.setItem("eventlyUser", JSON.stringify(updatedUser));
    
    // Simular atraso de chamada de API
    setTimeout(() => {
      setIsUpdating(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso.",
      });
    }, 1000);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setPreviewImage(event.target.result);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfileImage = () => {
    if (previewImage) {
      setProfileImage(previewImage);
      
      // Obter dados atuais do usuário e atualizar avatar
      const storedUser = localStorage.getItem("eventlyUser");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.avatar = previewImage;
        localStorage.setItem("eventlyUser", JSON.stringify(userData));
      }
      
      setPreviewImage(null);
      
      toast({
        title: "Foto de perfil atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      });
    }
  };

  const handleSendVerification = () => {
    setIsVerificationSent(true);
    
    toast({
      title: "Código de verificação enviado",
      description: "Um código de verificação foi enviado para o seu email.",
    });
  };

  const handleVerifyEmail = () => {
    // Simular verificação - em um app real, compararia com o código enviado por email
    if (verificationCode === "123456") {
      setIsEmailVerified(true);
      setVerificationDialogOpen(false);
      
      // Atualizar dados do usuário com status de verificação de email
      const storedUser = localStorage.getItem("eventlyUser");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.emailVerified = true;
        localStorage.setItem("eventlyUser", JSON.stringify(userData));
      }
      
      toast({
        title: "Email verificado",
        description: "Seu email foi verificado com sucesso.",
      });
    } else {
      toast({
        title: "Código inválido",
        description: "O código de verificação informado é inválido. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleViewTicket = (ticket: UserTicket) => {
    setSelectedTicket(ticket);
    setTicketDialogOpen(true);
    
    // Definir tempo de expiração do QR code para 1 hora a partir de agora
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);
    setQrCodeExpiry(expiry);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8 animate-fade-in">Meu Perfil</h1>
          
          <Tabs defaultValue={initialTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-evently">
              <TabsTrigger value="tickets">Meus Ingressos</TabsTrigger>
              <TabsTrigger value="profile">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>
            
            {/* Aba de Ingressos */}
            <TabsContent value="tickets" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold">Meus Ingressos</h2>
                
                {/* Exibição de pontos */}
                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-2 px-4 rounded-lg shadow flex items-center">
                  <Coins className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-xs font-medium">Seus pontos</p>
                    <p className="text-lg font-bold">{userPoints} pontos</p>
                  </div>
                  <div className="ml-3 border-l border-white/30 pl-3">
                    <p className="text-xs">Valor em descontos</p>
                    <p className="font-semibold">R$ {(userPoints * 0.10).toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
              </div>
              
              {userTickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userTickets.map((ticket) => (
                    <Card key={ticket.id} className="overflow-hidden">
                      <div className="md:grid md:grid-cols-3">
                        <div className="h-32 md:h-auto bg-gray-200">
                          <img 
                            src={ticket.image} 
                            alt={ticket.eventName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="col-span-2 p-6">
                          <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
                          
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>{ticket.date}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{ticket.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Ticket className="h-4 w-4 text-gray-500" />
                              <span>{ticket.ticketType} - {ticket.price}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button 
                              size="sm" 
                              className="bg-evently hover:bg-evently-light"
                              onClick={() => handleViewTicket(ticket)}
                            >
                              Ver Ingresso
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Ticket className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">Nenhum ingresso encontrado</h3>
                    <p className="text-gray-500">
                      Você ainda não comprou nenhum ingresso. Explore nossos eventos e garanta sua participação!
                    </p>
                    <div className="mt-6">
                      <Button asChild className="bg-evently hover:bg-evently-light">
                        <Link to="/eventos">Explorar Eventos</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Aba de Perfil */}
            <TabsContent value="profile">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Informações Pessoais</h2>
                  
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-32 w-32">
                        {profileImage ? (
                          <AvatarImage src={profileImage} alt={name} />
                        ) : (
                          <AvatarFallback className="text-3xl bg-evently-light text-white">
                            {name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div className="flex flex-col space-y-2 items-center">
                        <label htmlFor="profile-image" className="cursor-pointer">
                          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
                            <Upload className="h-4 w-4" />
                            <span>Alterar foto</span>
                          </div>
                          <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="hidden"
                          />
                        </label>
                        
                        {previewImage && (
                          <Button
                            onClick={handleSaveProfileImage}
                            className="bg-evently hover:bg-evently-light"
                            size="sm"
                          >
                            Salvar foto
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome completo</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        
                        <Button type="submit" className="bg-evently hover:bg-evently-light" disabled={isUpdating}>
                          {isUpdating ? "Atualizando..." : "Salvar alterações"}
                        </Button>
                      </form>
                    </div>
                  </div>
                  
                  {previewImage && (
                    <div className="mt-4 p-4 border rounded-md">
                      <h3 className="font-medium mb-2">Pré-visualização</h3>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={previewImage} alt="Preview" />
                        </Avatar>
                        <p className="text-sm text-gray-500">
                          Clique em "Salvar foto" para confirmar a alteração
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Aba de Segurança */}
            <TabsContent value="security">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Verificação de Email</h2>
                    {isEmailVerified ? (
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-1" />
                        <span>Email verificado</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-600">
                        <AlertTriangle className="h-5 w-5 mr-1" />
                        <span>Não verificado</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {isEmailVerified 
                      ? "Seu email foi verificado com sucesso. Você pode alterar sua senha quando quiser." 
                      : "Para garantir a segurança da sua conta, verifique seu email antes de alterar sua senha."}
                  </p>
                  
                  {!isEmailVerified && (
                    <Button 
                      className="bg-evently hover:bg-evently-light flex items-center space-x-2"
                      onClick={() => {
                        handleSendVerification();
                        setVerificationDialogOpen(true);
                      }}
                      disabled={isVerificationSent}
                    >
                      <Mail className="h-4 w-4" />
                      <span>{isVerificationSent ? "Código enviado" : "Verificar email"}</span>
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Alterar Senha</h2>
                  
                  {!isEmailVerified && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                      <p className="text-amber-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Verifique seu email antes de alterar sua senha
                      </p>
                    </div>
                  )}
                  
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha atual</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        disabled={!isEmailVerified}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova senha</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={!isEmailVerified}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirme a nova senha</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={!isEmailVerified}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-evently hover:bg-evently-light" 
                      disabled={isUpdating || !isEmailVerified}
                    >
                      {isUpdating ? "Atualizando..." : "Atualizar senha"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Diálogo de Verificação de Email */}
      <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verificar seu email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-gray-600">
              Digite o código de 6 dígitos enviado para {email}
            </p>
            <Input
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="text-center text-lg"
              maxLength={6}
            />
            <p className="mt-2 text-xs text-gray-500">
              Para fins de demonstração, o código correto é 123456
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVerificationDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-evently hover:bg-evently-light" onClick={handleVerifyEmail}>
              Verificar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de Visualização do Ingresso */}
      <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Seu ingresso para {selectedTicket?.eventName}</DialogTitle>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="py-4">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-white p-2 border rounded-lg mb-2">
                  <img
                    src={selectedTicket.qrCode}
                    alt="QR Code"
                    className="w-48 h-48"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">
                    QR Code válido por:
                  </p>
                  <p className="font-semibold text-evently">
                    {remainingTime}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Evento</p>
                    <p className="font-medium">{selectedTicket.eventName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tipo</p>
                    <p className="font-medium">{selectedTicket.ticketType}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Data</p>
                    <p className="font-medium">{selectedTicket.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Horário</p>
                    <p className="font-medium">{selectedTicket.time}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Local</p>
                  <p className="font-medium">{selectedTicket.location}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Valor</p>
                  <p className="font-medium">{selectedTicket.price}</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Apresente este QR Code na entrada do evento.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  O QR Code expira automaticamente após 1 hora.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button className="w-full bg-evently hover:bg-evently-light" onClick={() => setTicketDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
