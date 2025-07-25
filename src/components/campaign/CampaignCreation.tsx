import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Save, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface CampaignCreationProps {
  onBack: () => void;
  onSave: (campaign: any) => void;
}

export default function CampaignCreation({ onBack, onSave }: CampaignCreationProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [campaignData, setCampaignData] = useState({
    name: '',
    type: '', // B2B or B2C
    amount: '',
    cardValue: '',
    expiryDate: '',
    description: ''
  });

  const handleSave = () => {
    if (!campaignData.name || !campaignData.type || !campaignData.amount) {
      toast({
        title: "Error",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    onSave(campaignData);
    toast({
      title: "Success",
      description: "สร้าง campaign สำเร็จแล้ว"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับ
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">สร้าง Campaign ใหม่</h1>
          <p className="text-muted-foreground">ตั้งค่าและสร้าง campaign สำหรับบัตรกำนัล</p>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>ข้อมูล Campaign</CardTitle>
          <CardDescription>กรอกข้อมูลพื้นฐานของ campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">ชื่อ Campaign *</label>
              <Input 
                placeholder="เช่น Holiday Campaign 2024"
                value={campaignData.name}
                onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">ประเภท Campaign *</label>
              <Select value={campaignData.type} onValueChange={(value) => setCampaignData({...campaignData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B2B">B2B - Corporate</SelectItem>
                  <SelectItem value="B2C">B2C - Consumer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">จำนวนบัตร *</label>
              <Input 
                type="number"
                placeholder="10,000"
                value={campaignData.amount}
                onChange={(e) => setCampaignData({...campaignData, amount: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">มูลค่าบัตร (บาท)</label>
              <Input 
                type="number"
                placeholder="500"
                value={campaignData.cardValue}
                onChange={(e) => setCampaignData({...campaignData, cardValue: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">วันที่หมดอายุ</label>
              <Input 
                type="date"
                value={campaignData.expiryDate}
                onChange={(e) => setCampaignData({...campaignData, expiryDate: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">รายละเอียด</label>
            <Input 
              placeholder="รายละเอียดเพิ่มเติมของ campaign"
              value={campaignData.description}
              onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
            />
          </div>

          {campaignData.type === 'B2B' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Whitelist Upload (สำหรับ B2B)</label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">อัพโหลดไฟล์ CSV รายชื่อผู้ใช้</p>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              บันทึก Campaign
            </Button>
            <Button variant="outline" onClick={onBack} className="flex-1">
              ยกเลิก
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}