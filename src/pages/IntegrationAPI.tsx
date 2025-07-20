import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Code, Zap, Globe, Settings, Play, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function IntegrationAPI() {
  const { t } = useLanguage();
  
  const apiStats = [
    { label: t.integration.totalApiCalls, value: '2.4M', change: '+15.2%', color: 'text-blue-600' },
    { label: t.integration.successRate, value: '99.7%', change: '+0.2%', color: 'text-green-600' },
    { label: t.integration.avgResponseTime, value: '45ms', change: '-5ms', color: 'text-green-600' },
    { label: t.integration.rateLimitHits, value: '127', change: '+23', color: 'text-yellow-600' },
  ];

  const apiEndpoints = [
    { name: t.integration.apiCatalogSandbox.cardIssuance, path: '/api/v1/cards', method: 'POST', calls: 125000, uptime: 99.9, rateLimit: 1000 },
    { name: t.integration.apiCatalogSandbox.transactionProcessing, path: '/api/v1/transactions', method: 'POST', calls: 890000, uptime: 99.8, rateLimit: 5000 },
    { name: t.integration.apiCatalogSandbox.balanceInquiry, path: '/api/v1/balance', method: 'GET', calls: 456000, uptime: 99.9, rateLimit: 2000 },
    { name: t.integration.apiCatalogSandbox.merchantVerification, path: '/api/v1/merchants', method: 'GET', calls: 234000, uptime: 99.7, rateLimit: 500 },
  ];

  const externalIntegrations = [
    { name: t.integration.apiStatusDashboard.crmSystem, status: 'active', lastHeartbeat: `2 ${t.integration.apiStatusDashboard.minAgo}`, errorRate: 0.1, retryCount: 0 },
    { name: t.integration.apiStatusDashboard.paymentGateway, status: 'active', lastHeartbeat: `1 ${t.integration.apiStatusDashboard.minAgo}`, errorRate: 0.3, retryCount: 2 },
    { name: t.integration.apiStatusDashboard.merchantDirectory, status: 'inactive', lastHeartbeat: `15 ${t.integration.apiStatusDashboard.minAgo}`, errorRate: 2.1, retryCount: 5 },
    { name: t.integration.apiStatusDashboard.notificationService, status: 'active', lastHeartbeat: `30 ${t.integration.apiStatusDashboard.secAgo}`, errorRate: 0.0, retryCount: 0 },
  ];

  const webhookConfigs = [
    { name: t.integration.webhookManagement.transactionCompleted, url: 'https://api.client.com/webhooks/transaction', enabled: true, lastTrigger: `2 ${t.integration.apiStatusDashboard.minAgo}` },
    { name: t.integration.webhookManagement.cardIssued, url: 'https://api.client.com/webhooks/card', enabled: true, lastTrigger: `5 ${t.integration.apiStatusDashboard.minAgo}` },
    { name: t.integration.webhookManagement.balanceUpdated, url: 'https://api.client.com/webhooks/balance', enabled: false, lastTrigger: `1 ${t.integration.webhookManagement.hourAgo}` },
    { name: t.integration.webhookManagement.merchantOnboarded, url: 'https://api.client.com/webhooks/merchant', enabled: true, lastTrigger: `1 ${t.integration.webhookManagement.dayAgo}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.integration.title}</h1>
          <p className="text-muted-foreground">{t.integration.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            {t.integration.viewDocs}
          </Button>
          <Button>
            <Code className="w-4 h-4 mr-2" />
            {t.integration.apiConsole}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {apiStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className={`text-sm ${stat.color}`}>{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.integration.apiCatalogSandbox.title}</CardTitle>
            <CardDescription>{t.integration.apiCatalogSandbox.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiEndpoints.map((api, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{api.method}</Badge>
                      <h4 className="font-medium">{api.name}</h4>
                    </div>
                    <Badge variant="outline" className="text-green-600">{api.uptime}% {t.integration.apiCatalogSandbox.uptime}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{api.path}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">{api.calls.toLocaleString()}</span> {t.integration.apiCatalogSandbox.calls}
                    </div>
                    <div className="text-sm">
                      {t.integration.apiCatalogSandbox.rateLimit}: <span className="font-medium">{api.rateLimit}/min</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      {t.integration.apiCatalogSandbox.test}
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Code className="w-4 h-4 mr-2" />
                {t.integration.apiCatalogSandbox.openSandbox}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.integration.apiStatusDashboard.title}</CardTitle>
            <CardDescription>{t.integration.apiStatusDashboard.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {externalIntegrations.map((integration, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {integration.status === 'active' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <h4 className="font-medium">{integration.name}</h4>
                    </div>
                    <Badge variant={integration.status === 'active' ? 'default' : 'destructive'}>
                      {integration.status === 'active' ? t.integration.apiStatusDashboard.active : t.integration.apiStatusDashboard.inactive}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t.integration.apiStatusDashboard.lastHeartbeat}:</span>
                      <div className="font-medium">{integration.lastHeartbeat}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t.integration.apiStatusDashboard.errorRate}:</span>
                      <div className="font-medium">{integration.errorRate}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t.integration.apiStatusDashboard.retryCount}:</span>
                      <div className="font-medium">{integration.retryCount}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.integration.webhookManagement.title}</CardTitle>
          <CardDescription>{t.integration.webhookManagement.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webhookConfigs.map((webhook, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{webhook.name}</h4>
                    <p className="text-sm text-muted-foreground">{webhook.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{t.integration.webhookManagement.lastTrigger}</div>
                    <div className="text-xs text-muted-foreground">{webhook.lastTrigger}</div>
                  </div>
                  <Switch checked={webhook.enabled} />
                  <Button variant="outline" size="sm">
                    <Settings className="w-3 h-3 mr-1" />
                    {t.integration.webhookManagement.edit}
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Zap className="w-4 h-4 mr-2" />
              {t.integration.webhookManagement.addWebhook}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.integration.rateLimiting.title}</CardTitle>
          <CardDescription>{t.integration.rateLimiting.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">{t.integration.rateLimiting.currentUsage}</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t.integration.rateLimiting.apiCallsPerMinute}</span>
                    <span>850 / 1000</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t.integration.rateLimiting.concurrentConnections}</span>
                    <span>45 / 100</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t.integration.rateLimiting.webhookDeliveries}</span>
                    <span>123 / 500</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">{t.integration.rateLimiting.rateLimitConfig}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{t.integration.rateLimiting.requestsPerMinute}</label>
                  <Input type="number" value="1000" className="w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{t.integration.rateLimiting.burstLimit}</label>
                  <Input type="number" value="1200" className="w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{t.integration.rateLimiting.concurrentConnections}</label>
                  <Input type="number" value="100" className="w-20" />
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  {t.integration.rateLimiting.updateLimits}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}