
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const merchantData = [
  { name: 'Central Department Store', amount: 1250000, percentage: 28.5, growth: '+12%' },
  { name: 'Big C Supercenter', amount: 890000, percentage: 20.2, growth: '+8%' },
  { name: 'Lotus Supermarket', amount: 650000, percentage: 14.8, growth: '+15%' },
  { name: 'Villa Market', amount: 420000, percentage: 9.6, growth: '+3%' },
  { name: 'Tops Supermarket', amount: 380000, percentage: 8.7, growth: '+5%' },
  { name: 'Robinson Department Store', amount: 320000, percentage: 7.3, growth: '+2%' },
  { name: 'MaxValu', amount: 250000, percentage: 5.7, growth: '+7%' },
  { name: 'Gourmet Market', amount: 180000, percentage: 4.1, growth: '+10%' },
  { name: 'Foodland', amount: 120000, percentage: 2.7, growth: '+1%' },
  { name: 'Other Merchants', amount: 90000, percentage: 2.1, growth: '+4%' },
];

export function MerchantSpending() {
  return (
    <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Store className="w-5 h-5" />
          Top Merchant Spending
        </CardTitle>
        <Button variant="outline" size="sm" className="bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {merchantData.map((merchant, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700' :
                    'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{merchant.name}</div>
                    <div className="text-sm text-slate-500">฿{merchant.amount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-700">{merchant.percentage}%</div>
                  <div className={`text-xs ${
                    merchant.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {merchant.growth}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 group-hover:from-blue-600 group-hover:to-purple-700"
                  style={{ width: `${merchant.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
