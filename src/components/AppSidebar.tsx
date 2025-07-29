import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BarChart3, CreditCard, Users, Store, FileText, Shield, Settings, Bell, PlusCircle, Layers, TrendingUp, DollarSign, AlertTriangle, Zap, MessageSquare, Globe } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
const menuItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    id: 'dashboard',
    path: '/'
  },
  {
    title: 'Tier Management',
    icon: Users,
    id: 'tier-management',
    path: '/tier-management'
  },
  {
    title: 'KYM Process',
    icon: Shield,
    id: 'kym-process',
    path: '/kym-process'
  },
  {
    title: 'Top-Up Fund',
    icon: DollarSign,
    id: 'topup-fund',
    path: '/topup-fund'
  },
  {
    title: 'Max Value Tracking',
    icon: TrendingUp,
    id: 'max-value-tracking',
    path: '/max-value-tracking'
  },
  {
    title: 'Deactivation',
    icon: AlertTriangle,
    id: 'deactivation',
    path: '/deactivation'
  },
  {
    title: 'Purchase Receipt',
    icon: FileText,
    id: 'purchase-receipt',
    path: '/purchase-receipt'
  },
  {
    title: 'E-Gift Card',
    icon: CreditCard,
    id: 'egift-card',
    path: '/egift-card'
  },
  {
    title: 'Card Inventory',
    icon: Store,
    id: 'card-inventory',
    path: '/card-inventory'
  },
  {
    title: 'Transaction Management',
    icon: Globe,
    id: 'transaction-management',
    path: '/transaction-management'
  },
  {
    title: 'Account Management',
    icon: Users,
    id: 'account-management',
    path: '/account-management'
  },
  {
    title: 'Notification',
    icon: Bell,
    id: 'notifications',
    path: '/notifications'
  },
  {
    title: 'Settings',
    icon: Settings,
    id: 'settings',
    path: '/settings'
  }
];
export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  return <Sidebar className="border-r border-sidebar-border bg-sidebar-background shadow-sm">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sidebar-primary flex items-center justify-center shadow-lg">
            <CreditCard className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && <div>
              <h1 className="text-xl font-semibold text-sidebar-foreground tracking-tight">ONE BANGKOK</h1>
              <p className="text-sm text-sidebar-foreground/60 font-medium">GIFT CARD PRO</p>
            </div>}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild 
                      className={`group relative h-11 rounded-xl transition-all duration-200 border-0 ${
                        isActive 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium' 
                          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                      }`}
                    >
                      <Link to={item.path} className="flex items-center gap-3 px-3">
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-sidebar-primary-foreground' : ''}`} />
                        {!isCollapsed && <span className="font-medium text-[15px]">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}