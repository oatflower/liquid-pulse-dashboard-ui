import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Globe, Flag, Code, Save, RefreshCw } from 'lucide-react';

export default function Configuration() {
  const businessRules = [
    { name: 'Card Expiry Period', value: '24 months', category: 'Cards', editable: true },
    { name: 'Maximum Card Value', value: '$5,000', category: 'Cards', editable: true },
    { name: 'Minimum Top-up Amount', value: '$10', category: 'Top-up', editable: true },
    { name: 'Transaction Timeout', value: '30 seconds', category: 'Transactions', editable: true },
    { name: 'Daily Transaction Limit', value: '$2,000', category: 'Transactions', editable: true },
    { name: 'Settlement Frequency', value: 'Daily', category: 'Settlement', editable: true },
  ];

  const featureFlags = [
    { name: 'Mobile App Integration', enabled: true, description: 'Enable mobile app card management' },
    { name: 'Loyalty Points System', enabled: false, description: 'Integrate with loyalty program' },
    { name: 'Real-time Notifications', enabled: true, description: 'Push notifications for transactions' },
    { name: 'Advanced Analytics', enabled: true, description: 'Enhanced reporting and analytics' },
    { name: 'Multi-currency Support', enabled: false, description: 'Support for multiple currencies' },
    { name: 'Biometric Authentication', enabled: false, description: 'Fingerprint and face ID support' },
  ];

  const systemSettings = [
    { category: 'Authentication', settings: [
      { name: 'Session Timeout', value: '30 minutes', type: 'time' },
      { name: 'Password Expiry', value: '90 days', type: 'time' },
      { name: 'Failed Login Attempts', value: '3', type: 'number' },
    ]},
    { category: 'Security', settings: [
      { name: 'Encryption Level', value: 'AES-256', type: 'select' },
      { name: 'TLS Version', value: 'TLS 1.3', type: 'select' },
      { name: 'API Rate Limiting', value: '1000/min', type: 'rate' },
    ]},
    { category: 'Performance', settings: [
      { name: 'Database Connection Pool', value: '50', type: 'number' },
      { name: 'Cache Expiry', value: '1 hour', type: 'time' },
      { name: 'Log Retention', value: '90 days', type: 'time' },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Configuration & Settings</h1>
          <p className="text-muted-foreground">Manage system settings, business rules, and feature flags</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Rules</CardTitle>
            <CardDescription>Configure core business logic and constraints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {businessRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{rule.name}</h4>
                    <p className="text-sm text-muted-foreground">{rule.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{rule.value}</div>
                    </div>
                    <Button variant="outline" size="sm" disabled={!rule.editable}>
                      <Settings className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Localization</CardTitle>
            <CardDescription>Configure language and regional settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Language Settings</h4>
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Default Language</span>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="English" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="th">ไทย</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Date Format</span>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="MM/DD/YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">MM/DD/YYYY</SelectItem>
                        <SelectItem value="eu">DD/MM/YYYY</SelectItem>
                        <SelectItem value="iso">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Currency</span>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="thb">THB</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Regional Settings</h4>
                  <Flag className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time Zone</span>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="UTC-5" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-5">UTC-5 (EST)</SelectItem>
                        <SelectItem value="utc+7">UTC+7 (ICT)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Number Format</span>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="1,234.56" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">1,234.56</SelectItem>
                        <SelectItem value="eu">1.234,56</SelectItem>
                        <SelectItem value="in">1,23,456.78</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Flags</CardTitle>
          <CardDescription>Enable or disable system features and capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureFlags.map((flag, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Flag className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{flag.name}</h4>
                    <p className="text-sm text-muted-foreground">{flag.description}</p>
                  </div>
                </div>
                <Switch checked={flag.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure advanced system parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {systemSettings.map((category, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium">{category.category}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{setting.name}</span>
                        <Badge variant="outline">{setting.type}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Current: {setting.value}</div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {index < systemSettings.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}