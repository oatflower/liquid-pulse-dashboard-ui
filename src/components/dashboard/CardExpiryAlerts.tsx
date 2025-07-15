
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Calendar, DollarSign } from 'lucide-react';

const expiryData = [
  { period: '30 Days', count: 1247, amount: 2847293, color: 'from-red-500 to-red-600' },
  { period: '60 Days', count: 892, amount: 1925847, color: 'from-orange-500 to-orange-600' },
  { period: '90 Days', count: 634, amount: 1283492, color: 'from-yellow-500 to-yellow-600' },
];

const nearExpiryCards = [
  { cardId: 'GC-2024-001847', balance: 2450, daysLeft: 12, merchant: 'Central' },
  { cardId: 'GC-2024-001923', balance: 1850, daysLeft: 8, merchant: 'Big C' },
  { cardId: 'GC-2024-002104', balance: 3200, daysLeft: 15, merchant: 'Lotus' },
  { cardId: 'GC-2024-002287', balance: 950, daysLeft: 5, merchant: 'Villa' },
  { cardId: 'GC-2024-002431', balance: 1650, daysLeft: 18, merchant: 'Tops' },
];

export function CardExpiryAlerts() {
  return (
    <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Card Expiry Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Expiry Overview */}
          <div className="grid grid-cols-3 gap-4">
            {expiryData.map((data, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center mb-2`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-slate-600">{data.period}</div>
                <div className="text-lg font-bold text-slate-800">{data.count}</div>
                <div className="text-xs text-slate-500">฿{data.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
          
          {/* Near Expiry Cards List */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Critical Expiry (Next 30 Days)
            </h4>
            
            {nearExpiryCards.map((card, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                    card.daysLeft <= 7 ? 'bg-gradient-to-br from-red-500 to-red-600' :
                    card.daysLeft <= 14 ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                    'bg-gradient-to-br from-yellow-500 to-yellow-600'
                  }`}>
                    {card.daysLeft}d
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{card.cardId}</div>
                    <div className="text-sm text-slate-500">{card.merchant}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-800">฿{card.balance.toLocaleString()}</div>
                  <div className={`text-xs ${
                    card.daysLeft <= 7 ? 'text-red-600' :
                    card.daysLeft <= 14 ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {card.daysLeft} days left
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
