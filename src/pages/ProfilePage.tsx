
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Ticket, Upload, Check, Mail, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Mock data for user tickets
const userTickets = [
  {
    id: "ticket1",
    eventName: "Festival de Música 2025",
    date: "15 Mar 2025",
    location: "São Paulo, SP",
    ticketType: "VIP",
    price: "R$ 150,00",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EVENTLY-TICKET-12345",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "ticket2",
    eventName: "Teatro Nacional",
    date: "20 Mar 2025",
    location: "Rio de Janeiro, RJ",
    ticketType: "Standard",
    price: "R$ 80,00",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EVENTLY-TICKET-67890",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  },
];

// Mock user data
const userData = {
  name: "João Silva",
  email: "joao.silva@exemplo.com",
  phone: "(11) 98765-4321",
  profilePicture: "",
  emailVerified: false
};

const ProfilePage = () => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState(userData.profilePicture);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(userData.emailVerified);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const { toast } = useToast();

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulação de atualização do perfil
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
    
    // Simulação de atualização de senha
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8 animate-fade-in">Meu Perfil</h1>
          
          <Tabs defaultValue="tickets" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-evently">
              <TabsTrigger value="tickets">Meus Ingressos</TabsTrigger>
              <TabsTrigger value="profile">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>
            
            {/* Tickets Tab */}
            <TabsContent value="tickets" className="space-y-8">
              <h2 className="text-xl font-semibold mb-4">Meus Ingressos</h2>
              
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
                          
                          <div className="mt-4 flex justify-between items-center">
                            <Link to={`/ingressos/${ticket.id}`}>
                              <Button size="sm" className="bg-evently hover:bg-evently-light">
                                Ver Ingresso
                              </Button>
                            </Link>
                            
                            <img 
                              src={ticket.qrCode} 
                              alt="QR Code" 
                              className="h-16 w-16"
                            />
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
            
            {/* Profile Tab */}
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
                          <AvatarFallback className="text-3xl">
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
            
            {/* Security Tab */}
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
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
