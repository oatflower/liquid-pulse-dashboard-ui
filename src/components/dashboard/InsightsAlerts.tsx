
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, AlertCircle, Map, Activity } from 'lucide-react';

const insights = [
  {
    type: 'anomaly',
    title: 'Unusual Top-Up Activity',
    description: 'Central Department Store showing 340% increase in gift card top-ups',
    timestamp: '2 hours ago',
    severity: 'high',
    icon: AlertCircle,
    color: 'from-red-500 to-red-600'
  },
  {
    type: 'trend',
    title: 'Spending Pattern Change',
    description: 'Gen Z customers shifting from physical to digital gift cards (↑42%)',
    timestamp: '4 hours ago',
    severity: 'medium',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600'
  },
  {
    type: 'location',
    title: 'Regional Usage Spike',
    description: 'Bangkok metropolitan area showing highest redemption rates',
    timestamp: '6 hours ago',
    severity: 'low',
    icon: Map,
    color: 'from-green-500 to-green-600'
  },
  {
    type: 'system',
    title: 'High Transaction Volume',
    description: 'Processing 15% above normal capacity during peak hours',
    timestamp: '8 hours ago',
    severity: 'medium',
    icon: Activity,
    color: 'from-purple-500 to-purple-600'
  },
];

const usageStats = [
  { region: 'Bangkok', usage: 85, color: 'from-blue-500 to-blue-600' },
  { region: 'Phuket', usage: 72, color: 'from-emerald-500 to-emerald-600' },
  { region: 'Chiang Mai', usage: 68, color: 'from-purple-500 to-purple-600' },
  { region: 'Pattaya', usage: 61, color: 'from-orange-500 to-orange-600' },
];

export function InsightsAlerts() {
  return (
    <Card className="bg-white/20 backdrop-blur-xl border-white/30 hover:bg-white/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Insights & Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Anomaly Detection Feed */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800">Anomaly Detection</h4>
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/20 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${insight.color} flex items-center justify-center mt-1`}>
                  <insight.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-slate-800">{insight.title}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      insight.severity === 'high' ? 'bg-red-100 text-red-700' :
                      insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {insight.severity}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 mb-1">{insight.description}</div>
                  <div className="text-xs text-slate-500">{insight.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Usage Heatmap */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800 flex items-center gap-2">
              <Map className="w-4 h-4" />
              Regional Usage Heatmap
            </h4>
            {usageStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${stat.color}`} />
                  <span className="text-sm font-medium text-slate-800">{stat.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                      style={{ width: `${stat.usage}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-600 w-8 text-right">{stat.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
