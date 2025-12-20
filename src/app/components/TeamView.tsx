import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Target,
  TrendingUp,
  UserPlus,
  MoreVertical,
  MessageSquare,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "./ui/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "online" | "away" | "offline";
  avatar: string;
  phone?: string;
  location?: string;
  joinDate: string;
  tasksCompleted: number;
  tasksInProgress: number;
  completionRate: number;
  skills: string[];
}

interface TeamViewProps {
  members: TeamMember[];
  onMessageMember: (memberId: string) => void;
}

const statusColors = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-slate-400",
};

export function TeamView({ members, onMessageMember }: TeamViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filterDepartment, setFilterDepartment] = useState<string>("all");

  const departments = ["all", ...new Set(members.map((m) => m.department))];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment =
      filterDepartment === "all" || member.department === filterDepartment;

    return matchesSearch && matchesDepartment;
  });

  const teamStats = {
    total: members.length,
    online: members.filter((m) => m.status === "online").length,
    departments: new Set(members.map((m) => m.department)).size,
    avgCompletion: Math.round(
      members.reduce((acc, m) => acc + m.completionRate, 0) / members.length
    ),
  };

  return (
    <div className="space-y-6">
      {/* Team Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Members</p>
                <p className="text-3xl font-semibold">{teamStats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Online Now</p>
                <p className="text-3xl font-semibold text-green-600">
                  {teamStats.online}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Departments</p>
                <p className="text-3xl font-semibold">{teamStats.departments}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Completion</p>
                <p className="text-3xl font-semibold text-blue-600">
                  {teamStats.avgCompletion}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Team Members List */}
        <div className="col-span-7">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
              <div className="flex gap-3 mt-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search team members..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {filteredMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={cn(
                      "w-full p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left",
                      selectedMember?.id === member.id && "bg-blue-50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${member.avatar}`}
                        >
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div
                          className={cn(
                            "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white",
                            statusColors[member.status]
                          )}
                        ></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-900">
                            {member.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">{member.email}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-500">
                            {member.department}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">
                            {member.tasksCompleted} tasks completed
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onMessageMember(member.id);
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Member Details */}
        <div className="col-span-5">
          {selectedMember ? (
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl ${selectedMember.avatar}`}
                    >
                      {selectedMember.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div
                      className={cn(
                        "absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white",
                        statusColors[selectedMember.status]
                      )}
                    ></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {selectedMember.role}
                  </p>
                  <Badge className="mb-4">{selectedMember.department}</Badge>
                  
                  <div className="flex gap-2 w-full">
                    <Button className="flex-1" onClick={() => onMessageMember(selectedMember.id)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="info">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          {selectedMember.email}
                        </span>
                      </div>
                      {selectedMember.phone && (
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">
                            {selectedMember.phone}
                          </span>
                        </div>
                      )}
                      {selectedMember.location && (
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">
                            {selectedMember.location}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          Joined {selectedMember.joinDate}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4 mt-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">
                          Task Completion Rate
                        </span>
                        <span className="text-sm font-semibold">
                          {selectedMember.completionRate}%
                        </span>
                      </div>
                      <Progress value={selectedMember.completionRate} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700 font-medium">
                            Completed
                          </span>
                        </div>
                        <p className="text-2xl font-semibold text-green-900">
                          {selectedMember.tasksCompleted}
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-700 font-medium">
                            In Progress
                          </span>
                        </div>
                        <p className="text-2xl font-semibold text-blue-900">
                          {selectedMember.tasksInProgress}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3 text-sm">Recent Activity</h4>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">
                              Completed "Homepage Hero Redesign"
                            </p>
                            <p className="text-xs text-slate-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">
                              Commented on "API Documentation"
                            </p>
                            <p className="text-xs text-slate-500">5 hours ago</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">
                              Started "Mobile App Testing"
                            </p>
                            <p className="text-xs text-slate-500">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-slate-500 p-8">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Select a team member to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
