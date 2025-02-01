import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent">
          Content Request Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Request new movies and TV shows, update existing content, or report issues
          with our simple wizard-driven process.
        </p>
      </div>

      <Card className="w-full max-w-md p-6 gradient-card animate-slide-up">
        <div className="space-y-4">
          <Button 
            className="w-full gradient-primary"
            onClick={() => navigate("/request")}
          >
            Make a Request
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;