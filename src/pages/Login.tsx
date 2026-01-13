import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || "/";

  const validateInput = (value: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(value) || emailRegex.test(value);
  };

  const handleGetOTP = () => {
    setError("");
    if (!identifier.trim()) {
      setError("Please enter a mobile number or email");
      return;
    }
    if (!validateInput(identifier.trim())) {
      setError("Please enter a valid mobile number or email");
      return;
    }
    navigate("/verify-otp", { 
      state: { 
        identifier: identifier.trim(), 
        isLogin: true,
        returnTo 
      } 
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dark Maroon Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#3d2a2a] flex-col items-center justify-center p-12 relative">
        <div className="text-center mb-8">
          <p className="text-cream/80 text-lg mb-2 font-body">Welcome to</p>
          <h1 className="text-5xl font-display font-bold text-cream mb-2">Parampare</h1>
          <p className="text-cream/80 text-lg tracking-wide font-body">Authentic Ilkal Sarees</p>
        </div>
        
        {/* Loom & Saree Stack Illustration */}
        <div className="relative w-72 h-80">
          <svg viewBox="0 0 280 300" className="w-full h-full">
            {/* Loom Frame - Wooden Brown */}
            <rect x="40" y="30" width="12" height="180" fill="#8B6914" rx="3"/>
            <rect x="228" y="30" width="12" height="180" fill="#8B6914" rx="3"/>
            <rect x="35" y="20" width="210" height="18" fill="#a67c00" rx="4"/>
            <rect x="35" y="200" width="210" height="12" fill="#a67c00" rx="3"/>
            
            {/* Loom top beam */}
            <rect x="50" y="38" width="180" height="8" fill="#654321" rx="2"/>
            
            {/* Warp threads - vertical golden threads */}
            {[...Array(18)].map((_, i) => (
              <line 
                key={i} 
                x1={65 + i * 10} 
                y1="46" 
                x2={65 + i * 10} 
                y2="195" 
                stroke="#D4AF37" 
                strokeWidth="1.5"
                opacity="0.9"
              />
            ))}
            
            {/* Woven fabric on loom */}
            <rect x="58" y="80" width="164" height="110" fill="#C41E3A" rx="2"/>
            
            {/* Fabric pattern - horizontal stripes */}
            <rect x="58" y="80" width="164" height="18" fill="#D4AF37"/>
            <rect x="58" y="172" width="164" height="18" fill="#D4AF37"/>
            
            {/* Weaving shuttle */}
            <ellipse cx="140" cy="140" rx="35" ry="8" fill="#654321"/>
            <ellipse cx="140" cy="140" rx="25" ry="5" fill="#8B4513"/>
            
            {/* Folded Saree Stack */}
            <g transform="translate(70, 220)">
              {/* Bottom saree - Green */}
              <rect x="0" y="50" width="140" height="18" fill="#2d5a4a" rx="3"/>
              <rect x="0" y="50" width="140" height="4" fill="#D4AF37" rx="1"/>
              
              {/* Middle saree - Maroon */}
              <rect x="10" y="35" width="120" height="18" fill="#8B0000" rx="3"/>
              <rect x="10" y="35" width="120" height="4" fill="#D4AF37" rx="1"/>
              
              {/* Top saree - Golden/Yellow */}
              <rect x="20" y="20" width="100" height="18" fill="#DAA520" rx="3"/>
              <rect x="20" y="20" width="100" height="4" fill="#228B22" rx="1"/>
              
              {/* Topmost saree - Orange */}
              <rect x="30" y="5" width="80" height="18" fill="#FF8C00" rx="3"/>
              <rect x="30" y="5" width="80" height="4" fill="#C41E3A" rx="1"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50">
            {/* Login Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Login
              </h2>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Phone className="h-5 w-5" />
                </div>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter mobile number or email"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError("");
                  }}
                  className={`h-12 pl-10 ${error ? "border-destructive" : ""}`}
                />
              </div>
              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}

              <Button 
                onClick={handleGetOTP}
                className="w-full h-12 bg-maroon hover:bg-maroon-dark text-white font-medium"
              >
                Get OTP
              </Button>

              {/* Helper Links */}
              <div className="flex justify-center gap-4 text-sm">
                <button 
                  onClick={() => navigate(-1)}
                  className="text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Change number
                </button>
                <Link to="/register" className="text-gold hover:underline font-medium">
                  New user? Register
                </Link>
              </div>

              {/* Terms */}
              <p className="text-xs text-center text-muted-foreground pt-4">
                By continuing, you agree to Parampare's{" "}
                <Link to="/terms" className="text-gold hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
