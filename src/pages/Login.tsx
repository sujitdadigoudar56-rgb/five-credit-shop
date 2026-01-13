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
    <div className="min-h-screen bg-cream flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-cream flex-col items-center justify-center p-12 relative">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-lg mb-2">Welcome to</p>
          <h1 className="text-5xl font-display font-bold text-maroon mb-2">Parampare</h1>
          <p className="text-muted-foreground text-lg tracking-wide">Authentic Ilkal Sarees</p>
        </div>
        
        {/* Saree Stack Illustration */}
        <div className="relative w-64 h-80">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            {/* Weaving loom illustration */}
            <svg viewBox="0 0 200 250" className="w-64 h-80">
              {/* Loom Frame */}
              <rect x="30" y="20" width="8" height="200" fill="hsl(var(--maroon))" rx="2"/>
              <rect x="162" y="20" width="8" height="200" fill="hsl(var(--maroon))" rx="2"/>
              <rect x="25" y="10" width="150" height="15" fill="hsl(var(--maroon-dark))" rx="3"/>
              
              {/* Warp threads */}
              {[...Array(12)].map((_, i) => (
                <line key={i} x1={50 + i * 10} y1="25" x2={50 + i * 10} y2="180" stroke="hsl(var(--gold))" strokeWidth="1.5"/>
              ))}
              
              {/* Woven fabric */}
              <rect x="45" y="80" width="110" height="100" fill="hsl(var(--maroon))" rx="2"/>
              <rect x="45" y="80" width="110" height="20" fill="hsl(var(--gold))" rx="2"/>
              <rect x="45" y="160" width="110" height="20" fill="hsl(var(--gold))" rx="2"/>
              
              {/* Saree stack below */}
              <rect x="50" y="195" width="100" height="12" fill="hsl(var(--gold))" rx="2"/>
              <rect x="55" y="207" width="90" height="12" fill="hsl(var(--maroon))" rx="2"/>
              <rect x="60" y="219" width="80" height="12" fill="#2d5a4a" rx="2"/>
              <rect x="65" y="231" width="70" height="12" fill="hsl(var(--gold-dark))" rx="2"/>
            </svg>
          </div>
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
