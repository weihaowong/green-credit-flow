import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CSVUploadProps {
  onUploadComplete: (data: any[]) => void;
  type: "transactions" | "merchants";
}

const CSVUpload = ({ onUploadComplete, type }: CSVUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const isTransactions = type === "transactions";
  const title = isTransactions ? "Upload Transactions" : "Manage Merchants";
  const description = isTransactions 
    ? "Upload your transaction history CSV (up to 5MB)" 
    : "Upload merchant green scores CSV";

  const expectedFormat = isTransactions
    ? "date, amount, merchant, category"
    : "merchant_id, name, green_score";

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    processFile(file);
  };

  const processFile = async (file: File) => {
    setUploading(true);
    setProgress(0);

    // Simulate file processing
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      
      // Simulate processing progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Parse CSV (simplified)
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        if (isTransactions) {
          return {
            date: new Date(values[0]),
            amount: parseFloat(values[1]),
            merchant: values[2],
            category: values[3],
          };
        } else {
          return {
            merchant_id: values[0],
            name: values[1],
            green_score: parseInt(values[2]),
          };
        }
      }).filter(item => Object.values(item).some(v => v));

      setTimeout(() => {
        setUploading(false);
        setProgress(0);
        onUploadComplete(data);
        
        toast({
          title: "Upload successful",
          description: `${data.length} ${isTransactions ? 'transactions' : 'merchants'} imported`,
        });
      }, 500);
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          } ${uploading ? "pointer-events-none opacity-50" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="space-y-4">
              <div className="mx-auto w-8 h-8 text-primary">
                <FileText className="animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-sm">Processing file...</p>
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-muted-foreground">{progress}% complete</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-8 h-8 text-muted-foreground">
                <Upload />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">{description}</p>
                <p className="text-xs text-muted-foreground">
                  Drag and drop your CSV file here, or click to browse
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-3 w-3 text-success" />
            <span>Expected format: {expectedFormat}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3 w-3 text-warning" />
            <span>Maximum file size: 5MB</span>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileInput}
        />
      </CardContent>
    </Card>
  );
};

export default CSVUpload;