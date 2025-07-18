import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TransactionManagement() {
  const { t } = useLanguage();
  
  const transactionStats = [
    { label: t.transactions.totalTransactions, value: '245,680', change: '+15.3%', color: 'text-blue-600' },
    { label: t.transactions.successful, value: '238,420', change: '+14.8%', color: 'text-green-600' },
    { label: t.transactions.failed, value: '4,250', change: '-2.1%', color: 'text-red-600' },
    { label: t.transactions.pending, value: '3,010', change: '+5.2%', color: 'text-yellow-600' },
  ];

  const recentTransactions = [
    {
      id: 'TXN-001234',
      merchant: 'Starbucks Downtown',
      amount: 45.50,
      card: '****1234',
      status: 'completed',
      time: '2 min ago',
      type: 'purchase'
    },
    {
      id: 'TXN-001235',
      merchant: 'Amazon Online',
      amount: 89.99,
      card: '****5678',
      status: 'pending',
      time: '5 min ago',
      type: 'purchase'
    },
    {
      id: 'TXN-001236',
      merchant: 'Target Store',
      amount: 125.00,
      card: '****9012',
      status: 'failed',
      time: '8 min ago',
      type: 'purchase'
    },
    {
      id: 'TXN-001237',
      merchant: 'Online Top-up',
      amount: 100.00,
      card: '****3456',
      status: 'completed',
      time: '12 min ago',
      type: 'topup'
    },
  ];

  const disputes = [
    { id: 'DSP-001', txnId: 'TXN-001200', amount: 75.00, reason: 'Unauthorized transaction', status: 'investigating' },
    { id: 'DSP-002', txnId: 'TXN-001189', amount: 125.50, reason: 'Duplicate charge', status: 'resolved' },
    { id: 'DSP-003', txnId: 'TXN-001156', amount: 45.00, reason: 'Service not received', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.transactions.managementTitle}</h1>
          <p className="text-muted-foreground">{t.transactions.managementSubtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t.transactions.export}
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.transactions.refresh}
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

      <Card>
        <CardHeader>
          <CardTitle>{t.transactions.realTimeFeed}</CardTitle>
          <CardDescription>{t.transactions.realTimeFeedDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t.transactions.search} className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.transactions.allStatus}</SelectItem>
                  <SelectItem value="completed">{t.transactions.completed}</SelectItem>
                  <SelectItem value="pending">{t.transactions.pending}</SelectItem>
                  <SelectItem value="failed">{t.transactions.failed}</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.transactions.allTypes}</SelectItem>
                  <SelectItem value="purchase">{t.transactions.purchase}</SelectItem>
                  <SelectItem value="topup">{t.transactions.topup}</SelectItem>
                  <SelectItem value="refund">{t.transactions.refund}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {t.transactions.filter}
              </Button>
            </div>

            <div className="space-y-2">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{txn.id}</span>
                      <span className="text-sm text-muted-foreground">{txn.merchant}</span>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <div className="flex flex-col">
                      <span className="font-medium">${txn.amount.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">{txn.card}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={txn.type === 'purchase' ? 'default' : 'secondary'}>
                      {txn.type === 'purchase' ? t.transactions.purchase : t.transactions.topup}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {txn.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {txn.status === 'pending' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                      {txn.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-600" />}
                    <Badge variant={txn.status === 'completed' ? 'default' : txn.status === 'pending' ? 'secondary' : 'destructive'}>
                      {txn.status === 'completed' ? t.transactions.completed : txn.status === 'pending' ? t.transactions.pending : t.transactions.failed}
                    </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{txn.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.transactions.partialRedemptionTitle}</CardTitle>
            <CardDescription>{t.transactions.partialRedemptionDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{t.transactions.partialRedemptionRules}</h4>
                  <Badge variant="outline" className="text-green-600">{t.transactions.active}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t.transactions.minimumBalance}:</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.transactions.allowPartialRedemptions}:</span>
                    <span className="font-medium">{t.transactions.yes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.transactions.minimumTransactionAmount}:</span>
                    <span className="font-medium">$1.00</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">{t.transactions.configureRules}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.transactions.disputeHandling}</CardTitle>
            <CardDescription>{t.transactions.disputeHandlingDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{dispute.id}</span>
                    <Badge variant={dispute.status === 'resolved' ? 'default' : dispute.status === 'investigating' ? 'secondary' : 'destructive'}>
                      {dispute.status === 'resolved' ? t.transactions.resolved : dispute.status === 'investigating' ? t.transactions.investigating : t.transactions.pending}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{t.transactions.transaction}:</span>
                      <span>{dispute.txnId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.transactions.amount}:</span>
                      <span>${dispute.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.transactions.reason}:</span>
                      <span>{dispute.reason}</span>
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
          <CardTitle>{t.transactions.reversalRefundCenter}</CardTitle>
          <CardDescription>{t.transactions.reversalRefundCenterDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-semibold text-blue-600">45</div>
              <p className="text-sm text-muted-foreground">{t.transactions.pendingReversals}</p>
              <Button variant="outline" size="sm" className="mt-2">{t.transactions.process}</Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-semibold text-green-600">128</div>
              <p className="text-sm text-muted-foreground">{t.transactions.completedRefunds}</p>
              <Button variant="outline" size="sm" className="mt-2">{t.transactions.view}</Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-semibold text-yellow-600">12</div>
              <p className="text-sm text-muted-foreground">{t.transactions.failedReversals}</p>
              <Button variant="outline" size="sm" className="mt-2">{t.transactions.retry}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}