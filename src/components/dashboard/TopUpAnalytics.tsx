
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Smartphone, Store, Globe } from 'lucide-react';

const trendData = [
  { month: 'Jan', issued: 4000, redeemed: 2400 },
  { month: 'Feb', issued: 3000, redeemed: 1398 },
  { month: 'Mar', issued: 5000, redeemed: 3800 },
  { month: 'Apr', issued: 4780, redeemed: 3908 },
  { month: 'May', issued: 5890, redeemed: 4800 },
  { month: 'Jun', issued: 6390, redeemed: 5300 },
];

const channelData = [
  { name: 'Corporate Portal', value: 45, color: '#3B82F6' },
  { name: 'Retail POS', value: 35, color: '#8B5CF6' },
  { name: 'Online', value: 20, color: '#10B981' },
];

export function TopUpAnalytics() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card className="xl:col-span-2 bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Issuance vs Redemption Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              issued: { label: 'Issued', color: '#3B82F6' },
              redeemed: { label: 'Redeemed', color: '#10B981' }
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <defs>
                  <linearGradient id="issuedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="redeemedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" className="text-slate-600" />
                <YAxis className="text-slate-600" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="issued" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fill="url(#issuedGradient)"
                  dot={{ r: 6, fill: '#3B82F6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="redeemed" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fill="url(#redeemedGradient)"
                  dot={{ r: 6, fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Channel Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              corporate: { label: 'Corporate Portal', color: '#3B82F6' },
              retail: { label: 'Retail POS', color: '#8B5CF6' },
              online: { label: 'Online', color: '#10B981' }
            }}
            className="h-48"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <div className="mt-4 space-y-2">
            {channelData.map((channel, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                  <span className="text-sm text-slate-700">{channel.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-800">{channel.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
