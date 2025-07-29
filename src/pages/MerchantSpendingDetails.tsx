import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Filter, Search, Calendar, Store, TrendingUp, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Extended mock data for merchant spending details
const merchantSpendingData = [
  { id: 1, name: 'Central Department Store', category: 'Department Store', amount: 1250000, transactions: 2847, growth: '+12%', region: 'Bangkok', lastTransaction: '2024-01-20' },
  { id: 2, name: 'Big C Supercenter', category: 'Supermarket', amount: 890000, transactions: 3156, growth: '+8%', region: 'Bangkok', lastTransaction: '2024-01-20' },
  { id: 3, name: 'Lotus Supermarket', category: 'Supermarket', amount: 650000, transactions: 2134, growth: '+15%', region: 'Central', lastTransaction: '2024-01-19' },
  { id: 4, name: 'Villa Market', category: 'Premium Grocery', amount: 420000, transactions: 1678, growth: '+3%', region: 'Bangkok', lastTransaction: '2024-01-20' },
  { id: 5, name: 'Tops Supermarket', category: 'Supermarket', amount: 380000, transactions: 1834, growth: '+5%', region: 'Central', lastTransaction: '2024-01-19' },
  { id: 6, name: 'Robinson Department Store', category: 'Department Store', amount: 320000, transactions: 1245, growth: '+2%', region: 'Northeast', lastTransaction: '2024-01-18' },
  { id: 7, name: 'MaxValu', category: 'Supermarket', amount: 250000, transactions: 1567, growth: '+7%', region: 'South', lastTransaction: '2024-01-19' },
  { id: 8, name: 'Gourmet Market', category: 'Premium Grocery', amount: 180000, transactions: 892, growth: '+10%', region: 'Bangkok', lastTransaction: '2024-01-20' },
  { id: 9, name: 'Foodland', category: 'Grocery', amount: 120000, transactions: 734, growth: '+1%', region: 'Central', lastTransaction: '2024-01-18' },
  { id: 10, name: 'Makro Cash & Carry', category: 'Wholesale', amount: 95000, transactions: 456, growth: '+6%', region: 'Bangkok', lastTransaction: '2024-01-17' },
  { id: 11, name: 'HomePro', category: 'Home Improvement', amount: 85000, transactions: 523, growth: '+4%', region: 'Central', lastTransaction: '2024-01-19' },
  { id: 12, name: 'Index Living Mall', category: 'Furniture', amount: 78000, transactions: 345, growth: '+8%', region: 'Bangkok', lastTransaction: '2024-01-18' },
  { id: 13, name: 'Major Cineplex', category: 'Entertainment', amount: 65000, transactions: 1234, growth: '+15%', region: 'Bangkok', lastTransaction: '2024-01-20' },
  { id: 14, name: 'SF Cinema City', category: 'Entertainment', amount: 52000, transactions: 987, growth: '+9%', region: 'Central', lastTransaction: '2024-01-19' },
  { id: 15, name: 'Watsons', category: 'Pharmacy', amount: 48000, transactions: 1456, growth: '+11%', region: 'Bangkok', lastTransaction: '2024-01-20' },
  { id: 16, name: 'Boots', category: 'Pharmacy', amount: 42000, transactions: 876, growth: '+7%', region: 'Central', lastTransaction: '2024-01-18' },
  { id: 17, name: 'True Coffee', category: 'Cafe', amount: 38000, transactions: 2134, growth: '+13%', region: 'Bangkok', lastTransaction: '2024-01-20' },
  { id: 18, name: 'Starbucks', category: 'Cafe', amount: 35000, transactions: 1876, growth: '+5%', region: 'Bangkok', lastTransaction: '2024-01-19' },
  { id: 19, name: 'KFC', category: 'Fast Food', amount: 32000, transactions: 2456, growth: '+8%', region: 'Northeast', lastTransaction: '2024-01-18' },
  { id: 20, name: 'McDonald\'s', category: 'Fast Food', amount: 29000, transactions: 2234, growth: '+6%', region: 'Central', lastTransaction: '2024-01-19' },
];

export function MerchantSpendingDetails() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('amount');

  // Get unique categories and regions for filters
  const categories = ['all', ...Array.from(new Set(merchantSpendingData.map(item => item.category)))];
  const regions = ['all', ...Array.from(new Set(merchantSpendingData.map(item => item.region)))];

  // Filter and sort data
  const filteredData = merchantSpendingData
    .filter(merchant => {
      const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || merchant.category === selectedCategory;
      const matchesRegion = selectedRegion === 'all' || merchant.region === selectedRegion;
      return matchesSearch && matchesCategory && matchesRegion;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'transactions':
          return b.transactions - a.transactions;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      'Merchant Name,Category,Amount,Transactions,Growth,Region,Last Transaction',
      ...filteredData.map(merchant => 
        `${merchant.name},${merchant.category},${merchant.amount},${merchant.transactions},${merchant.growth},${merchant.region},${merchant.lastTransaction}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merchant-spending-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="bg-card"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Merchant Spending Details</h1>
              <p className="text-slate-600">Complete analysis of merchant transactions and spending patterns</p>
            </div>
          </div>
          
          <Button 
            onClick={handleExport}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Merchants</p>
                  <p className="text-2xl font-bold text-foreground">{filteredData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-foreground">฿{filteredData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold text-foreground">{filteredData.reduce((sum, item) => sum + item.transactions, 0).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Growth</p>
                  <p className="text-2xl font-bold text-emerald-600">+7.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Search merchants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedRegion('all');
                  setSortBy('amount');
                }}
                className="bg-background"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Merchant Spending Details ({filteredData.length} merchants)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 font-medium text-slate-700">Rank</th>
                    <th className="text-left p-3 font-medium text-slate-700">Merchant</th>
                    <th className="text-left p-3 font-medium text-slate-700">Category</th>
                    <th className="text-left p-3 font-medium text-slate-700">Region</th>
                    <th className="text-right p-3 font-medium text-slate-700">Amount</th>
                    <th className="text-right p-3 font-medium text-slate-700">Transactions</th>
                    <th className="text-right p-3 font-medium text-slate-700">Growth</th>
                    <th className="text-center p-3 font-medium text-slate-700">Last Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((merchant, index) => (
                    <tr key={merchant.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                      <td className="p-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                          index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                          index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700' :
                          'bg-gradient-to-br from-blue-500 to-purple-600'
                        }`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-foreground">{merchant.name}</div>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {merchant.category}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="border-purple-200 text-purple-700">
                          {merchant.region}
                        </Badge>
                      </td>
                      <td className="p-3 text-right font-medium text-foreground">
                        ฿{merchant.amount.toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-muted-foreground">
                        {merchant.transactions.toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        <span className={`font-medium ${
                          merchant.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          {merchant.growth}
                        </span>
                      </td>
                      <td className="p-3 text-center text-muted-foreground">
                        {merchant.lastTransaction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}