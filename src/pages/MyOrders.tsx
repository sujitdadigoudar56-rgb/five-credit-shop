import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ChevronRight, Truck } from "lucide-react";
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
              <div className="p-4 md:p-6">
                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {order.status === "Order Confirmed"
                        ? `Arriving ${formatDate(order.estimatedDelivery)}`
                        : order.status}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={order.status === "Order Confirmed"}
                    className="gap-2"
                  >
                    <Truck className="h-4 w-4" />
                    Track Your Order
                  </Button>
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
