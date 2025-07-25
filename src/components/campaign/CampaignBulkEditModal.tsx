import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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

interface CampaignBulkEditModalProps {
  campaigns: Campaign[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaignIds: string[], updates: Partial<Campaign>) => void;
}

export default function CampaignBulkEditModal({ campaigns, isOpen, onClose, onSave }: CampaignBulkEditModalProps) {
  const { toast } = useToast();
  const [bulkUpdates, setBulkUpdates] = useState<Partial<Campaign>>({});

  const handleSave = () => {
    if (Object.keys(bulkUpdates).length === 0) {
      toast({
        title: "แจ้งเตือน",
        description: "กรุณาเลือกข้อมูลที่ต้องการแก้ไข",
        variant: "destructive"
      });
      return;
    }

    onSave(campaigns.map(c => c.id), bulkUpdates);
    toast({
      title: "สำเร็จ",
      description: `แก้ไข ${campaigns.length} campaigns สำเร็จแล้ว`
    });
    setBulkUpdates({});
  };

  const handleUpdateChange = (field: keyof Campaign, value: string) => {
    setBulkUpdates(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            แก้ไขแบบกลุ่ม
            <Badge variant="outline">
              {campaigns.length} campaigns
            </Badge>
          </DialogTitle>
          <DialogDescription>
            แก้ไขข้อมูลหลาย campaigns พร้อมกัน
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Campaigns ที่เลือก:</label>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="text-xs p-2 bg-muted rounded">
                  {campaign.name} ({campaign.id})
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">เปลี่ยนประเภท Campaign</label>
            <Select 
              value={bulkUpdates.type || ''} 
              onValueChange={(value: 'B2B' | 'B2C') => handleUpdateChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกประเภทใหม่ (ไม่เปลี่ยนแปลงหากไม่เลือก)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B2B">B2B - Corporate</SelectItem>
                <SelectItem value="B2C">B2C - Consumer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">เปลี่ยนสถานะ</label>
            <Select 
              value={bulkUpdates.status || ''} 
              onValueChange={(value: 'active' | 'pending' | 'completed') => handleUpdateChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะใหม่ (ไม่เปลี่ยนแปลงหากไม่เลือก)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            ยกเลิก
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            บันทึกการเปลี่ยนแปลง
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}