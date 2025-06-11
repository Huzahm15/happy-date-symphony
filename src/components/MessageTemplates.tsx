
import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MessageTemplates = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Birthday Wishes",
      type: "birthday",
      message: "Happy Birthday {{name}}! 🎉 Wishing you a fantastic year ahead filled with joy and success!",
      isActive: true
    },
    {
      id: 2,
      name: "Anniversary Celebration",
      type: "anniversary",
      message: "Happy Anniversary {{name}}! 💕 Celebrating your special day and wishing you many more years of happiness together!",
      isActive: true
    }
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "birthday",
    message: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const template = {
      id: Date.now(),
      ...newTemplate,
      isActive: true
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: "", type: "birthday", message: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Template created successfully!"
    });
  };

  const deleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: "Template deleted",
      description: "The template has been removed successfully."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Message Templates</h2>
          <p className="text-gray-600">Create and manage your birthday and anniversary message templates</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new message template for birthdays or anniversaries
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <Label htmlFor="template-type">Type</Label>
                <Select value={newTemplate.type} onValueChange={(value) => setNewTemplate({...newTemplate, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="template-message">Message</Label>
                <Textarea
                  id="template-message"
                  value={newTemplate.message}
                  onChange={(e) => setNewTemplate({...newTemplate, message: e.target.value})}
                  placeholder="Enter your message template (use {{name}} for personalization)"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">Use {{name}} to insert the person's name automatically</p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveTemplate}>
                  Save Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {template.type === "birthday" ? (
                    <Calendar className="h-5 w-5 text-pink-600" />
                  ) : (
                    <CalendarCheck className="h-5 w-5 text-purple-600" />
                  )}
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <Badge variant={template.type === "birthday" ? "secondary" : "outline"}>
                  {template.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{template.message}</p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={template.isActive ? "default" : "secondary"}>
                  {template.isActive ? "Active" : "Inactive"}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteTemplate(template.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessageTemplates;
