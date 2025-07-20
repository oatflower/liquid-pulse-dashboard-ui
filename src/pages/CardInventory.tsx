import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Upload, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export default function CardInventory() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "เปิดหน้าต่างสำหรับอัพโหลดไฟล์จำนวนมาก",
    });
  };

  const handleNewBatch = () => {
    toast({
      title: "New Batch",
      description: "เปิดหน้าต่างสำหรับสร้างชุดใหม่",
    });
  };
  
  const cardStats = [
    { label: t.cardInventory.totalCardsIssued, value: '125,420', change: '+12.5%', color: 'text-blue-600' },
    { label: t.cardInventory.activeCards, value: '98,350', change: '+8.2%', color: 'text-green-600' },
    { label: t.cardInventory.expiredCards, value: '15,240', change: '+2.1%', color: 'text-red-600' },
    { label: t.cardInventory.pendingActivation, value: '11,830', change: '-5.3%', color: 'text-yellow-600' },
  ];

  const recentBatches = [
    { id: 'BATCH-001', campaign: 'Holiday Campaign 2024', amount: 50000, status: 'completed', date: '2024-01-15' },
    { id: 'BATCH-002', campaign: 'Corporate Rewards Q1', amount: 25000, status: 'processing', date: '2024-01-14' },
    { id: 'BATCH-003', campaign: 'Employee Benefits', amount: 15000, status: 'pending', date: '2024-01-13' },
  ];

  const cardTypes = [
    { type: t.cardInventory.physicalCards, issued: 45000, active: 42000, expired: 3000 },
    { type: t.cardInventory.eGiftCards, issued: 65000, active: 58000, expired: 7000 },
    { type: t.cardInventory.corporateCards, issued: 15420, active: 14200, expired: 1220 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.cardInventory.title}</h1>
          <p className="text-muted-foreground">{t.cardInventory.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkUpload}>
            <Upload className="w-4 h-4 mr-2" />
            {t.cardInventory.bulkUpload}
          </Button>
          <Button onClick={handleNewBatch}>
            <Plus className="w-4 h-4 mr-2" />
            {t.cardInventory.newBatch}
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
            <CardTitle>{t.cardInventory.corporateGeneration}</CardTitle>
            <CardDescription>{t.cardInventory.corporateGenerationDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.cardInventory.campaignName}</label>
                <Input placeholder={t.cardInventory.enterCampaignName} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.cardInventory.batchAmount}</label>
                  <Input type="number" placeholder="10,000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.cardInventory.cardValue}</label>
                  <Input type="number" placeholder="500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.cardInventory.whitelistUpload}</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{t.cardInventory.dropCsvFile}</p>
                </div>
              </div>
              <Button className="w-full">{t.cardInventory.generateBatch}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.cardInventory.recentBatches}</CardTitle>
            <CardDescription>{t.cardInventory.recentBatchesDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{batch.campaign}</p>
                    <p className="text-sm text-muted-foreground">{batch.id} • {batch.amount.toLocaleString()} {t.cardInventory.cards}</p>
                    <p className="text-xs text-muted-foreground">{batch.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {batch.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {batch.status === 'processing' && <Clock className="w-4 h-4 text-yellow-600" />}
                    {batch.status === 'pending' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    <Badge variant={batch.status === 'completed' ? 'default' : batch.status === 'processing' ? 'secondary' : 'destructive'}>
                      {batch.status === 'completed' ? t.cardInventory.completed : batch.status === 'processing' ? t.cardInventory.processing : t.cardInventory.pending}
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
            <CardTitle>{t.cardInventory.cardTypeDistribution}</CardTitle>
            <CardDescription>{t.cardInventory.cardTypeDistributionDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cardTypes.map((card) => (
              <div key={card.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{card.type}</h4>
                  <span className="text-sm text-muted-foreground">{card.issued.toLocaleString()} {t.cardInventory.total}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{t.cardInventory.active}: {card.active.toLocaleString()}</span>
                    <span>{t.cardInventory.expired}: {card.expired.toLocaleString()}</span>
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
            <CardTitle>{t.cardInventory.topUpReloadControls}</CardTitle>
            <CardDescription>{t.cardInventory.topUpReloadControlsDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{t.cardInventory.autoTopUp}</p>
                  <p className="text-sm text-muted-foreground">{t.cardInventory.autoTopUpDesc}</p>
                </div>
                <Badge variant="outline" className="text-green-600">{t.cardInventory.enabled}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{t.cardInventory.manualReload}</p>
                  <p className="text-sm text-muted-foreground">{t.cardInventory.manualReloadDesc}</p>
                </div>
                <Badge variant="outline" className="text-green-600">{t.cardInventory.enabled}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{t.cardInventory.corporateReload}</p>
                  <p className="text-sm text-muted-foreground">{t.cardInventory.corporateReloadDesc}</p>
                </div>
                <Badge variant="outline" className="text-green-600">{t.cardInventory.enabled}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.cardInventory.expiryManagement}</CardTitle>
            <CardDescription>{t.cardInventory.expiryManagementDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-semibold text-yellow-600">2,450</p>
                  <p className="text-sm text-muted-foreground">{t.cardInventory.expiringSoon}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-semibold text-red-600">890</p>
                  <p className="text-sm text-muted-foreground">{t.cardInventory.expiredToday}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {t.cardInventory.sendExpiryNotifications}
                </Button>
                <Button variant="outline" className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t.cardInventory.recallExpiredCards}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}