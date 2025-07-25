import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import CampaignEditModal from './CampaignEditModal';

interface Campaign {
  id: string;
  name: string;
  type: 'B2B' | 'B2C';
  cards: number;
  status: 'active' | 'pending' | 'completed';
  createdDate: string;
}

interface CampaignSelectionProps {
  onSelectCampaign: (campaign: Campaign) => void;
  onCreateNew: () => void;
  onEditCampaign: (campaign: Campaign) => void;
  onDeleteCampaign: (campaignId: string) => void;
}

export default function CampaignSelection({ 
  onSelectCampaign, 
  onCreateNew, 
  onEditCampaign, 
  onDeleteCampaign 
}: CampaignSelectionProps) {
  
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  
  const b2bCampaigns: Campaign[] = [
    { id: 'B2B-001', name: 'Corporate Rewards Q1 2024', type: 'B2B', cards: 25000, status: 'active', createdDate: '2024-01-15' },
    { id: 'B2B-002', name: 'Employee Benefits Program', type: 'B2B', cards: 15000, status: 'active', createdDate: '2024-01-10' },
    { id: 'B2B-003', name: 'Partner Incentive Campaign', type: 'B2B', cards: 8500, status: 'pending', createdDate: '2024-01-08' }
  ];

  const b2cCampaigns: Campaign[] = [
    { id: 'B2C-001', name: 'Holiday Campaign 2024', type: 'B2C', cards: 50000, status: 'active', createdDate: '2024-01-20' },
    { id: 'B2C-002', name: 'Summer Promotion', type: 'B2C', cards: 35000, status: 'completed', createdDate: '2024-01-12' },
    { id: 'B2C-003', name: 'New Year Special', type: 'B2C', cards: 20000, status: 'pending', createdDate: '2024-01-05' }
  ];

  const allCampaigns = [...b2bCampaigns, ...b2cCampaigns];

  const handleSelectCampaign = (campaignId: string, checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(prev => [...prev, campaignId]);
    } else {
      setSelectedCampaigns(prev => prev.filter(id => id !== campaignId));
    }
  };

  const handleSelectAll = (campaigns: Campaign[], checked: boolean) => {
    const campaignIds = campaigns.map(c => c.id);
    if (checked) {
      setSelectedCampaigns(prev => [...new Set([...prev, ...campaignIds])]);
    } else {
      setSelectedCampaigns(prev => prev.filter(id => !campaignIds.includes(id)));
    }
  };

  const handleSelectAllCampaigns = (checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(allCampaigns.map(c => c.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

  const handleEditClick = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsEditModalOpen(true);
  };

  const handleViewDashboard = () => {
    if (selectedCampaigns.length === 1) {
      const campaign = allCampaigns.find(c => c.id === selectedCampaigns[0]);
      if (campaign) {
        onSelectCampaign(campaign);
      }
    }
  };

  const handleSaveEdit = (updatedCampaign: Campaign) => {
    onEditCampaign(updatedCampaign);
    setIsEditModalOpen(false);
    setEditingCampaign(null);
  };

  const isAllB2BSelected = b2bCampaigns.every(c => selectedCampaigns.includes(c.id));
  const isAllB2CSelected = b2cCampaigns.every(c => selectedCampaigns.includes(c.id));
  const isAllSelected = allCampaigns.every(c => selectedCampaigns.includes(c.id));

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <Checkbox
            checked={selectedCampaigns.includes(campaign.id)}
            onCheckedChange={(checked) => handleSelectCampaign(campaign.id, checked as boolean)}
          />
          <div className="flex-1 cursor-pointer" onClick={() => onSelectCampaign(campaign)}>
            <p className="font-medium">{campaign.name}</p>
            <p className="text-sm text-muted-foreground">{campaign.id} • {campaign.cards.toLocaleString()} cards</p>
            <p className="text-xs text-muted-foreground">สร้างเมื่อ: {campaign.createdDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'completed' ? 'secondary' : 'outline'}>
            {campaign.status}
          </Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onSelectCampaign(campaign)} className="flex-1">
          <Eye className="w-3 h-3 mr-1" />
          ดูรายละเอียด
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleEditClick(campaign)}>
          <Edit className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => onDeleteCampaign(campaign.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Card & Campaign Management</h1>
          <p className="text-muted-foreground">เลือก campaign เพื่อจัดการบัตรกำนัล หรือสร้าง campaign ใหม่</p>
        </div>
        <Button onClick={onCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          สร้าง Campaign ใหม่
        </Button>
      </div>

      {/* Selection Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAllCampaigns}
                />
                <span className="text-sm font-medium">เลือกทั้งหมด ({selectedCampaigns.length}/{allCampaigns.length})</span>
              </div>
            </div>
            {selectedCampaigns.length > 0 && (
              <div className="flex gap-2">
                {selectedCampaigns.length === 1 && (
                  <Button size="sm" onClick={handleViewDashboard}>
                    <Eye className="w-4 h-4 mr-2" />
                    ดู Dashboard
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  แก้ไขแบบกลุ่ม ({selectedCampaigns.length})
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  ลบที่เลือก ({selectedCampaigns.length})
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* B2B Campaigns */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>B2B Campaigns</CardTitle>
                <CardDescription>Campaign สำหรับลูกค้าองค์กร</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isAllB2BSelected}
                  onCheckedChange={(checked) => handleSelectAll(b2bCampaigns, checked as boolean)}
                />
                <span className="text-sm">เลือกทั้งหมด</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {b2bCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* B2C Campaigns */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>B2C Campaigns</CardTitle>
                <CardDescription>Campaign สำหรับลูกค้าทั่วไป</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isAllB2CSelected}
                  onCheckedChange={(checked) => handleSelectAll(b2cCampaigns, checked as boolean)}
                />
                <span className="text-sm">เลือกทั้งหมด</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {b2cCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      {editingCampaign && (
        <CampaignEditModal
          campaign={editingCampaign}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCampaign(null);
          }}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}