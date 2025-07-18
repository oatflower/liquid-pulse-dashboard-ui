
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

// Import all page components
import AccountManagement from './AccountManagement';
import CardInventory from './CardInventory';
import TransactionManagement from './TransactionManagement';
import MerchantManagement from './MerchantManagement';
import SettlementReconciliation from './SettlementReconciliation';
import ComplianceAudit from './ComplianceAudit';
import SecurityFraud from './SecurityFraud';
import IntegrationAPI from './IntegrationAPI';
import NotificationManagement from './NotificationManagement';
import Configuration from './Configuration';
import GiftCardManagement from './GiftCardManagement';
import DeviceMonitoring from './DeviceMonitoring';
import CustomerSupport from './CustomerSupport';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        
        <main className="flex-1 overflow-auto">
          <DashboardHeader />
          
          <div className="p-6 space-y-6">
            {/* Dashboard Analytics Content */}
            {activeModule === 'dashboard' && (
              <>
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
              </>
            )}

            {/* Account & Role Management */}
            {activeModule === 'accounts' && <AccountManagement />}
            
            {/* Card & Inventory Management */}
            {activeModule === 'cards' && <CardInventory />}
            
            {/* Transaction Management */}
            {activeModule === 'transactions' && <TransactionManagement />}
            
            {/* Merchant & Tenant Management */}
            {activeModule === 'merchants' && <MerchantManagement />}
            
            {/* Settlement & Reconciliation */}
            {activeModule === 'settlement' && <SettlementReconciliation />}
            
            {/* Compliance & Audit */}
            {activeModule === 'compliance' && <ComplianceAudit />}
            
            {/* Security & Fraud Detection */}
            {activeModule === 'security' && <SecurityFraud />}
            
            {/* Integration & API Management */}
            {activeModule === 'integration' && <IntegrationAPI />}
            
            {/* Notification & Communication */}
            {activeModule === 'notifications' && <NotificationManagement />}
            
            {/* Configuration & Settings */}
            {activeModule === 'settings' && <Configuration />}
            
            {/* Gift Card Management */}
            {activeModule === 'gift-cards' && <GiftCardManagement />}
            
            {/* Device & Infrastructure Monitoring */}
            {activeModule === 'device-monitoring' && <DeviceMonitoring />}
            
            {/* Customer Support Tools */}
            {activeModule === 'customer-support' && <CustomerSupport />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
