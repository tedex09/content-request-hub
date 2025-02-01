import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockRequests = [
  {
    id: 1,
    type: "add",
    title: "The Last of Us",
    status: "pending",
    createdAt: "2024-02-01",
  },
  {
    id: 2,
    type: "update",
    title: "Breaking Bad",
    status: "in_progress",
    createdAt: "2024-01-30",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = statusFilter === "all"
    ? mockRequests
    : mockRequests.filter(request => request.status === statusFilter);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Minhas Solicitações</h1>
          <p className="text-muted-foreground">
            Acompanhe o status das suas solicitações
          </p>
        </div>
        <Button onClick={() => navigate("/request")}>Nova solicitação</Button>
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
            className="rounded-lg border p-4 hover:bg-accent"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{request.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Solicitado em {request.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {request.status === "pending" && "Pendente"}
                  {request.status === "in_progress" && "Em análise"}
                  {request.status === "completed" && "Concluído"}
                </span>
                <Button variant="outline" size="sm">
                  Ver detalhes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;