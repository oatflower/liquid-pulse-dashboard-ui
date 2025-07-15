import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, MessageSquare, Calendar, Edit, Send, Plus } from 'lucide-react';

export default function NotificationManagement() {
  const notificationStats = [
    { label: 'Messages Sent Today', value: '15,247', change: '+8.2%', color: 'text-blue-600' },
    { label: 'Delivery Rate', value: '98.7%', change: '+1.1%', color: 'text-green-600' },
    { label: 'Active Templates', value: '23', change: '+2', color: 'text-blue-600' },
    { label: 'Scheduled Notifications', value: '145', change: '+12', color: 'text-yellow-600' },
  ];

  const systemAlerts = [
    { type: 'Card Expiry Warning', priority: 'high', sent: 245, delivery: 98.2, lastSent: '2 hours ago' },
    { type: 'Transaction Failure', priority: 'medium', sent: 67, delivery: 97.8, lastSent: '30 min ago' },
    { type: 'Merchant Onboarding', priority: 'low', sent: 12, delivery: 99.1, lastSent: '1 day ago' },
    { type: 'System Maintenance', priority: 'high', sent: 1200, delivery: 98.9, lastSent: '3 days ago' },
  ];

  const emailTemplates = [
    { name: 'Card Issue Confirmation', type: 'transactional', usage: 1247, lastModified: '2 days ago' },
    { name: 'Top-Up Confirmation', type: 'transactional', usage: 3456, lastModified: '1 week ago' },
    { name: 'Redemption Receipt', type: 'transactional', usage: 2890, lastModified: '3 days ago' },
    { name: 'Expiry Reminder', type: 'marketing', usage: 890, lastModified: '1 day ago' },
    { name: 'Campaign Promotion', type: 'marketing', usage: 567, lastModified: '5 days ago' },
  ];

  const scheduledNotifications = [
    { name: 'Weekly Summary Report', type: 'email', schedule: 'Every Monday 9:00 AM', nextRun: '2024-01-22 09:00' },
    { name: 'Monthly Card Expiry Alert', type: 'email', schedule: '1st of every month', nextRun: '2024-02-01 08:00' },
    { name: 'Daily Transaction Summary', type: 'sms', schedule: 'Daily 6:00 PM', nextRun: '2024-01-15 18:00' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Notification & Communication</h1>
          <p className="text-muted-foreground">Manage system alerts, templates, and scheduled notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Template
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
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>Configure and monitor system-generated notifications</CardDescription>
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
                    <p className="text-sm text-muted-foreground">Last sent: {alert.lastSent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{alert.sent} sent</div>
                    <div className="text-sm text-green-600">{alert.delivery}% delivered</div>
                  </div>
                  <Badge variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'secondary' : 'outline'}>
                    {alert.priority}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
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
            <CardTitle>Email/SMS Templates</CardTitle>
            <CardDescription>Manage notification templates and content</CardDescription>
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
                      <p className="text-sm text-muted-foreground">Used {template.usage} times</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={template.type === 'transactional' ? 'default' : 'secondary'}>
                        {template.type}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">{template.lastModified}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Notifications</CardTitle>
            <CardDescription>Configure recurring and scheduled alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledNotifications.map((notification, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{notification.name}</h4>
                    <Badge variant={notification.type === 'email' ? 'default' : 'secondary'}>
                      {notification.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Schedule:</span>
                      <span>{notification.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next run:</span>
                      <span>{notification.nextRun}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="w-3 h-3 mr-1" />
                      Test
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule New
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Editor</CardTitle>
          <CardDescription>Create and edit notification templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Template Name</label>
                <Input placeholder="Enter template name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Email subject line" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message Content</label>
              <Textarea 
                placeholder="Enter your message content here. Use {{variables}} for dynamic content."
                className="min-h-[120px]"
              />
            </div>
            <div className="flex gap-2">
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send Test
              </Button>
              <Button variant="outline">
                Save Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}