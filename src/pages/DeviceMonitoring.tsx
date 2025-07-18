import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Monitor, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Cpu, 
  HardDrive, 
  Thermometer,
  Battery,
  MapPin,
  Clock,
  TrendingUp,
  Bell,
  Settings,
  BarChart3
} from 'lucide-react';

const DeviceMonitoring = () => {
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [alertThreshold, setAlertThreshold] = useState(5);

  // Mock device data
  const devices = [
    { id: 'POS001', name: 'Central Court POS', floor: 'G', status: 'online', uptime: 99.8, location: 'Central Court', lastSeen: '2 min ago', cpu: 15, memory: 45, temp: 42 },
    { id: 'POS002', name: 'Food Court Terminal', floor: 'B1', status: 'offline', uptime: 87.2, location: 'Food Court', lastSeen: '15 min ago', cpu: 0, memory: 0, temp: 0 },
    { id: 'POS003', name: 'Retail Zone A', floor: '1F', status: 'warning', uptime: 94.5, location: 'Retail Zone A', lastSeen: '1 min ago', cpu: 85, memory: 78, temp: 67 },
    { id: 'POS004', name: 'Luxury Brands', floor: '2F', status: 'online', uptime: 99.9, location: 'Luxury Brands', lastSeen: '30 sec ago', cpu: 23, memory: 56, temp: 38 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'offline': return <WifiOff className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'secondary';
      case 'offline': return 'destructive';
      case 'warning': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Device & Infrastructure Monitoring</h1>
        <p className="text-muted-foreground">Real-time monitoring of POS devices and infrastructure</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Online Devices</p>
                <p className="text-2xl font-semibold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <WifiOff className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Offline Devices</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Uptime</p>
                <p className="text-2xl font-semibold">99.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">Device Monitoring</TabsTrigger>
          <TabsTrigger value="health">Health Status</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
        </TabsList>

        {/* Device Uptime Monitoring */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters and Controls */}
            <div className="lg:w-1/4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="floorFilter">Floor</Label>
                    <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Floors</SelectItem>
                        <SelectItem value="G">Ground Floor</SelectItem>
                        <SelectItem value="B1">Basement 1</SelectItem>
                        <SelectItem value="1F">1st Floor</SelectItem>
                        <SelectItem value="2F">2nd Floor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="deviceType">Device Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="pos">POS Terminals</SelectItem>
                        <SelectItem value="kiosk">Self-Service Kiosks</SelectItem>
                        <SelectItem value="reader">Card Readers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="statusFilter">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    System Health Check
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Bulk Configuration
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Test Alert
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Device List */}
            <div className="lg:w-3/4">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Status Board</CardTitle>
                  <CardDescription>Live monitoring of all connected devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devices.map((device) => (
                      <div key={device.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(device.status)}
                              <div>
                                <h4 className="font-medium">{device.name}</h4>
                                <p className="text-sm text-muted-foreground">{device.id}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{device.location}</span>
                            </div>
                            
                            <Badge variant={getStatusColor(device.status) as any}>
                              {device.status}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-6 text-sm">
                            <div>
                              <p className="text-muted-foreground">Uptime</p>
                              <p className="font-medium">{device.uptime}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Seen</p>
                              <p className="font-medium">{device.lastSeen}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Floor</p>
                              <p className="font-medium">{device.floor}</p>
                            </div>
                          </div>
                        </div>

                        {/* Performance Indicators */}
                        <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            <span>CPU: {device.cpu}%</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${device.cpu > 80 ? 'bg-destructive' : device.cpu > 60 ? 'bg-warning' : 'bg-success'}`}
                                style={{ width: `${device.cpu}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                            <span>Memory: {device.memory}%</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${device.memory > 80 ? 'bg-destructive' : device.memory > 60 ? 'bg-warning' : 'bg-success'}`}
                                style={{ width: `${device.memory}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Thermometer className="h-4 w-4 text-muted-foreground" />
                            <span>Temp: {device.temp}°C</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${device.temp > 60 ? 'bg-destructive' : device.temp > 45 ? 'bg-warning' : 'bg-success'}`}
                                style={{ width: `${Math.min(device.temp, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Device Health Status */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hardware Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle>Hardware Monitoring</CardTitle>
                <CardDescription>Real-time hardware health metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4" />
                      <span>CPU Utilization</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Average: 24%</p>
                      <p className="text-sm text-muted-foreground">Peak: 67%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4" />
                      <span>Memory Usage</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Average: 45%</p>
                      <p className="text-sm text-muted-foreground">Peak: 78%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4" />
                      <span>Storage Capacity</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Used: 67%</p>
                      <p className="text-sm text-muted-foreground">Free: 156GB</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4" />
                      <span>Temperature</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Average: 42°C</p>
                      <p className="text-sm text-muted-foreground">Max: 67°C</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4" />
                      <span>Power Status</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">AC Power</p>
                      <p className="text-sm text-success">Stable</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Software Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle>Software Monitoring</CardTitle>
                <CardDescription>Application and system software status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Application Version</p>
                      <p className="text-sm text-muted-foreground">POS Software</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">v2.4.1</Badge>
                      <p className="text-sm text-muted-foreground">Latest</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">OS Patch Level</p>
                      <p className="text-sm text-muted-foreground">Windows Updates</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Current</Badge>
                      <p className="text-sm text-muted-foreground">Updated</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Security Updates</p>
                      <p className="text-sm text-muted-foreground">Antivirus & Firewall</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Protected</Badge>
                      <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Configuration</p>
                      <p className="text-sm text-muted-foreground">System Settings</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Synced</Badge>
                      <p className="text-sm text-muted-foreground">No drift</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">License Status</p>
                      <p className="text-sm text-muted-foreground">Software Licenses</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Valid</Badge>
                      <p className="text-sm text-muted-foreground">365 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Transaction and network performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">2.3s</p>
                  <p className="text-sm text-muted-foreground">Avg Transaction Speed</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Wifi className="h-8 w-8 mx-auto mb-2 text-success" />
                  <p className="text-2xl font-bold">45ms</p>
                  <p className="text-sm text-muted-foreground">Network Latency</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                  <p className="text-2xl font-bold">99.7%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-warning" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Queue Length</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Downtime Alerts */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Alert Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>Configure monitoring thresholds and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="downtimeThreshold">Downtime Threshold (minutes)</Label>
                  <Input 
                    id="downtimeThreshold" 
                    type="number" 
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="alertSeverity">Alert Severity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Notification Channels</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="emailAlerts" defaultChecked />
                      <label htmlFor="emailAlerts">Email Alerts</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="smsAlerts" defaultChecked />
                      <label htmlFor="smsAlerts">SMS Alerts</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="pushAlerts" defaultChecked />
                      <label htmlFor="pushAlerts">Push Notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="dashboardAlerts" defaultChecked />
                      <label htmlFor="dashboardAlerts">Dashboard Popups</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Alert Settings</Button>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 border-l-4 border-destructive bg-destructive/5 rounded">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Food Court Terminal Offline</p>
                      <p className="text-sm text-muted-foreground">Device POS002 has been offline for 15 minutes</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border-l-4 border-warning bg-warning/5 rounded">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">High CPU Usage</p>
                      <p className="text-sm text-muted-foreground">Retail Zone A device showing 85% CPU utilization</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border-l-4 border-success bg-success/5 rounded">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Connection Restored</p>
                      <p className="text-sm text-muted-foreground">Luxury Brands terminal back online</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border-l-4 border-warning bg-warning/5 rounded">
                    <Thermometer className="h-5 w-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Temperature Alert</p>
                      <p className="text-sm text-muted-foreground">Retail Zone A device temperature at 67°C</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Incident Management */}
          <Card>
            <CardHeader>
              <CardTitle>Incident Management</CardTitle>
              <CardDescription>Track and manage device incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Auto Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Auto-ticket Creation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Priority Assignment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      Technician Dispatch
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Tracking</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      Resolution Tracking
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Root Cause Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      Escalation Matrix
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Open Incidents</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Critical:</span>
                        <span className="font-medium text-destructive">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High Priority:</span>
                        <span className="font-medium text-warning">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium Priority:</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Low Priority:</span>
                        <span className="font-medium">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Metrics */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Analytics</CardTitle>
                <CardDescription>Device transaction performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-muted-foreground">Transactions/Hour</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">99.4%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">2.1s</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">14:00</p>
                    <p className="text-sm text-muted-foreground">Peak Usage</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Error Code Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Connection Timeout</span>
                      <Badge variant="destructive">0.3%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Card Read Error</span>
                      <Badge variant="destructive">0.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Network Error</span>
                      <Badge variant="warning">0.1%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparative Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Comparative Analysis</CardTitle>
                <CardDescription>Device performance comparison and ranking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Top Performing Devices</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-success/10 rounded">
                      <span className="text-sm">Luxury Brands POS</span>
                      <Badge variant="secondary">99.9% uptime</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-success/10 rounded">
                      <span className="text-sm">Central Court POS</span>
                      <Badge variant="secondary">99.8% uptime</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-success/10 rounded">
                      <span className="text-sm">Retail Zone B</span>
                      <Badge variant="secondary">99.5% uptime</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Efficiency Score</span>
                      <span className="font-medium">94.2/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Utilization Rate</span>
                      <span className="font-medium">76.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ROI Score</span>
                      <span className="font-medium">8.4/10</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Generate Performance Report</Button>
              </CardContent>
            </Card>
          </div>

          {/* Predictive Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle>Predictive Maintenance</CardTitle>
              <CardDescription>AI-powered maintenance scheduling and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Failure Prediction</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="font-medium text-warning">Retail Zone A</p>
                      <p className="text-sm text-muted-foreground">High failure risk in 7 days</p>
                      <p className="text-xs text-muted-foreground">Based on CPU temperature trends</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Food Court Terminal</p>
                      <p className="text-sm text-muted-foreground">Medium risk in 30 days</p>
                      <p className="text-xs text-muted-foreground">Based on usage patterns</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Maintenance Schedule</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Preventive Maintenance</p>
                      <p className="text-sm text-muted-foreground">Next: Tomorrow 2:00 AM</p>
                      <p className="text-xs text-muted-foreground">Central Court POS</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Parts Replacement</p>
                      <p className="text-sm text-muted-foreground">Scheduled: Next week</p>
                      <p className="text-xs text-muted-foreground">Printer module - Zone A</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Maintenance Summary</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Scheduled this week:</span>
                        <span className="font-medium">3 devices</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Parts inventory:</span>
                        <span className="font-medium text-success">Sufficient</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Warranty expiring:</span>
                        <span className="font-medium text-warning">2 devices</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service history:</span>
                        <span className="font-medium">View all</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeviceMonitoring;