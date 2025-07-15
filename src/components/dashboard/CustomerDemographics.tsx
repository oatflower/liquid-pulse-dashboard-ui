
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp } from 'lucide-react';

const demographicData = [
  { 
    generation: 'Gen Z (1997-2012)', 
    percentage: 35, 
    topupTier: 'High',
    avgTopup: '฿2,450',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    generation: 'Gen Y (1981-1996)', 
    percentage: 28, 
    topupTier: 'Medium',
    avgTopup: '฿1,850',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    generation: 'Gen X (1965-1980)', 
    percentage: 22, 
    topupTier: 'High',
    avgTopup: '฿3,200',
    color: 'from-emerald-500 to-green-500'
  },
  { 
    generation: 'Baby Boomers (1946-1964)', 
    percentage: 12, 
    topupTier: 'Medium',
    avgTopup: '฿1,650',
    color: 'from-orange-500 to-red-500'
  },
  { 
    generation: 'Gen Alpha (2013+)', 
    percentage: 3, 
    topupTier: 'Low',
    avgTopup: '฿450',
    color: 'from-gray-500 to-slate-600'
  },
];

export function CustomerDemographics() {
  return (
    <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Customer Demographics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {demographicData.map((demo, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${demo.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-bold text-sm">{demo.percentage}%</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{demo.generation}</div>
                    <div className="text-sm text-slate-500">Avg Top-up: {demo.avgTopup}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    demo.topupTier === 'High' ? 'bg-emerald-100 text-emerald-700' :
                    demo.topupTier === 'Medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {demo.topupTier} Tier
                  </span>
                </div>
              </div>
              
              {/* Radial progress bar */}
              <div className="relative w-full h-6 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${demo.color} transition-all duration-700 ease-out`}
                  style={{ width: `${demo.percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-700">{demo.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
