import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus, AlertTriangle, CheckCircle, Clock, Filter, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Campaign {
  id: string;
  name: string;
  type: 'B2B' | 'B2C';
  cards: number;
  status: 'active' | 'pending' | 'completed';
  createdDate: string;
}

interface CampaignDashboardProps {
  selectedCampaign: Campaign;
  onBack: () => void;
}

export default function CampaignDashboard({ selectedCampaign, onBack }: CampaignDashboardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [cardCategoryFilter, setCardCategoryFilter] = useState('all');

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "เปิดหน้าต่างสำหรับอัพโหลดไฟล์จำนวนมาก"
    });
  };

  const handleNewBatch = () => {
    window.location.href = '/add-card-one-by-one';
  };

  const cardStats = [
    {
      label: 'Total Cards Issued',
      value: selectedCampaign.cards.toLocaleString(),
      change: '+12.5%',
      color: 'text-blue-600'
    },
    {
      label: 'Active Cards',
      value: Math.floor(selectedCampaign.cards * 0.85).toLocaleString(),
      change: '+8.2%',
      color: 'text-green-600'
    },
    {
      label: 'Expired Cards',
      value: Math.floor(selectedCampaign.cards * 0.1).toLocaleString(),
      change: '+2.1%',
      color: 'text-red-600'
    },
    {
      label: 'Pending Activation',
      value: Math.floor(selectedCampaign.cards * 0.05).toLocaleString(),
      change: '-5.3%',
      color: 'text-yellow-600'
    }
  ];

  const cardTypes = [
    {
      type: 'Physical Cards',
      issued: Math.floor(selectedCampaign.cards * 0.4),
      active: Math.floor(selectedCampaign.cards * 0.35),
      expired: Math.floor(selectedCampaign.cards * 0.05)
    },
    {
      type: 'E-Gift Cards',
      issued: Math.floor(selectedCampaign.cards * 0.6),
      active: Math.floor(selectedCampaign.cards * 0.55),
      expired: Math.floor(selectedCampaign.cards * 0.05)
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับ
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {selectedCampaign.name}
              <Badge className="ml-2" variant={selectedCampaign.type === 'B2B' ? 'default' : 'secondary'}>
                {selectedCampaign.type}
              </Badge>
            </h1>
            <p className="text-muted-foreground">Dashboard สำหรับ campaign {selectedCampaign.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkUpload}>
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button onClick={handleNewBatch}>
            <Plus className="w-4 h-4 mr-2" />
            New Batch
          </Button>
        </div>
      </div>

      {/* Card Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardStats.map(stat => (
          <Card key={stat.label} className="border-muted">
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

      {/* Filter Section */}
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-lg">กรองข้อมูลบัตร</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={cardCategoryFilter} onValueChange={setCardCategoryFilter}>
                  <SelectTrigger className="w-[200px] bg-background border-border">
                    <SelectValue placeholder="เลือกประเภทผู้ใช้" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border shadow-lg z-50">
                    <SelectItem value="all">ทุกประเภท</SelectItem>
                    <SelectItem value="physical">Physical Cards</SelectItem>
                    <SelectItem value="egift">E-Gift Cards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" onClick={() => setCardCategoryFilter('all')}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">การกระจายประเภทบัตร</h3>
            <div className="space-y-6">
              {cardTypes.filter(card => {
                if (cardCategoryFilter === 'all') return true;
                if (cardCategoryFilter === 'physical') return card.type === 'Physical Cards';
                if (cardCategoryFilter === 'egift') return card.type === 'E-Gift Cards';
                return true;
              }).map(card => (
                <div key={card.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{card.type}</h4>
                    <span className="text-sm text-muted-foreground">{card.issued.toLocaleString()} Total</span>
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
          </div>
        </CardContent>
      </Card>

      {/* Additional Dashboard Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expiry Management</CardTitle>
            <CardDescription>จัดการบัตรที่กำลังจะหมดอายุ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-semibold text-yellow-600">
                    {Math.floor(selectedCampaign.cards * 0.02).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-semibold text-red-600">
                    {Math.floor(selectedCampaign.cards * 0.01).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Expired Today</p>
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Send Expiry Notifications
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top-Up & Reload Controls</CardTitle>
            <CardDescription>จัดการการเติมเงินและการโหลดใหม่</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Auto Top-Up</p>
                  <p className="text-sm text-muted-foreground">เติมเงินอัตโนมัติเมื่อยอดเงินต่ำ</p>
                </div>
                <Badge variant="outline" className="text-green-600">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Manual Reload</p>
                  <p className="text-sm text-muted-foreground">เติมเงินด้วยตนเอง</p>
                </div>
                <Badge variant="outline" className="text-green-600">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}