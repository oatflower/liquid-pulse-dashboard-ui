import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Upload, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MerchantKYMModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MerchantKYMModal({ isOpen, onClose }: MerchantKYMModalProps) {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Submit Application",
      description: "ส่งใบสมัครสำหรับการตรวจสอบ KYM เรียบร้อยแล้ว"
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            เพิ่มร้านค้าใหม่
          </DialogTitle>
          <DialogDescription>
            KYM (Know Your Merchant) Process - ขั้นตอนการตรวจสอบและรับรอง Merchant
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">ข้อมูลพื้นฐาน</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">ชื่อธุรกิจ</label>
                <Input placeholder="กรอกชื่อธุรกิจ" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ประเภทธุรกิจ</label>
                  <Input placeholder="อาหารและเครื่องดื่ม" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">อีเมลติดต่อ</label>
                  <Input type="email" placeholder="contact@business.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ที่อยู่ธุรกิจ</label>
                <Input placeholder="123 Main St, City, State" />
              </div>
            </div>
          </div>

          <Separator />

          {/* KYM Documents */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">เอกสาร KYM</h4>
            <div className="space-y-4">
              {/* Business Registration */}
              <div className="space-y-2">
                <label className="text-sm font-medium">ใบจัดตั้งร้านค้า / หนังสือรับรองการจดทะเบียน</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm">อัพโหลดใบจัดตั้งร้านค้า</p>
                      <p className="text-xs text-muted-foreground">รองรับไฟล์ PDF, JPG, PNG (ขนาดไม่เกิน 5MB)</p>
                    </div>
                    <Button variant="outline" size="sm">เลือกไฟล์</Button>
                  </div>
                </div>
              </div>

              {/* ID Card */}
              <div className="space-y-2">
                <label className="text-sm font-medium">บัตรประจำตัวประชาชน / Passport</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm">อัพโหลดบัตรประจำตัว (หน้า-หลัง)</p>
                      <p className="text-xs text-muted-foreground">รองรับไฟล์ PDF, JPG, PNG (ขนาดไม่เกิน 5MB)</p>
                    </div>
                    <Button variant="outline" size="sm">เลือกไฟล์</Button>
                  </div>
                </div>
              </div>

              {/* Bank Account */}
              <div className="space-y-2">
                <label className="text-sm font-medium">หนังสือรับรองบัญชีธนาคาร</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm">อัพโหลดหนังสือรับรองบัญชี / สมุดคู่ฝาก</p>
                      <p className="text-xs text-muted-foreground">รองรับไฟล์ PDF, JPG, PNG (ขนาดไม่เกิน 5MB)</p>
                    </div>
                    <Button variant="outline" size="sm">เลือกไฟล์</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Fee Structure */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">โครงสร้างค่าธรรมเนียม</h4>
            <div className="space-y-2">
              <label className="text-sm font-medium">ค่าธรรมเนียม</label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="เปอร์เซ็นต์ต่อธุรกรรม (%)" />
                <Input placeholder="ค่าธรรมเนียมรายเดือน (฿)" />
              </div>
            </div>
          </div>

          <Separator />

          {/* KYM Verification Status */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">สถานะการตรวจสอบ</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg text-center">
                <Badge variant="secondary" className="mb-2">รอดำเนินการ</Badge>
                <p className="text-xs text-muted-foreground">เอกสารพื้นฐาน</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <Badge variant="secondary" className="mb-2">รอดำเนินการ</Badge>
                <p className="text-xs text-muted-foreground">ตรวจสอบ KYM</p>
              </div>
              <div className="p-3 border rounded-lg text-center">
                <Badge variant="secondary" className="mb-2">รอดำเนินการ</Badge>
                <p className="text-xs text-muted-foreground">อนุมัติสุดท้าย</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              ยกเลิก
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              ส่งใบสมัคร
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}