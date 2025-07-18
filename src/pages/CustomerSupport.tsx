import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Phone, 
  Mail, 
  CreditCard, 
  DollarSign, 
  FileText, 
  Clock, 
  User, 
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  Star,
  RefreshCw,
  Printer,
  Eye
} from 'lucide-react';

const CustomerSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('card');

  // Mock customer data
  const customerData = {
    cardNumber: 'GC123456789',
    customerName: 'สมชาย ใจดี',
    email: 'somchai@email.com',
    phone: '081-234-5678',
    currentBalance: 1450.00,
    availableBalance: 1400.00,
    pendingAmount: 50.00,
    lastActivity: '2 hours ago',
    expiryDate: '2025-12-31',
    status: 'Active'
  };

  // Mock transaction history
  const transactions = [
    { id: 'TX001', date: '2024-01-15 14:30', merchant: 'Starbucks', amount: -150.00, type: 'Purchase', status: 'Completed' },
    { id: 'TX002', date: '2024-01-15 12:15', merchant: 'Central Food Court', amount: -250.00, type: 'Purchase', status: 'Completed' },
    { id: 'TX003', date: '2024-01-14 16:45', merchant: 'Top-up Terminal', amount: 1000.00, type: 'Top-up', status: 'Completed' },
    { id: 'TX004', date: '2024-01-14 11:20', merchant: 'H&M', amount: -350.00, type: 'Purchase', status: 'Completed' },
  ];

  // Mock dispute cases
  const disputeCases = [
    { id: 'DP001', cardNumber: 'GC123456789', amount: 150.00, merchant: 'Starbucks', date: '2024-01-15', status: 'Investigating', priority: 'Medium' },
    { id: 'DP002', cardNumber: 'GC987654321', amount: 500.00, merchant: 'Central', date: '2024-01-14', status: 'Resolved', priority: 'High' },
    { id: 'DP003', cardNumber: 'GC456789123', amount: 75.00, merchant: 'Food Court', date: '2024-01-13', status: 'Pending', priority: 'Low' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': 
      case 'resolved': 
      case 'active': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending': 
      case 'investigating': return <Clock className="h-4 w-4 text-warning" />;
      case 'failed': 
      case 'declined': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Support Tools</h1>
        <p className="text-muted-foreground">Comprehensive customer service and support management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Open Cases</p>
                <p className="text-2xl font-semibold">247</p>
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
                <p className="text-sm text-muted-foreground">Pending Disputes</p>
                <p className="text-2xl font-semibold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-semibold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-semibold">4.8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="inquiry" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inquiry">Card Balance Inquiry</TabsTrigger>
          <TabsTrigger value="disputes">Dispute Management</TabsTrigger>
          <TabsTrigger value="replacement">Card Replacement</TabsTrigger>
        </TabsList>

        {/* Card Balance Inquiry */}
        <TabsContent value="inquiry" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Quick Search
                </CardTitle>
                <CardDescription>Search customer information quickly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="searchType">Search By</Label>
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Card Number</SelectItem>
                      <SelectItem value="phone">Phone Number</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="transaction">Transaction Reference</SelectItem>
                      <SelectItem value="name">Customer Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="searchQuery">Search Query</Label>
                  <Input 
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Enter ${searchType}...`}
                  />
                </div>

                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Recent Searches
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Saved Searches
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Balance Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Balance Information
                </CardTitle>
                <CardDescription>Current card balance and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Card Number</Label>
                    <p className="font-medium">{customerData.cardNumber}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(customerData.status)}
                      <span className="font-medium">{customerData.status}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                    <span>Current Balance</span>
                    <span className="font-bold text-lg">₿{customerData.currentBalance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Available Balance</span>
                    <span className="font-medium">₿{customerData.availableBalance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                    <span>Pending Amount</span>
                    <span className="font-medium">₿{customerData.pendingAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Last Activity:</span>
                    <span className="font-medium">{customerData.lastActivity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Expiry Date:</span>
                    <span className="font-medium">{customerData.expiryDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
                <CardDescription>Customer details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label>Customer Name</Label>
                    <p className="font-medium">{customerData.customerName}</p>
                  </div>
                  
                  <div>
                    <Label>Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{customerData.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Phone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{customerData.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send SMS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Transaction History
              </CardTitle>
              <CardDescription>Recent transaction activity for this card</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export History
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Full History
                  </Button>
                </div>

                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(tx.status)}
                          <div>
                            <p className="font-medium">{tx.merchant}</p>
                            <p className="text-sm text-muted-foreground">{tx.id} • {tx.type}</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`font-medium ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                          {tx.amount > 0 ? '+' : ''}₿{Math.abs(tx.amount).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transaction Dispute Management */}
        <TabsContent value="disputes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create New Dispute */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Create Dispute Case
                </CardTitle>
                <CardDescription>Register a new customer dispute</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="disputeCard">Card Number</Label>
                  <Input id="disputeCard" placeholder="Enter card number" />
                </div>

                <div>
                  <Label htmlFor="disputeTransaction">Transaction ID</Label>
                  <Input id="disputeTransaction" placeholder="Enter transaction ID" />
                </div>

                <div>
                  <Label htmlFor="disputeCategory">Dispute Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unauthorized">Unauthorized Transaction</SelectItem>
                      <SelectItem value="duplicate">Duplicate Charge</SelectItem>
                      <SelectItem value="amount">Incorrect Amount</SelectItem>
                      <SelectItem value="refund">Refund Not Processed</SelectItem>
                      <SelectItem value="technical">Technical Error</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="disputeAmount">Disputed Amount</Label>
                  <Input id="disputeAmount" type="number" placeholder="0.00" />
                </div>

                <div>
                  <Label htmlFor="customerInfo">Customer Information</Label>
                  <Textarea id="customerInfo" placeholder="Customer name, contact details..." />
                </div>

                <div>
                  <Label htmlFor="disputeDescription">Description</Label>
                  <Textarea id="disputeDescription" placeholder="Detailed description of the dispute..." />
                </div>

                <div>
                  <Label htmlFor="disputePriority">Priority Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="supportingDocs">Supporting Documents</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>

                <Button className="w-full">Create Dispute Case</Button>
              </CardContent>
            </Card>

            {/* Investigation Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Investigation Tools
                </CardTitle>
                <CardDescription>Tools for dispute investigation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="investigateTransaction">Transaction ID</Label>
                  <Input id="investigateTransaction" placeholder="Enter transaction ID to investigate" />
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Transaction Trace
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Merchant Verification
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Authorization Logs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Video Evidence
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Communication History
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Investigation Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Evidence Collected:</span>
                      <Badge variant="secondary">3 items</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Merchant Response:</span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Investigation Days:</span>
                      <span className="font-medium">2 of 14</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Add Evidence
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Customer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dispute Cases List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Active Dispute Cases
              </CardTitle>
              <CardDescription>Manage and track all dispute cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Cases
                  </Button>
                </div>

                <div className="space-y-3">
                  {disputeCases.map((dispute) => (
                    <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(dispute.status)}
                          <div>
                            <p className="font-medium">{dispute.id}</p>
                            <p className="text-sm text-muted-foreground">{dispute.cardNumber}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium">{dispute.merchant}</p>
                          <p className="text-sm text-muted-foreground">Amount: ₿{dispute.amount.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge variant={getPriorityColor(dispute.priority) as "destructive" | "outline" | "secondary"}>
                          {dispute.priority}
                        </Badge>
                        
                        <Badge variant="outline">
                          {dispute.status}
                        </Badge>
                        
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{dispute.date}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Update</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Card Replacement */}
        <TabsContent value="replacement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Replacement Request */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Card Replacement Request
                </CardTitle>
                <CardDescription>Process card replacement requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="originalCard">Original Card Number</Label>
                  <Input id="originalCard" placeholder="Enter original card number" />
                </div>

                <div>
                  <Label htmlFor="replacementReason">Replacement Reason</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lost">Lost Card</SelectItem>
                      <SelectItem value="stolen">Stolen Card</SelectItem>
                      <SelectItem value="damaged">Damaged Card</SelectItem>
                      <SelectItem value="defective">Defective Card</SelectItem>
                      <SelectItem value="expired">Expired Card</SelectItem>
                      <SelectItem value="upgrade">Card Upgrade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="customerVerification">Customer Verification</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="idVerified" />
                      <label htmlFor="idVerified" className="text-sm">ID Document Verified</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="phoneVerified" />
                      <label htmlFor="phoneVerified" className="text-sm">Phone Number Verified</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="emailVerified" />
                      <label htmlFor="emailVerified" className="text-sm">Email Verified</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="securityQuestions" />
                      <label htmlFor="securityQuestions" className="text-sm">Security Questions Answered</label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newCardType">New Card Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Physical Card</SelectItem>
                      <SelectItem value="premium">Premium Physical Card</SelectItem>
                      <SelectItem value="egift">E-Gift Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Balance Transfer</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Current Balance:</span>
                      <span className="font-medium">₿1,450.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Transfer Amount:</span>
                      <span className="font-medium">₿1,450.00</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <input type="checkbox" id="transferBalance" defaultChecked />
                      <label htmlFor="transferBalance" className="text-sm">Transfer full balance to new card</label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Process Replacement</Button>
              </CardContent>
            </Card>

            {/* Card Migration & Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Migration & Tracking
                </CardTitle>
                <CardDescription>Track replacement progress and card migration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Migration Options</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="preserveBalance" defaultChecked />
                      <label htmlFor="preserveBalance" className="text-sm">Preserve Balance</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="transferHistory" defaultChecked />
                      <label htmlFor="transferHistory" className="text-sm">Transfer Transaction History</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="linkedAccounts" />
                      <label htmlFor="linkedAccounts" className="text-sm">Migrate Linked Accounts</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="preferences" />
                      <label htmlFor="preferences" className="text-sm">Transfer Preferences</label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="deliveryMethod">Delivery Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pickup">Customer Pickup</SelectItem>
                      <SelectItem value="courier">Courier Delivery</SelectItem>
                      <SelectItem value="mail">Registered Mail</SelectItem>
                      <SelectItem value="email">Email (E-Gift)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Delivery Address</Label>
                  <Textarea placeholder="Enter delivery address..." />
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Replacement Progress</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Request Received</span>
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Verification Complete</span>
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Card Production</span>
                      <Clock className="h-4 w-4 text-warning" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Quality Check</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Delivery</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Track Production
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Notify Customer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Completion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Replacement Requests List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Active Replacement Requests
              </CardTitle>
              <CardDescription>Track all card replacement requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="production">In Production</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Requests
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'REP001', originalCard: 'GC123456789', newCard: 'GC987654321', reason: 'Lost Card', status: 'Production', date: '2024-01-15' },
                    { id: 'REP002', originalCard: 'GC456789123', newCard: 'GC654321987', reason: 'Damaged', status: 'Shipped', date: '2024-01-14' },
                    { id: 'REP003', originalCard: 'GC789123456', newCard: 'GC321987654', reason: 'Stolen', status: 'Completed', date: '2024-01-13' },
                  ].map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{request.id}</p>
                          <p className="text-sm text-muted-foreground">Original: {request.originalCard}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium">{request.reason}</p>
                          <p className="text-sm text-muted-foreground">New: {request.newCard}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{request.status}</Badge>
                        <p className="text-sm text-muted-foreground">{request.date}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Track</Button>
                          <Button size="sm" variant="outline">Update</Button>
                        </div>
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

export default CustomerSupport;