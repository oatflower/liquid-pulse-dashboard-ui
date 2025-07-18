import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Users, Shield, Search, Plus, Edit, Trash2 } from 'lucide-react';

export default function AccountManagement() {
  const roles = [
    { name: 'Admin', users: 5, permissions: 'Full Access', color: 'bg-red-500' },
    { name: 'Finance', users: 12, permissions: 'Settlement, Reports', color: 'bg-blue-500' },
    { name: 'Merchant Manager', users: 8, permissions: 'Merchant Operations', color: 'bg-green-500' },
    { name: 'Support', users: 25, permissions: 'Customer Support', color: 'bg-yellow-500' },
  ];

  const auditLogs = [
    { user: 'John Smith', action: 'Created merchant account', time: '2 min ago', type: 'CREATE' },
    { user: 'Sarah Johnson', action: 'Updated settlement rules', time: '15 min ago', type: 'UPDATE' },
    { user: 'Mike Chen', action: 'Deleted expired cards', time: '1 hour ago', type: 'DELETE' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Account & Role Management</h1>
          <p className="text-muted-foreground">Manage user roles, permissions, and access control</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
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
                  <span className="text-sm">{role.users} users</span>
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
            <CardTitle>Role Hierarchy</CardTitle>
            <CardDescription>View and manage role permissions structure</CardDescription>
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
                    <p className="text-sm text-muted-foreground">Full system access</p>
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
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Audit trail of recent system actions</CardDescription>
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
          <CardTitle>SSO Integration</CardTitle>
          <CardDescription>Configure single sign-on providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Google SSO</h4>
                <Badge variant="outline" className="text-green-600">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">OAuth 2.0 integration</p>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Microsoft AD</h4>
                <Badge variant="outline" className="text-gray-600">Inactive</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Active Directory sync</p>
              <Button variant="outline" size="sm">Setup</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">SAML 2.0</h4>
                <Badge variant="outline" className="text-gray-600">Inactive</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Enterprise SSO</p>
              <Button variant="outline" size="sm">Setup</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}