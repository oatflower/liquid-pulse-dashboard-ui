import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Users, Shield, Search, Plus, Edit, Trash2, User, Mail, Phone, Building, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AccountManagement() {
  const { t } = useLanguage();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    employeeId: '',
    startDate: '',
    profileImage: '',
    notes: ''
  });
  
  const roles = [
    { name: 'Admin', users: 5, permissions: t.account.fullAccess, color: 'bg-red-500' },
    { name: 'Finance', users: 12, permissions: t.account.settlementReports, color: 'bg-blue-500' },
    { name: 'Merchant Manager', users: 8, permissions: t.account.merchantOperations, color: 'bg-green-500' },
    { name: 'Support', users: 25, permissions: t.account.customerSupport, color: 'bg-yellow-500' },
  ];

  const auditLogs = [
    { user: 'John Smith', action: t.account.createdMerchant, time: `2 ${t.account.minAgo}`, type: 'CREATE' },
    { user: 'Sarah Johnson', action: t.account.updatedSettlement, time: `15 ${t.account.minAgo}`, type: 'UPDATE' },
    { user: 'Mike Chen', action: t.account.deletedCards, time: `1 ${t.account.hourAgo}`, type: 'DELETE' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.account.title}</h1>
          <p className="text-muted-foreground">{t.account.subtitle}</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t.account.addUser}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                เพิ่มผู้ใช้งานใหม่
              </DialogTitle>
              <DialogDescription>
                กรอกข้อมูลผู้ใช้งานใหม่เพื่อเพิ่มเข้าสู่ระบบ
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={newUser.profileImage || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face'} />
                  <AvatarFallback>
                    {newUser.firstName.charAt(0)}{newUser.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  เปลี่ยนรูปโปรไฟล์
                </Button>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  ข้อมูลส่วนตัว
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">ชื่อ *</Label>
                    <Input
                      id="firstName"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      placeholder="กรอกชื่อ"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">นามสกุล *</Label>
                    <Input
                      id="lastName"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      placeholder="กรอกนามสกุล"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  ข้อมูลติดต่อ
                </h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">อีเมล *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="phone"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  ข้อมูลการทำงาน
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">บทบาท *</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกบทบาท" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Merchant Manager">Merchant Manager</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">แผนก</Label>
                    <Select value={newUser.department} onValueChange={(value) => setNewUser({...newUser, department: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกแผนก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Finance">การเงิน</SelectItem>
                        <SelectItem value="Operations">ปฏิบัติการ</SelectItem>
                        <SelectItem value="Support">สนับสนุน</SelectItem>
                        <SelectItem value="Marketing">การตลาด</SelectItem>
                        <SelectItem value="HR">ทรัพยากรบุคคล</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">รหัสพนักงาน</Label>
                    <Input
                      id="employeeId"
                      value={newUser.employeeId}
                      onChange={(e) => setNewUser({...newUser, employeeId: e.target.value})}
                      placeholder="EMP001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">วันที่เริ่มงาน</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newUser.startDate}
                      onChange={(e) => setNewUser({...newUser, startDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-4">
                <h4 className="font-medium">หมายเหตุเพิ่มเติม</h4>
                <div className="space-y-2">
                  <Label htmlFor="notes">บันทึกเพิ่มเติม</Label>
                  <Textarea
                    id="notes"
                    value={newUser.notes}
                    onChange={(e) => setNewUser({...newUser, notes: e.target.value})}
                    placeholder="ข้อมูลเพิ่มเติมเกี่ยวกับผู้ใช้งาน..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                ยกเลิก
              </Button>
              <Button onClick={() => {
                // Handle user creation logic here
                console.log('Creating user:', newUser);
                setIsAddUserOpen(false);
                // Reset form
                setNewUser({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  role: '',
                  department: '',
                  employeeId: '',
                  startDate: '',
                  profileImage: '',
                  notes: ''
                });
              }}>
                <Plus className="w-4 h-4 mr-2" />
                สร้างผู้ใช้งาน
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <Card key={role.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{role.name}</CardTitle>
                <div className={`w-3 h-3 rounded-full ${role.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{role.users} {t.account.users}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{role.permissions}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.account.roleHierarchy}</CardTitle>
            <CardDescription>{t.account.roleHierarchyDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Admin</p>
                    <p className="text-sm text-muted-foreground">{t.account.fullSystemAccess}</p>
                  </div>
                </div>
                <Badge variant="outline">Level 1</Badge>
              </div>
              <div className="ml-4 space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Finance</span>
                  <Badge variant="secondary">Level 2</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Merchant Manager</span>
                  <Badge variant="secondary">Level 2</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Support</span>
                  <Badge variant="secondary">Level 3</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.account.recentActivity}</CardTitle>
            <CardDescription>{t.account.recentActivityDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{log.user}</p>
                    <p className="text-sm text-muted-foreground">{log.action}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={log.type === 'CREATE' ? 'default' : log.type === 'UPDATE' ? 'secondary' : 'destructive'}>
                      {log.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>{t.account.ssoIntegration}</CardTitle>
            <CardDescription>{t.account.ssoIntegrationDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Google SSO</h4>
                <Badge variant="outline" className="text-green-600">{t.account.active}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t.account.oauth}</p>
              <Button variant="outline" size="sm">{t.account.configure}</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Microsoft AD</h4>
                <Badge variant="outline" className="text-gray-600">{t.account.inactive}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t.account.activeDirectory}</p>
              <Button variant="outline" size="sm">{t.account.setup}</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">SAML 2.0</h4>
                <Badge variant="outline" className="text-gray-600">{t.account.inactive}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{t.account.enterpriseSSO}</p>
              <Button variant="outline" size="sm">{t.account.setup}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}