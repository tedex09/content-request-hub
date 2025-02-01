import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const mockRequests = [
  {
    id: 1,
    type: "add",
    title: "The Last of Us",
    status: "pending",
    createdAt: "2024-02-01",
    user: {
      name: "João Silva",
      email: "joao@email.com",
      whatsapp: "11999999999",
    },
  },
  {
    id: 2,
    type: "update",
    title: "Breaking Bad",
    status: "in_progress",
    createdAt: "2024-01-30",
    user: {
      name: "Maria Santos",
      email: "maria@email.com",
      whatsapp: "11988888888",
    },
  },
];

const AdminDashboard = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const filteredRequests = statusFilter === "all"
    ? mockRequests
    : mockRequests.filter(request => request.status === statusFilter);

  const handleStatusChange = (requestId: number, newStatus: string) => {
    // TODO: Implement status change logic
    toast({
      title: "Status atualizado",
      description: "A solicitação foi atualizada com sucesso.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p className="text-muted-foreground">
          Gerencie todas as solicitações dos usuários
        </p>
      </div>

      <div className="mb-6">
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="in_progress">Em análise</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{request.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Solicitado por {request.user.name} em {request.createdAt}
                </p>
                <p className="text-sm text-muted-foreground">
                  Contato: {request.user.email} | WhatsApp: {request.user.whatsapp}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select
                  value={request.status}
                  onValueChange={(value) => handleStatusChange(request.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="in_progress">Em análise</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Ver histórico
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;