
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import Layout from "@/components/layout/Layout";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Users, Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for dashboard
  const salesData = [
    { name: "Jan", total: 1800 },
    { name: "Feb", total: 2200 },
    { name: "Mar", total: 2700 },
    { name: "Apr", total: 2400 },
    { name: "May", total: 3100 },
    { name: "Jun", total: 2800 },
    { name: "Jul", total: 3500 },
    { name: "Aug", total: 3200 },
    { name: "Sep", total: 3800 },
    { name: "Oct", total: 4000 },
    { name: "Nov", total: 4500 },
    { name: "Dec", total: 5200 },
  ];

  const categorySalesData = [
    { name: "Electronics", value: 5400 },
    { name: "Furniture", value: 3200 },
    { name: "Home & Living", value: 2100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(28500),
      icon: <DollarSign className="h-4 w-4" />,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Total Orders",
      value: "384",
      icon: <ShoppingCart className="h-4 w-4" />,
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Total Products",
      value: products.length.toString(),
      icon: <Package className="h-4 w-4" />,
      change: "0",
      changeType: "neutral",
    },
    {
      title: "Total Customers",
      value: "1,294",
      icon: <Users className="h-4 w-4" />,
      change: "+18.7%",
      changeType: "positive",
    },
  ];

  // Redirect if not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`rounded-full p-2 ${
                      stat.changeType === "positive" ? "bg-green-100 text-green-600" : 
                      stat.changeType === "negative" ? "bg-red-100 text-red-600" : 
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className={`flex items-center ${
                      stat.changeType === "positive" ? "text-green-600" : 
                      stat.changeType === "negative" ? "text-red-600" : 
                      "text-gray-600"
                    }`}>
                      {stat.changeType !== "neutral" && <TrendingUp className="mr-1 h-3 w-3" />}
                      {stat.change}
                    </span>
                    <span className="ml-1 text-muted-foreground">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Sales Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Monthly revenue for the current year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => 
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(value)
                        } 
                      />
                      <Tooltip 
                        formatter={(value) => 
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(Number(value))
                        }
                      />
                      <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>
                  Distribution of sales across product categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categorySalesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categorySalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => 
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(Number(value))
                        }
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>
                View and manage your product inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The product management interface will be implemented in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>
                View and manage customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The order management interface will be implemented in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                View and manage customer accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The customer management interface will be implemented in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;
