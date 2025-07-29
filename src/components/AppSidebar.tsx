import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BarChart3, CreditCard, Users, Store, FileText, Shield, Settings, Bell, PlusCircle, Layers, TrendingUp, DollarSign, AlertTriangle, Zap, MessageSquare, Globe } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
const dashboardItem = {
  title: 'Dashboard',
  icon: BarChart3,
  id: 'dashboard',
  path: '/'
};
const menuGroups = [{
  label: 'Card Operations',
  items: [{
    title: 'Tier Management',
    icon: Users,
    id: 'tier-management',
    path: '/tier-management'
  }, {
    title: 'Top-Up Fund',
    icon: DollarSign,
    id: 'topup-fund',
    path: '/topup-fund'
  }, {
    title: 'Max Value Tracking',
    icon: TrendingUp,
    id: 'max-value-tracking',
    path: '/max-value-tracking'
  }, {
    title: 'Deactivation',
    icon: AlertTriangle,
    id: 'deactivation',
    path: '/deactivation'
  }, {
    title: 'Purchase Receipt',
    icon: FileText,
    id: 'purchase-receipt',
    path: '/purchase-receipt'
  }, {
    title: 'E-Gift Card',
    icon: CreditCard,
    id: 'egift-card',
    path: '/egift-card'
  }, {
    title: 'Transaction Management',
    icon: Globe,
    id: 'transaction-management',
    path: '/transaction-management'
  }, {
    title: 'KYM Process',
    icon: Shield,
    id: 'kym-process',
    path: '/kym-process'
  }, {
    title: 'Campaign Management',
    icon: Store,
    id: 'campaign-management',
    path: '/card-inventory'
  }]
}, {
  label: 'User & Admin',
  items: [{
    title: 'Account Management',
    icon: Users,
    id: 'account-management',
    path: '/account-management'
  }, {
    title: 'Notification',
    icon: Bell,
    id: 'notifications',
    path: '/notifications'
  }, {
    title: 'Settings',
    icon: Settings,
    id: 'settings',
    path: '/settings'
  }]
}];
export function AppSidebar() {
  const location = useLocation();
  const {
    state
  } = useSidebar();
  const isCollapsed = state === 'collapsed';
  return <Sidebar className="border-r border-sidebar-border bg-sidebar-background shadow-sm">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          
          {!isCollapsed && <div>
              <h1 className="text-xl font-semibold text-sidebar-foreground tracking-tight">ONE BANGKOK</h1>
              <p className="text-sm text-sidebar-foreground/60 font-medium">GIFT CARD PRO</p>
            </div>}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        {/* Dashboard Item */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {(() => {
              const isActive = location.pathname === dashboardItem.path;
              return <SidebarMenuItem key={dashboardItem.id}>
                    <SidebarMenuButton asChild className={`group relative h-11 rounded-xl transition-all duration-200 border-0 ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'}`}>
                      <Link to={dashboardItem.path} className="flex items-center gap-3 px-3">
                        <dashboardItem.icon className={`w-5 h-5 ${isActive ? 'text-sidebar-primary-foreground' : ''}`} />
                        {!isCollapsed && <span className="font-medium text-[15px]">{dashboardItem.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
            })()}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grouped Menu Items */}
        {menuGroups.map((group, groupIndex) => <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel className="text-sidebar-foreground/60 font-medium text-xs uppercase tracking-wide px-3 py-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map(item => {
              const isActive = location.pathname === item.path;
              return <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild className={`group relative h-11 rounded-xl transition-all duration-200 border-0 ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md font-medium' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'}`}>
                        <Link to={item.path} className="flex items-center gap-3 px-3">
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-sidebar-primary-foreground' : ''}`} />
                          {!isCollapsed && <span className="font-medium text-[15px]">{item.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>;
            })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>)}
      </SidebarContent>
    </Sidebar>;
}