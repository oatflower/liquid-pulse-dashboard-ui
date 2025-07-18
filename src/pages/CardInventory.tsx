import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Upload, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function CardInventory() {
  const { t } = useLanguage();
  const cardStats = [
    { label: t('cardManagement.totalCards'), value: '2,847', change: '+12.5%', color: 'text-green-600' },
    { label: t('dashboard.activeCards'), value: '2,134', change: '+8.2%', color: 'text-blue-600' },
    { label: t('cardManagement.blocked'), value: '45', change: '-2.1%', color: 'text-red-600' },
    { label: t('cardManagement.expired'), value: '668', change: '+15.3%', color: 'text-yellow-600' },
  ];

  const recentBatches = [
    { id: 'BATCH-001', campaign: 'Holiday Campaign 2024', amount: 50000, status: 'completed', date: '2024-01-15' },
    { id: 'BATCH-002', campaign: 'Corporate Rewards Q1', amount: 25000, status: 'processing', date: '2024-01-14' },
    { id: 'BATCH-003', campaign: 'Employee Benefits', amount: 15000, status: 'pending', date: '2024-01-13' },
  ];

  const cardTypes = [
    { type: 'Physical Cards', issued: 45000, active: 42000, expired: 3000 },
    { type: 'E-Gift Cards', issued: 65000, active: 58000, expired: 7000 },
    { type: 'Corporate Cards', issued: 15420, active: 14200, expired: 1220 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t('cardManagement.title')}</h1>
          <p className="text-muted-foreground">{t('navigation.cardInventory')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            {t('common.upload')} CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t('cardManagement.createCard')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardStats.map((stat) => (
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
            <CardTitle>Corporate Generation</CardTitle>
            <CardDescription>Create and manage corporate card batches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Name</label>
                <Input placeholder="Enter campaign name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Batch Amount</label>
                  <Input type="number" placeholder="10,000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Value</label>
                  <Input type="number" placeholder="500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Whitelist Upload</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drop CSV file here or click to browse</p>
                </div>
              </div>
              <Button className="w-full">Generate Batch</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Batches</CardTitle>
            <CardDescription>Track batch generation progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{batch.campaign}</p>
                    <p className="text-sm text-muted-foreground">{batch.id} • {batch.amount.toLocaleString()} cards</p>
                    <p className="text-xs text-muted-foreground">{batch.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {batch.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {batch.status === 'processing' && <Clock className="w-4 h-4 text-yellow-600" />}
                    {batch.status === 'pending' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    <Badge variant={batch.status === 'completed' ? 'default' : batch.status === 'processing' ? 'secondary' : 'destructive'}>
                      {batch.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Card Type Distribution</CardTitle>
          <CardDescription>Overview of card types and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cardTypes.map((card) => (
              <div key={card.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{card.type}</h4>
                  <span className="text-sm text-muted-foreground">{card.issued.toLocaleString()} total</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Active: {card.active.toLocaleString()}</span>
                    <span>Expired: {card.expired.toLocaleString()}</span>
                  </div>
                  <Progress value={(card.active / card.issued) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top-Up & Reload Controls</CardTitle>
            <CardDescription>Manage card reloading and top-up settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Auto Top-Up</p>
                  <p className="text-sm text-muted-foreground">Automatic balance reload</p>
                </div>
                <Badge variant="outline" className="text-green-600">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Manual Reload</p>
                  <p className="text-sm text-muted-foreground">User-initiated top-ups</p>
                </div>
                <Badge variant="outline" className="text-green-600">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Corporate Reload</p>
                  <p className="text-sm text-muted-foreground">Bulk corporate top-ups</p>
                </div>
                <Badge variant="outline" className="text-green-600">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expiry Management</CardTitle>
            <CardDescription>Card expiration and recall settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-semibold text-yellow-600">2,450</p>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-semibold text-red-600">890</p>
                  <p className="text-sm text-muted-foreground">Expired Today</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Send Expiry Notifications
                </Button>
                <Button variant="outline" className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Recall Expired Cards
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}