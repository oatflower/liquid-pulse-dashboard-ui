import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Shield, FileText, Download, AlertTriangle, CheckCircle, Calendar, Users } from 'lucide-react';

export default function ComplianceAudit() {
  const complianceStats = [
    { label: 'Compliance Score', value: '94%', change: '+2.1%', color: 'text-green-600' },
    { label: 'Active Policies', value: '47', change: '+3', color: 'text-blue-600' },
    { label: 'Pending Reviews', value: '8', change: '-5', color: 'text-yellow-600' },
    { label: 'Violations', value: '2', change: '-3', color: 'text-red-600' },
  ];

  const regulatoryReports = [
    { name: 'PCI DSS Compliance', status: 'compliant', lastAudit: '2024-01-10', nextDue: '2024-07-10', priority: 'high' },
    { name: 'AML/KYC Report', status: 'compliant', lastAudit: '2024-01-08', nextDue: '2024-02-08', priority: 'high' },
    { name: 'GDPR Data Protection', status: 'pending', lastAudit: '2024-01-05', nextDue: '2024-01-20', priority: 'medium' },
    { name: 'SOX Financial Controls', status: 'compliant', lastAudit: '2024-01-12', nextDue: '2024-04-12', priority: 'high' },
  ];

  const dataRetentionPolicies = [
    { dataType: 'Transaction Records', retention: '7 years', autoDelete: true, lastCleanup: '2024-01-01' },
    { dataType: 'Customer Data', retention: '5 years', autoDelete: true, lastCleanup: '2024-01-01' },
    { dataType: 'Audit Logs', retention: '10 years', autoDelete: false, lastCleanup: 'N/A' },
    { dataType: 'Financial Reports', retention: '7 years', autoDelete: true, lastCleanup: '2024-01-01' },
  ];

  const consentRecords = [
    { category: 'Marketing Communications', consented: 85420, declined: 12300, pending: 2450 },
    { category: 'Data Processing', consented: 98750, declined: 890, pending: 1560 },
    { category: 'Third-party Sharing', consented: 45600, declined: 52400, pending: 3200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Compliance & Audit</h1>
          <p className="text-muted-foreground">Regulatory compliance, data retention, and audit management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate Audit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceStats.map((stat) => (
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

      <Card>
        <CardHeader>
          <CardTitle>Regulatory Reporting</CardTitle>
          <CardDescription>Track compliance status and generate regulatory reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regulatoryReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Last audit: {report.lastAudit}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">Next due: {report.nextDue}</div>
                    <Badge variant={report.priority === 'high' ? 'destructive' : 'secondary'}>
                      {report.priority} priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'compliant' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {report.status === 'pending' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                    <Badge variant={report.status === 'compliant' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Retention Policies</CardTitle>
            <CardDescription>Manage data lifecycle and retention rules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataRetentionPolicies.map((policy, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{policy.dataType}</h4>
                    <Badge variant={policy.autoDelete ? 'default' : 'secondary'}>
                      {policy.autoDelete ? 'Auto-delete' : 'Manual'}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Retention Period:</span>
                      <span className="font-medium">{policy.retention}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Cleanup:</span>
                      <span>{policy.lastCleanup}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Configure Policies
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consent Management</CardTitle>
            <CardDescription>Track and manage user consent preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consentRecords.map((record, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{record.category}</h4>
                    <span className="text-sm text-muted-foreground">
                      {(record.consented + record.declined + record.pending).toLocaleString()} total
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Consented: {record.consented.toLocaleString()}</span>
                      <span>Declined: {record.declined.toLocaleString()}</span>
                      <span>Pending: {record.pending.toLocaleString()}</span>
                    </div>
                    <Progress value={(record.consented / (record.consented + record.declined + record.pending)) * 100} className="h-2" />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Manage Consent
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>Comprehensive audit log and activity tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-2xl font-semibold text-blue-600">1,247</div>
              <p className="text-sm text-muted-foreground">System Events Today</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-2xl font-semibold text-green-600">98.5%</div>
              <p className="text-sm text-muted-foreground">Audit Coverage</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-2xl font-semibold text-yellow-600">5</div>
              <p className="text-sm text-muted-foreground">Security Alerts</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              View Full Audit Log
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Audit Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}