import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BarChart3,
  Users,
  CreditCard,
  Activity,
  Building2,
  Calculator,
  Shield,
  Globe,
  Bell,
  Settings2,
  Gift,
  Monitor,
  HeadphonesIcon,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

interface AppSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export default function AppSidebar({ activeModule, setActiveModule }: AppSidebarProps) {
  const { t } = useLanguage();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    dashboard: true,
  });

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const menuItems = [
    {
      title: t('navigation.dashboard'),
      icon: BarChart3,
      id: 'dashboard',
      items: [
        { title: t('navigation.overview'), id: 'overview' },
        { title: t('navigation.keyMetrics'), id: 'key-metrics' },
        { title: t('navigation.trendForecast'), id: 'trend-forecast' },
        { title: t('navigation.topupOverview'), id: 'topup-overview' },
        { title: t('navigation.merchantSpending'), id: 'merchant-spending' },
        { title: t('navigation.demographics'), id: 'demographics' },
        { title: t('navigation.expiryAlerts'), id: 'expiry-alerts' },
        { title: t('navigation.insightsAlerts'), id: 'insights-alerts' },
      ]
    },
    {
      title: t('navigation.accountManagement'),
      icon: Users,
      id: 'accounts',
      items: [
        { title: t('navigation.rolesPermissions'), id: 'roles-permissions' },
        { title: t('navigation.auditTrail'), id: 'audit-trail' },
        { title: t('navigation.ssoIntegration'), id: 'sso-integration' },
        { title: t('navigation.roleHierarchy'), id: 'role-hierarchy' },
        { title: t('navigation.sessionManagement'), id: 'session-management' },
      ]
    },
    {
      title: t('navigation.cardInventory'),
      icon: CreditCard,
      id: 'cards',
      items: [
        { title: t('navigation.corporateGeneration'), id: 'corporate-generation' },
        { title: t('navigation.cardIssuance'), id: 'card-issuance' },
        { title: t('navigation.topupReload'), id: 'topup-reload' },
        { title: t('navigation.cardStatus'), id: 'card-status' },
      ]
    },
    {
      title: t('navigation.transactionManagement'),
      icon: Activity,
      id: 'transactions',
      items: [
        { title: t('navigation.realTimeFeed'), id: 'real-time-feed' },
        { title: t('navigation.partialRedemption'), id: 'partial-redemption' },
        { title: t('navigation.reversalRefund'), id: 'reversal-refund' },
        { title: t('navigation.disputeHandling'), id: 'dispute-handling' },
      ]
    },
    {
      title: t('navigation.merchantManagement'),
      icon: Building2,
      id: 'merchants',
      items: [
        { title: t('navigation.onboarding'), id: 'onboarding' },
        { title: t('navigation.merchantDashboard'), id: 'merchant-dashboard' },
        { title: t('navigation.feeStructure'), id: 'fee-structure' },
        { title: t('navigation.settlementCycle'), id: 'settlement-cycle' },
      ]
    },
    {
      title: t('navigation.settlementReconciliation'),
      icon: Calculator,
      id: 'settlement',
      items: [
        { title: t('navigation.automatedReconciliation'), id: 'automated-reconciliation' },
        { title: t('navigation.settlementFiles'), id: 'settlement-files' },
        { title: t('navigation.floatManagement'), id: 'float-management' },
      ]
    },
    {
      title: t('navigation.complianceAudit'),
      icon: Shield,
      id: 'compliance',
      items: [
        { title: t('navigation.regulatoryReporting'), id: 'regulatory-reporting' },
        { title: t('navigation.dataRetention'), id: 'data-retention' },
        { title: t('navigation.consentManagement'), id: 'consent-management' },
      ]
    },
    {
      title: t('navigation.securityFraud'),
      icon: Shield,
      id: 'security',
      items: [
        { title: t('navigation.authenticationMfa'), id: 'authentication-mfa' },
        { title: t('navigation.fraudRules'), id: 'fraud-rules' },
        { title: t('navigation.encryptionSettings'), id: 'encryption-settings' },
      ]
    },
    {
      title: t('navigation.integrationApi'),
      icon: Globe,
      id: 'integration',
      items: [
        { title: t('navigation.apiCatalog'), id: 'api-catalog' },
        { title: t('navigation.sandbox'), id: 'sandbox' },
        { title: t('navigation.webhooks'), id: 'webhooks' },
        { title: t('navigation.rateLimiting'), id: 'rate-limiting' },
      ]
    },
    {
      title: t('navigation.notificationManagement'),
      icon: Bell,
      id: 'notifications',
      items: [
        { title: t('navigation.systemAlerts'), id: 'system-alerts' },
        { title: t('navigation.scheduledNotifications'), id: 'scheduled-notifications' },
        { title: t('navigation.emailSmsTemplates'), id: 'email-sms-templates' },
      ]
    },
    {
      title: t('navigation.reportingAnalytics'),
      icon: BarChart3,
      id: 'reporting',
      items: [
        { title: t('navigation.liabilityReporting'), id: 'liability-reporting' },
        { title: t('navigation.salesPerformance'), id: 'sales-performance' },
        { title: t('navigation.visualizationTools'), id: 'visualization-tools' },
      ]
    },
    {
      title: t('navigation.configuration'),
      icon: Settings2,
      id: 'settings',
      items: [
        { title: t('navigation.businessRules'), id: 'business-rules' },
        { title: t('navigation.localization'), id: 'localization' },
        { title: t('navigation.featureFlags'), id: 'feature-flags' },
      ]
    },
  ];

  const quickAccessItems = [
    { id: 'gift-cards', title: t('navigation.giftCards'), icon: Gift, badge: '2,847 ' + t('dashboard.activeCards') },
    { id: 'device-monitoring', title: t('navigation.deviceMonitoring'), icon: Monitor, badge: '98% ' + t('dashboard.uptime') },
    { id: 'customer-support', title: t('navigation.customerSupport'), icon: HeadphonesIcon, badge: '12 ' + t('dashboard.pending') },
  ];

  return (
    <Sidebar className="border-r border-border bg-card/50 backdrop-blur-sm">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">One Bangkok</h2>
            <p className="text-xs text-muted-foreground">{t('navigation.giftCards')}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-0">
        <div className="p-2">
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {t('common.overview')}
          </p>
          <div className="space-y-1">
            {quickAccessItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeModule === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left truncate">{item.title}</span>
                {item.badge && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        <div className="p-2">
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {t('common.management')}
          </p>
          <div className="space-y-1">
            {menuItems.map((menu) => (
              <div key={menu.id}>
                <button
                  onClick={() => toggleMenu(menu.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted text-foreground"
                >
                  <menu.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{menu.title}</span>
                  {openMenus[menu.id] ? (
                    <ChevronDown className="w-3 h-3 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  )}
                </button>
                {openMenus[menu.id] && (
                  <div className="mt-1 space-y-1">
                    {menu.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveModule(getModuleId(menu.id, item.id))}
                        className={`w-full flex items-center gap-3 px-6 py-1.5 text-sm rounded-lg transition-colors ${
                          activeModule === getModuleId(menu.id, item.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <span className="text-left truncate">{item.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

// Helper function to map menu items to module IDs
function getModuleId(menuId: string, itemId: string): string {
  const moduleMap: Record<string, string> = {
    'accounts': 'account-management',
    'cards': 'card-inventory',
    'transactions': 'transaction-management',
    'merchants': 'merchant-management',
    'settlement': 'settlement-reconciliation',
    'compliance': 'compliance-audit',
    'security': 'security-fraud',
    'integration': 'integration-api',
    'notifications': 'notification-management',
    'reporting': 'reporting-analytics',
    'settings': 'configuration',
  };
  
  return moduleMap[menuId] || 'dashboard';
}