import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Download, RefreshCw, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';

export default function SettlementReconciliation() {
  const settlementStats = [
    { label: 'Total Float', value: '$2,456,780', change: '+5.2%', color: 'text-blue-600' },
    { label: 'Pending Settlements', value: '$345,200', change: '+8.1%', color: 'text-yellow-600' },
    { label: 'Reconciled Today', value: '$128,900', change: '+12.3%', color: 'text-green-600' },
    { label: 'Exceptions', value: '12', change: '-25.0%', color: 'text-red-600' },
  ];

  const reconciliationTasks = [
    { merchant: 'Starbucks', amount: 45000, status: 'completed', lastRun: '2 hours ago', nextRun: '22 hours' },
    { merchant: 'Amazon', amount: 67500, status: 'running', lastRun: '1 hour ago', nextRun: '23 hours' },
    { merchant: 'Target', amount: 32000, status: 'pending', lastRun: '4 hours ago', nextRun: '20 hours' },
    { merchant: 'Walmart', amount: 28900, status: 'failed', lastRun: '6 hours ago', nextRun: 'Manual' },
  ];

  const floatMovements = [
    { type: 'Card Issuance', amount: -125000, timestamp: '2 hours ago', reference: 'BATCH-2024-001' },
    { type: 'Merchant Settlement', amount: -67500, timestamp: '3 hours ago', reference: 'SETT-AMZ-001' },
    { type: 'Card Top-up', amount: +89000, timestamp: '4 hours ago', reference: 'TOPUP-BULK-001' },
    { type: 'Refund Processing', amount: -12300, timestamp: '5 hours ago', reference: 'REF-2024-045' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settlement & Reconciliation</h1>
          <p className="text-muted-foreground">Manage automated reconciliation and float management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reconcile Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {settlementStats.map((stat) => (
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
            <CardTitle>Automated Reconciliation</CardTitle>
            <CardDescription>Real-time reconciliation status for all merchants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reconciliationTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{task.merchant}</span>
                      <span className="text-sm text-muted-foreground">${task.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="text-muted-foreground">Last: {task.lastRun}</div>
                      <div className="text-muted-foreground">Next: {task.nextRun}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {task.status === 'running' && <Clock className="w-4 h-4 text-blue-600" />}
                      {task.status === 'pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                      {task.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-600" />}
                      <Badge variant={task.status === 'completed' ? 'default' : task.status === 'running' ? 'secondary' : task.status === 'pending' ? 'outline' : 'destructive'}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Float Management</CardTitle>
            <CardDescription>Monitor and manage system float balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Current Float Balance</h4>
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-semibold text-blue-600">$2,456,780</div>
                <Progress value={75} className="mt-2" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>75% of target</span>
                  <span>Target: $3,200,000</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Float Movements</h4>
                {floatMovements.map((movement, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{movement.type}</span>
                      <span className="text-xs text-muted-foreground">{movement.reference}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-medium ${movement.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {movement.amount > 0 ? '+' : ''}${movement.amount.toLocaleString()}
                      </span>
                      <div className="text-xs text-muted-foreground">{movement.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Settlement File Export</CardTitle>
          <CardDescription>Generate and download settlement reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Daily Settlement</h4>
              <p className="text-sm text-muted-foreground mb-3">Export daily settlement summary</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
                <p className="text-xs text-muted-foreground">Last generated: 2 hours ago</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Monthly Reconciliation</h4>
              <p className="text-sm text-muted-foreground mb-3">Monthly reconciliation report</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
                <p className="text-xs text-muted-foreground">Last generated: 1 day ago</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Exception Report</h4>
              <p className="text-sm text-muted-foreground mb-3">Failed reconciliation details</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
                <p className="text-xs text-muted-foreground">Last generated: 6 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}