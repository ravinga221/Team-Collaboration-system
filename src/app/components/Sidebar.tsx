import { LayoutDashboard, CheckSquare, MessageSquare, Users, Settings, Bell } from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "tasks", icon: CheckSquare, label: "Tasks" },
    { id: "messages", icon: MessageSquare, label: "Messages" },
    { id: "team", icon: Users, label: "Team" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl tracking-tight">TeamSync</h1>
        <p className="text-xs text-slate-400 mt-1">Collaboration Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    activeView === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-sm">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm">John Doe</p>
            <p className="text-xs text-slate-400">john@team.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
