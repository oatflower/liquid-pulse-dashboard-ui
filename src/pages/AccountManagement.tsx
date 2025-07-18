import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Users, Shield, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AccountManagement() {
  const { t } = useLanguage();
  const roles = [
    { name: t('accountManagement.roles.admin'), users: 5, permissions: t('accountManagement.permissions.fullAccess'), color: 'bg-red-500' },
    { name: t('accountManagement.roles.finance'), users: 12, permissions: t('accountManagement.permissions.settlementReports'), color: 'bg-blue-500' },
    { name: t('accountManagement.roles.merchantManager'), users: 8, permissions: t('accountManagement.permissions.merchantOperations'), color: 'bg-green-500' },
    { name: t('accountManagement.roles.support'), users: 25, permissions: t('accountManagement.permissions.customerSupport'), color: 'bg-yellow-500' },
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
          <h1 className="text-2xl font-semibold text-foreground">{t('accountManagement.title')}</h1>
          <p className="text-muted-foreground">{t('accountManagement.description')}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('accountManagement.addUser')}
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
                  <span className="text-sm">{role.users} {t('accountManagement.users')}</span>
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
            <CardTitle>{t('accountManagement.roleHierarchy')}</CardTitle>
            <CardDescription>{t('accountManagement.viewManagePermissions')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{t('accountManagement.roles.admin')}</p>
                    <p className="text-sm text-muted-foreground">{t('accountManagement.fullSystemAccess')}</p>
                  </div>
                </div>
                <Badge variant="outline">{t('accountManagement.level')} 1</Badge>
              </div>
              <div className="ml-4 space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{t('accountManagement.roles.finance')}</span>
                  <Badge variant="secondary">{t('accountManagement.level')} 2</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{t('accountManagement.roles.merchantManager')}</span>
                  <Badge variant="secondary">{t('accountManagement.level')} 2</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{t('accountManagement.roles.support')}</span>
                  <Badge variant="secondary">{t('accountManagement.level')} 3</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('accountManagement.recentActivity')}</CardTitle>
            <CardDescription>{t('accountManagement.auditTrail')}</CardDescription>
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
          <CardTitle>{t('accountManagement.ssoIntegration')}</CardTitle>
          <CardDescription>{t('accountManagement.configureSso')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Google SSO</h4>
                <Badge variant="outline" className="text-green-600">{t('accountManagement.active')}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">OAuth 2.0 integration</p>
              <Button variant="outline" size="sm">{t('accountManagement.configure')}</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Microsoft AD</h4>
                <Badge variant="outline" className="text-gray-600">{t('accountManagement.inactive')}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Active Directory sync</p>
              <Button variant="outline" size="sm">{t('accountManagement.setup')}</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">SAML 2.0</h4>
                <Badge variant="outline" className="text-gray-600">{t('accountManagement.inactive')}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Enterprise SSO</p>
              <Button variant="outline" size="sm">{t('accountManagement.setup')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}