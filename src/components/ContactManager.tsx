
import { useState } from "react";
import { Plus, Upload, Calendar, CalendarCheck, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ContactManager = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", type: "birthday", date: "1990-06-15", phone: "+1234567890" },
    { id: 2, name: "Mike & Emma", email: "mike.emma@example.com", type: "anniversary", date: "2018-06-18", phone: "+1234567891" },
    { id: 3, name: "David Chen", email: "david@example.com", type: "birthday", date: "1985-06-22", phone: "+1234567892" },
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "birthday",
    date: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveContact = () => {
    if (!newContact.name || !newContact.email || !newContact.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const contact = {
      id: Date.now(),
      ...newContact
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", email: "", phone: "", type: "birthday", date: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Contact added successfully!"
    });
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast({
      title: "Contact deleted",
      description: "The contact has been removed successfully."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Management</h2>
          <p className="text-gray-600">Manage your birthday and anniversary contacts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Add a new contact for birthday or anniversary reminders
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Name *</Label>
                  <Input
                    id="contact-name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-type">Type *</Label>
                  <Select value={newContact.type} onValueChange={(value) => setNewContact({...newContact, type: value})}>
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
                  <Label htmlFor="contact-date">Date *</Label>
                  <Input
                    id="contact-date"
                    type="date"
                    value={newContact.date}
                    onChange={(e) => setNewContact({...newContact, date: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveContact}>
                    Add Contact
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${contact.type === 'birthday' ? 'bg-pink-100' : 'bg-purple-100'}`}>
                    {contact.type === 'birthday' ? (
                      <Calendar className="h-5 w-5 text-pink-600" />
                    ) : (
                      <CalendarCheck className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    {contact.phone && <p className="text-sm text-gray-500">{contact.phone}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge variant={contact.type === "birthday" ? "secondary" : "outline"}>
                      {contact.type}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{contact.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteContact(contact.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactManager;
