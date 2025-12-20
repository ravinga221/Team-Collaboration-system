import { Bell, X, CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const typeColors = {
  info: "border-l-blue-500 bg-blue-50",
  success: "border-l-green-500 bg-green-50",
  warning: "border-l-yellow-500 bg-yellow-50",
};

export function NotificationPanel({
  notifications,
  onMarkAsRead,
  onDismiss,
  onMarkAllAsRead,
}: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`border-l-4 rounded-lg p-4 ${
                typeColors[notification.type]
              } ${notification.read ? "opacity-60" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    {notification.message}
                  </p>
                  <span className="text-xs text-slate-500">{notification.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead(notification.id)}
                      className="h-8 w-8 p-0"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismiss(notification.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {notifications.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
