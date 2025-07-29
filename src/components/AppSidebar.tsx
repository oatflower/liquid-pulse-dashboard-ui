import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BarChart3, CreditCard, Users, Store, FileText, Shield, Settings, Bell, PlusCircle, Layers, TrendingUp, DollarSign, AlertTriangle, Zap, MessageSquare, Globe } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
const menuItems = [{
  title: 'Dashboard & Analytics',
  icon: BarChart3,
  id: 'dashboard',
  items: [{
    title: 'Overview',
    id: 'overview'
  }, {
    title: 'Key Metrics',
    id: 'key-metrics'
  }, {
    title: 'Trend & Forecast',
    id: 'trend-forecast'
  }, {
    title: 'Top-Up Overview',
    id: 'topup-overview'
  }, {
    title: 'Merchant Spending',
    id: 'merchant-spending'
  }, {
    title: 'Customer Demographics',
    id: 'demographics'
  }, {
    title: 'Expiry Alerts',
    id: 'expiry-alerts'
  }, {
    title: 'Insights & Alerts',
    id: 'insights-alerts'
  }]
}, {
  title: 'Account & Role Management',
  icon: Users,
  id: 'accounts',
  items: [{
    title: 'Roles & Permissions',
    id: 'roles-permissions'
  }, {
    title: 'Audit Trail',
    id: 'audit-trail'
  }, {
    title: 'SSO Integration',
    id: 'sso-integration'
  }, {
    title: 'Role Hierarchy',
    id: 'role-hierarchy'
  }, {
    title: 'Session Management',
    id: 'session-management'
  }]
}, {
  title: 'Card & Inventory',
  icon: CreditCard,
  id: 'cards',
  items: [{
    title: 'Corporate Generation',
    id: 'corporate-generation'
  }, {
    title: 'Physical & E-Gift Issuance',
    id: 'card-issuance'
  }, {
    title: 'Top-Up & Reload',
    id: 'topup-reload'
  }, {
    title: 'Card Status & Expiry',
    id: 'card-status'
  }, {
    title: 'Transaction Management',
    id: 'transaction-management'
  }]
}, {
  title: 'Merchant & Tenant',
  icon: Store,
  id: 'merchants',
  items: [{
    title: 'Onboarding',
    id: 'merchant-onboarding'
  }, {
    title: 'Merchant Dashboard',
    id: 'merchant-dashboard'
  }, {
    title: 'Fee Structure',
    id: 'fee-structure'
  }, {
    title: 'Settlement Cycle',
    id: 'settlement-cycle'
  }]
}, {
  title: 'Settlement & Reconciliation',
  icon: DollarSign,
  id: 'settlement',
  items: [{
    title: 'Automated Reconciliation',
    id: 'auto-reconciliation'
  }, {
    title: 'Settlement Export',
    id: 'settlement-export'
  }, {
    title: 'Float Management',
    id: 'float-management'
  }]
}, {
  title: 'Compliance & Audit',
  icon: Shield,
  id: 'compliance',
  items: [{
    title: 'Regulatory Reporting',
    id: 'regulatory-reporting'
  }, {
    title: 'Data Retention',
    id: 'data-retention'
  }, {
    title: 'Consent Management',
    id: 'consent-management'
  }]
}, {
  title: 'Security & Fraud',
  icon: AlertTriangle,
  id: 'security',
  items: [{
    title: 'Authentication & MFA',
    id: 'auth-mfa'
  }, {
    title: 'Fraud Rules Engine',
    id: 'fraud-rules'
  }, {
    title: 'Encryption Settings',
    id: 'encryption'
  }]
}, {
  title: 'Integration & API',
  icon: Layers,
  id: 'integration',
  items: [{
    title: 'API Catalog & Sandbox',
    id: 'api-catalog'
  }, {
    title: 'Webhooks',
    id: 'webhooks'
  }, {
    title: 'Rate Limiting',
    id: 'rate-limiting'
  }, {
    title: 'API Status',
    id: 'api-status'
  }]
}, {
  title: 'Notifications',
  icon: Bell,
  id: 'notifications',
  items: [{
    title: 'System Alerts',
    id: 'system-alerts'
  }, {
    title: 'Scheduled Notifications',
    id: 'scheduled-notifications'
  }, {
    title: 'Email/SMS Templates',
    id: 'templates'
  }]
}, {
  title: 'Configuration',
  icon: Settings,
  id: 'settings',
  items: [{
    title: 'Business Rules',
    id: 'business-rules'
  }, {
    title: 'Localization',
    id: 'localization'
  }, {
    title: 'Feature Flags',
    id: 'feature-flags'
  }]
}];
export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  return <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && <div>
              <h1 className="text-xl font-light text-foreground">ONE BANGKOK</h1>
              <p className="text-sm text-muted-foreground">GIFT CARD PRO</p>
            </div>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild 
                    className="group relative rounded-lg transition-all duration-200 hover:bg-muted/50 border-0 text-muted-foreground hover:text-foreground"
                  >
                    <Link to="/">
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span className="font-normal">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}