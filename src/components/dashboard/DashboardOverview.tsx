
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

export function DashboardOverview() {
  const stats = [
    {
      title: 'Issued Gift Cards',
      value: '125,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Redeemed Value',
      value: '฿8,247,503',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-emerald-500 to-green-500'
    },
    {
      title: 'Outstanding Float',
      value: '฿2,847,295',
      change: '-2.1%',
      changeType: 'negative',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Breakage Rate',
      value: '3.2%',
      change: '+0.3%',
      changeType: 'neutral',
      icon: AlertCircle,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="group relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border-slate-800 hover:bg-slate-800/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100 mb-1">{stat.value}</div>
            <div className={`text-sm flex items-center gap-1 ${
              stat.changeType === 'positive' ? 'text-emerald-400' : 
              stat.changeType === 'negative' ? 'text-red-400' : 'text-slate-400'
            }`}>
              <span>{stat.change}</span>
              <span className="text-xs text-slate-500">from last month</span>
            </div>
          </CardContent>
          
          {/* Subtle gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        </Card>
      ))}
    </div>
  );
}
