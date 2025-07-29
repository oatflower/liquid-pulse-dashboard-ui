
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import TierManagement from "./pages/TierManagement";
import KYMProcessManagement from "./pages/KYMProcessManagement";
import TopUpFundManagement from "./pages/TopUpFundManagement";
import MaxValueTracking from "./pages/MaxValueTracking";
import DeactivationManagement from "./pages/DeactivationManagement";
import PurchaseReceiptManagement from "./pages/PurchaseReceiptManagement";
import EGiftCardManagement from "./pages/EGiftCardManagement";
import AddCardOneByOne from "./pages/AddCardOneByOne";
import TransactionRuleConfiguration from "./pages/TransactionRuleConfiguration";
import { MerchantSpendingDetails } from "./pages/MerchantSpendingDetails";
import UserProfile from "./pages/UserProfile";
import AccountManagement from "./pages/AccountManagement";
import CampaignManagement from "./pages/CampaignManagement";
import CardInventory from "./pages/CardInventory";
import TransactionManagement from "./pages/TransactionManagement";
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
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <div className="flex-1">
                  <header className="h-12 flex items-center border-b bg-background">
                    <SidebarTrigger className="ml-4" />
                    <h1 className="ml-4 text-lg font-semibold">Back Office Portal</h1>
                  </header>
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/tier-management" element={<TierManagement />} />
                      <Route path="/kym-process" element={<KYMProcessManagement />} />
                      <Route path="/topup-fund" element={<TopUpFundManagement />} />
                      <Route path="/max-value-tracking" element={<MaxValueTracking />} />
                      <Route path="/deactivation" element={<DeactivationManagement />} />
                      <Route path="/purchase-receipt" element={<PurchaseReceiptManagement />} />
                      <Route path="/egift-card" element={<EGiftCardManagement />} />
                      <Route path="/campaign-management" element={<CampaignManagement />} />
                      <Route path="/card-inventory" element={<CardInventory />} />
                      <Route path="/transaction-management" element={<TransactionManagement />} />
                      <Route path="/add-card-one-by-one" element={<AddCardOneByOne />} />
                      <Route path="/transaction-rule-configuration" element={<TransactionRuleConfiguration />} />
                      <Route path="/merchant-spending-details" element={<MerchantSpendingDetails />} />
                      <Route path="/user-profile" element={<UserProfile />} />
                      <Route path="/account-management" element={<AccountManagement />} />
                      <Route path="/notifications" element={<NotFound />} />
                      <Route path="/settings" element={<NotFound />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
