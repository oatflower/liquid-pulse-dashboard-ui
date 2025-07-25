import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, Store, DollarSign, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MerchantFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Merchant {
  id: string;
  name: string;
  category: string;
  floor: string;
  zoneArea: string;
  currentFee: number;
  monthlyFee: number;
  setupFee: number;
  status: string;
  paymentStatus: 'paid' | 'pending' | 'overdue' | 'failed';
  lastPayment: string;
  revenue: number;
}

export default function MerchantFilterModal({ isOpen, onClose }: MerchantFilterModalProps) {
  const { toast } = useToast();
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all');

  const merchants: Merchant[] = [
    { 
      id: '1', 
      name: 'Starbucks', 
      category: 'อาหารและเครื่องดื่ม', 
      floor: 'G', 
      zoneArea: 'A', 
      currentFee: 2.5, 
      monthlyFee: 29.99, 
      setupFee: 99.00, 
      status: 'active', 
      paymentStatus: 'paid',
      lastPayment: '2024-01-15',
      revenue: 125000
    },
    { 
      id: '2', 
      name: 'Amazon', 
      category: 'อีคอมเมิร์ซ', 
      floor: 'L2', 
      zoneArea: 'B', 
      currentFee: 2.0, 
      monthlyFee: 79.99, 
      setupFee: 199.00, 
      status: 'active', 
      paymentStatus: 'pending',
      lastPayment: '2024-01-10',
      revenue: 350000
    },
    { 
      id: '3', 
      name: 'Target', 
      category: 'ค้าปลีก', 
      floor: 'L1', 
      zoneArea: 'A', 
      currentFee: 2.5, 
      monthlyFee: 29.99, 
      setupFee: 99.00, 
      status: 'active', 
      paymentStatus: 'overdue',
      lastPayment: '2023-12-15',
      revenue: 89000
    },
    { 
      id: '4', 
      name: 'Walmart', 
      category: 'ค้าปลีก', 
      floor: 'G', 
      zoneArea: 'C', 
      currentFee: 2.5, 
      monthlyFee: 29.99, 
      setupFee: 99.00, 
      status: 'active', 
      paymentStatus: 'paid',
      lastPayment: '2024-01-20',
      revenue: 275000
    },
    { 
      id: '5', 
      name: 'Best Buy', 
      category: 'อิเล็กทรอนิกส์', 
      floor: 'L2', 
      zoneArea: 'B', 
      currentFee: 2.0, 
      monthlyFee: 79.99, 
      setupFee: 199.00, 
      status: 'active', 
      paymentStatus: 'failed',
      lastPayment: '2024-01-05',
      revenue: 180000
    },
    { 
      id: '6', 
      name: 'McDonald\'s', 
      category: 'อาหารและเครื่องดื่ม', 
      floor: 'L3', 
      zoneArea: 'C', 
      currentFee: 2.5, 
      monthlyFee: 29.99, 
      setupFee: 99.00, 
      status: 'active', 
      paymentStatus: 'paid',
      lastPayment: '2024-01-18',
      revenue: 95000
    },
    { 
      id: '7', 
      name: 'KFC', 
      category: 'อาหารและเครื่องดื่ม', 
      floor: 'L3', 
      zoneArea: 'A', 
      currentFee: 2.5, 
      monthlyFee: 29.99, 
      setupFee: 99.00, 
      status: 'active', 
      paymentStatus: 'pending',
      lastPayment: '2024-01-12',
      revenue: 78000
    },
    { 
      id: '8', 
      name: 'Central Department Store', 
      category: 'ค้าปลีก', 
      floor: 'L1', 
      zoneArea: 'B', 
      currentFee: 3.0, 
      monthlyFee: 49.99, 
      setupFee: 149.00, 
      status: 'active', 
      paymentStatus: 'paid',
      lastPayment: '2024-01-22',
      revenue: 420000
    }
  ];

  // Filter merchants based on search and filters
  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || merchant.category === selectedCategory;
    const matchesFloor = selectedFloor === 'all' || merchant.floor === selectedFloor;
    const matchesZone = selectedZone === 'all' || merchant.zoneArea === selectedZone;
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || merchant.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesCategory && matchesFloor && matchesZone && matchesPaymentStatus;
  });

  // Get unique values for filters
  const categories = [...new Set(merchants.map(m => m.category))];
  const floors = [...new Set(merchants.map(m => m.floor))];
  const zones = [...new Set(merchants.map(m => m.zoneArea))];

  const handleMerchantSelect = (merchantId: string) => {
    setSelectedMerchants(prev => 
      prev.includes(merchantId) 
        ? prev.filter(id => id !== merchantId)
        : [...prev, merchantId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMerchants.length === filteredMerchants.length) {
      setSelectedMerchants([]);
    } else {
      setSelectedMerchants(filteredMerchants.map(m => m.id));
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'ชำระแล้ว';
      case 'pending':
        return 'รอชำระ';
      case 'overdue':
        return 'เกินกำหนด';
      case 'failed':
        return 'ชำระไม่สำเร็จ';
      default:
        return status;
    }
  };

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleApplyAction = () => {
    if (selectedMerchants.length === 0) {
      toast({
        title: "กรุณาเลือกร้านค้า",
        description: "เลือกร้านค้าอย่างน้อย 1 ร้านเพื่อดำเนินการ",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "ดำเนินการสำเร็จ",
      description: `ดำเนินการกับ ${selectedMerchants.length} ร้านค้าเรียบร้อยแล้ว`
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            ฟิลเตอร์และจัดการร้านค้า
          </DialogTitle>
          <DialogDescription>
            ค้นหาและกรองร้านค้าตามเงื่อนไขต่างๆ เพื่อจัดการข้อมูลอย่างมีประสิทธิภาพ
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filter Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ตัวกรองและค้นหา</CardTitle>
              <CardDescription>
                ใช้ตัวกรองด้านล่างเพื่อค้นหาร้านค้าที่ต้องการ ({filteredMerchants.length} จาก {merchants.length} ร้าน)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="ค้นหาร้านค้าตามชื่อ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">หมวดหมู่</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">ชั้น</Label>
                  <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกชั้น" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      {floors.map(floor => (
                        <SelectItem key={floor} value={floor}>
                          {floor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">โซน</Label>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกโซน" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      {zones.map(zone => (
                        <SelectItem key={zone} value={zone}>
                          โซน {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">สถานะการชำระเงิน</Label>
                  <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกสถานะ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="paid">ชำระแล้ว</SelectItem>
                      <SelectItem value="pending">รอชำระ</SelectItem>
                      <SelectItem value="overdue">เกินกำหนด</SelectItem>
                      <SelectItem value="failed">ชำระไม่สำเร็จ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedFloor('all');
                      setSelectedZone('all');
                      setSelectedPaymentStatus('all');
                    }}
                    className="w-full"
                  >
                    ล้างฟิลเตอร์
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Controls */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">รายการร้านค้า ({selectedMerchants.length} รายการที่เลือก)</h3>
            <Button variant="outline" onClick={handleSelectAll}>
              {selectedMerchants.length === filteredMerchants.length ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
            </Button>
          </div>

          {/* Merchant List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredMerchants.map((merchant) => (
              <Card key={merchant.id} className={`cursor-pointer transition-colors ${
                selectedMerchants.includes(merchant.id) ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={selectedMerchants.includes(merchant.id)}
                        onCheckedChange={() => handleMerchantSelect(merchant.id)}
                      />
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Store className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{merchant.name}</h4>
                        <p className="text-sm text-muted-foreground">{merchant.category}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            ชั้น {merchant.floor}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            โซน {merchant.zoneArea}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">ค่าธรรมเนียม: </span>
                        <span className="font-medium">{merchant.currentFee}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">รายได้: </span>
                        <span className="font-medium">฿{merchant.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPaymentStatusIcon(merchant.paymentStatus)}
                        <Badge variant={getPaymentStatusVariant(merchant.paymentStatus)} className="text-xs">
                          {getPaymentStatusText(merchant.paymentStatus)}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ชำระล่าสุด: {merchant.lastPayment}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMerchants.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              ไม่พบร้านค้าที่ตรงกับเงื่อนไขการค้นหา
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={handleApplyAction}>
            <DollarSign className="w-4 h-4 mr-2" />
            ดำเนินการกับร้านค้าที่เลือก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}