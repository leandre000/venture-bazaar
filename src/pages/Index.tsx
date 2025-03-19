
import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/ui-custom/Hero";
import FeaturedProducts from "@/components/ui-custom/FeaturedProducts";
import CategorySection from "@/components/ui-custom/CategorySection";
import { StoreProvider } from "@/context/StoreContext";
import { AuthProvider } from "@/context/AuthContext";

const Index = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <Layout fullWidth>
          <Hero />
          <div className="container mx-auto px-4 md:px-6">
            <FeaturedProducts />
            <CategorySection />
          </div>
        </Layout>
      </StoreProvider>
    </AuthProvider>
  );
};

export default Index;
