import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Trash2, Edit, Eye, Calendar, Users, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export default function CampaignManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const campaigns = [
    {
      id: 'CAMP-001',
      name: 'Holiday Campaign 2024',
      description: 'Special holiday promotion for corporate clients',
      status: 'active',
      totalCards: 50000,
      activeCards: 47500,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 25000000,
      type: 'corporate'
    },
    {
      id: 'CAMP-002', 
      name: 'Employee Benefits Q1',
      description: 'Quarterly employee reward program',
      status: 'active',
      totalCards: 15000,
      activeCards: 14200,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      budget: 7500000,
      type: 'employee'
    },
    {
      id: 'CAMP-003',
      name: 'Summer Promotion',
      description: 'Limited time summer sale campaign',
      status: 'completed',
      totalCards: 25000,
      activeCards: 0,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      budget: 12500000,
      type: 'promotion'
    },
    {
      id: 'CAMP-004',
      name: 'Back to School',
      description: 'Education sector promotional campaign',
      status: 'draft',
      totalCards: 0,
      activeCards: 0,
      startDate: '2024-08-15',
      endDate: '2024-09-30',
      budget: 5000000,
      type: 'education'
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectCampaign = (campaignId: string) => {
    // Navigate to CardInventory with selected campaign
    window.location.href = `/card-inventory?campaign=${campaignId}`;
  };

  const handleDeleteCampaign = (campaignId: string, campaignName: string) => {
    toast({
      title: "ลบ Campaign",
      description: `ลบ ${campaignName} เรียบร้อยแล้ว`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">ใช้งานอยู่</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">เสร็จสิ้น</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">ร่าง</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Campaign Management</h1>
          <p className="text-muted-foreground">เลือก Campaign เพื่อบริหารการ์ดและดูสถานะ</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              สร้าง Campaign ใหม่
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>สร้าง Campaign ใหม่</DialogTitle>
              <DialogDescription>
                กรอกข้อมูลเพื่อสร้าง Campaign ใหม่
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ชื่อ Campaign</label>
                <Input placeholder="กรอกชื่อ Campaign" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">คำอธิบาย</label>
                <Input placeholder="กรอกคำอธิบาย" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ประเภท</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="employee">Employee Benefits</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  ยกเลิก
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "สร้าง Campaign",
                      description: "สร้าง Campaign ใหม่เรียบร้อยแล้ว"
                    });
                    setIsCreateDialogOpen(false);
                  }}
                >
                  สร้าง
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>ค้นหาและกรอง Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาชื่อ Campaign หรือคำอธิบาย..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="กรองตามสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกสถานะ</SelectItem>
                <SelectItem value="active">ใช้งานอยู่</SelectItem>
                <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                <SelectItem value="draft">ร่าง</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaign List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <CardDescription className="mt-1">{campaign.description}</CardDescription>
                </div>
                {getStatusBadge(campaign.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span>{campaign.totalCards.toLocaleString()} การ์ด</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{campaign.activeCards.toLocaleString()} ใช้งาน</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{campaign.startDate}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">฿{campaign.budget.toLocaleString()}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleSelectCampaign(campaign.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  เลือก
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteCampaign(campaign.id, campaign.name)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">ไม่พบ Campaign ที่ตรงกับเงื่อนไขการค้นหา</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}