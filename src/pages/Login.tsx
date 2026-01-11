import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 py-4 px-6">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Link to="/" className="ml-4">
            <h1 className="text-2xl font-display font-semibold text-foreground">Parampare</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-semibold text-foreground mb-2">
                Welcome to Parampare
              </h2>
              <p className="text-muted-foreground">Authentic Ilkal Sarees</p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-foreground mb-2">
                  Mobile Number or Email
                </label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your mobile number or email"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError("");
                  }}
                  className={`h-12 ${error ? "border-destructive" : ""}`}
                />
                {error && (
                  <p className="text-destructive text-sm mt-2">{error}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Phone → 10 digits | Email → valid format
                </p>
              </div>

              <Button 
                onClick={handleGetOTP}
                className="w-full h-12 bg-gold hover:bg-gold/90 text-foreground font-medium"
              >
                Get OTP
              </Button>

              {/* Helper Links */}
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  New user?{" "}
                  <Link to="/register" className="text-gold hover:underline font-medium">
                    Register
                  </Link>
                </p>
              </div>

              {/* Terms */}
              <p className="text-xs text-center text-muted-foreground">
                By continuing, you agree to Parampare's{" "}
                <Link to="/terms" className="text-gold hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
