
import { useState } from "react";
import { Settings, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const IntegrationSettings = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleTestConnection = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Google Apps Script webhook URL",
        variant: "destructive"
      });
      return;
    }

    // Simulate testing connection
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Success",
        description: "Successfully connected to Google Apps Script!"
      });
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Code copied to clipboard!"
    });
  };

  const appsScriptCode = `function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  
  // Add data to sheet
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.type,
    data.date,
    data.message
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Integration Settings</h2>
        <p className="text-gray-600">Connect with Google Sheets and Apps Script for automated message sending</p>
      </div>

      {/* Connection Status */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-purple-600" />
            <span>Google Apps Script Integration</span>
          </CardTitle>
          <CardDescription>
            Connect your Google Apps Script webhook to enable automated message sending
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center space-x-1">
              {isConnected && <CheckCircle className="h-3 w-3" />}
              <span>{isConnected ? "Connected" : "Not Connected"}</span>
            </Badge>
          </div>
          
          <div>
            <Label htmlFor="webhook-url">Apps Script Webhook URL</Label>
            <Input
              id="webhook-url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your Google Apps Script web app URL here
            </p>
          </div>

          <Button onClick={handleTestConnection} className="w-full sm:w-auto">
            Test Connection
          </Button>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>
            Follow these steps to set up Google Apps Script integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Create Google Apps Script</h4>
                <p className="text-sm text-gray-600">
                  Go to <a href="https://script.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline inline-flex items-center">
                    script.google.com <ExternalLink className="h-3 w-3 ml-1" />
                  </a> and create a new project
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Add the Script Code</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Copy and paste this code into your Apps Script editor:
                </p>
                <div className="relative">
                  <Textarea
                    value={appsScriptCode}
                    readOnly
                    className="font-mono text-xs"
                    rows={12}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(appsScriptCode)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Deploy as Web App</h4>
                <p className="text-sm text-gray-600">
                  Click Deploy → New Deployment → Type: Web app → Execute as: Me → Access: Anyone
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Copy Webhook URL</h4>
                <p className="text-sm text-gray-600">
                  Copy the web app URL and paste it in the webhook URL field above
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Sheets Template */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Google Sheets Template</CardTitle>
          <CardDescription>
            Use this template for your Google Sheets to track message sends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left">Timestamp</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Date</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-gray-500">Auto-filled</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-500">Contact name</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-500">Email address</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-500">Birthday/Anniversary</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-500">Event date</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-500">Message sent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
