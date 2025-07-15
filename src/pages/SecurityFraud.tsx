import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Shield, AlertTriangle, Key, Lock, Eye, Settings } from 'lucide-react';

export default function SecurityFraud() {
  const securityStats = [
    { label: 'Fraud Detection Rate', value: '99.2%', change: '+0.3%', color: 'text-green-600' },
    { label: 'Blocked Transactions', value: '1,247', change: '+5.2%', color: 'text-red-600' },
    { label: 'MFA Coverage', value: '87%', change: '+12%', color: 'text-blue-600' },
    { label: 'Security Alerts', value: '23', change: '-8', color: 'text-yellow-600' },
  ];

  const fraudRules = [
    { name: 'Velocity Check', description: 'Multiple transactions in short time', enabled: true, triggered: 45 },
    { name: 'Amount Threshold', description: 'Unusually high transaction amounts', enabled: true, triggered: 23 },
    { name: 'Geolocation Anomaly', description: 'Transactions from unusual locations', enabled: true, triggered: 12 },
    { name: 'Device Fingerprint', description: 'Unknown device detection', enabled: false, triggered: 8 },
    { name: 'Pattern Analysis', description: 'Suspicious spending patterns', enabled: true, triggered: 34 },
  ];

  const securityAlerts = [
    { type: 'High Risk Transaction', severity: 'high', details: 'Multiple high-value transactions detected', time: '2 min ago' },
    { type: 'Failed Login Attempts', severity: 'medium', details: 'Multiple failed admin login attempts', time: '15 min ago' },
    { type: 'Suspicious Device', severity: 'low', details: 'New device login from unusual location', time: '1 hour ago' },
    { type: 'Velocity Violation', severity: 'high', details: 'Card used 15 times in 10 minutes', time: '2 hours ago' },
  ];

  const mfaSettings = [
    { method: 'SMS Authentication', enabled: true, coverage: 92, description: 'Text message verification' },
    { method: 'Email Verification', enabled: true, coverage: 78, description: 'Email-based authentication' },
    { method: 'Authenticator App', enabled: true, coverage: 45, description: 'TOTP app verification' },
    { method: 'Hardware Token', enabled: false, coverage: 12, description: 'Physical security keys' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Security & Fraud Detection</h1>
          <p className="text-muted-foreground">Manage authentication, fraud detection, and security settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Configure Rules
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className={`text-sm ${stat.color}`}>{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fraud Rules Engine</CardTitle>
            <CardDescription>Configure and manage fraud detection rules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fraudRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{rule.name}</h4>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{rule.triggered} triggered</div>
                      <div className="text-xs text-muted-foreground">Last 24h</div>
                    </div>
                    <Switch checked={rule.enabled} />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Advanced Configuration
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Real-time security monitoring and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.map((alert, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${alert.severity === 'high' ? 'text-red-600' : alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
                      <h4 className="font-medium">{alert.type}</h4>
                    </div>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.details}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                    <Button variant="outline" size="sm">
                      Investigate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authentication & MFA</CardTitle>
          <CardDescription>Configure multi-factor authentication settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mfaSettings.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{method.method}</h4>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{method.coverage}% coverage</div>
                    <div className="text-xs text-muted-foreground">Active users</div>
                  </div>
                  <Switch checked={method.enabled} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Encryption Settings</CardTitle>
          <CardDescription>Manage data encryption and key management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Data Encryption</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Data at Rest</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">AES-256</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Data in Transit</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">TLS 1.3</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Card Data</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">PCI-DSS</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Key Management</h4>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Master Key</span>
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last rotation: 30 days ago
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">API Keys</span>
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last rotation: 15 days ago
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Key className="w-4 h-4 mr-2" />
                  Rotate Keys
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}