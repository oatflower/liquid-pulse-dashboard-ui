import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Shield, 
  Key, 
  LogOut, 
  Settings, 
  Bell,
  Smartphone,
  Clock,
  Eye,
  EyeOff,
  Edit
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export default function UserProfile() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '08X-XXX-XXXX',
    position: 'System Administrator',
    department: 'IT',
    employeeId: 'EMP001',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    security: true
  });

  const [sessions] = useState([
    { device: 'Chrome - Windows', location: 'Bangkok, Thailand', lastActive: '2 นาทีที่แล้ว', current: true },
    { device: 'Mobile App - iPhone', location: 'Bangkok, Thailand', lastActive: '1 ชั่วโมงที่แล้ว', current: false },
    { device: 'Safari - Mac', location: 'Bangkok, Thailand', lastActive: '2 วันที่แล้ว', current: false }
  ]);

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน",
        variant: "destructive"
      });
      return;
    }
    
    // Mock password change
    toast({
      title: "เปลี่ยนรหัสผ่านสำเร็จ",
      description: "รหัสผ่านของคุณได้รับการเปลี่ยนแปลงแล้ว"
    });
    
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "คุณได้ออกจากระบบแล้ว"
    });
    // Redirect to login page
  };

  const handleSaveProfile = () => {
    toast({
      title: "อัพเดทโปรไฟล์สำเร็จ",
      description: "ข้อมูลโปรไฟล์ของคุณได้รับการอัพเดทแล้ว"
    });
    setIsEditingProfile(false);
  };

  const handleRevokeSession = (device: string) => {
    toast({
      title: "ยกเลิกเซสชันสำเร็จ",
      description: `ยกเลิกการเข้าสู่ระบบจาก ${device} แล้ว`
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">โปรไฟล์ผู้ใช้งาน</h1>
        <p className="text-muted-foreground">จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชี</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            ข้อมูลส่วนตัว
          </CardTitle>
          <CardDescription>ข้อมูลพื้นฐานและการติดต่อ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">{profile.firstName} {profile.lastName}</h3>
              <p className="text-muted-foreground">{profile.position}</p>
              <Badge variant="secondary">{profile.department}</Badge>
            </div>
            <div className="ml-auto">
              <Button variant="outline" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                <Edit className="w-4 h-4 mr-2" />
                {isEditingProfile ? 'ยกเลิก' : 'แก้ไข'}
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">ชื่อ</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  disabled={!isEditingProfile}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">นามสกุล</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                  disabled={!isEditingProfile}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!isEditingProfile}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!isEditingProfile}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">ตำแหน่ง</Label>
                <Input
                  id="position"
                  value={profile.position}
                  onChange={(e) => setProfile({...profile, position: e.target.value})}
                  disabled={!isEditingProfile}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">รหัสพนักงาน</Label>
                <Input
                  id="employeeId"
                  value={profile.employeeId}
                  disabled
                />
              </div>
            </div>
          </div>

          {isEditingProfile && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveProfile}>
                บันทึกการเปลี่ยนแปลง
              </Button>
              <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                ยกเลิก
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              เปลี่ยนรหัสผ่าน
            </CardTitle>
            <CardDescription>อัพเดทรหัสผ่านเพื่อความปลอดภัย</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">รหัสผ่านปัจจุบัน</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">รหัสผ่านใหม่</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button onClick={handlePasswordChange} className="w-full">
              เปลี่ยนรหัสผ่าน
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              การแจ้งเตือน
            </CardTitle>
            <CardDescription>ตั้งค่าการรับการแจ้งเตือน</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>อีเมล</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>SMS</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>Push Notification</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>การแจ้งเตือนความปลอดภัย</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.security}
                onChange={(e) => setNotifications({...notifications, security: e.target.checked})}
                className="w-4 h-4"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            เซสชันที่เปิดใช้งาน
          </CardTitle>
          <CardDescription>อุปกรณ์ที่เข้าสู่ระบบอยู่</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-muted-foreground">{session.location}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.lastActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {session.current && (
                    <Badge variant="secondary">ปัจจุบัน</Badge>
                  )}
                  {!session.current && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRevokeSession(session.device)}
                    >
                      ยกเลิก
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Shield className="w-5 h-5" />
            โซนอันตราย
          </CardTitle>
          <CardDescription>การดำเนินการที่ไม่สามารถยกเลิกได้</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                ออกจากระบบทุกอุปกรณ์
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>ยืนยันการออกจากระบบ</AlertDialogTitle>
                <AlertDialogDescription>
                  คุณแน่ใจหรือไม่ที่จะออกจากระบบทุกอุปกรณ์? คุณจะต้องเข้าสู่ระบบใหม่อีกครั้ง
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  ออกจากระบบ
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}