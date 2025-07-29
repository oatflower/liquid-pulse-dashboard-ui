import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, Package, FileText, Building2, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Merchant {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "pending_review" | "approved" | "rejected" | "more_info_required";
  submissionDate: string;
  documents: {
    businessCertificate: boolean;
    taxId: boolean;
    bankDetails: boolean;
    addressProof: boolean;
  };
  deviceAssigned?: string;
  deviceStatus?: "pending" | "dispatched" | "delivered" | "active";
}

interface Device {
  id: string;
  serialNumber: string;
  model: string;
  status: "in_stock" | "assigned" | "dispatched" | "active";
  assignedMerchant?: string;
  dispatchDate?: string;
}

const KYMProcessManagement = () => {
  const { toast } = useToast();
  
  const [merchants, setMerchants] = useState<Merchant[]>([
    {
      id: "1",
      businessName: "Bangkok Coffee Co.",
      contactPerson: "Somchai Jaidee",
      email: "somchai@bangkokcoffee.com",
      phone: "+66 2 123 4567",
      status: "pending_review",
      submissionDate: "2024-01-15",
      documents: { businessCertificate: true, taxId: true, bankDetails: true, addressProof: false }
    },
    {
      id: "2",
      businessName: "Phuket Beach Resort",
      contactPerson: "Niran Suwanprasert",
      email: "niran@phuketbeach.com",
      phone: "+66 76 234 5678",
      status: "approved",
      submissionDate: "2024-01-10",
      documents: { businessCertificate: true, taxId: true, bankDetails: true, addressProof: true },
      deviceAssigned: "DEV001",
      deviceStatus: "dispatched"
    },
    {
      id: "3",
      businessName: "Chiang Mai Handicrafts",
      contactPerson: "Ploy Siriwat",
      email: "ploy@cmhandicrafts.com",
      phone: "+66 53 345 6789",
      status: "rejected",
      submissionDate: "2024-01-12",
      documents: { businessCertificate: true, taxId: false, bankDetails: true, addressProof: true }
    }
  ]);

  const [devices, setDevices] = useState<Device[]>([
    { id: "1", serialNumber: "DEV001", model: "POS-2024-A", status: "dispatched", assignedMerchant: "2", dispatchDate: "2024-01-16" },
    { id: "2", serialNumber: "DEV002", model: "POS-2024-A", status: "in_stock" },
    { id: "3", serialNumber: "DEV003", model: "POS-2024-B", status: "in_stock" },
    { id: "4", serialNumber: "DEV004", model: "POS-2024-A", status: "active", assignedMerchant: "4" },
    { id: "5", serialNumber: "DEV005", model: "POS-2024-B", status: "in_stock" }
  ]);

  const handleApproval = (merchantId: string, action: "approve" | "reject") => {
    setMerchants(merchants.map(merchant => 
      merchant.id === merchantId 
        ? { ...merchant, status: action === "approve" ? "approved" : "rejected" }
        : merchant
    ));

    // Auto-assign device if approved
    if (action === "approve") {
      const availableDevice = devices.find(d => d.status === "in_stock");
      if (availableDevice) {
        setDevices(devices.map(device => 
          device.id === availableDevice.id 
            ? { ...device, status: "assigned", assignedMerchant: merchantId }
            : device
        ));
        
        setMerchants(merchants.map(merchant => 
          merchant.id === merchantId 
            ? { ...merchant, deviceAssigned: availableDevice.serialNumber, deviceStatus: "pending" }
            : merchant
        ));
      }
    }

    toast({
      title: `Merchant ${action === "approve" ? "Approved" : "Rejected"}`,
      description: `KYM application has been ${action === "approve" ? "approved" : "rejected"} successfully.`
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_review: { label: "Pending Review", variant: "secondary" as const, icon: Clock },
      approved: { label: "Approved", variant: "default" as const, icon: CheckCircle },
      rejected: { label: "Rejected", variant: "destructive" as const, icon: XCircle },
      more_info_required: { label: "More Info Required", variant: "outline" as const, icon: FileText }
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

  const getDocumentProgress = (documents: Merchant['documents']) => {
    const total = Object.keys(documents).length;
    const completed = Object.values(documents).filter(Boolean).length;
    return (completed / total) * 100;
  };

  const stats = {
    totalMerchants: merchants.length,
    pendingReview: merchants.filter(m => m.status === "pending_review").length,
    approved: merchants.filter(m => m.status === "approved").length,
    devicesInStock: devices.filter(d => d.status === "in_stock").length,
    devicesActive: devices.filter(d => d.status === "active").length
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">KYM Process & Device Management</h1>
        <p className="text-muted-foreground">Manage merchant onboarding and device distribution</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMerchants}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devices in Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.devicesInStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.devicesActive}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="merchants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="merchants">Merchant Applications</TabsTrigger>
          <TabsTrigger value="devices">Device Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="merchants">
          <Card>
            <CardHeader>
              <CardTitle>Merchant KYM Applications</CardTitle>
              <CardDescription>Review and approve merchant onboarding applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Document Progress</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Device Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchants.map((merchant) => (
                    <TableRow key={merchant.id}>
                      <TableCell className="font-medium">{merchant.businessName}</TableCell>
                      <TableCell>
                        <div>
                          <div>{merchant.contactPerson}</div>
                          <div className="text-sm text-muted-foreground">{merchant.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(merchant.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={getDocumentProgress(merchant.documents)} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {Object.values(merchant.documents).filter(Boolean).length}/{Object.keys(merchant.documents).length} documents
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(merchant.submissionDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {merchant.deviceAssigned ? (
                          <Badge variant="outline">{merchant.deviceStatus}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {merchant.status === "pending_review" && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleApproval(merchant.id, "approve")}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleApproval(merchant.id, "reject")}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Device Inventory Management</CardTitle>
              <CardDescription>Track and manage gift card devices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Merchant</TableHead>
                    <TableHead>Dispatch Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-mono">{device.serialNumber}</TableCell>
                      <TableCell>{device.model}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            device.status === "active" ? "default" :
                            device.status === "dispatched" ? "secondary" :
                            device.status === "assigned" ? "outline" : "destructive"
                          }
                        >
                          {device.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {device.assignedMerchant ? (
                          merchants.find(m => m.id === device.assignedMerchant)?.businessName || "Unknown"
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {device.dispatchDate ? new Date(device.dispatchDate).toLocaleDateString() : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
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

export default KYMProcessManagement;