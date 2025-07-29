import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, Send, Search, Download, Mail, CheckCircle, Clock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Purchase {
  id: string;
  customerName: string;
  customerEmail: string;
  cardValue: number;
  quantity: number;
  totalAmount: number;
  purchaseDate: string;
  paymentMethod: string;
  status: "completed" | "pending" | "failed";
  receiptSent: boolean;
  receiptId: string;
  cardNumbers: string[];
}

interface ReceiptTemplate {
  id: string;
  name: string;
  subject: string;
  isDefault: boolean;
}

const PurchaseReceiptManagement = () => {
  const { toast } = useToast();
  
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: "1",
      customerName: "สมชาย ใจดี",
      customerEmail: "somchai@email.com",
      cardValue: 5000,
      quantity: 2,
      totalAmount: 10000,
      purchaseDate: "2024-01-20T10:30:00",
      paymentMethod: "Credit Card",
      status: "completed",
      receiptSent: true,
      receiptId: "RCP-20240120-001",
      cardNumbers: ["****1234", "****5678"]
    },
    {
      id: "2",
      customerName: "นิรัน สุวรรณประเสริฐ", 
      customerEmail: "niran@email.com",
      cardValue: 10000,
      quantity: 1,
      totalAmount: 10000,
      purchaseDate: "2024-01-20T09:15:00",
      paymentMethod: "Bank Transfer",
      status: "completed",
      receiptSent: false,
      receiptId: "RCP-20240120-002",
      cardNumbers: ["****9012"]
    },
    {
      id: "3",
      customerName: "พลอย ศิริวัฒน์",
      customerEmail: "ploy@email.com",
      cardValue: 15000,
      quantity: 3,
      totalAmount: 45000,
      purchaseDate: "2024-01-20T08:45:00",
      paymentMethod: "Digital Wallet",
      status: "pending",
      receiptSent: false,
      receiptId: "RCP-20240120-003",
      cardNumbers: []
    }
  ]);

  const [receiptTemplates] = useState<ReceiptTemplate[]>([
    { id: "1", name: "Standard Receipt", subject: "Your Gift Card Purchase Receipt", isDefault: true },
    { id: "2", name: "Premium Receipt", subject: "Thank you for your Premium Gift Card Purchase", isDefault: false },
    { id: "3", name: "Corporate Receipt", subject: "Corporate Gift Card Purchase Confirmation", isDefault: false }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSendReceipt = (purchaseId: string) => {
    setPurchases(purchases.map(purchase => 
      purchase.id === purchaseId 
        ? { ...purchase, receiptSent: true }
        : purchase
    ));

    const purchase = purchases.find(p => p.id === purchaseId);
    toast({
      title: "Receipt Sent",
      description: `Receipt sent to ${purchase?.customerEmail} successfully.`
    });
  };

  const handleBulkSendReceipts = () => {
    const unsentReceipts = filteredPurchases.filter(p => !p.receiptSent && p.status === "completed");
    
    setPurchases(purchases.map(purchase => 
      unsentReceipts.some(u => u.id === purchase.id)
        ? { ...purchase, receiptSent: true }
        : purchase
    ));

    toast({
      title: "Bulk Receipts Sent",
      description: `${unsentReceipts.length} receipts sent successfully.`
    });
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.receiptId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Completed", variant: "default" as const, icon: CheckCircle },
      pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
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
    totalPurchases: purchases.length,
    completedPurchases: purchases.filter(p => p.status === "completed").length,
    pendingReceipts: purchases.filter(p => p.status === "completed" && !p.receiptSent).length,
    totalRevenue: purchases.filter(p => p.status === "completed").reduce((sum, p) => sum + p.totalAmount, 0)
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Purchase and Receipt Management</h1>
          <p className="text-muted-foreground">Manage gift card purchases and automated receipt distribution</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleBulkSendReceipts} className="gap-2">
            <Send className="h-4 w-4" />
            Send Pending Receipts
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPurchases}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedPurchases} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Receipts</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReceipts}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting receipt delivery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From completed purchases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receipt Templates</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receiptTemplates.length}</div>
            <p className="text-xs text-muted-foreground">
              Available templates
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="purchases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="purchases">Purchase Management</TabsTrigger>
          <TabsTrigger value="templates">Receipt Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Purchase and Receipt Tracking</CardTitle>
              <CardDescription>
                Monitor gift card purchases and receipt delivery status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by customer name, email, or receipt ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Purchase Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Card Value</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Receipt Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPurchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell className="font-mono">{purchase.receiptId}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{purchase.customerName}</div>
                          <div className="text-sm text-muted-foreground">{purchase.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>฿{purchase.cardValue.toLocaleString()}</TableCell>
                      <TableCell>{purchase.quantity}</TableCell>
                      <TableCell>฿{purchase.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(purchase.purchaseDate).toLocaleString()}</TableCell>
                      <TableCell>{purchase.paymentMethod}</TableCell>
                      <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                      <TableCell>
                        {purchase.receiptSent ? (
                          <Badge variant="default" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Sent
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {!purchase.receiptSent && purchase.status === "completed" && (
                            <Button 
                              size="sm" 
                              onClick={() => handleSendReceipt(purchase.id)}
                              className="gap-1"
                            >
                              <Send className="h-3 w-3" />
                              Send
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

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Receipt Email Templates</CardTitle>
              <CardDescription>
                Manage email templates for automated receipt delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Email Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receiptTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>
                        {template.isDefault ? (
                          <Badge variant="default">Default</Badge>
                        ) : (
                          <Badge variant="outline">Available</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          {!template.isDefault && (
                            <Button variant="outline" size="sm">
                              Set Default
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
      </Tabs>
    </div>
  );
};

export default PurchaseReceiptManagement;