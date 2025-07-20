import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle, Key, Lock, Eye, Settings, Users, FileText, Database, UserCheck, Clock, Download, Search, Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SecurityFraud() {
  const { t } = useLanguage();
  
  const securityStats = [
    { label: t.security.fraudDetectionRate, value: '99.2%', change: '+0.3%', color: 'text-green-600' },
    { label: t.security.blockedTransactions, value: '1,247', change: '+5.2%', color: 'text-red-600' },
    { label: t.security.mfaCoverage, value: '87%', change: '+12%', color: 'text-blue-600' },
    { label: t.security.securityAlerts, value: '23', change: '-8', color: 'text-yellow-600' },
  ];

  const users = [
    { id: 1, name: 'Admin User', email: 'admin@onebangkok.com', role: 'System Admin', department: 'IT', status: 'Active', lastLogin: '2024-01-15 09:30', mfa: true },
    { id: 2, name: 'Finance Manager', email: 'finance@onebangkok.com', role: 'Finance Manager', department: 'Finance', status: 'Active', lastLogin: '2024-01-15 08:45', mfa: true },
    { id: 3, name: 'Support Agent', email: 'support@onebangkok.com', role: 'Support Agent', department: 'Customer Service', status: 'Active', lastLogin: '2024-01-15 10:15', mfa: false },
    { id: 4, name: 'Merchant Manager', email: 'merchant@onebangkok.com', role: 'Merchant Manager', department: 'Operations', status: 'Inactive', lastLogin: '2024-01-10 16:20', mfa: true },
  ];

  const auditLogs = [
    { timestamp: '2024-01-15 10:30:00', user: 'admin@onebangkok.com', action: 'Card Status Change', details: 'Changed card #1234 status to Blocked', module: 'Card Management', ip: '192.168.1.100' },
    { timestamp: '2024-01-15 10:25:00', user: 'finance@onebangkok.com', action: 'Settlement Export', details: 'Downloaded daily settlement report', module: 'Settlement', ip: '192.168.1.105' },
    { timestamp: '2024-01-15 10:20:00', user: 'support@onebangkok.com', action: 'Customer Inquiry', details: 'Viewed customer balance for card #5678', module: 'Customer Support', ip: '192.168.1.110' },
    { timestamp: '2024-01-15 10:15:00', user: 'merchant@onebangkok.com', action: 'Tenant Dashboard Access', details: 'Accessed merchant performance dashboard', module: 'Tenant Management', ip: '192.168.1.115' },
  ];

  const amlAlerts = [
    { id: 'AML-001', severity: 'High', type: 'Large Amount Transaction', details: 'Card #1234 - ฿45,000 single transaction', threshold: '฿40,000', status: 'Under Review', created: '2024-01-15 09:30' },
    { id: 'AML-002', severity: 'Medium', type: 'Velocity Breach', details: 'Card #5678 - 15 transactions in 1 hour', threshold: '10 trans/hour', status: 'Cleared', created: '2024-01-15 08:45' },
    { id: 'AML-003', severity: 'Low', type: 'Geographic Anomaly', details: 'Card #9012 - Transaction from unusual location', threshold: 'Location variance', status: 'Auto-Cleared', created: '2024-01-15 08:15' },
  ];

  const pdpaRequests = [
    { id: 'PDPA-001', type: 'Data Access', customer: 'customer1@email.com', requested: '2024-01-10', status: 'Completed', response: '2024-01-12' },
    { id: 'PDPA-002', type: 'Data Deletion', customer: 'customer2@email.com', requested: '2024-01-12', status: 'In Progress', response: '-' },
    { id: 'PDPA-003', type: 'Data Correction', customer: 'customer3@email.com', requested: '2024-01-14', status: 'Pending Review', response: '-' },
    { id: 'PDPA-004', type: 'Data Portability', customer: 'customer4@email.com', requested: '2024-01-15', status: 'New', response: '-' },
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
    { method: t.security.authentication.smsAuth, enabled: true, coverage: 92, description: t.security.authentication.textMessageVerification },
    { method: t.security.authentication.emailVerification, enabled: true, coverage: 78, description: t.security.authentication.emailBasedAuth },
    { method: t.security.authentication.authenticatorApp, enabled: true, coverage: 45, description: t.security.authentication.totpAppVerification },
    { method: t.security.authentication.hardwareToken, enabled: false, coverage: 12, description: t.security.authentication.physicalSecurityKeys },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.security.title}</h1>
          <p className="text-muted-foreground">{t.security.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            {t.security.viewLogs}
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            {t.security.configureRules}
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

      <Tabs defaultValue="access-control" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="access-control">{t.security.userAccessControl}</TabsTrigger>
          <TabsTrigger value="audit-trail">{t.security.auditTrail}</TabsTrigger>
          <TabsTrigger value="aml-reporting">{t.security.amlReporting}</TabsTrigger>
          <TabsTrigger value="pdpa-compliance">{t.security.pdpaCompliance}</TabsTrigger>
        </TabsList>

        <TabsContent value="access-control" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.security.userManagement.title}</CardTitle>
                <CardDescription>{t.security.userManagement.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button>
                      <Users className="w-4 h-4 mr-2" />
                      {t.security.userManagement.addUser}
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      {t.security.userManagement.exportUsers}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {users.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.status === 'Active' ? 'outline' : 'secondary'}>
                            {user.status === 'Active' ? t.security.userManagement.active : t.security.userManagement.inactive}
                          </Badge>
                          {user.mfa && <Badge variant="outline" className="text-green-600">MFA</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">{t.security.userManagement.viewAllUsers}</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.security.rolePermissions.title}</CardTitle>
                <CardDescription>{t.security.rolePermissions.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">{t.security.rolePermissions.createRole}</Button>
                    <Button variant="outline">{t.security.rolePermissions.permissionMatrix}</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { role: t.security.rolePermissions.systemAdmin, users: 3, permissions: t.security.rolePermissions.fullAccess, description: t.security.rolePermissions.completeSystemAccess },
                      { role: t.security.rolePermissions.financeManager, users: 5, permissions: t.security.rolePermissions.financialOperations, description: t.security.rolePermissions.settlementReconciliation },
                      { role: t.security.rolePermissions.supportAgent, users: 12, permissions: t.security.rolePermissions.customerSupport, description: t.security.rolePermissions.cardInquiryAssistance },
                      { role: t.security.rolePermissions.merchantManager, users: 8, permissions: t.security.rolePermissions.tenantManagement, description: t.security.rolePermissions.merchantOperations },
                    ].map((role, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{role.role}</div>
                          <Badge variant="outline">{role.users} {t.security.rolePermissions.users}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">{role.permissions}</div>
                        <div className="text-xs text-muted-foreground">{role.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t.security.authentication.title}</CardTitle>
              <CardDescription>{t.security.authentication.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">{t.security.authentication.multiFactorAuth}</h4>
                  {mfaSettings.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-medium text-sm">{method.method}</div>
                          <div className="text-xs text-muted-foreground">{method.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{method.coverage}%</span>
                        <Switch checked={method.enabled} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">{t.security.authentication.ssoIntegration}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 font-bold text-sm">G</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{t.security.authentication.googleSSO}</div>
                          <div className="text-xs text-muted-foreground">{t.security.authentication.gmailAuth}</div>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">M</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{t.security.authentication.microsoftSSO}</div>
                          <div className="text-xs text-muted-foreground">{t.security.authentication.azureAdIntegration}</div>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit-trail" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t.security.activityLogging.title}</CardTitle>
                    <CardDescription>{t.security.activityLogging.subtitle}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      {t.security.activityLogging.search}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      {t.security.activityLogging.filter}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {t.security.activityLogging.export}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.security.activityLogging.timestamp}</TableHead>
                      <TableHead>{t.security.activityLogging.user}</TableHead>
                      <TableHead>{t.security.activityLogging.action}</TableHead>
                      <TableHead>{t.security.activityLogging.module}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm">{log.timestamp}</TableCell>
                        <TableCell className="text-sm">{log.user}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{log.action}</div>
                            <div className="text-xs text-muted-foreground">{log.details}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.module}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.security.logManagement.title}</CardTitle>
                <CardDescription>{t.security.logManagement.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="retention">{t.security.logManagement.retentionPeriod}</Label>
                    <Select defaultValue="365">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">{t.security.logManagement.days90}</SelectItem>
                        <SelectItem value="180">{t.security.logManagement.days180}</SelectItem>
                        <SelectItem value="365">{t.security.logManagement.year1}</SelectItem>
                        <SelectItem value="1095">{t.security.logManagement.years3}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="archival">{t.security.logManagement.autoArchival}</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Quick Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Logs Today</span>
                        <span className="font-medium">2,847</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Storage Used</span>
                        <span className="font-medium">15.2 GB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Archive Size</span>
                        <span className="font-medium">156 GB</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Reporting</CardTitle>
              <CardDescription>Generate compliance reports for regulatory submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-sm">User Activity Report</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Detailed user access and activity logs</p>
                  <Button variant="outline" size="sm" className="w-full">Generate</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-sm">Access Review Report</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Quarterly access rights review</p>
                  <Button variant="outline" size="sm" className="w-full">Generate</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-sm">Security Incident Log</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Security events and incidents</p>
                  <Button variant="outline" size="sm" className="w-full">Generate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aml-reporting" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction Monitoring</CardTitle>
                  <CardDescription>Anti-Money Laundering detection and reporting</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Rules
                  </Button>
                  <Button size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {amlAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`w-4 h-4 ${alert.severity === 'High' ? 'text-red-600' : alert.severity === 'Medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
                        <span className="font-medium">{alert.id}</span>
                        <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'secondary' : 'outline'}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <Badge variant={alert.status === 'Under Review' ? 'secondary' : alert.status === 'Cleared' ? 'outline' : 'outline'}>
                        {alert.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <span className="ml-2 font-medium">{alert.type}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Threshold:</span>
                        <span className="ml-2 font-medium">{alert.threshold}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Details:</span>
                        <span className="ml-2">{alert.details}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <span className="ml-2">{alert.created}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">Review</Button>
                      <Button variant="outline" size="sm">Mark Cleared</Button>
                      <Button variant="outline" size="sm">Escalate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Rules</CardTitle>
                <CardDescription>Configure AML detection thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Large Amount Threshold</Label>
                    <Input defaultValue="40,000" placeholder="Amount in THB" />
                  </div>
                  <div className="space-y-2">
                    <Label>Velocity Threshold</Label>
                    <Input defaultValue="10" placeholder="Transactions per hour" />
                  </div>
                  <div className="space-y-2">
                    <Label>Geographic Variance</Label>
                    <Select defaultValue="50">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25 km</SelectItem>
                        <SelectItem value="50">50 km</SelectItem>
                        <SelectItem value="100">100 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Update Rules</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Scoring</CardTitle>
                <CardDescription>Automated risk assessment parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Low Risk</span>
                      <Badge variant="outline" className="text-green-600">0-30</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Normal transaction patterns</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Medium Risk</span>
                      <Badge variant="secondary">31-70</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Elevated monitoring required</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">High Risk</span>
                      <Badge variant="destructive">71-100</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Immediate review required</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pdpa-compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Personal data inventory and protection controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold">2,847</div>
                      <div className="text-sm text-muted-foreground">Personal Records</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-semibold">98.5%</div>
                      <div className="text-sm text-muted-foreground">Consent Rate</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Data Categories</h4>
                    {[
                      { category: 'Customer Information', records: 2847, consent: 98.5, retention: '7 years' },
                      { category: 'Transaction Data', records: 156234, consent: 100, retention: '10 years' },
                      { category: 'Device Information', records: 1205, consent: 95.2, retention: '2 years' },
                    ].map((data, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{data.category}</span>
                          <span className="text-xs text-muted-foreground">{data.records} records</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Consent: {data.consent}%</span>
                          <span>Retention: {data.retention}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rights Management</CardTitle>
                <CardDescription>Handle customer data rights requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      New Request
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {pdpaRequests.map((request) => (
                      <div key={request.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{request.id}</span>
                          <Badge variant={
                            request.status === 'Completed' ? 'outline' : 
                            request.status === 'In Progress' ? 'secondary' : 
                            request.status === 'Pending Review' ? 'secondary' : 'outline'
                          }>
                            {request.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">{request.type}</div>
                        <div className="text-xs text-muted-foreground">{request.customer}</div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>Requested: {request.requested}</span>
                          <span>Response: {request.response}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Controls</CardTitle>
              <CardDescription>Data protection and privacy management tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Data Masking</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Card Numbers</span>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phone Numbers</span>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Addresses</span>
                      <Switch checked={false} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Encryption Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <Badge variant="outline" className="text-green-600">AES-256</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Backups</span>
                      <Badge variant="outline" className="text-green-600">Encrypted</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Logs</span>
                      <Badge variant="outline" className="text-green-600">Encrypted</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Consent Workflows</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Manage Consent
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Privacy Assessment
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Clock className="w-4 h-4 mr-2" />
                      Retention Review
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}