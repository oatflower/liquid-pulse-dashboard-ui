import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Globe, Flag, Code, Save, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Configuration() {
  const { t } = useLanguage();
  
  const businessRules = [
    { name: t.configuration.businessRules.cardExpiryPeriod, value: `24 ${t.configuration.businessRules.months}`, category: t.configuration.businessRules.cards, editable: true },
    { name: t.configuration.businessRules.maximumCardValue, value: '$5,000', category: t.configuration.businessRules.cards, editable: true },
    { name: t.configuration.businessRules.minimumTopUpAmount, value: '$10', category: t.configuration.businessRules.topUp, editable: true },
    { name: t.configuration.businessRules.transactionTimeout, value: `30 ${t.configuration.businessRules.seconds}`, category: t.configuration.businessRules.transactions, editable: true },
    { name: t.configuration.businessRules.dailyTransactionLimit, value: '$2,000', category: t.configuration.businessRules.transactions, editable: true },
    { name: t.configuration.businessRules.settlementFrequency, value: t.configuration.businessRules.daily, category: t.configuration.businessRules.settlement, editable: true },
  ];

  const featureFlags = [
    { name: t.configuration.featureFlags.mobileAppIntegration, enabled: true, description: t.configuration.featureFlags.enableMobileCardManagement },
    { name: t.configuration.featureFlags.loyaltyPointsSystem, enabled: false, description: t.configuration.featureFlags.integrateWithLoyaltyProgram },
    { name: t.configuration.featureFlags.realTimeNotifications, enabled: true, description: t.configuration.featureFlags.pushNotificationsForTransactions },
    { name: t.configuration.featureFlags.advancedAnalytics, enabled: true, description: t.configuration.featureFlags.enhancedReportingAndAnalytics },
    { name: t.configuration.featureFlags.multiCurrencySupport, enabled: false, description: t.configuration.featureFlags.supportForMultipleCurrencies },
    { name: t.configuration.featureFlags.biometricAuthentication, enabled: false, description: t.configuration.featureFlags.fingerprintAndFaceIdSupport },
  ];

  const systemSettings = [
    { category: t.configuration.systemSettings.authentication, settings: [
      { name: t.configuration.systemSettings.sessionTimeout, value: `30 ${t.configuration.systemSettings.minutes}`, type: t.configuration.systemSettings.time },
      { name: t.configuration.systemSettings.passwordExpiry, value: `90 ${t.configuration.systemSettings.days}`, type: t.configuration.systemSettings.time },
      { name: t.configuration.systemSettings.failedLoginAttempts, value: '3', type: t.configuration.systemSettings.number },
    ]},
    { category: t.configuration.systemSettings.security, settings: [
      { name: t.configuration.systemSettings.encryptionLevel, value: 'AES-256', type: t.configuration.systemSettings.select },
      { name: t.configuration.systemSettings.tlsVersion, value: 'TLS 1.3', type: t.configuration.systemSettings.select },
      { name: t.configuration.systemSettings.apiRateLimiting, value: `1000${t.configuration.systemSettings.perMin}`, type: t.configuration.systemSettings.rate },
    ]},
    { category: t.configuration.systemSettings.performance, settings: [
      { name: t.configuration.systemSettings.databaseConnectionPool, value: '50', type: t.configuration.systemSettings.number },
      { name: t.configuration.systemSettings.cacheExpiry, value: `1 ${t.configuration.systemSettings.hour}`, type: t.configuration.systemSettings.time },
      { name: t.configuration.systemSettings.logRetention, value: `90 ${t.configuration.systemSettings.days}`, type: t.configuration.systemSettings.time },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.configuration.title}</h1>
          <p className="text-muted-foreground">{t.configuration.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.configuration.resetToDefault}
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            {t.configuration.saveAll}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.configuration.businessRules.title}</CardTitle>
            <CardDescription>{t.configuration.businessRules.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {businessRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{rule.name}</h4>
                    <p className="text-sm text-muted-foreground">{rule.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{rule.value}</div>
                    </div>
                    <Button variant="outline" size="sm" disabled={!rule.editable}>
                      <Settings className="w-3 h-3 mr-1" />
                      {t.configuration.businessRules.edit}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.configuration.localization.title}</CardTitle>
            <CardDescription>{t.configuration.localization.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{t.configuration.localization.languageSettings}</h4>
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.configuration.localization.defaultLanguage}</span>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder={t.configuration.localization.english} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">{t.configuration.localization.english}</SelectItem>
                        <SelectItem value="th">{t.configuration.localization.thai}</SelectItem>
                        <SelectItem value="es">{t.configuration.localization.spanish}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.configuration.localization.dateFormat}</span>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="MM/DD/YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">MM/DD/YYYY</SelectItem>
                        <SelectItem value="eu">DD/MM/YYYY</SelectItem>
                        <SelectItem value="iso">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.configuration.localization.currency}</span>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="thb">THB</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{t.configuration.localization.regionalSettings}</h4>
                  <Flag className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.configuration.localization.timeZone}</span>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="UTC-5" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-5">UTC-5 (EST)</SelectItem>
                        <SelectItem value="utc+7">UTC+7 (ICT)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.configuration.localization.numberFormat}</span>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="1,234.56" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">1,234.56</SelectItem>
                        <SelectItem value="eu">1.234,56</SelectItem>
                        <SelectItem value="in">1,23,456.78</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.configuration.featureFlags.title}</CardTitle>
          <CardDescription>{t.configuration.featureFlags.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureFlags.map((flag, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Flag className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{flag.name}</h4>
                    <p className="text-sm text-muted-foreground">{flag.description}</p>
                  </div>
                </div>
                <Switch checked={flag.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.configuration.systemSettings.title}</CardTitle>
          <CardDescription>{t.configuration.systemSettings.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {systemSettings.map((category, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium">{category.category}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{setting.name}</span>
                        <Badge variant="outline">{setting.type}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">{t.configuration.systemSettings.current}: {setting.value}</div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="w-3 h-3 mr-1" />
                          {t.configuration.systemSettings.configure}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {index < systemSettings.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}