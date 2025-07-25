import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, DollarSign, Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface MerchantScheduleConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScheduleConfig {
  id: string;
  merchant: string;
  cycle: string;
  amount: number;
  status: string;
  nextDate: string;
  bankAccount: string;
}

export default function MerchantScheduleConfigModal({ isOpen, onClose }: MerchantScheduleConfigModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [schedules, setSchedules] = useState<ScheduleConfig[]>([
    { id: '1', merchant: 'Starbucks', cycle: 'Daily', amount: 12500, status: 'Scheduled', nextDate: '2024-01-16', bankAccount: '****1234' },
    { id: '2', merchant: 'Amazon', cycle: 'Weekly', amount: 45000, status: 'Scheduled', nextDate: '2024-01-18', bankAccount: '****5678' },
    { id: '3', merchant: 'Target', cycle: 'Bi-weekly', amount: 28000, status: 'Processing', nextDate: '2024-01-20', bankAccount: '****9012' },
  ]);

  const handleSaveSchedule = (scheduleId: string, newCycle: string, newAmount: string) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, cycle: newCycle, amount: parseInt(newAmount) || schedule.amount }
        : schedule
    ));
    toast({
      title: "Schedule Updated",
      description: "Settlement schedule has been updated successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Configure Settlement Schedules
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {schedules.map((schedule) => (
              <Card key={schedule.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{schedule.merchant}</CardTitle>
                    <Badge className={getStatusColor(schedule.status)}>
                      {schedule.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Settlement Cycle</label>
                      <Select defaultValue={schedule.cycle} onValueChange={(value) => handleSaveSchedule(schedule.id, value, schedule.amount.toString())}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Settlement Amount</label>
                      <Input
                        type="number"
                        defaultValue={schedule.amount}
                        onBlur={(e) => handleSaveSchedule(schedule.id, schedule.cycle, e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bank Account</label>
                      <div className="p-2 bg-muted rounded-md text-sm">
                        {schedule.bankAccount}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Next Settlement: {schedule.nextDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${schedule.amount.toLocaleString()}
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Save className="w-3 h-3 mr-1" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onClose}>
              Apply All Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}