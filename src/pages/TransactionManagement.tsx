import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { Activity, Search, Filter, Download, AlertTriangle, CheckCircle, Clock, Eye, RefreshCw } from 'lucide-react';

export default function TransactionManagement() {
  const { t } = useLanguage();

  const transactionStats = [
    { label: t('transactionManagement.realTimeMonitoring'), value: '1,247', change: '+5.2%', color: 'text-green-600' },
    { label: t('dashboard.successRate'), value: '98.5%', change: '+0.3%', color: 'text-blue-600' },
    { label: t('transactionManagement.failedTransaction'), value: '23', change: '-12%', color: 'text-red-600' },
    { label: t('dashboard.averageResponse'), value: '245ms', change: '-8ms', color: 'text-purple-600' },
  ];

  const recentTransactions = [
    { id: 'TXN-001', card: '****1234', merchant: 'Starbucks', amount: '฿150.00', status: 'completed', time: '2 min ago' },
    { id: 'TXN-002', card: '****5678', merchant: 'Seven Eleven', amount: '฿85.50', status: 'pending', time: '5 min ago' },
    { id: 'TXN-003', card: '****9012', merchant: 'Central World', amount: '฿1,250.00', status: 'failed', time: '8 min ago' },
    { id: 'TXN-004', card: '****3456', merchant: 'BigC', amount: '฿320.75', status: 'completed', time: '12 min ago' },
    { id: 'TXN-005', card: '****7890', merchant: 'Terminal 21', amount: '฿890.00', status: 'completed', time: '15 min ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'outline';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t('transactionManagement.title')}</h1>
          <p className="text-muted-foreground">{t('navigation.transactionManagement')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t('common.refresh')}
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            {t('common.export')} {t('dashboard.reports')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {transactionStats.map((stat) => (
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

      <Tabs defaultValue="monitoring" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">{t('transactionManagement.realTimeMonitoring')}</TabsTrigger>
          <TabsTrigger value="history">{t('transactionManagement.transactionHistory')}</TabsTrigger>
          <TabsTrigger value="refunds">{t('transactionManagement.refundProcessing')}</TabsTrigger>
          <TabsTrigger value="reconciliation">{t('transactionManagement.reconciliationDashboard')}</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t('transactionManagement.transactionStream')}</CardTitle>
                    <CardDescription>{t('transactionManagement.colorCoded')}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    {t('common.filter')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.id}</div>
                          <div className="text-sm text-muted-foreground">{transaction.merchant}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{transaction.amount}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{transaction.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('transactionManagement.alertConfiguration')}</CardTitle>
                <CardDescription>{t('transactionManagement.thresholdSettings')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('transactionManagement.amountThreshold')}</label>
                    <Input defaultValue="10,000" placeholder="Amount in THB" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('transactionManagement.velocityMonitoring')}</label>
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 {t('transactionManagement.transactionHistory')}/hour</SelectItem>
                        <SelectItem value="10">10 {t('transactionManagement.transactionHistory')}/hour</SelectItem>
                        <SelectItem value="20">20 {t('transactionManagement.transactionHistory')}/hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">{t('transactionManagement.customRules')}</h4>
                    {[
                      { name: t('transactionManagement.unusualPattern'), enabled: true, triggered: 12 },
                      { name: t('transactionManagement.velocityBreach'), enabled: true, triggered: 5 },
                      { name: t('transactionManagement.failedTransaction'), enabled: false, triggered: 8 },
                    ].map((rule, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{rule.name}</div>
                          <div className="text-xs text-muted-foreground">{rule.triggered} triggered today</div>
                        </div>
                        <Badge variant={rule.enabled ? "outline" : "secondary"}>
                          {rule.enabled ? t('common.enabled') : t('common.disabled')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t('transactionManagement.transactionHistory')}</CardTitle>
                  <CardDescription>{t('transactionManagement.advancedSearch')}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder={t('transactionManagement.quickSearch')}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    {t('common.filter')}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('transactionManagement.transactionId')}</TableHead>
                    <TableHead>{t('dashboard.cardNumber')}</TableHead>
                    <TableHead>{t('dashboard.merchant')}</TableHead>
                    <TableHead>{t('dashboard.transactionAmount')}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                    <TableHead>{t('dashboard.timestamp')}</TableHead>
                    <TableHead>{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.card}</TableCell>
                      <TableCell>{transaction.merchant}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.time}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          {t('common.view')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('transactionManagement.refundProcessing')}</CardTitle>
                <CardDescription>{t('transactionManagement.partialRefund')} & {t('transactionManagement.fullRefund')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('transactionManagement.originalCard')}</label>
                    <Input placeholder="Enter card number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('transactionManagement.refundProcessing')} {t('dashboard.transactionAmount')}</label>
                    <Input placeholder="Amount to refund" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('common.description')}</label>
                    <Input placeholder="Reason for refund" />
                  </div>
                  <Button className="w-full">
                    {t('transactionManagement.refundProcessing')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('transactionManagement.disputeManagement')}</CardTitle>
                <CardDescription>{t('transactionManagement.disputeCase')} & {t('transactionManagement.resolutionTimeline')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'DSP-001', type: 'Unauthorized Transaction', amount: '฿1,250.00', status: 'investigating', days: 5 },
                    { id: 'DSP-002', type: 'Double Charge', amount: '฿320.75', status: 'resolved', days: 12 },
                    { id: 'DSP-003', type: 'Merchant Error', amount: '฿85.50', status: 'pending', days: 2 },
                  ].map((dispute, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{dispute.id}</div>
                        <Badge variant={dispute.status === 'resolved' ? 'outline' : 'secondary'}>
                          {dispute.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{dispute.type}</div>
                      <div className="flex justify-between text-sm">
                        <span>{t('dashboard.transactionAmount')}: {dispute.amount}</span>
                        <span>{dispute.days} {t('time.days')} {t('time.ago')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('transactionManagement.reconciliationDashboard')}</CardTitle>
              <CardDescription>{t('transactionManagement.dailyReconciliation')} & {t('transactionManagement.settlementReconciliation')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-semibold text-green-600">98.7%</div>
                    <div className="text-sm text-muted-foreground">{t('transactionManagement.autoMatch')} Rate</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-semibold text-red-600">23</div>
                    <div className="text-sm text-muted-foreground">{t('transactionManagement.unmatchedItems')}</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-semibold text-blue-600">฿1,247.50</div>
                    <div className="text-sm text-muted-foreground">{t('transactionManagement.discrepancy')} Amount</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">{t('transactionManagement.reconciliationStatus')}</h4>
                  {[
                    { date: '2024-01-15', status: 'completed', matched: 1247, unmatched: 3, variance: '฿25.50' },
                    { date: '2024-01-14', status: 'pending', matched: 1156, unmatched: 8, variance: '฿125.75' },
                    { date: '2024-01-13', status: 'completed', matched: 1342, unmatched: 0, variance: '฿0.00' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="font-medium">{item.date}</div>
                        <Badge variant={item.status === 'completed' ? 'outline' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span>Matched: {item.matched}</span>
                        <span>Unmatched: {item.unmatched}</span>
                        <span>Variance: {item.variance}</span>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          {t('common.view')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}