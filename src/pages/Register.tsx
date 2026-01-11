import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetOTP = () => {
    if (validateForm()) {
      navigate("/verify-otp", { 
        state: { 
          identifier: formData.mobile, 
          isLogin: false,
          userData: formData,
          returnTo: "/" 
        } 
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
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

            {/* Registration Form */}
            <div className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={`h-12 ${errors.fullName ? "border-destructive" : ""}`}
                />
                {errors.fullName && (
                  <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
                  Mobile Number
                </label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className={`h-12 ${errors.mobile ? "border-destructive" : ""}`}
                />
                {errors.mobile && (
                  <p className="text-destructive text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`h-12 ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                We'll send a one-time password (OTP) to verify you
              </p>

              <Button 
                onClick={handleGetOTP}
                className="w-full h-12 bg-gold hover:bg-gold/90 text-foreground font-medium"
              >
                Get OTP
              </Button>

              {/* Helper Links */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-gold hover:underline font-medium">
                    Login
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

export default Register;
