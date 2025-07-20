import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Gift, User, Calendar, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddCardOneByOne() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardType: '',
    cardValue: '',
    expiryDate: '',
    recipientName: '',
    recipientEmail: '',
    message: '',
    campaign: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Card Created Successfully",
      description: "การ์ดใหม่ถูกสร้างเรียบร้อยแล้ว",
    });
    // Reset form
    setFormData({
      cardType: '',
      cardValue: '',
      expiryDate: '',
      recipientName: '',
      recipientEmail: '',
      message: '',
      campaign: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Add Card One by One</h1>
          <p className="text-muted-foreground">สร้างการ์ดใหม่ทีละใบอย่างรวดเร็ว</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Card Information
              </CardTitle>
              <CardDescription>กรอกข้อมูลการ์ดที่ต้องการสร้าง</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardType">Card Type</Label>
                    <Select value={formData.cardType} onValueChange={(value) => handleInputChange('cardType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทการ์ด" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gift">Gift Card</SelectItem>
                        <SelectItem value="voucher">Voucher</SelectItem>
                        <SelectItem value="corporate">Corporate Card</SelectItem>
                        <SelectItem value="loyalty">Loyalty Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardValue">Card Value (THB)</Label>
                    <Input
                      id="cardValue"
                      type="number"
                      placeholder="1000"
                      value={formData.cardValue}
                      onChange={(e) => handleInputChange('cardValue', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign">Campaign</Label>
                    <Select value={formData.campaign} onValueChange={(value) => handleInputChange('campaign', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกแคมเปญ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="holiday2024">Holiday Campaign 2024</SelectItem>
                        <SelectItem value="corporate-q1">Corporate Rewards Q1</SelectItem>
                        <SelectItem value="employee">Employee Benefits</SelectItem>
                        <SelectItem value="customer">Customer Appreciation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <Label className="text-base font-medium">Recipient Information</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Recipient Name</Label>
                      <Input
                        id="recipientName"
                        placeholder="ชื่อผู้รับ"
                        value={formData.recipientName}
                        onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipientEmail">Recipient Email</Label>
                      <Input
                        id="recipientEmail"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.recipientEmail}
                        onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="ข้อความที่ต้องการส่งถึงผู้รับ..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    <Gift className="w-4 h-4 mr-2" />
                    Create Card
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Preview</CardTitle>
              <CardDescription>ตัวอย่างการ์ดที่จะสร้าง</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium">
                    {formData.cardType ? (
                      <Badge variant="secondary">{formData.cardType}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Card Type</span>
                    )}
                  </p>
                  <p className="text-2xl font-bold">
                    {formData.cardValue ? `₿${formData.cardValue}` : '₿0'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formData.recipientName || 'Recipient Name'}
                  </p>
                  {formData.expiryDate && (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Expires: {formData.expiryDate}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="w-4 h-4 mr-2" />
                Set Custom Value
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Gift className="w-4 h-4 mr-2" />
                Use Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Delivery
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}