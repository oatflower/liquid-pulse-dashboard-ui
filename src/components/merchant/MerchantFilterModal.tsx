import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MerchantFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Merchant {
  id: string;
  name: string;
  category: string;
  floor: string;
  zone: string;
  paymentStatus: string;
  revenue: number;
  transactions: number;
}

export default function MerchantFilterModal({ isOpen, onClose }: MerchantFilterModalProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);

  // Mock data for demonstration
  const merchants: Merchant[] = [
    { id: '1', name: 'Starbucks', category: 'Food & Beverage', floor: 'G', zone: 'A', paymentStatus: 'Active', revenue: 87500, transactions: 15420 },
    { id: '2', name: 'Amazon', category: 'Electronics', floor: '2', zone: 'B', paymentStatus: 'Active', revenue: 156000, transactions: 12890 },
    { id: '3', name: 'Target', category: 'Retail', floor: '1', zone: 'C', paymentStatus: 'Pending', revenue: 74200, transactions: 9640 },
    { id: '4', name: 'Walmart', category: 'Retail', floor: 'G', zone: 'A', paymentStatus: 'Active', revenue: 68900, transactions: 8750 },
    { id: '5', name: 'Best Buy', category: 'Electronics', floor: '3', zone: 'B', paymentStatus: 'Suspended', revenue: 92100, transactions: 7230 },
    { id: '6', name: 'Local Coffee Shop', category: 'Food & Beverage', floor: '2', zone: 'C', paymentStatus: 'Pending', revenue: 12000, transactions: 890 },
  ];

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || merchant.category === selectedCategory;
    const matchesFloor = selectedFloor === '' || merchant.floor === selectedFloor;
    const matchesZone = selectedZone === '' || merchant.zone === selectedZone;
    const matchesPaymentStatus = selectedPaymentStatus === '' || merchant.paymentStatus === selectedPaymentStatus;
    
    return matchesSearch && matchesCategory && matchesFloor && matchesZone && matchesPaymentStatus;
  });

  const categories = [...new Set(merchants.map(m => m.category))];
  const floors = [...new Set(merchants.map(m => m.floor))];
  const zones = [...new Set(merchants.map(m => m.zone))];
  const paymentStatuses = [...new Set(merchants.map(m => m.paymentStatus))];

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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedFloor('');
    setSelectedZone('');
    setSelectedPaymentStatus('');
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Merchants
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                <SelectTrigger>
                  <SelectValue placeholder="Floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Floors</SelectItem>
                  {floors.map(floor => (
                    <SelectItem key={floor} value={floor}>Floor {floor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Zones</SelectItem>
                  {zones.map(zone => (
                    <SelectItem key={zone} value={zone}>Zone {zone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {paymentStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
              <div className="text-sm text-muted-foreground">
                {filteredMerchants.length} merchants found
              </div>
            </div>
          </div>

          {/* Merchant List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedMerchants.length === filteredMerchants.length && filteredMerchants.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">Select All ({selectedMerchants.length} selected)</span>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredMerchants.map(merchant => (
                <div key={merchant.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={selectedMerchants.includes(merchant.id)}
                    onCheckedChange={() => handleMerchantSelect(merchant.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{merchant.name}</h4>
                      <Badge className={getPaymentStatusColor(merchant.paymentStatus)}>
                        {merchant.paymentStatus}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <span>Category: {merchant.category}</span>
                      <span>Floor: {merchant.floor}</span>
                      <span>Zone: {merchant.zone}</span>
                      <span>Revenue: ${merchant.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose} disabled={selectedMerchants.length === 0}>
              Apply Filters ({selectedMerchants.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}