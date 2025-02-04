import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MediaSearch from "@/components/MediaSearch";
import { ArrowLeft, ArrowRight, Send, Film, Tv, Plus, Edit, RotateCw } from "lucide-react";

const mediaTypes = [
  { id: "movie", label: "Filme", icon: Film },
  { id: "tv", label: "Série", icon: Tv },
] as const;

const requestTypes = [
  { id: "add", label: "Adicionar", icon: Plus },
  { id: "fix", label: "Corrigir", icon: Edit },
  { id: "update", label: "Atualizar", icon: RotateCw, onlyForTv: true },
];

const RequestWizard = () => {
  const [step, setStep] = useState(1);
  const [mediaType, setMediaType] = useState<"movie" | "tv" | "">("");
  const [requestType, setRequestType] = useState<string>("");
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleMediaTypeSelect = (type: "movie" | "tv") => {
    setMediaType(type);
    setStep(2);
  };

  const handleRequestTypeSelect = (type: string) => {
    setRequestType(type);
    setStep(3);
  };

  const handleMediaSelect = (media: any) => {
    setSelectedMedia(media);
    if (requestType === "add") {
      setStep(4);
    } else {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          type: requestType,
          mediaId: selectedMedia.id,
          mediaType: selectedMedia.type,
          description: description,
          notifyWhatsapp: true,
        }),
      });

      if (!response.ok) throw new Error("Falha ao enviar solicitação");

      toast({
        title: "✨ Solicitação enviada com sucesso!",
        description: "Você receberá atualizações sobre o status.",
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Erro ao enviar solicitação",
        description: "Por favor, tente novamente mais tarde.",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <div className="mb-8 space-y-2">
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold gradient-text">Nova Solicitação</h1>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= step ? "gradient-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground">Passo {step} de 4</p>
      </div>

      <div className="space-y-6 animate-fade-in">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Que tipo de conteúdo você está procurando? 🎬
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {mediaTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleMediaTypeSelect(id as "movie" | "tv")}
                  className="flex flex-col items-center justify-center p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <Icon className="w-12 h-12 mb-2" />
                  <span className="text-lg font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              O que você deseja fazer? 🤔
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {requestTypes
                .filter(type => !type.onlyForTv || mediaType === "tv")
                .map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleRequestTypeSelect(id)}
                    className="flex flex-col items-center justify-center p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <Icon className="w-12 h-12 mb-2" />
                    <span className="text-lg font-medium">{label}</span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Buscar {mediaType === "movie" ? "filme" : "série"} 🔍
            </h2>
            <MediaSearch
              type={mediaType}
              onSelect={handleMediaSelect}
              language="pt-BR"
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Confirmar solicitação ✅</h2>
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-start space-x-4">
                {selectedMedia.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${selectedMedia.posterPath}`}
                    alt={selectedMedia.title}
                    className="w-24 rounded-md"
                  />
                ) : (
                  <div className="w-24 h-36 bg-muted rounded-md flex items-center justify-center">
                    {selectedMedia.type === "movie" ? (
                      <Film className="h-8 w-8 text-muted-foreground" />
                    ) : (
                      <Tv className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedMedia.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedMedia.type === "movie" ? "Filme" : "Série"} •{" "}
                    {selectedMedia.year}
                  </p>
                  {description && (
                    <p className="mt-2 text-sm border-l-2 border-primary pl-2">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button
              className="w-full gradient-primary"
              onClick={handleSubmit}
            >
              Enviar solicitação
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestWizard;