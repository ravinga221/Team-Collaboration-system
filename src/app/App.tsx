import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { ActivityFeed } from "./components/ActivityFeed";
import { TaskBoard, Task } from "./components/TaskBoard";
import { TeamOnline } from "./components/TeamOnline";
import { TaskDetailModal } from "./components/TaskDetailModal";
import { QuickStats } from "./components/QuickStats";
import { NotificationPanel } from "./components/NotificationPanel";
import { MessagesView } from "./components/MessagesView";
import { TeamView } from "./components/TeamView";
import { SettingsView } from "./components/SettingsView";
import { CheckCircle2, Clock, AlertCircle, Target } from "lucide-react";
import { Toaster, toast } from "sonner";

// Mock data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Homepage Hero Redesign",
    description: "Update the landing page hero section with new branding guidelines",
    assignee: "Alex Chen",
    priority: "high",
    dueDate: "Dec 22",
    status: "inprogress",
  },
  {
    id: "2",
    title: "API Documentation",
    description: "Write comprehensive API documentation for v2.0 endpoints",
    assignee: "Sarah Johnson",
    priority: "medium",
    dueDate: "Dec 24",
    status: "inprogress",
  },
  {
    id: "3",
    title: "Mobile App Testing",
    description: "Complete QA testing for iOS and Android apps",
    assignee: "Mike Torres",
    priority: "high",
    dueDate: "Dec 20",
    status: "todo",
  },
  {
    id: "4",
    title: "Database Migration",
    description: "Migrate legacy database to new PostgreSQL cluster",
    assignee: "Emily White",
    priority: "low",
    dueDate: "Dec 28",
    status: "todo",
  },
  {
    id: "5",
    title: "User Feedback Analysis",
    description: "Analyze Q4 user feedback and create summary report",
    assignee: "David Kim",
    priority: "medium",
    dueDate: "Dec 19",
    status: "done",
  },
  {
    id: "6",
    title: "Security Audit",
    description: "Conduct security audit of authentication system",
    assignee: "Lisa Anderson",
    priority: "high",
    dueDate: "Dec 21",
    status: "done",
  },
];

const teamMembers = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex@team.com",
    role: "Senior Frontend Developer",
    department: "Engineering",
    status: "online" as const,
    avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
    currentTask: "Working on Homepage Hero Redesign",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "Jan 2023",
    tasksCompleted: 45,
    tasksInProgress: 3,
    completionRate: 92,
    skills: ["React", "TypeScript", "UI/UX", "Figma"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@team.com",
    role: "Technical Writer",
    department: "Documentation",
    status: "online" as const,
    avatar: "bg-gradient-to-br from-green-500 to-teal-600",
    currentTask: "Writing API docs",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    joinDate: "Mar 2023",
    tasksCompleted: 38,
    tasksInProgress: 2,
    completionRate: 88,
    skills: ["Technical Writing", "Documentation", "Markdown"],
  },
  {
    id: "3",
    name: "Mike Torres",
    email: "mike@team.com",
    role: "QA Engineer",
    department: "Quality Assurance",
    status: "away" as const,
    avatar: "bg-gradient-to-br from-orange-500 to-red-600",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    joinDate: "Feb 2023",
    tasksCompleted: 52,
    tasksInProgress: 4,
    completionRate: 95,
    skills: ["Testing", "Automation", "Selenium", "Jest"],
  },
  {
    id: "4",
    name: "Emily White",
    email: "emily@team.com",
    role: "Backend Developer",
    department: "Engineering",
    status: "online" as const,
    avatar: "bg-gradient-to-br from-pink-500 to-purple-600",
    currentTask: "Planning DB migration",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    joinDate: "Dec 2022",
    tasksCompleted: 61,
    tasksInProgress: 2,
    completionRate: 94,
    skills: ["Node.js", "PostgreSQL", "API Design", "Docker"],
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@team.com",
    role: "Product Manager",
    department: "Product",
    status: "offline" as const,
    avatar: "bg-gradient-to-br from-indigo-500 to-blue-600",
    phone: "+1 (555) 567-8901",
    location: "Los Angeles, CA",
    joinDate: "Nov 2022",
    tasksCompleted: 29,
    tasksInProgress: 5,
    completionRate: 85,
    skills: ["Product Strategy", "Roadmapping", "User Research"],
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa@team.com",
    role: "Security Engineer",
    department: "Security",
    status: "online" as const,
    avatar: "bg-gradient-to-br from-yellow-500 to-orange-600",
    currentTask: "Security review",
    phone: "+1 (555) 678-9012",
    location: "Boston, MA",
    joinDate: "Apr 2023",
    tasksCompleted: 34,
    tasksInProgress: 3,
    completionRate: 90,
    skills: ["Security Auditing", "Penetration Testing", "Compliance"],
  },
];

const initialActivities = [
  {
    id: "1",
    type: "task" as const,
    user: "David Kim",
    action: "completed task",
    target: "User Feedback Analysis",
    time: "2 minutes ago",
  },
  {
    id: "2",
    type: "comment" as const,
    user: "Sarah Johnson",
    action: "commented on",
    target: "API Documentation",
    time: "5 minutes ago",
  },
  {
    id: "3",
    type: "member" as const,
    user: "Lisa Anderson",
    action: "joined the team",
    target: "TeamSync",
    time: "15 minutes ago",
  },
  {
    id: "4",
    type: "file" as const,
    user: "Alex Chen",
    action: "uploaded file to",
    target: "Homepage Hero Redesign",
    time: "23 minutes ago",
  },
  {
    id: "5",
    type: "task" as const,
    user: "Emily White",
    action: "created task",
    target: "Database Migration",
    time: "1 hour ago",
  },
];

const initialNotifications = [
  {
    id: "1",
    title: "Task Assigned",
    message: "You've been assigned to 'Mobile App Testing'",
    time: "5 minutes ago",
    read: false,
    type: "info" as const,
  },
  {
    id: "2",
    title: "Deadline Approaching",
    message: "Task 'User Feedback Analysis' is due today",
    time: "1 hour ago",
    read: false,
    type: "warning" as const,
  },
  {
    id: "3",
    title: "Task Completed",
    message: "Lisa Anderson completed 'Security Audit'",
    time: "2 hours ago",
    read: true,
    type: "success" as const,
  },
];

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [tasks, setTasks] = useState(initialTasks);
  const [activities, setActivities] = useState(initialActivities);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new activity
      if (Math.random() > 0.7) {
        const newActivity = {
          id: Date.now().toString(),
          type: ["task", "comment", "file"][Math.floor(Math.random() * 3)] as any,
          user: teamMembers[Math.floor(Math.random() * teamMembers.length)].name,
          action: "updated",
          target: tasks[Math.floor(Math.random() * tasks.length)].title,
          time: "just now",
          isNew: true,
        };
        setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
        toast.success(`${newActivity.user} ${newActivity.action} ${newActivity.target}`);
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [tasks]);

  const handleTaskMove = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const statusLabels = {
        todo: "To Do",
        inprogress: "In Progress",
        done: "Done",
      };
      
      toast.success(`Task moved to ${statusLabels[newStatus]}`);
      
      const newActivity = {
        id: Date.now().toString(),
        type: "task" as const,
        user: "You",
        action: "moved task to",
        target: `${task.title} → ${statusLabels[newStatus]}`,
        time: "just now",
        isNew: true,
      };
      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setComments([
      {
        id: "1",
        user: "Sarah Johnson",
        avatar: "bg-gradient-to-br from-green-500 to-teal-600",
        text: "I've reviewed the requirements and they look good. Let's proceed!",
        time: "2 hours ago",
      },
      {
        id: "2",
        user: "Alex Chen",
        avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
        text: "Great! I'll start working on the wireframes today.",
        time: "1 hour ago",
      },
    ]);
  };

  const handleAddComment = (text: string) => {
    const newComment = {
      id: Date.now().toString(),
      user: "John Doe",
      avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
      text,
      time: "just now",
      isNew: true,
    };
    setComments((prev) => [...prev, newComment]);
    toast.success("Comment posted");
  };

  const handleMessageMember = (memberId: string) => {
    setActiveView("messages");
    toast.success("Opening chat...");
  };

  const stats = [
    {
      label: "Tasks Completed",
      value: tasks.filter((t) => t.status === "done").length,
      change: 12,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "inprogress").length,
      change: -5,
      icon: Clock,
      color: "text-blue-600",
    },
    {
      label: "To Do",
      value: tasks.filter((t) => t.status === "todo").length,
      change: 8,
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      label: "Team Members",
      value: teamMembers.filter((m) => m.status === "online").length,
      change: 0,
      icon: Target,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-slate-600">
              Here's what's happening with your team today.
            </p>
          </div>

          {activeView === "dashboard" && (
            <div className="space-y-6">
              <QuickStats stats={stats} />
              
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <ActivityFeed activities={activities} />
                </div>
                <div>
                  <TeamOnline members={teamMembers} />
                </div>
              </div>
            </div>
          )}

          {activeView === "tasks" && (
            <TaskBoard
              tasks={tasks}
              onTaskMove={handleTaskMove}
              onTaskClick={handleTaskClick}
            />
          )}

          {activeView === "messages" && (
            <MessagesView
              currentUser={{
                name: "John Doe",
                avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
              }}
            />
          )}

          {activeView === "team" && (
            <TeamView members={teamMembers} onMessageMember={handleMessageMember} />
          )}

          {activeView === "notifications" && (
            <NotificationPanel
              notifications={notifications}
              onMarkAsRead={(id) =>
                setNotifications((prev) =>
                  prev.map((n) => (n.id === id ? { ...n, read: true } : n))
                )
              }
              onDismiss={(id) =>
                setNotifications((prev) => prev.filter((n) => n.id !== id))
              }
              onMarkAllAsRead={() =>
                setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
              }
            />
          )}

          {activeView === "settings" && (
            <SettingsView
              currentUser={{
                name: "John Doe",
                email: "john@team.com",
                avatar: "bg-gradient-to-br from-blue-500 to-purple-600",
                role: "Product Manager",
                phone: "+1 (555) 999-0000",
                location: "San Francisco, CA",
                bio: "Passionate about building great products and leading amazing teams.",
              }}
            />
          )}
        </div>
      </main>

      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        comments={comments}
        onAddComment={handleAddComment}
      />

      <Toaster position="top-right" richColors />
    </div>
  );
}