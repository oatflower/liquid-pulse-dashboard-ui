
import React from 'react';
import { 
  BarChart3, 
  CreditCard, 
  Users, 
  Store, 
  FileText, 
  Shield, 
  Settings, 
  Bell,
  PlusCircle,
  Layers,
  TrendingUp
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const menuItems = [
  {
    title: 'Dashboard & Analytics',
    icon: BarChart3,
    id: 'dashboard',
    items: [
      { title: 'Overview', id: 'overview' },
      { title: 'Top-Up Analytics', id: 'topup' },
      { title: 'Merchant Spending', id: 'merchant-spending' },
      { title: 'Demographics', id: 'demographics' },
      { title: 'Card Expiry', id: 'expiry' },
      { title: 'Insights & Alerts', id: 'insights' },
    ]
  },
  {
    title: 'Account & Role Management',
    icon: Users,
    id: 'accounts',
    items: [
      { title: 'User Roles', id: 'roles' },
      { title: 'Permissions', id: 'permissions' },
      { title: 'Audit Trail', id: 'audit' },
      { title: 'SSO Setup', id: 'sso' },
    ]
  },
  {
    title: 'Card & Inventory',
    icon: CreditCard,
    id: 'cards',
    items: [
      { title: 'Corporate Generation', id: 'corporate' },
      { title: 'Card Issuance', id: 'issuance' },
      { title: 'Top-Up & Reload', id: 'reload' },
      { title: 'Card Status', id: 'status' },
    ]
  },
  {
    title: 'Transaction Management',
    icon: TrendingUp,
    id: 'transactions',
    items: [
      { title: 'Transaction Feed', id: 'feed' },
      { title: 'Redemption', id: 'redemption' },
      { title: 'Refunds', id: 'refunds' },
      { title: 'Disputes', id: 'disputes' },
    ]
  },
  {
    title: 'Merchant & Tenant',
    icon: Store,
    id: 'merchants',
    items: [
      { title: 'Onboarding', id: 'onboarding' },
      { title: 'Merchant Dashboard', id: 'merchant-dash' },
      { title: 'Fee Structure', id: 'fees' },
      { title: 'Settlement', id: 'settlement' },
    ]
  },
  {
    title: 'Compliance & Audit',
    icon: Shield,
    id: 'compliance',
    items: [
      { title: 'Regulatory Reports', id: 'reports' },
      { title: 'Data Retention', id: 'retention' },
      { title: 'Consent Management', id: 'consent' },
    ]
  },
  {
    title: 'Integration & API',
    icon: Layers,
    id: 'integration',
    items: [
      { title: 'API Catalog', id: 'catalog' },
      { title: 'Sandbox', id: 'sandbox' },
      { title: 'Webhooks', id: 'webhooks' },
      { title: 'Status Dashboard', id: 'api-status' },
    ]
  },
  {
    title: 'Notifications',
    icon: Bell,
    id: 'notifications',
    items: [
      { title: 'System Alerts', id: 'alerts' },
      { title: 'Templates', id: 'templates' },
      { title: 'Scheduled', id: 'scheduled' },
    ]
  },
  {
    title: 'Configuration',
    icon: Settings,
    id: 'settings',
    items: [
      { title: 'Business Rules', id: 'rules' },
      { title: 'Localization', id: 'localization' },
      { title: 'Feature Flags', id: 'flags' },
    ]
  },
];

export function AppSidebar({ activeModule, setActiveModule }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r border-white/20 bg-white/5 backdrop-blur-xl">
      <SidebarHeader className="border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold text-slate-800">GiftCard Pro</h1>
              <p className="text-xs text-slate-500">Closed-Loop System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveModule(item.id)}
                    className={`
                      group relative rounded-xl transition-all duration-200 
                      hover:bg-white/10 hover:backdrop-blur-sm
                      ${activeModule === item.id 
                        ? 'bg-white/15 text-blue-600 shadow-lg shadow-blue-500/10' 
                        : 'text-slate-700 hover:text-slate-900'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
