import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

export default function TransactionManagement() {
  const transactionStats = [
    { label: 'Total Transactions', value: '245,680', change: '+15.3%', color: 'text-blue-600' },
    { label: 'Successful', value: '238,420', change: '+14.8%', color: 'text-green-600' },
    { label: 'Failed', value: '4,250', change: '-2.1%', color: 'text-red-600' },
    { label: 'Pending', value: '3,010', change: '+5.2%', color: 'text-yellow-600' },
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
          <h1 className="text-2xl font-semibold text-foreground">Transaction Management</h1>
          <p className="text-muted-foreground">Monitor and manage all card transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
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
          <CardTitle>Real-Time Transaction Feed</CardTitle>
          <CardDescription>Live transaction monitoring with advanced filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="topup">Top-up</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
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
                      {txn.type}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {txn.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {txn.status === 'pending' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                      {txn.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-600" />}
                      <Badge variant={txn.status === 'completed' ? 'default' : txn.status === 'pending' ? 'secondary' : 'destructive'}>
                        {txn.status}
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
            <CardTitle>Partial Redemption</CardTitle>
            <CardDescription>Manage partial card redemptions and balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Partial Redemption Rules</h4>
                  <Badge variant="outline" className="text-green-600">Active</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Minimum balance required:</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Allow partial redemptions:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minimum transaction amount:</span>
                    <span className="font-medium">$1.00</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">Configure Rules</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispute Handling</CardTitle>
            <CardDescription>Manage transaction disputes and refunds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{dispute.id}</span>
                    <Badge variant={dispute.status === 'resolved' ? 'default' : dispute.status === 'investigating' ? 'secondary' : 'destructive'}>
                      {dispute.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Transaction:</span>
                      <span>{dispute.txnId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>${dispute.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reason:</span>
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
          <CardTitle>Reversal & Refund Center</CardTitle>
          <CardDescription>Process transaction reversals and refunds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-semibold text-blue-600">45</div>
              <p className="text-sm text-muted-foreground">Pending Reversals</p>
              <Button variant="outline" size="sm" className="mt-2">Process</Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-semibold text-green-600">128</div>
              <p className="text-sm text-muted-foreground">Completed Refunds</p>
              <Button variant="outline" size="sm" className="mt-2">View</Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-semibold text-yellow-600">12</div>
              <p className="text-sm text-muted-foreground">Failed Reversals</p>
              <Button variant="outline" size="sm" className="mt-2">Retry</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}