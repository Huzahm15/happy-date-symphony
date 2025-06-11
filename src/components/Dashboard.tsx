
import { Calendar, CalendarCheck, Users, Send, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const upcomingEvents = [
    { name: "Sarah Johnson", type: "Birthday", date: "2024-06-15", daysLeft: 4 },
    { name: "Mike & Emma", type: "Anniversary", date: "2024-06-18", daysLeft: 7 },
    { name: "David Chen", type: "Birthday", date: "2024-06-22", daysLeft: 11 },
  ];

  const stats = [
    { label: "Total Contacts", value: "124", icon: Users, color: "text-blue-600" },
    { label: "Messages Sent", value: "1,247", icon: Send, color: "text-green-600" },
    { label: "This Month", value: "23", icon: Calendar, color: "text-purple-600" },
    { label: "Success Rate", value: "98.5%", icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Single Card for Upcoming Events */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarCheck className="h-5 w-5 text-purple-600" />
            <span>Upcoming Events</span>
          </CardTitle>
          <CardDescription>Events in the next 30 days</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${event.type === 'Birthday' ? 'bg-pink-100' : 'bg-purple-100'}`}>
                  <Calendar className={`h-4 w-4 ${event.type === 'Birthday' ? 'text-pink-600' : 'text-purple-600'}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{event.name}</p>
                  <p className="text-sm text-gray-600">{event.type} • {event.date}</p>
                </div>
              </div>
              <Badge variant={event.daysLeft <= 7 ? "destructive" : "secondary"}>
                {event.daysLeft} days
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
