import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ChevronRight, Truck, CheckCircle2, Clock, PackageCheck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

interface Order {
  id: string;
  date: string;
  items: any[];
  address: any;
  status: string;
  paymentMethod: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  estimatedDelivery: string;
  trackingNumber?: string;
}

// Order tracking steps component
const OrderTrackingSteps = ({ status }: { status: string }) => {
  const steps = [
    { id: 1, label: "Order Confirmed", icon: CheckCircle2 },
    { id: 2, label: "Processing", icon: Clock },
    { id: 3, label: "Shipped", icon: Truck },
    { id: 4, label: "Out for Delivery", icon: PackageCheck },
    { id: 5, label: "Delivered", icon: Home },
  ];

  const getActiveStep = () => {
    switch (status.toLowerCase()) {
      case "order confirmed": return 1;
      case "processing": return 2;
      case "shipped": return 3;
      case "out for delivery": return 4;
      case "delivered": return 5;
      case "cancelled": return 0;
      default: return 1;
    }
  };

  const activeStep = getActiveStep();

  if (status.toLowerCase() === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg">
        <Package className="h-5 w-5" />
        <span className="font-medium">Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border mx-8">
        <div 
          className="h-full bg-gold transition-all duration-500"
          style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id <= activeStep;
          const isCurrent = step.id === activeStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                  isActive
                    ? "bg-gold text-foreground"
                    : "bg-secondary text-muted-foreground"
                } ${isCurrent ? "ring-4 ring-gold/30" : ""}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`text-xs mt-2 text-center max-w-[70px] ${
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: "/orders" } });
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, [navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "order confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background font-body">
        <TopUtilityHeader />
        <MainHeader />
        <main className="container mx-auto px-4 py-16 text-center">
          <Package className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-display font-semibold text-foreground mb-4">
            No Orders Yet
          </h1>
          <p className="text-muted-foreground mb-8">
            Start shopping to see your orders here.
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="bg-gold hover:bg-gold/90 text-foreground"
          >
            Start Shopping
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">My Orders</span>
        </nav>

        <h1 className="text-3xl font-display font-semibold text-foreground mb-8">
          My Orders
        </h1>

        <p className="text-muted-foreground mb-6">
          Orders placed in past 3 months
        </p>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-card rounded-xl border border-border/50 shadow-soft overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-secondary/50 px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-sm">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-muted-foreground">ORDER PLACED</p>
                    <p className="font-medium">{formatDate(order.date)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">TOTAL</p>
                    <p className="font-medium">₹{order.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">SHIP TO</p>
                    <p className="font-medium">{order.address.fullName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">ORDER # {order.id}</p>
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-gold hover:underline text-sm"
                  >
                    View order details
                  </Link>
                </div>
              </div>

              {/* Order Status & Items */}
              <div className="p-4 md:p-6 space-y-6">
                {/* Order Tracking Steps */}
                <div className="pb-6 border-b border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-foreground">
                      {order.status === "Order Confirmed"
                        ? `Arriving ${formatDate(order.estimatedDelivery)}`
                        : order.status}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={order.status === "Order Confirmed" || order.status === "Processing"}
                      className="gap-2"
                      onClick={() => {
                        if (order.trackingNumber) {
                          window.open(`https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx`, '_blank');
                        }
                      }}
                    >
                      <Truck className="h-4 w-4" />
                      Track Order
                    </Button>
                  </div>
                  <OrderTrackingSteps status={order.status} />
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <div className="w-20 h-24 rounded-lg overflow-hidden bg-secondary">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium text-foreground hover:text-gold transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-semibold mt-1">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <Link
                        to={`/product/${item.id}`}
                        className="hidden md:flex items-center text-gold hover:underline text-sm"
                      >
                        Buy again
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyOrders;
