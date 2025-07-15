
import React from 'react';
import { Search, Bell, User, Globe, Settings } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DashboardHeader() {
  return (
    <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <SidebarTrigger className="hover:bg-muted/50 rounded-lg p-2 transition-colors" />
          <div className="h-8 w-px bg-border/30" />
          <div className="space-y-1">
            <h1 className="text-3xl font-light text-foreground tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, manage your gift card system</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search..." 
              className="pl-10 w-80 bg-muted/30 border-border/30 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="h-6 w-px bg-border/30" />
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Globe className="w-4 h-4 mr-2" />
            ไทย / EN
          </Button>
          <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
