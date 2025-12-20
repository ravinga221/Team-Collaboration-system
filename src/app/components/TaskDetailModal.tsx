import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Send, Paperclip, X, Clock, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Task } from "./TaskBoard";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
  isNew?: boolean;
}

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  high: "bg-red-100 text-red-700 border-red-200",
};

export function TaskDetailModal({
  task,
  isOpen,
  onClose,
  comments,
  onAddComment,
}: TaskDetailModalProps) {
  const [newComment, setNewComment] = useState("");

  if (!task) return null;

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{task.title}</DialogTitle>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className={priorityColors[task.priority]}>
                  {task.priority} priority
                </Badge>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>Due {task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <User className="w-4 h-4" />
                  <span>{task.assignee}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-600">{task.description}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">
              Comments ({comments.length})
            </h3>
            
            <div className="space-y-4 mb-4">
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={comment.isNew ? { opacity: 0, y: 20 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 p-4 rounded-lg ${
                      comment.isNew ? "bg-blue-50 border border-blue-200" : "bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 ${comment.avatar}`}
                    >
                      {comment.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-slate-900">
                          {comment.user}
                        </span>
                        <span className="text-xs text-slate-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-slate-700">{comment.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="space-y-3">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleSubmit();
                  }
                }}
              />
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach File
                </Button>
                <Button onClick={handleSubmit} disabled={!newComment.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
