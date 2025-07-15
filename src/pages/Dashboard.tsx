
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { TransactionFeed } from '@/components/dashboard/TransactionFeed';
import { MerchantSpending } from '@/components/dashboard/MerchantSpending';
import { CustomerDemographics } from '@/components/dashboard/CustomerDemographics';
import { CardExpiryAlerts } from '@/components/dashboard/CardExpiryAlerts';
import { TopUpAnalytics } from '@/components/dashboard/TopUpAnalytics';
import { InsightsAlerts } from '@/components/dashboard/InsightsAlerts';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <AppSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        
        <main className="flex-1 overflow-auto">
          <DashboardHeader />
          
          <div className="p-6 space-y-6">
            {/* Dashboard Overview Cards */}
            <DashboardOverview />
            
            {/* Top-Up Analytics */}
            <TopUpAnalytics />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Merchant Spending */}
              <MerchantSpending />
              
              {/* Customer Demographics */}
              <CustomerDemographics />
            </div>
            
            {/* Card Expiry & Insights */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CardExpiryAlerts />
              <InsightsAlerts />
            </div>
            
            {/* Transaction Feed */}
            <TransactionFeed />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
