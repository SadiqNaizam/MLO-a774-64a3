import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Ensure this is correctly named if you have two toasters
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductCategoryLandingPage from "./pages/ProductCategoryLandingPage";
import GenericContentPage from "./pages/GenericContentPage";
import SearchOverlayPage from "./pages/SearchOverlayPage";
import BagPage from "./pages/BagPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App: React.FC = () => {
  console.log("App loaded, router configured.");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Shadcn Toaster */}
        <Toaster />
        {/* Sonner Toaster (if used separately) */}
        <Sonner /> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product-category-landing-page" element={<ProductCategoryLandingPage />} />
            <Route path="/generic-content-page" element={<GenericContentPage />} />
            <Route path="/search-overlay" element={<SearchOverlayPage />} />
            <Route path="/bag-page" element={<BagPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;