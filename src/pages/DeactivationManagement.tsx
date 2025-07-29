import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Power, AlertTriangle, Lock, Unlock, CreditCard, Plus, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SystemStatus {
  cardGeneration: boolean;
  topUpProcessing: boolean;
  totalSystemValue: number;
  systemLimit: number;
  lastDeactivation?: string;
  automaticMode: boolean;
}

interface Entity {
  id: string;
  name: string;
  totalValue: number;
  limit: number;
  cardGenerationEnabled: boolean;
  topUpEnabled: boolean;
  status: "active" | "suspended" | "limit_reached";
  lastActivity: string;
}

const DeactivationManagement = () => {
  const { toast } = useToast();
  const GLOBAL_LIMIT = 50000000; // 50M THB

  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cardGeneration: true,
    topUpProcessing: true,
    totalSystemValue: 47500000, // Close to limit for demo
    systemLimit: GLOBAL_LIMIT,
    automaticMode: true
  });

  const [entities, setEntities] = useState<Entity[]>([
    {
      id: "1",
      name: "Bangkok Coffee Co.",
      totalValue: 45000000,
      limit: 50000000,
      cardGenerationEnabled: true,
      topUpEnabled: true,
      status: "active",
      lastActivity: "2024-01-20T10:30:00"
    },
    {
      id: "2",
      name: "Phuket Beach Resort", 
      totalValue: 49500000, // Very close to limit
      limit: 50000000,
      cardGenerationEnabled: false,
      topUpEnabled: false,
      status: "limit_reached",
      lastActivity: "2024-01-20T09:15:00"
    },
    {
      id: "3",
      name: "Chiang Mai Handicrafts",
      totalValue: 25000000,
      limit: 50000000,
      cardGenerationEnabled: true,
      topUpEnabled: true,
      status: "active",
      lastActivity: "2024-01-19T16:45:00"
    }
  ]);

  const handleSystemToggle = (feature: "cardGeneration" | "topUpProcessing") => {
    setSystemStatus(prev => ({
      ...prev,
      [feature]: !prev[feature],
      lastDeactivation: !prev[feature] ? undefined : new Date().toISOString()
    }));

    toast({
      title: `${feature === "cardGeneration" ? "Card Generation" : "Top-Up Processing"} ${systemStatus[feature] ? "Disabled" : "Enabled"}`,
      description: `System-wide ${feature === "cardGeneration" ? "card generation" : "top-up processing"} has been ${systemStatus[feature] ? "disabled" : "enabled"}.`,
      variant: systemStatus[feature] ? "destructive" : "default"
    });
  };

  const handleEntityToggle = (entityId: string, feature: "cardGeneration" | "topUp") => {
    setEntities(entities.map(entity => {
      if (entity.id === entityId) {
        const updatedEntity = {
          ...entity,
          [feature === "cardGeneration" ? "cardGenerationEnabled" : "topUpEnabled"]: 
            !entity[feature === "cardGeneration" ? "cardGenerationEnabled" : "topUpEnabled"]
        };
        
        // Update status based on toggles
        if (!updatedEntity.cardGenerationEnabled && !updatedEntity.topUpEnabled) {
          updatedEntity.status = "suspended";
        } else if (entity.totalValue >= entity.limit * 0.99) {
          updatedEntity.status = "limit_reached";
        } else {
          updatedEntity.status = "active";
        }
        
        return updatedEntity;
      }
      return entity;
    }));

    const entity = entities.find(e => e.id === entityId);
    toast({
      title: `${feature === "cardGeneration" ? "Card Generation" : "Top-Up"} ${entity?.[feature === "cardGeneration" ? "cardGenerationEnabled" : "topUpEnabled"] ? "Disabled" : "Enabled"}`,
      description: `${feature === "cardGeneration" ? "Card generation" : "Top-up processing"} for ${entity?.name} has been toggled.`
    });
  };

  const handleEmergencyShutdown = () => {
    setSystemStatus(prev => ({
      ...prev,
      cardGeneration: false,
      topUpProcessing: false,
      lastDeactivation: new Date().toISOString()
    }));

    setEntities(entities.map(entity => ({
      ...entity,
      cardGenerationEnabled: false,
      topUpEnabled: false,
      status: "suspended" as const
    })));

    toast({
      title: "Emergency Shutdown Activated",
      description: "All card generation and top-up processing has been disabled system-wide.",
      variant: "destructive"
    });
  };

  const isSystemNearLimit = () => {
    return (systemStatus.totalSystemValue / systemStatus.systemLimit) >= 0.95;
  };

  const getEntityStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Active", variant: "default" as const, icon: Activity },
      suspended: { label: "Suspended", variant: "destructive" as const, icon: Lock },
      limit_reached: { label: "Limit Reached", variant: "secondary" as const, icon: AlertTriangle }
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

  const activeEntities = entities.filter(e => e.status === "active").length;
  const suspendedEntities = entities.filter(e => e.status === "suspended").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Deactivation on Full Balance</h1>
          <p className="text-muted-foreground">Automated system controls to prevent exceeding limits</p>
        </div>
        <Button 
          variant="destructive" 
          onClick={handleEmergencyShutdown}
          className="gap-2"
        >
          <Power className="h-4 w-4" />
          Emergency Shutdown
        </Button>
      </div>

      {/* Critical System Alert */}
      {isSystemNearLimit() && (
        <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Critical Alert:</strong> System is at {((systemStatus.totalSystemValue / systemStatus.systemLimit) * 100).toFixed(1)}% 
            of the ฿50M limit. Automatic deactivation may be triggered soon.
          </AlertDescription>
        </Alert>
      )}

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Power className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${systemStatus.cardGeneration && systemStatus.topUpProcessing ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {systemStatus.cardGeneration && systemStatus.topUpProcessing ? 'Operational' : 'Restricted'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {systemStatus.automaticMode ? 'Auto mode enabled' : 'Manual control'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ฿{systemStatus.totalSystemValue.toLocaleString()}
            </div>
            <Progress 
              value={(systemStatus.totalSystemValue / systemStatus.systemLimit) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {((systemStatus.totalSystemValue / systemStatus.systemLimit) * 100).toFixed(1)}% of limit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Entities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEntities}</div>
            <p className="text-xs text-muted-foreground">
              {suspendedEntities} suspended
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Capacity</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ฿{(systemStatus.systemLimit - systemStatus.totalSystemValue).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Available for new operations
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="system-controls" className="space-y-4">
        <TabsList>
          <TabsTrigger value="system-controls">System Controls</TabsTrigger>
          <TabsTrigger value="entity-management">Entity Management</TabsTrigger>
        </TabsList>

        <TabsContent value="system-controls">
          <Card>
            <CardHeader>
              <CardTitle>Global System Controls</CardTitle>
              <CardDescription>
                Control system-wide card generation and top-up processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Card Generation</Label>
                      <div className="text-sm text-muted-foreground">
                        Enable/disable new gift card generation system-wide
                      </div>
                    </div>
                    <Switch
                      checked={systemStatus.cardGeneration}
                      onCheckedChange={() => handleSystemToggle("cardGeneration")}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {systemStatus.cardGeneration ? (
                      <><Unlock className="h-4 w-4 text-green-600" /> Card generation is enabled</>
                    ) : (
                      <><Lock className="h-4 w-4 text-red-600" /> Card generation is disabled</>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Top-Up Processing</Label>
                      <div className="text-sm text-muted-foreground">
                        Enable/disable top-up transactions system-wide
                      </div>
                    </div>
                    <Switch
                      checked={systemStatus.topUpProcessing}
                      onCheckedChange={() => handleSystemToggle("topUpProcessing")}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {systemStatus.topUpProcessing ? (
                      <><Unlock className="h-4 w-4 text-green-600" /> Top-up processing is enabled</>
                    ) : (
                      <><Lock className="h-4 w-4 text-red-600" /> Top-up processing is disabled</>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Automatic Deactivation</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically disable operations when approaching limits
                    </div>
                  </div>
                  <Switch
                    checked={systemStatus.automaticMode}
                    onCheckedChange={(checked) => setSystemStatus(prev => ({ ...prev, automaticMode: checked }))}
                  />
                </div>
              </div>

              {systemStatus.lastDeactivation && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Last Deactivation:</strong> {new Date(systemStatus.lastDeactivation).toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entity-management">
          <Card>
            <CardHeader>
              <CardTitle>Entity-Level Controls</CardTitle>
              <CardDescription>
                Manage individual entity card generation and top-up capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity Name</TableHead>
                    <TableHead>Value / Limit</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Card Generation</TableHead>
                    <TableHead>Top-Up</TableHead>
                    <TableHead>Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entities.map((entity) => (
                    <TableRow key={entity.id}>
                      <TableCell className="font-medium">{entity.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>฿{entity.totalValue.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">
                            / ฿{entity.limit.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress 
                            value={(entity.totalValue / entity.limit) * 100} 
                            className="h-2"
                          />
                          <div className="text-xs text-muted-foreground">
                            {((entity.totalValue / entity.limit) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getEntityStatusBadge(entity.status)}</TableCell>
                      <TableCell>
                        <Switch
                          checked={entity.cardGenerationEnabled}
                          onCheckedChange={() => handleEntityToggle(entity.id, "cardGeneration")}
                          disabled={!systemStatus.cardGeneration}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={entity.topUpEnabled}
                          onCheckedChange={() => handleEntityToggle(entity.id, "topUp")}
                          disabled={!systemStatus.topUpProcessing}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(entity.lastActivity).toLocaleString()}
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

export default DeactivationManagement;