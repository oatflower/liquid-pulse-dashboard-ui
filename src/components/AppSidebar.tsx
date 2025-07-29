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
    title: 'Campaign Management',
    icon: Layers,
    id: 'campaign-management',
    path: '/campaign-management'
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
              {menuItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild 
                      className={`group relative rounded-lg transition-all duration-200 hover:bg-muted/50 border-0 ${
                        isActive 
                          ? 'bg-primary/10 text-primary shadow-none' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Link to={item.path}>
                        <item.icon className="w-5 h-5" />
                        {!isCollapsed && <span className="font-normal">{item.title}</span>}
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