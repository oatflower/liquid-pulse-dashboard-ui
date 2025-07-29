import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, AlertTriangle, CheckCircle, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface IssuedCard {
  id: string;
  cardNumber: string;
  customerName: string;
  currentBalance: number;
  maxBalance: number;
  status: "active" | "inactive" | "locked";
  issueDate: string;
  lastTransaction: string;
}

interface ReceivableCheck {
  id: string;
  entityName: string;
  totalIssuedValue: number;
  receivableAmount: number;
  discrepancy: number;
  status: "verified" | "pending" | "discrepancy";
  lastCheck: string;
}

const MaxValueTracking = () => {
  const [issuedCards] = useState<IssuedCard[]>([
    {
      id: "1",
      cardNumber: "****1234",
      customerName: "สมชาย ใจดี",
      currentBalance: 15000,
      maxBalance: 20000,
      status: "active",
      issueDate: "2024-01-15",
      lastTransaction: "2024-01-20"
    },
    {
      id: "2",
      cardNumber: "****5678",
      customerName: "นิรัน สุวรรณประเสริฐ",
      currentBalance: 8500,
      maxBalance: 10000,
      status: "active",
      issueDate: "2024-01-10",
      lastTransaction: "2024-01-19"
    },
    {
      id: "3",
      cardNumber: "****9012",
      customerName: "พลอย ศิริวัฒน์",
      currentBalance: 0,
      maxBalance: 15000,
      status: "locked",
      issueDate: "2024-01-12",
      lastTransaction: "2024-01-18"
    }
  ]);

  const [receivableChecks] = useState<ReceivableCheck[]>([
    {
      id: "1",
      entityName: "Bangkok Coffee Co.",
      totalIssuedValue: 2500000,
      receivableAmount: 2500000,
      discrepancy: 0,
      status: "verified",
      lastCheck: "2024-01-20"
    },
    {
      id: "2",
      entityName: "Phuket Beach Resort",
      totalIssuedValue: 1800000,
      receivableAmount: 1750000,
      discrepancy: 50000,
      status: "discrepancy",
      lastCheck: "2024-01-19"
    },
    {
      id: "3",
      entityName: "Chiang Mai Handicrafts",
      totalIssuedValue: 950000,
      receivableAmount: 950000,
      discrepancy: 0,
      status: "verified",
      lastCheck: "2024-01-20"
    }
  ]);

  // Sample data for charts
  const chartData = [
    { date: "Jan 15", issuedValue: 4200000, receivableValue: 4150000 },
    { date: "Jan 16", issuedValue: 4350000, receivableValue: 4300000 },
    { date: "Jan 17", issuedValue: 4580000, receivableValue: 4520000 },
    { date: "Jan 18", issuedValue: 4890000, receivableValue: 4840000 },
    { date: "Jan 19", issuedValue: 5120000, receivableValue: 5050000 },
    { date: "Jan 20", issuedValue: 5250000, receivableValue: 5200000 }
  ];

  const totalIssuedValue = issuedCards.reduce((sum, card) => sum + card.currentBalance, 0);
  const totalMaxValue = issuedCards.reduce((sum, card) => sum + card.maxBalance, 0);
  const totalReceivableValue = receivableChecks.reduce((sum, check) => sum + check.receivableAmount, 0);
  const totalDiscrepancy = receivableChecks.reduce((sum, check) => sum + Math.abs(check.discrepancy), 0);

  const activeCards = issuedCards.filter(card => card.status === "active").length;
  const lockedCards = issuedCards.filter(card => card.status === "locked").length;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Active", variant: "default" as const, icon: CheckCircle },
      inactive: { label: "Inactive", variant: "secondary" as const, icon: Activity },
      locked: { label: "Locked", variant: "destructive" as const, icon: AlertTriangle },
      verified: { label: "Verified", variant: "default" as const, icon: CheckCircle },
      pending: { label: "Pending", variant: "secondary" as const, icon: Activity },
      discrepancy: { label: "Discrepancy", variant: "destructive" as const, icon: AlertTriangle }
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Max Value of Issued Cards & Receivable Check</h1>
        <p className="text-muted-foreground">Monitor total card values and verify receivable amounts</p>
      </div>

      {/* Critical Alerts */}
      {totalDiscrepancy > 0 && (
        <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Discrepancy Alert:</strong> Total discrepancy of ฿{totalDiscrepancy.toLocaleString()} 
            detected between issued card values and receivable amounts. Please review immediately.
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issued Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalIssuedValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {activeCards} active cards
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Potential Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalMaxValue.toLocaleString()}</div>
            <Progress value={(totalIssuedValue / totalMaxValue) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {((totalIssuedValue / totalMaxValue) * 100).toFixed(1)}% utilized
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receivable Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalReceivableValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Confirmed receivable
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Discrepancy</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalDiscrepancy > 0 ? 'text-red-600' : 'text-green-600'}`}>
              ฿{totalDiscrepancy.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalDiscrepancy === 0 ? "All verified" : "Requires attention"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Value Tracking Trend</CardTitle>
          <CardDescription>Comparison of issued vs receivable values over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `฿${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value: number) => [`฿${value.toLocaleString()}`, ""]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area type="monotone" dataKey="issuedValue" stackId="1" stroke="#8884d8" fill="#8884d8" opacity={0.6} name="Issued Value" />
              <Area type="monotone" dataKey="receivableValue" stackId="2" stroke="#82ca9d" fill="#82ca9d" opacity={0.6} name="Receivable Value" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Tabs defaultValue="issued-cards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="issued-cards">Issued Cards</TabsTrigger>
          <TabsTrigger value="receivable-checks">Receivable Checks</TabsTrigger>
        </TabsList>

        <TabsContent value="issued-cards">
          <Card>
            <CardHeader>
              <CardTitle>Issued Cards Value Tracking</CardTitle>
              <CardDescription>Monitor individual card balances and maximum values</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Card Number</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Current Balance</TableHead>
                    <TableHead>Max Balance</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Last Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issuedCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-mono">{card.cardNumber}</TableCell>
                      <TableCell className="font-medium">{card.customerName}</TableCell>
                      <TableCell>฿{card.currentBalance.toLocaleString()}</TableCell>
                      <TableCell>฿{card.maxBalance.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={(card.currentBalance / card.maxBalance) * 100} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {((card.currentBalance / card.maxBalance) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(card.status)}</TableCell>
                      <TableCell>{new Date(card.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(card.lastTransaction).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receivable-checks">
          <Card>
            <CardHeader>
              <CardTitle>Receivable Verification</CardTitle>
              <CardDescription>Verify that issued card values are backed by receivable funds</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity Name</TableHead>
                    <TableHead>Total Issued Value</TableHead>
                    <TableHead>Receivable Amount</TableHead>
                    <TableHead>Discrepancy</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receivableChecks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell className="font-medium">{check.entityName}</TableCell>
                      <TableCell>฿{check.totalIssuedValue.toLocaleString()}</TableCell>
                      <TableCell>฿{check.receivableAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={check.discrepancy === 0 ? "text-green-600" : "text-red-600"}>
                          {check.discrepancy === 0 ? "฿0" : `฿${Math.abs(check.discrepancy).toLocaleString()}`}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(check.status)}</TableCell>
                      <TableCell>{new Date(check.lastCheck).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="space-x-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                            Re-verify
                          </Badge>
                          {check.status === "discrepancy" && (
                            <Badge variant="destructive" className="cursor-pointer hover:bg-destructive/80">
                              Investigate
                            </Badge>
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

export default MaxValueTracking;