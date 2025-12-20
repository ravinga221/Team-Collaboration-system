import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MoreHorizontal, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "./ui/utils";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "todo" | "inprogress" | "done";
}

interface TaskBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: Task["status"]) => void;
  onTaskClick: (task: Task) => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  high: "bg-red-100 text-red-700 border-red-200",
};

function TaskCard({ task, onTaskClick }: { task: Task; onTaskClick: (task: Task) => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-slate-200 rounded-lg p-4 cursor-move hover:shadow-md transition-shadow"
      onClick={() => onTaskClick(task)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-slate-900">{task.title}</h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={priorityColors[task.priority]}>
          {task.priority}
        </Badge>
        
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-3 h-3" />
          <span>{task.dueDate}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
        <User className="w-3 h-3 text-slate-400" />
        <span className="text-xs text-slate-600">{task.assignee}</span>
      </div>
    </motion.div>
  );
}

function Column({
  status,
  title,
  tasks,
  onDrop,
  onTaskClick,
  color,
}: {
  status: Task["status"];
  title: string;
  tasks: Task[];
  onDrop: (taskId: string, newStatus: Task["status"]) => void;
  onTaskClick: (task: Task) => void;
  color: string;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string; status: Task["status"] }) => {
      if (item.status !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        "bg-slate-50 rounded-lg p-4 min-h-[600px] transition-colors",
        isOver && "bg-blue-50 ring-2 ring-blue-300"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
        ))}
      </div>
    </div>
  );
}

export function TaskBoard({ tasks, onTaskMove, onTaskClick }: TaskBoardProps) {
  const columns = [
    { status: "todo" as const, title: "To Do", color: "bg-slate-400" },
    { status: "inprogress" as const, title: "In Progress", color: "bg-blue-500" },
    { status: "done" as const, title: "Done", color: "bg-green-500" },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Card>
        <CardHeader>
          <CardTitle>Task Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {columns.map((column) => (
              <Column
                key={column.status}
                status={column.status}
                title={column.title}
                tasks={tasks.filter((t) => t.status === column.status)}
                onDrop={onTaskMove}
                onTaskClick={onTaskClick}
                color={column.color}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </DndProvider>
  );
}
