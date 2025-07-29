import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Gift, Send, Upload, Download, CheckCircle, Clock, XCircle, Mail, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EGiftCard {
  id: string;
  cardNumber: string;
  value: number;
  recipientEmail: string;
  recipientName: string;
  senderName: string;
  personalMessage: string;
  status: "pending" | "sent" | "redeemed" | "expired";
  activationDate?: string;
  expiryDate: string;
  lastSent?: string;
}

interface BatchUpload {
  id: string;
  fileName: string;
  totalCards: number;
  processedCards: number;
  successfulCards: number;
  failedCards: number;
  status: "processing" | "completed" | "failed";
  uploadDate: string;
  errors?: string[];
}

interface WhitelistedCustomer {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  addedDate: string;
}

const EGiftCardManagement = () => {
  const { toast } = useToast();
  
  const [eGiftCards, setEGiftCards] = useState<EGiftCard[]>([
    {
      id: "1",
      cardNumber: "EGIFT-001",
      value: 5000,
      recipientEmail: "recipient1@email.com",
      recipientName: "สมชาย ใจดี",
      senderName: "บริษัท ABC",
      personalMessage: "ขอบคุณสำหรับความทุ่มเท",
      status: "sent",
      activationDate: "2024-01-20",
      expiryDate: "2024-12-31",
      lastSent: "2024-01-20T10:30:00"
    },
    {
      id: "2",
      cardNumber: "EGIFT-002",
      value: 10000,
      recipientEmail: "recipient2@email.com",
      recipientName: "นิรัน สุวรรณประเสริฐ",
      senderName: "บริษัท XYZ",
      personalMessage: "สุขสันต์วันเกิด!",
      status: "pending",
      expiryDate: "2024-12-31"
    }
  ]);

  const [batchUploads, setBatchUploads] = useState<BatchUpload[]>([
    {
      id: "1",
      fileName: "egift_batch_january.xlsx",
      totalCards: 100,
      processedCards: 100,
      successfulCards: 95,
      failedCards: 5,
      status: "completed",
      uploadDate: "2024-01-20T09:00:00",
      errors: ["Invalid email format in row 15", "Missing recipient name in row 32"]
    },
    {
      id: "2",
      fileName: "corporate_gifts_q1.xlsx",
      totalCards: 50,
      processedCards: 30,
      successfulCards: 28,
      failedCards: 2,
      status: "processing",
      uploadDate: "2024-01-20T11:30:00"
    }
  ]);

  const [whitelistedCustomers, setWhitelistedCustomers] = useState<WhitelistedCustomer[]>([
    {
      id: "1",
      email: "vip.customer@company.com",
      name: "VIP Customer 1",
      isActive: true,
      addedDate: "2024-01-15"
    },
    {
      id: "2",
      email: "corporate.buyer@business.com",
      name: "Corporate Buyer",
      isActive: true,
      addedDate: "2024-01-10"
    }
  ]);

  const [newGiftCard, setNewGiftCard] = useState({
    value: "",
    recipientEmail: "",
    recipientName: "",
    senderName: "",
    personalMessage: ""
  });

  const [newCustomer, setNewCustomer] = useState({
    email: "",
    name: ""
  });

  const handleActivateCard = (cardId: string) => {
    setEGiftCards(eGiftCards.map(card => 
      card.id === cardId 
        ? { 
            ...card, 
            status: "sent" as const, 
            activationDate: new Date().toISOString().split('T')[0],
            lastSent: new Date().toISOString()
          }
        : card
    ));

    const card = eGiftCards.find(c => c.id === cardId);
    toast({
      title: "E-Gift Card Activated",
      description: `E-Gift card sent to ${card?.recipientEmail} successfully.`
    });
  };

  const handleCreateGiftCard = () => {
    if (!newGiftCard.value || !newGiftCard.recipientEmail || !newGiftCard.recipientName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const card: EGiftCard = {
      id: Date.now().toString(),
      cardNumber: `EGIFT-${String(eGiftCards.length + 1).padStart(3, '0')}`,
      value: parseFloat(newGiftCard.value),
      recipientEmail: newGiftCard.recipientEmail,
      recipientName: newGiftCard.recipientName,
      senderName: newGiftCard.senderName,
      personalMessage: newGiftCard.personalMessage,
      status: "pending",
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setEGiftCards([...eGiftCards, card]);
    setNewGiftCard({ value: "", recipientEmail: "", recipientName: "", senderName: "", personalMessage: "" });
    
    toast({
      title: "Success",
      description: "E-Gift card created successfully"
    });
  };

  const handleAddCustomer = () => {
    if (!newCustomer.email || !newCustomer.name) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const customer: WhitelistedCustomer = {
      id: Date.now().toString(),
      email: newCustomer.email,
      name: newCustomer.name,
      isActive: true,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setWhitelistedCustomers([...whitelistedCustomers, customer]);
    setNewCustomer({ email: "", name: "" });
    
    toast({
      title: "Success",
      description: "Customer added to whitelist successfully"
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
      sent: { label: "Sent", variant: "default" as const, icon: CheckCircle },
      redeemed: { label: "Redeemed", variant: "outline" as const, icon: Gift },
      expired: { label: "Expired", variant: "destructive" as const, icon: XCircle },
      processing: { label: "Processing", variant: "secondary" as const, icon: Clock },
      completed: { label: "Completed", variant: "default" as const, icon: CheckCircle },
      failed: { label: "Failed", variant: "destructive" as const, icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const stats = {
    totalCards: eGiftCards.length,
    pendingActivation: eGiftCards.filter(c => c.status === "pending").length,
    activeCards: eGiftCards.filter(c => c.status === "sent").length,
    totalValue: eGiftCards.reduce((sum, card) => sum + card.value, 0),
    whitelistedCustomers: whitelistedCustomers.filter(c => c.isActive).length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">E-Gift Card Management</h1>
          <p className="text-muted-foreground">Activate and manage e-gift cards with batch operations</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Batch Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Batch Upload E-Gift Cards</DialogTitle>
                <DialogDescription>
                  Upload an Excel file with e-gift card details for batch processing.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Upload Excel File</Label>
                  <Input type="file" accept=".xlsx,.xls" />
                  <p className="text-sm text-muted-foreground mt-1">
                    File should contain columns: Value, RecipientEmail, RecipientName, SenderName, Message
                  </p>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload and Process
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Gift className="h-4 w-4 mr-2" />
                Create E-Gift Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New E-Gift Card</DialogTitle>
                <DialogDescription>
                  Create a new e-gift card for activation and delivery.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="value">Card Value (THB) *</Label>
                  <Input
                    id="value"
                    type="number"
                    value={newGiftCard.value}
                    onChange={(e) => setNewGiftCard({...newGiftCard, value: e.target.value})}
                    placeholder="5000"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientEmail">Recipient Email *</Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    value={newGiftCard.recipientEmail}
                    onChange={(e) => setNewGiftCard({...newGiftCard, recipientEmail: e.target.value})}
                    placeholder="recipient@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientName">Recipient Name *</Label>
                  <Input
                    id="recipientName"
                    value={newGiftCard.recipientName}
                    onChange={(e) => setNewGiftCard({...newGiftCard, recipientName: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    value={newGiftCard.senderName}
                    onChange={(e) => setNewGiftCard({...newGiftCard, senderName: e.target.value})}
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Personal Message</Label>
                  <Textarea
                    id="message"
                    value={newGiftCard.personalMessage}
                    onChange={(e) => setNewGiftCard({...newGiftCard, personalMessage: e.target.value})}
                    placeholder="Happy Birthday! Enjoy your gift."
                  />
                </div>
              </div>
              <Button onClick={handleCreateGiftCard}>Create E-Gift Card</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total E-Gift Cards</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCards}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Activation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingActivation}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCards}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{stats.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Whitelisted Customers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.whitelistedCustomers}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cards">E-Gift Cards</TabsTrigger>
          <TabsTrigger value="batch">Batch Operations</TabsTrigger>
          <TabsTrigger value="whitelist">Customer Whitelist</TabsTrigger>
        </TabsList>

        <TabsContent value="cards">
          <Card>
            <CardHeader>
              <CardTitle>E-Gift Card Activation</CardTitle>
              <CardDescription>Activate individual e-gift cards and send to recipients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Card Number</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eGiftCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-mono">{card.cardNumber}</TableCell>
                      <TableCell>฿{card.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{card.recipientName}</div>
                          <div className="text-sm text-muted-foreground">{card.recipientEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{card.senderName || "-"}</TableCell>
                      <TableCell>{getStatusBadge(card.status)}</TableCell>
                      <TableCell>{new Date(card.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {card.status === "pending" && (
                          <Button 
                            size="sm" 
                            onClick={() => handleActivateCard(card.id)}
                            className="gap-1"
                          >
                            <Send className="h-3 w-3" />
                            Activate & Send
                          </Button>
                        )}
                        {card.status === "sent" && (
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch">
          <Card>
            <CardHeader>
              <CardTitle>Batch Upload History</CardTitle>
              <CardDescription>Track bulk e-gift card upload and processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Total Cards</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchUploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4" />
                          {upload.fileName}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(upload.uploadDate).toLocaleString()}</TableCell>
                      <TableCell>{upload.totalCards}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={(upload.processedCards / upload.totalCards) * 100} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {upload.processedCards}/{upload.totalCards} processed
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-green-600">{upload.successfulCards} success</div>
                          <div className="text-red-600">{upload.failedCards} failed</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(upload.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {upload.errors && upload.errors.length > 0 && (
                            <Button variant="outline" size="sm">
                              View Errors
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whitelist">
          <Card>
            <CardHeader>
              <CardTitle>Whitelisted Customer Management</CardTitle>
              <CardDescription>Manage approved customers for e-gift card distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Add Customer to Whitelist
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Whitelisted Customer</DialogTitle>
                    <DialogDescription>
                      Add a new customer to the approved whitelist for e-gift card distribution.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="customerEmail">Email Address *</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                        placeholder="customer@company.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerName">Customer Name *</Label>
                      <Input
                        id="customerName"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                        placeholder="Customer Name"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddCustomer}>Add to Whitelist</Button>
                </DialogContent>
              </Dialog>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Added Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whitelistedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <Badge variant={customer.isActive ? "default" : "secondary"}>
                          {customer.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(customer.addedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            {customer.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EGiftCardManagement;