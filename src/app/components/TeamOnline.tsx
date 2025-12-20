import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: "online" | "away" | "offline";
  avatar: string;
  currentTask?: string;
}

interface TeamOnlineProps {
  members: TeamMember[];
}

const statusColors = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-slate-400",
};

const statusLabels = {
  online: "Online",
  away: "Away",
  offline: "Offline",
};

export function TeamOnline({ members }: TeamOnlineProps) {
  const onlineMembers = members.filter((m) => m.status === "online");
  const awayMembers = members.filter((m) => m.status === "away");
  const offlineMembers = members.filter((m) => m.status === "offline");

  const sortedMembers = [...onlineMembers, ...awayMembers, ...offlineMembers];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team Members</CardTitle>
          <Badge variant="outline">
            {onlineMembers.length} online
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {sortedMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white",
                  member.avatar
                )}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div
                className={cn(
                  "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                  statusColors[member.status],
                  member.status === "online" && "animate-pulse"
                )}
              ></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {member.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {member.currentTask || member.email}
              </p>
            </div>
            
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                member.status === "online" && "bg-green-50 text-green-700 border-green-200",
                member.status === "away" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                member.status === "offline" && "bg-slate-50 text-slate-600 border-slate-200"
              )}
            >
              {statusLabels[member.status]}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
