
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, RefreshCw, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const transactions = [
  {
    id: 'TXN-2024-001847',
    type: 'redemption',
    amount: 450,
    merchant: 'Central Department Store',
    cardId: 'GC-2024-001923',
    timestamp: '2024-01-15 14:23:45',
    status: 'completed',
    balance: 1550
  },
  {
    id: 'TXN-2024-001846',
    type: 'topup',
    amount: 2000,
    merchant: 'Corporate Portal',
    cardId: 'GC-2024-001922',
    timestamp: '2024-01-15 14:18:32',
    status: 'completed',
    balance: 2000
  },
  {
    id: 'TXN-2024-001845',
    type: 'redemption',
    amount: 1200,
    merchant: 'Big C Supercenter',
    cardId: 'GC-2024-001921',
    timestamp: '2024-01-15 14:15:21',
    status: 'completed',
    balance: 800
  },
  {
    id: 'TXN-2024-001844',
    type: 'partial_redemption',
    amount: 350,
    merchant: 'Lotus Supermarket',
    cardId: 'GC-2024-001920',
    timestamp: '2024-01-15 14:12:15',
    status: 'completed',
    balance: 1650
  },
  {
    id: 'TXN-2024-001843',
    type: 'refund',
    amount: 750,
    merchant: 'Villa Market',
    cardId: 'GC-2024-001919',
    timestamp: '2024-01-15 14:08:42',
    status: 'pending',
    balance: 2750
  },
];

export function TransactionFeed() {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          {t.transactions.title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder={t.transactions.search}
              className="pl-10 w-64 bg-white/30 backdrop-blur-sm border-white/40 text-slate-800 placeholder:text-slate-500"
            />
          </div>
          <Button variant="outline" size="sm" className="bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40">
            <Filter className="w-4 h-4 mr-2" />
            {t.transactions.filter}
          </Button>
          <Button variant="outline" size="sm" className="bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/20 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  transaction.type === 'redemption' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                  transaction.type === 'topup' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                  transaction.type === 'partial_redemption' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                  'bg-gradient-to-br from-blue-500 to-blue-600'
                }`}>
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-800">{transaction.id}</div>
                  <div className="text-sm text-slate-600">{transaction.merchant}</div>
                  <div className="text-xs text-slate-500">{transaction.timestamp}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-slate-600">{t.transactions.cardId}</div>
                  <div className="font-medium text-slate-800">{transaction.cardId}</div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    transaction.type === 'redemption' || transaction.type === 'partial_redemption' 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {transaction.type === 'redemption' || transaction.type === 'partial_redemption' ? '-' : '+'}
                    ฿{transaction.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500">{t.transactions.balance}: ฿{transaction.balance.toLocaleString()}</div>
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {transaction.status === 'completed' ? t.transactions.completed : t.transactions.pending}
                  </span>
                  <div className="text-xs text-slate-500 mt-1 capitalize">
                    {transaction.type === 'redemption' ? t.transactions.redemption :
                     transaction.type === 'topup' ? t.transactions.topup :
                     transaction.type === 'partial_redemption' ? t.transactions.partialRedemption :
                     t.transactions.refund}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
