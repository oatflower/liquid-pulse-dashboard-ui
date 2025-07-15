
import React from 'react';
import { Search, Bell, User, Globe } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-slate-300 hover:text-slate-100" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search transactions, cards, merchants..." 
              className="pl-10 w-96 bg-slate-800/50 backdrop-blur-sm border-slate-700 text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/50">
            <Globe className="w-4 h-4 mr-2" />
            ไทย / EN
          </Button>
          
          <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-slate-100 hover:bg-slate-800/50">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-slate-100 hover:bg-slate-800/50">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
