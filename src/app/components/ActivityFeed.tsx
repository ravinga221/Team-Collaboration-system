import { CheckCircle2, MessageCircle, UserPlus, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

interface Activity {
  id: string;
  type: "task" | "comment" | "member" | "file";
  user: string;
  action: string;
  target: string;
  time: string;
  isNew?: boolean;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  task: CheckCircle2,
  comment: MessageCircle,
  member: UserPlus,
  file: FileText,
};

const activityColors = {
  task: "text-green-500",
  comment: "text-blue-500",
  member: "text-purple-500",
  file: "text-orange-500",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Activity Feed</CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          const color = activityColors[activity.type];
          
          return (
            <motion.div
              key={activity.id}
              initial={activity.isNew ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 p-3 rounded-lg ${
                activity.isNew ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50"
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium text-slate-900">{activity.user}</span>{" "}
                  <span className="text-slate-600">{activity.action}</span>{" "}
                  <span className="font-medium text-slate-900">{activity.target}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
