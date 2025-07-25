import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, DollarSign, Check, Store, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MerchantFeeConfigModalProps {
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
}

interface FeeStructure {
  transactionFee: number;
  monthlyFee: number;
  setupFee: number;
}

export default function MerchantFeeConfigModal({ isOpen, onClose }: MerchantFeeConfigModalProps) {
  const { toast } = useToast();
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [feeStructure, setFeeStructure] = useState<FeeStructure>({
    transactionFee: 2.5,
    monthlyFee: 29.99,
    setupFee: 99.00
  });

  const merchants: Merchant[] = [
    { id: '1', name: 'Starbucks', category: 'อาหารและเครื่องดื่ม', floor: 'G', zoneArea: 'A', currentFee: 2.5, monthlyFee: 29.99, setupFee: 99.00, status: 'active' },
    { id: '2', name: 'Amazon', category: 'อีคอมเมิร์ซ', floor: 'L2', zoneArea: 'B', currentFee: 2.0, monthlyFee: 79.99, setupFee: 199.00, status: 'active' },
    { id: '3', name: 'Target', category: 'ค้าปลีก', floor: 'L1', zoneArea: 'A', currentFee: 2.5, monthlyFee: 29.99, setupFee: 99.00, status: 'active' },
    { id: '4', name: 'Walmart', category: 'ค้าปลีก', floor: 'G', zoneArea: 'C', currentFee: 2.5, monthlyFee: 29.99, setupFee: 99.00, status: 'active' },
    { id: '5', name: 'Best Buy', category: 'อิเล็กทรอนิกส์', floor: 'L2', zoneArea: 'B', currentFee: 2.0, monthlyFee: 79.99, setupFee: 199.00, status: 'active' },
    { id: '6', name: 'McDonald\'s', category: 'อาหารและเครื่องดื่ม', floor: 'L3', zoneArea: 'C', currentFee: 2.5, monthlyFee: 29.99, setupFee: 99.00, status: 'active' },
    { id: '7', name: 'KFC', category: 'อาหารและเครื่องดื่ม', floor: 'L3', zoneArea: 'A', currentFee: 2.5, monthlyFee: 29.99, setupFee: 99.00, status: 'active' },
    { id: '8', name: 'Central Department Store', category: 'ค้าปลีก', floor: 'L1', zoneArea: 'B', currentFee: 3.0, monthlyFee: 49.99, setupFee: 149.00, status: 'active' }
  ];

  // Filter merchants based on search and filters
  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || merchant.category === selectedCategory;
    const matchesFloor = selectedFloor === 'all' || merchant.floor === selectedFloor;
    const matchesZone = selectedZone === 'all' || merchant.zoneArea === selectedZone;
    
    return matchesSearch && matchesCategory && matchesFloor && matchesZone;
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
    if (selectedMerchants.length === merchants.length) {
      setSelectedMerchants([]);
    } else {
      setSelectedMerchants(merchants.map(m => m.id));
    }
  };

  const handleApplyFees = () => {
    if (selectedMerchants.length === 0) {
      toast({
        title: "กรุณาเลือกร้านค้า",
        description: "เลือกร้านค้าอย่างน้อย 1 ร้านเพื่อกำหนดค่าธรรมเนียม",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "อัปเดตค่าธรรมเนียมสำเร็จ",
      description: `อัปเดตค่าธรรมเนียมสำหรับ ${selectedMerchants.length} ร้านค้าเรียบร้อยแล้ว`
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            กำหนดค่าธรรมเนียมร้านค้า
          </DialogTitle>
          <DialogDescription>
            เลือกร้านค้าและกำหนดค่าธรรมเนียมสำหรับร้านค้าที่เลือก
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="select" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="select">เลือกร้านค้า ({selectedMerchants.length})</TabsTrigger>
            <TabsTrigger value="config">กำหนดค่าธรรมเนียม</TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">เลือกร้านค้า ({filteredMerchants.length} จาก {merchants.length})</h3>
              <Button variant="outline" onClick={handleSelectAll}>
                {selectedMerchants.length === merchants.length ? 'ยกเลิกทั้งหมด' : 'เลือกทั้งหมด'}
              </Button>
            </div>

            {/* Search and Filter Section */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="ค้นหาร้านค้า..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        หมวดหมู่
                      </Label>
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

                    <div className="flex items-end">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                          setSelectedFloor('all');
                          setSelectedZone('all');
                        }}
                        className="w-full"
                      >
                        ล้างฟิลเตอร์
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
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
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">ค่าธรรมเนียมปัจจุบัน: </span>
                          <span className="font-medium">{merchant.currentFee}%</span>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          {merchant.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  กำหนดค่าธรรมเนียม
                </CardTitle>
                <CardDescription>
                  ค่าธรรมเนียมที่กำหนดจะนำไปใช้กับร้านค้าที่เลือกทั้งหมด ({selectedMerchants.length} ร้าน)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="transactionFee">ค่าธรรมเนียมต่อธุรกรรม (%)</Label>
                    <Input
                      id="transactionFee"
                      type="number"
                      step="0.1"
                      value={feeStructure.transactionFee}
                      onChange={(e) => setFeeStructure(prev => ({
                        ...prev,
                        transactionFee: parseFloat(e.target.value) || 0
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyFee">ค่าธรรมเนียมรายเดือน ($)</Label>
                    <Input
                      id="monthlyFee"
                      type="number"
                      step="0.01"
                      value={feeStructure.monthlyFee}
                      onChange={(e) => setFeeStructure(prev => ({
                        ...prev,
                        monthlyFee: parseFloat(e.target.value) || 0
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setupFee">ค่าธรรมเนียมติดตั้ง ($)</Label>
                    <Input
                      id="setupFee"
                      type="number"
                      step="0.01"
                      value={feeStructure.setupFee}
                      onChange={(e) => setFeeStructure(prev => ({
                        ...prev,
                        setupFee: parseFloat(e.target.value) || 0
                      }))}
                    />
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-3">ตัวอย่างค่าธรรมเนียม</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>ค่าธรรมเนียมต่อธุรกรรม:</span>
                      <span className="font-medium">{feeStructure.transactionFee}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ค่าธรรมเนียมรายเดือน:</span>
                      <span className="font-medium">${feeStructure.monthlyFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ค่าธรรมเนียมติดตั้ง:</span>
                      <span className="font-medium">${feeStructure.setupFee}</span>
                    </div>
                  </div>
                </div>

                {selectedMerchants.length > 0 && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">ร้านค้าที่เลือก ({selectedMerchants.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMerchants.map(id => {
                        const merchant = merchants.find(m => m.id === id);
                        return merchant ? (
                          <Badge key={id} variant="secondary">
                            {merchant.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={handleApplyFees}>
            <Check className="w-4 h-4 mr-2" />
            นำไปใช้ค่าธรรมเนียม
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}