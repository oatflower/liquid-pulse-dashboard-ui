
import React from 'react';
import { Search, Bell, User, Globe, SidebarTrigger } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-slate-700 hover:text-slate-900" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Search transactions, cards, merchants..." 
              className="pl-10 w-96 bg-white/20 backdrop-blur-sm border-white/30 text-slate-800 placeholder:text-slate-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
            <Globe className="w-4 h-4 mr-2" />
            ไทย / EN
          </Button>
          
          <Button variant="ghost" size="sm" className="relative text-slate-600 hover:text-slate-800">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
