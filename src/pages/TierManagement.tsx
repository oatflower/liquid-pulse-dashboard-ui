import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Users, Award, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tier {
  id: string;
  name: string;
  purchaseAmount: number;
  topUpAmount: number;
  benefits: string[];
  customerCount: number;
  color: string;
}

const TierManagement = () => {
  const { toast } = useToast();
  const [tiers, setTiers] = useState<Tier[]>([
    {
      id: "1",
      name: "Bronze",
      purchaseAmount: 0,
      topUpAmount: 0,
      benefits: ["Basic support", "Standard processing"],
      customerCount: 1250,
      color: "bg-amber-600"
    },
    {
      id: "2",
      name: "Silver",
      purchaseAmount: 10000,
      topUpAmount: 5000,
      benefits: ["Priority support", "5% bonus points", "Extended warranty"],
      customerCount: 850,
      color: "bg-gray-400"
    },
    {
      id: "3",
      name: "Gold",
      purchaseAmount: 50000,
      topUpAmount: 25000,
      benefits: ["Premium support", "10% bonus points", "Airport lounge access", "Free shipping"],
      customerCount: 320,
      color: "bg-yellow-500"
    },
    {
      id: "4",
      name: "Platinum",
      purchaseAmount: 100000,
      topUpAmount: 50000,
      benefits: ["VIP support", "15% bonus points", "Premium lounge access", "Personal concierge", "Early access to sales"],
      customerCount: 85,
      color: "bg-purple-600"
    }
  ]);

  const [newTier, setNewTier] = useState({
    name: "",
    purchaseAmount: "",
    topUpAmount: "",
    benefits: ""
  });

  const handleCreateTier = () => {
    if (!newTier.name || !newTier.purchaseAmount || !newTier.topUpAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const tier: Tier = {
      id: Date.now().toString(),
      name: newTier.name,
      purchaseAmount: parseFloat(newTier.purchaseAmount),
      topUpAmount: parseFloat(newTier.topUpAmount),
      benefits: newTier.benefits.split(',').map(b => b.trim()).filter(b => b),
      customerCount: 0,
      color: "bg-blue-500"
    };

    setTiers([...tiers, tier]);
    setNewTier({ name: "", purchaseAmount: "", topUpAmount: "", benefits: "" });
    
    toast({
      title: "Success",
      description: "New tier created successfully"
    });
  };

  const totalCustomers = tiers.reduce((sum, tier) => sum + tier.customerCount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tier Management System</h1>
          <p className="text-muted-foreground">Manage customer tiers, criteria, and benefits</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Tier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Tier</DialogTitle>
              <DialogDescription>
                Define tier criteria and benefits for customer segmentation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tier Name
                </Label>
                <Input
                  id="name"
                  value={newTier.name}
                  onChange={(e) => setNewTier({...newTier, name: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g., Diamond"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purchase" className="text-right">
                  Purchase Amount (THB)
                </Label>
                <Input
                  id="purchase"
                  type="number"
                  value={newTier.purchaseAmount}
                  onChange={(e) => setNewTier({...newTier, purchaseAmount: e.target.value})}
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topup" className="text-right">
                  Top-up Amount (THB)
                </Label>
                <Input
                  id="topup"
                  type="number"
                  value={newTier.topUpAmount}
                  onChange={(e) => setNewTier({...newTier, topUpAmount: e.target.value})}
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="benefits" className="text-right">
                  Benefits
                </Label>
                <Textarea
                  id="benefits"
                  value={newTier.benefits}
                  onChange={(e) => setNewTier({...newTier, benefits: e.target.value})}
                  className="col-span-3"
                  placeholder="Comma-separated benefits"
                />
              </div>
            </div>
            <Button onClick={handleCreateTier}>Create Tier</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tier Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tiers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tiers.length}</div>
            <p className="text-xs text-muted-foreground">Active tier levels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all tiers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Customers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tiers.filter(t => t.purchaseAmount >= 50000).reduce((sum, tier) => sum + tier.customerCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Gold tier and above</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upgrade Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">Monthly tier upgrades</p>
          </CardContent>
        </Card>
      </div>

      {/* Tier Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tier Configuration</CardTitle>
          <CardDescription>
            Manage tier definitions, criteria, and benefits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tier Name</TableHead>
                <TableHead>Purchase Requirement</TableHead>
                <TableHead>Top-up Requirement</TableHead>
                <TableHead>Customer Count</TableHead>
                <TableHead>Benefits</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers.map((tier) => (
                <TableRow key={tier.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                      <span className="font-medium">{tier.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>฿{tier.purchaseAmount.toLocaleString()}</TableCell>
                  <TableCell>฿{tier.topUpAmount.toLocaleString()}</TableCell>
                  <TableCell>{tier.customerCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tier.benefits.slice(0, 2).map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                      {tier.benefits.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{tier.benefits.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TierManagement;