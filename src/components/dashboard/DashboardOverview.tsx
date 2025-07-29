
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, CreditCard, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function DashboardOverview() {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: t.dashboard.totalCardsIssued,
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-primary'
    },
    {
      title: t.dashboard.activeCards,
      value: '10,234',
      change: '+8.2%',
      trend: 'up', 
      icon: Users,
      color: 'text-success'
    },
    {
      title: t.dashboard.outstandingFloat,
      value: '฿2.4M',
      change: '+5.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-primary'
    },
    {
      title: t.dashboard.redemptionRate,
      value: '87.3%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-warning'
    }
  ];

  return (
    <div className="minimal-section">
      <div className="minimal-stats">
        {stats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-md transition-all duration-300 border-border/30 bg-card">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl ${stat.color} bg-current/10 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-success" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-destructive" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-light text-foreground tracking-tight">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
