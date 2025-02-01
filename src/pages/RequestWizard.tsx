import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const requestTypes = [
  { id: "add", label: "Adicionar novo filme/série" },
  { id: "update", label: "Atualizar série" },
  { id: "fix", label: "Corrigir filme ou série" },
] as const;

const RequestWizard = () => {
  const [step, setStep] = useState(1);
  const [requestType, setRequestType] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRequestTypeSelect = (value: string) => {
    setRequestType(value);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement request submission
    toast({
      title: "Solicitação enviada com sucesso!",
      description: "Você receberá atualizações sobre o status da sua solicitação.",
    });
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nova Solicitação</h1>
        <p className="text-muted-foreground">Passo {step} de 4</p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Selecione o tipo de solicitação</h2>
          <RadioGroup
            onValueChange={handleRequestTypeSelect}
            className="space-y-4"
          >
            {requestTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={type.id} />
                <Label htmlFor={type.id}>{type.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 2 && (requestType === "update" || requestType === "fix") && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Descreva o problema</h2>
          <Textarea
            placeholder="Descreva detalhadamente o que precisa ser atualizado ou corrigido..."
            className="h-32"
          />
          <Button onClick={() => setStep(3)}>Próximo</Button>
        </div>
      )}

      {((step === 2 && requestType === "add") || step === 3) && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Buscar filme/série</h2>
          <Input
            type="search"
            placeholder="Digite o nome do filme ou série..."
            className="mb-4"
          />
          <Button onClick={() => setStep(4)}>Próximo</Button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Confirmação</h2>
          <div className="rounded-lg border p-4">
            <p><strong>Tipo de solicitação:</strong> {requestType}</p>
            {/* Add more confirmation details */}
          </div>
          <Button onClick={handleSubmit}>Enviar solicitação</Button>
        </div>
      )}
    </div>
  );
};

export default RequestWizard;