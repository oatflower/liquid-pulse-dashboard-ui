import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Plus, Edit, Trash2, Users, Settings } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  color: string;
}

const permissions: Permission[] = [
  { id: 'users.view', name: 'ดูผู้ใช้งาน', description: 'ดูรายการผู้ใช้งานทั้งหมด', category: 'การจัดการผู้ใช้' },
  { id: 'users.create', name: 'สร้างผู้ใช้งาน', description: 'สร้างผู้ใช้งานใหม่', category: 'การจัดการผู้ใช้' },
  { id: 'users.edit', name: 'แก้ไขผู้ใช้งาน', description: 'แก้ไขข้อมูลผู้ใช้งาน', category: 'การจัดการผู้ใช้' },
  { id: 'users.delete', name: 'ลบผู้ใช้งาน', description: 'ลบผู้ใช้งาน', category: 'การจัดการผู้ใช้' },
  { id: 'transactions.view', name: 'ดูธุรกรรม', description: 'ดูธุรกรรมทั้งหมด', category: 'การจัดการธุรกรรม' },
  { id: 'transactions.process', name: 'ประมวลผลธุรกรรม', description: 'ดำเนินการธุรกรรม', category: 'การจัดการธุรกรรม' },
  { id: 'merchants.view', name: 'ดูร้านค้า', description: 'ดูข้อมูลร้านค้า', category: 'การจัดการร้านค้า' },
  { id: 'merchants.manage', name: 'จัดการร้านค้า', description: 'จัดการข้อมูลร้านค้า', category: 'การจัดการร้านค้า' },
  { id: 'reports.view', name: 'ดูรายงาน', description: 'ดูรายงานต่างๆ', category: 'รายงาน' },
  { id: 'reports.export', name: 'ส่งออกรายงาน', description: 'ส่งออกรายงาน', category: 'รายงาน' },
  { id: 'settings.view', name: 'ดูการตั้งค่า', description: 'ดูการตั้งค่าระบบ', category: 'การตั้งค่า' },
  { id: 'settings.manage', name: 'จัดการการตั้งค่า', description: 'แก้ไขการตั้งค่าระบบ', category: 'การตั้งค่า' },
];

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([
    { id: '1', name: 'Admin', description: 'ผู้ดูแลระบบทั้งหมด', userCount: 5, permissions: permissions.map(p => p.id), color: 'bg-red-500' },
    { id: '2', name: 'Finance', description: 'เจ้าหน้าที่การเงิน', userCount: 12, permissions: ['transactions.view', 'transactions.process', 'reports.view', 'reports.export'], color: 'bg-blue-500' },
    { id: '3', name: 'Merchant Manager', description: 'ผู้จัดการร้านค้า', userCount: 8, permissions: ['merchants.view', 'merchants.manage', 'transactions.view', 'reports.view'], color: 'bg-green-500' },
    { id: '4', name: 'Support', description: 'เจ้าหน้าที่สนับสนุน', userCount: 25, permissions: ['users.view', 'transactions.view', 'merchants.view'], color: 'bg-yellow-500' },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] as string[], color: 'bg-gray-500' });

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleCreateRole = () => {
    const role: Role = {
      id: Date.now().toString(),
      ...newRole,
      userCount: 0
    };
    setRoles([...roles, role]);
    setNewRole({ name: '', description: '', permissions: [], color: 'bg-gray-500' });
    setIsCreateOpen(false);
  };

  const handleEditRole = () => {
    if (selectedRole) {
      setRoles(roles.map(r => r.id === selectedRole.id ? selectedRole : r));
      setIsEditOpen(false);
      setSelectedRole(null);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(r => r.id !== roleId));
  };

  const handlePermissionChange = (permissionId: string, checked: boolean, isEdit = false) => {
    if (isEdit && selectedRole) {
      const updatedPermissions = checked 
        ? [...selectedRole.permissions, permissionId]
        : selectedRole.permissions.filter(p => p !== permissionId);
      setSelectedRole({...selectedRole, permissions: updatedPermissions});
    } else {
      const updatedPermissions = checked 
        ? [...newRole.permissions, permissionId]
        : newRole.permissions.filter(p => p !== permissionId);
      setNewRole({...newRole, permissions: updatedPermissions});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">จัดการบทบาท</h1>
          <p className="text-muted-foreground">จัดการบทบาทและสิทธิ์การเข้าถึง</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มบทบาท
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>สร้างบทบาทใหม่</DialogTitle>
              <DialogDescription>กำหนดบทบาทใหม่และสิทธิ์การเข้าถึง</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">ชื่อบทบาท</Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  placeholder="กรอกชื่อบทบาท"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">คำอธิบาย</Label>
                <Textarea
                  id="description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  placeholder="กรอกคำอธิบายบทบาท"
                />
              </div>
              <div className="grid gap-4">
                <Label>สิทธิ์การเข้าถึง</Label>
                {Object.entries(groupedPermissions).map(([category, perms]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-medium text-sm">{category}</h4>
                    <div className="grid gap-2">
                      {perms.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={newRole.permissions.includes(permission.id)}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                          />
                          <div className="grid gap-1 leading-none">
                            <Label htmlFor={permission.id} className="text-sm font-medium">
                              {permission.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateRole}>สร้างบทบาท</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{role.name}</CardTitle>
                <div className={`w-3 h-3 rounded-full ${role.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{role.description}</p>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{role.userCount} ผู้ใช้งาน</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{role.permissions.length} สิทธิ์</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedRole(role)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>แก้ไขบทบาท</DialogTitle>
                        <DialogDescription>แก้ไขข้อมูลบทบาทและสิทธิ์การเข้าถึง</DialogDescription>
                      </DialogHeader>
                      {selectedRole && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-name">ชื่อบทบาท</Label>
                            <Input
                              id="edit-name"
                              value={selectedRole.name}
                              onChange={(e) => setSelectedRole({...selectedRole, name: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-description">คำอธิบาย</Label>
                            <Textarea
                              id="edit-description"
                              value={selectedRole.description}
                              onChange={(e) => setSelectedRole({...selectedRole, description: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-4">
                            <Label>สิทธิ์การเข้าถึง</Label>
                            {Object.entries(groupedPermissions).map(([category, perms]) => (
                              <div key={category} className="space-y-3">
                                <h4 className="font-medium text-sm">{category}</h4>
                                <div className="grid gap-2">
                                  {perms.map((permission) => (
                                    <div key={permission.id} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`edit-${permission.id}`}
                                        checked={selectedRole.permissions.includes(permission.id)}
                                        onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked, true)}
                                      />
                                      <div className="grid gap-1 leading-none">
                                        <Label htmlFor={`edit-${permission.id}`} className="text-sm font-medium">
                                          {permission.name}
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                          {permission.description}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button type="submit" onClick={handleEditRole}>บันทึกการแก้ไข</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}