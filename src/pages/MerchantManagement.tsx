import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Store, Plus, Edit, Eye, DollarSign, Calendar, Users, TrendingUp } from 'lucide-react';

export default function MerchantManagement() {
  const merchantStats = [
    { label: 'Total Merchants', value: '1,245', change: '+8.5%', color: 'text-blue-600' },
    { label: 'Active Merchants', value: '1,187', change: '+6.2%', color: 'text-green-600' },
    { label: 'Pending Approval', value: '34', change: '+12.3%', color: 'text-yellow-600' },
    { label: 'Inactive', value: '24', change: '-15.2%', color: 'text-red-600' },
  ];

  const topMerchants = [
    { name: 'Starbucks', transactions: 15420, revenue: 87500, growth: 15.2, status: 'active' },
    { name: 'Amazon', transactions: 12890, revenue: 156000, growth: 22.8, status: 'active' },
    { name: 'Target', transactions: 9640, revenue: 74200, growth: 8.1, status: 'active' },
    { name: 'Walmart', transactions: 8750, revenue: 68900, growth: 12.5, status: 'active' },
    { name: 'Best Buy', transactions: 7230, revenue: 92100, growth: 18.7, status: 'active' },
  ];

  const pendingApprovals = [
    { name: 'Local Coffee Shop', category: 'Food & Beverage', submitted: '2 days ago', documents: 'Complete' },
    { name: 'Tech Gadgets Store', category: 'Electronics', submitted: '3 days ago', documents: 'Pending' },
    { name: 'Fashion Boutique', category: 'Retail', submitted: '1 week ago', documents: 'Complete' },
  ];

  const settlementData = [
    { merchant: 'Starbucks', amount: 12500, cycle: 'Daily', nextDate: '2024-01-16', status: 'scheduled' },
    { merchant: 'Amazon', amount: 45000, cycle: 'Weekly', nextDate: '2024-01-18', status: 'scheduled' },
    { merchant: 'Target', amount: 28000, cycle: 'Bi-weekly', nextDate: '2024-01-20', status: 'processing' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Merchant & Tenant Management</h1>
          <p className="text-muted-foreground">Manage merchant onboarding, dashboards, and settlements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Merchant
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {merchantStats.map((stat) => (
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
            <CardTitle>Merchant Onboarding</CardTitle>
            <CardDescription>Quick onboarding form for new merchants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Name</label>
                <Input placeholder="Enter business name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="Food & Beverage" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input type="email" placeholder="contact@business.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Address</label>
                <Input placeholder="123 Main St, City, State" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fee Structure</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Transaction %" />
                  <Input placeholder="Monthly fee" />
                </div>
              </div>
              <Button className="w-full">Submit Application</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Merchants awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((merchant, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{merchant.name}</h4>
                    <Badge variant={merchant.documents === 'Complete' ? 'default' : 'secondary'}>
                      {merchant.documents}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span>{merchant.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Submitted:</span>
                      <span>{merchant.submitted}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Review
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Merchants</CardTitle>
          <CardDescription>Merchant performance dashboard and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topMerchants.map((merchant, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{merchant.name}</h4>
                    <p className="text-sm text-muted-foreground">{merchant.transactions.toLocaleString()} transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium">${merchant.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{merchant.growth}%</p>
                    <p className="text-sm text-muted-foreground">Growth</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">{merchant.status}</Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fee Structure Management</CardTitle>
            <CardDescription>Configure merchant fee structures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">Standard Fee Structure</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Transaction Fee:</span>
                    <span className="font-medium">2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Fee:</span>
                    <span className="font-medium">$29.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Setup Fee:</span>
                    <span className="font-medium">$99.00</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">Premium Fee Structure</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Transaction Fee:</span>
                    <span className="font-medium">2.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Fee:</span>
                    <span className="font-medium">$79.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Setup Fee:</span>
                    <span className="font-medium">$199.00</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Edit className="w-4 h-4 mr-2" />
                Edit Fee Structures
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settlement Cycles</CardTitle>
            <CardDescription>Manage merchant settlement schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settlementData.map((settlement, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{settlement.merchant}</h4>
                    <Badge variant={settlement.status === 'scheduled' ? 'default' : 'secondary'}>
                      {settlement.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">${settlement.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cycle:</span>
                      <span>{settlement.cycle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Settlement:</span>
                      <span>{settlement.nextDate}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Configure Schedules
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}