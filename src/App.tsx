
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Dashboard from "./pages/Dashboard";
import AddCardOneByOne from "./pages/AddCardOneByOne";
import TransactionRuleConfiguration from "./pages/TransactionRuleConfiguration";
import { MerchantSpendingDetails } from "./pages/MerchantSpendingDetails";
import UserProfile from "./pages/UserProfile";
import AccountManagement from "./pages/AccountManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <div className="dark">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-card-one-by-one" element={<AddCardOneByOne />} />
          <Route path="/transaction-rule-configuration" element={<TransactionRuleConfiguration />} />
          <Route path="/merchant-spending-details" element={<MerchantSpendingDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/account-management" element={<AccountManagement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
