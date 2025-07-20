import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Settings, AlertTriangle, DollarSign, Clock, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function TransactionRuleConfiguration() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [rules, setRules] = useState({
    minimumBalance: '5.00',
    allowPartialRedemptions: true,
    minimumTransactionAmount: '1.00',
    maximumTransactionAmount: '10000.00',
    dailyTransactionLimit: '50000.00',
    enableFraudDetection: true,
    suspiciousAmountThreshold: '1000.00',
    multipleTransactionTimeFrame: '5',
    autoDeclineThreshold: '2000.00',
    requireApprovalAbove: '5000.00',
    allowInternationalTransactions: true,
    blockedMerchantCategories: '',
    allowedCountries: '',
    businessHoursOnly: false,
    weekendsEnabled: true
  });

  const handleRuleChange = (field: string, value: string | boolean) => {
    setRules(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Rules Updated",
      description: "การตั้งค่ากฎการทำธุรกรรมได้รับการอัปเดตแล้ว",
    });
  };

  const handleReset = () => {
    setRules({
      minimumBalance: '5.00',
      allowPartialRedemptions: true,
      minimumTransactionAmount: '1.00',
      maximumTransactionAmount: '10000.00',
      dailyTransactionLimit: '50000.00',
      enableFraudDetection: true,
      suspiciousAmountThreshold: '1000.00',
      multipleTransactionTimeFrame: '5',
      autoDeclineThreshold: '2000.00',
      requireApprovalAbove: '5000.00',
      allowInternationalTransactions: true,
      blockedMerchantCategories: '',
      allowedCountries: '',
      businessHoursOnly: false,
      weekendsEnabled: true
    });
    toast({
      title: "Rules Reset",
      description: "กฎการทำธุรกรรมถูกรีเซ็ตเป็นค่าเริ่มต้น",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground">Transaction Rule Configuration</h1>
          <p className="text-muted-foreground">กำหนดและจัดการกฎการทำธุรกรรมของระบบ</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Transaction Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Basic Transaction Rules
              </CardTitle>
              <CardDescription>กำหนดกฎพื้นฐานสำหรับการทำธุรกรรม</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minBalance">Minimum Balance (USD)</Label>
                  <Input
                    id="minBalance"
                    type="number"
                    step="0.01"
                    value={rules.minimumBalance}
                    onChange={(e) => handleRuleChange('minimumBalance', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minTransaction">Minimum Transaction Amount (USD)</Label>
                  <Input
                    id="minTransaction"
                    type="number"
                    step="0.01"
                    value={rules.minimumTransactionAmount}
                    onChange={(e) => handleRuleChange('minimumTransactionAmount', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxTransaction">Maximum Transaction Amount (USD)</Label>
                  <Input
                    id="maxTransaction"
                    type="number"
                    step="0.01"
                    value={rules.maximumTransactionAmount}
                    onChange={(e) => handleRuleChange('maximumTransactionAmount', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dailyLimit">Daily Transaction Limit (USD)</Label>
                  <Input
                    id="dailyLimit"
                    type="number"
                    step="0.01"
                    value={rules.dailyTransactionLimit}
                    onChange={(e) => handleRuleChange('dailyTransactionLimit', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Allow Partial Redemptions</p>
                  <p className="text-sm text-muted-foreground">อนุญาตให้ใช้เงินบางส่วนจากการ์ด</p>
                </div>
                <Switch
                  checked={rules.allowPartialRedemptions}
                  onCheckedChange={(checked) => handleRuleChange('allowPartialRedemptions', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Fraud Detection Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Fraud Detection Rules
              </CardTitle>
              <CardDescription>กำหนดกฎการตรวจจับการทุจริต</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Enable Fraud Detection</p>
                  <p className="text-sm text-muted-foreground">เปิดใช้งานการตรวจจับการทุจริต</p>
                </div>
                <Switch
                  checked={rules.enableFraudDetection}
                  onCheckedChange={(checked) => handleRuleChange('enableFraudDetection', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="suspiciousThreshold">Suspicious Amount Threshold (USD)</Label>
                  <Input
                    id="suspiciousThreshold"
                    type="number"
                    step="0.01"
                    value={rules.suspiciousAmountThreshold}
                    onChange={(e) => handleRuleChange('suspiciousAmountThreshold', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoDecline">Auto Decline Threshold (USD)</Label>
                  <Input
                    id="autoDecline"
                    type="number"
                    step="0.01"
                    value={rules.autoDeclineThreshold}
                    onChange={(e) => handleRuleChange('autoDeclineThreshold', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeFrame">Multiple Transaction Time Frame (minutes)</Label>
                  <Input
                    id="timeFrame"
                    type="number"
                    value={rules.multipleTransactionTimeFrame}
                    onChange={(e) => handleRuleChange('multipleTransactionTimeFrame', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approvalRequired">Require Approval Above (USD)</Label>
                  <Input
                    id="approvalRequired"
                    type="number"
                    step="0.01"
                    value={rules.requireApprovalAbove}
                    onChange={(e) => handleRuleChange('requireApprovalAbove', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Geographic and Time Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Geographic & Time Restrictions
              </CardTitle>
              <CardDescription>กำหนดข้อจำกัดทางภูมิศาสตร์และเวลา</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Allow International Transactions</p>
                  <p className="text-sm text-muted-foreground">อนุญาตธุรกรรมต่างประเทศ</p>
                </div>
                <Switch
                  checked={rules.allowInternationalTransactions}
                  onCheckedChange={(checked) => handleRuleChange('allowInternationalTransactions', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Business Hours Only</p>
                    <p className="text-sm text-muted-foreground">จำกัดเฉพาะเวลาทำการ</p>
                  </div>
                  <Switch
                    checked={rules.businessHoursOnly}
                    onCheckedChange={(checked) => handleRuleChange('businessHoursOnly', checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Weekends Enabled</p>
                    <p className="text-sm text-muted-foreground">เปิดใช้งานในวันหยุดสุดสัปดาห์</p>
                  </div>
                  <Switch
                    checked={rules.weekendsEnabled}
                    onCheckedChange={(checked) => handleRuleChange('weekendsEnabled', checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowedCountries">Allowed Countries (comma-separated)</Label>
                <Textarea
                  id="allowedCountries"
                  placeholder="US, CA, GB, AU, TH..."
                  value={rules.allowedCountries}
                  onChange={(e) => handleRuleChange('allowedCountries', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blockedCategories">Blocked Merchant Categories</Label>
                <Textarea
                  id="blockedCategories"
                  placeholder="กรอกรหัสประเภทร้านค้าที่ต้องการบล็อก..."
                  value={rules.blockedMerchantCategories}
                  onChange={(e) => handleRuleChange('blockedMerchantCategories', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rule Summary</CardTitle>
              <CardDescription>สรุปกฎที่ตั้งค่าไว้</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Min Balance:</span>
                <span className="font-medium">${rules.minimumBalance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Min Transaction:</span>
                <span className="font-medium">${rules.minimumTransactionAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Max Transaction:</span>
                <span className="font-medium">${rules.maximumTransactionAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Daily Limit:</span>
                <span className="font-medium">${rules.dailyTransactionLimit}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Partial Redemptions:</span>
                <Badge variant={rules.allowPartialRedemptions ? "default" : "secondary"}>
                  {rules.allowPartialRedemptions ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fraud Detection:</span>
                <Badge variant={rules.enableFraudDetection ? "default" : "secondary"}>
                  {rules.enableFraudDetection ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>International:</span>
                <Badge variant={rules.allowInternationalTransactions ? "default" : "secondary"}>
                  {rules.allowInternationalTransactions ? "Allowed" : "Blocked"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Warnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {parseFloat(rules.minimumTransactionAmount) > parseFloat(rules.minimumBalance) && (
                <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                  <p className="text-yellow-800">Min transaction amount is higher than min balance</p>
                </div>
              )}
              {parseFloat(rules.autoDeclineThreshold) > parseFloat(rules.requireApprovalAbove) && (
                <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                  <p className="text-yellow-800">Auto decline threshold should be lower than approval threshold</p>
                </div>
              )}
              {!rules.enableFraudDetection && (
                <div className="p-2 bg-red-50 border border-red-200 rounded text-sm">
                  <p className="text-red-800">Fraud detection is disabled - consider enabling for security</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Export Configuration
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Import Configuration
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Rule History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}