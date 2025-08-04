import { useState } from "react";
import { Leaf, User, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./AuthModal";

interface HeaderProps {
  userName?: string;
}

const Header = ({ userName = "Amir Rahman" }: HeaderProps) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut, isAuthenticated, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
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
              
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-foreground/20 rounded-full animate-pulse" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <p className="font-medium">{user?.email || userName}</p>
                    <p className="text-sm text-primary-foreground/80">GLC Bank Customer</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen} 
      />
    </>
  );
};

export default Header;