import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Campaign {
  id: string;
  name: string;
  type: 'B2B' | 'B2C';
  cards: number;
  status: 'active' | 'pending' | 'completed';
  createdDate: string;
}

interface CampaignEditModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaign: Campaign) => void;
}

export default function CampaignEditModal({ campaign, isOpen, onClose, onSave }: CampaignEditModalProps) {
  const { toast } = useToast();
  const [editedCampaign, setEditedCampaign] = useState<Campaign>(campaign);

  const handleSave = () => {
    if (!editedCampaign.name || !editedCampaign.type) {
      toast({
        title: "Error",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    onSave(editedCampaign);
    toast({
      title: "Success",
      description: `แก้ไข campaign ${editedCampaign.name} สำเร็จแล้ว`
    });
  };

  const handleInputChange = (field: keyof Campaign, value: string | number) => {
    setEditedCampaign(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            แก้ไข Campaign
            <Badge variant={campaign.type === 'B2B' ? 'default' : 'secondary'}>
              {campaign.type}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            แก้ไขข้อมูล campaign {campaign.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">ชื่อ Campaign *</label>
            <Input
              value={editedCampaign.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="ชื่อ campaign"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ประเภท Campaign *</label>
            <Select 
              value={editedCampaign.type} 
              onValueChange={(value: 'B2B' | 'B2C') => handleInputChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B2B">B2B - Corporate</SelectItem>
                <SelectItem value="B2C">B2C - Consumer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">จำนวนบัตร</label>
            <Input
              type="number"
              value={editedCampaign.cards}
              onChange={(e) => handleInputChange('cards', parseInt(e.target.value) || 0)}
              placeholder="จำนวนบัตร"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">สถานะ</label>
            <Select 
              value={editedCampaign.status} 
              onValueChange={(value: 'active' | 'pending' | 'completed') => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">วันที่สร้าง</label>
            <Input
              type="date"
              value={editedCampaign.createdDate}
              onChange={(e) => handleInputChange('createdDate', e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            ยกเลิก
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}