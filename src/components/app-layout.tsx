"use client";

import React, { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import AppHeader from "@/components/header";
import TaskList from "@/components/task-list";
import TaskDetail from "@/components/task-detail";
import { Task, User } from "@/lib/types";
import { tasks, users } from "@/lib/data";
import { LayoutDashboard, ListTodo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Logo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V8H20"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 18L12 12"
      stroke="hsl(var(--foreground))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 15L12 12L15 15"
      stroke="hsl(var(--foreground))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function AppLayout() {
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(
    allTasks.find(t => t.status === "Overdue" || t.status === "Needs Rework") || allTasks.find(t => t.status === 'Pending') || null
  );
  const currentUser = users[0];
  const pathname = usePathname();

  const handleTaskUpdate = (updatedTask: Task) => {
    const newTasks = allTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setAllTasks(newTasks);
    if (selectedTask?.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar
        collapsible="icon"
        className="border-r-0 md:border-r"
        variant="sidebar"
      >
        <SidebarHeader className="h-16 flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold text-primary">StoreFlow</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
             <SidebarGroupLabel className="flex items-center gap-2">
              <ListTodo />
              <span>Tasks</span>
            </SidebarGroupLabel>
            <TaskList
              tasks={allTasks}
              onSelectTask={handleSelectTask}
              selectedTaskId={selectedTask?.id}
            />
          </SidebarGroup>
          <SidebarMenu className="mt-auto">
            <SidebarMenuItem>
              <Link href="/dashboard" className="w-full">
                <SidebarMenuButton
                  tooltip={{ children: "Dashboard" }}
                  isActive={pathname === "/dashboard"}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <div className="flex items-center gap-3 p-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person face" />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-sm truncate">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground truncate">Store Associate</span>
              </div>
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-4 md:p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          {selectedTask ? (
            <TaskDetail task={selectedTask} onTaskUpdate={handleTaskUpdate} />
          ) : (
             <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-lg font-semibold">No Task Selected</p>
                <p className="text-muted-foreground">Select a task from the list to view its details.</p>
              </div>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
