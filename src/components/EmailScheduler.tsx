
import { useState, useEffect } from "react";
import { Clock, Send, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ScheduledEmail {
  id: number;
  contactName: string;
  eventType: "birthday" | "anniversary";
  scheduledDate: string;
  status: "pending" | "sent" | "failed";
  message: string;
}

const EmailScheduler = () => {
  const { toast } = useToast();
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([
    {
      id: 1,
      contactName: "Sarah Johnson",
      eventType: "birthday",
      scheduledDate: "2024-06-15T09:00:00",
      status: "pending",
      message: "Happy Birthday! 🎉"
    },
    {
      id: 2,
      contactName: "Mike & Emma",
      eventType: "anniversary",
      scheduledDate: "2024-06-18T10:00:00",
      status: "pending",
      message: "Happy Anniversary! 💕"
    }
  ]);

  const [isAutoSendEnabled, setIsAutoSendEnabled] = useState(true);

  useEffect(() => {
    if (!isAutoSendEnabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      
      setScheduledEmails(prev => 
        prev.map(email => {
          const scheduledTime = new Date(email.scheduledDate);
          
          if (email.status === "pending" && now >= scheduledTime) {
            // Simulate sending email
            toast({
              title: "Email Sent!",
              description: `${email.eventType} message sent to ${email.contactName}`,
            });
            
            return { ...email, status: "sent" as const };
          }
          
          return email;
        })
      );
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [isAutoSendEnabled, toast]);

  const toggleAutoSend = () => {
    setIsAutoSendEnabled(!isAutoSendEnabled);
    toast({
      title: isAutoSendEnabled ? "Auto-send Disabled" : "Auto-send Enabled",
      description: isAutoSendEnabled 
        ? "Automatic email sending has been turned off" 
        : "Emails will now be sent automatically",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span>Email Scheduler</span>
            </CardTitle>
            <CardDescription>Automatic email sending for upcoming events</CardDescription>
          </div>
          <Button
            variant={isAutoSendEnabled ? "default" : "outline"}
            onClick={toggleAutoSend}
            className={isAutoSendEnabled ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isAutoSendEnabled ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Auto-send ON
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Auto-send OFF
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduledEmails.map((email) => (
          <div key={email.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${email.eventType === 'birthday' ? 'bg-pink-100' : 'bg-purple-100'}`}>
                <Send className={`h-4 w-4 ${email.eventType === 'birthday' ? 'text-pink-600' : 'text-purple-600'}`} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{email.contactName}</p>
                <p className="text-sm text-gray-600">{email.message}</p>
                <p className="text-xs text-gray-500">Scheduled: {formatDate(email.scheduledDate)}</p>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge(email.status)}
            </div>
          </div>
        ))}
        
        {scheduledEmails.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No scheduled emails at the moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailScheduler;
