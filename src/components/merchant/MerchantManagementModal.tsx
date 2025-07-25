import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Edit, UserCheck, AlertTriangle, DollarSign, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MerchantManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MerchantManagementModal({ isOpen, onClose }: MerchantManagementModalProps) {
  const { toast } = useToast();

  const allPendingMerchants = [
    { 
      name: 'Local Coffee Shop', 
      category: 'อาหารและเครื่องดื่ม', 
      submitted: '2 days ago', 
      documents: 'สมบูรณ์',
      revenue: 45000,
      risk: 'ต่ำ',
      contact: 'coffee@local.com'
    },
    { 
      name: 'Tech Gadgets Store', 
      category: 'อิเล็กทรอนิกส์', 
      submitted: '3 days ago', 
      documents: 'รอเอกสาร',
      revenue: 120000,
      risk: 'กลาง',
      contact: 'tech@gadgets.com'
    },
    { 
      name: 'Fashion Boutique', 
      category: 'ค้าปลีก', 
      submitted: '1 week ago', 
      documents: 'สมบูรณ์',
      revenue: 75000,
      risk: 'ต่ำ',
      contact: 'info@fashion.com'
    },
    { 
      name: 'Auto Parts Shop', 
      category: 'ยานยนต์', 
      submitted: '5 days ago', 
      documents: 'สมบูรณ์',
      revenue: 95000,
      risk: 'กลาง',
      contact: 'auto@parts.com'
    },
    { 
      name: 'Beauty Salon', 
      category: 'ความงาม', 
      submitted: '1 day ago', 
      documents: 'รอเอกสาร',
      revenue: 35000,
      risk: 'ต่ำ',
      contact: 'beauty@salon.com'
    }
  ];

  const handleApprove = (merchantName: string) => {
    toast({
      title: "อนุมัติร้านค้า",
      description: `อนุมัติ ${merchantName} เรียบร้อยแล้ว`
    });
  };

  const handleReject = (merchantName: string) => {
    toast({
      title: "ปฏิเสธร้านค้า",
      description: `ปฏิเสธ ${merchantName} เรียบร้อยแล้ว`,
      variant: "destructive"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            จัดการร้านค้ารออนุมัติ
          </DialogTitle>
          <DialogDescription>
            รายละเอียดและการจัดการร้านค้าที่รออนุมัติทั้งหมด
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">รออนุมัติ ({allPendingMerchants.length})</TabsTrigger>
            <TabsTrigger value="review">กำลังตรวจสอบ (2)</TabsTrigger>
            <TabsTrigger value="rejected">ถูกปฏิเสธ (3)</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="space-y-4">
              {allPendingMerchants.map((merchant, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-lg">{merchant.name}</h4>
                          <Badge variant={merchant.documents === 'สมบูรณ์' ? 'default' : 'secondary'}>
                            {merchant.documents}
                          </Badge>
                          <Badge variant="outline" className={
                            merchant.risk === 'ต่ำ' ? 'text-green-600' : 
                            merchant.risk === 'กลาง' ? 'text-yellow-600' : 'text-red-600'
                          }>
                            ความเสี่ยง: {merchant.risk}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">หมวดหมู่:</span>
                            <p className="font-medium">{merchant.category}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ส่งเมื่อ:</span>
                            <p className="font-medium">{merchant.submitted}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">รายได้ประมาณ:</span>
                            <p className="font-medium">฿{merchant.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ติดต่อ:</span>
                            <p className="font-medium">{merchant.contact}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          ดูรายละเอียด
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReject(merchant.name)}
                        >
                          ปฏิเสธ
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleApprove(merchant.name)}
                        >
                          อนุมัติ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">ไม่มีร้านค้าที่กำลังตรวจสอบ</h3>
                <p className="text-muted-foreground">ร้านค้าที่อยู่ในขั้นตอนการตรวจสอบจะแสดงที่นี่</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <Card>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">ร้านค้าที่ถูกปฏิเสธ</h3>
                <p className="text-muted-foreground">ร้านค้าที่ถูกปฏิเสธจะแสดงที่นี่</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            ปิด
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}