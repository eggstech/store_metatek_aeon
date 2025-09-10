"use client";

import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  selectedTaskId?: string;
}

const getStatusVariant = (
  status: Task["status"]
): "destructive" | "secondary" | "outline" | "default" => {
  switch (status) {
    case "Overdue":
      return "destructive";
    case "Needs Rework":
      return "destructive";
    case "Completed":
      return "default";
    case "Pending":
      return "secondary";
    default:
      return "secondary";
  }
};

const getPriority = (status: Task["status"]): number => {
    switch (status) {
        case "Overdue": return 1;
        case "Needs Rework": return 2;
        case "Pending": return 3;
        case "Completed": return 4;
        default: return 5;
    }
}

export default function TaskList({ tasks, onSelectTask, selectedTaskId }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityA = getPriority(a.status);
    const priorityB = getPriority(b.status);
    if (priorityA !== priorityB) {
        return priorityA - priorityB;
    }
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div className="flex flex-col gap-2 p-2">
      {sortedTasks.map((task) => (
        <button
          key={task.id}
          onClick={() => onSelectTask(task)}
          className={cn(
            "w-full text-left p-3 rounded-lg transition-colors",
            selectedTaskId === task.id
              ? "bg-primary/10 border border-primary/50"
              : "hover:bg-accent"
          )}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-sm truncate pr-2">{task.title}</h3>
            <Badge variant={getStatusVariant(task.status)} className="flex-shrink-0">{task.status}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Due: {format(parseISO(task.deadline), "MMM d, yyyy")}
          </p>
        </button>
      ))}
    </div>
  );
}
