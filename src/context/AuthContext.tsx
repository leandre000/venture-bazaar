
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// User type definition
export type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

// Auth context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo admin user
const adminUser: User = {
  id: "admin-1",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
};

// Demo regular user
const regularUser: User = {
  id: "user-1",
  email: "user@example.com",
  name: "Regular User",
  role: "user",
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Update local storage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Login function - in a real app this would call an API
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Demo login logic
      if (email === "admin@example.com" && password === "admin") {
        setUser(adminUser);
        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        });
      } else if (email === "user@example.com" && password === "user") {
        setUser(regularUser);
        toast({
          title: "Login successful",
          description: "Welcome back, User!",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // Register function - in a real app this would call an API
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Demo registration logic
      if (email === "admin@example.com" || email === "user@example.com") {
        throw new Error("Email already in use");
      }
      
      // Create a new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: "user",
      };
      
      setUser(newUser);
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Computed properties
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  // Context value
  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
