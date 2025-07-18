import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Download, Calendar, DollarSign, CreditCard, Users, Activity, Eye, Filter, RefreshCw } from 'lucide-react';

export default function ReportingAnalytics() {
  const liabilityData = [
    { month: 'Jul', outstanding: 45200000, active: 42800000, inactive: 2400000 },
    { month: 'Aug', outstanding: 47100000, active: 44300000, inactive: 2800000 },
    { month: 'Sep', outstanding: 48900000, active: 46100000, inactive: 2800000 },
    { month: 'Oct', outstanding: 46800000, active: 43900000, inactive: 2900000 },
    { month: 'Nov', outstanding: 48200000, active: 45300000, inactive: 2900000 },
    { month: 'Dec', outstanding: 49500000, active: 46800000, inactive: 2700000 },
  ];

  const salesData = [
    { period: 'Q1 2024', revenue: 125000000, growth: 8.5, transactions: 456789 },
    { period: 'Q2 2024', revenue: 134000000, growth: 12.3, transactions: 523456 },
    { period: 'Q3 2024', revenue: 142000000, growth: 15.8, transactions: 587234 },
    { period: 'Q4 2024', revenue: 156000000, growth: 18.2, transactions: 634567 },
  ];

  const channelData = [
    { name: 'Retail POS', value: 45.2, color: '#4F46E5' },
    { name: 'Online Portal', value: 28.7, color: '#06B6D4' },
    { name: 'Mobile App', value: 16.8, color: '#10B981' },
    { name: 'Corporate Bulk', value: 9.3, color: '#F59E0B' },
  ];

  const agingData = [
    { range: '0-30 days', amount: 28500000, percentage: 57.6, cards: 12450 },
    { range: '31-90 days', amount: 12800000, percentage: 25.9, cards: 5670 },
    { range: '91-180 days', amount: 5200000, percentage: 10.5, cards: 2340 },
    { range: '181-365 days', amount: 2100000, percentage: 4.2, cards: 980 },
    { range: '365+ days', amount: 900000, percentage: 1.8, cards: 430 },
  ];

  const performanceMetrics = [
    { metric: 'Total Outstanding Liability', value: '฿49.5M', change: '+2.7%', trend: 'up' },
    { metric: 'Active Cards', value: '21,870', change: '+5.2%', trend: 'up' },
    { metric: 'Monthly Issuance', value: '฿12.8M', change: '+8.4%', trend: 'up' },
    { metric: 'Redemption Rate', value: '78.6%', change: '+1.2%', trend: 'up' },
  ];

  const reportSchedules = [
    { name: 'Daily Liability Report', frequency: 'Daily', time: '06:00', recipients: 'finance@onebangkok.com', status: 'Active' },
    { name: 'Weekly Sales Summary', frequency: 'Weekly', time: 'Monday 08:00', recipients: 'management@onebangkok.com', status: 'Active' },
    { name: 'Monthly Settlement Report', frequency: 'Monthly', time: '1st 09:00', recipients: 'accounting@onebangkok.com', status: 'Active' },
    { name: 'Quarterly Performance Report', frequency: 'Quarterly', time: '1st 10:00', recipients: 'board@onebangkok.com', status: 'Paused' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reporting & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive reporting dashboard with real-time analytics and visualization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">{metric.metric}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{metric.value}</div>
              <div className={`text-sm flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="w-3 h-3" />
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="liability" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="liability">Real-time Liability Reporting</TabsTrigger>
          <TabsTrigger value="sales">Sales Performance</TabsTrigger>
          <TabsTrigger value="visualization">Visualization Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="liability" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Liability Dashboard</CardTitle>
                <CardDescription>Real-time outstanding value and card activity trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={liabilityData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="month" 
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis 
                        className="text-muted-foreground"
                        fontSize={12}
                        tickFormatter={(value) => `฿${(Number(value) / 1000000).toFixed(0)}M`}
                      />
                      <Tooltip 
                        formatter={(value) => [`฿${(Number(value) / 1000000).toFixed(1)}M`, '']}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="active" 
                        stackId="1"
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))"
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="inactive" 
                        stackId="1"
                        stroke="hsl(var(--muted-foreground))" 
                        fill="hsl(var(--muted-foreground))"
                        fillOpacity={0.4}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liability Aging Analysis</CardTitle>
                <CardDescription>Outstanding balance breakdown by card age</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agingData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.range}</span>
                        <span className="text-muted-foreground">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>฿{(item.amount / 1000000).toFixed(1)}M</span>
                        <span>{item.cards.toLocaleString()} cards</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Export Options</CardTitle>
                  <CardDescription>Download liability reports in various formats</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="daily">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-16 flex flex-col gap-2">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Excel Export</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-2">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">PDF Report</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-2">
                  <Activity className="w-5 h-5" />
                  <span className="text-sm">API Endpoint</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Schedule Delivery</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Metrics</CardTitle>
                <CardDescription>Quarterly revenue and growth analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="period" 
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis 
                        className="text-muted-foreground"
                        fontSize={12}
                        tickFormatter={(value) => `฿${(Number(value) / 1000000).toFixed(0)}M`}
                      />
                      <Tooltip 
                        formatter={(value) => [`฿${(Number(value) / 1000000).toFixed(0)}M`, 'Revenue']}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="revenue" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Revenue distribution by sales channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comparative Analysis</CardTitle>
              <CardDescription>Period-over-period performance comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Growth Rate</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Avg. Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((period, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{period.period}</TableCell>
                      <TableCell>฿{(period.revenue / 1000000).toFixed(0)}M</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">{period.growth}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{period.transactions.toLocaleString()}</TableCell>
                      <TableCell>฿{Math.round(period.revenue / period.transactions)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chart Selection</CardTitle>
                <CardDescription>Customize your dashboard with interactive widgets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <BarChart className="w-6 h-6" />
                    <span className="text-sm">Bar Chart</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <TrendingUp className="w-6 h-6" />
                    <span className="text-sm">Line Chart</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Activity className="w-6 h-6" />
                    <span className="text-sm">Area Chart</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <DollarSign className="w-6 h-6" />
                    <span className="text-sm">Pie Chart</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dashboard Widgets</CardTitle>
                <CardDescription>Add interactive elements to your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Card Metrics Widget</span>
                    </div>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Revenue Tracker</span>
                    </div>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Customer Analytics</span>
                    </div>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">Real-time Feed</span>
                    </div>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Scheduling System</CardTitle>
              <CardDescription>Automate report generation and delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Scheduled Reports</h4>
                  <Button size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    New Schedule
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportSchedules.map((schedule, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{schedule.name}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{schedule.frequency}</div>
                            <div className="text-xs text-muted-foreground">{schedule.time}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{schedule.recipients}</TableCell>
                        <TableCell>
                          <Badge variant={schedule.status === 'Active' ? 'outline' : 'secondary'}>
                            {schedule.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}