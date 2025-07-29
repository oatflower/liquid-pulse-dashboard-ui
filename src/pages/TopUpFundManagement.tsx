import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, DollarSign, AlertTriangle, Lock, Unlock, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TopUpTransaction {
  id: string;
  customerName: string;
  amount: number;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  cardNumber: string;
}

interface AccountLimit {
  entityId: string;
  entityName: string;
  totalTopUpAmount: number;
  limit: number;
  isDeactivated: boolean;
  lastTopUpDate: string;
}

const TopUpFundManagement = () => {
  const { toast } = useToast();
  const [transactions] = useState<TopUpTransaction[]>([
    {
      id: "1",
      customerName: "สมชาย ใจดี",
      amount: 5000,
      timestamp: "2024-01-20T10:30:00",
      status: "completed",
      cardNumber: "****1234"
    },
    {
      id: "2", 
      customerName: "นิรัน สุวรรณประเสริฐ",
      amount: 15000,
      timestamp: "2024-01-20T09:15:00",
      status: "completed",
      cardNumber: "****5678"
    },
    {
      id: "3",
      customerName: "พลอย ศิริวัฒน์",
      amount: 2500,
      timestamp: "2024-01-20T08:45:00",
      status: "pending",
      cardNumber: "****9012"
    }
  ]);

  const [accountLimits, setAccountLimits] = useState<AccountLimit[]>([
    {
      entityId: "1",
      entityName: "Bangkok Coffee Co.",
      totalTopUpAmount: 45000000,
      limit: 50000000,
      isDeactivated: false,
      lastTopUpDate: "2024-01-20"
    },
    {
      entityId: "2", 
      entityName: "Phuket Beach Resort",
      totalTopUpAmount: 48500000,
      limit: 50000000,
      isDeactivated: true,
      lastTopUpDate: "2024-01-19"
    },
    {
      entityId: "3",
      entityName: "Chiang Mai Handicrafts",
      totalTopUpAmount: 25000000,
      limit: 50000000,
      isDeactivated: false,
      lastTopUpDate: "2024-01-18"
    }
  ]);

  const [bufferPercentage, setBufferPercentage] = useState(90);
  const SYSTEM_LIMIT = 50000000;

  const handleToggleDeactivation = (entityId: string) => {
    setAccountLimits(accountLimits.map(account => 
      account.entityId === entityId 
        ? { ...account, isDeactivated: !account.isDeactivated }
        : account
    ));

    const account = accountLimits.find(a => a.entityId === entityId);
    toast({
      title: account?.isDeactivated ? "Account Reactivated" : "Account Deactivated",
      description: `Top-ups ${account?.isDeactivated ? "enabled" : "disabled"} for ${account?.entityName}`
    });
  };

  const getTotalSystemValue = () => {
    return accountLimits.reduce((sum, account) => sum + account.totalTopUpAmount, 0);
  };

  const getBufferThreshold = () => {
    return (bufferPercentage / 100) * SYSTEM_LIMIT;
  };

  const isNearLimit = (amount: number, limit: number) => {
    return (amount / limit) >= (bufferPercentage / 100);
  };

  const todayTransactions = transactions.filter(t => 
    new Date(t.timestamp).toDateString() === new Date().toDateString()
  );

  const totalTodayAmount = todayTransactions.reduce((sum, t) => sum + t.amount, 0);

  // Auto-deactivation check
  useEffect(() => {
    accountLimits.forEach(account => {
      if (isNearLimit(account.totalTopUpAmount, account.limit) && !account.isDeactivated) {
        // Auto-deactivate when buffer is reached
        setAccountLimits(prev => prev.map(a => 
          a.entityId === account.entityId 
            ? { ...a, isDeactivated: true }
            : a
        ));
      }
    });
  }, [accountLimits, bufferPercentage]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Top-Up & Fund Management</h1>
        <p className="text-muted-foreground">Monitor transactions and manage fund limits</p>
      </div>

      {/* Critical Alerts */}
      {accountLimits.some(a => isNearLimit(a.totalTopUpAmount, a.limit)) && (
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <strong>Warning:</strong> Some accounts are approaching the 50M THB limit. 
            Automatic deactivation has been triggered for accounts exceeding the buffer threshold.
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTransactions.length}</div>
            <p className="text-xs text-muted-foreground">
              ฿{totalTodayAmount.toLocaleString()} total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ฿{getTotalSystemValue().toLocaleString()}
            </div>
            <Progress 
              value={(getTotalSystemValue() / SYSTEM_LIMIT) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {((getTotalSystemValue() / SYSTEM_LIMIT) * 100).toFixed(1)}% of 50M limit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buffer Threshold</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ฿{getBufferThreshold().toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {bufferPercentage}% of system limit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deactivated Accounts</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accountLimits.filter(a => a.isDeactivated).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {accountLimits.length} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Buffer Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Buffer Configuration</CardTitle>
          <CardDescription>
            Set the buffer percentage for automatic deactivation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="buffer">Buffer Percentage:</Label>
            <Input
              id="buffer"
              type="number"
              value={bufferPercentage}
              onChange={(e) => setBufferPercentage(Number(e.target.value))}
              className="w-20"
              min="1"
              max="100"
            />
            <span className="text-sm text-muted-foreground">%</span>
            <span className="text-sm text-muted-foreground">
              (฿{getBufferThreshold().toLocaleString()})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Accounts will be automatically deactivated when they reach {bufferPercentage}% 
            of the 50 million THB limit.
          </p>
        </CardContent>
      </Card>

      {/* Account Limits Management */}
      <Card>
        <CardHeader>
          <CardTitle>Account Limit Management</CardTitle>
          <CardDescription>
            Monitor and control individual account limits and deactivation status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity Name</TableHead>
                <TableHead>Current Amount</TableHead>
                <TableHead>Limit</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Top-Up</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountLimits.map((account) => (
                <TableRow key={account.entityId}>
                  <TableCell className="font-medium">{account.entityName}</TableCell>
                  <TableCell>฿{account.totalTopUpAmount.toLocaleString()}</TableCell>
                  <TableCell>฿{account.limit.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress 
                        value={(account.totalTopUpAmount / account.limit) * 100} 
                        className={`h-2 ${isNearLimit(account.totalTopUpAmount, account.limit) ? 'bg-red-100' : ''}`}
                      />
                      <div className="text-xs text-muted-foreground">
                        {((account.totalTopUpAmount / account.limit) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {account.isDeactivated ? (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Deactivated
                        </Badge>
                      ) : isNearLimit(account.totalTopUpAmount, account.limit) ? (
                        <Badge variant="outline" className="flex items-center gap-1 border-orange-500 text-orange-600">
                          <AlertTriangle className="h-3 w-3" />
                          Near Limit
                        </Badge>
                      ) : (
                        <Badge variant="default" className="flex items-center gap-1">
                          <Unlock className="h-3 w-3" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(account.lastTopUpDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={!account.isDeactivated}
                        onCheckedChange={() => handleToggleDeactivation(account.entityId)}
                      />
                      <Label className="text-xs">
                        {account.isDeactivated ? "Activate" : "Deactivate"}
                      </Label>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Top-Up Transactions</CardTitle>
          <CardDescription>Real-time monitoring of top-up activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Card Number</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.customerName}</TableCell>
                  <TableCell>฿{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell className="font-mono">{transaction.cardNumber}</TableCell>
                  <TableCell>{new Date(transaction.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        transaction.status === "completed" ? "default" :
                        transaction.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {transaction.status.toUpperCase()}
                    </Badge>
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

export default TopUpFundManagement;