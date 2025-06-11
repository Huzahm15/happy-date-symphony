
import { useState } from "react";
import { Upload, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
  type: "birthday" | "anniversary";
  date: string;
}

interface CSVImportHandlerProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (contacts: Contact[]) => void;
}

const CSVImportHandler = ({ isOpen, onClose, onImport }: CSVImportHandlerProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const downloadDemoCSV = () => {
    const demoData = `name,email,phone,type,date
John Smith,john.smith@example.com,+1234567890,birthday,1990-03-15
Sarah & Mike Johnson,sarah.mike@example.com,+1234567891,anniversary,2018-06-22`;

    const blob = new Blob([demoData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contacts_demo.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Demo CSV Downloaded",
      description: "Use this file as a template for your contacts import."
    });
  };

  const parseCSV = (csvText: string): Contact[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Validate headers
    const requiredHeaders = ['name', 'email', 'type', 'date'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
    }

    const contacts: Contact[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        console.warn(`Skipping line ${i + 1}: incorrect number of columns`);
        continue;
      }

      const contact: Contact = {
        name: '',
        email: '',
        phone: '',
        type: 'birthday',
        date: ''
      };

      headers.forEach((header, index) => {
        const value = values[index];
        switch (header) {
          case 'name':
            contact.name = value;
            break;
          case 'email':
            contact.email = value;
            break;
          case 'phone':
            contact.phone = value || '';
            break;
          case 'type':
            contact.type = value === 'anniversary' ? 'anniversary' : 'birthday';
            break;
          case 'date':
            contact.date = value;
            break;
        }
      });

      // Validate required fields
      if (contact.name && contact.email && contact.date) {
        contacts.push(contact);
      } else {
        console.warn(`Skipping line ${i + 1}: missing required fields`);
      }
    }

    return contacts;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const text = await file.text();
      const contacts = parseCSV(text);
      
      if (contacts.length === 0) {
        throw new Error('No valid contacts found in the CSV file');
      }

      onImport(contacts);
      onClose();
      
      toast({
        title: "Import Successful",
        description: `Imported ${contacts.length} contact(s) successfully.`
      });
    } catch (error) {
      console.error('CSV import error:', error);
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to import CSV file.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      // Reset file input
      event.target.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Contacts from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import your contacts. Download the demo file to see the required format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Demo CSV Download */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Demo CSV Template</p>
                  <p className="text-sm text-blue-700">Download to see the required format</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadDemoCSV}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload CSV File
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> your CSV file
                  </p>
                  <p className="text-xs text-gray-500">CSV files only</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                />
              </label>
            </div>
          </div>

          {/* Required Format Info */}
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Required CSV columns:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><strong>name:</strong> Contact's full name</li>
              <li><strong>email:</strong> Email address</li>
              <li><strong>phone:</strong> Phone number (optional)</li>
              <li><strong>type:</strong> "birthday" or "anniversary"</li>
              <li><strong>date:</strong> Date in YYYY-MM-DD format</li>
            </ul>
          </div>

          {isProcessing && (
            <div className="text-center py-2">
              <p className="text-sm text-gray-600">Processing CSV file...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CSVImportHandler;
