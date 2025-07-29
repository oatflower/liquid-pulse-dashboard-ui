
import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { TransactionFeed } from '@/components/dashboard/TransactionFeed';
import { MerchantSpending } from '@/components/dashboard/MerchantSpending';
import { CustomerDemographics } from '@/components/dashboard/CustomerDemographics';
import { CardExpiryAlerts } from '@/components/dashboard/CardExpiryAlerts';
import { TopUpAnalytics } from '@/components/dashboard/TopUpAnalytics';
import { InsightsAlerts } from '@/components/dashboard/InsightsAlerts';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
};

export default Dashboard;
