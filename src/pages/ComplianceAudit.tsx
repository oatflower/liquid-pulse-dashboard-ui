import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Shield, FileText, Download, AlertTriangle, CheckCircle, Calendar, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ComplianceAudit() {
  const { t } = useLanguage();
  
  const complianceStats = [
    { label: t.compliance.complianceScore, value: '94%', change: '+2.1%', color: 'text-green-600' },
    { label: t.compliance.activePolicies, value: '47', change: '+3', color: 'text-blue-600' },
    { label: t.compliance.pendingReviews, value: '8', change: '-5', color: 'text-yellow-600' },
    { label: t.compliance.violations, value: '2', change: '-3', color: 'text-red-600' },
  ];

  const regulatoryReports = [
    { name: 'PCI DSS Compliance', status: 'compliant', lastAudit: '2024-01-10', nextDue: '2024-07-10', priority: 'high' },
    { name: 'AML/KYC Report', status: 'compliant', lastAudit: '2024-01-08', nextDue: '2024-02-08', priority: 'high' },
    { name: 'GDPR Data Protection', status: 'pending', lastAudit: '2024-01-05', nextDue: '2024-01-20', priority: 'medium' },
    { name: 'SOX Financial Controls', status: 'compliant', lastAudit: '2024-01-12', nextDue: '2024-04-12', priority: 'high' },
  ];

  const dataRetentionPolicies = [
    { dataType: t.compliance.dataRetention.transactionRecords, retention: `7 ${t.compliance.dataRetention.years}`, autoDelete: true, lastCleanup: '2024-01-01' },
    { dataType: t.compliance.dataRetention.customerData, retention: `5 ${t.compliance.dataRetention.years}`, autoDelete: true, lastCleanup: '2024-01-01' },
    { dataType: t.compliance.dataRetention.auditLogs, retention: `10 ${t.compliance.dataRetention.years}`, autoDelete: false, lastCleanup: 'N/A' },
    { dataType: t.compliance.dataRetention.financialReports, retention: `7 ${t.compliance.dataRetention.years}`, autoDelete: true, lastCleanup: '2024-01-01' },
  ];

  const consentRecords = [
    { category: t.compliance.consentManagement.marketingCommunications, consented: 85420, declined: 12300, pending: 2450 },
    { category: t.compliance.consentManagement.dataProcessing, consented: 98750, declined: 890, pending: 1560 },
    { category: t.compliance.consentManagement.thirdPartySharing, consented: 45600, declined: 52400, pending: 3200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.compliance.title}</h1>
          <p className="text-muted-foreground">{t.compliance.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t.compliance.exportReport}
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            {t.compliance.generateAudit}
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
          <CardTitle>{t.compliance.regulatoryReporting.title}</CardTitle>
          <CardDescription>{t.compliance.regulatoryReporting.subtitle}</CardDescription>
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
                      <span>{t.compliance.regulatoryReporting.lastAudit}: {report.lastAudit}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{t.compliance.regulatoryReporting.nextDue}: {report.nextDue}</div>
                    <Badge variant={report.priority === 'high' ? 'destructive' : 'secondary'}>
                      {report.priority === 'high' ? t.compliance.regulatoryReporting.highPriority : t.compliance.regulatoryReporting.mediumPriority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === 'compliant' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {report.status === 'pending' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                    <Badge variant={report.status === 'compliant' ? 'default' : 'secondary'}>
                      {report.status === 'compliant' ? t.compliance.regulatoryReporting.compliant : t.compliance.regulatoryReporting.pending}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="w-3 h-3 mr-1" />
                    {t.compliance.regulatoryReporting.view}
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
            <CardTitle>{t.compliance.dataRetention.title}</CardTitle>
            <CardDescription>{t.compliance.dataRetention.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataRetentionPolicies.map((policy, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{policy.dataType}</h4>
                    <Badge variant={policy.autoDelete ? 'default' : 'secondary'}>
                      {policy.autoDelete ? t.compliance.dataRetention.autoDelete : t.compliance.dataRetention.manual}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{t.compliance.dataRetention.retentionPeriod}:</span>
                      <span className="font-medium">{policy.retention}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.compliance.dataRetention.lastCleanup}:</span>
                      <span>{policy.lastCleanup}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                {t.compliance.dataRetention.configurePolicies}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.compliance.consentManagement.title}</CardTitle>
            <CardDescription>{t.compliance.consentManagement.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consentRecords.map((record, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{record.category}</h4>
                    <span className="text-sm text-muted-foreground">
                      {(record.consented + record.declined + record.pending).toLocaleString()} {t.compliance.consentManagement.total}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{t.compliance.consentManagement.consented}: {record.consented.toLocaleString()}</span>
                      <span>{t.compliance.consentManagement.declined}: {record.declined.toLocaleString()}</span>
                      <span>{t.compliance.consentManagement.pending}: {record.pending.toLocaleString()}</span>
                    </div>
                    <Progress value={(record.consented / (record.consented + record.declined + record.pending)) * 100} className="h-2" />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                {t.compliance.consentManagement.manageConsent}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.compliance.auditTrail.title}</CardTitle>
          <CardDescription>{t.compliance.auditTrail.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-2xl font-semibold text-blue-600">1,247</div>
              <p className="text-sm text-muted-foreground">{t.compliance.auditTrail.systemEventsToday}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-2xl font-semibold text-green-600">98.5%</div>
              <p className="text-sm text-muted-foreground">{t.compliance.auditTrail.auditCoverage}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <div className="text-2xl font-semibold text-yellow-600">5</div>
              <p className="text-sm text-muted-foreground">{t.compliance.auditTrail.securityAlerts}</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              {t.compliance.auditTrail.viewFullAuditLog}
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {t.compliance.auditTrail.exportAuditReport}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}