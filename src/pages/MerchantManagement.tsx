import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Store, Plus, Edit, Eye, DollarSign, Calendar, Users, TrendingUp, Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import MerchantBulkUploadModal from '@/components/merchant/MerchantBulkUploadModal';
import MerchantKYMModal from '@/components/merchant/MerchantKYMModal';
import MerchantManagementModal from '@/components/merchant/MerchantManagementModal';
import MerchantFeeConfigModal from '@/components/merchant/MerchantFeeConfigModal';
import MerchantFilterModal from '@/components/merchant/MerchantFilterModal';
export default function MerchantManagement() {
  const {
    t
  } = useLanguage();
  const {
    toast
  } = useToast();
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);
  const [isKYMModalOpen, setIsKYMModalOpen] = useState(false);
  const [isManagementModalOpen, setIsManagementModalOpen] = useState(false);
  const [isFeeConfigModalOpen, setIsFeeConfigModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const merchantStats = [{
    label: t.merchant.totalMerchants,
    value: '1,245',
    change: '+8.5%',
    color: 'text-blue-600'
  }, {
    label: t.merchant.activeMerchants,
    value: '1,187',
    change: '+6.2%',
    color: 'text-green-600'
  }, {
    label: t.merchant.pendingApproval,
    value: '34',
    change: '+12.3%',
    color: 'text-yellow-600'
  }, {
    label: t.merchant.inactive,
    value: '24',
    change: '-15.2%',
    color: 'text-red-600'
  }];
  const topMerchants = [{
    name: 'Starbucks',
    transactions: 15420,
    revenue: 87500,
    growth: 15.2,
    status: 'active'
  }, {
    name: 'Amazon',
    transactions: 12890,
    revenue: 156000,
    growth: 22.8,
    status: 'active'
  }, {
    name: 'Target',
    transactions: 9640,
    revenue: 74200,
    growth: 8.1,
    status: 'active'
  }, {
    name: 'Walmart',
    transactions: 8750,
    revenue: 68900,
    growth: 12.5,
    status: 'active'
  }, {
    name: 'Best Buy',
    transactions: 7230,
    revenue: 92100,
    growth: 18.7,
    status: 'active'
  }];
  const pendingApprovals = [{
    name: 'Local Coffee Shop',
    category: t.merchant.foodBeverage,
    submitted: '2 days ago',
    documents: t.merchant.complete
  }, {
    name: 'Tech Gadgets Store',
    category: t.merchant.electronics,
    submitted: '3 days ago',
    documents: t.merchant.pending
  }, {
    name: 'Fashion Boutique',
    category: t.merchant.retail,
    submitted: '1 week ago',
    documents: t.merchant.complete
  }];
  const settlementData = [{
    merchant: 'Starbucks',
    amount: 12500,
    cycle: t.merchant.daily,
    nextDate: '2024-01-16',
    status: t.merchant.scheduled
  }, {
    merchant: 'Amazon',
    amount: 45000,
    cycle: t.merchant.weekly,
    nextDate: '2024-01-18',
    status: t.merchant.scheduled
  }, {
    merchant: 'Target',
    amount: 28000,
    cycle: t.merchant.biweekly,
    nextDate: '2024-01-20',
    status: t.merchant.processing
  }];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.merchant.title}</h1>
          <p className="text-muted-foreground">{t.merchant.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsBulkUploadModalOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
            <Eye className="w-4 h-4 mr-2" />
            {t.merchant.viewAll}
          </Button>
          <Button onClick={() => setIsKYMModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {t.merchant.addMerchant}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {merchantStats.map(stat => <Card key={stat.label}>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className={`text-sm ${stat.color}`}>{stat.change}</div>
            </CardContent>
          </Card>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle>{t.merchant.pendingApprovals}</CardTitle>
              <CardDescription>{t.merchant.pendingApprovalsDesc}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsManagementModalOpen(true)}>
              <Eye className="w-4 h-4 mr-2" />
              ดูเพิ่มเติม
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((merchant, index) => <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{merchant.name}</h4>
                    <Badge variant={merchant.documents === t.merchant.complete ? 'default' : 'secondary'}>
                      {merchant.documents}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{t.merchant.category}:</span>
                      <span>{merchant.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.merchant.submitted}:</span>
                      <span>{merchant.submitted}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      {t.merchant.review}
                    </Button>
                    <Button size="sm">{t.merchant.approve}</Button>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.merchant.topPerformingMerchants}</CardTitle>
          <CardDescription>{t.merchant.topPerformingMerchantsDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topMerchants.map((merchant, index) => <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{merchant.name}</h4>
                    <p className="text-sm text-muted-foreground">{merchant.transactions.toLocaleString()} {t.merchant.transactions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium">${merchant.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{t.merchant.revenue}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{merchant.growth}%</p>
                    <p className="text-sm text-muted-foreground">{t.merchant.growth}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">{t.merchant.active}</Badge>
                  
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.merchant.feeStructureManagement}</CardTitle>
            <CardDescription>{t.merchant.feeStructureManagementDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">{t.merchant.standardFeeStructure}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t.merchant.transactionFee}:</span>
                    <span className="font-medium">2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.merchant.monthlyFee}:</span>
                    <span className="font-medium">$29.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.merchant.setupFee}:</span>
                    <span className="font-medium">$99.00</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">{t.merchant.premiumFeeStructure}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t.merchant.transactionFee}:</span>
                    <span className="font-medium">2.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.merchant.monthlyFee}:</span>
                    <span className="font-medium">$79.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.merchant.setupFee}:</span>
                    <span className="font-medium">$199.00</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setIsFeeConfigModalOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                {t.merchant.editFeeStructures}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.merchant.settlementCycles}</CardTitle>
            <CardDescription>{t.merchant.settlementCyclesDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settlementData.map((settlement, index) => <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{settlement.merchant}</h4>
                    <Badge variant={settlement.status === t.merchant.scheduled ? 'default' : 'secondary'}>
                      {settlement.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{t.merchant.amount}:</span>
                      <span className="font-medium">${settlement.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.merchant.cycle}:</span>
                      <span>{settlement.cycle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.merchant.nextSettlement}:</span>
                      <span>{settlement.nextDate}</span>
                    </div>
                  </div>
                </div>)}
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                {t.merchant.configureSchedules}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <MerchantBulkUploadModal isOpen={isBulkUploadModalOpen} onClose={() => setIsBulkUploadModalOpen(false)} />

      <MerchantKYMModal isOpen={isKYMModalOpen} onClose={() => setIsKYMModalOpen(false)} />

      <MerchantManagementModal isOpen={isManagementModalOpen} onClose={() => setIsManagementModalOpen(false)} />

      <MerchantFeeConfigModal isOpen={isFeeConfigModalOpen} onClose={() => setIsFeeConfigModalOpen(false)} />

      <MerchantFilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />
    </div>;
}