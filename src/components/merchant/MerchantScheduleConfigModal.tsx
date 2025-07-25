import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, DollarSign, Save, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
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
  floor: string;
  area: string;
  department: string;
  category: string;
}

export default function MerchantScheduleConfigModal({ isOpen, onClose }: MerchantScheduleConfigModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for 200 merchants
  const [schedules] = useState<ScheduleConfig[]>(() => {
    const mockSchedules: ScheduleConfig[] = [];
    const merchants = ['Starbucks', 'Amazon', 'Target', 'Walmart', 'Best Buy', 'Apple Store', 'Samsung', 'Nike', 'Adidas', 'McDonald\'s'];
    const floors = ['G', '1', '2', '3', '4', '5'];
    const areas = ['A', 'B', 'C', 'D', 'E', 'F'];
    const departments = ['Food & Beverage', 'Electronics', 'Retail', 'Fashion', 'Sports', 'Technology'];
    const categories = ['Restaurant', 'Store', 'Boutique', 'Cafe', 'Mall'];
    const cycles = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'];
    const statuses = ['Scheduled', 'Processing', 'Failed', 'Completed'];

    for (let i = 1; i <= 200; i++) {
      mockSchedules.push({
        id: i.toString(),
        merchant: `${merchants[i % merchants.length]} ${Math.floor(i / merchants.length) + 1}`,
        cycle: cycles[i % cycles.length],
        amount: Math.floor(Math.random() * 50000) + 10000,
        status: statuses[i % statuses.length],
        nextDate: `2024-01-${(i % 28) + 1}`,
        bankAccount: `****${(1000 + i).toString().slice(-4)}`,
        floor: floors[i % floors.length],
        area: areas[i % areas.length],
        department: departments[i % departments.length],
        category: categories[i % categories.length]
      });
    }
    return mockSchedules;
  });

  // Filter and pagination logic
  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const matchesSearch = schedule.merchant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFloor = selectedFloor === '' || selectedFloor === 'all' || schedule.floor === selectedFloor;
      const matchesArea = selectedArea === '' || selectedArea === 'all' || schedule.area === selectedArea;
      const matchesDepartment = selectedDepartment === '' || selectedDepartment === 'all' || schedule.department === selectedDepartment;
      const matchesStatus = selectedStatus === '' || selectedStatus === 'all' || schedule.status === selectedStatus;
      
      return matchesSearch && matchesFloor && matchesArea && matchesDepartment && matchesStatus;
    });
  }, [schedules, searchTerm, selectedFloor, selectedArea, selectedDepartment, selectedStatus]);

  const paginatedSchedules = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSchedules.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSchedules, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);

  // Get unique values for filters
  const floors = [...new Set(schedules.map(s => s.floor))];
  const areas = [...new Set(schedules.map(s => s.area))];
  const departments = [...new Set(schedules.map(s => s.department))];
  const statuses = [...new Set(schedules.map(s => s.status))];

  const handleSaveSchedule = (scheduleId: string, newCycle: string, newAmount: string) => {
    toast({
      title: "Schedule Updated",
      description: "Settlement schedule has been updated successfully.",
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedFloor('');
    setSelectedArea('');
    setSelectedDepartment('');
    setSelectedStatus('');
    setCurrentPage(1);
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Configure Settlement Schedules ({filteredSchedules.length} merchants)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto">
          {/* Search and Filters */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                <SelectTrigger>
                  <SelectValue placeholder="Floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Floors</SelectItem>
                  {floors.map(floor => (
                    <SelectItem key={floor} value={floor}>Floor {floor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {areas.map(area => (
                    <SelectItem key={area} value={area}>Area {area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          {/* Merchant List */}
          <div className="grid grid-cols-1 gap-4">
            {paginatedSchedules.map((schedule) => (
              <Card key={schedule.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{schedule.merchant}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Floor {schedule.floor}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Area {schedule.area}</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">{schedule.department}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(schedule.status)}>
                      {schedule.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <div className="p-2 bg-muted rounded-md text-sm">
                        {schedule.category}
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

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredSchedules.length)} of {filteredSchedules.length} merchants
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
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