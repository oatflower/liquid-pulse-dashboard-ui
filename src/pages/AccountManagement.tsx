import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Users, Shield, Search, Plus, Edit, Trash2, User, Mail, Phone, Building, Calendar, MoreHorizontal, Eye, Lock, Unlock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AccountManagement() {
  const { t } = useLanguage();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
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

  const [roles, setRoles] = useState([
    { name: 'Admin', users: 5, permissions: t.account.fullAccess, color: 'bg-red-500', description: 'ผู้ดูแลระบบทั้งหมด' },
    { name: 'Finance', users: 12, permissions: t.account.settlementReports, color: 'bg-blue-500', description: 'เจ้าหน้าที่การเงิน' },
    { name: 'Merchant Manager', users: 8, permissions: t.account.merchantOperations, color: 'bg-green-500', description: 'ผู้จัดการร้านค้า' },
    { name: 'Support', users: 25, permissions: t.account.customerSupport, color: 'bg-yellow-500', description: 'เจ้าหน้าที่สนับสนุน' },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'จิราภรณ์',
      lastName: 'วงษ์สวัสดิ์',
      email: 'jiraporn.w@company.com',
      phone: '081-234-5678',
      role: 'Admin',
      department: 'IT',
      employeeId: 'EMP001',
      startDate: '2023-01-15',
      status: 'active',
      lastLogin: '2024-01-20 09:30',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b08c?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      firstName: 'ธนากร',
      lastName: 'เจริญสุข',
      email: 'thanakorn.c@company.com',
      phone: '082-345-6789',
      role: 'Finance',
      department: 'การเงิน',
      employeeId: 'EMP002',
      startDate: '2023-03-20',
      status: 'active',
      lastLogin: '2024-01-20 08:15',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      firstName: 'วรรณา',
      lastName: 'ศรีสุข',
      email: 'wanna.s@company.com',
      phone: '083-456-7890',
      role: 'Merchant Manager',
      department: 'ปฏิบัติการ',
      employeeId: 'EMP003',
      startDate: '2023-06-10',
      status: 'active',
      lastLogin: '2024-01-19 16:45',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      firstName: 'สมชาย',
      lastName: 'ใจดี',
      email: 'somchai.j@company.com',
      phone: '084-567-8901',
      role: 'Support',
      department: 'สนับสนุน',
      employeeId: 'EMP004',
      startDate: '2023-09-05',
      status: 'inactive',
      lastLogin: '2024-01-18 14:20',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      firstName: 'นันทิดา',
      lastName: 'แสนดี',
      email: 'nantida.s@company.com',
      phone: '085-678-9012',
      role: 'Support',
      department: 'สนับสนุน',
      employeeId: 'EMP005',
      startDate: '2023-11-12',
      status: 'active',
      lastLogin: '2024-01-20 07:30',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEditRole = (role: any) => {
    setSelectedRole({...role});
    setIsEditRoleOpen(true);
  };

  const handleSaveRole = () => {
    if (selectedRole) {
      setRoles(roles.map(r => r.name === selectedRole.name ? selectedRole : r));
      setIsEditRoleOpen(false);
      setSelectedRole(null);
    }
  };

  const handleDeleteRole = (roleName: string) => {
    setRoles(roles.filter(r => r.name !== roleName));
  };

  const handleEditUser = (user: any) => {
    setSelectedUser({...user});
    setIsEditUserOpen(true);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
      setIsEditUserOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleToggleUserStatus = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? {...u, status: u.status === 'active' ? 'inactive' : 'active'}
        : u
    ));
  };

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
                  <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEditRole(role)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          แก้ไขบทบาท: {selectedRole?.name}
                        </DialogTitle>
                        <DialogDescription>
                          แก้ไขข้อมูลบทบาทและสิทธิ์การเข้าถึง
                        </DialogDescription>
                      </DialogHeader>
                      {selectedRole && (
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="role-name">ชื่อบทบาท</Label>
                            <Input
                              id="role-name"
                              value={selectedRole.name}
                              onChange={(e) => setSelectedRole({...selectedRole, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="role-description">คำอธิบาย</Label>
                            <Textarea
                              id="role-description"
                              value={selectedRole.description || ''}
                              onChange={(e) => setSelectedRole({...selectedRole, description: e.target.value})}
                              placeholder="อธิบายหน้าที่ของบทบาทนี้"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="role-permissions">สิทธิ์การเข้าถึง</Label>
                            <Textarea
                              id="role-permissions"
                              value={selectedRole.permissions}
                              onChange={(e) => setSelectedRole({...selectedRole, permissions: e.target.value})}
                              placeholder="กำหนดสิทธิ์การเข้าถึง"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="role-color">สีประจำบทบาท</Label>
                            <Select 
                              value={selectedRole.color} 
                              onValueChange={(value) => setSelectedRole({...selectedRole, color: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bg-red-500">แดง</SelectItem>
                                <SelectItem value="bg-blue-500">น้ำเงิน</SelectItem>
                                <SelectItem value="bg-green-500">เขียว</SelectItem>
                                <SelectItem value="bg-yellow-500">เหลือง</SelectItem>
                                <SelectItem value="bg-purple-500">ม่วง</SelectItem>
                                <SelectItem value="bg-pink-500">ชมพู</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
                          ยกเลิก
                        </Button>
                        <Button onClick={handleSaveRole}>
                          <Edit className="w-4 h-4 mr-2" />
                          บันทึกการแก้ไข
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <Trash2 className="w-5 h-5 text-destructive" />
                          ลบบทบาท "{role.name}"
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          คุณแน่ใจหรือไม่ว่าต้องการลบบทบาท "{role.name}"? 
                          การดำเนินการนี้ไม่สามารถยกเลิกได้ และจะส่งผลต่อผู้ใช้งาน {role.users} คน
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteRole(role.name)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          ลบบทบาท
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                จัดการผู้ใช้งาน
              </CardTitle>
              <CardDescription>
                จัดการข้อมูลผู้ใช้งานทั้งหมดในระบบ ({filteredUsers.length} คน)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาผู้ใช้งาน (ชื่อ, อีเมล, รหัสพนักงาน)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="กรองตามบทบาท" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกบทบาท</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Merchant Manager">Merchant Manager</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="กรองตามสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกสถานะ</SelectItem>
                <SelectItem value="active">ใช้งานอยู่</SelectItem>
                <SelectItem value="inactive">หยุดใช้งาน</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ผู้ใช้งาน</TableHead>
                  <TableHead>บทบาท</TableHead>
                  <TableHead>แผนก</TableHead>
                  <TableHead>เข้าใช้งานล่าสุด</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      ไม่พบผู้ใช้งานที่ตรงกับเงื่อนไขการค้นหา
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                            <AvatarFallback>
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">{user.employeeId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          user.role === 'Admin' ? 'border-red-500 text-red-700' :
                          user.role === 'Finance' ? 'border-blue-500 text-blue-700' :
                          user.role === 'Merchant Manager' ? 'border-green-500 text-green-700' :
                          'border-yellow-500 text-yellow-700'
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{user.lastLogin}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={user.status === 'active'}
                            onCheckedChange={() => handleToggleUserStatus(user.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status === 'active' ? 'ใช้งานอยู่' : 'หยุดใช้งาน'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => console.log('View user:', user.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              ดูรายละเอียด
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              แก้ไขข้อมูล
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Reset password:', user.id)}>
                              <Lock className="mr-2 h-4 w-4" />
                              รีเซ็ตรหัสผ่าน
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              ลบผู้ใช้งาน
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              แก้ไขข้อมูลผู้ใช้งาน
            </DialogTitle>
            <DialogDescription>
              แก้ไขข้อมูลผู้ใช้งาน: {selectedUser?.firstName} {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid gap-6 py-4">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>
                    {selectedUser.firstName.charAt(0)}{selectedUser.lastName.charAt(0)}
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
                    <Label htmlFor="edit-firstName">ชื่อ *</Label>
                    <Input
                      id="edit-firstName"
                      value={selectedUser.firstName}
                      onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                      placeholder="กรอกชื่อ"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-lastName">นามสกุล *</Label>
                    <Input
                      id="edit-lastName"
                      value={selectedUser.lastName}
                      onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
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
                    <Label htmlFor="edit-email">อีเมล *</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="edit-phone"
                      value={selectedUser.phone}
                      onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
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
                    <Label htmlFor="edit-role">บทบาท *</Label>
                    <Select value={selectedUser.role} onValueChange={(value) => setSelectedUser({...selectedUser, role: value})}>
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
                    <Label htmlFor="edit-department">แผนก</Label>
                    <Select value={selectedUser.department} onValueChange={(value) => setSelectedUser({...selectedUser, department: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกแผนก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="การเงิน">การเงิน</SelectItem>
                        <SelectItem value="ปฏิบัติการ">ปฏิบัติการ</SelectItem>
                        <SelectItem value="สนับสนุน">สนับสนุน</SelectItem>
                        <SelectItem value="การตลาด">การตลาด</SelectItem>
                        <SelectItem value="ทรัพยากรบุคคล">ทรัพยากรบุคคล</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-employeeId">รหัสพนักงาน</Label>
                    <Input
                      id="edit-employeeId"
                      value={selectedUser.employeeId}
                      onChange={(e) => setSelectedUser({...selectedUser, employeeId: e.target.value})}
                      placeholder="EMP001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-startDate">วันที่เริ่มงาน</Label>
                    <Input
                      id="edit-startDate"
                      type="date"
                      value={selectedUser.startDate}
                      onChange={(e) => setSelectedUser({...selectedUser, startDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSaveUser}>
              <Edit className="w-4 h-4 mr-2" />
              บันทึกการแก้ไข
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Single Sign On Portal
              </CardTitle>
              <CardDescription>
                จัดการการเข้าใช้งานด้วยระบบ SSO และการยืนยันตัวตนจากระบบภายนอก
              </CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              เพิ่ม SSO Provider
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SSO Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg bg-green-50/50 dark:bg-green-950/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Active Providers</span>
              </div>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">SSO Users</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">127</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Last 24h Logins</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">45</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">98.5%</p>
            </div>
          </div>

          {/* SSO Providers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SSO Providers</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Google SSO */}
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Google Workspace</h4>
                      <p className="text-sm text-muted-foreground">OAuth 2.0</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Active
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Domain:</span>
                    <span className="font-medium">company.com</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users:</span>
                    <span className="font-medium">89 users</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last sync:</span>
                    <span className="font-medium">5 minutes ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Auto-provisioning:</span>
                    <Badge variant="outline" className="text-xs">Enabled</Badge>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                  <Button variant="outline" size="sm">
                    Logs
                  </Button>
                </div>
              </div>

              {/* Microsoft AD */}
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#00A4EF" d="M11.4 24H0V12.6h11.4V24z"/>
                        <path fill="#FFB900" d="M24 24H12.6V12.6H24V24z"/>
                        <path fill="#F25022" d="M11.4 11.4H0V0h11.4v11.4z"/>
                        <path fill="#00A4EF" d="M24 11.4H12.6V0H24v11.4z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Microsoft Azure AD</h4>
                      <p className="text-sm text-muted-foreground">SAML 2.0</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Active
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tenant ID:</span>
                    <span className="font-medium text-xs">abc123-def456</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users:</span>
                    <span className="font-medium">38 users</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last sync:</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Group mapping:</span>
                    <Badge variant="outline" className="text-xs">Enabled</Badge>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                  <Button variant="outline" size="sm">
                    Logs
                  </Button>
                </div>
              </div>

              {/* SAML 2.0 - Inactive */}
              <div className="border rounded-lg p-6 space-y-4 opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border">
                      <Shield className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">SAML 2.0 Provider</h4>
                      <p className="text-sm text-muted-foreground">Enterprise SSO</p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    Inactive
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Configure SAML 2.0 for enterprise identity providers like Okta, OneLogin, or custom implementations.
                  </p>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Setup SAML 2.0
                </Button>
              </div>

              {/* LDAP - Inactive */}
              <div className="border rounded-lg p-6 space-y-4 opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border">
                      <Building className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">LDAP</h4>
                      <p className="text-sm text-muted-foreground">Directory Services</p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    Inactive
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Connect to LDAP directory services for user authentication and authorization.
                  </p>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Setup LDAP
                </Button>
              </div>
            </div>
          </div>

          {/* SSO Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SSO Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Force SSO Login</h4>
                    <p className="text-sm text-muted-foreground">Require all users to use SSO</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Auto-provision Users</h4>
                    <p className="text-sm text-muted-foreground">Create accounts automatically</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Just-in-time Provisioning</h4>
                    <p className="text-sm text-muted-foreground">Update user data on login</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Default Role for New Users</h4>
                  <Select defaultValue="Support">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Merchant Manager">Merchant Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Session Timeout</h4>
                  <Select defaultValue="8">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Login Redirect URL</h4>
                  <Input placeholder="/dashboard" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}