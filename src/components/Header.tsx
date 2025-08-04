import { Leaf, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  userName?: string;
}

const Header = ({ userName = "Amir Rahman" }: HeaderProps) => {
  return (
    <header className="bg-gradient-eco text-primary-foreground shadow-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">EcoScore Wallet</h1>
                <p className="text-primary-foreground/80 text-sm">
                  Sustainable spending, better credit
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:flex">
              Sandbox Mode
            </Badge>
            
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="font-medium">{userName}</p>
                <p className="text-sm text-primary-foreground/80">GLC Bank Customer</p>
              </div>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;