import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MerchantBulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MerchantBulkUploadModal({ isOpen, onClose }: MerchantBulkUploadModalProps) {
  const { toast } = useToast();
  const [uploadStep, setUploadStep] = useState<'upload' | 'processing' | 'complete'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "Error",
        description: "กรุณาเลือกไฟล์ก่อนอัพโหลด",
        variant: "destructive"
      });
      return;
    }

    setUploadStep('processing');
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadStep('complete');
        toast({
          title: "Upload Complete",
          description: "อัพโหลดข้อมูล merchant สำเร็จ"
        });
      }
    }, 200);
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Download Template",
      description: "กำลังดาวน์โหลด template สำหรับ bulk upload"
    });
  };

  const handleClose = () => {
    setUploadStep('upload');
    setFile(null);
    setUploadProgress(0);
    onClose();
  };

  const mockResults = {
    total: 150,
    successful: 142,
    failed: 8,
    errors: [
      { row: 23, error: "Invalid email format" },
      { row: 45, error: "Missing business license number" },
      { row: 67, error: "Duplicate merchant name" },
      { row: 89, error: "Invalid category" },
      { row: 112, error: "Missing contact information" }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Bulk Upload Merchants
          </DialogTitle>
          <DialogDescription>
            อัพโหลดข้อมูล merchant จำนวนมากผ่านไฟล์ CSV หรือ Excel
          </DialogDescription>
        </DialogHeader>

        {uploadStep === 'upload' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">ข้อมูลที่ต้องการในไฟล์:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Business Name (ชื่อธุรกิจ)</li>
                  <li>• Category (ประเภทธุรกิจ)</li>
                  <li>• Contact Email (อีเมลติดต่อ)</li>
                  <li>• Business Address (ที่อยู่ธุรกิจ)</li>
                  <li>• Fee Structure (โครงสร้างค่าธรรมเนียม)</li>
                  <li>• Business License (ใบอนุญาตธุรกิจ)</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadTemplate} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label htmlFor="file-upload">เลือกไฟล์สำหรับอัพโหลด</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm">คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</p>
                  <p className="text-xs text-muted-foreground mt-1">รองรับไฟล์ CSV, Excel (.xlsx, .xls)</p>
                </Label>
              </div>

              {file && (
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="ml-auto p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                ยกเลิก
              </Button>
              <Button onClick={handleUpload} disabled={!file} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                เริ่มอัพโหลด
              </Button>
            </div>
          </div>
        )}

        {uploadStep === 'processing' && (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary animate-bounce" />
              </div>
              <h3 className="text-lg font-semibold mb-2">กำลังประมวลผลข้อมูล</h3>
              <p className="text-muted-foreground">กรุณารอสักครู่...</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>ความคืบหน้า</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </div>
        )}

        {uploadStep === 'complete' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">อัพโหลดเสร็จสิ้น</h3>
              <p className="text-muted-foreground">ประมวลผลข้อมูล merchant เรียบร้อยแล้ว</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-semibold text-blue-600">{mockResults.total}</div>
                <div className="text-sm text-muted-foreground">รวมทั้งหมด</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-semibold text-green-600">{mockResults.successful}</div>
                <div className="text-sm text-muted-foreground">สำเร็จ</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-semibold text-red-600">{mockResults.failed}</div>
                <div className="text-sm text-muted-foreground">ไม่สำเร็จ</div>
              </div>
            </div>

            {mockResults.failed > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-red-600">ข้อผิดพลาดที่พบ:</h4>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {mockResults.errors.map((error, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded text-sm">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span>แถว {error.row}: {error.error}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                ปิด
              </Button>
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                ดาวน์โหลดรายงาน
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}