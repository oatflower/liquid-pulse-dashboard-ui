import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, MessageSquare, Calendar, Edit, Send, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotificationManagement() {
  const { t } = useLanguage();
  
  const notificationStats = [
    { label: t.notification.messagesSentToday, value: '15,247', change: '+8.2%', color: 'text-blue-600' },
    { label: t.notification.deliveryRate, value: '98.7%', change: '+1.1%', color: 'text-green-600' },
    { label: t.notification.activeTemplates, value: '23', change: '+2', color: 'text-blue-600' },
    { label: t.notification.scheduledNotificationsCount, value: '145', change: '+12', color: 'text-yellow-600' },
  ];

  const systemAlerts = [
    { type: t.notification.systemAlerts.cardExpiryWarning, priority: 'high', sent: 245, delivery: 98.2, lastSent: `2 ${t.notification.systemAlerts.hoursAgo}` },
    { type: t.notification.systemAlerts.transactionFailure, priority: 'medium', sent: 67, delivery: 97.8, lastSent: `30 ${t.notification.systemAlerts.minAgo}` },
    { type: t.notification.systemAlerts.merchantOnboarding, priority: 'low', sent: 12, delivery: 99.1, lastSent: `1 ${t.notification.systemAlerts.dayAgo}` },
    { type: t.notification.systemAlerts.systemMaintenance, priority: 'high', sent: 1200, delivery: 98.9, lastSent: `3 ${t.notification.systemAlerts.daysAgo}` },
  ];

  const emailTemplates = [
    { name: t.notification.emailSmsTemplates.cardIssueConfirmation, type: 'transactional', usage: 1247, lastModified: `2 ${t.notification.emailSmsTemplates.daysAgo}` },
    { name: t.notification.emailSmsTemplates.topUpConfirmation, type: 'transactional', usage: 3456, lastModified: `1 ${t.notification.emailSmsTemplates.weekAgo}` },
    { name: t.notification.emailSmsTemplates.redemptionReceipt, type: 'transactional', usage: 2890, lastModified: `3 ${t.notification.emailSmsTemplates.daysAgo}` },
    { name: t.notification.emailSmsTemplates.expiryReminder, type: 'marketing', usage: 890, lastModified: `1 ${t.notification.emailSmsTemplates.daysAgo}` },
    { name: t.notification.emailSmsTemplates.campaignPromotion, type: 'marketing', usage: 567, lastModified: `5 ${t.notification.emailSmsTemplates.daysAgo}` },
  ];

  const scheduledNotifications = [
    { name: t.notification.scheduledNotifications.weeklySummaryReport, type: 'email', schedule: t.notification.scheduledNotifications.everyMondayNineAM, nextRun: '2024-01-22 09:00' },
    { name: t.notification.scheduledNotifications.monthlyCardExpiryAlert, type: 'email', schedule: t.notification.scheduledNotifications.firstOfEveryMonth, nextRun: '2024-02-01 08:00' },
    { name: t.notification.scheduledNotifications.dailyTransactionSummary, type: 'sms', schedule: t.notification.scheduledNotifications.dailySixPM, nextRun: '2024-01-15 18:00' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.notification.title}</h1>
          <p className="text-muted-foreground">{t.notification.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            {t.notification.schedule}
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.notification.newTemplate}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notificationStats.map((stat) => (
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
          <CardTitle>{t.notification.systemAlerts.title}</CardTitle>
          <CardDescription>{t.notification.systemAlerts.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{alert.type}</h4>
                    <p className="text-sm text-muted-foreground">{t.notification.systemAlerts.lastSent}: {alert.lastSent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{alert.sent} {t.notification.systemAlerts.sent}</div>
                    <div className="text-sm text-green-600">{alert.delivery}% {t.notification.systemAlerts.delivered}</div>
                  </div>
                  <Badge variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'secondary' : 'outline'}>
                    {alert.priority === 'high' ? t.notification.systemAlerts.high : alert.priority === 'medium' ? t.notification.systemAlerts.medium : t.notification.systemAlerts.low}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 mr-1" />
                    {t.notification.systemAlerts.edit}
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
            <CardTitle>{t.notification.emailSmsTemplates.title}</CardTitle>
            <CardDescription>{t.notification.emailSmsTemplates.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailTemplates.map((template, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{t.notification.emailSmsTemplates.used} {template.usage} {t.notification.emailSmsTemplates.times}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={template.type === 'transactional' ? 'default' : 'secondary'}>
                        {template.type === 'transactional' ? t.notification.emailSmsTemplates.transactional : t.notification.emailSmsTemplates.marketing}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">{template.lastModified}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      {t.notification.systemAlerts.edit}
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                {t.notification.emailSmsTemplates.createTemplate}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.notification.scheduledNotifications.title}</CardTitle>
            <CardDescription>{t.notification.scheduledNotifications.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledNotifications.map((notification, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{notification.name}</h4>
                    <Badge variant={notification.type === 'email' ? 'default' : 'secondary'}>
                      {notification.type === 'email' ? t.notification.scheduledNotifications.email : t.notification.scheduledNotifications.sms}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{t.notification.scheduledNotifications.scheduleText}:</span>
                      <span>{notification.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.notification.scheduledNotifications.nextRun}:</span>
                      <span>{notification.nextRun}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      {t.notification.scheduledNotifications.edit}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="w-3 h-3 mr-1" />
                      {t.notification.scheduledNotifications.test}
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                {t.notification.scheduledNotifications.scheduleNew}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.notification.templateEditor.title}</CardTitle>
          <CardDescription>{t.notification.templateEditor.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.notification.templateEditor.templateName}</label>
                <Input placeholder={t.notification.templateEditor.enterTemplateName} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.notification.templateEditor.type}</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t.notification.templateEditor.selectType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transactional">{t.notification.templateEditor.transactional}</SelectItem>
                    <SelectItem value="marketing">{t.notification.templateEditor.marketing}</SelectItem>
                    <SelectItem value="system">{t.notification.templateEditor.system}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.notification.templateEditor.subject}</label>
              <Input placeholder={t.notification.templateEditor.emailSubjectLine} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.notification.templateEditor.messageContent}</label>
              <Textarea 
                placeholder={t.notification.templateEditor.messageContentPlaceholder}
                className="min-h-[120px]"
              />
            </div>
            <div className="flex gap-2">
              <Button>
                <Send className="w-4 h-4 mr-2" />
                {t.notification.templateEditor.sendTest}
              </Button>
              <Button variant="outline">
                {t.notification.templateEditor.saveTemplate}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}