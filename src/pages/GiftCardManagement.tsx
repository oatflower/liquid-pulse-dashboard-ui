import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Upload, Download, FileText, AlertCircle, Calendar, DollarSign, Users, BarChart3, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const GiftCardManagement = () => {
  const [activeCardType, setActiveCardType] = useState('physical');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gift Card Management</h1>
        <p className="text-muted-foreground">Comprehensive gift card lifecycle management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-semibold">245,678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Value</p>
                <p className="text-2xl font-semibold">₿12.5M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Cards</p>
                <p className="text-2xl font-semibold">198,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-semibold">3,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="issuance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="issuance">Card Issuance</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Generation</TabsTrigger>
          <TabsTrigger value="status">Status Management</TabsTrigger>
          <TabsTrigger value="balance">Balance Management</TabsTrigger>
          <TabsTrigger value="expiry">Expiry Management</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Card Issuance Management */}
        <TabsContent value="issuance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create Single Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create Single Card
                </CardTitle>
                <CardDescription>Issue individual gift cards with custom parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardValue">Card Value (THB)</Label>
                    <Input 
                      id="cardValue" 
                      type="number" 
                      placeholder="0.00" 
                      max="50000"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Max: 50,000 THB</p>
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input 
                      id="expiryDate" 
                      type="date"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Up to 5 years</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardType">Card Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical Card</SelectItem>
                        <SelectItem value="egift">E-Gift Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="initialStatus">Initial Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number (Auto-generated)</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="Will be auto-generated"
                    disabled
                  />
                </div>

                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Card
                </Button>
              </CardContent>
            </Card>

            {/* Card Activation Workflow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Card Activation Workflow
                </CardTitle>
                <CardDescription>Manage card activation processes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Batch Activation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Individual Activation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Activation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Activation Logs
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Recent Activations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Batch #BT001</span>
                      <Badge variant="secondary">1,000 cards</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Card #GC789456</span>
                      <Badge variant="outline">Individual</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Scheduled #SC002</span>
                      <Badge variant="secondary">500 cards</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bulk Card Generation */}
        <TabsContent value="bulk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Batch Creation */}
            <Card>
              <CardHeader>
                <CardTitle>Batch Creation Interface</CardTitle>
                <CardDescription>Generate multiple cards at once</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="batchName">Batch Name</Label>
                  <Input id="batchName" placeholder="e.g., Holiday Promo 2024" />
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    placeholder="1-10,000" 
                    max="10000"
                  />
                </div>

                <div>
                  <Label htmlFor="valueType">Value Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select value type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Value</SelectItem>
                      <SelectItem value="range">Value Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="csvUpload">Import CSV</Label>
                  <Input id="csvUpload" type="file" accept=".csv" />
                </div>

                <Button className="w-full">Generate Batch</Button>
              </CardContent>
            </Card>

            {/* B2B Bulk Orders */}
            <Card>
              <CardHeader>
                <CardTitle>B2B Bulk Orders</CardTitle>
                <CardDescription>Corporate gift card orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="corporateClient">Corporate Client</Label>
                  <Input id="corporateClient" placeholder="Company name" />
                </div>

                <div>
                  <Label htmlFor="customBranding">Custom Branding</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Branding options" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Design</SelectItem>
                      <SelectItem value="custom">Custom Design</SelectItem>
                      <SelectItem value="corporate">Corporate Branding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deliveryMethod">Delivery Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="courier">Courier</SelectItem>
                      <SelectItem value="email">Email Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Create B2B Order</Button>
              </CardContent>
            </Card>

            {/* Export Functions */}
            <Card>
              <CardHeader>
                <CardTitle>Export Functions</CardTitle>
                <CardDescription>Download and export card data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Card List (Excel)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Card List (CSV)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate QR Codes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Print Physical Card Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Export Activation Codes
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Export History</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Last export: 2 hours ago</p>
                    <p>Batch #BT001 - 1,000 cards</p>
                    <p>Format: Excel with QR codes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Status Management */}
        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Control Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Status Control Panel</CardTitle>
                <CardDescription>Monitor and control card statuses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <p className="text-2xl font-bold text-success">198,234</p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">12,567</p>
                    <p className="text-sm text-muted-foreground">Inactive</p>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <p className="text-2xl font-bold text-destructive">2,345</p>
                    <p className="text-sm text-muted-foreground">Blocked</p>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <p className="text-2xl font-bold text-warning">3,456</p>
                    <p className="text-sm text-muted-foreground">Suspended</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">View All Card Statuses</Button>
                  <Button variant="outline" className="w-full">Bulk Status Update</Button>
                  <Button variant="outline" className="w-full">Status Change History</Button>
                </div>
              </CardContent>
            </Card>

            {/* Block/Unblock Functions */}
            <Card>
              <CardHeader>
                <CardTitle>Block/Unblock Functions</CardTitle>
                <CardDescription>Card security operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardToBlock">Card Number</Label>
                  <Input id="cardToBlock" placeholder="Enter card number" />
                </div>

                <div>
                  <Label htmlFor="blockReason">Block Reason</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fraud">Suspected Fraud</SelectItem>
                      <SelectItem value="customer">Customer Request</SelectItem>
                      <SelectItem value="lost">Lost/Stolen</SelectItem>
                      <SelectItem value="security">Security Concern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="blockNotes">Additional Notes</Label>
                  <Textarea id="blockNotes" placeholder="Enter reason details..." />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="destructive">Block Card</Button>
                  <Button variant="outline">Unblock Card</Button>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Recent Actions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Card #GC123456</span>
                      <Badge variant="destructive">Blocked</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Card #GC789012</span>
                      <Badge variant="secondary">Unblocked</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Balance Management */}
        <TabsContent value="balance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Balance Operations */}
            <Card>
              <CardHeader>
                <CardTitle>Balance Operations</CardTitle>
                <CardDescription>Manage card balances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="balanceCard">Card Number</Label>
                  <Input id="balanceCard" placeholder="Enter card number" />
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-2" />
                    View Current Balance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Available Balance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    View Pending Transactions
                  </Button>
                </div>

                <div>
                  <Label htmlFor="adjustAmount">Adjustment Amount</Label>
                  <Input id="adjustAmount" type="number" placeholder="0.00" />
                </div>

                <div>
                  <Label htmlFor="adjustReason">Reason</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="correction">Balance Correction</SelectItem>
                      <SelectItem value="compensation">Compensation</SelectItem>
                      <SelectItem value="promotion">Promotional Credit</SelectItem>
                      <SelectItem value="refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Adjustment</Button>
              </CardContent>
            </Card>

            {/* Top-up Management */}
            <Card>
              <CardHeader>
                <CardTitle>Top-up Management</CardTitle>
                <CardDescription>Manage card top-ups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="topupCard">Card Number</Label>
                  <Input id="topupCard" placeholder="Enter card number" />
                </div>

                <div>
                  <Label htmlFor="topupAmount">Top-up Amount</Label>
                  <Input id="topupAmount" type="number" placeholder="0.00" />
                </div>

                <div>
                  <Label htmlFor="topupMethod">Top-up Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual Entry</SelectItem>
                      <SelectItem value="bulk">Bulk Upload</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Process Top-up</Button>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Top-up Upload
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Top-up History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Top-up Reversal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Balance Inquiries */}
            <Card>
              <CardHeader>
                <CardTitle>Balance Inquiries</CardTitle>
                <CardDescription>Quick balance checks and reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="inquiryCard">Card Number</Label>
                  <Input id="inquiryCard" placeholder="Quick balance check" />
                </div>

                <Button variant="outline" className="w-full">Quick Balance Check</Button>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Balance Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Balance:</span>
                      <span className="font-medium">₿1,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available Balance:</span>
                      <span className="font-medium">₿1,450.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="font-medium">₿50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Transaction:</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Balance History Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Transaction History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Balance Trends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expiry Management */}
        <TabsContent value="expiry" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expiry Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Expiry Configuration</CardTitle>
                <CardDescription>Set card expiry policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="defaultExpiry">Default Expiry Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="3years">3 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="gracePeriod">Grace Period (Days)</Label>
                  <Input id="gracePeriod" type="number" placeholder="30" />
                </div>

                <div>
                  <Label htmlFor="extensionRules">Extension Rules</Label>
                  <Textarea id="extensionRules" placeholder="Define extension conditions..." />
                </div>

                <Button className="w-full">Update Configuration</Button>
              </CardContent>
            </Card>

            {/* Expiry Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Expiry Notifications</CardTitle>
                <CardDescription>Manage expiry alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>90-day warning</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>30-day reminder</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>7-day final notice</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Post-expiry notification</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full">Customize Message Templates</Button>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Upcoming Expiries</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Next 30 days:</span>
                      <span className="font-medium">1,234 cards</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next 90 days:</span>
                      <span className="font-medium">3,456 cards</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Already expired:</span>
                      <span className="font-medium">567 cards</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expired Balance Processing */}
          <Card>
            <CardHeader>
              <CardTitle>Expired Balance Processing</CardTitle>
              <CardDescription>Handle expired card balances and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Processing Options</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Auto-sweep Expired Balances
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Expiry Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Return Balance to One Bangkok
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Compliance</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Compliance Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Audit Trail
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Return Reports
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Summary</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Expired cards today:</span>
                        <span className="font-medium">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total expired value:</span>
                        <span className="font-medium">₿67,890</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Awaiting return:</span>
                        <span className="font-medium">₿12,345</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Template Management */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Template Management</CardTitle>
              <CardDescription>Design and manage card templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Template Creation</h4>
                  <div>
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input id="templateName" placeholder="e.g., Holiday 2024" />
                  </div>
                  <div>
                    <Label htmlFor="templateArtwork">Upload Artwork</Label>
                    <Input id="templateArtwork" type="file" accept="image/*" />
                  </div>
                  <div>
                    <Label htmlFor="defaultValues">Default Values</Label>
                    <Input id="defaultValues" placeholder="e.g., 1000 THB" />
                  </div>
                  <Button className="w-full">Create Template</Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Template Preview</h4>
                  <div className="aspect-[3/2] bg-gradient-to-br from-primary to-secondary rounded-lg p-4 text-white">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold">One Bangkok</h3>
                        <p className="text-sm opacity-90">Gift Card</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">₿1,000</p>
                        <p className="text-xs opacity-75">Valid until: Dec 2029</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Preview Template</Button>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Existing Templates</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Standard Template', 'Corporate Template', 'Holiday Special'].map((template, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="aspect-[3/2] bg-muted rounded mb-3"></div>
                      <h5 className="font-medium">{template}</h5>
                      <p className="text-sm text-muted-foreground">Version 1.{index + 1}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Clone</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GiftCardManagement;